import { Form } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { usePromotion } from '@nx-next-app/features/F0001/providers'
import { PromotionFilterEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const PromotionFilter = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
	} = useAuth()
	const { modal, closeModal } = useGlobalModal()
	const {
		PROMOTION_SELECT_OPTIONS,
		promotionForm,
		activeFilterType,
		onChangeActiveFilterType,
		onSetSpecialCode,
	} = usePromotion()
	return (
		<>
			<div className='promosSelect'>
				<div className='btnGroup promoType'>
					{PROMOTION_SELECT_OPTIONS.map(option => {
						if (option.needLogin && !isLogin) {
							return null
						}

						return (
							<button
								key={option.value}
								className={classNames({
									'icon icon-icon32px_ALL':
										option.value === PromotionFilterEnum.All,
									blue: activeFilterType === option.value,
									blueBorder: activeFilterType !== option.value,
								})}
								onClick={() => onChangeActiveFilterType(option.value)}
							>
								{/* 從upperCase改為toUpper，詳解請見：README/language.md */}
								{toUpper(t(option.displayKey) || '')}
							</button>
						)
					})}
				</div>
			</div>

			{isLogin && activeFilterType === PromotionFilterEnum.PromoCode && (
				<div className='specialBonus'>
					<Form
						onSubmit={promotionForm.handleSubmit(() => {
							const { specialCode } = promotionForm.getValues()
							onSetSpecialCode({
								specialCode,
								messageCallBack(message) {
									modal.info(message, { onOK: () => closeModal() })
								},
							})
						})}
					>
						<div className='inputBox-white'>
							<input {...promotionForm.register('specialCode')} required />
						</div>
						<div className='btnGroup'>
							<button className='btn-check'>{t('Label_General_Submit')}</button>
						</div>
					</Form>
				</div>
			)}
		</>
	)
}

export default PromotionFilter
