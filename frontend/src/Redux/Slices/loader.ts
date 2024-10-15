import { createSlice } from "@reduxjs/toolkit";

type loader = (
	state: {
		progress: number;
		max: number;
		state?: "templates" | "jsonData"
	},
	action: {
		payload: {
			progress: number
			max: number
			state?: "templates" | "jsonData"
		};
	}
) => void;

const loader: loader = (state, action) => ({
	...state,
	progress: action.payload.progress,
	max: action.payload.max,
	state: action.payload.state
});

export const loaderSlice = createSlice({
	name: "loader",
	initialState: {
		progress: 0,
		max: 0,
	},
	reducers: { loaderState: loader },
});

export const { loaderState } = loaderSlice.actions;
export default loaderSlice.reducer;
