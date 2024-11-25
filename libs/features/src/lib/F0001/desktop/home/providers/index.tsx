import { paths } from '@nx-next-app/constants'
import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import {
	LoadingIcon,
	NoGameIcon,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/icons'
import {
	GameContainer,
	ProviderGroup,
} from '@nx-next-app/features/F0001/desktop/home/providers/styles'
import { GroupTitle } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { EmblaOptionsType } from 'embla-carousel'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Img } from 'react-image'

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const ProvidersList = () => {
	const { t } = useTranslation()
	const { providerData } = useHome()

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	console.log('-------providerData', providerData)

	if (providerData.length === 0) {
		return <div />
	}

	return (
		<ProviderGroup className='content-container'>
			{providerData.length > 0 && (
				<>
					<GroupTitle>
						Providers
						<Link href={paths.slots.root} passHref>
							<a className='load-more'>
								All <span className='icon icon-arrow-right-line' />
							</a>
						</Link>
					</GroupTitle>
					<GameContainer>
						<EmblaCarousel
							options={gameTypeEmblaOptions}
							isControlButton={false}
						>
							{providerData.map(provider => {
								const { tpId, tpLogo, tpName } = provider

								return (
									<div className='embla__slide provider-item' key={tpId}>
										<Img
											className='img'
											src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/provider/dark/${tpLogo}.webp`}
											loader={<LoadingIcon />}
											unloader={<NoGameIcon />}
											alt={tpName}
										/>
									</div>
								)
							})}
						</EmblaCarousel>
					</GameContainer>
				</>
			)}
		</ProviderGroup>
	)
}

export default ProvidersList
