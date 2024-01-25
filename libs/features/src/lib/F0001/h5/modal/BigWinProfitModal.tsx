import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@nx-next-app/data-access'
import { IPopUpData } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const BigWinProfitModal = ({
	bigWinData,
	closeCallback = () => null,
}: {
	bigWinData: IPopUpData
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const { onEnterSlotsPage } = useMenu()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { push } = useRouter()

	return (
		<div className={`bigwin ${langId}`}>
			<div
				onClick={() =>
					onEnterSlotsPage(
						{
							tpId: String(bigWinData.tpId),
							tpGameType: String(bigWinData.tpGameType),
							gameId: String(bigWinData.gameId),
							isFree: false,
						},
						{ loginCallback: () => push(paths.login.root) }
					)
				}
			>
				<div className='bigwin-img' />
				<div className='bigwin-text'>
					<div className='bigwin-name'>{bigWinData?.userName ?? '-'}</div>
					<button className='vender'>{bigWinData?.gameName ?? '-'}</button>
				</div>
				<div className='bigwin-number'>
					{t(`Label_Currency_${currencyId}`)}{' '}
					{numFormatToDigits(bigWinData?.amount ?? 0)}
				</div>
				<img
					className='money'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/money.gif`}
					alt=''
				/>
				<img
					className='money-two'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/money.gif`}
					alt=''
				/>
			</div>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/promosBackPopup/delet.png`}
				alt=''
				className='closepop'
				onClick={() => {
					closeModal()
					closeCallback()
				}}
			/>
		</div>
	)
}

export default BigWinProfitModal
