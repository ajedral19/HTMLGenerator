import { createSlice } from "@reduxjs/toolkit";

type loader = (
	state: {
		progress: number;
		max: number;
	},
	action: {
		payload: {
			progress: number;
			max: number;
		};
	}
) => void;

const loader: loader = (state, action) => ({
	...state,
	progress: action.payload.progress,
	max: action.payload.max,
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
