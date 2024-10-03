import { SetStateAction } from "react";

// export type TemplateData = {
// 	id: string;
// 	name: string;
// 	temaplte: string;
// 	mockup: string;
// 	sheet: string;
// 	screenshot: string;
// };

export type Templates = {
	status: number;
	message: string;
	rows: TemplateData[];
	rowCount: number;
};

export type Option = {
	id: string;
	name: string;
	template: Blob;
	mockup?: string;
	sheet: string;
	screenshot?: string;
};

export type FieldInput = {
	label?: string;
	name: string;
	id: string;
	disabled?: boolean;
	type?: "select";
	options?: TemplateData[];
	className?: string;
	onChange?: (e: Target) => void;
};

export type Target = {
	target: { value: SetStateAction<string> };
};

// ANCHOR - Proper types
type Ticket = { id: string; url: string };
type stylesheet = { name: string; url: string };

export type TemplateData = {
	id: string;
	name: string;
	author: string;
	ticket: Ticket | Ticket[];
	spreadsheetURL: string;
	isFavorite: boolean;
	image: string;
};

export type CardContent = {
	data: TemplateData;
};

export type TemplateDetails = {
	data: TemplateData & {
		stylesheets: stylesheet | stylesheet[];
		uploadDate: string;
	};
};

export type StripTag = {
	text: string;
	url?: string;
	variant?: "purple" | "teal";
	size?: "normal" | "small";
	className?: string;
};

export type Favotite = {
	isFavorite: boolean;
	fontSize?: string;
	onClick?: (...args: any[]) => void;
};
