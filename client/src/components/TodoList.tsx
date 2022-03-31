import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
import SortPanel from "./SortPanel";
import {todoAPI} from "../services/TodoService";
import Loader from "./Loader";
import {showToast} from "../utils/showToast";
import {IFilterParams, ISortParams} from "../models/todo/todo.types";

interface ITodoListProps {
    filters: IFilterParams
}

const TodoList: React.FC<ITodoListProps> = ({filters}) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(15);
    const [sort, setSort] = useState<ISortParams>();

    const {data: data, error, isLoading, refetch} = todoAPI.useFetchAllTodosQuery({page, limit, sort: JSON.stringify(sort), filters: JSON.stringify(filters)});

    const todos = data?.todos;
    const todosCount = data?.count;

    useEffect(() => {
        setPage(1);
    }, [filters])

    useEffect(() => {
        refetch();
    }, [sort, filters])

    if (isLoading) {
        return <Loader/>
    }

    if (!todos || todos.length === 0) {
        return (<></>);
    }

    return (<>
        <table className="table table-hover text-center align-middle mt-3">
            <thead className="text-dark">
            <tr>
                <th scope="col" className="col-md-0"></th>
                <th scope="col" className="col-md-1-5">
                    Status
                    <SortPanel field={'completed'} sort={sort} setSort={setSort}/>
                </th>
                <th scope="col" className="col-md-3-5">
                    Description
                    <SortPanel field={'description'} sort={sort} setSort={setSort}/>
                </th>
                <th scope="col" className="col-md-2">
                    Date
                    <SortPanel field={'deadline'} sort={sort} setSort={setSort}/>
                </th>
                <th scope="col" className="col-md-2">
                    File
                    <SortPanel field={'filepath'} sort={sort} setSort={setSort}/>
                </th>
            
            </tr>
            </thead>
            <tbody>
            {todos.map((todo, index) => {
                return <TodoItem
                    key={todo.todoId}
                    index={(page - 1) * limit + index + 1}
                    todo={todo}
                />
            })}
            </tbody>
        </table>
        {todosCount && todosCount > limit &&
        <Pagination currentPage={page} pageCount={Math.ceil(todosCount / limit)}
                    onPageChange={selectedItem => setPage(selectedItem.selected + 1)}/>}
    </>)
}

export default TodoList;