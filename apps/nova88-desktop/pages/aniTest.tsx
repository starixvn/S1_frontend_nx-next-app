/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react'

/**
 * slot 動畫觸發事件
 * @Bootup 開機
 * @Standby 待機
 * @TicketPrint 出票
 * @TicketCutoff 掉票
 * @Shutdown 關機 */
enum SlotEventEnum {
	Bootup = 'bootup',
	Standby = 'standby',
	TicketPrint = 'ticket_print',
	TicketCutoff = 'ticket_cutoff',
	Shutdown = 'shutdown',
}

/** 動畫是否結束 */
const ANIMATION_END = 'animationEnded'

const AniTest: React.FC = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		/** 監聽動畫是否結束的函數 */
		const handleAnimationEnd = (event: MessageEvent) => {
			/**
			 * 定義通用的播放函數
			 * @type 監聽動畫結束的字串
			 * @animationName 當前結束動畫的名稱 */
			const { type, animationName } = event.data ?? {}
			if (type === ANIMATION_END) {
				console.log(`動畫 ${animationName} 已結束`)
			}
		}

		window.addEventListener('message', handleAnimationEnd)
		return () => {
			window.removeEventListener('message', handleAnimationEnd)
		}
	}, [])

	/** 開機動畫廣播 */
	const bootup = () => {
		iframeRef.current?.contentWindow?.postMessage(SlotEventEnum.Bootup, '*')
	}

	/** 機台準備動畫廣播 */
	const standby = () => {
		iframeRef.current?.contentWindow?.postMessage(SlotEventEnum.Standby, '*')
	}

	/** 吐票動畫廣播 */
	const ticketPrint = () => {
		iframeRef.current?.contentWindow?.postMessage(
			SlotEventEnum.TicketPrint,
			'*'
		)
	}

	/** 掉票動畫廣播 */
	const ticketCutoff = () => {
		iframeRef.current?.contentWindow?.postMessage(
			SlotEventEnum.TicketCutoff,
			'*'
		)
	}

	/** 關機動畫廣播 */
	const shutdown = () => {
		iframeRef.current?.contentWindow?.postMessage(SlotEventEnum.Shutdown, '*')
	}

	return (
		<div>
			<iframe
				ref={iframeRef}
				src='/adobeAnimation/lottery/slot.html'
				style={{ width: '100%', height: '1000px' }}
				title='SlotAnimation'
				frameBorder='0'
			/>
			<button onClick={bootup}>bootup</button>
			<br />
			<button onClick={standby}>standby</button>
			<br />
			<button onClick={ticketPrint}>ticketPrint</button>
			<br />
			<button onClick={ticketCutoff}>ticketCutoff</button>
			<br />
			<button onClick={shutdown}>shutdown</button>
		</div>
	)
}

export default AniTest
