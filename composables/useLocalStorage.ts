export const useLocalStorage = () => {

    const localStorage: Storage = window.localStorage;

    const deleteAll = (): void => {
        localStorage.clear();
    }

    const createValue = (key: string, value: string): void => {
        localStorage.setItem(key, value);
    }

    const createValues = (values: Array<{ key: string, value: string }>): void => {
        values.forEach(value => createValue(value.key, value.value));
    }

    const readValue = (key: string): string | null => {
        return localStorage.getItem(key);
    }

    return {
        localStorage,
        createValue,
        createValues,
        readValue,
        deleteAll
    }
}