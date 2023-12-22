export const updateSearchParams = (setSearchParams, param, value) => {
    setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set(param, value);
        return newParams;
    });
};
