import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useMenu } from '../../hooks'
import LoginModal from '../modal/LoginModal'

const baseurl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-esports`

const ESportFooterList = () => {
	const { PRODUCTS } = useStaticData()
	const {
		userInfo: { langId },
	} = useAuth()
	const { onEnterPage } = useMenu()
	const { modal } = useGlobalModal()

	const handleClick = <T extends keyof typeof PRODUCTS>(gameKey: T) => {
		const gameInfo = PRODUCTS[gameKey]
		if (gameInfo) {
			onEnterPage(
				{
					langId,
					tpId: gameInfo.TP_ID,
					gameId: gameInfo.GAME_ID,
					tpGameType: gameInfo.TP_GAME_TYPE,
				},
				{
					loginCallback: () => modal.open(<LoginModal />),
				}
			)
		}
	}

	return (
		<div className='esports-game-list'>
			<a onClick={() => handleClick('SPORTS_E_SPORT_KOG')}>
				<img src={`${baseurl}/king.png`} alt='king' />
			</a>
			<a onClick={() => handleClick('SPORTS_E_SPORT_CSGO')}>
				<img src={`${baseurl}/cs.png`} alt='cs' />
			</a>
			<a onClick={() => handleClick('SPORTS_E_SPORT_DOTA2')}>
				<img src={`${baseurl}/dota.png`} alt='dota' />
			</a>
			<a onClick={() => handleClick('SPORTS_E_SPORT_LOL')}>
				<img src={`${baseurl}/lol.png`} alt='lol' />
			</a>
		</div>
	)
}

export default ESportFooterList
