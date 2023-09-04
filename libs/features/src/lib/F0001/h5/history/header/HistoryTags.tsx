import React from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useAuth } from '@nx-next-app/data-access'

const HistoryTags = () => {
	const { HEADER_TAGS } = useHistory()
	const { t } = useTranslation()
	const { pathname } = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()

	return (
		<div className='headerTag'>
			{HEADER_TAGS?.map(({ displayKey, pathName: tagPathName }) => (
				<a
					className={classNames({ active: pathname === `/${tagPathName}` })}
					href={`/${langId}/${tagPathName}`}
				>
					{t(displayKey)}
				</a>
			))}
		</div>
	)
}

export default HistoryTags
