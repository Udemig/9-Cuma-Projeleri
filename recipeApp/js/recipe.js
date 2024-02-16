import { elements } from "./helpers.js";

export class Recipe {
  constructor() {
    // tarif hakkında tüm bilgiler
    this.info = {};
    // tarifin malzemeleri
    this.ingredients = [];
  }

  // tarif bilgilerini alma
  async getRecipe(id) {
    // console.log(id);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işleme
    const data = await res.json();
    console.log(data);
    // class'ın içerisine aktarma
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }

  createIngredient() {
    const html = this.ingredients.map(
      (ingredient) =>
        `<li>
            <i class="bi bi-check-circle"></i>
            <p>${ingredient}</p>
        </li>`
    );
    return html;
  }
  // tarif bilgilerini ekrana aktarma
  renderRecipe(recipe) {
    console.log(recipe);
    const markup = `
        <figure>
            <img src="${recipe.image_url}" alt="" />
            <h1>${recipe.title}</h1>
            <p class="like-area">
              <i class="bi bi-heart" id="like-btn"></i>
            </p>
        </figure>

        <div class="ingredients">
        <ul>
         ${this.createIngredient()}
        </ul>
        <button id="add-to-basket">
          <i class="bi bi-cart-fill"></i>
          <span>Alışveriş Sepetine Ekle</span>
        </button>
      </div>



    `;
    elements.recipeArea.innerHTML = markup;
  }
}
