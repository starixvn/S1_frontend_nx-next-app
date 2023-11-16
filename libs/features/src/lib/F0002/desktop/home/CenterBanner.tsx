import QRCode from 'qrcode.react'
import Image from 'next/future/image'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useDownloadLinks } from '@nx-next-app/features/F0002/hooks/useDownloadLinks'

const CenterBanner = () => {
	const { BANNER_IMAGE_LIST } = useStaticData()
	const { androidDownLoadUrl, iosDownloadUrl } = useDownloadLinks()
	const {
		userInfo: { langId },
	} = useAuth()

	const imgUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${
		BANNER_IMAGE_LIST[langId] ??
		BANNER_IMAGE_LIST[`${process.env['NEXT_PUBLIC_DEFAULT_LANG']}`]
	}`

	return (
		<div className='indexCenterBanner'>
			<div className='qrGroup'>
				{iosDownloadUrl && (
					<div className='qrCode'>
						<QRCode
							value={iosDownloadUrl}
							renderAs='svg'
							size={152}
							includeMargin
						/>
					</div>
				)}
				{androidDownLoadUrl && (
					<div className='qrCode'>
						<QRCode
							value={androidDownLoadUrl}
							renderAs='svg'
							size={152}
							includeMargin
						/>
					</div>
				)}
			</div>
			<Image src={imgUrl} alt='IndexCenterBanner' width={1400} height={500} />
		</div>
	)
}

export { CenterBanner }
