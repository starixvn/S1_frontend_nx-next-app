import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import { PromotionTypeEnum } from '@nx-next-app/types'

const HomePromotionModal = ({
	bonusCode,
	closeCallback = () => null,
}: {
	bonusCode: string
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { push } = useRouter()

	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery(
		{
			currencyId,
			langId,
			bonusCode,
		},
		{
			skip: !bonusCode,
		}
	)

	const { promotionType = null } = promotionDetail ?? {}

	return (
		<div className='pop promosbackpop'>
			<img
				src={`${
					process.env['NEXT_PUBLIC_BANNER_HOST']
				}/h5/img/promosBackPopup/promosPopup-${langId || 'en'}.png`}
				alt='img-promosPopup'
			/>
			{promotionType === PromotionTypeEnum.RetentionFreeBet ? (
				<button
					className='popgo'
					onClick={() => {
						push(`${paths.retention.root}`)
						closeModal()
					}}
				>
					{t('Label_Promotion_ClaimNow')}
				</button>
			) : (
				<button
					className='popgo'
					onClick={() => {
						push(`${paths.promotion.root}?BonusCode=${bonusCode}`)
						closeModal()
					}}
				>
					{t('Label_Promotion_ClaimNow')}
				</button>
			)}
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
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/promosBackPopup/delet.png`}
				alt='img-delet'
				className='closepop'
				onClick={() => {
					closeModal()
					closeCallback()
				}}
			/>
		</div>
	)
}

export default HomePromotionModal
