import { Link } from "react-router-dom";

export const NotFoundPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold">404</h1>
            <p className="text-sm text-gray-600">Page not found.</p>
            <Link
                to="/tasks"
                className="inline-block mt-2 text-sm text-blue-600 underline"
            >
                Go back to Tasks
            </Link>
        </div>
    </div>
);
