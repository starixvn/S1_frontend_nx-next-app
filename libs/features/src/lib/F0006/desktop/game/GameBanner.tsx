import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/game`

const GameBanner = () => {
	const { t } = useTranslation()

	return (
		<div className='mainBanner'>
			<Image
				alt='fishmainbanner'
				height={500}
				width={1920}
				src={`${baseUrl}/games_mainbanner_bg.jpg`}
			/>

			<div className='bannerInfo'>
				<div className='text'>
					<div>{t('Label_Banner_Game_SubTitle')}</div>
					<div>{t('Label_Banner_Game_Title_1')}</div>
					<div>{t('Label_Banner_Game_Title_2')}</div>
				</div>

				<div className='animation'>
					<Image
						className='card'
						width={317}
						height={345}
						src={`${baseUrl}/animation_img/card.png`}
						alt='banner-card'
					/>
					<Image
						className='dice1'
						width={214}
						height={217}
						src={`${baseUrl}/animation_img/dice1.png`}
						alt='banner-dice1'
					/>
					<Image
						className='dice2'
						width={126}
						height={133}
						src={`${baseUrl}/animation_img/dice2.png`}
						alt='banner-dice2'
					/>
				</div>
			</div>
		</div>
	)
}

export default GameBanner
