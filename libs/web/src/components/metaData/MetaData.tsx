import React from 'react'
import Head from 'next/head'

export interface IMetaDataProps {
	title: string
}

const MetaData = ({ title }: IMetaDataProps) => {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	)
}

export { MetaData }
