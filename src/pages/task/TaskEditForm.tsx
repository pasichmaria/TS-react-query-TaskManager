import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { Button, Input, Row, Section } from '../../components';
import { validationSchema } from '../../formik';
import { useUpdateTask } from '../../hooks';
import { Task } from '../../interfaces';

interface TaskEditFormProps {
    task: Task;
    closeForm: () => void;
    getTasks: () => void;
}

export const TaskEditForm = ({ task, getTasks, closeForm }: TaskEditFormProps) => {
    const [_isOpen, setIsOpen] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { updateTask } = useUpdateTask({
        onSuccess: () => {
            toast.success('Task updated');
            getTasks()
            setIsSubmitted(true);

        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const formik = useFormik({
        initialValues: {
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            updateTask(values);
        }
    });

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                closeForm();
                setIsOpen(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isSubmitted, closeForm]);

    return (
        <Section className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md relative">
                <button
                    onClick={() => {
                        closeForm();
                        setIsOpen(false);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Task</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>)}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>)}
                    </div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="completed"
                            checked={formik.values.completed}
                            onChange={formik.handleChange}
                            className="form-checkbox text-blue-600"
                        />
                        <span className="text-gray-700">Completed</span>
                    </label>


                    <Row className="items-center space-x-4">
                        <Button color="blue" type="submit" className="w-full">
                            Save Changes
                        </Button>
                        <Button color="red" onClick={() => {
                            closeForm();
                            setIsOpen(false);
                        }} type="button" className="w-full">
                            Cancel
                        </Button>
                    </Row>
                </form>
            </div>
        </Section>)

};
