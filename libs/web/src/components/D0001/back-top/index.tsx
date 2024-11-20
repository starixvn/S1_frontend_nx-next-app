import { scrollToTop } from '@nx-next-app/utils'
import { throttle } from 'lodash-es'
import { useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

const BackTop = () => {
	const { value: isVisible, setTrue, setFalse } = useBoolean(false)

	const handleScroll = throttle(() => {
		if (window.scrollY) {
			setTrue()
		} else {
			setFalse()
		}
	}, 100)

	useEffect(() => {
		if (window === undefined) return

		window?.addEventListener('scroll', handleScroll)

		return () => {
			window?.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return !isVisible ? null : (
		<button
			type='button'
			id='goTop'
			onClick={scrollToTop}
			style={{ zIndex: 4 }}
		>
			<i className='icon icon-arrow-up-line' />
		</button>
	)
}

export { BackTop }
