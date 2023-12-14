import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { Form } from '@nx-next-app/components/H0006'
import { usePromotion } from '@nx-next-app/features/F0006/providers'
import { PromotionFilterEnum } from '@nx-next-app/types'

const PromotionCode = () => {
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
					<button>Submit</button>
				</div>
			</div>
		</Form>
	)
}

export default PromotionCode
