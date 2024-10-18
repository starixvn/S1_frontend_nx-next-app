import { Marquee } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	dateAbbFormat,
	gmtFormat,
	meridiemFormat,
	paths,
	time12Format,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const Announcement = () => {
	const {
		auth: { isLogin },
	} = useAuth()
	const { announcementData } = useHome()
	const { modal } = useGlobalModal()
	const { push } = useRouter()
	const handleMarqueeClick = () => {
		if (!isLogin) {
			modal.open(<LoginModal />)
			return
		}
		push(paths.announcement.root)
	}

	const now = new Date()
	const date = dayjs(now).format(dateAbbFormat)
	const time = dayjs(now).format(time12Format)
	const meridiem = dayjs(now).format(meridiemFormat)
	const gmt = dayjs(now).format(gmtFormat)

	return (
		<div className='home-marquee'>
			<div id='Marquee'>
				<div className='time'>{`${time} ${meridiem} ${date} GMT(${gmt})`}</div>
				<div className='marquee-box'>
					<div className='marquee-run' style={{ width: '100%' }}>
						<Marquee
							data={announcementData}
							onMarqueeClick={handleMarqueeClick}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Announcement
