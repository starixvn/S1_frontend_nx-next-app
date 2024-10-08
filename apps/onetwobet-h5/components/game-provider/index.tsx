import { Header } from '@12b-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import type { IFooterData } from '@nx-next-app/types'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const LiveStreamingModalH5 = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const GameProvider = ({
	platformList = [],
}: {
	platformList: IFooterData['platformList']
}) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { menuList, onMenuOpen } = useMenu()
	const { push } = useRouter()
	const { getBannerUrl } = useGlobalData()
	const showPlatFormList = menuList.flatMap(mainMenuItem => {
		const { subMenu } = mainMenuItem || {}

		return subMenu?.flatMap(subMenuItem => {
			const defPlatformList = find(platformList, {
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

	return (
		<>
			<Header className='header'>
				<Header.Tag
					back={paths.home.root}
					title={t('Label_General_GameProvider') as string}
				/>
			</Header>
			<main className='main provider'>
				{showPlatFormList.map(prodictItem => {
					const { imgName, tpGameIdNo } = prodictItem || {}
					return (
						imgName && (
							<button
								key={tpGameIdNo}
								onClick={() =>
									onMenuOpen(prodictItem, {
										loginCallback: () => {
											push(paths.login.root)
										},
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalH5 />),
									})
								}
							>
								<img
									src={getBannerUrl(`/h5/img/venderlogo/${imgName}.png`)}
									alt={imgName}
								/>
							</button>
						)
					)
				})}
			</main>
		</>
	)
}

export default GameProvider
