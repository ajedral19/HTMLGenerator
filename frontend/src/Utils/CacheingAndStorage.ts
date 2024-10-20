type Storage = {
	theme?: string;
};

const cacheName = "AppCache";

export const AppLocalStorage = (payload?: Storage) => {};

// export const ManageCache = async (url: string) => {
//     const vals = await caches.open(url).then(async cache => {
//         return await cache.keys(url)
//     })

//     return vals
// }

export const cacheTheme = () => {
	caches.open(cacheName).then((cache) => {
		const headers = new Headers();
		const response = { ...headers, "Content-Theme": "dark" };

	});
};
