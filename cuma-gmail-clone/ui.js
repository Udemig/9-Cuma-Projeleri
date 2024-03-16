// ekrana mail oluşturma penceresini oluşturmak için kullanılacak fonksiyon
export function showModal(modal, willOpen) {
  modal.style.display = willOpen ? "grid" : "none";
}

function trimString(str, max) {
  // metin maxdan kısaysa olduğu gibi gönderiyoruz
  if (str.length < max) return str;
  // metnin harf uzunluğu max dan uzunsa
  // maxa kadar olan kısmı kes ve sonrasında ... koy
  // yeni metni return ile fonksiyonun çalıştığı yere gönder
  return str.slice(0, max) + "...";
}

export function renderMails(outlet, data) {
  if (!data) return;
  // her bir mail objesi için bir maili temsil eden html oluştur
  // oluşn mail htmlini mailler alanına gönderme(ekrana yazdırma)
  outlet.innerHTML = data
    .map(
      (mail) => `   
    <div class="mail" id="mail" data-id=${mail.id}>
        <div class="left">
            <input type="checkbox" />
            <span class="bi bi-star${mail.stared ? "-fill" : ""}"></span>
            <span>${mail.receiver}</span>
        </div>
        <div class="right">
            <p class="message-title">${trimString(mail.title, 20)}</p>
            <p class="message-description">
           ${trimString(mail.message, 40)}
            </p>
            <p class="message-date">${mail.date}</p>
            <div class="delete">
            <i class="bi bi-trash"></i>
            </div>
        </div>
    </div>`
    )
    .join(" ");
}

export function renderCategories(outlet, data, selectCategory) {
  // eski kategorileri sil
  outlet.innerHTML = "";

  // bize gelen diziyi forEach ile dönüp özelliklerini ekleme
  data.forEach((category) => {
    const categoryItem = document.createElement("a");
    // kategori elemanına veri ekleme
    categoryItem.dataset.name = category.title;
    console.log(categoryItem);
    // Aktif olan kategoriye active classı
    categoryItem.className = selectCategory === category.title && "active";

    categoryItem.innerHTML = `
    <i class="${category.class}"></i>
    <span>${category.title}</span>
    `;
    outlet.appendChild(categoryItem);
  });
}
