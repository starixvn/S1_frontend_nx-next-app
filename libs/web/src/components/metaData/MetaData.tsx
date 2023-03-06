import React from 'react'
import Head from 'next/head'

const MetaData = () => {
	return (
		<div>
			<Head>
				<meta
					name='description'
					content='seo content from api'
					key='seo key from api'
				/>
			</Head>
		</div>
	)
}

export { MetaData }
