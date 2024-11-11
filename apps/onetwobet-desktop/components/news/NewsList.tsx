import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useGetNewsListQuery } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewsList = () => {
	const { t, i18n } = useTranslation()
	const router = useRouter()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const [pageNumber, setPageNumber] = useState(1)
	const [pageSize] = useState(10)

	const {
		data: {
			data: newsList = [],
			totalPages = 1,
			pageNumber: apiPageNum = 1,
		} = {},
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
			router.push(`/${i18n.language}/${paths.newsInfo.root}/${item.newsId}`)
		}

		return (
			<div key={`news-${item.newsId}`} className='newsList-item'>
				<img src={item.imageURL} alt={item.title} />
				<div className='newsList-article'>
					<h2 className='time'>{formattedDate}</h2>
					<div className='title'>{item.title}</div>
					<div className='txt-gray'>{item.content}</div>
					<div className='btnGroup'>
						<button className='secondary' onClick={handleDetailsClick}>
							{t('Details')}
						</button>
					</div>
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

	const pagination = (
		<div className='pagination'>
			{/* next page icon logic, if user is in the 1st page, last page, or only got 1 page, the icon should be diabled */}
			<a
				href='#'
				onClick={e => {
					e.preventDefault()
					if (apiPageNum > 1) {
						setPageNumber(apiPageNum - 1)
					}
				}}
				className={apiPageNum === 1 ? 'disabled' : ''}
			>
				❮
			</a>
			{/* page numger */}
			{[...Array(totalPages)].map((_, index) => {
				const page = index + 1
				return (
					<a
						key={`page-${page}`}
						href='#'
						onClick={e => {
							e.preventDefault()
							setPageNumber(page)
						}}
						className={apiPageNum === page ? 'active' : ''}
					>
						{page}
					</a>
				)
			})}
			{/* next page icon logic, if user is in the 1st page, last page, or only got 1 page, the icon should be diabled */}
			<a
				href='#'
				onClick={e => {
					e.preventDefault()
					if (apiPageNum < totalPages) {
						setPageNumber(apiPageNum + 1)
					}
				}}
				className={apiPageNum === totalPages ? 'disabled' : ''}
			>
				❯
			</a>
		</div>
	)

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-newspaper'>{t('Label_General_News')}</span>
				</div>
				{!isEmpty(newsList) ? (
					<div className='newsList'>{showNews}</div>
				) : (
					<div className='nodata icon icon-nodata'>
						<div>{t('Label_General_NoData')}</div>
					</div>
				)}
			</div>
			{pagination}
		</div>
	)
}

export default NewsList
