import { Form, InputBox, Select } from '@nx-next-app/components/H0001'
import { PromotionTypeEnum, SelectOptionType } from '@nx-next-app/types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { numberFormat, revertNumberFormat } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { replace } from 'lodash-es'
import { ISetClaimPromotionArgs } from '@nx-next-app/service'
import { INTEGER_ONLY_REGEX } from '@nx-next-app/constants'

const ClaimAmountModal = ({
	bonusCode,
	promotionType,
	minAmount,
	maxAmount,
	onSetClaimPromotion,
	tierAmountListSelectOptions,
}: {
	bonusCode: string
	promotionType: PromotionTypeEnum
	minAmount: number
	maxAmount: number
	onSetClaimPromotion: ({
		bonusCode,
		lockedAmount,
	}: Pick<ISetClaimPromotionArgs, 'bonusCode' | 'lockedAmount'>) => void
	tierAmountListSelectOptions: SelectOptionType[]
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()

	const { formState, register, trigger, handleSubmit, setValue } = useForm<{
		amount: string | undefined
	}>()

	const min = numberFormat(minAmount, currencyId)
	const max = numberFormat(maxAmount, currencyId)

	const onSubmit = ({ amount }: { amount: string | undefined }) => {
		const lockedAmount = revertNumberFormat(amount, currencyId)

		if (lockedAmount) {
			onSetClaimPromotion({
				bonusCode,
				lockedAmount: Number(lockedAmount),
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
					{/* // * 如果 'promotionType' 為 'FirstDeposit' 則需提供 Input 給使用者填寫金額 */}
					{promotionType === PromotionTypeEnum.FirstDeposit && (
						<>
							<div className='txt-lightgray text-center'>
								{t('Label_Promotion_EnterPreferAmount')}
							</div>

							<InputBox
								register={register('amount', {
									required: {
										value: true,
										message: t('Label_General_AmountLessThan', {
											value1: min,
										}),
									},
									min: {
										// * 只拿整數
										value: replace(String(min), INTEGER_ONLY_REGEX, ''),
										message: t('Label_General_AmountLessThan', {
											value1: min,
										}),
									},
									max: {
										// * 只拿整數
										value: replace(String(max), INTEGER_ONLY_REGEX, ''),
										message: t('Label_General_NotInLimit'),
									},
									onBlur: () => trigger('amount'),
									onChange: e => {
										setValue('amount', e.target.value)
									},
								})}
								touched={!!formState.touchedFields['amount']}
								errorMessage={formState.errors['amount']?.message as string}
								error={!!formState.errors['amount']}
							/>
							<div className='txt-orange'>
								{t('Label_Promotion_ClaimAmountRange')}: {`${min} ~ ${max}`}
							</div>
						</>
					)}

					{/* // * 如果 promotionType 為 Redeposit 則提供 距級 的 Dropdown 提供選擇 */}
					{(promotionType === PromotionTypeEnum.Redeposit ||
						promotionType === PromotionTypeEnum.MissionBonus) && (
						<>
							<div className='txt-lightgray text-center'>
								{t('Label_Promotion_SelectPreferAmount')}
							</div>

							<Select
								options={tierAmountListSelectOptions}
								onChange={value => {
									typeof value === 'string' && setValue('amount', value)
								}}
							/>
						</>
					)}

					<div className='btn-group'>
						<button type='button' className='white' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button type='submit' className='orange'>
							{t('Label_Promotion_JoinNow')}
						</button>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default ClaimAmountModal
