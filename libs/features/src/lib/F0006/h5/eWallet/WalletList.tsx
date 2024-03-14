import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useEWallet } from '@nx-next-app/features/F0006/providers'

const WalletList = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		userInfo: { userLevel, currencyId, accountName },
	} = useAuth()

	const { custEWalletList, setIsShowCards, handleDeleteEWallet } = useEWallet()

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]

	return (
		<>
			<div className='vip_mark'>
				<img src={userLevelImageInfo?.url} alt={userLevelImageInfo?.alt} />
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
				<div className='btn-group'>
					<button
						className='icon icon-plus'
						type='button'
						onClick={() => setIsShowCards(false)}
					>
						{t('Label_EWallet_AddEWallet')}
					</button>
				</div>
			)}
			{custEWalletList.length > 0 && (
				<>
					<div className='text-center text-org icon icon-library'>
						{t('Label_General_EWallet')}
					</div>
					<div className='bankAccount'>
						{custEWalletList.map(
							({ sysId, accountNo, eWalletLogo, eWalletName }) => (
								<div className='account' key={`${sysId}-${accountNo}`}>
									<div className='bankLogo'>
										<img
											alt={eWalletName}
											src={`${
												process.env['NEXT_PUBLIC_PAYMENT_HOST']
											}/square/${eWalletLogo.toLowerCase()}`}
										/>
									</div>
									<div className='info'>
										<span className='title text-org'>{eWalletName}</span>
										<span>{accountNo}</span>
									</div>
									<button
										className='icon icon-bin clickBtn'
										onClick={() => handleDeleteEWallet({ accountNo, sysId })}
									/>
								</div>
							)
						)}
					</div>
				</>
			)}
		</>
	)
}

export { WalletList }
