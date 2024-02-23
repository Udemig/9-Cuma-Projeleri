import { v4 } from "https://jspm.dev/uuid";
import { Search } from "./js/api.js";
import {
  controlBtn,
  elements,
  getFromLocal,
  setLocalStorage,
} from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";

const recipe = new Recipe();

async function handleSubmit(e) {
  e.preventDefault();
  // aratılan kelime
  const query = elements.searchInput.value;
  //   inputun içi boşsa bildirim göndersin
  if (query == "") {
    alert("Inputun içerisi boş!!");
  } else {
  }
  // inputun içine herhangi bir şey yazarsak çalışır
  if (query) {
    // search sınıfının bir örneğini oluşturur
    const search = new Search(query);
    // istek atmaya başlamadan önce loaderı çalıştırmalıyız ve ekrana aktarmalıyız
    renderLoader(elements.resultsList);
    // istek atma
    try {
      await search.getResults();
      // gelen veriyi ekrana renderlayan fonksiyon
      renderResult(search.result);
    } catch (error) {
      console.log(error);
    }
  }
}
elements.form.addEventListener("submit", handleSubmit);
// tarif detaylarını alma
const controlRecipe = async () => {
  const id = location.hash.replace("#", "");
  //   console.log(id);
  if (id) {
    try {
      // tarif bilgilerini al
      await recipe.getRecipe(id);
      // ekrana tarfi arayüzünü aktarma
      recipe.renderRecipe(recipe.info);
    } catch (error) {
      console.log(error);
    }
  }
};
//* tekrar eden işlemlerde döngü kullanabiliriz
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

let basket = getFromLocal("basket") || [];
// sayfanın yüklenme olayını izler
document.addEventListener("DOMContentLoaded", () => {
  renderBasketItems(basket);
  // sepette eleman varsa butonu göster
  controlBtn(basket);
});

// tarif alanındaki tıklanmalarda çalışır
const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    // tarifler dizisini dön
    recipe.ingredients.forEach((title) => {
      const newItem = {
        id: v4(),
        title,
      };
      // tarifleri basket dizisine ekleme
      basket.push(newItem);
    });
    // sepeti local'e kaydetme
    setLocalStorage("basket", basket);
    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);
    // sepeti temizle butonunu göster
    controlBtn(basket);
  }
  if (e.target.id === "like-btn") {
    recipe.controlLike();
  }
};
// sepete ekle butonuna ve like butonuna tıklanma olaylarını izleme
elements.recipeArea.addEventListener("click", handleClick);
// basketList alanından silme butonuna tıklanma kısmını bul ve deleteItem fonksiyonunu çalıştır.
elements.basketList.addEventListener("click", deleteItem);
// sepetten eleman kaldırma
function deleteItem(e) {
  if (e.target.id === "delete-item") {
    // kapsayıcıya erişme
    const parent = e.target.parentElement;
    // seçilen ürünü diziden kaldırmak için id'ye erişme
    basket = basket.filter((i) => i.id !== parent.dataset.id);
    // local storage güncelleme
    setLocalStorage("basket", basket);
    parent.remove();
    // temizle butonunu kontrol eder
    controlBtn(basket);
  }
}
// temizle butonuna tıklanma olayını izler
elements.clearBtn.addEventListener("click", handleClear);

function handleClear() {
  const res = confirm("Sepet silinecek! Emin misiniz?");
  console.log(res);
  if (res) {
    // locali temizle
    setLocalStorage("basket", null);
    basket = [];
    // butonu ortadan kaldırır
    controlBtn(basket);
    // arayüzü güncelledik
    elements.basketList.innerHTML = "";
  }
}
