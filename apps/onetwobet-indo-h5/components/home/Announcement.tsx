import { Marquee } from '@12b-indo-h5/components/common'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import { useRouter } from 'next/router'

const Announcement = () => {
	const {
		auth: { isLogin },
	} = useAuth()
	const { announcementData } = useHome()
	const { push } = useRouter()

	const handleMarqueeClick = () => {
		push(isLogin ? paths.announcement.root : paths.login.root)
	}

	return (
		<div id='Marquee'>
			<div className='marquee-box'>
				<Marquee data={announcementData} onMarqueeClick={handleMarqueeClick} />
			</div>
		</div>
	)
}

export default Announcement
