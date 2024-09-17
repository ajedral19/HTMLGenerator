import { createSlice } from "@reduxjs/toolkit";

const spreadsheet = (state: any, action: { payload: any }) => ({
	...state,
	spreadsheet_data: action.payload.data,
});

export const spreadsheetDataSlice = createSlice({
	name: "spreadsheet_data",
	initialState: [],
	reducers: {
		spreadsheetData: spreadsheet,
	},
});

export const { spreadsheetData } = spreadsheetDataSlice.actions;

export default spreadsheetDataSlice.reducer;
