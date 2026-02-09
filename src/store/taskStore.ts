import { create } from "zustand";
import { 
    createTask, 
    deleteTask, 
    getTasks, 
    updateTask, 
    type Task 
} from "../api/taskApi";

type TaskState = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    editingTask: Task | null;

    fetchTasks: () => Promise<void>;
    addTask: (data: { title: string; description?: string }) => Promise<void>;
    editTask: (task: Task | null) => void;
    updateTaskById: (
        id: number,
        data: { title?: string; description?: string; isCompleted?: boolean }
    ) => Promise<void>;
    deleteTaskById: (id: number) => Promise<void>;
};

export const useTaskStore = create<TaskState>((set, _get) => ({
    tasks: [], // Task list
    loading: false, // Loading state
    error: null, // Error message
    editingTask: null, // Task being edited
    
    // Fetch tasks from API
    fetchTasks: async () => {
        try {
            set({ loading: true, error: null });
            const res = await getTasks();
            set({ tasks: res.data });
        } catch (err) {
            set({ error: "Error al obtener tareas" });
        } finally {
            set({ loading: false });
        }
    },

    // Add a new task
    addTask: async ({ title, description }) => {
        try {
            const res = await createTask({ title, description });
            set((state) => ({ tasks: [...state.tasks, res.data] }));
        } catch {
            set({ error: "Error al crear tarea" });
        }
    },
    
    // Set the task being edited
    editTask: (task) => {
        set({ editingTask: task });
    },

    // Update a task by ID
    updateTaskById: async (id, data) => {
        try {
            const res = await updateTask(id, data);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? res.data : t)),
                editingTask: null,
            }));
        } catch {
            set({ error: "Error al actualizar tarea" });
        }
    },

    // Delete a task by ID
    deleteTaskById: async (id) => {
        try {
            await deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id),
            }));
        } catch {
            set({ error: "Error al eliminar tarea" });
        }
    },
}));
