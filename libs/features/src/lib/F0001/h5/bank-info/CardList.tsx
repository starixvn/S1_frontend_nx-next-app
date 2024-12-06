import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const CardList = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		userInfo: { userLevel, currencyId, accountName },
	} = useAuth()

	const { bankInfoDetail, setIsShowCards, handleDeleteCard } = useBankInfo()

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]

	return (
		<>
			{userLevelImageInfo?.url ? (
				<div className={`vip_mark ${userLevelImageInfo?.levelTabsName}`}>
					<img src={userLevelImageInfo?.url} alt={userLevelImageInfo?.alt} />
					{includes(
						ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
						currencyId
					) && <div>{t(userLevelImageInfo?.displayKey as string)}</div>}
				</div>
			) : (
				<div className='icon icon-member icon-user-line' />
			)}

			<div className='name'>{accountName}</div>
			<div className='text-center text-gray'>
				{t('Label_BankInfo_BankAccountHint')}
			</div>
			{bankInfoDetail.length !== 3 && (
				<div className='btnGroup custom-btn-group'>
					<button
						className='btn-secondary'
						type='button'
						onClick={() => setIsShowCards(false)}
					>
						<i className='icon icon-plus-add' />
						{t('Label_BankInfo_AddNewAccount')}
					</button>
				</div>
			)}
			{bankInfoDetail.length > 0 && (
				<div className='group-select-bank'>
					<div className='title'>{t('Label_BankInfo_BankAccount')}</div>
					<div className='bankAccount selectModule'>
						{bankInfoDetail.map(
							({ bankName, bankLogo, accountNo, sysId, ifscCode }) => (
								<div className='account' key={`${sysId}-${accountNo}`}>
									<div className='block-grid'>
										<div className='bankName'>
											<img
												alt={bankName}
												src={`${
													process.env['NEXT_PUBLIC_PAYMENT_HOST']
												}/square/${bankLogo.toLowerCase()}`}
											/>
										</div>
										<div className='group-subtitle'>
											<div className='subtitle'>{bankName}</div>
											<div className='subinfo'>{accountNo}</div>
											{ifscCode && (
												<div className='code'>
													{t('Label_BankInfo_IFSCCode')}: {ifscCode}
												</div>
											)}
										</div>
									</div>
									<button
										className='icon icon-delete-bin-fill clickBtn'
										onClick={() => handleDeleteCard({ accountNo, sysId })}
									/>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</>
	)
}

export { CardList }
