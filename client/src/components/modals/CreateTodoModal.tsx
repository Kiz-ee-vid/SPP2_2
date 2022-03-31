import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import React, {ChangeEvent, useState} from "react";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {ITodo} from "../../models/todo/ITodo";
import {TodoErrorValidationResponse} from "../../models/todo/todo.types";
import {todoAPI} from "../../services/TodoService";
import {formatDate, prepareFormData} from "../../utils/converter";
import {showToast, ToastReason} from "../../utils/showToast";
import FileUpload from "../FileUpload";

// tslint:disable-next-line:interface-name
interface CreateTodoModalProps {
    show: boolean;
    onHide(): void;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = (props) => {
    const {onHide} = props;
    const [createTodo, {error}] = todoAPI.useCreateTodoMutation();

    const [todo, setTodo] = useState<ITodo>({});
    const [file, setFile] = useState<File | null>(null);

    const createTodoHandler = async () => {
        const body = file ? prepareFormData(todo, file) : todo;

        await createTodo({body})
            .unwrap()
            .then(onSuccess)
            // tslint:disable-next-line:no-shadowed-variable
            .catch((error) => onError(error));
    };

    const onSuccess = () => {

        setTodo({});
        onHide();
    };

    // tslint:disable-next-line:no-shadowed-variable
    const onError = (error: FetchBaseQueryError) => {
        const data = error.data as TodoErrorValidationResponse;

        for (const [key, value] of Object.entries(data.errors)) {
            const errorElement = document.getElementById(key);
            if (errorElement) {
                errorElement.innerText = value;
            }
        }
    };

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTodo((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        });
    };

    return (<>
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="description" className="required col-form-label">Description</label>
                    <input className="form-control" name="description"
                              onChange={(event) => onInputChangeHandler(event)}
                              value={todo?.description}
                              required>{}</input>
                    {error &&
                    <div id="description" className="align-self-end text-danger pt-1">{}</div>}
                </div>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="deadline" className="required col-form-label">Date</label>
                    <input type="date" className="form-control" name="deadline"
                           onChange={(event) => onInputChangeHandler(event)}
                           value={formatDate(todo?.deadline!)}/>
                    {error &&
                    <div id="deadline" className="align-self-end text-danger pt-1">{}</div>}
                </div>
                <FileUpload onChange={setFile}/>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="success" onClick={createTodoHandler}>Add</Button>
            </Modal.Footer>
        </Modal>
    </>);

};

export default CreateTodoModal;
