import { useMetaData } from '@nx-next-app/hooks'
import { ISEOData } from 'libs/web/src/data-access/type'
import { uniqueId } from 'lodash-es'
import Head from 'next/head'

const MetaData = ({ persistSEOData }: { persistSEOData: ISEOData }) => {
	const {
		title,
		description,
		keyword,
		links = [],
	} = useMetaData(persistSEOData)
	console.log('persistSEOData', persistSEOData)

	return (
		<Head>
			<title>{title}</title>

			<link
				rel='icon'
				href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/favicon.ico`}
			/>

			{links.map(attribute => {
				return <link key={uniqueId()} {...attribute} />
			})}

			<meta name='description' content={description} />
			<meta name='keyword' content={keyword} />
			<meta
				property='og:url'
				content={process.env['NEXT_PUBLIC_REFERER_HOST']}
			/>
			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta
				property='og:image'
				content={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/thumbnail/thumbnail_001.jpg`}
			/>
		</Head>
	)
}

export default MetaData
