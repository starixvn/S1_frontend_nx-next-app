import { useTranslation } from 'next-i18next'
import QRCode from 'qrcode.react'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const ReferralQRModal = ({
	refLink,
	referralCode,
}: {
	refLink: string
	referralCode: string
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	const canvas = document.getElementById('refQRcode')
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const imgUrl = canvas?.toDataURL('image/png', 'image/octet-stream')

	return (
		<div className='pop'>
			<div className='popTit'>
				<div className='icon icon-close' onClick={closeModal} />
				{`${t('Label_Referral_ReferralCode')}: ${referralCode}`}
			</div>
			<QRCode id='refQRcode' value={refLink} style={{ display: 'none' }} />
			<div className='popTxt'>
				<img src={imgUrl} alt={referralCode} />
			</div>
		</div>
	)
}

const ReferralModal = ({ referralCode }: { referralCode: string }) => {
	const { t } = useTranslation()
	const { userInfo } = useAuth()
	const { modal, closeModal } = useGlobalModal()

	const currentLocation = window !== undefined ? window.location.origin : ''

	const refLink = `${currentLocation}/${userInfo.langId}/${paths.join.root}?AffId=${referralCode}`

	const copyText = () => {
		const virtualInput = document.createElement('input')
		virtualInput.value = `${t('Label_Referral_Welcome')} ${refLink}`
		document.body.appendChild(virtualInput)
		virtualInput.select()
		document.execCommand('copy')
		document.body.removeChild(virtualInput)
	}

	const clickQRCode = () => {
		modal.open(
			<ReferralQRModal referralCode={referralCode} refLink={refLink} />
		)
	}

	return (
		<div className='pop'>
			<div className='popTit'>
				<div className='icon icon-close' onClick={closeModal} />
				{t('Label_General_ReferFriends')}
			</div>
			<div className='popTxt'>
				<div>{t('Label_Referral_YourLinkInvite')}</div>
				<div>
					<button>
						<i className='icon icon-files-empty' onClick={copyText} />
					</button>
					<button onClick={clickQRCode}>
						<i className='icon icon-qrcode' />
						<QRCode
							id='refQRcode'
							value={refLink}
							style={{ display: 'none' }}
						/>
					</button>
					<a
						target='_blank'
						rel='noreferrer'
						href={`https://www.facebook.com/sharer/sharer.php?u=${refLink}&quote=${t(
							'Label_Referral_Welcome'
						)}`}
					>
						<i className='icon icon-facebook' />
					</a>
					<a
						target='_blank'
						rel='noreferrer'
						href={`https://wa.me/?text=${t(
							'Label_Referral_Welcome'
						)} ${refLink}`}
					>
						<i className='icon icon-whatsapp' />
					</a>
					<a
						target='_blank'
						rel='noreferrer'
						href={`http://line.naver.jp/R/msg/text/?${t(
							'Label_Referral_Welcome'
						)}%0D%0A${refLink}`}
					>
						<i className='icon icon-line' />
					</a>
					<a
						target='_blank'
						rel='noreferrer'
						href={`https://t.me/share/url?url=${refLink}&text=${t(
							'Label_Referral_Welcome'
						)}`}
					>
						<i className='icon icon-telegram' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default ReferralModal
