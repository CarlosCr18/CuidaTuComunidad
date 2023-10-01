import React, { Suspense, lazy, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

//components
const TasksList = lazy(() => import('../../pages/list/List.jsx'));
const CreateCard = lazy(() => import('../../pages/createCard/CreateCard.jsx'));

const MainRoute = () => {
	const [likedTasks, setLikedTasks] = useState([]);
	return (
		<main>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Suspense>
								<TasksList
									likedTasks={likedTasks}
									setLikedTasks={setLikedTasks}
								/>
							</Suspense>
						}
					/>
					<Route
						path="/task/create"
						element={
							<Suspense>
								<CreateCard />
							</Suspense>
						}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</main>
	);
};

// export default MainRoute

const container = document.getElementById('reactRoute');
const root = createRoot(container);
root.render(<MainRoute />);
