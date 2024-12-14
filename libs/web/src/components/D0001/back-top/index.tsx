import { throttle } from 'lodash-es'
import { useCallback, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

const BackTop = () => {
	const { value: isVisible, setTrue, setFalse } = useBoolean(false)

	const handleScroll = throttle((event: Event) => {
		const mainContent = event.target as HTMLElement
		if (mainContent.scrollTop > 0) {
			setTrue()
		} else {
			setFalse()
		}
	}, 100)

	useEffect(() => {
		const mainContent = document?.getElementById('__desktop')
		if (mainContent === undefined) return

		mainContent?.addEventListener('scroll', handleScroll)

		return () => {
			mainContent?.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const scrollToTop = useCallback(() => {
		const mainContent = document?.getElementById('__desktop')
		if (!mainContent) return

		mainContent.scrollTop = 0
	}, [])

	return !isVisible ? null : (
		<button
			type='button'
			id='goTop'
			onClick={scrollToTop}
			style={{ zIndex: 4 }}
			className='pc'
		>
			<i className='icon icon-arrow-up-line' />
		</button>
	)
}

export { BackTop }
