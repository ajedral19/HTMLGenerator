import { createSlice } from "@reduxjs/toolkit";
import { TemplateDetails } from "../../types";
import { init_details } from "../../Utils/initialStates";

type SidePane = (
	state: {
		isVisible: boolean;
		details?: TemplateDetails;
		visibleState?: string;
	},
	action: {
		payload: {
			isVisible: boolean;
			details?: TemplateDetails;
			visibleState?: "newThemeForm" | "themeDetails";	
		};
	}
) => void;

const sidePane: SidePane = (state, action) => ({
	...state,
	...action.payload,
});

export const sidePaneSlice = createSlice({
	name: "sidePane",
	initialState: {
		isVisible: false,
		visibleState: "",
		details: init_details,
	},
	reducers: {
		showSidePane: sidePane,
	},
});

export const { showSidePane } = sidePaneSlice.actions;
export default sidePaneSlice.reducer;
