import { SetStateAction } from "react";

export type TemplateData = {
	id: string;
	name: string;
	temaplte: string;
	mockup: string;
	sheet: string;
	screenshot: string;
};

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
	disabled?: boolean
	type?: "select";
	options?: TemplateData[];
	className?: string;
	onChange?: (e: Target) => void;
};

export type Target = {
	target: { value: SetStateAction<string> };
};
