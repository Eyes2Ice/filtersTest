document.addEventListener("DOMContentLoaded", function () {
  // Элементы фильтра
  const categoryCheckboxes = document.querySelectorAll(
    'input[name="category"]'
  );
  const selectAllBtn = document.querySelector(".filter-select-all");
  const resetBtn = document.querySelector(".filter-reset");
  const selectedCategoriesList = document.querySelector(
    ".selected-categories-list"
  );
  const selectedCategoriesContainer = document.querySelector(
    ".selected-categories"
  );
  const filterIndicator = document.querySelector(".filter-indicator");
  const categorySearch = document.querySelector(".filter-search-input");

  // Массив для хранения выбранных категорий
  let selectedCategories = [];

  // Инициализация
  initCategoryFilter();

  // Функция инициализации фильтра
  function initCategoryFilter() {
    // Инициализируем все товары как видимые
    const products = document.querySelectorAll(".catalog-list__item");
    products.forEach((product) => {
      product.classList.add("catalog-list__item--visible");
    });

    // Обработчики для чекбоксов
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleCategoryChange);
    });

    // Обработчики для кнопок
    if (selectAllBtn) {
      selectAllBtn.addEventListener("click", selectAllCategories);
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", resetCategories);
    }

    // Обработчик для поиска
    if (categorySearch) {
      categorySearch.addEventListener("input", filterCategoriesBySearch);
    }

    // Применяем начальное состояние
    updateSelectedCategoriesUI();
    applyCategoryFilter();
  }

  // Обработчик изменения состояния чекбокса
  function handleCategoryChange(e) {
    const checkbox = e.target;
    const categoryValue = checkbox.value;

    if (checkbox.checked) {
      // Добавляем категорию, если её ещё нет в списке
      if (!selectedCategories.includes(categoryValue)) {
        selectedCategories.push(categoryValue);
      }
    } else {
      // Удаляем категорию из списка
      selectedCategories = selectedCategories.filter(
        (cat) => cat !== categoryValue
      );
    }

    // Обновляем UI и применяем фильтр
    updateSelectedCategoriesUI();
    applyCategoryFilter();
  }

  // Функция применения фильтра по категориям
  function applyCategoryFilter() {
    const products = document.querySelectorAll(".catalog-list__item");

    // Если не выбрано ни одной категории - показываем все товары
    if (selectedCategories.length === 0) {
      products.forEach((product) => {
        product.classList.remove(
          "catalog-list__item--hidden",
          "catalog-list__item--hiding"
        );
        product.classList.add("catalog-list__item--visible");
      });
      if (filterIndicator) filterIndicator.classList.remove("visible");
      return;
    }

    // Показываем индикатор активного фильтра
    if (filterIndicator) filterIndicator.classList.add("visible");

    // Фильтруем товары
    products.forEach((product) => {
      const productCategory = product.dataset.category;

      if (selectedCategories.includes(productCategory)) {
        product.classList.remove(
          "catalog-list__item--hidden",
          "catalog-list__item--hiding"
        );
        product.classList.add("catalog-list__item--visible");
      } else {
        product.classList.add("catalog-list__item--hidden");
        product.classList.remove("catalog-list__item--visible");
      }
    });

    // Обновляем счетчик товаров
    updateProductsCounter();
  }

  // Обновление UI выбранных категорий
  function updateSelectedCategoriesUI() {
    // Очищаем список
    selectedCategoriesList.innerHTML = "";

    // Показываем/скрываем контейнер
    if (selectedCategories.length > 0) {
      selectedCategoriesContainer.classList.add("visible");
    } else {
      selectedCategoriesContainer.classList.remove("visible");
      return;
    }

    // Добавляем чипсы для каждой выбранной категории
    selectedCategories.forEach((categoryValue) => {
      const checkbox = document.querySelector(
        `input[name="category"][value="${categoryValue}"]`
      );
      const categoryLabel = checkbox
        ? checkbox.nextElementSibling.nextElementSibling.textContent
        : categoryValue;

      const chip = document.createElement("div");
      chip.className = "category-chip";
      chip.dataset.value = categoryValue;
      chip.innerHTML = `
        <span class="category-chip-text">${categoryLabel}</span>
        <span class="category-chip-remove">×</span>
      `;

      // Обработчик клика на чипс
      chip.addEventListener("click", function () {
        removeCategory(categoryValue);
      });

      selectedCategoriesList.appendChild(chip);
    });
  }

  // Удаление категории по клику на чипс
  function removeCategory(categoryValue) {
    // Снимаем выделение с соответствующего чекбокса
    const checkbox = document.querySelector(
      `input[name="category"][value="${categoryValue}"]`
    );
    if (checkbox) {
      checkbox.checked = false;
    }

    // Удаляем категорию из массива
    selectedCategories = selectedCategories.filter(
      (cat) => cat !== categoryValue
    );

    // Обновляем UI и применяем фильтр
    updateSelectedCategoriesUI();
    applyCategoryFilter();
  }

  // Выбор всех категорий
  function selectAllCategories() {
    selectedCategories = [];

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
      selectedCategories.push(checkbox.value);
    });

    updateSelectedCategoriesUI();
    applyCategoryFilter();
  }

  // Сброс всех категорий
  function resetCategories() {
    selectedCategories = [];

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    updateSelectedCategoriesUI();
    applyCategoryFilter();
  }

  // Фильтрация категорий по поисковому запросу
  function filterCategoriesBySearch() {
    const searchTerm = categorySearch.value.toLowerCase();
    const categories = document.querySelectorAll(".filter-checkbox");

    categories.forEach((category) => {
      const label = category.querySelector(".filter-checkbox-label");
      const text = label.textContent.toLowerCase();

      if (text.includes(searchTerm)) {
        category.style.display = "flex";
      } else {
        category.style.display = "none";
      }
    });
  }

  // Обновление счетчика товаров
  function updateProductsCounter() {
    const visibleProducts = document.querySelectorAll(
      ".catalog-list__item:not(.catalog-list__item--hidden)"
    );
    const counterElement = document.getElementById("products-count");
    const noResultsElement = document.getElementById("no-results");

    if (counterElement) {
      counterElement.textContent = visibleProducts.length;
    }

    if (noResultsElement) {
      noResultsElement.style.display =
        visibleProducts.length === 0 ? "block" : "none";
    }
  }
});
