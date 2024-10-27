import { Buffer } from "buffer";
export const bufferToString = (file: Buffer) => {
	const buf = Buffer.from(file);
	return buf.toString("utf-8");
};
