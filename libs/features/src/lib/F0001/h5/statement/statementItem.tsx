import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'
import { numberFormat, revertTimeZone } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

interface IStatementItemProps {
	settledDate?: string
	settledTime?: string
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
	settledTime,
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
						<span className='value'>
							{revertTimeZone(settledDate ?? '').format('YYYY-MM-DD')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span className='value'>
							{numberFormat(turnOver as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span className='value'>
							{numberFormat(validBet as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span className='value'>
							{numberFormat(winlostAmount as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Action')}</span>
					</li>
					<li className='full-width'>
						<button
							className='button btn-secondary btn-detail'
							onClick={() =>
								onDetails({
									selDate: settledDate as string,
									targetTab: 'byDay',
								})
							}
						>
							<span className='icon icon-file-text-fill' />
							{t('Label_General_Details')}
						</button>
					</li>
				</ul>
			)}
			{activeTab === 'byDay' && (
				<ul>
					<li>
						<span className='title'>{`${t('Label_General_SettledDate')} (${
							CURRENCY_TO_TIMEZONE[currencyId]
						})`}</span>
						<span className='value'>
							{revertTimeZone(settledDate ?? '').format('YYYY-MM-DD')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_CategoryName')}</span>
						<span className='value'>{categoryName}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span className='value'>
							{numberFormat(turnOver as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span className='value'>
							{numberFormat(validBet as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span className='value'>
							{numberFormat(winlostAmount as number, currencyId, 2)}
						</span>
					</li>

					<li className='full-width'>
						<span className='title'>{t('Label_History_Action')}</span>
						<div>
							<button
								className='button btn-secondary btn-detail'
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
						<span className='value'>
							{revertTimeZone(settledDate ?? '').format('YYYY-MM-DD')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_GameTypeName')}</span>
						<span className='value'>{gameTypeName}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span className='value'>
							{numberFormat(turnOver as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span className='value'>
							{numberFormat(validBet as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span className='value'>
							{numberFormat(winlostAmount as number, currencyId, 2)}
						</span>
					</li>
					<li className='full-width'>
						<span className='title'>{t('Label_History_Action')}</span>
						<div className='detail-group'>
							<button
								className='button btn-secondary btn-detail'
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
						<span className='value'>
							{revertTimeZone(settledTime ?? '').format('YYYY-MM-DD HH:mm:ss')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_Turnover')}</span>
						<span className='value'>
							{numberFormat(turnOver as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_ValidBet')}</span>
						<span className='value'>
							{numberFormat(validBet as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_WinlostAmount')}</span>
						<span className='value'>
							{numberFormat(winlostAmount as number, currencyId, 2)}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_BonusCode')}</span>
						<span className='value'>{bonusCode || '-'}</span>
					</li>
					<li>
						<span className='title'>{t('Label_General_BonusId')}</span>
						<span className='value'>{bonusId}</span>
					</li>
					<li className='full-width'>
						<span className='title'>{t('Label_General_TransId')}</span>
						<span className='value'>{transId}</span>
					</li>
				</ul>
			)}
		</div>
	)
}

export default StatementItem
