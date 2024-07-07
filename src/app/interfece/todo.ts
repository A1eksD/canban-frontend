import { fetchedUser } from "./fetchedUser";

export interface Todo {
    id?: number,
    title: string,
    description: string,
    creator: number,
    priority: number,
    assigned_users: number[] | [];
    subtasks: string[] | [];
    category: string
}
