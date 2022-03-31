import {Router} from "express";
import {
    createTodoHandler,
    deleteTodoHandler,
    getTodoHandler,
    showAllTodosHandler,
    updateTodoHandler,
} from "../controller/todo.controller";
import validateRequest from "../middleware/validateRequest";
import {createTodoSchema, deleteTodoSchema, updateTodoSchema} from "../schema/todo.schema";
import upload from "../utils/fileUploader";

const router = Router();

// */api/todos
router.get("/", showAllTodosHandler);
router.get("/:todoId", getTodoHandler);
router.post("/", upload.single("file"), validateRequest(createTodoSchema), createTodoHandler);
router.put("/:todoId", upload.single("file"), validateRequest(updateTodoSchema), updateTodoHandler);
router.delete("/:todoId", validateRequest(deleteTodoSchema), deleteTodoHandler);

export default router;
