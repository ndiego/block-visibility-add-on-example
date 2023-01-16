/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fill, ToggleControl } from '@wordpress/components';

/**
 * Renders the Example Control settings.
 *
 * Note: Try to use the same markup for the settings panel. This
 * will ensure all extensions have the same aesthetic.
 *
 * @since 0.1.0
 * @param {Object} props All the props passed to this function.
 * @return {JSX.Element} Return the Example Control settings UI.
 */
function ExampleControl( props ) {
	const { visibilityControls, setVisibilityControls } = props;

	// Manually set defaults.
	const enable = visibilityControls?.example_control?.enable ?? true;

	return (
		<div className="settings-panel">
			<div className="settings-panel__header">
				<span className="settings-panel__header-title">
					{ __(
						'Example Control',
						'block-visibility-add-on-example'
					) }
				</span>
			</div>
			<div className="settings-panel__container">
				<div className="settings-type__toggle has-info-popover">
					<ToggleControl
						label={ __(
							'Enable the Example Control.',
							'block-visibility-add-on-example'
						) }
						checked={ enable }
						onChange={ () =>
							setVisibilityControls( {
								...visibilityControls,
								example_control: {
									...visibilityControls.example_control,
									enable: ! enable,
								},
							} )
						}
					/>
				</div>
			</div>
		</div>
	);
}

/**
 * Slot in the Example Control settings.
 *
 * Note: Other extensions might use the same filter, so you need to
 * also return any existing visibility control settings.
 *
 * @since 0.1.0
 * @param {JSX.Element} VisibilityControlSettings All other settings using the same filter.
 * @return {JSX.Element}                          Return the updated settings.
 */
function addVisibilityControls( VisibilityControlSettings ) {
	return ( props ) => (
		<>
			<VisibilityControlSettings { ...props } />
			<Fill name="VisibilityControlsMiddle">
				<ExampleControl { ...props } />
			</Fill>
		</>
	);
}

addFilter(
	'blockVisibility.VisibilityControls',
	'block-visibility-add-on-example/add-visibility-controls',
	addVisibilityControls,
	15 // Use priority 15 or greater to avoid conflicts with Pro add-on.
);
