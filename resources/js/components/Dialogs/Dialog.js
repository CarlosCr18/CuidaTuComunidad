import Swal from 'sweetalert2';

export const showDialog = ({
	title = 'Titulo',
	text = 'Exito',
	type = 'success',
	showCancelButton = false,
	confirmButtonText = 'Ok',
	cancelButtonText = 'Cancelar',
	funcOnConfirm = () => {
		console.log('success');
	},
	funcOnCancel = () => {
		console.log('Cancel');
	},
}) => {
	Swal.fire({
		title,
		text,
		icon: type,
		showCancelButton,
		confirmButtonColor: '#007bff',
		cancelButtonColor: '#646464',

		confirmButtonText,
		cancelButtonText,
	}).then((result) => {
		if (result.isConfirmed) {
			funcOnConfirm();
		} else {
			funcOnCancel();
		}
	});
};
