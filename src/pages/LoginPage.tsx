import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "../components/shared/Button";

export const LoginPage = () => {
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await login(email, password);
            navigate("/tasks");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err?.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-sm space-y-4 border border-gray-700"
            >
                <h1 className="text-xl font-semibold text-center text-gray-100">
                    JGR Construction - Login
                </h1>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div>
                    <label className="block text-sm mb-1 text-gray-300">Email</label>
                    <input
                        type="email"
                        className="border border-gray-600 bg-gray-700 text-gray-100 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-gray-300">Password</label>
                    <input
                        type="password"
                        className="border border-gray-600 bg-gray-700 text-gray-100 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <Button 
                    type="submit"
                    disabled={loading}
                    text={loading ? "Logging in..." : "Login"}
                /> 

                <p className="text-xs text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link className="text-blue-400 hover:text-blue-300" to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};
