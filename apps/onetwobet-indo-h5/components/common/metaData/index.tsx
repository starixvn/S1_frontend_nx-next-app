import { useGlobalData } from '@nx-next-app/data-access'
import { useMetaData } from '@nx-next-app/hooks'
import { ISEOData } from 'libs/web/src/data-access/type'
import { uniqueId } from 'lodash'
import Head from 'next/head'

const MetaData = ({ persistSEOData }: { persistSEOData: ISEOData }) => {
	const {
		title,
		description,
		keyword,
		links = [],
	} = useMetaData(persistSEOData)
	const { getBannerUrl } = useGlobalData()

	return (
		<Head>
			<title>{title}</title>

			<link rel='icon' href={getBannerUrl('/h5/img/favicon.ico')} />

			{links.map(attribute => (
				<link key={uniqueId()} {...attribute} />
			))}

			<meta name='description' content={description} />
			<meta name='keyword' content={keyword} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:domain' content={getBannerUrl('')} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta
				name='twitter:image'
				content={getBannerUrl('/img/thumbnail/thumbnail_001.jpg')}
			/>
			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta
				property='og:image'
				content={getBannerUrl('/img/thumbnail/thumbnail_001.jpg')}
			/>
		</Head>
	)
}

export default MetaData
