import './FormSelect.scss';
export const FormSelect = ({
	title,
	error,
	register,
	registerTitle,
	options = [],
	defaultOption = 'Selecciona una opcion',
	...rest
}) => {
	return (
		<div className="field">
			<div className="input-container">
				<label className="label">
					<strong>{title}</strong>
				</label>
				<select
					className="input"
					{...register(registerTitle)}
					{...rest}
				>
					<option value="">{defaultOption}</option>
					{options &&
						options.length > 0 &&
						options.map((optionToMap) => (
							<option key={optionToMap} value={optionToMap}>
								{optionToMap}
							</option>
						))}
				</select>
			</div>
			{!!error && <small className="input-error-text">{error}</small>}
		</div>
	);
};
