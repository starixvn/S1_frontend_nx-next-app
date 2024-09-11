import { Form, Select } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISetClaimPromotionArgs } from '@nx-next-app/service'
import { SelectOptionType } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

const ClaimAmountModal = ({
	bonusCode,
	onSetClaimPromotion,
	tierAmountListSelectOptions,
}: {
	bonusCode: string
	onSetClaimPromotion: ({
		bonusCode,
		lockedAmount,
	}: Pick<ISetClaimPromotionArgs, 'bonusCode' | 'lockedAmount'>) => void
	tierAmountListSelectOptions: SelectOptionType[]
}) => {
	const { t } = useTranslation()

	const { closeModal } = useGlobalModal()

	const { handleSubmit, setValue } = useForm<{
		amount: string | undefined
	}>()

	const onSubmit = ({ amount }: { amount: string | undefined | number }) => {
		onSetClaimPromotion({
			bonusCode,
			lockedAmount: Number(amount),
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className='pop'>
				<div className='loackAmount' style={{ display: 'flex' }}>
					<div className='icon icon-gift' />
					<div className='title'>{t('Label_General_ImportantNote')}</div>

					<div className=''>{t('Label_Promotion_SelectPreferAmount')}</div>
					<Select
						options={tierAmountListSelectOptions}
						onChange={value => {
							typeof value === 'string' && setValue('amount', value)
						}}
					/>

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

// TODO: 2024/9/11 first deposit old logic (input):
/**
 * import { Form, InputBox, Select } from '@nx-next-app/components/D0001'
import { PromotionTypeEnum, SelectOptionType } from '@nx-next-app/types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import {
	numberFormat,
	replaceStringToNumber,
	revertNumberFormat,
} from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { ISetClaimPromotionArgs } from '@nx-next-app/service'
import { PromotionTypeEnum, SelectOptionType } from '@nx-next-app/types'
import { revertNumberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

const ClaimAmountModal = ({
	bonusCode,
	promotionType,
	onSetClaimPromotion,
	tierAmountListSelectOptions,
}: {
	bonusCode: string
	promotionType: PromotionTypeEnum
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

	const { handleSubmit, setValue } = useForm<{
		amount: string | undefined
	}>()

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

					// 如果 'promotionType' 為 'FirstDeposit' 則需提供 Input 給使用者填寫金額 
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

					// 如果 promotionType 為 Redeposit 則提供 距級 的 Dropdown 提供選擇 
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

 */
