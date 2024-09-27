import { useGlobalData } from '@nx-next-app/data-access'

const Loading = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div id='Loading' className='active'>
			<div className='preloader'>
				<img
					src={getBannerUrl(`/h5/img/12betloading.png`)}
					className='preloader-logo'
					alt='12-bet-loading'
				/>
				<hr />
				<hr />
				<hr />
				<hr />
				<hr />
			</div>
		</div>
	)
}

export default Loading
