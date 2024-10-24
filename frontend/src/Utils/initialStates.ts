import { TemplateDetails } from "../types";

export const storeName: { favorites: string } = {
	favorites: "favorites",
};

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
