import React from 'react'
import { find } from 'lodash-es'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { paths } from '@nx-next-app/constants'
import type { IFooterData } from '@nx-next-app/types'
import { Header } from '@nx-next-app/components/H0006'

const GameProvider = ({
	platformList = [],
}: {
	platformList: IFooterData['platformList']
}) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { menuList, onMenuOpen } = useMenu()
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
				<Header.Tag title={t('Label_General_GameProvider') as string} />
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
