import {
	StageEvent,
	useLotteryProgressContext,
} from '@nx-next-app/features/F0001/providers'
import { forwardRef, useEffect, useRef } from 'react'
import LotterySlotMachineDisplay from './LotterySlotMachineDisplay'

const LotterySlotMachine = forwardRef<HTMLDivElement>((_, ref) => {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const { stage, toNext } = useLotteryProgressContext()

	const play = (event: string) =>
		iframeRef.current?.contentWindow?.postMessage(event, '*')

	useEffect(() => {
		const onMessage = ({ data }: MessageEvent) => {
			if (data?.type === 'animationEnded') toNext()
		}
		window.addEventListener('message', onMessage)
		return () => window.removeEventListener('message', onMessage)
	}, [])

	useEffect(() => {
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
	}, [stage])

	return (
		<div ref={ref} className='slot'>
			<LotterySlotMachineDisplay />
			<iframe
				ref={iframeRef}
				title='slot'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/lottery-machine/index.html`}
				style={{ width: '100%', height: 'auto', aspectRatio: '250 / 300' }}
			/>
		</div>
	)
})

export default LotterySlotMachine
