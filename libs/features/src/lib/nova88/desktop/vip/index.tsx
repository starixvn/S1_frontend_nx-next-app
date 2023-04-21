import React from 'react'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Vip = ({ initialVipList = [] }: { initialVipList: any[] }) => {
	const { t } = useTranslation()
	return (
		<div>
			<h1>{t('Label_Title')}</h1>
		</div>
	)
}

export { Vip }
