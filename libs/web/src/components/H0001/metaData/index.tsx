import { ISEOData } from 'libs/web/src/data-access/type'
import { useMetaData } from '@nx-next-app/hooks'
import { uniqueId } from 'lodash'
import Head from 'next/head'

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
				href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/favicon.ico`}
			/>

			{links.map(attribute => (
				<link key={uniqueId()} {...attribute} />
			))}

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
				content={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/thumbnail/thumbnail_001.jpg`}
			/>
		</Head>
	)
}

export default MetaData
