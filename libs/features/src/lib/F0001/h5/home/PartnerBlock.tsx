/* eslint-disable react/self-closing-comp */ // < 設計使用空 div 來製作線會報錯
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'

const PartnerBlock = () => {
	const { t } = useTranslation()
	// 線上版本的球隊本來就沒用 i18n 翻譯

	const {
		userInfo: { currencyId },
	} = useAuth()

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	return (
		<>
			<div className='home-partner-title'>
				{t('Label_Home_OurOfficialPartnerOf')}
			</div>

			{/* 僅有巴西沒有 Aston Villa 贊助球隊 */}
			{!isBRL ? (
				<div className='home-partner sponsor'>
					<div className='home-partner-content'>
						<a
							href='https://www.avfc.co.uk/news/2024/august/16/aston-villa-confirm-nova88-as-official-asian-betting-partner/'
							target='_blank'
							rel='noreferrer'
						>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/sp-aston-villa.png`}
								alt='Aston Villa'
							/>
						</a>
						<div>
							<div>Aston Villa</div>
							<div>{t('Label_Home_OfficialAsianBettingPartner')}</div>
							<div>2024-2025</div>
						</div>
					</div>
				</div>
			) : null}

			{!isBRL ? <div className='home-partner-line'></div> : null}

			<div className='home-partner'>
				<div className='home-partner-content'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/sp-sevilla.png`}
						alt='Sevilla FC'
					/>
					<div>
						<div>Sevilla FC</div>
						<div>2023-2024</div>
					</div>
				</div>
				<div className='home-partner-content'>
					<a
						href='https://www.inter.it/en/news/inter-nova88-official-regional-partner-asia'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/sp-inter-milan.png`}
							alt='Inter Milan'
						/>
					</a>
					<div>
						<div>Inter Milan</div>
						<div>2023-2024</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PartnerBlock
