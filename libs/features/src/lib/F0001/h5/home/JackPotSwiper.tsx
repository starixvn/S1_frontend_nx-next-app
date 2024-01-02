import { useHome } from '@nx-next-app/features/F0001/providers'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { find } from 'lodash-es'
import { useAuth } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const config = {
	containerClass: 'jackpot-container',
	slidesPerView: 3.2,
	spaceBetween: 10,
}
const JackPotSwiper = () => {
	const { t } = useTranslation()
	const { slotGameData, handleSlotGamePlay } = useHome()
	const { jackpot = [], providerList = [] } = slotGameData ?? {}
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()

	if (jackpot.length === 0) return null

	return (
		<>
			<div className='home-title'>{t('Label_General_Jackpot')}</div>
			<div className='home-jackpot-swiper'>
				<DynamicSwiper {...config}>
					{jackpot.map(({ gameName, tpId, gameId, imgName }) => {
						const brandTpName = find(
							providerList,
							obj => obj.tpId === tpId
						)?.tpName
						const imgUrl = `${
							process.env['NEXT_PUBLIC_IMAGE_HOST']
						}/${brandTpName}/${imgName[langId] || imgName['en']}`
						return (
							<div
								key={gameId}
								onClick={() => {
									handleSlotGamePlay(
										{
											tpId,
											gameId,
										},
										{ loginCallback: () => push(paths.login.root) }
									)
								}}
							>
								<a>
									<div className='jackpot-item'>
										<img src={imgUrl} alt={gameId} />
										<span>{gameName[langId] || gameName['en']}</span>
									</div>
								</a>
							</div>
						)
					})}
				</DynamicSwiper>
			</div>
		</>
	)
}

export { JackPotSwiper }
