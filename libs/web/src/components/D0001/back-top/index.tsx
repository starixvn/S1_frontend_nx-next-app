import { throttle } from 'lodash-es'
import { useCallback, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

const BackTop = () => {
	const { value: isVisible, setTrue, setFalse } = useBoolean(false)

	const handleScroll = useCallback(
		throttle(() => {
			if (window.scrollY > 0) {
				setTrue()
			} else {
				setFalse()
			}
		}, 100),
		[]
	)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	const scrollToTop = useCallback(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
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
