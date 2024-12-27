import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { IClaimAmountModalProps } from '@nx-next-app/operations'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { revertNumberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { Form, Select } from '../../common'

const ClaimAmountModal = ({
	bonusCode,
	promotionType,
	onSetClaimPromotion,
	tierAmountListSelectOptions,
}: IClaimAmountModalProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()

	const { handleSubmit, setValue } = useForm<{
		amount: string | undefined
	}>()

	const onSubmit = ({ amount }: { amount: string | undefined }) => {
		if (promotionType === PromotionTypeEnum.FirstDeposit) {
			const lockedAmount = revertNumberFormat(amount, currencyId)
			onSetClaimPromotion({
				bonusCode,
				lockedAmount: Number(lockedAmount),
			})
		} else if (amount) {
			onSetClaimPromotion({
				bonusCode,
				lockedAmount: Number(amount),
			})
		}
	}

	return (
		<div className='pop'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='popTit'>
					<div className='icon icon-close' onClick={closeModal} />
					{t('Label_General_ImportantNote')}
				</div>
				<div className='popTxt'>
					<div className='txt-lightgray text-center'>
						{t('Label_Promotion_SelectPreferAmount')}
					</div>
					<Select
						options={tierAmountListSelectOptions}
						onChange={value => {
							typeof value === 'string' && setValue('amount', value)
						}}
					/>
					<div className='btn-group'>
						<button type='button' className='ghost' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button type='submit' className='primary'>
							{t('Label_Promotion_JoinNow')}
						</button>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default ClaimAmountModal
