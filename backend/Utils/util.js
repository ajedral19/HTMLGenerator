export const responsder = (ok, payload) => {
    return {
        ok,
        data: {
            ...payload,
        },
    };
};
