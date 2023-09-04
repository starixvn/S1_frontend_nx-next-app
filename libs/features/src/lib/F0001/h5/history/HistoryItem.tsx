import React from 'react'
import {
	DepositStatusClassName,
	DepositStatusClassNameEnum,
	DepositStatusEnum,
	DepositTypeEnum,
	HistoryTabsEnum,
	ReferralStatusClassNameForMobile,
	WithdrawalStatusClassNameForMobile,
} from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { BankSlipModal } from '@nx-next-app/features/F0001/h5/history/modal'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import HistoryMsgModal from '@nx-next-app/features/F0001/h5/history/modal/HistoryMsgModal'
import classNames from 'classnames'

export interface IHistoryItemProps {
	createTime?: string
	transId?: string
	depositType?: number
	amount?: number
	status?: number
	depositMessageDetail?: {
		errorTypeName?: string
		message?: string
		createTime?: string
	}[]
	withdrawalMessageDetail?: {
		errorTypeName?: string
		message?: string
		createTime?: string
	}[]
	thirdId?: string | number
	bankInfo?: {
		sysId?: number
		currencyId?: number
		bankCode?: string
		bankName?: string
		bankLogo?: string
		bankSite?: string
		status?: number
	}
	depositRep?: {
		ver?: number
		sysId?: number
		accountName?: string
		accountNo?: string
		ifscCode?: string
		currencyId?: number
		isLocalPay?: boolean
		groupId?: number
		code?: null
	}
	depositReceipt?: {
		depositId?: number
		picFileName?: string
		receiptNo?: number
		depositPic?: null
	}[]
	typeName?: string
	changeAmount?: number
	beforeAmount?: number
	afterAmount?: number
	refTransId?: string
	totalDeposit?: number
	depositC?: number
	totalBet?: number
	vaildBetC?: number
	bonusAmount?: number
	memo?: string
	direction?: number
	isAdjustment?: boolean
	tpName?: string
	userName?: string
	registerDate?: string
}

