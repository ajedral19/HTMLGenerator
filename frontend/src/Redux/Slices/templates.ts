/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const getAll = (state: any, action: { payload: any; }) => (
    {
        ...state,
        data: action.payload,
    }
)

// const filter = () => { }


export const templatesSlice = createSlice({
    name: 'templates',
    initialState: {
        data: {}
    },
    reducers: {
        getTemplates: getAll,
    }
})

export const { getTemplates } = templatesSlice.actions

export default templatesSlice.reducer