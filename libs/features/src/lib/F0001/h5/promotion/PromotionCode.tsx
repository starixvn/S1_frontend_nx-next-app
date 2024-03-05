import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { Form } from '@nx-next-app/components/H0001'
import { usePromotion } from '@nx-next-app/features/F0001/providers'
import { PromotionFilterEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

const PromotionCode = () => {
	const { t } = useTranslation()
	const { promotionForm, activeFilterType, onSetSpecialCode } = usePromotion()
	const { modal, closeModal } = useGlobalModal()

	if (activeFilterType !== PromotionFilterEnum.PromoCode) return null

	return (
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
			<div className='infoModule parts'>
				<div className='inputBox'>
					<input {...promotionForm.register('specialCode')} />
				</div>
				<div className='btn-group'>
					<button>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</Form>
	)
}

export default PromotionCode
