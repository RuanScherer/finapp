export type Replace<T, K extends keyof T, U> = Omit<T, K> & U;
