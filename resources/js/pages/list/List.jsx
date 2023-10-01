import { Card } from '../../components/Card/Card';
import './List.scss';
import { useNavigate } from 'react-router-dom';
import { FilterAndSearch } from '../../components/FilterAndSearch/FilterAndSearch';
import { useTasks } from '../../hooks/useTasks/useTasks.js';
const ACTION_BUTTONS = {
	LIKE: 'Dar me gusta',
	EDIT: 'Editar',
	DELETE: 'Borrar',
};

function TasksList() {
	const navigate = useNavigate();
	const {
		tasks,
		loading,
		MXState,
		setMXState,
		search,
		setSearch,
		mutateAsync,
		error,
		likedTasks,
		setLikedTasks,
	} = useTasks();

	const handleCreateTask = () => {
		navigate('/task/create');
	};

	return (
		<section className="list">
			<h1>Cuida tu comunidad</h1>
			<div className="task-header">
				<h2>Lista de tareas</h2>
				<button
					className="action-button primary"
					onClick={handleCreateTask}
				>
					Crear tarea
				</button>
			</div>
			<FilterAndSearch
				setSearch={setSearch}
				setState={setMXState}
				search={search}
				state={MXState}
			/>
			{!loading ? (
				<div className="listContainer">
					{tasks && tasks.length > 0 ? (
						tasks.map((card, index) => {
							console.log({ card });
							return (
								<Card
									key={`${card.title}_${index}`}
									id={card.id}
									title={card.title}
									description={card.description}
									date={card.date}
									state={card.state}
									creator={card.creator}
									likes={card.likes}
									likeButton={ACTION_BUTTONS.LIKE}
									editButton={ACTION_BUTTONS.EDIT}
									deleteButton={ACTION_BUTTONS.DELETE}
									mutateAsync={mutateAsync}
									likedTasks={likedTasks}
									setLikedTasks={setLikedTasks}
								/>
							);
						})
					) : (
						<p className="message">No se encontro informacion</p>
					)}
				</div>
			) : (
				<p className="message">Cargando informacion</p>
			)}
			{error && (
				<p className="message">Error al cargar informacion: {error}</p>
			)}
		</section>
	);
}

export default TasksList;
