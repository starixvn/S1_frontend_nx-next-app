import React from 'react'
import { useStatement } from '@nx-next-app/features/F0002/providers/statement-context'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'

interface IStatementItemProps {
	settledDate?: string
	turnOver?: number
	validBet?: number
	winlostAmount?: number
	categoryName?: string
	gameTypeName?: string
	categoryId?: number
	gameTypeID?: number
	transId?: string
	bonusId?: number
	bonusCode?: string | null
}

const StatementItem = ({
	settledDate,
	turnOver,
	validBet,
	winlostAmount,
	categoryName,
	gameTypeName,
	categoryId,
	gameTypeID,
	transId,
	bonusId,
	bonusCode,
}: IStatementItemProps) => {
	const { activeTab, onDetails } = useStatement()
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	return (
		<div className='info'>
			{activeTab === '' && (
				<ul>
					<li>
						<span className='title'>{`${t('Label_General_SettledDate')} (${
							CURRENCY_TO_TIMEZONE[currencyId]
						})`}</span>
						<span>{dayjs(settledDate).format('YYYY-MM-DD')}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span>{numberFormat(turnOver as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span>{numberFormat(validBet as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span>{numberFormat(winlostAmount as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Action')}</span>
						<div className='btn-group'>
							<button
								className='orange openPopup'
								onClick={() =>
									onDetails({
										selDate: settledDate as string,
										targetTab: 'byDay',
									})
								}
							>
								{t('Label_General_Details')}
							</button>
						</div>
					</li>
				</ul>
			)}
			{activeTab === 'byDay' && (
				<ul>
					<li>
						<span className='title'>{`${t('Label_General_SettledDate')} (${
							CURRENCY_TO_TIMEZONE[currencyId]
						})`}</span>
						<span>{dayjs(settledDate).format('YYYY-MM-DD')}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_CategoryName')}</span>
						<span>{categoryName}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span>{numberFormat(turnOver as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span>{numberFormat(validBet as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span>{numberFormat(winlostAmount as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Action')}</span>
						<div className='btn-group'>
							<button
								className='orange openPopup'
								onClick={() =>
									onDetails({
										selDate: settledDate as string,
										targetTab: 'byCategory',
										categoryId,
									})
								}
							>
								{t('Label_General_Details')}
							</button>
						</div>
					</li>
				</ul>
			)}
			{activeTab === 'byCategory' && (
				<ul>
					<li>
						<span className='title'>{`${t('Label_General_SettledDate')} (${
							CURRENCY_TO_TIMEZONE[currencyId]
						})`}</span>
						<span>{dayjs(settledDate).format('YYYY-MM-DD')}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_GameTypeName')}</span>
						<span>{gameTypeName}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span>{numberFormat(turnOver as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span>{numberFormat(validBet as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span>{numberFormat(winlostAmount as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Action')}</span>
						<div className='btn-group'>
							<button
								className='orange openPopup'
								onClick={() =>
									onDetails({
										selDate: settledDate as string,
										targetTab: 'byDetail',
										gameTypeId: gameTypeID,
									})
								}
							>
								{t('Label_General_Details')}
							</button>
						</div>
					</li>
				</ul>
			)}
			{activeTab === 'byDetail' && (
				<ul>
					<li>
						<span className='title'>{`${t('Label_General_SettledDate')} (${
							CURRENCY_TO_TIMEZONE[currencyId]
						})`}</span>
						<span>{dayjs(settledDate).format('YYYY-MM-DD HH:mm:ss')}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span>{numberFormat(turnOver as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span>{numberFormat(validBet as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span>{numberFormat(winlostAmount as number, currencyId, 2)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_BonusCode')}</span>
						<span>{bonusCode || '-'}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_BonusId')}</span>
						<span>{bonusId}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_TransId')}</span>
						<span>{transId}</span>
					</li>
				</ul>
			)}
		</div>
	)
}

export default StatementItem
