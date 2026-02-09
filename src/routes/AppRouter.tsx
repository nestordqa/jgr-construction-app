import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TasksPage } from "../pages/TasksPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/tasks"
                element={
                    <PrivateRoute>
                        <TasksPage />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
);
