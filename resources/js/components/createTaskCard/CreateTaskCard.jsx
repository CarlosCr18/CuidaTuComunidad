import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormField } from '../formField/FormField.jsx';
import { showDialog } from '../Dialogs/Dialog.js';
import { constants } from '../../assets/constants/index.js';
import { FormSelect } from '../formSelect/FormSelect.jsx';
import './CreateTaskCard.scss';
import { createTask } from '../../services/api/tasks.js';

export const CreateTaskCard = () => {
	const navigate = useNavigate();
	const schema = yup.object({
		title: yup
			.string()
			.required(`El titulo ${constants.validationConstants.required}o`),
		description: yup
			.string()
			.required(
				`La descripcion ${constants.validationConstants.required}a`
			),
		state: yup
			.string()
			.required(`El estado ${constants.validationConstants.required}o`),
		creator: yup
			.string()
			.required(
				`El nombre del creador ${constants.validationConstants.required}o`
			),
		likes: yup
			.number(
				`El numero de likes ${constants.validationConstants.number}`
			)
			.required(
				`El numero de likes ${constants.validationConstants.required}o`
			)
			.integer(
				`El numero de likes ${constants.validationConstants.integer}`
			)
			.typeError(
				`El numero de likes ${constants.validationConstants.number}`
			)
			.min(
				0,
				`El numero de likes ${constants.validationConstants.minNumber}0`
			),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			state: '',
			creator: '',
			likes: '',
		},
	});
	const backToMain = () => {
		navigate('/');
	};
	const onCreate = async (data) => {
		try {
			const response = await createTask({
				title: data.title,
				description: data.description,
				MXState: data.state,
				creator: data.creator,
				likes: data.likes,
			});
			if (response) {
				showDialog({
					title: 'Exito',
					text: 'Exito al crear la tarea',
					type: 'success',
					funcOnConfirm: backToMain,
				});
			} else {
				showDialog({
					title: 'Error',
					text: 'Error al crear la tarea',
					type: 'error',
				});
			}
		} catch (error) {
			showDialog({
				title: 'Error',
				text: error?.response?.data || error,
				type: 'error',
			});
		}
	};

	const stateOptions = Object.keys(constants.MXStates);

	return (
		<form
			onSubmit={handleSubmit(onCreate)}
			style={{ display: 'flex', justifyContent: 'center' }}
		>
			<div className="card">
				<div className="card-header">
					<FormField
						title={'Titulo'}
						error={errors?.title?.message}
						register={register}
						registerTitle={'title'}
					/>
					<FormField
						title={'Descripcion'}
						error={errors?.description?.message}
						register={register}
						registerTitle={'description'}
					/>
					<FormSelect
						title={'Estado'}
						error={errors?.state?.message}
						register={register}
						registerTitle={'state'}
						options={stateOptions}
					/>
					<FormField
						title={'Nombre del creador'}
						error={errors?.creator?.message}
						register={register}
						registerTitle={'creator'}
					/>
					<FormField
						title={'Likes'}
						error={errors?.likes?.message}
						register={register}
						registerTitle={'likes'}
					/>
				</div>
				<div className="card-actions">
					<>
						<button
							className={'action-button primary'}
							type="submit"
						>
							Crear tarea
						</button>
						<button
							className="action-button"
							type="button"
							onClick={backToMain}
						>
							Regresar
						</button>
					</>
				</div>
			</div>
		</form>
	);
};
