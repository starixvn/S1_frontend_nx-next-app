import classNames from 'classnames'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuKeyEnum, MenuIconTypeEnum } from '@nx-next-app/types'
import { type IMergedMenuData } from '@nx-next-app/features/F0001/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'

const LiveStreamingModalH5 = dynamic(
	() => import('../../modal/LiveStreamingModal'),
	{ ssr: false }
)

interface ISubMenuProps {
	menuList: IMergedMenuData[]
	onMenuOpen: (
		item: IDynamicSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
			liveStreamingCallback,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
			liveStreamingCallback: () => void
		}
	) => void
	menuKey: keyof typeof MenuKeyEnum | undefined
}

const SubMenu = ({ menuList, onMenuOpen, menuKey }: ISubMenuProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const submenus =
		menuList?.find(({ category }) => category === menuKey)?.subMenu || []

	const renderSubMenu = (
		<div
			className={`${menuKey} active`}
			// 解決特定情況跑版，剩 3 列且最右側是空的，這裡改用 grid 來排版
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '1vw',
			}}
		>
			{submenus.map(subMenuItem => {
				const {
					tpGameIdNo,
					productName,
					iconType,
					iconStartTime,
					iconEndTime,
					isTpMaintain,
					mobileHeaderPicUrl,
				} = subMenuItem || {}

				const displayName =
					subMenuItem?.currencyGameName &&
					subMenuItem?.currencyGameName[langId] &&
					subMenuItem?.currencyGameName[langId]

				// * 後端這裡是字串格式 需做處理
				const suBMenuImage =
					mobileHeaderPicUrl && JSON.parse(mobileHeaderPicUrl)[0]

				const isNew =
					isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
					iconType === MenuIconTypeEnum.New

				return (
					<button
						key={tpGameIdNo}
						className={classNames('gamelist-item', { under: isTpMaintain })}
						// 為解決特定情況跑版，改以上層 grid gap 代替
						style={{ margin: 0 }}
						onClick={() => {
							onMenuOpen(subMenuItem, {
								loginCallback: () => {
									push(paths.login.root)
								},
								messageCallBack: message => modal.error(message),
								liveStreamingCallback: () =>
									modal.open(<LiveStreamingModalH5 />),
							})
						}}
					>
						<div className='gamelist-img'>
							{isNew && <div className='new-icon'>New</div>}
							<img src={suBMenuImage} alt={productName} />
							<div
								className='gamelist-title'
								// 為解決特定情況跑版，覆蓋原先 css 指定的寬度
								style={{ width: 'auto' }}
							>
								{displayName || productName}
							</div>
						</div>
					</button>
				)
			})}
		</div>
	)

	return <div className='home-gamelist'>{renderSubMenu}</div>
}

export default SubMenu
