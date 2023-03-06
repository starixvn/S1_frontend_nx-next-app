export enum LocalStorageEnum {
	Locale = 'nx-next-app-locale',
}
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const setLocalStorage = (key: string, data: any) => {
	window.localStorage && localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key: string) => {
	const json = window.localStorage && localStorage.getItem(key)

	return json ? JSON.parse(json) : undefined
}

export const removeLocalStorage = (key: string) => {
	window.localStorage && localStorage.removeItem(key)
}
