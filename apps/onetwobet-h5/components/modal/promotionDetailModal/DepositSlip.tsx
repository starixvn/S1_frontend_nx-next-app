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
				<div className={classNames({ active: isActive })}>
					<div>{t('Label_General_ID')}</div>
					<div>{t('Label_General_Amount')}</div>
				</div>

				{/* // * 手機版設計稿需多出這一空白元件才能完整顯示 resList */}
				<div>
					<div />
					<div />
				</div>

				{refList?.map(item => (
					<div
						key={item.depositId}
						className={classNames({ active: isActive })}
					>
						<div>{item.depositId}</div>
						<div>{numberFormat(item.amount, currencyId)}</div>
					</div>
				))}

				<div className={classNames({ active: isActive })}>
					<div>{t('Label_Promotion_Total')}</div>
					<div>{numberFormat(depositAmount, currencyId)}</div>
				</div>
			</div>
			<button className='ViewAllAmount active' onClick={toggleActive}>
				{t('Label_Promotion_ViewAll')}
				<span
					className={classNames('icon icon-keyboard_arrow_down', {
						active: isActive,
					})}
				/>
			</button>
		</>
	)
}

export default DepositSlip
