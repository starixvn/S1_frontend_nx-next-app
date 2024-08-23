import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CHINESE_ZODIAC_STICKER_IDS } from '@nx-next-app/constants'
import { useBuyChineseZodiacStickerMutation } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import LotterySticker from '../LotterySticker'

const PurchaseStickerModal = (props: { price: number; currency?: string }) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const [message, setMessage] = useState<string | null>(null)
	const [stickerId, setStickerId] = useState(0)
	const [buyChineseZodiacSticker, { isLoading }] =
		useBuyChineseZodiacStickerMutation()

	const handlePurchaseClick = async () => {
		try {
			await buyChineseZodiacSticker({ stickerId }).unwrap()
			setMessage(t('Label_General_PurchaseSuccessful'))
		} catch (e) {
			setMessage((e as Error).message)
		}
		// closeModal()
	}

	const handleBackClick = () => setMessage(null)

	return (
		<div id='popup' className='event-lottery-popup-mask active'>
			<div className='event-lottery-popup jackpot'>
				{/* close */}
				<div className='icon icon-close' onClick={closeModal} />
				{/* popup-content */}
				{message ? (
					<div className='popup-content'>
						<div className='title-group'>
							<div className='title'>{t('Label_Event_JackpotSticker')}</div>
						</div>
						<div className='prompt'>
							<span>{message}</span>
						</div>
						<button onClick={handleBackClick}>{t('Label_General_Back')}</button>
					</div>
				) : (
					<div className='popup-content'>
						<div className='title-group'>
							<div className='title'>{t('Label_Event_JackpotSticker')}</div>
							<p>
								{t('Label_Event_ChooseOneToPurchase', {
									price: props.price.toLocaleString(),
									currency: props.currency,
								})}
							</p>
						</div>
						<div className='jackpot-group'>
							<div className='grid grid-cols-4'>
								{Object.values(CHINESE_ZODIAC_STICKER_IDS).map(value => (
									<div key={value} onClick={() => setStickerId(value)}>
										<LotterySticker
											stickerId={value}
											active={stickerId === value}
										/>
									</div>
								))}
							</div>
						</div>
						<button
							disabled={isLoading || !stickerId}
							onClick={handlePurchaseClick}
						>
							{t('Label_General_BuyNow')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default PurchaseStickerModal
