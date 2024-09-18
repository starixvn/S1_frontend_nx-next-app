import { PREV_PAGE, PrevPageEnum } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useSetProfileAddressMutation } from '@nx-next-app/service'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const useAddress = () => {
	// ====== hook ======

	const { query } = useRouter()
	const { prevPage } = query

	const {
		userInfo: { phoneVerified },
	} = useAuth()

	const { formState, trigger, register, getValues, handleSubmit } = useForm()

	const { errors, touchedFields } = formState

	const [setProfileAddress] = useSetProfileAddressMutation()

	// ====== 函數 ======

	/**
	 * 提交表單並更新地址信息
	 * 在更新成功後顯示確認或錯誤訊息 */
	const handleSubmitForm = (
		confirmCallBack: () => void,
		errorCallBack: (message: string) => void,
		prevPageConfirmCallBack: (
			path: string,
			contentKey: string,
			submitKey: string
		) => void,
		profileModifyWarningCallBack: (setAddress: () => Promise<void>) => void
	) => {
		const setAddress = async () => {
			const {
				formCity,
				formState,
				formCountry,
				formPostCode,
				formLineFirst,
				formLineSecond,
			} = getValues()

			try {
				// 提交地址表單至後端
				await setProfileAddress({
					AddressCity: formCity,
					AddressState: formState,
					AddressCountry: formCountry,
					AddressPostCode: formPostCode,
					AddressLineFirst: formLineFirst,
					AddressLineSecond: formLineSecond,
				}).unwrap()

				if (!phoneVerified) {
					confirmCallBack()
				} else if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]

					prevPageConfirmCallBack(path, contentKey, submitKey)
				}
			} catch (error) {
				errorCallBack((error as Error).message)
			}
		}
		profileModifyWarningCallBack(setAddress)
	}

	return {
		errors,
		touchedFields,
		trigger,
		register,
		handleSubmit,
		handleSubmitForm,
	}
}

export { useAddress }
