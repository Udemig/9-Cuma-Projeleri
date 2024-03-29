import { API } from "./scripts/api.js";
import { getLocal } from "./scripts/helpers.js";
import {
  mainEle,
  renderEmrtyInfo,
  renderInfo,
  renderLoader,
  renderTimeLine,
  renderUserInfo,
} from "./scripts/ui.js";

const api = new API();
//! Olay İzleyicileri
//* Sayfanın yüklenme anı
document.addEventListener("DOMContentLoaded", () => {
  // localden kullanıcı bilgilerini alıp ekrana renderlama
  const user = getLocal("user");
  renderUserInfo(user);
});
//* Çıkış yap butonuna tıkladığımızda localden verileri sil ve auth.html sayfasına yönlendir.
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});

const controlURL = async (e) => {
  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = window.location.hash.replace("#", "");
  const user = getLocal("user");
  // kullanıcı localde yok ise çalışır
  if (!user) {
    location = "/auth.html";
  }
  // kullanı anasayfadaysa çalışır
  if (!path) {
    // ekrana loadingi basar
    renderLoader(mainEle.tweetsArea);
    // anasayfa da gösterilecek tweetleri alma
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );
    // tweetleri ekrana basma
    renderTimeLine(user, data.timeline, mainEle.tweetsArea);
  }

  if (path === "?status" && id) {
    // apiden cevabı beklemeden arayüzü hazırla
    renderEmrtyInfo();
    // apiye istek at
    const info = await api.fetchData("/tweet.php", "id", id);
    // tweet detaylarını ekrana basar
    renderInfo(info, userName);
  }
};

["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
//* geri butonuna tıklanma olayını izleme
mainEle.main.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-arrow-left")) {
    // geçmişte bir adım geriye gitmesini sağlar
    history.back();
  }
});
