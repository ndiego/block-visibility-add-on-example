/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Determine if the block has active Example Control settings.
 *
 * @since 0.1.0
 * @param {Object}  controls        All visibility controls for the block
 * @param {boolean} hasControlSets  Whether or not the block has a control set
 * @param {Array}   enabledControls Array of all enabled visibility controls
 * @return {boolean}		        Does the block have Example Control settings
 */
function hasExampleControl( controls, hasControlSets, enabledControls ) {
	// Controls are managed in "control sets". We need to ensure the block
	// has control sets and the Example Control has active settings.
	if ( hasControlSets && ! controls.hasOwnProperty( 'exampleControl' ) ) {
		return false;
	}

	// Check to make sure the Example Control is enabled in the plugin settings.
	// Blocks will retain control attributes, even if the control is disabled.
	if (
		! enabledControls.some(
			( control ) => control.settingSlug === 'example_control'
		)
	) {
		return false;
	}

	return controls?.exampleControl?.hideBlock ?? false;
}

/**
 * Add additional control types to the contextual indicator tests.
 *
 * @since 0.1.0
 * @param {Object}  activeControls  Object of all active controls
 * @param {Object}  blockVisibility Object of all block visibility attributes
 * @param {Object}  controls        All visibility controls for the block
 * @param {boolean} hasControlSets  Whether or not the block has a control set
 * @param {Array}   enabledControls Array of all enabled visibility controls
 * @param {Object}  variables       All available plugin variables
 * @return {Object}		               Updated active controls object including Example controls
 */
function addContextualIndicators(
	activeControls,
	blockVisibility,
	controls,
	hasControlSets,
	enabledControls,
	variables
) {
	// The 'block-visibility__has-example-control' class will get added to the block
	// wrapper if the Example Control has active settings.
	const activeExampleControls = {
		'example-control': hasExampleControl(
			controls,
			hasControlSets,
			enabledControls
		),
		// Add indicator tests for additional controls here.
	};

	return { ...activeControls, ...activeExampleControls };
}

addFilter(
	'blockVisibility.contextualIndicatorActiveControls',
	'block-visibility-add-on-example/add-contextual-indicators',
	addContextualIndicators
);
