import { Form, Img, InputBox, Select } from '@12b-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useDepositContext, useTopUpCardForm } from '@nx-next-app/operations'
import { IPaymentTopUpCardPayData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'usehooks-ts'
import DepositModule from '../ui/deposit-module'

interface ITopUpCardFormProps {
	dataSource: IPaymentTopUpCardPayData[]
}

const TopUpCardForm = ({ dataSource }: ITopUpCardFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { promotionOptions } = useDepositContext()

	const {
		formMethods: {
			trigger,
			handleSubmit,
			setValue,
			watch,
			register,
			formState: { touchedFields, errors },
		},
		isFormValid,
		onTopUpCardPayFormSubmit,
	} = useTopUpCardForm({ dataSource })

	const { value: isCardInfoImgActive, toggle: toggleIsCardInfoImgActive } =
		useBoolean(false)

	const watchAmount = watch('amount')
	const watchBonusCode = watch('bonusCode')
	const watchMinAmount = watch('minAmount')
	const watchMaxAmount = watch('maxAmount')
	const watchAmountList = watch('amountList')

	return (
		<>
			<DepositModule
				title={t('Label_Payment_Method')}
				required
				hasAdditionalInfo
			>
				<DepositModule.SubModuleButtonGroup matchKey='paymentName'>
					{dataSource.map(item => {
						const { groupName, displayGroupName, minAmount, maxAmount } = item
						const min = numberFormat(minAmount, currencyId, 0, false)
						const max = numberFormat(maxAmount, currencyId, 0, false)
						return (
							<DepositModule.SubModuleButton
								label={displayGroupName}
								imgName={`${toLower(groupName)}.png`}
								matchValue={groupName}
								key={groupName}
							>
								<div>{`${min} ~ ${max}`}</div>
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			<DepositModule title={t('Label_Deposit_CardCode')} required>
				<div className='infoModule'>
					<InputBox
						className='input-group'
						register={register('code', {
							required: true,
						})}
						placeholder={t('Label_Deposit_CardCode') || ''}
						touched={!!touchedFields['code']}
						error={!!errors['code']}
						onInfoClick={() => toggleIsCardInfoImgActive()}
					>
						<button
							className='icon icon-files-empty clickBtn'
							onClick={async () => {
								const clipboardText =
									navigator.clipboard && (await navigator.clipboard.readText())

								setValue('code', clipboardText)
							}}
						/>
					</InputBox>
				</div>
			</DepositModule>

			<DepositModule title={t('Label_Deposit_CardSerial')} required>
				<div className='infoModule'>
					<InputBox
						className='input-group'
						register={register('serial', {
							required: true,
						})}
						placeholder={t('Label_Deposit_CardSerial') || ''}
						touched={!!touchedFields['serial']}
						error={!!errors['serial']}
						onInfoClick={() => toggleIsCardInfoImgActive()}
					>
						<button
							className='icon icon-files-empty clickBtn'
							onClick={async () => {
								const clipboardText =
									navigator.clipboard && (await navigator.clipboard.readText())

								setValue('serial', clipboardText)
							}}
						/>
					</InputBox>
				</div>
			</DepositModule>

			{isCardInfoImgActive && (
				<div className='cardinfo'>
					<Img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/cardinfo.png`}
						alt='img-cardinfo'
					/>
				</div>
			)}

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule title={t('Label_General_DepositAmount')} required>
					{/* <div className='input-column'>



						<div>
							<InputBox
								register={register('serial', {
									required: true,
								})}
								placeholder={t('Label_Deposit_CardSerial') || ''}
								touched={!!touchedFields['serial']}
								error={!!errors['serial']}
								onInfoClick={() => toggleIsCardInfoImgActive()}
							/>
							<button
								className='icon icon-files-empty'
								onClick={async () => {
									const clipboardText =
										navigator.clipboard &&
										(await navigator.clipboard.readText())

									setValue('serial', clipboardText)
								}}
							/>
						</div>
						<div className='tip active'>
							{t('Label_Deposit_ProvideBankSlip')}
						</div>
					</div>

					<div
						className={classNames('tipImg', {
							active: isCardInfoImgActive,
						})}
					>
						<Img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/cardinfo.png`}
							alt='img-cardinfo'
						/>
					</div> */}

					<DepositModule.ShortcutList
						minAmount={watchMinAmount}
						maxAmount={watchMaxAmount}
						shortcut={Number(watchAmount)}
						shortcutList={
							watchAmountList ||
							generateShortcutList({ minAmount: watchMinAmount })
						}
						format={isConvert(currencyId)}
						onChange={value => {
							setValue('amount', value)
							trigger('amount')
						}}
					/>
					<div className='note'>
						<ol>
							<li className='title'>
								<span className='icon icon-warning' />
								{t('Label_General_ImportantNotes')}
							</li>
							<li>{t('Label_Deposit_DepositLoadCardNoticeContent1')}</li>
							<li>{t('Label_Deposit_DepositLoadCardNoticeContent2')}</li>
						</ol>
					</div>
				</DepositModule>
			)}

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
				<div className='infoModule'>
					<Select
						value={watchBonusCode}
						options={promotionOptions}
						onChange={value => {
							// * bonusCode 與 promoCode 擇一使用因此清空 promoCode
							setValue('bonusCode', String(value))
							setValue('promoCode', undefined)
						}}
					/>

					<InputBox
						register={register('promoCode')}
						placeholder={t('Label_Promotions_PromoCode') || ''}
						touched={!!touchedFields['promoCode']}
						onChange={() => {
							setValue('bonusCode', undefined)
						}}
					/>
				</div>
			</DepositModule>

			<Form
				onSubmit={handleSubmit(values =>
					onTopUpCardPayFormSubmit(values, errorMessage =>
						modal.error(errorMessage)
					)
				)}
			>
				<div className='btn-group'>
					<button
						type='submit'
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
						className={classNames({
							'gray primary': !isFormValid,
							primary: isFormValid,
						})}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</Form>
		</>
	)
}

export default TopUpCardForm
