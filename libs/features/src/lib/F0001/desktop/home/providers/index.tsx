import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import {
	LoadingIcon,
	NoGameIcon,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/icons'
import GroupTitle from '@nx-next-app/features/F0001/desktop/home/GroupTitle'
import {
	GameContainer,
	ProviderGroup,
} from '@nx-next-app/features/F0001/desktop/home/providers/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { EmblaOptionsType } from 'embla-carousel'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
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
  const maxGame = 61;
  const keno = 71;
  const lottery = 72;
  const tableGame = 73;
	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

  const providerComingSoon = [
    {tpId: 999,tpNameKey: "SA Gaming",tpName: "sa-gaming",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1000,tpNameKey: "NextSpin",tpName: "next-spin",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1001,tpNameKey: "SpadeGaming",tpName: "spade-gaming",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1002,tpNameKey: "Microgaming",tpName: "microgaming",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1003,tpNameKey: "Evolution",tpName: "evolution",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1004,tpNameKey: "Yeebet Casino",tpName: "yeebet-casino",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0},
    {tpId: 1005,tpNameKey: "WonCasino",tpName: "won-casino",tpLogo: "",gameId: '',gameLogo: '',gameName: '',sort: 0,tpCategory: 0,tpGameType: 0}
  ];

	if (providerData.length === 0) {
		return <div />
	}

	return (
		<ProviderGroup className='content-container'>
			<GroupTitle title='Providers' />
			<GameContainer>
				<EmblaCarousel options={gameTypeEmblaOptions} isControlButton={false}>
					{providerData.map(provider => {
						const { tpId, tpLogo, tpName } = provider
            if(tpId === maxGame || tpId === keno ||tpId === lottery ||tpId === tableGame )
              return null;
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
          {
            // hard code vendor MaxGame,RNG Keno, Lottery, Table Game
            providerData.findIndex(x => x.tpId === maxGame || x.tpId === keno || x.tpId === lottery || x.tpId === tableGame) !== -1 &&
              <div className='embla__slide provider-item' key={0}>
                  <Img
                    className='img'
                    src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/provider/dark/sabaplus-maxplay.webp`}
                    loader={<LoadingIcon />}
                    unloader={<NoGameIcon />}
                    alt="Max play"
                  />
              </div>
          }
          {providerComingSoon.map(provider => {
						const { tpId, tpLogo, tpName } = provider
            if(tpId === maxGame || tpId === keno ||tpId === lottery ||tpId === tableGame )
              return null;
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
		</ProviderGroup>
	)
}

export default ProvidersList
