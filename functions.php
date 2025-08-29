<?php
if (! defined('_S_VERSION')) {
	define('_S_VERSION', '1.0.0');
}
function filtersTest_setup()
{
	add_theme_support('automatic-feed-links');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
}

add_action('after_setup_theme', 'filtersTest_setup');

/**
 * Enqueue scripts and styles.
 */
function filtersTest_scripts()
{
	// Styles
	wp_enqueue_style('filtersTest-reset', get_template_directory_uri() . '/css/reset.css', array(), _S_VERSION);
	wp_enqueue_style('filtersTest-style-main', get_template_directory_uri() . '/css/style.css', array(), _S_VERSION);

	// Scripts
	wp_enqueue_script('filter-manager', get_template_directory_uri() . '/js/filter-manager.js', array(), _S_VERSION, true);
	wp_enqueue_script('filter-category', get_template_directory_uri() . '/js/filter-category.js', array(), _S_VERSION, true);
	wp_enqueue_script('filter-price', get_template_directory_uri() . '/js/filter-price.js', array(), _S_VERSION, true);
	wp_enqueue_script('filter-search', get_template_directory_uri() . '/js/filter-search.js', array(), _S_VERSION, true);
	wp_enqueue_script('filter-sort', get_template_directory_uri() . '/js/filter-sort.js', array(), _S_VERSION, true);
	wp_enqueue_script('filtersTest-script-main', get_template_directory_uri() . '/js/main.js', array(), _S_VERSION, true);
}
add_action('wp_enqueue_scripts', 'filtersTest_scripts');

// Регистрация кастомного посттайпа "Товары"

add_action('init', 'my_register_product_cpt');
function my_register_product_cpt()
{
	$labels = array(
		'name' => 'Товары',
		'singular_name' => 'Товар',
		'add_new_item' => 'Добавить товар',
		'edit_item' => 'Редактировать товар',
		'all_items' => 'Все товары'
	);
	register_post_type('product', array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => false,
		'show_in_rest' => true, // удобно для Gutenberg/REST
		'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions'),
		'menu_position' => 20,
		'menu_icon' => 'dashicons-cart',
	));

	register_taxonomy('product_category', 'product', array(
		'labels' => array('name' => 'Категории товаров', 'singular_name' => 'Категория товара'),
		'hierarchical' => true,
		'show_in_rest' => true,
	));


	// Шорткод для вывода каталога товаров
	add_shortcode('catalog_products', 'render_catalog_products');
	function render_catalog_products($atts)
	{
		// Можно принимать аттрибуты: posts_per_page, category, etc.
		$args = array(
			'post_type' => 'product',
			'post_status' => 'publish',
			'posts_per_page' => -1,
			'orderby' => 'date',
			'order' => 'DESC'
		);
		$q = new WP_Query($args);
		ob_start();
?>
		<ul id="catalog-root" class="catalog-list">
			<?php while ($q->have_posts()): $q->the_post();
				$id = get_the_ID();
				// Получаем цену: если ACF, используем get_field, иначе get_post_meta
				$price = function_exists('get_field') ? get_field('product_price', $id) : get_post_meta($id, 'product_price', true);
				$price = $price !== '' ? $price : 0;
				// Получаем категории (slugs)
				$terms = wp_get_post_terms($id, 'product_category', array('fields' => 'slugs'));
				$categories_data = implode(',', $terms);
				// Дата добавления (ISO или timestamp) — используем постдейт
				$date_iso = get_the_date('c', $id); // ISO 8601
				$title = get_the_title($id);
				$excerpt = get_the_excerpt($id);

			?>
				<li class="catalog-list__item"
					data-id="<?php echo esc_attr($id) ?>"
					data-price="<?php echo esc_attr(floatval($price)) ?>"
					data-category="<?php echo esc_attr($categories_data) ?>"
					data-title="<?php echo esc_attr(mb_strtolower($title)) ?>"
					data-date="<?php echo esc_attr($date_iso) ?>"
					data-excerpt="<?php echo esc_attr(mb_strtolower(strip_tags($excerpt))) ?>">
					<img src="<?php echo get_field('product_img')['url'] ?>" alt="<?php echo get_field('product_descr') ?>" class="catalog-list__item-img">
					<div class="catalog-list__item-content">
						<h3 class="catalog-list__item-title"><?php echo esc_html($title) ?></h3>
						<p class="catalog-list__item-weight"><?php echo get_field('product_weight') ?> гр.</p>
						<p class="catalog-list__item-price"><?php echo esc_html(number_format_i18n($price, 0)) ?> р.</p>
					</div>
				</li>
			<?php endwhile;
			wp_reset_postdata(); ?>
		</ul>
<?php
		return ob_get_clean();
	}
}
