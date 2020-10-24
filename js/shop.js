import { products } from "./products.js";

// variables
let visibleProducts = [];
const ITEMS_PER_PAGE = 12;
let totalPages = Math.floor(products.length / ITEMS_PER_PAGE);
let currentPage = 0;
// Selectors
const featuresItems = document.querySelector(".features_items_list");
const pagination = document.querySelector(".pagination");
const tags = document.querySelectorAll(".tag");
const subcategories = document.querySelectorAll(".subcategory");
// Listeners
pagination.addEventListener("click", handleClickPagination);

tags.forEach((tag) =>
  tag.addEventListener("click", (e) => {
    handleSelectTag(tag.firstElementChild.innerText);
  })
);

subcategories.forEach((subcategory) => {
  subcategory.addEventListener("click", (e) => {
    const category = subcategory.dataset.category;
    handleSelectSubcategory(subcategory.innerText, category);
  });
});

// Functions

function handleSelectTag(tagName) {
  const productsFiltered = [...products].filter(p => p.tag === tagName);
  visibleProducts = productsFiltered;

  generateProductsList()
}

function handleSelectSubcategory(subcategoryName, categoryName) {
  console.log(subcategoryName, categoryName)
  const productsFiltered = [...products].filter(p => p.subcategory === subcategoryName && p.category === categoryName);
  visibleProducts = productsFiltered;

  generateProductsList()
}

function handleClickPagination(e) {
  const itemClicked = e.target;
  if (itemClicked.dataset.page) {
    const page = itemClicked.dataset.page;
    currentPage = +page;

    visibleProducts = [...products].slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    generateProductsList();
    generatePagination();
  }
}

function generateNewProduct(product, index) {
  const col = document.createElement("div");
  col.classList.add("col-sm-4");

  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-image-wrapper");

  const singleProduct = document.createElement("div");
  singleProduct.classList.add("single-products");

  const productInfo = document.createElement("div");
  productInfo.classList.add("productinfo");
  productInfo.classList.add("text-center");

  const image = document.createElement("img");
  image.src = product.image;
  image.classList.add("img-product");

  const productPrice = document.createElement("h2");
  productPrice.innerText = `$${(+product.startingPrice).toFixed(2)}`;
  product.maxPrice &&
    (productPrice.innerText += ` - $${(+product.maxPrice).toFixed(2)}`);

  const productName = document.createElement("p");
  productName.innerText = product.name;

  const buyButton = document.createElement("a");
  buyButton.href = `https://api.whatsapp.com/send?phone=593998816111&text=Necesito%20mas%20informacion%20sobre%20${product.name}`;
  buyButton.classList.add("btn");
  buyButton.classList.add("btn-default");
  buyButton.classList.add("add-to-cart");

  const buyButtonIcon = document.createElement("i");
  buyButtonIcon.classList.add("fa");
  buyButtonIcon.classList.add("fa-shopping-cart");

  const buyButtonText = document.createElement("span");
  buyButtonText.innerText = "Comprar";

  buyButton.appendChild(buyButtonIcon);
  buyButton.appendChild(buyButtonText);

  const productOverlay = document.createElement("div");
  productOverlay.classList.add("product-overlay");

  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");

  productInfo.appendChild(image);
  productInfo.appendChild(productPrice);
  productInfo.appendChild(productName);

  overlayContent.appendChild(productPrice.cloneNode(true));
  overlayContent.appendChild(productName.cloneNode(true));
  overlayContent.appendChild(buyButton);

  productOverlay.appendChild(overlayContent);

  singleProduct.appendChild(productInfo);
  singleProduct.appendChild(productOverlay);

  productImageWrapper.appendChild(singleProduct);

  col.appendChild(productImageWrapper);
  console.log("col:", col.innerHTML.length);
  featuresItems.appendChild(col);
}

function generatePagination() {
  let i;
  let pages = "";
  for (i = 0; i <= totalPages; i++) {
    const newItem = `
      <li class="${
        i === currentPage ? "active" : ""
      }" data-page="${i}"><span class="page-number" data-page="${i}"> ${
      i + 1
    } </span> </li>
      `;
    pages += newItem;
  }
  pagination.innerHTML = pages;
}

function generateProductsList() {
  featuresItems.innerHTML = "";
  visibleProducts.forEach((product, index) =>
    generateNewProduct(product, index)
  );
}

function firstTimeExecution() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  if (queryString.length === 0) {
    visibleProducts = [...products].slice(0, ITEMS_PER_PAGE);
generateProductsList();
generatePagination();
  } else {
    const subcategory = urlParams.get('subcategory');
    const category = urlParams.get('category');
    const tag = urlParams.get('tag');

    console.log({subcategory, category, tag})
    if (tag) {
      handleSelectTag(tag);
    } else {
      handleSelectSubcategory(subcategory, category)
    }

  }
}

// First time execution functions
firstTimeExecution();