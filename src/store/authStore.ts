import { create } from "zustand";
import { loginRequest, registerRequest } from "../api/authApi";

type User = { email: string };

type AuthState = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    restoreSession: () => void;
};

export const useAuthStore = create<AuthState>((set, _get) => ({
    user: null,
    token: null,
    isLoading: true,

    // Gets token and user from localStorage on app start
    restoreSession: () => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            set({
                token: storedToken,
                user: JSON.parse(storedUser),
                isLoading: false,
            });
        } else {
            set({ isLoading: false });
        }
    },

    // Login function that calls API and stores token/user in state and localStorage
    login: async (email, password) => {
        const res = await loginRequest({ email, password });
        const token = res.data.token;
        const user = { email };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({ token, user });
    },

    // Register function that calls API to create a new user
    register: async (email, password) => {
        await registerRequest({ email, password });
        //TODO: Redirect to login page after successful registration
    },

    // Logout function that clears token/user from state and localStorage
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null, isLoading: false });
    },
}));
