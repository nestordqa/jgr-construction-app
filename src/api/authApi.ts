import axiosClient from "./axiosClient";

export type LoginPayload = {
    email: string;
    password: string;
};

export const loginRequest = (data: LoginPayload) =>
    axiosClient.post<{ token: string }>("/auth/login", data);

export const registerRequest = (data: LoginPayload) =>
    axiosClient.post<void>("/auth/register", data);
