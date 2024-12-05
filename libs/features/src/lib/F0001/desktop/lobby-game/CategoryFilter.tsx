import { CategoryFilterTabs } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useLobby()
	const { t } = useTranslation()

	return (
		<CategoryFilterTabs>
			{categoryKeys?.map(value => {
				return (
					<div
						key={`casino-nav-${value}`}
						className={classNames('tab-item', {
							active: activeCategoryKey === value,
						})}
						onClick={() => onCategoryChange(value)}
					>
						{t(
							`Label_General_${value.charAt(0).toUpperCase() + value.slice(1)}`
						)}
					</div>
				)
			})}
		</CategoryFilterTabs>
	)
}

export default CategoryFilter
