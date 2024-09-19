import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useVerification } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

const LineBinding = () => {
	// ====== hook ======

	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { handleLineBinding } = useVerification()
	const {
		userInfo: { currencyId, isLineBinding },
	} = useAuth()

	// ====== 函數 ======

	/**
	 * 處理錯誤並顯示錯誤信息
	 * 當發生錯誤時，會將錯誤訊息通過 modal 顯示給使用者
	 * @message - 錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

	if (currencyId !== CurrenciesEnum.THB) return null

	return (
		<>
			<div className='btn-group'>
				<button
					className='btn-line'
					onClick={() => {
						handleLineBinding(showErrorModal)
					}}
				>
					<i className='icon icon-line-bold' />
					{isLineBinding
						? t('Label_Profile_Connected')
						: t('Label_Profile_Connect')}
				</button>
			</div>
			<div className='txt-line'>{t('Label_Profile_LinkLineAccount')}</div>
		</>
	)
}

export { LineBinding }
