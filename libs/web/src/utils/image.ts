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

export const isValidFile = (imageFile: File) => {
	const MAX_FILE_SIZE_MB = 4
	const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024 // 4 MB in bytes

	if (imageFile && imageFile.size > MAX_FILE_SIZE_BYTES) {
		return false
	}

	return true
}

export const isValidFiles = (imageFiles: FileList) =>
	Array.from(imageFiles).every(file => isValidFile(file))
