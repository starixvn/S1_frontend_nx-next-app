import { useEffect, useRef } from 'react'
import { EventTabs } from '../EventTabs'
import LotteryDraw from './LotteryDraw'
import LotteryRoundInfo from './LotteryRoundInfo'
import LotterySlotMachine from './LotterySlotMachine'
import LotteryBottomSection from './bottomSection'

export const LotteryEventPage = () => {
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

	return (
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
	)
}
