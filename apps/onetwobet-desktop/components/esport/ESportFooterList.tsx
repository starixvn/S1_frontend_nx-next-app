import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import {
	IDynamicSubMenuItem,
	MenuIconTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import { find } from 'lodash-es'
import { Translation, useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Img } from '../common'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModal = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const ESportFooterList = () => {
	const { getBannerUrl } = useGlobalData()
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

	const lobbyIconEnum: { [p: number]: ReactNode | null } = {
		[MenuIconTypeEnum.NO_ICON]: null,
		[MenuIconTypeEnum.New]: (
			<Translation>
				{t => <div className='new-icon'>{t('Label_General_New')}</div>}
			</Translation>
		),
	}

	const onItemClick = (item: IDynamicSubMenuItem | undefined) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModal />),
		})
	}
	const { iconType, iconStartTime, iconEndTime } = eSportSabaItem || {}

	const eSportSabaIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			lobbyIconEnum[iconType]) ||
		null

	if (!eSportSabaItem) {
		return null
	}

	return (
		<div className='esports-game-list'>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>
						{t('Label_General_UnderMaintenance')}
					</div>
				)}
				{eSportSabaIcon}
				<Img
					onClick={() => onItemClick(eSportSabaItem)}
					src={getBannerUrl('/desktop/img/4.0/lobby-esports/lol.png')}
					alt='lol'
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Img
					onClick={() => onItemClick(eSportSabaItem)}
					src={getBannerUrl('/desktop/img/4.0/lobby-esports/king.png')}
					alt='king'
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Img
					onClick={() => onItemClick(eSportSabaItem)}
					src={getBannerUrl('/desktop/img/4.0/lobby-esports/cs.png')}
					alt='cs'
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isTpMaintain })}>
				{eSportSabaItem?.isTpMaintain && (
					<div className='under-text'>{t('lbl_underMaintenance')}</div>
				)}
				{eSportSabaIcon}
				<Img
					onClick={() => onItemClick(eSportSabaItem)}
					src={getBannerUrl('/desktop/img/4.0/lobby-esports/dota.png')}
					alt='dota'
				/>
			</a>
		</div>
	)
}

export default ESportFooterList
