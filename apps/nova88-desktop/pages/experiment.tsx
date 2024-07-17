import { set } from 'lodash-es'
import Script from 'next/script'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const getRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000)

class ListNode {
	public value: string
	public next: ListNode
	constructor(value: string) {
		this.value = value
		this.next = null
	}
}

const createAnimationList = () => {
	const head = new ListNode('Animation 1')
	let current = head
	// 播放七次
	for (let i = 2; i <= 20; i++) {
		current.next = new ListNode(`Animation ${i}`)
		current = current.next
	}

	current.next = head

	return head
}

const calculateCurrentNode = (head: ListNode) => {
	const now = new Date()
	const eventStartTime = new Date(now)
	eventStartTime.setHours(15, 58, 0, 0)

	if (now < eventStartTime) {
		return { status: 'waiting', node: head, iteration: 0 }
	}

	const timeSinceStart = (now.getTime() - eventStartTime.getTime()) / 1000 // 以秒計算
	const slotDuration = 10 // 每次動畫持續 60 秒
	const totalSlots = 20 // 播放 20 次

	console.log(`timeSinceStart: ${timeSinceStart}`)

	const currentSlot = Math.floor(timeSinceStart / slotDuration) % totalSlots
	console.log(`現在第幾次: ${currentSlot}`)

	const iteration = Math.floor(timeSinceStart / (slotDuration * totalSlots))

	let currentNode = head
	for (let i = 0; i < currentSlot; i++) {
		currentNode = currentNode.next
	}

	if (iteration >= 1) {
		return { status: 'finished', node: currentNode, iteration }
	}

	return { status: 'playing', node: currentNode, iteration }
}

const useIframeAnimation = ({ src }: { src: string }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const iframeRef = useRef<HTMLIFrameElement>(null)

	const Animation = useCallback(
		() => (
			<iframe
				ref={iframeRef}
				width='100%'
				height='700px'
				title='slot'
				src={src}
			/>
		),
		[src]
	)

	let resolve = () => {
		console.log('resolve')
	}

	// useEffect(() => {
	// 	const handle = ({ data }: MessageEvent) => {
	// 		if (data.type === 'animation') {
	// 			console.log(data.action)
	// 		}
	//
	// 		// if (data.action === 'stop') {
	// 		// 	console.log(data.action)
	// 		// 	setIsPlaying(false)
	// 		// 	resolve()
	// 		// }
	// 	}
	// 	window.addEventListener('message', handle)
	// 	return () => window.removeEventListener('message', handle)
	// }, [])

	const post = (data: any) => {
		iframeRef.current?.contentWindow?.postMessage(data)
	}

	const play = useCallback(() => {
		setIsPlaying(true)
		return new Promise<void>(r => {
			resolve = r
			post('play')
		})
	}, [])

	const pause = () => post('pause')

	return { Animation, play, pause, isPlaying }
}

// const Animation = () => {
//     const iframeRef = useRef<HTMLIFrameElement>(null)

//     useEffect(() => {
//         if (iframeRef.current) {
//             const iframe = iframeRef.current
//             const iframeWindow = iframe.contentWindow
//         }
//     }, [])

//     return (
//         <iframe
//             ref={iframeRef}
//             width='100%'
//             height='700px'
//             title='slot'
//             src='/animations/slot_demo/slot.html'
//         />
//     )
// }

const wait = (ms: number) =>
	new Promise(r => {
		setTimeout(r, ms)
	})

const Experiment = () => {
	// 創建 linkedList
	const animationListHead = createAnimationList()
	const { Animation, play, isPlaying } = useIframeAnimation({
		src: '/animations/slot_demo/slot.html',
	})
	// 計算當前的第幾次播放
	const [currentNode, setCurrentNode] = useState(
		calculateCurrentNode(animationListHead)
	)
	const [iteration, setIteration] = useState(currentNode.iteration)
	// const [step, setStep] = useState(0)
	// const [numbers, setNumbers] = useState<number[][]>([])

	// const start = async (from = 0) => {
	// 	if (from <= 0) {
	// 		setStep(0)
	// 		await play()
	// 		setStep(1)
	// 		await wait(2000)
	// 	}
	// 	if (from <= 1) {
	// 		setStep(1)
	// 		await play()
	// 		setStep(2)
	// 		await wait(2000)
	// 	}
	// 	if (from <= 2) {
	// 		setStep(2)
	// 		await play()
	// 		setStep(3)
	// 		await wait(2000)
	// 	}
	// }
	//
	// useEffect(() => {
	// 	setNumbers([
	// 		[getRandomNumber(), getRandomNumber(), getRandomNumber()],
	// 		[getRandomNumber(), getRandomNumber(), getRandomNumber()],
	// 		[getRandomNumber(), getRandomNumber(), getRandomNumber()],
	// 	])
	// }, [])

	useEffect(() => {
		if (currentNode.status === 'waiting') {
			const timer = setTimeout(() => {
				setCurrentNode(calculateCurrentNode(animationListHead))
			}, 10000)
			return () => clearTimeout(timer)
		}

		if (currentNode.status === 'playing') {
			play()
			const interval = setInterval(() => {
				const updatedNode = calculateCurrentNode(animationListHead)
				setCurrentNode(updatedNode)
				setIteration(updatedNode.iteration)
				play()
			}, 10000) // 每 20 秒更新一次動畫結果

			return () => clearInterval(interval)
		}
	}, [currentNode, animationListHead, play])

	return (
		<div
			style={{ color: 'black', padding: '48px 60px', fontFamily: 'monospace' }}
		>
			<h1>Slot Showcase</h1>
			{currentNode.status === 'waiting' && <p>還沒開始啦操</p>}
			{currentNode.status === 'finished' && <p>結束囉，明天請早</p>}
			{currentNode.status === 'playing' && (
				<>
					<Animation />
					<p>{currentNode.node.value}</p>
				</>
			)}
			{/*<div style={{ display: 'flex', gap: '16px' }}>*/}
			{/*	{numbers.map((row, i) => (*/}
			{/*		<div key={i} style={{ border: '1px solid black', padding: '4px' }}>*/}
			{/*			<div>{i + 1}</div>*/}
			{/*			{row.map((number, j) => (*/}
			{/*				<p key={j}>{number}</p>*/}
			{/*			))}*/}
			{/*		</div>*/}
			{/*	))}*/}
			{/*</div>*/}
			{/*<Animation />*/}
			{/*/!* isPlaying?*/}
			{/*{isPlaying ? 'YES' : 'NO'} *!/*/}
			{/*{step > 0 && (*/}
			{/*	<div*/}
			{/*		style={{*/}
			{/*			border: '1px solid black',*/}
			{/*			padding: '4px',*/}
			{/*			display: 'inline-block',*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<div>{step}</div>*/}
			{/*		{numbers[step - 1]?.map((number, i) => (*/}
			{/*			<p key={number}>{number}</p>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*)}*/}
		</div>
	)
}

export default Experiment
