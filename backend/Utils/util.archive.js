import archiver from "archiver";

class Archive {
	constructor() {
		this.archive = archiver("zip", { zlib: { level: 9 } });
		this.#on_err();
	}

	#on_err() {
		this.archive.on("warning", (err) => {
			if (err.code == "ENOENT") console.log(err.message);
			else throw err.message;
		});

		this.archive.on("error", (err) => {
			throw err;
		});
	}

	append(file, file_name) {
		this.archive.append(file, { name: file_name });
	}

	finalize() {
		this.archive.directory("subdir/", "new_subdir");
		this.archive.directory("subdir/", false);
		this.archive.finalize();

		return this.archive;
	}
}

export { Archive };
