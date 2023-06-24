/* eslint-disable @typescript-eslint/no-explicit-any */

interface DebouncedFn<T extends any[]> {
    (...args: T): void;
}

export const debounce = <T extends any[]>(
    fn: DebouncedFn<T>,
    delay: number,
): DebouncedFn<T> => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: T) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
