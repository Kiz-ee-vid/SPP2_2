import PinoPretty from "pino-pretty";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {PatchPlus, Pencil, X} from "react-bootstrap-icons";
import {ITodo} from "../models/todo/ITodo";
import {todoAPI} from "../services/TodoService";
import {daysLeft, getFileName, isOverdue} from "../utils/converter";
import {showToast, ToastReason} from "../utils/showToast";
import EditTodoModal from "./modals/EditTodoModal";

interface TodoItemProps {
    index: number;
    todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({index, todo}) => {
    const [modalShow, setModalShow] = useState(false);
    const [updateTodo] = todoAPI.useUpdateTodoMutation();
    const [deleteTodo] = todoAPI.useDeleteTodoMutation();

    const statusChangeHandler = async () => {
        const body = {...todo, completed: !todo.completed};

        await updateTodo({todoId: todo.todoId!, body})
            .unwrap()
            .then(onUpdateStatusSuccess)
            .catch(onUpdateStatusError);
    };

    const onUpdateStatusSuccess = () => { };
    const onUpdateStatusError = () => { };
    const onDeleteTodoSuccess = () => { };
    const onDeleteTodoError = () => { };

    const deleteHandler = async () => {
        await deleteTodo(todo)
            .unwrap()
            .then(onDeleteTodoSuccess)
            .catch(onDeleteTodoError);
    };

    return (
        <tr className={todo.completed ? "table-success" : isOverdue(todo.deadline) ? "table-danger" : ""}>
            <td>{index}</td>
            <td>
                <div className="d-flex ms-4">
                    <input id="statusCheckBox" className="form-check-input" type="checkbox" name="status"
                    onChange={statusChangeHandler} checked={todo.completed}/>
                    <div className="ms-3">
                        {todo.completed ? "Completed" : "Not completed"}
                    </div>
                </div>
            </td>
            <td>
                {todo.description}
            </td>
            <td>
                <div className="d-flex justify-content-between pe-4">
                    <div>
                        {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                        }).format(new Date(todo.deadline!))}
                    </div>

                </div>
            </td>
            <td>
                {todo.filepath ?
                    <a href={`/${todo.filepath}`} download>{getFileName(todo.filepath)}</a> :
                    <div>&mdash;</div>}
            </td>
            <td>
                <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => setModalShow(true)}>
                        <PatchPlus />
                    </Button>
                    <Button variant="success" onClick={deleteHandler}>
                        <X/>
                    </Button>
                </div>
            </td>
            <EditTodoModal index={index} show={modalShow} onHide={() => setModalShow(false)} todo={todo}/>
        </tr>
    );
};

export default TodoItem;
