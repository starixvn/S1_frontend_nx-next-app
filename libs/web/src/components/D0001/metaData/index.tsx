import Head from 'next/head'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { ISEOData } from 'libs/web/src/data-access/type'
import { replace, uniqueId } from 'lodash'
import { useRouter } from 'next/router'

const useMetaData = (persistSEOData: ISEOData) => {
	const { pathname } = useRouter()
	const { META_DATA } = useStaticData()

	const {
		userInfo: { langId },
	} = useAuth()

	const metaDataByLang =
		(META_DATA?.[replace(pathname, '/', '')]
			? META_DATA?.[replace(pathname, '/', '')]
			: META_DATA?.[paths.home.root])?.[langId] ?? {}

	return { ...persistSEOData, ...metaDataByLang }
}

const MetaData = ({ persistSEOData }: { persistSEOData: ISEOData }) => {
	const {
		title,
		description,
		keyword,
		links = [],
	} = useMetaData(persistSEOData)

	return (
		<Head>
			<title>{title}</title>

			<link
				rel='icon'
				href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/favicon.ico`}
			/>

			{links.map(attribute => (
				<link key={uniqueId()} {...attribute} />
			))}

			<meta name='description' content={description} />
			<meta name='keyword' content={keyword} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta
				name='twitter:url'
				content={process.env['NEXT_PUBLIC_ENV_PRODUCT_HOST']}
			/>
			<meta name='twitter:domain' content='nova88.net' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta
				name='twitter:image'
				content={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/img/thumbnail/thumbnail_001.jpg`}
			/>
			<meta
				property='og:url'
				content={process.env['NEXT_PUBLIC_ENV_PRODUCT_HOST']}
			/>
			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta
				property='oog:image'
				content={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/img/thumbnail/thumbnail_001.jpg`}
			/>
		</Head>
	)
}

export default MetaData
