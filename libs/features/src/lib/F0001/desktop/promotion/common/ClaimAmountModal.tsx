import { Form, Select } from '@nx-next-app/components/D0001'
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

					{/* // * 如果 promotionType 為 Redeposit 則提供 距級 的 Dropdown 提供選擇 */}
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
