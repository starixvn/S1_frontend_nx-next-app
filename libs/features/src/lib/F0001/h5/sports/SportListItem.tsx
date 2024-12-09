import { switchLobbyIcon } from "@nx-next-app/components/D0001/game-list-item";
import { useAuth } from "@nx-next-app/data-access";
import { GameIconContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { IDynamicSubMenuItem } from "@nx-next-app/types";
import { isEventPeriod } from "@nx-next-app/utils";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

interface IListItemProps {
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

const SportListItem = ({ subMenuItem, onItemClick }: IListItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[langId] &&
		subMenuItem?.currencyGameName[langId]

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0]

	const { iconType, iconStartTime, iconEndTime, isTpMaintain } =
		subMenuItem || {}

	const sportLobbyIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			switchLobbyIcon(iconType)) ||
		null

	return (
		<GameIconContainer
			className={classNames({
				under: isTpMaintain,
			})}
		>
			{isTpMaintain && (
				<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			)}

			<div className='img-wrapper' onClick={() => onItemClick(subMenuItem)}>
				<img src={suBMenuLobbyImage} alt={subMenuItem?.gameName} />
			</div>

			<div className='details'>
				<div className='providerName'>
					{displayName || subMenuItem?.gameName}
				</div>
				{sportLobbyIcon}
			</div>
		</GameIconContainer>
	)
}

export default SportListItem
