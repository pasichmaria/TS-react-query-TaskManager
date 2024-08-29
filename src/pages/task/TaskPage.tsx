import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {FaPlus} from "react-icons/fa";

import {useDeleteTask} from "../../hooks";
import {TaskCreateForm} from './TaskCreateForm';
import {TaskEditForm} from './TaskEditForm';
import {Button, Card, FloatingActionButton, Loading, Section} from '../../components';
import {Task, TaskListProps} from '../../interfaces';

export const TaskPage = ({tasks, isTasksLoading, getTasks}: TaskListProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [checkedTasks, setCheckedTasks] = useState(new Set<string>());

    const openForm = (task?: Task) => {
        setSelectedTask(task || null);
        setIsFormOpen(true);
    };

    const {deleteTask} = useDeleteTask({
        onSuccess: () => {
            toast.success("Task deleted successfully");
            getTasks();
        },
        onError: (_error) => {
            toast.error('Error deleting task :( ')
        },
    });

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedTask(null);
    };

    const handleCheckboxChange = (taskId: string) => {
        const updatedCheckedTasks = new Set(checkedTasks);
        if (updatedCheckedTasks.has(taskId)) {
            updatedCheckedTasks.delete(taskId);
        } else {
            updatedCheckedTasks.add(taskId);
        }
        setCheckedTasks(updatedCheckedTasks);
    };

    const handleDeleteCheckedTasks = () => {
        checkedTasks.forEach((taskId) => {
            deleteTask(taskId)
        });
        setCheckedTasks(new Set());
    };

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    if (isTasksLoading) {
        return <Loading/>;
    }

    return (
        <Section className="p-6 md:p-8">
            <h1 className="p-8 uppercase text-gray-800 font-semibold">Tasks List</h1>
            {tasks.length === 0 ? (
                <div className="text-left text-gray-500">No tasks available</div>
            ) : (
                <div
                    className="md:border-r-2 p-4 border-dashed rounded-lg border-l-4 border-blue-500 shadow-md  shadow-hover:shadow-xl transition-shadow duration-300 w-full max-w-lg mx-auto md:max-w-full">
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {tasks.map((task: Task) => (
                            <div key={task.id} className="p-4">
                                <Card
                                    task={task}
                                    onEdit={() => openForm(task)}
                                    onDelete={() => deleteTask(task.id as string )}
                                />
                            </div>
                        ))}
                    </div>

                    <table className="hidden md:table w-full text-gray-800">
                        <thead>
                        <tr>
                            <th className="text-left p-4">Select</th>
                            <th className="text-left p-4">Id</th>
                            <th className="text-left p-4">Title</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task: Task) => (
                            <tr key={task.id} className="border-t text-left hover:bg-gray-100">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(task.id as string)}
                                        checked={checkedTasks.has(task.id as string)}
                                    />
                                </td>
                                <td className="p-4">
                                    <Link
                                        to={`/tasks/${task.id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {task.id}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Link
                                        to={`/tasks/${task.id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {task.title}
                                    </Link>
                                </td>
                                <td className="p-4 text-gray-700">{task.description}</td>
                                <td className="p-4">
                                    {task.completed ? (
                                        <span className="text-green-600">Completed</span>
                                    ) : (
                                        <span className="text-red-600">Not completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedTask && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="p-8 rounded-lg">
                        <TaskEditForm closeForm={closeForm} getTasks={getTasks} task={selectedTask}/>
                    </div>
                </div>
            )}

            {!selectedTask && isFormOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="p-8 rounded-lg bg-white">
                        <TaskCreateForm closeForm={closeForm} getTasks={getTasks}/>
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-4">
                {checkedTasks.size > 0 && (
                    <Button color="red" onClick={handleDeleteCheckedTasks}>
                        Delete Checked Tasks
                    </Button>
                )}
            </div>
            <FloatingActionButton icon={<FaPlus/>} onClick={() => openForm()} ariaLabel="Add Task"/>
        </Section>
    );
};
