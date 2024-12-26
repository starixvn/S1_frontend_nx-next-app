import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { prizeAmout } from '@nx-next-app/features/F0001/h5/newYearEvent/info'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNewYearEvent } from '../../hooks'

const Blessing = () => {
	const { t } = useTranslation()
	const EVENT_ID = 15 // dragonEgg
	const [stickerResult, setStickerResult] = useState({
		stickers: 0,
		isClaimedBigPrize: false,
	})

	const {
		userInfo: { currencyId, currencyName },
	} = useAuth()
	const { modal } = useGlobalModal()

	const { getBlessingSticker, claimBlessingPrize } = useNewYearEvent()

	const { getBannerUrl } = useGlobalData()

	const claimPrize = async () => {
		const result = await claimBlessingPrize({
			eventId: EVENT_ID,
		})
		if ('errorCode' in result) {
			const { errorCode, message } = result

			if (errorCode === 0) {
				modal.info(t('Label_General_Success'), { onOK: () => getStickers() })
			} else {
				modal.error(message)
			}
		} else {
			modal.error(result.message)
		}
	}

	const getStickers = async () => {
		const result = await getBlessingSticker({
			eventId: EVENT_ID,
		})

		if ('data' in result && result.errorCode === 0) {
			const { data } = result
			setStickerResult(data)
		}
	}

	const blessingStickers = Array.from(
		{ length: stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div key={i} className='event-fu-item'>
			<div className='event-collection-get'>
				<img
					src={getBannerUrl('/h5/img/event/dragonegg/bless-egg.png')}
					alt={`5fu_fu_on-${i}`}
				/>
			</div>
		</div>
	))

	const emptyStickers = Array.from(
		{ length: 5 - stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div key={i} className='event-fu-item'>
			<div className='event-collection-noget'>
				<img
					src={getBannerUrl('/h5/img/event/dragonegg/bless-word.png')}
					alt={`5fu_fu_off-${stickerResult.stickers + i}`}
				/>
			</div>
		</div>
	))

	useEffect(() => {
		getStickers()
	}, [])

	return (
		<div className='event-collection'>
			<div className='event-main-title'>{t('lbl_DragonEgg_FiveFortunes')}</div>{' '}
			<div className='event-collection-text'>
				{t('lbl_DragonEgg_BlessingHints', {
					amount: prizeAmout.find(x => x.currency === currencyId)?.blessing,
					currencyName,
				})}
			</div>
			<div
				className={classNames('event-fu-inner', {
					active: stickerResult.isClaimedBigPrize,
				})}
			>
				{blessingStickers}
				{emptyStickers}
			</div>
			<button
				className={classNames('event-collection-btn', {
					active:
						stickerResult.stickers >= 5 && !stickerResult.isClaimedBigPrize,
				})}
				onClick={() => {
					if (stickerResult.stickers >= 5 && !stickerResult.isClaimedBigPrize) {
						claimPrize()
					}
				}}
			>
				{stickerResult.isClaimedBigPrize
					? t('lbl_DragonEgg_Received')
					: `${currencyName} ${
							prizeAmout.find(x => x.currency === currencyId)?.blessing
					  }`}
			</button>
		</div>
	)
}

export default Blessing
