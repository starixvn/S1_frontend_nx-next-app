export type IDeepMutable<T> = { -readonly [P in keyof T]: IDeepMutable<T[P]> }
