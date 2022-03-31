import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITodo} from "../models/todo/ITodo";
import {CreateTodoParams, FetchAllTodosParams, FetchAllTodosResult, UpdateTodoParams} from "../models/todo/todo.types";


export const todoAPI = createApi({
    reducerPath: "todoAPI",
    // tslint:disable-next-line:object-literal-sort-keys
    baseQuery: fetchBaseQuery({baseUrl: "/api/"}),
    tagTypes: ["Todo"],
    endpoints: (build) => ({
        fetchAllTodos: build.query<FetchAllTodosResult, FetchAllTodosParams>({
            query: (params: FetchAllTodosParams) => ({
                url: "/todos",
                // tslint:disable-next-line:object-literal-sort-keys
                params,
            }),
            // tslint:disable-next-line:object-literal-sort-keys
            providesTags: result => ["Todo"]
        }),
        // tslint:disable-next-line:object-literal-sort-keys
        createTodo: build.mutation<ITodo, CreateTodoParams>({
            query: (params: CreateTodoParams) => ({
                url: '/todos',
                method: 'POST',
                body: params.body
            }),
            // tslint:disable-next-line:object-literal-sort-keys
            invalidatesTags: ['Todo']
        }),
        updateTodo: build.mutation<ITodo, UpdateTodoParams>({
            query: (params: UpdateTodoParams) => ({
                url: `/todos/${params.todoId}`,
                method: 'PUT',
                body: params.body
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: build.mutation<ITodo, ITodo>({
            query: (todo: ITodo) => ({
                url: `/todos/${todo.todoId}`,
                method: 'DELETE',
                body: todo
            }),
            invalidatesTags: ['Todo']
        })
    })
})
