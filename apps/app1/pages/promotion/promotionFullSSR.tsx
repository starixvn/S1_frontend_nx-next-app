/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next'
import React from 'react'
import { getPromotionListV3 } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Nova88 } from '@nx-next-app/features'

const { PromotionFullSSR } = Nova88.Desktop

// import { PromotionSSR } from '@nx-next-app/features/nova88/desktop'

interface IPromotionProps {
	initialPromotionList: unknown[]
	defaultCurrencyId: number
	defaultDeviceType: number
}

const PromotionSSRPage = ({
	initialPromotionList = [],
	defaultDeviceType,
	defaultCurrencyId,
}: IPromotionProps) => (
	<PromotionFullSSR
		initialPromotionList={initialPromotionList}
		defaultCurrencyId={defaultCurrencyId}
		defaultDeviceType={defaultDeviceType}
	/>
)

export default PromotionSSRPage

export const getServerSideProps: GetServerSideProps = async context => {
	const { query, locale } = context
	// default
	let currencyId = 2
	let deviceType = 1
	// query
	const { currencyId: queryCurrencyId = 2, deviceType: queryDeviceType = 1 } =
		query
	// cookies 處理示意，可透過 cookies 存取 request 控制 currencyId 或 deviceType 資訊
	// const { currencyId: cookieCurrencyId, deviceType: cookieDeviceType } =
	// 	req.cookies
	// const hasCookie = !!cookieCurrencyId && !!cookieDeviceType

	// 根據 query 記憶幣別與 deviceType
	if (query) {
		currencyId = Number(queryCurrencyId)
		deviceType = Number(queryDeviceType)
	}
	// } else if (hasCookie) {
	// 	currencyId = Number(cookieCurrencyId)
	// 	deviceType = Number(cookieDeviceType)
	// }

	const { data: { data: initialPromotionList = [] } = {} } =
		await getPromotionListV3({
			locale,
			currencyId,
			deviceType,
		})

	return {
		props: {
			initialPromotionList,
			// 傳遞初始值供 Client side 渲染
			defaultCurrencyId: currencyId,
			defaultDeviceType: deviceType,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
