import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import PageSlice from "./PgStore/PageSlice";


const rootReducer = combineReducers({
    Pagereducer: PageSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;