import { useGlobalData } from '@nx-next-app/data-access'
import { openLiveChat } from '@nx-next-app/utils'

const FloatSidebar = () => {
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='float-sidebar'>
			<ul className='sidebar-container'>
				{/* <!-- Live chat --> */}
				<li className='sidebar-list'>
					<button className='sidebar-link' onClick={openLiveChat}>
						<img
							src={getBannerUrl('/desktop/img/icon-livechat.png')}
							alt='live chat icon'
						/>
					</button>
				</li>
				{/* <!-- TODO: Download app --> */}
				<li className='sidebar-list'>
					<a href='' className='sidebar-link'>
						<img
							src={getBannerUrl('/desktop/img/icon-download.png')}
							alt='download icon'
						/>
					</a>
				</li>
			</ul>
		</div>
	)
}

export default FloatSidebar
