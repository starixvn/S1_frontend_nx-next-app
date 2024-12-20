import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useNewYearEvent } from '@nx-next-app/features/F0001/hooks'
import { useTranslation } from 'next-i18next'

interface IAddBankCardForm {
	sysId: number
	accountNo: string
	isfcCode: string
}

const NewYearEventModal = () => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	const { accountName, currencyId } = userInfo
	const { eggTicket } = useNewYearEvent()
	const { getBannerUrl } = useGlobalData()
	const { closeModal } = useGlobalModal()
	const { modal } = useGlobalModal()

	const onOpenPrizeBox = async () => {
		modal.open(<AnimationPopBox />)

		// 動畫彈窗顯示 2.5 秒後再顯示獎品彈窗
		// await sleep(2500);
		setTimeout(() => {
			console.log('next')
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
						{Array.from({ length: 3 }, (_, i) => i + 1).map(() => (
							<button className='egg' onClick={onOpenPrizeBox}>
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

// Nova 獨有的開獎動畫彈窗
const AnimationPopBox = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='eggs active'>
			<div className='dragonegg-frame'>
				<img
					className='egg-check'
					src={getBannerUrl('/desktop/img/event/dragonegg/animation-egg-1.png')}
					alt='egg-check'
				/>
				<img
					className='egg-broken'
					src={getBannerUrl('/desktop/img/event/dragonegg/animation-egg-2.png')}
					alt='egg-broken'
				/>
			</div>
		</div>
	)
}

export default NewYearEventModal
