export const convertFileToBase64 = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = error => reject(error)
	})
}

export const convertBase64ToFile = async (
	base64Url: string,
	fileName = 'image.jpg',
	option: FilePropertyBag = { type: 'image/jpg' }
) => {
	const res: Response = await fetch(base64Url)
	const blob: Blob = await res.blob()
	return new File([blob], fileName, option)
}
