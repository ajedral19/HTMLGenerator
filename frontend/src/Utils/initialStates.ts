import { TemplateDetails } from "../types";

export const init_details: TemplateDetails = {
	data: {
		id: "",
		name: "",
		author: "",
		ticket: {
			id: "",
			url: "",
		},
		spreadsheetURL: "",
		isFavorite: false,
		image: "",
		stylesheets: [
			{
				name: "",
				url: "",
			},
		],
		uploadDate: "",
	},
};
