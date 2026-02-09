import { useEffect, useState } from "react";
import type { Task } from "../api/taskApi";
import Button from "../components/shared/Button";

type Props = {
    onSubmit: (data: { title: string; description?: string }) => Promise<void>;
    editingTask?: Task | null;
    onCancelEdit?: () => void;
};

export const TaskForm = ({ onSubmit, editingTask, onCancelEdit }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description ?? "");
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editingTask]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <div className="flex gap-2">
                <input
                    className="border border-gray-600 bg-gray-700 text-gray-100 rounded flex-1 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    text={editingTask ? "Update" : "Add"}
                    size="small"
                    color="primary"
                />
            </div>
            <textarea
                className="border border-gray-600 bg-gray-700 text-gray-100 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
            />
            {editingTask && onCancelEdit && (
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="text-xs text-gray-400 hover:text-gray-300 underline"
                >
                    Cancel Edit
                </button>
            )}
        </form>
    );
};
