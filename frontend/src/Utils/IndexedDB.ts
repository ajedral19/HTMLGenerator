
export const indexStore = (id: string) => {
    const db = indexedDB
    const templatesStore = db.open("templatesStore", 1)
    templatesStore.onerror = (e) => console.log(templatesStore.error?.message)
    templatesStore.onsuccess = (e) => {
        const result = templatesStore.result
        result.createObjectStore("files", { keyPath: id })
    }

    

    console.log(templatesStore);

}