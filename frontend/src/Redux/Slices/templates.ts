/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const templates = (state: any, action: { payload: any; }) => (
    {
        ...state,
        data: action.payload,
    }
)



export const templatesSlice = createSlice({
    name: 'templates',
    initialState: {
        data: {}
    },
    reducers: {
        getTemplates: templates
    }
})

export const { getTemplates } = templatesSlice.actions

export default templatesSlice.reducer