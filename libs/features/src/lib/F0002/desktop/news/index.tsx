import { INewsDetailData } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'

const News = ({
	persistNewsDetail,
}: {
	persistNewsDetail: INewsDetailData
}) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { imageURL = '', title = '', content = '' } = persistNewsDetail ?? {}
	return (
		<main>
			<section className='inside'>
				<div className='rightModule'>
					<div className='infoModule'>
						<button
							className='btn-check icon icon-arrow-left2'
							onClick={() => push(paths.home.root)}
						>
							{t('Label_General_Back')}
						</button>
						<article>
							<img src={imageURL} alt={title} />
							<h1>{title}</h1>
							<pre>{content}</pre>
						</article>
					</div>
				</div>
			</section>
		</main>
	)
}

export default News
