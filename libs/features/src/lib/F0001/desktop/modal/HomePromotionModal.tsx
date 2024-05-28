import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'

const HomePromotionModal = ({
	bonusCode,
	closeCallback = () => null,
}: {
	bonusCode: string
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const { push } = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()
	return (
		<div className='pop promosbackpopup'>
			<div className='promosback active'>
				<div className='promosback-pop'>
					<img
						src={`${
							process.env['NEXT_PUBLIC_BANNER_HOST']
						}/desktop/img/promosBackPopup/promosPopup-${langId || 'en'}.png`}
						alt='img-promosPopup'
					/>
					{/* 
					<button
						className='popgo'
						onClick={() => {
							push(`${paths.promotion.root}?BonusCode=${bonusCode}`)
							closeModal()
						}}
					>
						{t('Label_Promotion_ClaimNow')}
					</button> */}

					<button
						className='popgo'
						onClick={() => {
							push(`${paths.retention.root}`)
							closeModal()
						}}
					>
						{t('Label_Promotion_ClaimNow')}
					</button>

					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/promosBackPopup/delet.png`}
						alt='img-delet'
						className='closepop'
						onClick={() => {
							closeModal()
							closeCallback()
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default HomePromotionModal
