import { fetchedUser } from "./fetchedUser";

export interface Todo {
    id?: number,
    title: string,
    description: string,
    creator: number,
    priority: number,
    assigned_users: fetchedUser[] | [];
    subtasks: string[] | [];
    category: string
}
