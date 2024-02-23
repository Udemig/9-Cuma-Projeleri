export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultsList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  likeList: document.querySelector(".list"),
  basketList: document.querySelector(".shopping ul"),
  clearBtn: document.querySelector("#clear"),
};
// localStorage veri ekleme/güncelleme
export const setLocalStorage = (key, data) => {
  // verileri stringe çevirme
  const strData = JSON.stringify(data);
  // localStorage kaydetme
  localStorage.setItem(key, strData);
};
// localStorage'dan eleman alma
export const getFromLocal = (key) => {
  // string veriyi localden alma
  const strData = localStorage.getItem(key);
  return JSON.parse(strData);
};

// sepetin doluluk oranına göre sepeti temizle butonunu göster
export const controlBtn = (basket) => {
  // console.log(basket.length);
  if (basket.length > 0) {
    elements.clearBtn.style.display = "flex";
  } else {
    elements.clearBtn.style.display = "none";
  }
};
