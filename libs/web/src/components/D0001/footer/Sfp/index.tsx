import React from 'react'
import Image from 'next/future/image'
import { footerImgName } from 'libs/features/src/lib/F0001/types'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { ISfpData } from 'libs/web/src/app/types/footer'
import { CurrenciesEnum } from '@nx-next-app/types'

interface ISfpProps {
	sfpData: ISfpData
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
	sfpData: { currencyPaymentList, langToCurrency },
	socialChannelList,
}: ISfpProps) => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { t } = useTranslation()

	const getCurrencyName = ({
		langId,
		currencyId,
	}: {
		langId: number | string
		currencyId: number
	}): string =>
		t(
			currencyId
				? `Currency_${currencyId}`
				: `Currency_${langToCurrency[langId]}`,
			t(`Currency_${CurrenciesEnum.MYR}`)
		)

	const paymentList =
		currencyPaymentList[
			getCurrencyName({ langId, currencyId: currencyId as number })
		] ?? currencyPaymentList['MYR']

	return (
		<div className='sfp'>
			<div>
				<div className='title'>{t('Label_Follow_Us')}</div>
				<div>
					{socialChannelList.map(({ link, channelName, title }) => (
						<a key={channelName} href={link} target='_blank' rel='noreferrer'>
							<Image
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${footerImgName[channelName]}`}
								alt={title}
								width={30}
								height={30}
							/>
						</a>
					))}
				</div>
			</div>
			<div>
				<div className='title'>{t('Label_Suggested_Browser')}</div>
				<div>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/gga.png`}
						alt='chrome'
						width={30}
						height={30}
					/>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/ffa.png`}
						alt='firefox'
						width={30}
						height={30}
					/>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/iea.png`}
						alt='edge'
						width={30}
						height={30}
					/>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/sfa.png`}
						alt='safari'
						width={30}
						height={30}
					/>
				</div>
			</div>
			<div>
				<div className='title'>{t('Label_Payment_Method')}</div>
				<div className='paymentLogo'>
					{paymentList.map(({ name, img }) => (
						<a key={name}>
							<Image src={img} alt={name} width={50} height={32} />
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default Sfp
