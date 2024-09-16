import { Header, TagOptionType } from '@nx-next-app/components/H0001'
import { usePromotion } from '@nx-next-app/features/F0001/providers'
import { PromotionFilterEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

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
			back
			title={t('Label_General_Promotion') as string}
			quickSelect={quickSelect}
			onQuickSelectChange={key =>
				onChangeActiveFilterType(key as PromotionFilterEnum)
			}
		/>
	)
}

export default PromotionFilter
