import { useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

const BackTop = () => {
	const { value: isVisible, setTrue, setFalse } = useBoolean(false)

	const handleScroll = () => {
		if (window.scrollY) {
			setTrue()
		} else {
			setFalse()
		}
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		if (window === undefined) return

		window?.addEventListener('scroll', handleScroll)

		return () => {
			window?.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return !isVisible ? null : (
		<button type='button' id='goTop' onClick={scrollToTop}>
			<i className='icon icon-arrow-up2' />
		</button>
	)
}

export { BackTop }
