import { NextRouter } from 'next/router'

export const getQueryParam = (
	query: NextRouter['query'],
	param: string
): string | string[] | null => {
	const lowerCaseQuery: Record<string, string | string[]> = Object.keys(
		query
	).reduce((acc: Record<string, string | string[]>, key: string) => {
		const value = query[key]
		if (typeof value !== 'undefined') {
			acc[key.toLowerCase()] = value
		}
		return acc
	}, {})

	const result = lowerCaseQuery[param.toLowerCase()]
	return typeof result !== 'undefined' ? result : null
}
