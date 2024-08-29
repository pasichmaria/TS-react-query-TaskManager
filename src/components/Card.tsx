import { Task } from "../interfaces";

import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TodoCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

export const Card = ({ task, onEdit, onDelete }: TodoCardProps) => {
    return (
   <div className="bg-gray-50 border-l-4 border-blue-500 border-r-2 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-lg mx-auto md:max-w-full">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="text-left">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                        {task.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">
                        {task.description}
                    </p>
                </div>
                <div className="flex md:flex-col md:space-x-0 space-x-4 items-center mt-2 md:mt-0 sm">
                    <button
                        onClick={onEdit}
                        className="flex items-center text-sm md:text-base text-blue-500 hover:text-blue-700 transition-colors"
                    >
                        <FiEdit className="mr-1" /> Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center text-sm md:text-base text-red-500 hover:text-red-700 transition-colors"
                    >
                        <FiTrash2 className="mr-1" /> Delete
                    </button>
                </div>
            </div>
            <div className="flex items-center mt-2">
                {task.completed ? (
                    <span className="text-sm text-green-500">
                    {task.completed ? "Completed" : ""}
                </span>
                ) : (
                    <span className="text-red-500">Not completed</span>
                )}

            </div>
        </div>
    );
};
