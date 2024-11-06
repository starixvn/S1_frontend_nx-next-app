import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePromotion } from '@nx-next-app/operations'
import { PromotionFilterEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { Form } from '../../common'

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
					<input
						{...promotionForm.register('specialCode')}
						placeholder={t('Label_General_BonusCode')}
						required
					/>
				</div>
				<div className='btn-group'>
					<button className='primary'>{t('Label_General_Submit')}</button>
				</div>
			</div>
		</Form>
	)
}

export default PromotionCode
