import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";

type Props = { children: JSX.Element };

// Protected route component that checks for authentication before rendering children
export const PrivateRoute = ({ children }: Props) => {
    const token = useAuthStore((s) => s.token);
    const isLoading = useAuthStore((s) => s.isLoading);

    if (isLoading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" replace />;

    return children;
};
