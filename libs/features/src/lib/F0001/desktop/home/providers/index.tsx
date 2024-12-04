import EmblaCarousel from "@nx-next-app/features/F0001/desktop/common/emblaCarousel";
import { LoadingIcon, NoGameIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { GameContainer, ProviderGroup } from "@nx-next-app/features/F0001/desktop/home/providers/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { ProviderEnum } from "@nx-next-app/types";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslation } from "next-i18next";
import { Img } from "react-image";

const ProvidersList = () => {
	const { t } = useTranslation()
	const { providerData } = useHome()

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	const providerComingSoon = [
		{
			tpId: 999,
			tpNameKey: 'SA Gaming',
			tpName: 'sagaming',
			tpLogo: 'sagaming',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1000,
			tpNameKey: 'NextSpin',
			tpName: 'next-spin',
			tpLogo: 'nextspin',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1001,
			tpNameKey: 'SpadeGaming',
			tpName: 'spade-gaming',
			tpLogo: 'spadegaming',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1002,
			tpNameKey: 'Microgaming',
			tpName: 'microgaming',
			tpLogo: 'microgaming',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1003,
			tpNameKey: 'Evolution',
			tpName: 'evolution',
			tpLogo: 'evolution',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1004,
			tpNameKey: 'Yeebet Casino',
			tpName: 'yeebet-casino',
			tpLogo: 'yeebetcasino',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
		{
			tpId: 1005,
			tpNameKey: 'WonCasino',
			tpName: 'won-casino',
			tpLogo: 'woncasino',
			gameId: '',
			gameLogo: '',
			gameName: '',
			sort: 0,
			tpCategory: 0,
			tpGameType: 0,
		},
	]

	if (providerData.length === 0) {
		return <div />
	}

	return (
		<ProviderGroup className='content-container'>
			<GroupTitle title={t('Label_Providers')} />
			<GameContainer>
				<EmblaCarousel options={gameTypeEmblaOptions} isControlButton={false}>
					{providerData.map(provider => {
						const { tpId, tpLogo, tpName } = provider
						if (
							tpId === ProviderEnum.MaxGame ||
							tpId === ProviderEnum.Keno ||
							tpId === ProviderEnum.Lottery ||
							tpId === ProviderEnum.TableGame
						)
							return null
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
						providerData.findIndex(
							x =>
								x.tpId === ProviderEnum.MaxGame ||
								x.tpId === ProviderEnum.Keno ||
								x.tpId === ProviderEnum.Lottery ||
								x.tpId === ProviderEnum.TableGame
						) !== -1 && (
							<div className='embla__slide provider-item' key={0}>
								<Img
									className='img'
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/provider/dark/sabaplus-maxplay.webp`}
									loader={<LoadingIcon />}
									// unloader={<NoGameIcon />}
									unloader={<p>sabaplus-maxplay</p>}
									alt='Max play'
								/>
							</div>
						)
					}
					{providerComingSoon.map(provider => {
						const { tpId, tpLogo, tpName } = provider
						if (
							tpId === ProviderEnum.MaxGame ||
							tpId === ProviderEnum.Keno ||
							tpId === ProviderEnum.Lottery ||
							tpId === ProviderEnum.TableGame
						)
							return null
						return (
							<div className='embla__slide provider-item' key={tpId}>
								<Img
									className='img'
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/provider/dark/${tpLogo}.webp`}
									loader={<LoadingIcon />}
									unloader={<NoGameIcon />}
									alt={tpName}
								/>
								<div className='coming-soon'>Coming Soon</div>
							</div>
						)
					})}
				</EmblaCarousel>
			</GameContainer>
		</ProviderGroup>
	)
}

export default ProvidersList
