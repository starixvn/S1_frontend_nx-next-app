import { useAuth } from '@nx-next-app/data-access'
import { useGetNewsListQuery } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router' // 导入 useRouter
import { useState } from 'react'

const NewsList = () => {
	const { t, i18n } = useTranslation()
	const router = useRouter() // 使用 useRouter
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const [pageNumber] = useState(1)
	const [pageSize] = useState(10)

	const {
		data: { data: newsList = [] } = {},
		error,
		isLoading,
	} = useGetNewsListQuery({
		langId,
		currencyId,
		pageNumber,
		pageSize,
	})

	const showNews = newsList?.map(item => {
		const formattedDate = dayjs(item.postTime).format('YYYY.MM.DD')

		const handleDetailsClick = () => {
			router.push(`/${i18n.language}/news-info/${item.newsId}`)
		}

		return (
			<div key={`news-${item.newsId}`}>
				<img src={item.imageURL} alt={item.title} />
				<h2 className='time'>{formattedDate}</h2>
				<div className='title'>{item.title}</div>
				<div className='btnGroup'>
					<button className='secondary' onClick={handleDetailsClick}>
						{t('Details')}
					</button>
				</div>
			</div>
		)
	})

	if (isLoading) {
		return <div>{t('Label_Loading')}</div>
	}

	if (error) {
		return <div>{t('msg_ApiServerError')}</div>
	}

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-newspaper'>{t('Label_NewsList')}</span>
				</div>
				{!isEmpty(newsList) ? (
					<div className='newsList'>{showNews}</div>
				) : (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default NewsList
