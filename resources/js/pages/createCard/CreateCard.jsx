import { CreateTaskCard } from '../../components/createTaskCard/CreateTaskCard.jsx';
import './CreateCard.scss';

function CreateCard() {
	return (
		<section className="container">
			<h1>Cuida tu comunidad</h1>
			<div className="task-header">
				<h2>Crear tarea nueva</h2>
			</div>
			<CreateTaskCard />
		</section>
	);
}

export default CreateCard;
