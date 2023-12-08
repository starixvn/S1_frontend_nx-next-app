import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { useBankInfo } from '@nx-next-app/features/F0002/providers'

const CardList = () => {
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const {
		userInfo: { userLevel, currencyId, accountName },
	} = useAuth()

	const { bankInfoDetail, setIsShowCards, handleDeleteCard } = useBankInfo()

	const userLevelImageInfo = VIP_CLUB_IMAGES(DeviceTypeEnum.Mobile)[
		(userLevel as number) - 1
	]

	return (
		<>
			{userLevelImageInfo?.url ? (
				<div className='vip_mark'>
					<Image
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
			) : (
				<div className='icon icon-member' />
			)}

			<div className='name'>{accountName}</div>
			<div className='text-center text-gray'>
				{t('Label_BankInfo_BankAccountHint')}
			</div>
			{bankInfoDetail.length !== 3 && (
				<div className='btn-group'>
					<button
						className='icon icon-plus'
						type='button'
						onClick={() => setIsShowCards(false)}
					>
						{t('Label_BankInfo_AddNewAccount')}
					</button>
				</div>
			)}
			{bankInfoDetail.length > 0 && (
				<>
					<div className='text-center text-org icon icon-library'>
						{t('Label_BankInfo_BankAccount')}
					</div>
					<div className='bankAccount'>
						{bankInfoDetail.map(
							({ bankName, bankLogo, accountNo, sysId, ifscCode }) => (
								<div className='account' key={`${sysId}-${accountNo}`}>
									<div className='bankLogo'>
										<Image
											alt={bankName}
											src={`${
												process.env['NEXT_PUBLIC_PAYMENT_HOST']
											}/square/${bankLogo.toLowerCase()}`}
											width={31}
											height={31}
										/>
									</div>
									<div className='info'>
										<span className='title text-org'>{bankName}</span>
										<span>{accountNo}</span>
										{ifscCode && (
											<div>
												{t('Label_BankInfo_IFSCCode')}: {ifscCode}
											</div>
										)}
									</div>
									<button
										className='icon icon-bin clickBtn'
										onClick={() => handleDeleteCard({ accountNo, sysId })}
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

export { CardList }
