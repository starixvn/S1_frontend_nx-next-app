import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { WrapperBankInfoH5 } from '@nx-next-app/features/F0001/h5/bank-info/styles'
import { useEWallet } from '@nx-next-app/features/F0001/providers'
import { CurrenciesEnum } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const WalletList = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		userInfo: { userLevel, currencyId, accountName },
	} = useAuth()

	const { custEWalletList, setIsShowCards, handleDeleteEWallet } = useEWallet()

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]

	return (
		<WrapperBankInfoH5>
			<div className={`vip_mark ${userLevelImageInfo?.levelTabsName}`}>
				<img
					src={userLevelImageInfo?.url}
					alt={userLevelImageInfo?.alt}
					width={126}
					height={106}
				/>
				{includes(
					ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
					currencyId
				) && <div>{t(userLevelImageInfo?.displayKey as string)}</div>}
			</div>
			<div className='name'>{accountName}</div>
			<div className='text-center text-gray'>
				{t('Label_BankInfo_BankAccountHint')}
			</div>
			{custEWalletList.length !== 3 && (
				<div className='btnGroup custom-btn-group'>
					<button
						className='btn-secondary'
						type='button'
						onClick={() => setIsShowCards(false)}
					>
						<i className='icon icon-plus-add' />
						{t('Label_EWallet_AddEWallet')}
					</button>
				</div>
			)}
			{custEWalletList.length > 0 && (
				<div className='group-select-bank'>
					<div className='title'>{t('Label_General_EWallet')}</div>
					<div className='bankAccount selectModule'>
						{custEWalletList.map(
							({ sysId, accountNo, eWalletLogo, eWalletName }) => (
								<div className='account' key={`${sysId}-${accountNo}`}>
									<div className='block-grid'>
										<div className='bankName'>
											<img
												alt={eWalletName}
												src={`${
													process.env['NEXT_PUBLIC_PAYMENT_HOST']
												}/square/${eWalletLogo.toLowerCase()}`}
											/>
										</div>
										<div className='group-subtitle'>
											<div className='subtitle'>{eWalletName}</div>
											<div className='subinfo'>{accountNo}</div>
										</div>
									</div>
									<button
										className='icon icon-delete-bin-fill clickBtn'
										onClick={() => handleDeleteEWallet({ accountNo, sysId })}
									/>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</WrapperBankInfoH5>
	)
}

export { WalletList }
