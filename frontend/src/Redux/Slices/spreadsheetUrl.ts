import { createSlice } from "@reduxjs/toolkit";

type spreadsheet = (
	state: {
		url: string,
		data?: any[]
	},
	action: {
		payload: {
			url: string
			data?: any[]
		}
	}
) => void

const spreadsheet: spreadsheet = (state, action) => ({
	...state,
	url: action.payload.url,
	data: action.payload.data
})

export const spreadsheetUrlSlice = createSlice({
	name: "spreadsheet_url",
	initialState: {
		url: "",
		data: []
	},
	reducers: {
		spreadsheetUrl: spreadsheet,
	},
});

export const { spreadsheetUrl } = spreadsheetUrlSlice.actions;

export default spreadsheetUrlSlice.reducer;
