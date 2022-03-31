import {ITodo} from "./ITodo";

export interface IFilterParams {
    filterQuery?: string,
    showInProgress?: boolean,
    showCompleted?: boolean,
    showOverdue?: boolean
}

type SortDirection = 'asc' | 'desc';

export interface ISortParams {
    [field: string]: SortDirection
}

export type FetchAllTodosParams = {
    limit: number,
    page: number,
    sort?: string,
    filters?: string
}

export type CreateTodoParams = {
    body: ITodo | FormData
}

export type UpdateTodoParams = {
    todoId: string,
    body: ITodo | FormData
}

export type FetchAllTodosResult = {
    todos: ITodo[],
    count: number
}

export interface IErrors {
    [field: string]: string
}

export type TodoErrorValidationResponse = {
    message: string,
    errors: IErrors
}