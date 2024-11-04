import { createSlice } from "@reduxjs/toolkit";

type header = (
	state: {
		display: {
			isGrid: boolean
			archives?: boolean
		}
	},
	action: {
		payload: {
			display: {
				isGrid: boolean
				archives?: boolean
			}
		}
	}
) => void

const header: header = (state, action) => ({
	...state,
	display: {
		isGrid: action.payload.display.isGrid,
		archives: action.payload.display.archives
	},
});

export const headerSlice = createSlice({
	name: "headerOptions",
	initialState: {
		display: {
			isGrid: false,
			archives: false
		},
	},
	reducers: {
		headerOptions: header,
	},
});

export const { headerOptions } = headerSlice.actions;
export default headerSlice.reducer;
