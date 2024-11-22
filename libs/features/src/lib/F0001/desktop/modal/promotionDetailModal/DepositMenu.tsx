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
			<div>
				<div>{t('Label_General_ID')}</div>
				<div>{depositId}</div>
			</div>
			<div>
				<div>{t('Label_General_DepositAmount')}</div>
				<div>{numberFormat(depositAmount, currencyId)}</div>
			</div>
		</div>
	)
}

export default DepositMenu
