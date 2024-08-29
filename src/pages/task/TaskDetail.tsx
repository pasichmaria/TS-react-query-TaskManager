import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import {FiArrowLeft} from "react-icons/fi";

import {TaskEditForm} from './TaskEditForm';
import {Task} from '../../interfaces';
import {useDeleteTask} from "../../hooks";
import {Card, FloatingActionButton} from "../../components";

interface TaskDetailProps {
    tasks: Task[];
    getTasks: () => void
 }

export const TaskDetail = ({tasks, getTasks}: TaskDetailProps) => {
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const {taskId} = useParams<{ taskId: string }>();
    const task = tasks.find(t => t.id === taskId);

    const navigate = useNavigate();
    const {deleteTask} = useDeleteTask({
        onSuccess: () => {
            toast.success('Task deleted');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    if (!task) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Task not found</p>
            </div>
        );
    }

    const openEditForm = () => setEditFormOpen(true);
    const closeEditForm = () => setEditFormOpen(false);

    return (
        <div className="relative h-full bg-gray-100 p-4">
            <Card
                task={task}
                onEdit={openEditForm}
                onDelete={() => deleteTask(task.id as string)}
            />

            {isEditFormOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="p-8 rounded-lg">
                        <TaskEditForm getTasks={getTasks} task={task} closeForm={closeEditForm}/>
                    </div>
                </div>
            )}

            <FloatingActionButton onClick={() => {
                navigate('/')
            }} ariaLabel="Back to tasks" icon={<FiArrowLeft/>}/>
        </div>
    );
};
