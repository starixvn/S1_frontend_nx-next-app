import { useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

interface Args extends IntersectionObserverInit {
	freezeOnceVisible?: boolean
}

/**
 * @description
 */
const useInView = ({
	threshold = 0,
	root = null,
	rootMargin = '0%',
	freezeOnceVisible = false,
}: Args) => {
	const ref = useRef(null)
	const entry = useIntersectionObserver(ref, {
		threshold,
		root,
		rootMargin,
		freezeOnceVisible,
	})
	const isInView = !!entry?.isIntersecting

	return { ref, isInView }
}

export { useInView }
