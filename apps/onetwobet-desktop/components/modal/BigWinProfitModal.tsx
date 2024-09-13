import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { IPopUpData } from '@nx-next-app/service'
import { numFormatToDigits } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const LoginModal = dynamic(() => import('./LoginModal'), {
	ssr: false,
})

const BigWinProfitModal = ({
	bigWinData,
	closeCallback = () => null,
}: {
	bigWinData: IPopUpData
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const { onEnterSlotsPage } = useMenu()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	return (
		<div className='bigwin'>
			<div className={`bigwinpop active ${langId}`}>
				<div className='bigwinpop-item'>
					<div
						onClick={() =>
							onEnterSlotsPage(
								{
									tpId: String(bigWinData.tpId),
									tpGameType: String(bigWinData.tpGameType),
									gameId: String(bigWinData.gameId),
									isFree: false,
								},
								{ loginCallback: () => modal.open(<LoginModal />) }
							)
						}
					>
						<div className='bigwinpop-img' />
						<div className='bigwinpop-text'>
							<div className='name'>{bigWinData?.userName ?? '-'}</div>
							<button className='vender'>{bigWinData?.gameName ?? '-'}</button>
						</div>
						<div className='bigwinpop-number'>
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
			</div>
		</div>
	)
}

export default BigWinProfitModal
