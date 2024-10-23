/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

type templateState = {
    favorites?: string[],
    downloadReady?: string[]
}

const getState = (state: any, action: { payload: templateState; }) => (
    {
        ...state,
        ...action.payload,
    }
)

// const filter = () => { }


export const templatesStateSlice = createSlice({
    name: 'templates',
    initialState: {
        favorites: [],
        downloadReady: []

    },
    reducers: {
        templatesState: getState,
    }
})

export const { templatesState } = templatesStateSlice.actions

export default templatesStateSlice.reducer