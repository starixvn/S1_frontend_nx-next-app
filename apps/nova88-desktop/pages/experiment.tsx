import { set } from 'lodash-es'
import Script from 'next/script'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const getRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000)

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

	useEffect(() => {
		const handle = ({ data }: MessageEvent) => {
			if (data.type === 'animation') {
				if (data.action === 'stop') {
					setIsPlaying(false)
					resolve()
				}
			}
		}
		window.addEventListener('message', handle)
		return () => window.removeEventListener('message', handle)
	}, [])

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
	const { Animation, play, isPlaying } = useIframeAnimation({
		src: '/animations/slot_demo/slot.html',
	})
	const [step, setStep] = useState(0)
	const [numbers, setNumbers] = useState<number[][]>([])

	const start = async (from = 0) => {
		if (from <= 0) {
			setStep(0)
			await play()
			setStep(1)
			await wait(2000)
		}
		if (from <= 1) {
			setStep(1)
			await play()
			setStep(2)
			await wait(2000)
		}
		if (from <= 2) {
			setStep(2)
			await play()
			setStep(3)
			await wait(2000)
		}
	}

	useEffect(() => {
		setNumbers([
			[getRandomNumber(), getRandomNumber(), getRandomNumber()],
			[getRandomNumber(), getRandomNumber(), getRandomNumber()],
			[getRandomNumber(), getRandomNumber(), getRandomNumber()],
		])
	}, [])

	return (
		<div
			style={{ color: 'black', padding: '48px 60px', fontFamily: 'monospace' }}
		>
			<p>STEP: {step}</p>
			<button onClick={() => start(0)}>PLAY from 1</button>
			<br />
			<button onClick={() => start(1)}>PLAY from 2</button>
			<br />
			<button onClick={() => start(2)}>PLAY from 3</button>
			<br />
			<div style={{ display: 'flex', gap: '16px' }}>
				{numbers.map((row, i) => (
					<div key={i} style={{ border: '1px solid black', padding: '4px' }}>
						<div>{i + 1}</div>
						{row.map((number, j) => (
							<p key={j}>{number}</p>
						))}
					</div>
				))}
			</div>
			<Animation />
			{/* isPlaying?
			{isPlaying ? 'YES' : 'NO'} */}
			{step > 0 && (
				<div
					style={{
						border: '1px solid black',
						padding: '4px',
						display: 'inline-block',
					}}
				>
					<div>{step}</div>
					{numbers[step - 1]?.map((number, i) => (
						<p key={number}>{number}</p>
					))}
				</div>
			)}
		</div>
	)
}

export default Experiment
