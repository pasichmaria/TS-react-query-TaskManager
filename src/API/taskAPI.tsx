import { v4 as uuidv4 } from 'uuid';
import {Task} from "../interfaces";

export async function getTasks(): Promise<Task[]> {
    return fetch('http://localhost:8000/tasks')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}
export const getTaskById = async (id: string): Promise<Task> => {
    return fetch(`http://localhost:8000/tasks/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


export async function createTask (data : Task): Promise<Task> {
    const id = uuidv4();
     return fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data, id})
    }).then(response => response.json())
        .then(data => {
            return data;
        });
}

export async function updateTask(data : Task ): Promise<Task> {
    return fetch(`http://localhost:8000/tasks/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            return data;
        });
    }


export async function deleteTask(id: string): Promise<void> {
    return fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(data => {
            return data;
        });
}
