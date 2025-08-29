<?php get_header(); ?>

<div class="wrapper">
    <header>
        <div class="container">
            <div class="header__inner">
                <h1 class="header__title">Каталог</h1>
                <!-- <ul class="header__categories-list">
            <li class="header__categories-list-item">
              <a href="#">Морепродукты</a>
            </li>
            <li class="header__categories-list-item"><a href="#">Икра</a></li>
            <li class="header__categories-list-item"><a href="#">Рыба</a></li>
            <li class="header__categories-list-item">
              <a href="#">Полуфабрикаты</a>
            </li>
            <li class="header__categories-list-item">
              <a href="#">Соусы</a>
            </li>
            <li class="header__categories-list-item">
              <a href="#">Напитки</a>
            </li>
            <li class="header__categories-list-item">
              <a href="#">Витамины</a>
            </li>
            <li class="header__categories-list-item">
              <a href="#"> Шашлыки в городе у моря </a>
            </li>
          </ul> -->
            </div>
        </div>
    </header>
    <main>
        <section class="main__catalog catalog">
            <div class="catalog__inner">
                <div class="catalog__filters filters">
                    <div class="filters__body">
                        <ul class="filters__option-group">
                            <!-- Фильтр по цене -->
                            <li class="filters__option-item">
                                <button class="filters__option-item-btn filter-toggle" data-filter="price">Цена</button>
                                <div class="filter-dropdown" id="price-dropdown">
                                    <div class="price-inputs">
                                        <input type="number" id="min-price" placeholder="Минимальная цена">
                                        <span class="price-separator">—</span>
                                        <input type="number" id="max-price" placeholder="Максимальная цена">
                                        <button class="apply-filter">ОК</button>
                                    </div>
                                </div>
                            </li>
                            <!-- Фильтр по категориям -->
                            <li class="filters__option-item">
                                <button class="filter-toggle" data-filter="category">
                                    Раздел
                                </button>
                                <div class="filter-dropdown" id="category-dropdown">
                                    <div class="filter-categories-list">
                                        <label class="filter-checkbox">
                                            <input type="checkbox" name="category" value="caviar">
                                            <span class="checkmark"></span>
                                            <span class="filter-checkbox-label">Икра</span>
                                        </label>
                                        <label class="filter-checkbox">
                                            <input type="checkbox" name="category" value="mussel">
                                            <span class="checkmark"></span>
                                            <span class="filter-checkbox-label">Мидия</span>
                                        </label>
                                        <label class="filter-checkbox">
                                            <input type="checkbox" name="category" value="shrimp">
                                            <span class="checkmark"></span>
                                            <span class="filter-checkbox-label">Креветка</span>
                                        </label>
                                        <label class="filter-checkbox">
                                            <input type="checkbox" name="category" value="souse">
                                            <span class="checkmark"></span>
                                            <span class="filter-checkbox-label">Соусы</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Блок выбранных категорий -->
                                <div class="selected-categories">
                                    <div class="selected-categories-header">
                                        <span>Выбранные разделы:</span>
                                    </div>
                                    <div class="selected-categories-list">
                                        <!-- Здесь будут появляться выбранные категории -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul class="filters__search-group">
                            <li class="filters__search-item">
                                <div class="search-filter">
                                    <div class="search-container">
                                        <input type="text" id="product-search" placeholder="Поиск" class="search-input">
                                        <button type="button" class="search-clear" aria-label="Очистить поиск">×</button>
                                    </div>
                                </div>
                            </li>
                            <li class="filters__search-item">
                                <div class="sort-select-wrapper">
                                    <select class="sort-select" name="sort">
                                        <option value="">Порядок: по умолчанию</option>
                                        <option value="price:asc">Цена: по возрастанию</option>
                                        <option value="price:desc">Цена: по убыванию</option>
                                        <option value="title:asc">Название: А-Я</option>
                                        <option value="title:desc">Название: Я-А</option>
                                        <option value="created:desc">Порядок: сперва новые</option>
                                        <option value="created:asc">Порядок: сперва старые</option>
                                    </select>
                                </div>
                            </li>
                            <li class="filters__search-item">
                                <button type="button" class="reset-all-filters" onclick="window.filterManager.resetAllFilters()">
                                    Сбросить все фильтры
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <?php echo do_shortcode('[catalog_products]'); ?>
                <!-- <ul class="catalog-list">
                    <li class="catalog-list__item" data-price="6000" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">6000 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="5000" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">5000 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="4000" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">4000 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="3800" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">3800 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="2500" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">2500 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="1500" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">1500 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="899" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">899 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="1799" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">1799 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="7549" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">7549 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="8999" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">8999 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="3449" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">3499 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="659" data-category="caviar"
                        data-name="Красная икра кеты 2025 год (500гр)">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/keta.jpg" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Красная икра кеты 2025 год (500гр)
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">659 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="1900" data-category="shrimp" data-name="Креветка северная">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/shrimp.webp" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Креветка северная
                            </h3>
                            <div class="catalog-list__item-weight">1000 гр</div>
                            <div class="catalog-list__item-price">1900 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="580" data-category="souse" data-name="Унаги соус">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/unagi-souse.webp" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Унаги соус
                            </h3>
                            <div class="catalog-list__item-weight">500 мл</div>
                            <div class="catalog-list__item-price">580 р.</div>
                        </div>
                    </li>
                    <li class="catalog-list__item" data-price="500" data-category="mussel" data-name="Филе мидии">
                        <img class="catalog-list__item-img" src="<?php echo get_template_directory_uri() ?>/img/mussel.webp" alt="" />
                        <div class="catalog-list__item-content">
                            <h3 class="catalog-list__item-title">
                                Филе мидии
                            </h3>
                            <div class="catalog-list__item-weight">500 гр</div>
                            <div class="catalog-list__item-price">500 р.</div>
                        </div>
                    </li>
                </ul> -->
            </div class="catalog__inner">
        </section>
    </main>
</div>

<?php get_footer(); ?>