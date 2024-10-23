import {
	StageEvent,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import LotterySlotMachineDisplay from './LotterySlotMachineDisplay'

const LotterySlotMachine = forwardRef<HTMLDivElement>((_, ref) => {
	const [isReady, setIsReady] = useState(false)
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const { stage, toNext } = useLotteryProgressContext()

	const play = (event: string) =>
		setTimeout(
			() => iframeRef.current?.contentWindow?.postMessage(event, '*'),
			1000 // 延遲 1 秒，避免動畫未準備好
		)

	useEffect(() => {
		const onMessage = ({ data }: MessageEvent) => {
			if (data === 'ready') setIsReady(true)
			else if (data?.type === 'animationEnded') toNext()
		}
		window.addEventListener('message', onMessage)
		return () => window.removeEventListener('message', onMessage)
	}, [])

	useEffect(() => {
		if (!isReady) return

		if (stage.has(StageEvent.PlayBootUpAnimation)) {
			play('bootup')
		} else if (stage.has(StageEvent.PlayStandbyAnimation)) {
			play('standby')
		} else if (stage.has(StageEvent.PlayTicketPrintAnimation)) {
			play('ticket_print')
		} else if (stage.has(StageEvent.PlayTicketCutOffAnimation)) {
			play('ticket_cutoff')
		} else if (stage.has(StageEvent.PlayShutdownAnimation)) {
			play('shutdown')
		} else if (stage.has(StageEvent.RunningNumbers)) {
			play('ticket_hanging')
		}
	}, [stage, isReady])

	useInterval(
		() => iframeRef.current?.contentWindow?.postMessage('check', '*'),
		isReady ? null : 500
	)

	return (
		<div ref={ref} className='slot'>
			{/* 讓倒數計時與 slot 機同時顯示 */}
			{isReady && <LotterySlotMachineDisplay />}
			<iframe
				ref={iframeRef}
				title='slot'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/lottery-machine/index.html`}
				style={{
					width: '100%',
					height: 'auto',
					aspectRatio: '5 / 6',
					pointerEvents: 'none',
				}}
			/>
		</div>
	)
})

export default LotterySlotMachine
