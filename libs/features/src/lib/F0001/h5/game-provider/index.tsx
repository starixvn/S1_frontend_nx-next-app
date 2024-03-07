import React from 'react'
import { find } from 'lodash-es'
import Image from 'next/future/image'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { Header } from '@nx-next-app/components/H0001'
import type { IFooterData } from '@nx-next-app/types'
import dynamic from 'next/dynamic'

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
								<Image
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/venderlogo/${imgName}.png`}
									alt={imgName}
									width={80}
									height={55}
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
