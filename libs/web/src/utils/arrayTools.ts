// 將陣列中的某個xx調到某位置
export const moveItem = (arr: string[], fromIndex: number, toIndex: number) => {
	const newArray = [...arr]
	const [movedItem] = newArray.splice(fromIndex, 1)
	newArray.splice(toIndex, 0, movedItem)
	return newArray
}
