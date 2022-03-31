type SortDirection = "asc" | "desc";

export interface ISortParams {
    [field: string]: SortDirection;
}

// tslint:disable-next-line:class-name interface-name
export interface findOptions {
    skip?: number;
    limit?: number;
    sort?: ISortParams;
}

export interface IFilterParams {
    filterQuery?: string;
    showInProgress?: boolean;
    showCompleted?: boolean;
    showOverdue?: boolean;
}
