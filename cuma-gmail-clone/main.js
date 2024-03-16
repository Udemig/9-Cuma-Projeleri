import { categories, months } from "./constants.js";
import { renderCategories, renderMails, showModal } from "./ui.js";

// localstorage'dan veri alma
const strMailData = localStorage.getItem("data");
// gelen string veriyi obje ve dizilere çevirdik
const mailData = JSON.parse(strMailData) || [];

//! HTML' den getirdiklerimiz
const body = document.querySelector("body");
const btn = document.getElementById("toggle");
const createMailBtn = document.querySelector(".create");
const closeMailBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-wrapper");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const form = document.querySelector("#create-mail-form");
const mailsArea = document.querySelector(".mails-area");
const searchButton = document.querySelector("#search-icon");
const searchInput = document.querySelector("#search-input");
const categoryArea = document.querySelector(".nav-middle");
// console.log(categoryArea);

//! Olay İzleyicileri
hamburgerMenu.addEventListener("click", hideMenu);
/*
    ekranın yüklenme anında çalışır ve renderMails fonksiyonu ile 
    ekranı güncelleriz
*/
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailsArea, mailData);
});

// modal işlemleri
createMailBtn.addEventListener("click", () => showModal(modal, true));
closeMailBtn.addEventListener("click", () => showModal(modal, false));
form.addEventListener("submit", sendMail);
// mail alanındaki tıklamalar
mailsArea.addEventListener("click", updateMail);
// pencerenin genişliğini izleme
window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;
  if (width < 1100) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});
// search iconuna tıklanıldığında searchMails fonksiyonunu çalıştır
searchButton.addEventListener("click", searchMails);
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  body.classList.toggle("darkMode");
  // mailsArea.classList.toggle("darkMode");
});
categoryArea.addEventListener("click", watchCategory);
//! Fonksiyonlar

//
function getDate() {
  const today = new Date();
  const day = today.getDate();
  const ay = today.getMonth() + 1;

  // tarih oluşturma
  const date = day + "/" + ay + "year";
  // ayın sırasında karşılık gelen ismi tanımladık
  const updateMonths = months[ay - 1];
  // gün ile ayı dışarıya gönderdik
  //   return [day, updateMonths].join(" ");
  return day + " " + updateMonths;
}

