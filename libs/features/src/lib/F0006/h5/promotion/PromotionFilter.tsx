import { useTranslation } from 'next-i18next'
import { Header, TagOptionType } from '@nx-next-app/components/H0006'
import { PromotionFilterEnum } from '@nx-next-app/types'
import { usePromotion } from '@nx-next-app/features/F0006/providers'
import { paths } from '@nx-next-app/constants'

const PromotionFilter = () => {
	const { t } = useTranslation()
	const { PROMOTION_SELECT_OPTIONS, onChangeActiveFilterType } = usePromotion()

	// * mapping 成 Header.Tag 所需的格式
	const quickSelect: TagOptionType[] = PROMOTION_SELECT_OPTIONS.map(item => ({
		key: item.value,
		label: t(item.displayKey).toUpperCase(),
	}))

	return (
		<Header.Tag
			back={paths.home.root}
			title={t('Label_General_Promotion') as string}
			quickSelect={quickSelect}
			onQuickSelectChange={key =>
				onChangeActiveFilterType(key as PromotionFilterEnum)
			}
		/>
	)
}

export default PromotionFilter
