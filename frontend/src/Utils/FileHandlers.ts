import { Buffer } from "buffer";
export const bufferToString = (file: Blob) => {
	const buf = Buffer.from(file);
	return buf.toString("utf-8");
};
