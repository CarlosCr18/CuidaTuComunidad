import React, { Suspense, lazy } from 'react';
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
// const RecoveryCode = lazy(() => import("../../../pages/guest/Login/RecoveryCode/RecoveryCode"));
// const VerificationPassword = lazy (() => import ("../../../pages/guest/Login/VerificationPassword/VerificationPassword"));

const MainRoute = () => {
	return (
		<main>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Suspense>
								<TasksList />
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
