import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import Button from "../components/shared/Button";

export const TasksPage = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        editingTask,
        editTask,
        updateTaskById,
        deleteTaskById,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateOrUpdate = async (data: {
        title: string;
        description?: string;
    }) => {
        if (editingTask) {
            await updateTaskById(editingTask.id, {
                title: data.title,
                description: data.description,
                isCompleted: editingTask.isCompleted,
            });
        } else {
            await addTask(data);
        }
    };

    const handleToggleCompleted = async (task: any) => {
        await updateTaskById(task.id, {
            title: task.title,
            description: task.description,
            isCompleted: !task.isCompleted,
        });
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <header className="bg-gray-800 shadow-lg px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div>
                    <h1 className="text-lg font-semibold text-gray-100">JGR Construction - Tasks</h1>
                    <p className="text-xs text-gray-400">
                        User: {user?.email ?? "Unknown"}
                    </p>
                </div>
                <Button
                    onClick={handleLogout}
                    text="Logout"
                    size="small"
                    color= "secondary" 
                />
            </header>

            <main className="max-w-2xl mx-auto mt-4 p-4 bg-gray-800 shadow-xl rounded-lg border border-gray-700">
                <TaskForm
                    onSubmit={handleCreateOrUpdate}
                    editingTask={editingTask ?? undefined}
                    onCancelEdit={() => editTask(null)}
                />

                {loading && <p className="text-sm text-gray-300">Loading tasks...</p>}
                {error && <p className="text-sm text-red-400 mb-2">{error}</p>}

                <TaskList
                    tasks={tasks}
                    onEdit={editTask}
                    onDelete={deleteTaskById}
                    onToggleCompleted={handleToggleCompleted}
                    editingTask={editingTask}
                />
            </main>
        </div>
    );
};
