import React, {ChangeEvent, useState} from "react";
import {Plus, Search} from "react-bootstrap-icons";
import CreateTodoModal from "./modals/CreateTodoModal";
import {Button} from "react-bootstrap";
import {IFilterParams} from "../models/todo/todo.types";
import TodoList from "./TodoList";

const TodoListFilterPanel: React.FC= () => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [filters, setFilters] = useState<IFilterParams>({
        filterQuery: '',
        showInProgress: true,
        showCompleted: true,
        showOverdue: true
    });

    const onFilterInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const onCheckBoxToggleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.checked
            }
        })
    }

    return (<>
        <div className="d-flex  text-nowrap">
            <div className="d-flex flex-column align-items-center">
                    <div className="input-group">
                    <div >
                        <input type="search" className="btn btn-success" placeholder="" name="filterQuery"
                                   onChange={event => onFilterInputChangeHandler(event)}
                                   value={filters.filterQuery}/>
                        </div>
                    <button type="button" className="btn btn-success" >
                            <Search/>
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="form-check form-check-inline">
                            <input id="showInProgress" name="showInProgress" className="form-check-input"
                                   type="checkbox"
                                   onChange={event => onCheckBoxToggleHandler(event)}
                                   checked={filters.showInProgress}/>
                            <label className="form-check-label" htmlFor="inProgress">Not completed</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input id="showCompleted" name="showCompleted" className="form-check-input" type="checkbox"
                                   onChange={event => onCheckBoxToggleHandler(event)}
                                   checked={filters.showCompleted}/>
                            <label className="form-check-label" htmlFor="completed">Completed</label>
                        </div>
                        <div className="form-check form-check-inline">
                           
                            <label className="form-check-label" htmlFor="completed"></label>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="success" onClick={() => setModalShow(true)} type="button" className="mr-2">
                         Add task
                    </Button>
                </div>
            </div>

            <TodoList filters={filters}/>

            <CreateTodoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default TodoListFilterPanel;