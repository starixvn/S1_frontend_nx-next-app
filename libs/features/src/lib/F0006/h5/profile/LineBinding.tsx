import { useTranslation } from 'next-i18next'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useAuth } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const LineBinding = () => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()

	const {
		userInfo: { currencyId, isLineBinding },
	} = useAuth()

	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	const handleLineBinding = async () => {
		if (isLineBinding) return // 因按鈕的 disabled 樣式不太適合，所以先在這擋下
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Binding,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	if (currencyId !== CurrenciesEnum.THB) return null

	return (
		<>
			<div className='btn-group'>
				<button className='btn-line' onClick={handleLineBinding}>
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
