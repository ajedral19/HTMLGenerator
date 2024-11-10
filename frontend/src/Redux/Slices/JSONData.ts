import { createSlice } from "@reduxjs/toolkit";

type JSONData = (
    state: {
        data: any[]
    },
    action: {
        payload: {
            data: any[]
        }
    }
) => void

export const JSONData: JSONData = (state, action) => ({
    ...state,
    data: action.payload.data,
})

export const JSONDataSlice = createSlice({
    name: "jsondata",
    initialState: {
        data: []
    },
    reducers: {
        JSONDataReducer: JSONData
    }
})

export const { JSONDataReducer } = JSONDataSlice.actions
export default JSONDataSlice.reducer