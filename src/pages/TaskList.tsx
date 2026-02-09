import type { Task } from "../api/taskApi";
import Button from "../components/shared/Button";

type Props = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onToggleCompleted: (task: Task) => void;
    editingTask?: Task | null;
};

export const TaskList = ({ tasks, onEdit, onDelete, onToggleCompleted, editingTask }: Props) => {
    if (!tasks.length) {
        return <p className="text-sm text-gray-400">There are no tasks yet.</p>;
    }

    return (
        <ul className="space-y-2">
            {tasks.map((task) => {
                const isEditing = editingTask?.id === task.id;
                return (
                <li
                    key={task.id}
                    className={`border rounded p-2 flex justify-between items-center gap-2 transition-colors ${
                        isEditing 
                            ? "border-blue-500 bg-blue-900/30" 
                            : "border-gray-600 bg-gray-700"
                    }`}
                >
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={Boolean(task.isCompleted)}
                        onChange={() => onToggleCompleted(task)}
                        disabled={Boolean(editingTask)}
                        className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                    <span
                        className={`text-sm ${
                            task.isCompleted ? "line-through text-gray-500" : "text-gray-100"
                        }`}
                    >
                        {task.title}
                    </span>
                    </div>
                    {task.description && (
                        <p className="text-xs text-gray-400 mt-1">{task.description}</p>
                    )}
                </div>
                <div className="flex gap-2 text-xs">
                    <Button
                        onClick={() => onEdit(task)}
                        disabled={Boolean(editingTask)}
                        text="Edit"
                        size="small"
                        color="secondary"
                    />
                    <Button
                        onClick={() => onDelete(task.id)}
                        disabled={Boolean(editingTask)}
                        text="Delete"
                        size="small"
                        color="warning"
                    />
                </div>
                </li>
            )})}
        </ul>
    );
};
