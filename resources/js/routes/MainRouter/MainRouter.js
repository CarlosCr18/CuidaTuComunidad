import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";

//components
const TasksList = lazy(() => import("../../pages/list/List.jsx"));
// const RecoverAccount = lazy(() => import("../../../pages/guest/Login/RecoverAccount/RecoverAccount"));
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
                            <TasksList />
                        }
                    />
                </Routes>
            </Router>
        </main>
    );
};

// export default MainRoute

const container = document.getElementById('reactRoute');
const root = createRoot(container); 
root.render(<MainRoute />);