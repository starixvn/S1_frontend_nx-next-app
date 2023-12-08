import React from 'react'
import { footerImgName } from '@nx-next-app/features/F0001/types'
import { Img } from '@nx-next-app/components/D0001'

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
			{socialChannelList.map(({ link, channelName, title }) => (
				<a key={channelName} href={link} target='_blank' rel='noreferrer'>
					<Img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/${footerImgName[channelName]}`}
						alt={title}
					/>
				</a>
			))}
		</div>
	)
}

export default SocialMedia
