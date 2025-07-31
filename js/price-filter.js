function applyPriceFilter(min, max) {
    const products = document.querySelectorAll('.catalog-list__item');
    let anyVisible = false;

    products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        let visible = true;

        // Проверка минимальной цены
        if (!isNaN(min) && price < min) {
            visible = false;
        }

        // Проверка максимальной цены
        if (!isNaN(max) && price > max) {
            visible = false;
        }

        // Применение видимости
        product.style.display = visible ? '' : 'none';
        if (visible) anyVisible = true;
    });

    // Показ сообщения, если ничего не найдено
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = anyVisible ? 'none' : 'block';
    }
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