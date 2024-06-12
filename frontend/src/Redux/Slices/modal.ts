import { createSlice } from "@reduxjs/toolkit";

type modal = (
    state: {
        show: boolean
    },
    action: {
        payload: {
            show: boolean
            modal?: {
                type: string
            }
        }
    }) => void

const modal: modal = (state, action) => ({
    ...state,
    show: action.payload.show,
    modal: { type: action.payload.modal?.type }
})

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        show: false,
    },
    reducers: {
        showModal: modal
    }
})

export const { showModal } = modalSlice.actions

export default modalSlice.reducer