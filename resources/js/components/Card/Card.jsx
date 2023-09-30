import { useState } from 'react';
import './Card.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormField } from '../formField/FormField';
import { showDialog } from '../Dialogs/Dialog';
export const Card = ({
	title,
	description,
	date,
	state,
	creator,
	likes,
	likeButton,
	editButton,
	deleteButton,
}) => {
	const schema = yup.object({
		likes: yup
			.number('Debe ser un número')
			.required('Es requerido')
			.integer('Debe ser un número entero')
			.typeError('Debe ser un número')
			.min(0, 'No puede ser menor que 0'),
	});
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
		defaultValues: {
			likes,
		},
	});
	const [liked, setLiked] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const successDialog = () => {
		showDialog({
			title: 'Exito',
			text: 'Exito al actualizar la informacion',
			type: 'success',
		});
	};

	const errorDialog = () => {
		showDialog({
			title: 'Error',
			text: 'Error al actualizar la informacion',
			type: 'error',
		});
	};

	const onEdit = async (data) => {
		console.log({ data });
		const response = await new Promise((resolve) =>
			setTimeout(resolve(true), 1000)
		);
		if (response) {
			//mutateAsync;
			successDialog();
			setIsEditing(false);
		} else {
			errorDialog();
		}
	};
	const onDelete = async () => {
		if (likes > 0) {
			//error toast likes
			showDialog({
				title: 'Error al eliminar',
				text: 'No se puede eliminar si los likes son mayor a cero',
				type: 'error',
			});
			return;
		}
		const funcOnConfirm = async () => {
			const response = await new Promise((resolve) =>
				setTimeout(resolve, 1000)
			);
			if (response) {
				//mutateAsync;
				successDialog();
			} else {
				errorDialog();
			}
		};
		showDialog({
			title: 'Eliminar tarea',
			text: `Estas seguro de eliminar la tarea ${title}`,
			type: 'question',
			funcOnConfirm,
			showDialogThen: true,
			showCancelButton: true,
			titleOnSuccess: 'Exito',
			textOnSuccess: 'Exito al actualizar la informacion',
		});
	};

	const handleOnLikeClick = async () => {
		setLiked(true);
		const response = await new Promise((resolve) =>
			setTimeout(resolve, 1000)
		);
		if (response) {
			//mutateAsync;
			successDialog();
		} else {
			errorDialog();
			setLiked(false);
		}
	};

	const actionButtons = () => {
		if (!isEditing) {
			return (
				<>
					{likeButton && (
						<button
							className={`action-button primary ${
								liked ? 'disabled' : ''
							}`}
							disabled={liked}
							onClick={handleOnLikeClick}
						>
							{likeButton}
						</button>
					)}
					{editButton && (
						<button
							className="action-button"
							onClick={() => {
								setIsEditing(true);
							}}
						>
							{editButton}
						</button>
					)}
					{deleteButton && (
						<button
							className="action-button delete"
							onClick={onDelete}
						>
							{deleteButton}
						</button>
					)}
				</>
			);
		}
		return (
			<>
				<button
					className={'action-button primary'}
					onClick={handleSubmit(onEdit)}
				>
					Guardar
				</button>
				<button
					className="action-button"
					onClick={() => {
						setIsEditing(false);
						reset();
					}}
				>
					Cancelar
				</button>
			</>
		);
	};

	return (
		<div className="card">
			<div className="card-header">
				<h3 className="card-title">{title}</h3>
			</div>
			<div className="card-body">
				<p className="card-description">{description}</p>
				<p className="card-date">
					<strong>Fecha:</strong> {date}
				</p>
				<p className="card-state">
					<strong>Estado:</strong> {state}
				</p>
				<p className="card-creator">
					<strong>Creador:</strong> {creator}
				</p>
				{isEditing ? (
					<FormField
						title={'Likes'}
						error={errors?.likes?.message}
						register={register}
						registerTitle={'likes'}
					/>
				) : (
					<p className="card-likes">
						<strong>Likes:</strong> {likes}
					</p>
				)}
			</div>
			<div className="card-actions">{actionButtons()}</div>
		</div>
	);
};
