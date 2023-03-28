import React from 'react'
import { baseAxios, siteApiUrl } from '@nx-next-app/api'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

interface IPromotionSSG {
	promotionList: { description: string; banner: string; bonusCode: string }[]
}

const promotionSSG = ({ promotionList = [] }: IPromotionSSG) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>Nova88 Promotion | Trusted Live Casino | Welcome Bonus</title>
				<meta
					name='description'
					content="Looking For The Best Live Casino Bonuses and Rewards? Don't Miss Out Our Monthly Exclusive Promotions! Play And Earn More Bonus With Nova88 now!"
					key='Online Casino Promotion, Welcome Bonus, Reload Bonus, Cash Rebate, Weekly Cashback, Withdrawal Bonus, Referral Rewards, Birthday Reward, New Member Promotion, Sportsbook Promotion, Casino Promotion, Slot Promotion'
				/>
			</Head>

			<div>
				{t('Label_Title')}

				{promotionList.map(item => {
					return <div key={item.bonusCode}>{item.bonusCode}</div>
				})}
			</div>
		</>
	)
}

export default promotionSSG

const CURRENCY_ID_BY_LANG_ID: {
	[langId: string]: number
} = {
	en: 2,
	cs: 2,
	th: 4,
}

// * 數據來自於 CMS 且頁面需用於 SEO
// * getStaticProps在服務器端 build time 時調用。它不會在客戶端調用。
export const getStaticProps: GetStaticProps = async context => {
	const currencyId =
		CURRENCY_ID_BY_LANG_ID[context.locale] ?? CURRENCY_ID_BY_LANG_ID.en

	const { data: { data: promotionList = [] } = {} } = await baseAxios.post(
		`${siteApiUrl.getPromotionListV3}/${context.locale ?? 'en'}`,
		{
			currencyId,
			deviceType: 1,
		}
	)

	return {
		props: {
			promotionList,
			...(await serverSideTranslations(context.locale ?? 'en')),
		},
		revalidate: 600,
	}
}
