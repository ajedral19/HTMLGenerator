import { configureStore } from "@reduxjs/toolkit";
import templatesStateReducer from "./Redux/Slices/templatesState";
import sidePaneReducer from "./Redux/Slices/sidePane";
import headerReducer from "./Redux/Slices/header";
import spreadsheetUrlReducer from "./Redux/Slices/spreadsheetUrl";
import loaderReducer from "./Redux/Slices/loader";

// export default configureStore({
// 	reducer: {
// 		templatesState: templatesStateReducer,
// 		sidePane: sidePaneReducer,
// 		headerOptions: headerReducer,
// 		spreadsheet: spreadsheetUrlReducer,
// 		loader: loaderReducer
// 	},
// });

const store = configureStore({
	reducer: {
		templatesState: templatesStateReducer,
		sidePane: sidePaneReducer,
		headerOptions: headerReducer,
		spreadsheet: spreadsheetUrlReducer,
		loader: loaderReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export default store;
