import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'

const OfficialPartner = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	return (
		<div>
			<div className='partner-title'>
				{t('Label_Home_OurOfficialPartnerOf')}
			</div>
			<div className='officialpartner'>
				{/* 巴西沒有 Aston Villa 贊助球隊，所以用 Joe Cole 且沒有 link 連結 */}
				{isBRL ? (
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/joe-cole.png`}
						alt='Joe Cole'
					/>
				) : (
					<a
						href='https://www.avfc.co.uk/news/2024/august/16/aston-villa-confirm-nova88-as-official-asian-betting-partner/'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/aston-villa-${langId}.png`}
							alt='Aston Villa'
						/>
					</a>
				)}
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/sevilla-fc-${langId}.png`}
					alt='Sevilla FC'
				/>
				<a
					href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia'
					target='_blank'
					rel='noreferrer'
				>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/inter-milan-${langId}.png`}
						alt='Inter Milan'
					/>
				</a>
			</div>
		</div>
	)
}

export default OfficialPartner
