import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {todoAPI} from "../services/TodoService";

export const rootReducer = combineReducers({
    [todoAPI.reducerPath]: todoAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        // tslint:disable-next-line:object-literal-sort-keys
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todoAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
