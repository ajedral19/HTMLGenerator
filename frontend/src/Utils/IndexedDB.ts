// name: string,
export const indexStore = (data: { name: string; file: Blob }) => {
	const templatesStore = indexedDB.open("templatesStore", 1.2);
	templatesStore.onerror = () => console.log(templatesStore.error?.message, "error");
	templatesStore.onsuccess = (event) => {
		const db = (event.target as IDBOpenDBRequest).result;
		const transaction = db.transaction("renders", "readwrite");
		const store = transaction.objectStore("renders");
		console.log("doing something with store");
		store.put(data.file, data.name);
		console.log("finished doing something with store");
		db.close();
	};
	templatesStore.onupgradeneeded = (event) => {
		const db = (event.target as IDBOpenDBRequest).result;
		if (!db.objectStoreNames.contains("renders")) db.createObjectStore("renders", { autoIncrement: true });
		console.log("upgraded");
	};

	// transaction.onerror = (event) => console.log("transaction error");
	// const objectStore = transaction.objectStore("users");
	// const objectStoreRequest = objectStore.add(payload[0]);

	// objectStoreRequest.onsuccess = (event) => {
	// 	console.log(event, "event is running");
	// };
};

export const initializeIndexStore = () => {
	const store = indexedDB.open("templateStore", 1);
	store.onerror = () => console.log(store.error?.message, "error");
	store.onsuccess = (e) => {
		const db = (e.target as IDBOpenDBRequest).result;
		// const transaction = db.transaction("stash", "readwrite");
		// transaction.objectStore("stash");
		db.close();
	};
	store.onupgradeneeded = (e) => {
		const db = (e.target as IDBOpenDBRequest).result;
		db.createObjectStore("stash");
	};
};

export const addItemToIndexStore = (key: string, value: any) => {
	const store = indexedDB.open("templateStore", 1.2);
	store.onerror = () => console.log(store.error?.message, "error");
	store.onsuccess = (e) => {
		const db = (e.target as IDBOpenDBRequest).result;
		const transaction = db.transaction("stash", "readwrite");
		// const objectStore = transaction.objectStore("stash");

		transaction.oncomplete = (event) => {
			const stash = (event.target as IDBTransaction).db;
			const stashTransaction = stash.transaction("stash", "readwrite");
			stashTransaction.objectStore("stash").add(value, key);
		};
	};
};

export const getFromIndexStore = (key: string, setter: React.SetStateAction<any>, setterExtras: {}, name?: string) => {
	const store = indexedDB.open("templateStore", 1.2);
	store.onerror = () => console.log(store.error?.message, "error");
	store.onsuccess = (e) => {
		const db = (e.target as IDBOpenDBRequest).result;
		const stash = db.transaction("stash", "readonly");
		const store = stash.objectStore("stash");
		const request = store.get(key);
		request.onsuccess = (res) => {
			if ((res.target as IDBRequest).result)
				setter((state: { file: [Blob, string] }) => ({
					...state,
					...setterExtras,
					file: [(res.target as IDBRequest).result, name],
				}));
		};
		request.onerror = (res) => console.log("Error!", res);
		db.close();
	};

	store.onupgradeneeded = (e) => {
		const db = (e.target as IDBOpenDBRequest).result;
		db.createObjectStore("stash");
	};
	return;
};
