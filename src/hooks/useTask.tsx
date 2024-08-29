import {useMutation, useQuery} from 'react-query';

import {Task} from "../interfaces";
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../API";


interface requestProps {
    onSuccess: () => void;
    onError: (error: Error) => void;
}

export const useTasks = () => {
    const tasksQuery = useQuery<Task[], Error, Task[]>("tasks", async () => {
        return getTasks();
    })
    return {
        getTasks: tasksQuery.refetch,
        tasks: tasksQuery.data,
        isTasksLoading: tasksQuery.isLoading,
        isTasksError: tasksQuery.isError,
    };
};


export const useTask = (id: string) => {
    const taskQuery = useQuery<Task, Error, Task>(["task", id], async () => {
        return await getTaskById(id);
    })
    return {
        getTaskById: taskQuery.refetch,
        task: taskQuery.data,
        isTaskLoading: taskQuery.isLoading,
        isTaskError: taskQuery.isError,
    }
}

export const useCreateTask = ({onSuccess, onError}: requestProps) => {
    const createTaskMutation = useMutation<Task, Error, Task>(async (data) => {
        return await createTask(data)
    }, {
        onSuccess: () => {
            onSuccess();
        }, onError: (error) => {
            onError(error);
        }
    });
    return {
        createTask: createTaskMutation.mutate,
        isCreateLoading: createTaskMutation.isLoading,
        isCreateError: createTaskMutation.isError
    };
};

export const useUpdateTask = ({onSuccess, onError}: requestProps) => {

    const updateTaskMutation = useMutation<Task, Error, Task>(async (data) => {
        return await updateTask(data);
    }, {
        onSuccess: () => {
            onSuccess();
        }, onError: (error) => {
            onError(error);
        }
    });
    return {
        updateTask: updateTaskMutation.mutate,
        isUpdateLoading: updateTaskMutation.isLoading,
        isUpdateError: updateTaskMutation.isError
    };
};

export const useDeleteTask = ({onSuccess, onError}: requestProps) => {
    const deleteTaskMutation = useMutation<void, Error, string>(async (id: string): Promise<void> => {
        return await deleteTask(id)
    }, {
        onSuccess: () => {
            onSuccess()
        }, onError: (error) => {
            onError(error)
        }
    });
    return {
        deleteTask: deleteTaskMutation.mutate,
    };
};