import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'

const baseUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/lottery`

const LotteryBanner = () => {
	const { t } = useTranslation()

	return (
		<div className='mainBanner'>
			<Image
				alt='fishmainbanner'
				height={500}
				width={1920}
				src={`${baseUrl}/lottery_mainbanner_bg.jpg`}
			/>

			<div className='bannerInfo'>
				<div className='text'>
					<div>{t('Label_Lottery_Game_SubTitle')}</div>
					<div>{t('Label_Lottery_Game_Title_1')}</div>
					<div>{t('Label_Lottery_Game_Title_2')}</div>
				</div>

				<div className='animation'>
					<Image
						className='ball'
						width={292}
						height={336}
						src={`${baseUrl}/animation_img/ball_nova.png`}
						alt='banner-ball'
					/>
					<Image
						className='ball1 img_g'
						width={230}
						height={232}
						src={`${baseUrl}/animation_img/ball_g.png`}
						alt='banner-ball'
					/>
					<Image
						className='ball2 img_i'
						width={250}
						height={250}
						src={`${baseUrl}/animation_img/ball_i.png`}
						alt='banner-ball2'
					/>
				</div>
			</div>
		</div>
	)
}

export default LotteryBanner
