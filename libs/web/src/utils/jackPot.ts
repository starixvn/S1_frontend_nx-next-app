export const takeJackItemList = ({
	startPoint,
	endPoint,
}: {
	startPoint: number
	endPoint: number
}) => {
	const NUMBER_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const MAX_NUMBER = NUMBER_LIST.length

	const start = startPoint
	const end = endPoint

	if (start < end) return NUMBER_LIST.slice(start, end + 1)

	if (start > end)
		return [
			...NUMBER_LIST.slice(start, MAX_NUMBER),
			...NUMBER_LIST.slice(0, end + 1),
		]

	if (start === end) return [end]

	return []
}
