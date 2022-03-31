import {DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import Todo, {TodoDocument} from "../model/todo.model";
import {findOptions} from "../types";

export function countTodos(query: FilterQuery<TodoDocument>) {
    return Todo.countDocuments(query);
}

export function findAllTodos(query: FilterQuery<TodoDocument>, options?: findOptions) {
    return Todo.find(query, null, options);
}

export function findTodo(query: FilterQuery<TodoDocument>) {
    return Todo.findOne(query);
}

export function createTodo(input: DocumentDefinition<TodoDocument>) {
    try {
        return Todo.create(input);
    } catch (error) {
        throw new Error(error);
    }
}

// tslint:disable-next-line:max-line-length
export function findAndUpdate(query: FilterQuery<TodoDocument>, update: UpdateQuery<TodoDocument>, options: QueryOptions) {
    return Todo.findOneAndUpdate(query, update, options);
}

export function deleteTodo(query: FilterQuery<TodoDocument>) {
    return Todo.deleteOne(query);
}
