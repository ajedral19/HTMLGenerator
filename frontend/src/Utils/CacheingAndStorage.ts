type Storage = {
    theme?: string,

}

export const AppLocalStorage = (payload?: Storage) => {

}

// export const ManageCache = async (url: string) => {
//     const vals = await caches.open(url).then(async cache => {
//         return await cache.keys(url)
//     })

//     return vals
// }