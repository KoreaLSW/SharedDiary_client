export function setLocal(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getLocal(key: string): string {
    const local: string | null = localStorage.getItem(key);

    if (local) {
        return local;
    } else {
        return '';
    }
}

export function removeLocal(key: string) {
    localStorage.removeItem(key);
}
