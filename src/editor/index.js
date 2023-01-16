/**
 * External dependencies
 */
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './contextual-indicators';
import './inspector-controls';

/**
 * Add the Example Control to the blockVisibility attribute.
 *
 * Note: Use camel case for custom attributes.
 *
 * @since 0.1.0
 * @param {Object} attributes All block attributes.
 * @return {Object}           The updated array of attributes.
 */
function addAttributes( attributes ) {
	const controlSets =
		attributes?.blockVisibility?.properties?.controlSets?.items
			?.properties ?? null;

	const addonExampleControls = {
		exampleControl: {
			type: 'object',
			properties: {
				hideBlock: {
					type: 'boolean',
				},
			},
		},
	};

	controlSets.controls.properties = assign(
		controlSets.controls.properties,
		addonExampleControls
	);

	return attributes;
}

addFilter(
	'blockVisibility.attributes',
	'block-visibility-add-on-example/attributes',
	addAttributes
);

/**
 * Add the Example control to Block Visibility.
 *
 * Note: Settings use snake case and attributes use camel case.
 *
 * @since 0.1.0
 * @param {Object} controls All Block Visibility controls.
 * @return {Object}         The updated array of controls.
 */
function addExampleControls( controls ) {
	controls.push( {
		label: __( 'Example Control', 'block-visibility-add-on-example' ),
		attributeSlug: 'exampleControl',
		settingSlug: 'example_control',
	} );

	return controls;
}

/**
 * "Register" the Example Control in Block Visibility by adding it to the
 * array of available controls.
 */
addFilter(
	'blockVisibility.controls',
	'block-visibility-add-on-example/controls',
	addExampleControls
);

/**
 * You also need to manually add the Example Control to Block Visibility Pro.
 * Without this, the Example Control will not be available in Visibility Presets.
 */
addFilter(
	'blockVisibilityPro.controls',
	'block-visibility-add-on-example/controls',
	addExampleControls
);
