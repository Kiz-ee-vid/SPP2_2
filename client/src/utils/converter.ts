import {ITodo} from "../models/todo/ITodo";

export function formatDate(date: string | Date | undefined): string {
    if (!date) {
        return "";
    }

    if (typeof(date) === "string") {
        date = new Date(date);
    }

    const mm: number = date.getMonth() + 1;
    const dd: number = date.getDate();

    return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
}

export const isOverdue = (deadline: string | undefined): boolean => {
    if (!deadline) {
        return false;
    }

    const date = new Date(deadline);
    return (date.getTime() - new Date().getTime()) < 0;
}

export const daysLeft = (deadline: string | undefined): number => {
    if (!deadline) {
        return 0;
    }



    const date = new Date(deadline);

    const difInSecs = date.getTime() - new Date().getTime();
    const difInDays = difInSecs / (1000 * 3600 * 24) + 1;

    return Math.round(difInDays);
}

export const getFileName = (filepath: string | undefined): string | null => {
    if (!filepath) {
        return null;
    }

    const pathParts = filepath.split("/");
    return pathParts[pathParts.length - 1];
}

export const prepareFormData = (todo: ITodo, file: File): FormData => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(todo)) {
        formData.append(key, value);
    }

    formData.append("file", file);
    return formData;
}
