import React from "react";
import ReactPaginate from "react-paginate";

// tslint:disable-next-line:interface-name
interface PaginationProps {
    currentPage: number,
    pageCount: number,

    onPageChange(selectedItem: { selected: number }): void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, pageCount, onPageChange}) => {
    if (currentPage > pageCount) {
        return null;
    }

    return (
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName={"pagination justify-content-end"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    );
};

export default Pagination;
