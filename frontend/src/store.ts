import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducer from "./Redux/Slices/modal";
import templatesStateReducer from "./Redux/Slices/templatesState";
import sidePaneReducer from "./Redux/Slices/sidePane";
import headerReducer from "./Redux/Slices/header";
import spreadsheetUrlReducer from "./Redux/Slices/spreadsheetUrl";
import loaderReducer from "./Redux/Slices/loader";

export default configureStore({
	reducer: {
		modal: modalSliceReducer,
		templatesState: templatesStateReducer,
		sidePane: sidePaneReducer,
		headerOptions: headerReducer,
		spreadsheet: spreadsheetUrlReducer,
		loader: loaderReducer
	},
});
