document.addEventListener('DOMContentLoaded', function() {
  // Элементы поиска
  const searchInput = document.getElementById('product-search');
  const searchClear = document.querySelector('.search-clear');
  
  // Если поиска нет на странице - выходим
  if (!searchInput) return;
  
  // Инициализация поиска
  initSearchFilter();
  
  // Функция инициализации поискового фильтра
  function initSearchFilter() {
    // Обработчик ввода в поисковую строку
    searchInput.addEventListener('input', debounce(function(e) {
      applySearchFilter(e.target.value);
      toggleClearButton(e.target.value);
    }, 300));
    
    // Обработчик кнопки очистки
    if (searchClear) {
      searchClear.addEventListener('click', function() {
        searchInput.value = '';
        applySearchFilter('');
        toggleClearButton('');
        searchInput.focus();
      });
    }
    
    // Обработчик клавиши Esc
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        applySearchFilter('');
        toggleClearButton('');
      }
    });
  }
  
  // Функция применения поискового фильтра
  function applySearchFilter(searchTerm) {
    const products = document.querySelectorAll('.catalog-list__item');
    
    // Если поисковый запрос пустой - показываем все товары
    if (!searchTerm.trim()) {
      products.forEach(product => {
        product.classList.remove('catalog-list__item--hidden');
      });
      
      updateProductsCounter();
      return;
    }
    
    // Приводим поисковый запрос к нижнему регистру для регистронезависимого поиска
    const term = searchTerm.toLowerCase().trim();
    
    // Фильтруем товары
    products.forEach(product => {
      const productName = product.dataset.name.toLowerCase();
      
      if (productName.includes(term)) {
        product.classList.remove('catalog-list__item--hidden');
      } else {
        product.classList.add('catalog-list__item--hidden');
      }
    });
    
    // Обновляем счетчик товаров
    updateProductsCounter();
  }
  
  // Функция показа/скрытия кнопки очистки
  function toggleClearButton(value) {
    if (!searchClear) return;
    
    if (value) {
      searchClear.classList.add('catalog-list__item--visible');
    } else {
      searchClear.classList.remove('catalog-list__item--visible');
    }
  }
  
  // Функция для задержки выполнения (debounce)
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Функция обновления счетчика товаров
  function updateProductsCounter() {
    const visibleProducts = document.querySelectorAll('.catalog-list__item:not(.catalog-list__item--hidden)');
    const counterElement = document.getElementById('products-count');
    const noResultsElement = document.getElementById('no-results');
    
    if (counterElement) {
      counterElement.textContent = visibleProducts.length;
    }
    
    if (noResultsElement) {
      noResultsElement.style.display = visibleProducts.length === 0 ? 'block' : 'none';
    }
  }
});