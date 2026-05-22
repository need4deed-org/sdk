export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type VoidableProps<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]?: T[P] | null;
};

export type VoidableUndefined<T> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};

export type Voidable<T> = T | undefined | null;
