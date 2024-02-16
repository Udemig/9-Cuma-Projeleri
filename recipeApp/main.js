import { Search } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderLoader, renderResult } from "./js/ui.js";

const recipe = new Recipe();

async function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
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
