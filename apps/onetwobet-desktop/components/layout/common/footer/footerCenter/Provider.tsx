import { useGlobalData } from '@nx-next-app/data-access'
import { gameProviders } from '@nx-next-app/site/onetwobet'
import { useTranslation } from 'next-i18next'

const Provider = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	return (
		<>
			<div className='footer-center-title'>
				{t('Label_General_GameProvider')}
			</div>
			<ul>
				{gameProviders.map(({ imgUrl, pathname }) => (
					<li key={imgUrl}>
						<a href={pathname}>
							<img src={getBannerUrl(`/desktop/${imgUrl}`)} alt={imgUrl} />
						</a>
					</li>
				))}
			</ul>
		</>
	)
}

export default Provider
