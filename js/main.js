document.addEventListener('DOMContentLoaded', () => {
  const filterToggles = document.querySelectorAll('.filter-toggle');
  let activeFilter = null;

  // Обработчики для кнопок фильтров
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const filterType = toggle.dataset.filter;
      
      // Закрываем предыдущий открытый фильтр
      if (activeFilter && activeFilter !== filterType) {
        closeActiveFilter();
      }
      
      // Переключаем текущий фильтр
      const dropdown = document.getElementById(`${filterType}-dropdown`);
      const isOpening = !dropdown.classList.contains('active');
      
      if (isOpening) {
        // Закрываем все фильтры перед открытием нового
        closeAllFilters();
        dropdown.classList.add('active');
        toggle.classList.add('active');
        activeFilter = filterType;
        
        // Обработчик внутри открытого фильтра
        dropdown.addEventListener('click', dropdownClickHandler);
      } else {
        closeActiveFilter();
      }
    });
  });

  // Обработчик клика внутри выпадающего меню
  function dropdownClickHandler(e) {
    e.stopPropagation(); // Предотвращаем всплытие клика
  }

  // Закрытие при клике вне фильтра
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-group')) {
      closeAllFilters();
    }
  });

  // Закрытие при нажатии Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllFilters();
    }
  });

  function closeActiveFilter() {
    if (activeFilter) {
      const dropdown = document.getElementById(`${activeFilter}-dropdown`);
      const toggle = document.querySelector(`.filter-toggle[data-filter="${activeFilter}"]`);
      
      dropdown.classList.remove('active');
      toggle.classList.remove('active');
      dropdown.removeEventListener('click', dropdownClickHandler);
      activeFilter = null;
    }
  }

  function closeAllFilters() {
    document.querySelectorAll('.filter-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.removeEventListener('click', dropdownClickHandler);
    });
    
    document.querySelectorAll('.filter-toggle.active').forEach(toggle => {
      toggle.classList.remove('active');
    });
    
    activeFilter = null;
  }

  // В обработчике для кнопки "ОК" фильтра по цене
document.querySelector('.apply-filter').addEventListener('click', function(e) {
  e.stopPropagation();
  
  const minPrice = parseFloat(document.getElementById('min-price').value);
  const maxPrice = parseFloat(document.getElementById('max-price').value);
  
  // Валидация
  if (isNaN(minPrice) && isNaN(maxPrice)) {
    alert('Введите хотя бы одно значение цены');
    return;
  }
  
  if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice > maxPrice) {
    alert('Минимальная цена не может быть больше максимальной');
    return;
  }
  
  // Закрываем меню после применения
  closeActiveFilter();
});

});