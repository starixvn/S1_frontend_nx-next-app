import React from 'react'
import { IFooterData } from '@nx-next-app/types'
import { Header } from '@nx-next-app/components/H0001'
import { useTranslation } from 'next-i18next'
import { find } from 'lodash-es'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'

const GameProvider = ({
	platformList = [],
}: {
	platformList: IFooterData['platformList']
}) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()
	const allSubMenu = Object.values(menuData).flatMap(item => item.subMenu)

	return (
		<>
			<Header className='header'>
				<Header.Tag
					back={paths.home.root}
					title={t('Label_General_GameProvider') as string}
				/>
			</Header>
			<main className='main provider'>
				{platformList.map(({ productKey, imgName }) => {
					const subMenu = find(allSubMenu, { productKey })
					if (!subMenu?.h5) return null

					const {
						h5: { menuActionType },
						pathname,
						query,
						product,
					} = subMenu

					return (
						<button
							key={productKey}
							type='button'
							className={imgName}
							style={{ width: 'auto', height: '55px' }}
							onClick={() => {
								onMenuOpen(
									{ h5: { menuActionType }, pathname, query, product },
									{
										loginCallback: () => {
											push(paths.login.root)
										},
										messageCallBack: message => modal.error(message),
									}
								)
							}}
						>
							<img
								style={{ width: 'auto', height: '55px' }}
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/venderlogo/${imgName}.png`}
								alt={`logo ${imgName}`}
							/>
						</button>
					)
				})}
			</main>
		</>
	)
}

export default GameProvider
