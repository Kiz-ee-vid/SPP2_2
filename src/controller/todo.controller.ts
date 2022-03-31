import {Request, Response} from "express";
import {get} from "lodash";
import log from "../logger";
import {countTodos, createTodo, deleteTodo, findAllTodos, findAndUpdate, findTodo} from "../service/todo.service";
import {IFilterParams} from "../types";
import {tryJsonParse} from "../utils/tryJsonParse";

export async function showAllTodosHandler(req: Request, res: Response) {
    const queryParams = get(req, "query");

    const filters = tryJsonParse(queryParams.filters, {}) as IFilterParams;

    const filterQuery = filters.filterQuery ?? "";
    const showInProgress = tryJsonParse(filters.showInProgress, true);
    const showCompleted = tryJsonParse(filters.showCompleted, true);
    const showOverdue = tryJsonParse(filters.showOverdue, true);

    const sort = tryJsonParse(queryParams.sort, {});

    const limit = tryJsonParse(queryParams.limit, 15);
    const skip = (tryJsonParse(queryParams.page, 1) - 1) * limit;

    const query = {
        description: new RegExp(".*" + filterQuery + ".*"),
        // tslint:disable-next-line:object-literal-sort-keys
        $or: [{
            $and: [
                {completed: showInProgress ? false : undefined},
                {deadline: {
                        $gte: !showOverdue ? Date.now() : "1970/01/01"},
                },
            ],
        },
            {completed: showCompleted ? true : undefined},
        ],
    };

    const todos = await findAllTodos(query, {skip, limit, sort});
    log.info(`[${todos.length}] Todos received`);

    const todosCount = await countTodos(query);
    log.info(`[${todosCount}] Todos count`);

    res.send({
        count: todosCount,
        todos,
    });
}

export async function getTodoHandler(req: Request, res: Response) {
    const todoId = get(req, "params.todoId");

    const todo = await findTodo({todoId});

    if (!todo) {
        log.warn(`Todo [${todoId}] not found`);
        return res.sendStatus(404);
    }

    log.info(`Todo [${todoId}] received`);

    res.send(todo);
}

export async function createTodoHandler(req: Request, res: Response) {
    try {
        const filepath = req.file?.path.substring(req.file?.path.search("uploads"));
        const todo = await createTodo({...req.body, filepath});
        log.info(`Todo [${todo.todoId}] created`);
        res.status(201).send(todo);
    } catch (e) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function updateTodoHandler(req: Request, res: Response) {
    const todoId = get(req, "params.todoId");
    const filepath = req.file?.path.substring(req.file?.path.search("uploads"));
    const update = {...req.body, filepath};
    update.completed = update.completed ?? false;

    const todo = await findTodo({todoId});

    if (!todo) {
        log.warn(`Todo [${todoId}] not found`);
        return res.sendStatus(404);
    }

    const updatedTodo = await findAndUpdate({todoId}, update, {new: true});
    log.info(`Todo [${todoId}] updated`);

    res.send(updatedTodo);
}

export async function deleteTodoHandler(req: Request, res: Response) {
    const todoId = get(req, "params.todoId");
    const todo = await findTodo({todoId});

    if (!todo) {
        return res.sendStatus(404);
    }

    await deleteTodo({todoId});
    log.info(`Todo [${todoId}] deleted`);

    res.sendStatus(204);
}
