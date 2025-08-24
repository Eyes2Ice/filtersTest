document.addEventListener('DOMContentLoaded', function() {
  // Элемент select для сортировки
  const sortSelect = document.querySelector('.js-store-filter-sort');
  
  // Если элемента нет на странице - выходим
  if (!sortSelect) return;
  
  // Текущий выбранный вариант сортировки
  let currentSort = '';
  
  // Инициализация сортировки
  initSortFilter();
  
  // Функция инициализации фильтра сортировки
  function initSortFilter() {
    // Обработчик изменения выбора в select
    sortSelect.addEventListener('change', function() {
      const sortType = this.value;
      applySorting(sortType);
      
      // Сохраняем выбор пользователя
      localStorage.setItem('productSort', sortType);
    });
    
    // Загружаем сохраненную сортировку, если есть
    const savedSort = localStorage.getItem('productSort');
    if (savedSort) {
      sortSelect.value = savedSort;
      applySorting(savedSort);
    }
  }
  
  // Функция применения сортировки
  function applySorting(sortType) {
    const container = document.querySelector('.catalog-list');
    const products = Array.from(container.querySelectorAll('.catalog-list__item:not(.catalog-list__item--hidden)'));
    
    // Если товаров нет или всего один - не сортируем
    if (products.length <= 1) return;
    
    // Сохраняем текущую сортировку
    currentSort = sortType;
    
    // Сортируем товары в зависимости от выбранного типа
    switch(sortType) {
      case 'price:asc':
        products.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price);
          const priceB = parseFloat(b.dataset.price);
          return priceA - priceB;
        });
        break;
        
      case 'price:desc':
        products.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price);
          const priceB = parseFloat(b.dataset.price);
          return priceB - priceA;
        });
        break;
        
      case 'title:asc':
        products.sort((a, b) => {
          const nameA = a.dataset.name.toLowerCase();
          const nameB = b.dataset.name.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
        
      case 'title:desc':
        products.sort((a, b) => {
          const nameA = a.dataset.name.toLowerCase();
          const nameB = b.dataset.name.toLowerCase();
          return nameB.localeCompare(nameA);
        });
        break;
        
      case 'created:desc':
        products.sort((a, b) => {
          const dateA = parseInt(a.dataset.date || 0);
          const dateB = parseInt(b.dataset.date || 0);
          return dateB - dateA;
        });
        break;
        
      case 'created:asc':
        products.sort((a, b) => {
          const dateA = parseInt(a.dataset.date || 0);
          const dateB = parseInt(b.dataset.date || 0);
          return dateA - dateB;
        });
        break;
        
      case '':
      default:
        // Восстанавливаем исходный порядок (по data-position или по порядку в DOM)
        products.sort((a, b) => {
          const posA = parseInt(a.dataset.position || 0);
          const posB = parseInt(b.dataset.position || 0);
          return posA - posB;
        });
        break;
    }
    
    // Удаляем все товары из контейнера
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Добавляем отсортированные товары обратно
    products.forEach(product => {
      container.appendChild(product);
    });
  }
  
  // Функция для применения сортировки после фильтрации
  function reapplySorting() {
    applySorting(currentSort);
  }
  
  // Экспортируем функцию для использования в других модулях
  window.reapplySorting = reapplySorting;
});