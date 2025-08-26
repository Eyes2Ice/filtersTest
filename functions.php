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
