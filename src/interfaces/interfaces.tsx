export interface Task {
    id?: string
    title: string;
    description: string;
    completed: boolean;
}
export interface TaskListProps {
    tasks: Task[];
    isTasksLoading: boolean;
    getTasks: () => void;
}
