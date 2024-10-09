import DepositModule from '@12b-desktop/components/deposit/ui/deposit-module'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
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
import { Form, Img, InputBox, Loading, Select } from '../../common'

interface ITopUpCardFormProps {
	dataSource: IPaymentTopUpCardPayData[]
}

const TopUpCardForm = ({ dataSource }: ITopUpCardFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
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
				<DepositModule title={t('Label_General_DepositAmount')} required>
					<div className='input-column'>
						<div>
							<InputBox
								className='inputBox-white'
								register={register('code', {
									required: true,
								})}
								placeholder={t('Label_Deposit_CardCode') || ''}
								touched={!!touchedFields['code']}
								error={!!errors['code']}
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
								className='inputBox-white'
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
							src={getBannerUrl(`/desktop/img/cardinfo.png`)}
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
							setValue('amount', value)
							trigger('amount')
						}}
					/>
				</DepositModule>
			)}

			<DepositModule title={t('Label_Deposit_ChooseAvailablePromotion')}>
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
					className='inputBox-white'
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

			<Form
				onSubmit={handleSubmit(values =>
					onTopUpCardPayFormSubmit(values, errorMessage =>
						modal.error(errorMessage)
					)
				)}
			>
				<div className='btnGroup primary'>
					<button
						type='submit'
						style={{ pointerEvents: isFormValid ? 'auto' : 'none' }}
						className={classNames({
							darkGray: !isFormValid,
							'btn-check': isFormValid,
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
