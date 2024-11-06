import { useAuth } from '@nx-next-app/data-access'
import { ICashBackDetail } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

interface ICashBackInfoProps {
	bonusCode: string
	cashBackDetails: ICashBackDetail
}

const CashbackInfo = ({ bonusCode, cashBackDetails }: ICashBackInfoProps) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	const { currencyId } = userInfo
	const {
		totalBonus,
		maxBonus,
		cashBackDetail,
		totalLossAmount,
		minLossAmount,
		percentage,
		originalTotalBonus,
	} = cashBackDetails

	return (
		<div className='cashBack newStyle'>
			{/* <!-- <div className="title">Cash Back</div> --> */}
			<table>
				<tbody>
					<tr>
						<td />
						<td>{t('Label_Promotion_LossWithBonus')}</td>
						<td>{t('Label_Promotion_NetLoss')}</td>
					</tr>
					{cashBackDetail?.map(
						({ tpName, lossAmountWithBonus, lossAmount }) => (
							<tr key={`cashbackInfo-${bonusCode}-${tpName}`}>
								<td>{tpName}</td>
								<td>{numberFormat(lossAmountWithBonus, currencyId)}</td>
								<td>{numberFormat(lossAmount, currencyId)}</td>
							</tr>
						)
					)}
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_TotalNetLoss')}：
							<span>{numberFormat(totalLossAmount, currencyId)}</span>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_MinNetLossRequired')}：
							<span>{numberFormat(minLossAmount, currencyId)}</span>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_Percentage')}：<span>{percentage}</span>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_TotalBonus')}：
							<span>{numberFormat(originalTotalBonus, currencyId)}</span>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_MaxBonus')}：
							<span>{numberFormat(maxBonus, currencyId)}</span>
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							{t('Label_Promotion_TotalBonusClaimable')}：
							<span>{numberFormat(totalBonus, currencyId)}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default CashbackInfo
