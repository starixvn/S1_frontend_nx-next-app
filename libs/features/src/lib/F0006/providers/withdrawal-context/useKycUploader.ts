import { ChangeEvent, DragEvent, useState } from 'react'

const useKycUploader = (submitKycCallback: (file: File) => void) => {
	// kyc 更新使用的 file 暫存
	const [kycFile, setKycFile] = useState<{
		fileImg: string | ArrayBuffer | null
		fileData: File
	} | null>(null)

	// 處理上傳資料暫存
	const handleUploadFile = (files: FileList) => {
		if (files.length > 0) {
			const reader = new FileReader()
			reader.readAsDataURL(files[0])
			reader.onload = () => {
				const fileImg = reader.result
				setKycFile({
					fileData: files[0],
					fileImg,
				})
			}
		}
	}

	// 事件處理切開較容易撰寫
	const onDropDown = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		const { files } = e.dataTransfer
		handleUploadFile(files)
	}

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { files } = e.target
		if (files) {
			handleUploadFile(files)
		}
	}

	const onSubmit = async () => {
		if (!kycFile) return
		if (kycFile?.fileData) {
			await submitKycCallback(kycFile.fileData)
		}
	}

	return {
		kycFile,
		onDropDown,
		onChangeInput,
		onSubmit,
	}
}

export { useKycUploader }
