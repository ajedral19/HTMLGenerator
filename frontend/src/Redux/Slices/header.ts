import { createSlice } from "@reduxjs/toolkit";

type header = (
	state: {
		display:{
			isGrid: boolean
		}
	},
	action: {
		payload:{
			display: {
				isGrid: boolean
			}
		}
	}
) => void

const header: header = (state, action) => ({
	...state,
	display: {
		isGrid: action.payload.display.isGrid,
	},
});

export const headerSlice = createSlice({
	name: "headerOptions",
	initialState: {
		display: {
			isGrid: false,
		},
	},
	reducers: {
		headerOptions: header,
	},
});

export const { headerOptions } = headerSlice.actions;
export default headerSlice.reducer;
