import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	LotteryProgressProvider,
	useLotteryDataContext,
} from '@nx-next-app/features/F0001/providers'
import { ICustLotteryHistoryWinnerData } from '@nx-next-app/service'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { EventTabs } from '../EventTabs'
import LotteryDraw from './LotteryDraw'
import LotteryRoundInfo from './LotteryRoundInfo'
import LotterySlotMachine from './LotterySlotMachine'
import LotteryBottomSection from './bottomSection'
import MaintenanceModal from './modals/MaintenanceModal'
import PrizeModal from './modals/PrizeModal'

export const LotteryEventPage = () => {
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { isUnderMaintenance } = useLotteryDataContext()

	const mainRef = useRef<HTMLDivElement>(null)
	const slotRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const onScroll = () =>
			window.requestAnimationFrame(() => {
				const { scrollTop } = document.documentElement
				const slotElement = slotRef.current
				const mainElement = mainRef.current
				if (slotElement && mainElement) {
					slotElement.style.transition = 'transform 0.5s ease-out'
					slotElement.style.transform = `translateY(${scrollTop * 0.22}px)`
					mainElement.style.setProperty(
						'--parallax-offset',
						`${scrollTop * -0.1}px`
					)
				}
			})

		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		if (isUnderMaintenance) {
			modal.open(<MaintenanceModal onClose={() => push(paths.home.root)} />, {
				className: 'event-lottery-popup-mask',
			})
		}
	}, [isUnderMaintenance])

	const onWinning = (data: ICustLotteryHistoryWinnerData) => {
		modal.open(<PrizeModal data={data} />, {
			className: 'event-lottery-popup-mask',
		})
	}

	return (
		<LotteryProgressProvider onWinning={onWinning}>
			<main ref={mainRef} className='lottery'>
				<EventTabs />
				<div className='lottery-wrapper'>
					<LotterySlotMachine ref={slotRef} />
					<div className='main-content'>
						<div className='container flex-column'>
							<LotteryDraw />
							<LotteryRoundInfo />
							<LotteryBottomSection />
						</div>
					</div>
				</div>
			</main>
		</LotteryProgressProvider>
	)
}