function hideMenu() {
  /*
        classList.toggle();
        * Ona parametre olarak verdiğimiz class'ı
        * yoksa ekler varsa çıkarır.
    
    */
  navigation.classList.toggle("hide");
}
// maili gönderme
function sendMail(e) {
  e.preventDefault(); // sayfanın yenilenmesini engeller
  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  if (!receiver || !title || !message) {
    // bildirim oluşturma
    Toastify({
      text: "Formu doldurunuz!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // mouseu üzerine götürdüğümüzde kaybolmaz
      style: {
        background: "#FFCC01",
        borderRadius: "10px",
        color: "white",
      },
    }).showToast();
    // bunlardan herhangi birinin içi boşsa alttaki kodların çalışmasını engellemeliyiz
    return;
  }
  // yeni mail objesi oluşturma
  const newMail = {
    id: new Date().getTime(), // idler benzersiz olmak zorundadır bu yüzden date objesi oluşturarak benzersiz bir sayı ürettik
    sender: "Ömer",
    receiver, // receiver:recevier yapabilirdik ama js kendisi tanıyor receiver yazarsak
    title,
    message,
    stared: false,
    date: getDate(),
  };
  // oluşturduğumuz objeyi dizinin en başına ekleme
  mailData.unshift(newMail);
  // localstorage verileri string veri türünde tutar bu yüzedn JSON yapısını stringe çevirmeliyiz
  const strData = JSON.stringify(mailData);
  // stroge'a gönderdik
  localStorage.setItem("data", strData); //! key value data:anahtar strData:değerdir
  // ekranı güncellemek için kullandık
  renderMails(mailsArea, mailData);
  // modalı kapat
  showModal(modal, false);

  // modalı temizleme
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  Toastify({
    text: "Mail başarıyla gönderildi.",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // mouseu üzerine götürdüğümüzde kaybolmaz
    style: {
      background: "#23BB33",
      borderRadius: "10px",
      color: "white",
    },
  }).showToast();
}
// mail alanında bir tıklanma olduğunda çalışır
function updateMail(e) {
  if (e.target.classList.contains("bi-trash")) {
    // sileceğimiz mail elemanını belirledik
    const mail = e.target.parentElement.parentElement.parentElement;
    // id değerini bildiğimiz elemanı diziden alma
    const mailId = mail.dataset.id;
    // id değerini bildiğimiz elemanı diziden çıkardık
    const filtredData = mailData.filter((i) => i.id != mailId);
    // diziyi localStorage tekrardan yüklemek için stringe çevirdik
    const strData = JSON.stringify(filtredData);
    // localStorage'dan veriyi kaldırdık
    localStorage.removeItem("data");
    // veriyi güncellemiş haliyle localstorage'a yeniden kaydettik
    localStorage.setItem("data", strData);
    // maili HTML'den kaldırdık
    mail.remove();
  }
  if (e.target.classList.contains("bi-star")) {
    // güncellenecek maili belirledik
    const mail = e.target.parentElement.parentElement;
    // mailin dizideki verilerini bulmak için idsine erişme
    const mailId = mail.dataset.id;
    // id'sinden yola çıkarak mail objesini bulma
    const foundItem = mailData.find((i) => i.id == mailId);
    // bulduğumuz elemanın stared değerini tersine çevirmek için spread(...) operatörü yardımı ile tersine çevirdik
    const updatedItem = { ...foundItem, stared: !foundItem.stared };
    // güncellenecek elemanın sırasını bulma
    const index = mailData.findIndex((i) => i.id == mailId);
    // dizideki elemanı güncelleme
    mailData[index] = updatedItem;

    localStorage.setItem("data", JSON.stringify(mailData));

    renderMails(mailsArea, mailData);
  }
  if (e.target.classList.contains("bi-star-fill")) {
    // güncellenecek maili belirledik
    const mail = e.target.parentElement.parentElement;
    // mailin dizideki verilerini bulmak için idsine erişme
    const mailId = mail.dataset.id;
    // id'sinden yola çıkarak mail objesini bulma
    const foundItem = mailData.find((i) => i.id == mailId);
    // bulduğumuz elemanın stared değerini tersine çevirmek için spread(...) operatörü yardımı ile tersine çevirdik
    const updatedItem = { ...foundItem, stared: !foundItem.stared };
    // güncellenecek elemanın sırasını bulma
    const index = mailData.findIndex((i) => i.id == mailId);
    // dizideki elemanı güncelleme
    mailData[index] = updatedItem;

    localStorage.setItem("data", JSON.stringify(mailData));

    renderMails(mailsArea, mailData);
  }
}

function searchMails() {
  // arama terimini içeren mailleri alma
  const filtredArray = mailData.filter((i) =>
    i.message.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  // mailleri ekrana basma
  renderMails(mailsArea, filtredArray);
}
// kategorileri izleyip seçeceğimiz kategoriye göre ekrana yıldızlanan öğeyi getirme
function watchCategory(e) {
  const leftNav = e.target.parentElement;
  const selectedCategory = leftNav.dataset.name;
  renderCategories(categoryArea, categories, selectedCategory);

  if (selectedCategory === "Yıldızlananlar") {
    console.log("yıldızlı");
    // stared değeri true olanları seçme
    const filtred = mailData.filter((i) => i.stared === true);
    renderMails(mailsArea, filtred);
    return;
  }
  // yıldızlı dışında bir kategoriye tıklanılırsa hepsini göster
  renderMails(mailsArea, mailData);
}
