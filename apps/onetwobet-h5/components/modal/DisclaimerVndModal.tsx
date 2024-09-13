import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const DisclaimerVndModal = ({
	closeCallback = () => null,
}: {
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const {
		userInfo: { langId },
	} = useAuth()
	// 只有 IP = VN 時會打開，所以判斷對象 langId 就好了
	const lang = langId === 'vn' ? 'vn' : 'en'
	return (
		<div className='pop vninfopop-inner'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/disclaimer-vnd-currency-popup-${lang}.png`}
				alt='disclaimer-vnd'
			/>
			<button
				className='popgoto'
				onClick={() => {
					closeModal()
					closeCallback()
				}}
			>
				{t('Label_Promotion_JoinNow')}
			</button>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<img
				className='closepop'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/promosBackPopup/delet.png`}
				alt='delete'
				onClick={() => {
					closeModal()
					closeCallback()
				}}
			/>
		</div>
	)
}

export default DisclaimerVndModal
