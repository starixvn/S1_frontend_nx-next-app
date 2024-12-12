import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

interface IDepositMenuProps {
	depositId: string | null
	depositAmount: number
}

const DepositMenu = ({ depositId, depositAmount }: IDepositMenuProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='minAmount'>
			<div className='row'>
				<div className='row-title'>{t('Label_General_ID')}</div>
				<div className='row-value'>{depositId}</div>
			</div>
			<div className='row'>
				<div className='row-title'>{t('Label_General_Amount')}</div>
				<div className='row-value'>
					{numberFormat(depositAmount, currencyId)}
				</div>
			</div>
		</div>
	)
}

export default DepositMenu
