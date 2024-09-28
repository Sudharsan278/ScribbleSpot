import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./reducers/modeReducer";

export const store = configureStore({
    reducer : {
        mode : modeReducer
    }
})
