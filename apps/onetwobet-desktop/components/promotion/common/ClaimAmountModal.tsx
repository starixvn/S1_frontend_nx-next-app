import { Form, InputBox, Select } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { ISetClaimPromotionArgs } from '@nx-next-app/service'
import { PromotionTypeEnum, SelectOptionType } from '@nx-next-app/types'
import {
	numberFormat,
	replaceStringToNumber,
	revertNumberFormat,
} from '@nx-next-app/utils'
import { debounce } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

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
	const debounceTrigger = debounce(trigger, 200)

	const min = numberFormat(minAmount, currencyId)
	const max = numberFormat(maxAmount, currencyId)

	const onSubmit = ({ amount }: { amount: string | undefined | number }) => {
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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className='pop'>
				<div className='loackAmount' style={{ display: 'flex' }}>
					<div className='icon icon-gift' />
					<div className='title'>{t('Label_General_ImportantNote')}</div>

					{/* // * 如果 'promotionType' 為 'FirstDeposit' 則需提供 Input 給使用者填寫金額 */}
					{promotionType === PromotionTypeEnum.FirstDeposit && (
						<>
							<div className=''>{t('Label_Promotion_EnterPreferAmount')}</div>

							<InputBox
								className='inputBox-blue'
								type='number'
								register={register('amount', {
									required: {
										value: true,
										message: t('Label_General_AmountLessThan', {
											value1: min,
										}),
									},
									min: {
										// * 只拿整數
										value: replaceStringToNumber(min ?? ''),
										message: t('Label_General_AmountLessThan', {
											value1: min,
										}),
									},
									max: {
										// * 只拿整數
										value: replaceStringToNumber(max ?? ''),
										message: t('Label_General_NotInLimit'),
									},

									onChange: () => {
										debounceTrigger('amount')
									},
								})}
								touched={!!formState.dirtyFields['amount']}
								errorMessage={formState.errors['amount']?.message as string}
								error={!!formState.errors['amount']}
								showIconModule={false}
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
							<div className=''>{t('Label_Promotion_SelectPreferAmount')}</div>

							<Select
								options={tierAmountListSelectOptions}
								onChange={value => {
									typeof value === 'string' && setValue('amount', value)
								}}
							/>
						</>
					)}

					<div className='btnGroup'>
						<button className='btn-cancel' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button type='submit' className='btn-check'>
							{t('Label_Promotion_JoinNow')}
						</button>
					</div>
				</div>
			</div>
		</Form>
	)
}

export default ClaimAmountModal
