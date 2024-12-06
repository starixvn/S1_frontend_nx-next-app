import {
	DepositModule,
	Form,
	Img,
	InputBox,
	Loading,
	Select,
} from '@nx-next-app/components/D0001'
import {
	useAuth,
	useDepositContext,
	useTopUpCardForm,
} from '@nx-next-app/data-access'

import { IPaymentTopUpCardPayData } from '@nx-next-app/service'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { isNumber, toLower } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'

interface ITopUpCardFormProps {
	dataSource: IPaymentTopUpCardPayData[]
}

const TopUpCardForm = ({ dataSource }: ITopUpCardFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const { getCustPromotionOptions, getBonusCodeIfExist } = useDepositContext()

	const {
		formMethods: {
			trigger,
			handleSubmit,
			setValue,
			watch,
			register,
			formState: { touchedFields, errors },
		},
		loading,
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
			{loading && <Loading />}
			<DepositModule
				title={t('Label_Payment_Method')}
				layout='vertical'
				required
				hasAdditionalInfo
				depositTitle={t('Label_Payment_Method', {
					lng: 'en',
				})}
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

			{isNumber(watchMinAmount) && isNumber(watchMaxAmount) && (
				<DepositModule
					title={t('Label_General_DepositAmount')}
					depositTitle={t('Label_General_DepositAmount', {
						lng: 'en',
					})}
					required
				>
					<div className='input-column'>
						<div>
							<InputBox
								className='inputBox-blue'
								register={register('code', {
									required: true,
								})}
								placeholder={t('Label_Deposit_CardCode') || ''}
								touched={!!touchedFields['code']}
								error={!!errors['code']}
								onChange={event => {
									setValue(
										'bonusCode',
										String(
											getBonusCodeIfExist(
												Number(event.target.value),
												watchBonusCode
											)
										)
									)
								}}
								onInfoClick={() => toggleIsCardInfoImgActive()}
							/>
							<button
								className='icon icon-files-empty'
								onClick={async () => {
									const clipboardText =
										navigator.clipboard &&
										(await navigator.clipboard.readText())

									setValue('code', clipboardText)
								}}
							/>
						</div>

						<div className='tip active'>
							{t('Label_Deposit_ProvideBankSlip')}
						</div>
						<div>
							<InputBox
								className='inputBox-blue'
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
					</div>

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
							setValue(
								'bonusCode',
								String(getBonusCodeIfExist(value, watchBonusCode))
							)
							setValue('amount', value)
							trigger('amount')
						}}
					/>
				</DepositModule>
			)}

			<DepositModule
				title={t('Label_Deposit_ChooseAvailablePromotion')}
				depositTitle={t('Label_Deposit_ChooseAvailablePromotion', {
					lng: 'en',
				})}
			>
				<Select
					value={getBonusCodeIfExist(watchAmount, watchBonusCode)}
					options={getCustPromotionOptions(watchAmount)}
					onChange={value => {
						// * bonusCode 與 promoCode 擇一使用因此清空 promoCode
						setValue('bonusCode', String(value))
						setValue('promoCode', undefined)
					}}
				/>

				<InputBox
					className='inputBox-blue'
					register={register('promoCode')}
					placeholder={t('Label_Promotions_PromoCode') || ''}
					touched={!!touchedFields['promoCode']}
					onChange={() => {
						setValue('bonusCode', undefined)
					}}
				/>
			</DepositModule>

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

			<Form onSubmit={handleSubmit(onTopUpCardPayFormSubmit)}>
				<div
					className='btnGroup'
					style={{ cursor: isFormValid ? 'pointer' : 'no-drop' }}
				>
					<button
						type='submit'
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
						className={classNames({
							'btn-disable': !isFormValid,
							'btn-primary': isFormValid,
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
