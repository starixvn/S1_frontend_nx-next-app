/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next'
import React from 'react'
import { getPromotionListV3 } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Nova88 } from '@nx-next-app/features'

const { PromotionSSRWithHydrate } = Nova88.Desktop

// import { PromotionSSR } from '@nx-next-app/features/nova88/desktop'

interface IPromotionProps {
	initialPromotionList: unknown[]
}

const PromotionSSRPage = ({ initialPromotionList = [] }: IPromotionProps) => (
	<PromotionSSRWithHydrate initialPromotionList={initialPromotionList} />
)

export default PromotionSSRPage

export const getServerSideProps: GetServerSideProps = async context => {
	const { query: { currencyId = 2, deviceType = 1 } = {} } = context
	const { data: { data: initialPromotionList = [] } = {} } =
		await getPromotionListV3({
			locale: context.locale,
			currencyId,
			deviceType,
		})

	return {
		props: {
			initialPromotionList,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
