export interface Todo {
    title: string,
    description: string,
    creator: number,
    priority: number,
    assigned_users: number[] | [];
    subtasks: string[] | [];
    category: string
}
