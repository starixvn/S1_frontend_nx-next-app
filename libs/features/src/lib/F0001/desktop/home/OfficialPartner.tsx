import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import Image from 'next/future/image'

const OfficialPartner = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div>
			<div className='partner-title'>
				{t('Label_Home_OurOfficialPartnerOf')}
			</div>
			<div className='officialpartner'>
				{/* // * 第三張圖確認只有 en，上面兩張有做多語系 */}
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/sevilla-fc-${langId}.png`}
					alt='img-sevilla-fc'
					width={1254}
					height={540}
				/>
				<a
					href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia'
					target='_blank'
					rel='noreferrer'
				>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/inter-milan-${langId}.png`}
						alt='img-inter-milan'
						width={1254}
						height={540}
					/>
				</a>

				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/joe-cole.png`}
					alt='img-joe-cole'
					width={1254}
					height={540}
				/>
			</div>
		</div>
	)
}

export default OfficialPartner
