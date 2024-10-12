import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducer from "./Redux/Slices/modal";
import templatesReducer from "./Redux/Slices/templates";
import sidePaneReducer from "./Redux/Slices/sidePane";
import headerReducer from "./Redux/Slices/header";
import spreadsheetUrlReducer from "./Redux/Slices/spreadsheetUrl";

export default configureStore({
	reducer: {
		modal: modalSliceReducer,
		templates: templatesReducer,
		sidePane: sidePaneReducer,
		headerOptions: headerReducer,
		spreadsheet: spreadsheetUrlReducer,
	},
});
