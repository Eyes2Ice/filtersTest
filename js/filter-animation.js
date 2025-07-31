/**
 * Универсальная функция фильтрации товаров
 * @param {Function} filterFn - Функция, возвращающая true/false для каждого товара
 * @param {Object} options - Дополнительные параметры
 */
function filterProducts(filterFn, options = {}) {
  const {
    containerSelector = '.catalog-list',
    itemSelector = '.catalog-list__item',
    noResultsSelector = '#no-results',
    animationDuration = 400
  } = options;

  const container = document.querySelector(containerSelector);
  const items = Array.from(container.querySelectorAll(itemSelector));
  const noResultsElement = noResultsSelector ? document.querySelector(noResultsSelector) : null;

  // Подготовка к анимации
  container.style.minHeight = `${container.offsetHeight}px`;
  let visibleCount = 0;

  // Первый проход - скрываем несоответствующие
  items.forEach(item => {
    const shouldShow = filterFn(item);
    
    if (shouldShow) {
      visibleCount++;
      item.classList.remove('catalog-list__item--hiding', 'catalog-list__item--hidden');
      item.classList.add('catalog-list__item--showing');
    } else {
      item.classList.add('catalog-list__item--hiding');
      item.classList.remove('catalog-list__item--visible');
    }
  });

  // Запуск анимации скрытия
  setTimeout(() => {
    items.forEach(item => {
      if (item.classList.contains('catalog-list__item--hiding')) {
        item.classList.add('catalog-list__item--hidden');
      }
    });
  }, animationDuration);

  // Анимация появления подходящих товаров
  setTimeout(() => {
    items.forEach(item => {
      if (item.classList.contains('catalog-list__item--showing')) {
        item.classList.remove('catalog-list__item--showing');
        item.classList.add('catalog-list__item--visible');
      }
    });

    // Обновление высоты контейнера
    setTimeout(() => {
      container.style.minHeight = '';
    }, animationDuration);

    // Показ/скрытие сообщения "Ничего не найдено"
    if (noResultsElement) {
      noResultsElement.style.display = visibleCount > 0 ? 'none' : 'block';
    }
  }, 50); // Небольшая задержка для плавности
}

/**
 * Сброс всех фильтров с анимацией
 */
function resetAllFilters() {
  const container = document.querySelector('.catalog-list');
  const items = Array.from(container.querySelectorAll('.catalog-list__item'));
  
  // Подготовка к анимации
  container.style.minHeight = `${container.offsetHeight}px`;
  
  // Анимация появления всех элементов
  items.forEach(item => {
    if (item.classList.contains('catalog-list__item--hidden')) {
      item.classList.remove('catalog-list__item--hidden', 'catalog-list__item--hiding');
      item.classList.add('catalog-list__item--showing');
    }
  });

  // Завершение анимации
  setTimeout(() => {
    items.forEach(item => {
      item.classList.remove('catalog-list__item--showing');
      item.classList.add('catalog-list__item--visible');
    });
    
    container.style.minHeight = '';
    
    // Скрываем сообщение "Ничего не найдено"
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = 'none';
  }, 50);
}