import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { isValidFiles } from '@nx-next-app/utils'
import { ChangeEvent, DragEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const useKycUploader = (submitKycCallback: (file: File) => void) => {
	// The file temporary storage used by kyc update
	const [kycFile, setKycFile] = useState<{
		fileImg: string | ArrayBuffer | null
		fileData: File
	} | null>(null)
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	// Process uploaded data and temporarily store it
	const handleUploadFile = (files: FileList) => {
		if (!isValidFiles(files)) {
			modal.error(t('Label_History_BankSlipHint1'))
			return
		}
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
