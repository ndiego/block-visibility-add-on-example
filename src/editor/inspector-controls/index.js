/**
 * External dependencies
 */
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fill, ToggleControl } from '@wordpress/components';

/**
 * Add the Example Control to the Visibility panel in the Editor.
 *
 * @since 0.1.0
 * @param {Object} props All the props passed to this function
 * @return {JSX.Element} Return the Example Control UI.
 */
function ExampleControl( props ) {
	const { enabledControls, controlSetAtts, setControlAtts } = props;

	const controlActive = enabledControls.some(
		( control ) =>
			control.settingSlug === 'example_control' && control.isActive
	);

	if ( ! controlActive ) {
		return null;
	}
	const exampleControl = controlSetAtts?.controls?.exampleControl ?? {};
	const hideBlock = exampleControl?.hideBlock ?? false;

	return (
		<div className="controls-panel-item add-on-example-control">
			<h3 className="controls-panel-item__header">
				{ __( 'Example Control', 'block-visibility-add-on-example' ) }
			</h3>
			<div className="controls-panel-item__description">
				{ __(
					'Add a description for the control.',
					'block-visibility-add-on-example'
				) }
			</div>
			<div className="controls-panel-item__fields">
				<ToggleControl
					label={ __(
						'Hide the block if toggled',
						'block-visibility'
					) }
					checked={ hideBlock }
					onChange={ () =>
						setControlAtts(
							'exampleControl',
							assign(
								{ ...exampleControl },
								{
									hideBlock: ! hideBlock,
								}
							)
						)
					}
				/>
			</div>
		</div>
	);
}

/**
 * Add additional inspector controls to the Visibility panel on each block.
 *
 * @param {JSX.Element} ControlSetControls All other controls using the same filter.
 * @return {JSX.Element}                   Return the updated controls.
 */
function addControlSetControls( ControlSetControls ) {
	return ( props ) => {
		const { uniqueIndex } = props;

		return (
			<>
				<ControlSetControls { ...props } />
				<Fill name={ 'ControlSetControlsMiddle-' + uniqueIndex }>
					<ExampleControl { ...props } />
				</Fill>
			</>
		);
	};
}

addFilter(
	'blockVisibility.addControlSetControls',
	'block-visibility-add-on-example/add-control-set-controls',
	addControlSetControls,
	15 // Filter after the Pro add-on.
);
