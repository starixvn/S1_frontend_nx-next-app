import { useHome } from '@nx-next-app/features/F0006/providers'
import { channelIconClass } from '@nx-next-app/features/F0006/types'
import { License } from './License'
import { Affiliate } from './Affiliate'

const index = () => {
	const { footerSocialChannelList } = useHome()
	return (
		<div className='footerModule'>
			<img
				className='spokesperson'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/homepage/spokesperson.png`}
				alt='Endorser'
			/>
			<div className='middle'>
				<div className='social'>
					{footerSocialChannelList.length > 0 &&
						footerSocialChannelList.map(channel => {
							// 外部 Link 直接用原生 a tag 不需使用 Next/Link
							const { channelName, link } = channel
							return (
								<a
									key={`channel-${channelName}`}
									className={channelIconClass[channelName]}
									href={link}
									target='_blank'
									rel='noreferrer noopener'
									aria-label={channelName}
								/>
							)
						})}
				</div>
				<div className='border' />
				<License />
			</div>
			<Affiliate />
		</div>
	)
}

export { index as FooterBlock }
