<?php
/**
 * Plugin Name:         Block Visibility Add-on Example
 * Plugin URI:          https://www.blockvisibilitywp.com/
 * Description:         An example add-on for Block Visibility that adds an "Example Control".
 * Version:             0.1.0
 * Requires at least:   6.0
 * Requires PHP:        5.6
 * Author:              Nick Diego
 * Author URI:          https://www.nickdiego.com
 * License:             GPLv2
 * License URI:         https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain:         block-visibility-add-on-example
 * Domain Path:         /languages
 *
 * @package block-visibility-add-on-example
 */

/**
 * External dependencies from the core Block Visibility plugin.
 */
use function BlockVisibility\Utils\is_control_enabled as is_control_enabled;

/**
 * Run test to see if the block should be restricted by the Example Control.
 *
 * @since 0.1.0
 *
 * @param boolean $is_visible The current value of the visibility test.
 * @param array   $settings   The core plugin settings.
 * @param array   $controls   The control set controls.
 * @return boolean            Return true if the block should be visible, false if not
 */
function block_visibility_add_on_example_control_test( $is_visible, $settings, $controls ) {

	// The test is already false, so skip this test, the block should be hidden.
	if ( ! $is_visible ) {
		return $is_visible;
	}

	// If this control has been disabled, skip test.
	if ( ! is_control_enabled( $settings, 'example_control' ) ) {
		return true;
	}

	$control_atts = isset( $controls['exampleControl'] )
		? $controls['exampleControl']
		: null;

	$hide_block = isset( $control_atts['hideBlock'] )
		? $control_atts['hideBlock']
		: false;

	// If the block should be hidden, return false.
	return $hide_block ? false : true;
}

/**
 * Add the Example Control settings to the core Block Visibility settings
 * (block_visibility_settings).
 *
 * Note: Use snake case for custom settings.
 *
 * @since 0.1.0
 * @param array $settings Array of current settings.
 */
function block_visibility_add_on_example_add_settings( $settings ) {

	// Adding visibility control settings.
	array_merge(
		$settings['visibility_controls']['properties'],
		array(
			'example_control' => array(
				'type'       => 'object',
				'properties' => array(
					'enable' => array(
						'type' => 'boolean',
					),
					// Add more settings here.
				),
			),
		)
	);
}

/**
 * Add the Example Control default settings to the core Block Visibility default
 * settings (block_visibility_settings).
 *
 * Note: Use snake case for custom settings.
 *
 * @since 0.1.0
 * @param array $defaults Array of current default settings.
 */
function block_visibility_add_on_example_add_settings_defaults( $defaults ) {

	// Adding visibility control setting defaults.
	array_merge(
		$defaults['visibility_controls'],
		array(
			'example_control' => array(
				'enable' => true,
			),
			// Add more setting defaults here.
		)
	);
}

/**
 * Enqueue plugin specific editor scripts and styles.
 *
 * @since 0.1.0
 */
function block_visibility_add_on_example_enqueue_editor_assets() {

	// Scripts.
	$scripts_asset_file = include dirname( __FILE__ ) . '/build/block-visibility-add-on-example-editor.asset.php';

	wp_enqueue_script(
		'block-visibility-add-on-example-editor-scripts',
		plugin_dir_url( __FILE__ ) . 'build/block-visibility-add-on-example-editor.js',
		$scripts_asset_file['dependencies'],
		$scripts_asset_file['version'],
		false // Need false to ensure our filters can target third-party blocks.
	);

	// Styles.
	$styles_asset_file = include dirname( __FILE__ ) . '/build/block-visibility-add-on-example-editor-styles.asset.php';

	wp_enqueue_style(
		'block-visibility-add-on-example-editor-styles',
		plugin_dir_url( __FILE__ ) . 'build/block-visibility-add-on-example-editor-styles.css',
		$styles_asset_file['dependencies'],
		$styles_asset_file['version'],
		true
	);
}

/**
 * Enqueue plugin specific settings scripts and styles.
 *
 * @since 0.1.0
 */
function block_visibility_add_on_example_enqueue_settings_assets() {

	// Scripts.
	$scripts_asset_file = include dirname( __FILE__ ) . '/build/block-visibility-add-on-example-settings.asset.php';

	wp_enqueue_script(
		'block-visibility-add-on-example-setting-scripts',
		plugin_dir_url( __FILE__ ) . 'build/block-visibility-add-on-example-settings.js',
		$scripts_asset_file['dependencies'],
		$scripts_asset_file['version'],
		true
	);

	// Styles.
	$styles_asset_file = include dirname( __FILE__ ) . '/build/block-visibility-add-on-example-setting-styles.asset.php';

	wp_enqueue_style(
		'block-visibility-add-on-example-setting-styles',
		plugin_dir_url( __FILE__ ) . 'build/block-visibility-add-on-example-setting-styles.css',
		$styles_asset_file['dependencies'],
		$styles_asset_file['version']
	);
}

/**
 * Get the add-on plugin up and running.
 *
 * @since 0.1.0
 */
function block_visibility_add_on_example_load_plugin() {
	// Filters for adding Example Control settings to block_visibility_settings.
	add_filter( 'block_visibility_settings', 'block_visibility_add_on_example_add_settings', 20 );
	add_filter( 'block_visibility_setting_defaults', 'block_visibility_add_on_example_add_settings_defaults', 100 );

	// Enqueue scripts and styles for the Editor UI.
	add_action( 'enqueue_block_editor_assets', 'block_visibility_add_on_example_enqueue_editor_assets', 1000 );

	// Enqueue scripts and styles for the Block Visibility settings page UI.
	add_action( 'admin_enqueue_scripts', 'block_visibility_add_on_example_enqueue_settings_assets' );

	// Run the Example Control test if on the frontend.
	if ( ! is_admin() ) {
		add_filter( 'block_visibility_control_set_is_block_visible', 'block_visibility_add_on_example_control_test', 10, 3 );
	}
}

// Use priority 15 or greater to ensure the add-on loads after the base plugin and the Pro add-on.
add_action( 'plugins_loaded', 'block_visibility_add_on_example_load_plugin', 15 );
