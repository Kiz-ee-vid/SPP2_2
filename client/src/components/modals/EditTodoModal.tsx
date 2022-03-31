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
interface EditTodoModalProps {
    index: number;
    show: boolean;
    todo: ITodo;
    onHide(): void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = (props) => {
    const {todo, onHide} = props;
    const [updateTodo, {error}] = todoAPI.useUpdateTodoMutation();

    const [form, setForm] = useState<ITodo>(todo);
    const [file, setFile] = useState<File | null>(null);

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        });
    };

    const onRadioChangeHandler = (completed: boolean) => {
        setForm((prev) => {
            return {
                ...prev,
                completed,
            };
        });
    };

    const updateTodoHandler = async () => {
        const body = file ? prepareFormData(form, file) : form;

        await updateTodo({todoId: todo.todoId!, body})
            .unwrap()
            .then(onSuccess)
            .catch(onError);
    };

    const onSuccess = () => {

        onHide();
    };

    // tslint:disable-next-line:no-shadowed-variable
    const onError = (error: FetchBaseQueryError) => {
        const data = error.data as TodoErrorValidationResponse;

        showToast(data.message);

        for (const [key, value] of Object.entries(data.errors)) {
            const errorElement = document.getElementById(key);
            if (errorElement) {
                errorElement.innerText = value;
            }
        }
    };

    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <input className="form-control required" name="description"
                              onChange={(event) => onInputChangeHandler(event)} value={form.description}>{}</input>
                    {error &&
                    <div id="description" className="align-self-end text-danger pt-1">{}</div>}
                </div>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="deadline required" className="col-form-label">Date</label>
                    <input type="date" className="form-control" name="deadline"
                           onChange={(event) => onInputChangeHandler(event)}
                           value={formatDate(form.deadline!)}/>
                    {error &&
                    <div id="deadline" className="align-self-end text-danger pt-1">{}</div>}
                </div>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="status" className="col-form-label">Status</label>
                    <div className="d-flex flex-column">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="status" id="completed"
                                   onChange={() => onRadioChangeHandler(true)} checked={form.completed}/>
                            <label className="form-check-label" htmlFor="completed">
                                Completed
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="status" id="inProgress"
                                   onChange={() => onRadioChangeHandler(false)} checked={!form.completed}/>
                            <label className="form-check-label" htmlFor="completed">
                                Not completed
                            </label>
                        </div>
                    </div>
                </div>
                <FileUpload onChange={setFile}/>
            </Modal.Body>
            <Modal.Footer>

                <Button className="btn-success" onClick={() => updateTodoHandler()}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTodoModal;
