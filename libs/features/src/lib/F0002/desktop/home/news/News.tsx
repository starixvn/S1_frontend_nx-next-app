import { useTranslation } from 'next-i18next'
import { uniqueId } from 'lodash-es'
import { useRouter } from 'next/router'
import { isUrl } from '@nx-next-app/utils'
import { paths } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/features/F0002/providers/home-context'

const News = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { newsData = [] } = useHome()
	const handleClick = (newsId: number) => {
		push(`${paths.newsInfo.root}/${newsId}`)
	}

	return (
		<div className='newsList'>
			<div className='moduleTitle'>{t('Label_General_SportNews')}</div>
			{newsData.map(({ imageURL, postTime, title, content, newsId }, idx) => (
				<div key={uniqueId()}>
					<div className='newsModule'>
						{isUrl(imageURL) && <img src={imageURL} alt='news-img' />}

						<div>
							<div>{postTime.slice(0, 10)}</div>
							<div>{title}</div>
							<div>{content}</div>
							<div className='btnGroup'>
								<button
									className='lightblue'
									onClick={() => handleClick(newsId)}
								>
									{t('Label_General_ReadMore')}
								</button>
							</div>
						</div>
					</div>

					{idx === 0 ? <div className='newsBorder' /> : null}
				</div>
			))}
		</div>
	)
}

export { News }
