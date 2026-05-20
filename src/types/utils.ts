export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type VoidableProps<T> = {
  [K in keyof T]?: T[K] | undefined | null;
};

export type Voidable<T> = T | undefined | null;
