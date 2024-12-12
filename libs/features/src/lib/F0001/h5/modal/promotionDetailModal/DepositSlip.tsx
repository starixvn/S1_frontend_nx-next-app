import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'usehooks-ts'

interface IDepositSlipProps {
	depositAmount: number
	refList:
		| {
				depositId: number
				amount: number
		  }[]
		| null
}

// * 存款單
const DepositSlip = ({ depositAmount, refList = [] }: IDepositSlipProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	// * 手機版的資訊有收合功能，分別顯示 *僅 total* 及 *refList 與 total*
	const { value: isActive, toggle: toggleActive } = useBoolean()

	if (!refList || refList.length === 0) return null

	return (
		<>
			<div className='depositSlip'>
				{refList?.map(item => (
					<div className={classNames('deposit-group', { active: isActive })}>
						<div key={item.depositId} className='row'>
							<div className='row-title'>{t('Label_General_ID')}</div>
							<div className='row-value'>{item.depositId}</div>
						</div>

						<div key={item.amount} className='row'>
							<div className='row-title'>{t('Label_General_Amount')}</div>
							<div className='row-value'>
								{numberFormat(item.amount, currencyId)}
							</div>
						</div>
					</div>
				))}

				<div className={classNames('row total-group', { active: isActive })}>
					<div className='row-title'>{t('Label_Promotion_Total')}</div>
					<div className='row-value'>
						{numberFormat(depositAmount, currencyId)}
					</div>
				</div>
			</div>
			<button className='view-all' onClick={toggleActive}>
				{t('Label_Promotion_ViewAll')}
				<span
					className={`icon icon-${isActive ? 'chevron_down' : 'chevron_up'}`}
				/>
			</button>
		</>
	)
}

export default DepositSlip
