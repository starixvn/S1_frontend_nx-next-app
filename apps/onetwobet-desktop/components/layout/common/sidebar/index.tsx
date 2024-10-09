import AppDownloadModal from '@12b-desktop/components/modal/AppDownloadModal'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'
import { openLiveChat } from '@nx-next-app/utils'

const FloatSidebar = () => {
	const { getBannerUrl } = useGlobalData()
	const { modal } = useGlobalModal()

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
				{/* <!-- Download app --> */}
				<li className='sidebar-list'>
					<a
						href=''
						className='sidebar-link'
						onClick={e => {
							e.preventDefault()
							modal.open(<AppDownloadModal />)
						}}
					>
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
