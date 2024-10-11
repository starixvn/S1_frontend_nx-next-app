import { paths } from '@nx-next-app/constants'
import { INewsDetailData } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const NewsContents = ({
	persistNewsDetail,
}: {
	persistNewsDetail: INewsDetailData
}) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { imageURL = '', title = '', content = '' } = persistNewsDetail ?? {}
	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_bank-account'>
						{t('Label_General_News')}
					</span>
				</div>

				<button
					className='btn-check icon icon-arrow-left2 secondary'
					onClick={() => push(paths.newsList.root)}
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
	)
}

export default NewsContents
