import { footerImgName } from 'libs/features/src/lib/F0001/types'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { IFooterData } from 'libs/web/src/app/types/footer'

interface ISfpProps {
	suggestedBrowser: IFooterData['suggestedBrowser']
	paymentMethodsByCurrencyId: IFooterData['paymentMethodsByCurrencyId']
	socialChannelList: {
		id: number
		channelName: string
		title: string
		link: string
		linkType: number
		scheme: {
			ios: string
			android: string
		}
	}[]
}

const Sfp = ({
	suggestedBrowser,
	paymentMethodsByCurrencyId,
	socialChannelList,
}: ISfpProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const paymentMethods = paymentMethodsByCurrencyId[currencyId]

	return (
		<div className='sfp'>
			{!!socialChannelList && (
				<div>
					<div className='title'>{t('Label_Follow_Us')}</div>
					<div>
						{socialChannelList.map(({ link, channelName, title }) => (
							<a key={channelName} href={link} target='_blank' rel='noreferrer'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${footerImgName[channelName]}`}
									alt={title}
									style={{ height: 30, width: 30 }}
								/>
							</a>
						))}
					</div>
				</div>
			)}

			{!!suggestedBrowser && (
				<div>
					<div className='title'>{t('Label_Suggested_Browser')}</div>
					<div>
						{suggestedBrowser.map(({ imageSrc, alt }) => {
							return <img key={alt} src={imageSrc} alt={alt} />
						})}
					</div>
				</div>
			)}

			{!!paymentMethods && (
				<div>
					<div className='title'>{t('Label_Payment_Method')}</div>
					<div className='paymentLogo'>
						{paymentMethods.map(({ name, img }) => (
							<a role='link' aria-hidden key={name}>
								<img src={img} alt={name} />
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Sfp
