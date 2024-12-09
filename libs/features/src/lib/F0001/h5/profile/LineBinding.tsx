import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

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
			<div className='btnGroup'>
				<button className='btn-line' onClick={handleLineBinding}>
					<i className='icon icon-line' />
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
