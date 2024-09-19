import { Marquee } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useRouter } from 'next/router'

const Announcement = () => {
	const { push } = useRouter()
	const { announcementData, handleMarqueeClick } = useHome()

	return (
		<Marquee
			data={announcementData}
			onMarqueeClick={() =>
				handleMarqueeClick({
					loginCallback: () => push(paths.login.root),
				})
			}
		/>
	)
}

export default Announcement
