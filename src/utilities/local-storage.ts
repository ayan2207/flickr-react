export const loadState = function () {
    try {
        const serializedState = localStorage.getItem('aston-state');

        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = function (state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('aston-state', serializedState);

    } catch (err) {
        // ignore write errors
    }
};