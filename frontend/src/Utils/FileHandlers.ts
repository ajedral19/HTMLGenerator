export const readFileDataAsBase64 = (file: Blob) => {
	console.log(file);

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => resolve(e.target?.result);
		reader.onerror = (err) => reject(err);

		reader.readAsDataURL(file);
	});
};
