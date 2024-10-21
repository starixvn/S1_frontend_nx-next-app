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

/**
 * TODO: 2024.10.16: 比照nova provider開遊戲的話用以下code
 * 
 const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{
		ssr: false,
	}
)
const LiveStreamingModalDesktop = dynamic(
	() => import('@12b-desktop/components/modal/LiveStreamingModal'),
	{ ssr: false }
)

---------
 * const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const showPlatFormList = menuList.flatMap(mainMenuItem => {
		const { subMenu } = mainMenuItem || {}

		// * 並非所有的產品都存在 platformList
		return subMenu?.flatMap(subMenuItem => {
			const defPlatformList = find(gameProviders, {
				tpGameIdNo: subMenuItem?.tpGameIdNo,
			})
			if (defPlatformList) {
				return {
					...subMenuItem,
					...defPlatformList,
				}
			}

			return []
		})
	})

	--------------

 * {showPlatFormList.map(platformItem => {
					const { imgName } = platformItem || {}
					return (
						<li>
							<button
								onClick={() =>
									onMenuOpen(platformItem, {
										loginCallback: () => modal.open(<LoginModal />),
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalDesktop />),
									})
								}
							>
								<img
									src={getBannerUrl(`/desktop/img/venderlogo/${imgName}.png`)}
									alt={imgName}
								/>
							</button>
						</li>
					)
				})}
 */
