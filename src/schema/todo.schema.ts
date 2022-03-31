import {date, object, string} from "yup";

const params = {
    params: object({
        todoId: string().required(""),
    }),
};

const payload = {
    body: object({
        description: string().required(""),
        // tslint:disable-next-line:object-literal-sort-keys
        deadline: date().required(""),
    }),
};

export const createTodoSchema = object({
    ...payload,
});

export const updateTodoSchema = object({
    ...params,
    ...payload,
});

export const deleteTodoSchema = object({
    ...params,
});
