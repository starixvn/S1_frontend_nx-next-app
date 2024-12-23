import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'
import {
	DrawPrizeTypeEnum,
	useNewYearEvent,
} from '@nx-next-app/features/F0001/hooks'
import { IDrawPrizeData } from '@nx-next-app/service'
import classNames from 'classnames'
import { delay } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

export const NewYearEventModal = () => {
	const { t } = useTranslation()
	const { eggTicket } = useNewYearEvent()
	const { getBannerUrl } = useGlobalData()
	const { closeModal, modal } = useGlobalModal()

	const openPrizePox = () => {
		modal.open(<PrizePopBox isMulti={false} />)
	}

	const onOpenPrizeBox = async () => {
		modal.open(<AnimationPopBox />)

		// 動畫彈窗顯示 2.5 秒後再顯示獎品彈窗
		delay(() => {
			openPrizePox()
		}, 2500)
	}

	return (
		<div className='pop dragonegg-pop'>
			<div className='choose active'>
				<button className='close-btn' onClick={() => closeModal()} />
				<div className='dragonegg-frame'>
					<div className='title'>{t('lbl_DragonEgg_DrawEggs')}</div>
					<div className='text'>{t('lbl_DragonEgg_DrawHints')}</div>
					<div className='dragonegg-draw'>
						{Array.from({ length: 3 }, (_, i) => i + 1).map(item => (
							<button key={item} className='egg' onClick={onOpenPrizeBox}>
								<img
									src={getBannerUrl(
										'/desktop/img/event/dragonegg/draw-egg.png'
									)}
									alt='choose_egg'
								/>
							</button>
						))}
						<img
							className='dragonegg-draw-bg'
							src={getBannerUrl('/desktop/img/event/dragonegg/game-egg-bg.png')}
							alt='game-egg-bg'
						/>
					</div>
					<div className='dragonegg-egg'>
						{t('lbl_DragonEgg_Eggs')}: <span>{eggTicket}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export const PrizePopBox = ({ isMulti }: { isMulti: boolean }) => {
	const EVENT_ID = 15 // dragonEgg
	const { t } = useTranslation()
	const { closeModal, modal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	const [prizeList, setPrizeList] = useState<IDrawPrizeData[]>()
	const [isMultiDraw, setIsMultiDraw] = useState(isMulti)
	const { eggTicket, drawPrize } = useNewYearEvent()

	const getPrize = async ({ multiDraw }: { multiDraw: boolean }) => {
		const result = await drawPrize({
			eventId: EVENT_ID,
			multiDraw,
		})
		if ('data' in result && result.errorCode === 0) {
			const { data } = result
			const dataArray: IDrawPrizeData[] = Array.isArray(data) ? data : [data]
			setPrizeList(dataArray)
			if (multiDraw) setIsMultiDraw(true)
		} else {
			const { message } = result
			modal.error(message)
		}
	}

	useEffect(() => {
		getPrize({ multiDraw: isMultiDraw })
	}, [])

	// 顯示圖片
	// 單抽有獎
	let imgType = 'reward'
	// 10抽
	if (isMulti) {
		imgType = 'egg_10draw'
	} else if (
		// 單抽無獎
		!isMulti &&
		prizeList &&
		prizeList[0].drawPrizeType === DrawPrizeTypeEnum.noPrize
	) {
		imgType = 'goodlucky'
	} else if (
		// 單抽為福
		!isMulti &&
		prizeList &&
		prizeList[0].drawPrizeType === DrawPrizeTypeEnum.blessingSticker
	) {
		imgType = 'blessingegg'
	}

	return (
		<div className='pop dragonegg-result-pop'>
			<div
				className={classNames('active', {
					'ten-draw': isMultiDraw,
					'next-try':
						!isMultiDraw &&
						prizeList &&
						prizeList[0].drawPrizeType === DrawPrizeTypeEnum.noPrize,
					single:
						!isMultiDraw &&
						prizeList &&
						prizeList[0].drawPrizeType !== DrawPrizeTypeEnum.noPrize,
				})}
			>
				<button className='close-btn' onClick={() => closeModal()} />
				<div className='dragonegg-result-frame'>
					{/* 單抽 */}
					{!isMultiDraw &&
						prizeList &&
						(prizeList[0].drawPrizeType === DrawPrizeTypeEnum.noPrize ? (
							// 單抽無獎
							<div className='title'>{t('lbl_DragonEgg_GoodLuck')}</div>
						) : (
							// 單抽有獎
							<>
								<div className='title'>
									{t('lbl_DragonEgg_CONGRATULATIONS')}
								</div>
								<div className='rewards-title'>{prizeList[0].prizeName}</div>
							</>
						))}
					{!isMultiDraw && (
						<img
							src={getBannerUrl(
								`/desktop/img/event/dragonegg/popup-${imgType}.png`
							)}
							alt='winning_goodluck'
						/>
					)}
					{isMultiDraw && (
						<>
							<div className='title'>{t('lbl_DragonEgg_CONGRATULATIONS')}</div>
							<div className='dragonegg-result-list'>
								<div className='list-title'>
									{t('lbl_DragonEgg_EventRewards')}
								</div>
								{prizeList &&
									prizeList.map(({ prizeName }, i) => (
										// eslint-disable-next-line react/no-array-index-key
										<div key={i}>{prizeName}</div>
									))}
							</div>
						</>
					)}
				</div>

				<div className='dragonegg-result-btn'>
					{/* 單抽且無法再抽 */}
					{eggTicket === 0 && !isMultiDraw && (
						<div className='dragonegg-result-btn'>
							<button className='btn-confirm' onClick={() => closeModal()}>
								{t('lbl_DragonEgg_Confirm')}
							</button>
						</div>
					)}
					{/* 單抽有獎或10抽且剩下龍蛋不為 0 時 */}
					{(isMultiDraw ||
						(prizeList &&
							prizeList[0].drawPrizeType !== DrawPrizeTypeEnum.noPrize)) &&
						eggTicket !== 0 && (
							<button className='btn-receive' onClick={() => closeModal()}>
								{t('lbl_DragonEgg_Received')}
							</button>
						)}
					<div className='btn-playdraw'>
						{/* 單抽且可再單抽 */}
						{!isMultiDraw && eggTicket > 0 && (
							<button
								className={classNames('btn-oneplay', {
									full: eggTicket < 10,
									'half mr-2': eggTicket >= 10,
								})}
								onClick={() => {
									getPrize({ multiDraw: false })
								}}
							>
								{t('lbl_DragonEgg_DrawAgain')}
							</button>
						)}
						{/* 單抽10抽且可再10抽 */}
						{eggTicket >= 10 && (
							<button
								className='btn-tenplay'
								onClick={() => getPrize({ multiDraw: true })}
							>
								{t('lbl_DragonEgg_10Again')}
							</button>
						)}
					</div>
				</div>
				<div className='dragonegg-result-egg'>
					{t('lbl_DragonEgg_Eggs')}: <span>{eggTicket}</span>
				</div>
			</div>
		</div>
	)
}

// Nova 獨有的開獎動畫彈窗
const AnimationPopBox = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='pop dragonegg-pop'>
			<div className='eggs active'>
				<div className='dragonegg-frame'>
					<img
						className='egg-check'
						src={getBannerUrl(
							'/desktop/img/event/dragonegg/animation-egg-1.png'
						)}
						alt='egg-check'
					/>
					<img
						className='egg-broken'
						src={getBannerUrl(
							'/desktop/img/event/dragonegg/animation-egg-2.png'
						)}
						alt='egg-broken'
					/>
				</div>
			</div>
		</div>
	)
}

export default NewYearEventModal
