import React from "react";
import {SortDown, SortUp} from "react-bootstrap-icons";
import {ISortParams} from "../models/todo/todo.types";

interface ISort {
    field: string;
    sort: ISortParams | undefined;
    setSort: (sort: ISortParams) => void;
}

const SortPanel: React.FC<ISort> = ({field, sort, setSort}) => {
    return (<>
            </>);
};

export default SortPanel;
