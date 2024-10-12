import { createSlice } from "@reduxjs/toolkit";

const spreadsheet = (state: any, action: { payload: string }) => ({
	...state,
	url: action.payload,
});

export const spreadsheetUrlSlice = createSlice({
	name: "spreadsheet_url",
	initialState: [],
	reducers: {
		spreadsheetUrl: spreadsheet,
	},
});

export const { spreadsheetUrl } = spreadsheetUrlSlice.actions;

export default spreadsheetUrlSlice.reducer;
