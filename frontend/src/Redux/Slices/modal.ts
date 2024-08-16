import { createSlice } from "@reduxjs/toolkit";

type modal_types = "download" | "addTemplate" | "previewTemplate" | undefined

type modal = (
    state: {
        show: boolean
    },
    action: {
        payload: {
            show: boolean
            data?: unknown
            modal?: {
                type: modal_types
            }
        }
    }) => void

const modal: modal = (state, action) => ({
    ...state,
    show: action.payload.show,
    data: action.payload?.data,
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