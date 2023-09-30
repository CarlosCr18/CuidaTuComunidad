import { useEffect, useState } from 'react';
import { Card } from '../../components/Card/Card';
import './List.scss';
import { useNavigate } from 'react-router-dom';
const ACTION_BUTTONS = {
	LIKE: 'Dar me gusta',
	EDIT: 'Editar',
	DELETE: 'Borrar',
};

function TasksList() {
	const navigate = useNavigate();
	const [isReady, setIsReady] = useState(false);
	const cards = [
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 0,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
		{
			title: 'Titulo',
			description: 'descripcion',
			date: 'card.date',
			state: 'state',
			creator: 'creator',
			likes: 200,
		},
	];

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 1000);
	}, [setIsReady]);

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
			{isReady ? (
				<div className="listContainer">
					{cards && cards.length > 0 ? (
						cards.map((card, index) => {
							console.log({ card });
							return (
								<Card
									key={`${card.title}_${index}`}
									title={card.title}
									description={card.description}
									date={card.date}
									state={card.state}
									creator={card.creator}
									likes={card.likes}
									likeButton={ACTION_BUTTONS.LIKE}
									editButton={ACTION_BUTTONS.EDIT}
									deleteButton={ACTION_BUTTONS.DELETE}
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
		</section>
	);
}

export default TasksList;
