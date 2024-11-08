/* eslint-disable jsx-a11y/heading-has-content */

import { useGlobalData } from '@nx-next-app/data-access'

const Loading = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div id='Loading' className='active'>
			<div className='preloader'>
				<img
					src={getBannerUrl(`/desktop/img/12betloading.png`)}
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