const HistoryItem = ({
	createTime,
	transId,
	depositType,
	amount,
	status,
	depositMessageDetail,
	withdrawalMessageDetail,
	thirdId,
	bankInfo,
	depositRep,
	depositReceipt,
	typeName,
	changeAmount,
	beforeAmount,
	afterAmount,
	refTransId,
	totalDeposit,
	depositC,
	totalBet,
	vaildBetC,
	bonusAmount,
	memo,
	direction,
	isAdjustment,
	tpName,
	userName,
	registerDate,
}: IHistoryItemProps) => {
	const { transferDirection, activeTab, onDepositCancel, onSubmit } =
		useHistory()
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()

	const { startWallet, endWallet } = transferDirection({
		direction: direction as number,
		displayMainWallet: t('Label_History_MainWallet'),
		displayAdjustment: t('Label_History_Adjustment'),
		isAdjustment: isAdjustment as boolean,
		tpName: tpName as string,
	})

	return (
		<div
			className={classNames('info', {
				infoBlack: activeTab === HistoryTabsEnum.Referral,
				transfer: activeTab === HistoryTabsEnum.Transfer,
			})}
		>
			{activeTab === HistoryTabsEnum.Transfer && (
				<ul>
					<li>
						<span className='title'>
							{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('DD/MM/YYYY')}
						</span>
					</li>
					<li>
						<span className='title'>
							{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('HH:mm:ss')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_ID')}</span>
						<span>{transId}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Status')}</span>
						<span>
							{status === 0
								? t('Label_General_Success')
								: t('Label_General_Fail')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Amount')}</span>
						<span>{numberFormat(amount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Direction')}</span>
						<span>
							<span>{startWallet}</span>
							{endWallet === t('Label_History_Adjustment') ? (
								<i>&nbsp;&nbsp;</i>
							) : (
								<i className='icon icon-keyboard_arrow_right1' />
							)}
							<span>{endWallet}</span>
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Memo')}</span>
						<span>
							<span>{memo}</span>
						</span>
					</li>
				</ul>
			)}
			{activeTab === HistoryTabsEnum.Deposit && (
				<ul>
					<li>
						<span className='title'>
							{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('DD/MM/YYYY')}
						</span>
					</li>
					<li>
						<span className='title'>
							{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('HH:mm:ss')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_ID')}</span>
						<span>{transId}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Method')}</span>
						<span>{t(`Label_DepositType${depositType}`)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Amount')}</span>
						<span>{numberFormat(amount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Status')}</span>
						<span
							className={
								DepositStatusClassName[status as DepositStatusClassNameEnum]
							}
						>
							{t(`Label_DepositStatus${status}`)}
							{depositMessageDetail && depositMessageDetail.length > 0 && (
								<button
									className='infobtn'
									onClick={() =>
										modal.open(
											<HistoryMsgModal
												transId={transId as string}
												messageDetail={
													depositMessageDetail as {
														errorTypeName: string
														message: string
														createTime: string
													}[]
												}
											/>,
											{ className: 'statuspop' }
										)
									}
								/>
							)}
						</span>
					</li>
				</ul>
			)}
			{activeTab === HistoryTabsEnum.Withdrawal && (
				<ul>
					<li>
						<span className='title'>
							{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('DD/MM/YYYY')}
						</span>
					</li>
					<li>
						<span className='title'>
							{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('HH:mm:ss')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_ID')}</span>
						<span>{transId}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Amount')}</span>
						<span>{numberFormat(amount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_Status')}</span>
						<span
							className={WithdrawalStatusClassNameForMobile[status as number]}
						>
							{t(`Label_WithdrawalStatus${status}`)}
							{withdrawalMessageDetail &&
								withdrawalMessageDetail.length > 0 && (
									<button
										className='infobtn'
										onClick={() =>
											modal.open(
												<HistoryMsgModal
													transId={transId as string}
													messageDetail={
														withdrawalMessageDetail as {
															errorTypeName: string
															message: string
															createTime: string
														}[]
													}
												/>,
												{ className: 'statuspop' }
											)
										}
									/>
								)}
						</span>
					</li>
				</ul>
			)}
			{activeTab === HistoryTabsEnum.Financial && (
				<ul>
					<li>
						<span className='title'>
							{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('DD/MM/YYYY')}
						</span>
					</li>
					<li>
						<span className='title'>
							{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
						</span>
						<span>
							{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
								.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
								.format('HH:mm:ss')}
						</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_TypeName')}</span>
						<span>{typeName}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_ChangeAmount')}</span>
						<span>{numberFormat(changeAmount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_BeforeAmount')}</span>
						<span>{numberFormat(beforeAmount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_AfterAmount')}</span>
						<span>{numberFormat(afterAmount as number, currencyId, 0)}</span>
					</li>
					<li>
						<span className='title'>{t('Label_History_RefTransId')}</span>
						<span>{refTransId}</span>
					</li>
				</ul>
			)}
			{activeTab === HistoryTabsEnum.Referral && (
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
						<span
							className={ReferralStatusClassNameForMobile[status as number]}
						>
							{t(`Label_ReferralStatus${status}`)}
						</span>
					</li>
				</ul>
			)}

			{thirdId && (
				<div>
					<div className='title'>{t('Label_History_Action')}</div>
					<div>{thirdId}</div>
				</div>
			)}

			{depositType === DepositTypeEnum.BankTransfer &&
				(status === DepositStatusEnum.Pending ||
					status === DepositStatusEnum.OnHold) && (
					<div className='btn-group'>
						<button
							className='white'
							onClick={() => {
								modal.confirm(t('Label_History_CancelConfirm'), {
									onOK: () => {
										onDepositCancel(transId as string)
									},
								})
							}}
						>
							{t('Label_General_Cancel')}
						</button>
						<button
							className='orange openPopup'
							onClick={() =>
								modal.open(
									<BankSlipModal
										bankSlipInfo={
											{
												bankInfo,
												depositRep,
												amount,
												transId,
												depositReceipt,
											} as {
												bankInfo: {
													sysId: number
													currencyId: number
													bankCode: string
													bankName: string
													bankLogo: string
													bankSite: string
													status: number
												}
												depositRep: {
													ver: number
													sysId: number
													accountName: string
													accountNo: string
													ifscCode: string
													currencyId: number
													isLocalPay: boolean
													groupId: number
													code: null
												}
												amount: number
												transId: string
												depositReceipt: {
													depositId: number
													picFileName: string
													receiptNo: number
													depositPic: null
												}[]
											}
										}
										onSubmit={onSubmit}
									/>,
									{ className: 'statuspop' }
								)
							}
						>
							{t('Label_History_SubmitProof')}
						</button>
					</div>
				)}
		</div>
	)
}

export default HistoryItem
