import React from 'react'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import { ReferralStatusClassNameForMobile } from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

interface IReferralItemProps {
	userName: string
	registerDate: string
	totalDeposit: number
	depositC: number
	totalBet: number
	vaildBetC: number
	bonusAmount: number
	status: number
}

const ReferralItem = ({
	userName,
	registerDate,
	totalDeposit,
	depositC,
	totalBet,
	vaildBetC,
	bonusAmount,
	status,
}: IReferralItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='info'>
			<ul>
				<li>
					<span className='title'>{t('Label_General_Username')}</span>
					<span>{userName}</span>
				</li>
				<li>
					<span className='title'>
						{t('Label_History_RegisterDate')} (
						{CURRENCY_TO_TIMEZONE[currencyId]})
					</span>
					<span>
						{dayjs(registerDate, 'YYYY-MM-DDThh:mm:ssZ')
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('MM/DD/YYYY')}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Currency')}</span>
					<span>{t(`Currency_${currencyId}`)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_TotalDeposit')}</span>
					<span>
						{numberFormat(totalDeposit as number, currencyId, 0)}/
						{numberFormat(depositC as number, currencyId, 0)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_TotalBet')}</span>
					<span>
						{numberFormat(totalBet as number, currencyId, 0)}/
						{numberFormat(vaildBetC as number, currencyId, 0)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_BonusAmount')}</span>
					<span>{numberFormat(bonusAmount as number, currencyId, 0)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Status')}</span>
					<span className={ReferralStatusClassNameForMobile[status as number]}>
						{t(`Label_ReferralStatus${status}`)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export default ReferralItem
