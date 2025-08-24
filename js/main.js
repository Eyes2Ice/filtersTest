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

function setDataPositionAttributes(maxAttempts = 10, attempt = 1) {
  // Получаем все элементы с классом catalog-list__item
  const items = document.querySelectorAll('.catalog-list__item');
  
  // Если элементы не найдены, пытаемся снова через некоторое время
  if (items.length === 0 && attempt <= maxAttempts) {
    console.log(`Попытка ${attempt}/${maxAttempts}: элементы не найдены, повтор через 500мс...`);
    setTimeout(() => setDataPositionAttributes(maxAttempts, attempt + 1), 500);
    return;
  }
  
  // Если достигнут лимит попыток
  if (items.length === 0) {
    console.error('Элементы с классом catalog-list__item не найдены после всех попыток');
    return;
  }

  // Проходим по каждому элементу и устанавливаем data-position
  items.forEach((item, index) => {
    // Устанавливаем data-position, начиная с 1 (index + 1)
    item.setAttribute('data-position', index + 1);
  });
}

// Вызываем функцию при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  setDataPositionAttributes();
});

// Также вызываем функцию при изменении DOM (если товары загружаются динамически)
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      // Проверяем, были ли добавлены элементы каталога
      const catalogItems = document.querySelectorAll('.catalog-list__item');
      const hasPosition = catalogItems[0] && catalogItems[0].hasAttribute('data-position');
      
      if (catalogItems.length > 0 && !hasPosition) {
        setDataPositionAttributes();
      }
    }
  });
});

// Начинаем наблюдение за изменениями в DOM
observer.observe(document.body, {
  childList: true,
  subtree: true
});

});