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
		<div className='minAmount custom-table' style={{ marginBottom: '1.6rem' }}>
			<div className='custom-table-thead'>
				<div className='custom-th'>{t('Label_General_ID')}</div>
				<div className='custom-th'>{depositId}</div>
			</div>
			<div className='custom-table-tbody'>
				<div className='custom-td'>
					<div className='td'>{t('Label_General_DepositAmount')}</div>
					<div className='td'>{numberFormat(depositAmount, currencyId)}</div>
				</div>
			</div>
		</div>
	)
}

export default DepositMenu
