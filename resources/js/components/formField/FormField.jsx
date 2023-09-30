import './FormField.scss';
export const FormField = ({
	title,
	error,
	register,
	registerTitle,
	...rest
}) => {
	return (
		<div className="field">
			<div className="input-container">
				<label className="label">
					<strong>{title}</strong>
				</label>
				<input
					className="input"
					{...register(registerTitle)}
					{...rest}
				/>
			</div>
			{!!error && <small className="input-error-text">{error}</small>}
		</div>
	);
};
