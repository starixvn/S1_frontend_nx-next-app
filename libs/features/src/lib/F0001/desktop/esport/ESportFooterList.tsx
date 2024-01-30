import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useStaticData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { MenuKeyEnum } from '@nx-next-app/types'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import { isEventPeriod } from '@nx-next-app/utils'
import { switchLobbyIcon } from '@nx-next-app/components/D0001/game-list-item'

const baseurl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-esports`

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const ESportFooterList = () => {
	const { PRODUCTS } = useStaticData()
	const { t } = useTranslation()
	const { onMenuOpen, menuList = [] } = useMenu()
	const { modal } = useGlobalModal()

	const eSportSubMenus = find(menuList, {
		category: MenuKeyEnum.ESports,
	})?.subMenu

	const eSportSabaItem = eSportSubMenus?.find(
		subMenuItem => subMenuItem.tpGameIdNo === PRODUCTS.ESportALL.tpGameIdNo
	)

	const onItemClick = (item: IDynamicSubMenuItem | undefined) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}
	if (!eSportSabaItem) return
	const { iconType, iconStartTime, iconEndTime } = eSportSabaItem || {}

	const eSportSabaIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			switchLobbyIcon(iconType)) ||
		null

	return (
		<div className='esports-game-list'>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>
						{t('Label_General_UnderMaintenance')}
					</div>
				)}
				{eSportSabaIcon}
				<Image
					onClick={() => onItemClick(eSportSabaItem)}
					src={`${baseurl}/lol.png`}
					alt='lol'
					width={400}
					height={200}
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Image
					onClick={() => onItemClick(eSportSabaItem)}
					src={`${baseurl}/king.png`}
					alt='king'
					width={400}
					height={200}
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Image
					onClick={() => onItemClick(eSportSabaItem)}
					src={`${baseurl}/cs.png`}
					alt='cs'
					width={400}
					height={200}
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Image
					onClick={() => onItemClick(eSportSabaItem)}
					src={`${baseurl}/dota.png`}
					alt='dota'
					width={400}
					height={200}
				/>
			</a>
		</div>
	)
}

export default ESportFooterList
