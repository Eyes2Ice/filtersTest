function applyPriceFilter(minPrice, maxPrice) {
  filterProducts(item => {
    const price = parseFloat(item.dataset.price);
    
    if (!isNaN(minPrice) && price < minPrice) return false;
    if (!isNaN(maxPrice) && price > maxPrice) return false;
    
    return true;
  }, { animationDuration: 300 });
}

// Обработчик для кнопки "ОК"
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
    
    applyPriceFilter(minPrice, maxPrice);
});


// При применении фильтра
function updateUrlParams(min, max) {
    const params = new URLSearchParams(window.location.search);
    
    if (!isNaN(min)) params.set('min_price', min);
    else params.delete('min_price');
    
    if (!isNaN(max)) params.set('max_price', max);
    else params.delete('max_price');
    
    history.replaceState({}, '', '?' + params.toString());
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('min_price') || params.has('max_price')) {
        const min = parseFloat(params.get('min_price'));
        const max = parseFloat(params.get('max_price'));
        
        document.getElementById('min-price').value = isNaN(min) ? '' : min;
        document.getElementById('max-price').value = isNaN(max) ? '' : max;
        
        applyPriceFilter(min, max);
    }

    
});