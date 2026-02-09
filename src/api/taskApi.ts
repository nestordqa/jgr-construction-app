import axiosClient from "./axiosClient";

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  isCompleted?: boolean;
  createdAt?: string;
};

export const getTasks = () => axiosClient.get<Task[]>("/tasks");

export const createTask = (data: Pick<Task, "title" | "description">) =>
    axiosClient.post<Task>("/tasks", data);

export const updateTask = (
    id: number,
    data: Partial<Pick<Task, "title" | "description" | "isCompleted">>
) => axiosClient.put<Task>(`/tasks/${id}`, data);

export const deleteTask = (id: number) =>
    axiosClient.delete<void>(`/tasks/${id}`);
