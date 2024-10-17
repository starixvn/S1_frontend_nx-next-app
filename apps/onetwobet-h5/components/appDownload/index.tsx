import { useGlobalData } from '@nx-next-app/data-access'
import { Trans } from 'next-i18next'

const AppDownload = () => {
	const { getBannerUrl } = useGlobalData()
	/* const { IOSDownloadUrl, androidDownLoadUrl, APP_DOWNLOAD_LIST } =
		useAppDownload() */

	return (
		<main className='main download'>
			<div className='download-group android'>
				<button className='collapse-btn'>
					<div className='title'>
						<img src={getBannerUrl(`/h5/img/icon-android.png`)} alt='' />
						Android Download
					</div>
				</button>
				<div className='content'>
					<ul>
						<ul>
							<li>
								<div className='title'>
									12bet<span className='state'>New!</span>
								</div>
								<button>Download</button>
							</li>
							<li>
								<div className='title'>PLAYTECH</div>
								<button>Download</button>
							</li>
							<li>
								<div className='title'>
									12Sports<span className='state'>New!</span>
								</div>
								<button>Download</button>
							</li>
						</ul>
					</ul>
				</div>
			</div>
			<div className='download-group ios'>
				<button className='collapse-btn'>
					<div className='title'>
						<img src={getBannerUrl(`/h5/img/icon-ios.png`)} alt='' />
						iOS Download
					</div>
				</button>
				<div className='content'>
					<ul>
						<li>
							<div className='title'>
								12bet<span className='state'>New!</span>
							</div>
							<button>Download</button>
						</li>
					</ul>
				</div>
			</div>
			<span />
			<div className='note'>
				<Trans
					i18nKey='Label_AppDownload_Note'
					components={{
						span: <span />,
					}}
				/>
			</div>
		</main>
	)
}

export default AppDownload
