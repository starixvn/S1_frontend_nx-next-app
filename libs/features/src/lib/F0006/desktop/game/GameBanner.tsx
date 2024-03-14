import { useTranslation } from 'next-i18next'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/game`

const GameBanner = () => {
	const { t } = useTranslation()

	return (
		<div className='mainBanner'>
			<img alt='fishmainbanner' src={`${baseUrl}/games_mainbanner_bg.jpg`} />

			<div className='bannerInfo'>
				<div className='text'>
					<div>{t('Label_Banner_Game_SubTitle')}</div>
					<div>{t('Label_Banner_Game_Title_1')}</div>
					<div>{t('Label_Banner_Game_Title_2')}</div>
				</div>

				<div className='animation'>
					<img
						className='card'
						src={`${baseUrl}/animation_img/card.png`}
						alt='banner-card'
					/>
					<img
						className='dice1'
						src={`${baseUrl}/animation_img/dice1.png`}
						alt='banner-dice1'
					/>
					<img
						className='dice2'
						src={`${baseUrl}/animation_img/dice2.png`}
						alt='banner-dice2'
					/>
				</div>
			</div>
		</div>
	)
}

export default GameBanner
