import { API } from "./api.js";
import { setLocal } from "./helpers.js";
import { authEle } from "./ui.js";

const api = new API();

/*
 * Şifre için kuralları içeren tanım
 * min 1 küçük harf
 * min 1 büyük harf
 * min 1 sayı
 * min 8 karakter
 * min 1 özel karakter
 */
const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$";
//! Uyarıları ekrana basar
const renderWarn = (nameWarn, passWarn) => {
  // isim uyarısı var ise ekrana bas yok ise html'i boşalt
  if (nameWarn) {
    authEle.nameArea.innerHTML = `<p class="warning">${nameWarn}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }
  // şifre uyarısı varsa ekrana bas yok ise uyarıyı sil
  if (passWarn) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarn}</p>`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

//* Formun gönderilme olayını izleme
authEle.loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // uyarıları tutacağımız değişkenler
  let nameWarn = null;
  let passWarn = null;

  // inputun içindeki değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  // name'in içi boş ise, 3 karakterden kısa ise, hiçbiri değilse içini null yap(ismi kontrol etme)
  if (!name) {
    nameWarn = "İsim alanı zorunludur.";
  } else if (name.length <= 3) {
    nameWarn = "İsim üç karakterden kısa olamaz.";
  } else {
    nameWarn = null;
  }
  // şifre kontrolü
  if (!pass) {
    passWarn = "Şifre alanını doldurunuz.";
  } else if (pass.length < 8) {
    passWarn = "Şifre sekiz karakterden kısa olamaz.";
  } else if (!pass.match(regex)) {
    passWarn = "Şifre yeterince güçlü değildir";
  } else {
    passWarn = null;
  }
  // uyarıları ekrana basar
  renderWarn(nameWarn, passWarn);

  if (!nameWarn && !passWarn) {
    const userData = await api.getUser(name);
    // kullanıcıyı locale ekler
    setLocal("user", userData);
    // kullanıcıyı anasayfaya yönlendirir
    window.location = "/";
  }
});
