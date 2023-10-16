import { Authentication } from "~/type";

export const useAuthInfo = () => {
    const databaseName: string = 'Order-Taobao';
    const collectionName: string = 'auth';
    const authKey: string = 'user';
    const csrfKey: string = "_csrf";
    const versionNumber: number = 1;

    const openConnectionAsync = async (): Promise<IDBDatabase> => {
        return new Promise<IDBDatabase>((resolve, reject): void => {
            const databaseRequest: IDBOpenDBRequest = window.indexedDB.open(databaseName, versionNumber);
            databaseRequest.onupgradeneeded = (): void => {
                const database: IDBDatabase = databaseRequest.result;
                database.createObjectStore(collectionName, {
                    autoIncrement: true
                })
            };
            databaseRequest.onsuccess = (event: Event) => resolve((event.target as IDBOpenDBRequest).result);
            databaseRequest.onerror = (event: Event) => reject((event.target as IDBOpenDBRequest).result);
            databaseRequest.onblocked = (event: Event) => reject((event.target as IDBOpenDBRequest).result);
        });
    }


    const createAuthAsync = async (auth: Authentication): Promise<boolean> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            database.transaction(collectionName, "readwrite").objectStore(collectionName).add(auth, authKey);
            database.close();
            return Promise.resolve(true);
        } catch (error) {
            database.close();
            return Promise.resolve(false);
        }
    }

    const readAuthAsync = async (): Promise<Authentication | undefined> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            const data: IDBRequest<Authentication> = database.transaction(collectionName, "readonly").objectStore(collectionName).get(authKey);
            const result: Authentication | undefined = await resolveAuthRead(data);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.resolve(undefined);
        }
    }

    const updateAuthAsync = async (newAuth: Authentication): Promise<boolean | undefined> => {
        const database: IDBDatabase = await openConnectionAsync();
        const auth: Authentication | undefined = await readAuthAsync();
        if (auth) {
            if (auth.accessToken !== newAuth.accessToken) {
                const objectStore: IDBObjectStore = database.transaction(collectionName, "readwrite").objectStore(collectionName);
                const result: boolean = await resolveAuthUpdate(objectStore, newAuth);
                return Promise.resolve(result);
            }
        } else {
            const result: boolean = await createAuthAsync(newAuth);
            return Promise.resolve(result);
        }
    }

    const deleteAuthAsync = async (): Promise<boolean> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            database.transaction(collectionName, "readwrite").objectStore(collectionName).delete(authKey);
            database.close();
            return Promise.resolve(true);
        } catch (error) {
            database.close();
            return Promise.resolve(false);
        }
    }

    const resolveAuthRead = (data: IDBRequest<Authentication>): Promise<Authentication | undefined> => {
        return new Promise<Authentication | undefined>((resolve) => {
            data.onsuccess = () => resolve(data.result);
            data.onerror = () => resolve(undefined);
        });
    }
    

    const resolveAuthUpdate = async (objectStore: IDBObjectStore, newAuth: Authentication): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            const request: IDBRequest<IDBValidKey> = objectStore.put(newAuth, authKey);
            request.onsuccess = () => resolve(true);
            request.onerror = () => resolve(false);
        });
    }

    const createCSRFAsync = async (csrfToken: string): Promise<boolean> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            database.transaction(collectionName, "readwrite").objectStore(collectionName).add(csrfToken, csrfKey);
            database.close();
            return Promise.resolve(true);
        } catch (error) {
            database.close();
            return Promise.resolve(false);
        }
    }

    const readCSRFAsync = async (): Promise<string | undefined> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            const data: IDBRequest<string> = database.transaction(collectionName, "readonly").objectStore(collectionName).get(csrfKey);
            const result: string | undefined = await resolveCSRFRead(data);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.resolve(undefined);
        }
    }

    const updateCSRFAsync = async (newCSRFToken: string): Promise<boolean> => {
        const database: IDBDatabase = await openConnectionAsync();
        const csrfToken: string | undefined = await readCSRFAsync();
        if (csrfToken) {
            const objectStore: IDBObjectStore = database.transaction(collectionName, "readwrite").objectStore(collectionName);
            const result: boolean = await resolveCSRFUpdate(objectStore, newCSRFToken);
            return Promise.resolve(result);
        } else {
            const result: boolean = await createCSRFAsync(newCSRFToken);
            return Promise.resolve(result);
        }
    }
    
    const deleteCSRFAsync = async (): Promise<boolean> => {
        const database: IDBDatabase = await openConnectionAsync();
        try {
            database.transaction(collectionName, "readwrite").objectStore(collectionName).delete(csrfKey);
            database.close();
            return Promise.resolve(true);
        } catch (error) {
            database.close();
            return Promise.resolve(false);
        }
    }

    const resolveCSRFUpdate = (objectStore: IDBObjectStore, newCSRFToken: string): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            const request: IDBRequest<IDBValidKey> = objectStore.put(newCSRFToken, csrfKey);
            request.onsuccess = () => resolve(true);
            request.onerror = () => resolve(false);
        });
    }

    const resolveCSRFRead = (data: IDBRequest<string>): Promise<string | undefined> => {
        return new Promise<string | undefined>(resolve => {
            data.onsuccess = () => resolve(data.result);
            data.onerror = () => resolve(undefined);
        });
    }

    

    return {
        createAuthAsync,
        readAuthAsync,
        updateAuthAsync,
        deleteAuthAsync,

        createCSRFAsync,
        readCSRFAsync,
        updateCSRFAsync,
        deleteCSRFAsync
    }
}