import {
	LoadingIcon,
	NoGameIcon,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/icons'
import { Img } from 'react-image'

const ESportBanner = () => {
	return (
		<div className='banner-container'>
			<div className='content-container'>
				<Img
					className='img-banner'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/e-sport-banner.webp`}
					loader={<LoadingIcon />}
					unloader={<NoGameIcon />}
					alt='Live Casino'
				/>
			</div>
		</div>
	)
}

export default ESportBanner
