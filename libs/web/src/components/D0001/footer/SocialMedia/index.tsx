import { Img } from '@nx-next-app/components/D0001'
import { footerImgName } from '@nx-next-app/features/F0001/types'

interface ISocialMediaProps {
	socialChannelList: {
		id: number
		channelName: string
		title: string
		link: string
		linkType: number
		scheme: {
			ios: string
			android: string
		}
	}[]
}

const SocialMedia = ({ socialChannelList }: ISocialMediaProps) => {
	return (
		<div className='social-media'>
			<div className='footer-center-title'>Social Media</div>
			<div className='social-media-list'>
				{socialChannelList.map(({ link, channelName, title }) => (
					<a key={channelName} href={link} target='_blank' rel='noreferrer'>
						<Img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/${footerImgName[channelName]}`}
							alt={title}
						/>
					</a>
				))}
			</div>
		</div>
	)
}

export default SocialMedia
