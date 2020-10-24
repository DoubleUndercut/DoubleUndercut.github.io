// Selectors
const itemsContainer = document.querySelector(".features_items");
const items = itemsContainer.querySelectorAll(".col-sm-4");
const tags = document.querySelectorAll(".tag");
const subcategories = document.querySelectorAll(".subcategory");
//functions

function handleSelectTag(tagName) {
  itemsContainer.innerHTML = "";

  const itemsArray = Array.from(items);
  const itemsFiltered = itemsArray.filter((item) => {
    const tag = item.dataset.tag;
    return tag === tagName;
  });

  if (itemsFiltered.length) {
    itemsFiltered.forEach((item) => itemsContainer.appendChild(item));
  } else {
    itemsContainer.innerText = "No hay nada!!"; //TODO: hacer algo mas bonito de respuesta!!
  }
}

function handleSelectSubcategory(subcategoryName, categoryName) {
  itemsContainer.innerHTML = "";

  const itemsArray = Array.from(items);
  const itemsFiltered = itemsArray.filter((item) => {
    const subcategory = item.dataset.subcategory;
    const category = item.dataset.category;
    return subcategory === subcategoryName && category === categoryName;
  });

  if (itemsFiltered.length) {
    itemsFiltered.forEach((item) => itemsContainer.appendChild(item));
  } else {
    itemsContainer.innerText = "No hay nada!!"; //TODO: hacer algo mas bonito de respuesta!!
  }
}

//Listeners
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
