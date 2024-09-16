import { useHome } from '@nx-next-app/features/F0001/providers'
import { channelIcon } from '@nx-next-app/features/F0001/types'

import { Affiliate } from './Affiliate'
import { License } from './License'

const index = () => {
	const { footerSocialChannelList = [] } = useHome()

	return (
		<div className='home-bottom'>
			<div className='home-bottom-top'>
				<div className='bottom-social'>
					{footerSocialChannelList.map(({ link, channelName }) => (
						<a
							key={channelName}
							href={link}
							target='_blank'
							rel='noreferrer noopener'
						>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/${channelIcon[channelName]}.png`}
								alt={channelName}
							/>
						</a>
					))}
				</div>
				<License />
				<Affiliate />
			</div>
		</div>
	)
}

export default index
