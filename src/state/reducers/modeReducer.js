import { createSlice } from "@reduxjs/toolkit";

const initialState = 'light'

export const modeReducer = createSlice({
    name : 'mode',
    initialState,
    reducers : {
        changeMode : (state, action) => {
            state = action.payload;
            document.body.style.backgroundColor = state==='light' ? '#FAF0E6' : '#042743';
            return action.payload;
        }
    }
})

export const {changeMode} = modeReducer.actions;

export default modeReducer.reducer;
