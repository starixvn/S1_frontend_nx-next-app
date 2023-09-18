import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { usePhoneOtp } from '@nx-next-app/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	Form,
	Select,
	InputBox,
	CountdownTimer,
} from '@nx-next-app/components/D0001'
import { useCryptoWallet } from '@nx-next-app/features/F0001/providers'

const AddWalletModal = () => {
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()

	const {
		formState,
		watch,
		trigger,
		setValue,
		register,
		getValues,
		handleSubmit,
	} = useForm()
	const { errors, touchedFields } = formState

	const {
		cryptoNetworkList,
		cryptoCurrencyOptions,
		handleGetOtpInfo,
		handleSetCustCryptoWallet,
	} = useCryptoWallet()

	const { timer, startUnixTime, setTimer, handleSendOtpSMS, handleVerifyOtp } =
		usePhoneOtp()

	const [checkUnixTime, setCheckUnixTime] = useState<number>(0)

	const handleCheckOtpInfo = async () => {
		const { startUnixTime: checkUnixTime } = (await handleGetOtpInfo()) || {}

		if (checkUnixTime) {
			setTimer(true)
			setCheckUnixTime(checkUnixTime)
		}
	}

	const selectCryptoCurrency = (newCurrencyId: number) => {
		const cryptoCurrency = getValues('cryptoCurrency')

		if (newCurrencyId !== cryptoCurrency) {
			setValue('cryptoCurrency', newCurrencyId)

			const defaultNetwork = cryptoNetworkList.find(
				({ currencyId }) => currencyId === newCurrencyId
			)?.network
			setValue('cryptoNetwork', defaultNetwork)
		}
	}

	const handleSubmitForm = async () => {
		const { otpCode, walletAddress, cryptoCurrency, cryptoNetwork, nickName } =
			getValues()

		const errorMsg = await handleVerifyOtp({
			otpCode,
			callbackFn: () => {
				handleSetCustCryptoWallet({
					address: walletAddress,
					currencyId: cryptoCurrency,
					network: cryptoNetwork,
					nickName,
				})
			},
		})

		if (errorMsg) modal.error(errorMsg)
	}

	const cryptoNetworkOptions = cryptoNetworkList
		.filter(({ currencyId }) => currencyId === getValues('cryptoCurrency'))
		.map(({ network }) => ({ value: network, label: network }))

	useEffect(() => {
		handleCheckOtpInfo()
		selectCryptoCurrency(cryptoCurrencyOptions[0].value)
	}, [])

	return (
		<div className='pop'>
			<div className='addAddresspop active'>
				<button
					className='icon icon-close'
					type='button'
					onClick={closeModal}
				/>
				<span className='title'>{t('Label_CryptoWallet_AddCryptoWallet')}</span>
				<Form onSubmit={handleSubmit(handleSubmitForm)}>
					<div>
						<Select
							options={cryptoCurrencyOptions}
							value={getValues('cryptoCurrency')}
							defaultValue={cryptoCurrencyOptions[0].value}
							placeholder={t('Label_Join_PrefferedCurrency') as string}
							onChange={currencyId =>
								selectCryptoCurrency(currencyId as number)
							}
							errorMessage={errors['cryptoCurrency']?.message as string}
							prefixIcon={<span className='txt-red'>*</span>}
						/>
						<Select
							options={cryptoNetworkOptions}
							value={getValues('cryptoNetwork')}
							defaultValue={
								watch('cryptoCurrency') && cryptoNetworkOptions[0]?.value
							}
							onChange={network => setValue('cryptoNetwork', network)}
							errorMessage={errors['cryptoNetwork']?.message as string}
							prefixIcon={<span className='txt-red'>*</span>}
						/>
						<InputBox
							register={register('nickName')}
							errorMessage={errors['nickName']?.message as string}
							error={!!errors['nickName']}
							touched={!!touchedFields['nickName']}
							title={t('Label_CryptoWallet_CryptoWalletNickName') as string}
							placeholder={t('Label_Profile_Option2') as string}
						/>
						<InputBox
							register={register('walletAddress', {
								required: {
									value: true,
									message: t('Label_CryptoWallet_PleaseEnterWalletAddress'),
								},
								onBlur: () => trigger('walletAddress'),
							})}
							title={t('Label_CryptoWallet_CryptoWalletAddress') as string}
							error={!!errors['walletAddress']}
							touched={!!touchedFields['walletAddress']}
						/>
						<div className='inputModuleRow'>
							<div>
								{/* 使用 form 導致跑版，所以額外用 style 調整 */}
								<InputBox
									style={{ paddingRight: '80px' }}
									register={register('otpCode', {
										required: {
											value: true,
											message: t('Label_CryptoWallet_PleaseEnterWalletAddress'),
										},
										onBlur: () => trigger('otpCode'),
									})}
									title='OTP'
									error={!!errors['otpCode']}
									touched={!!touchedFields['otpCode']}
								/>
							</div>
							{/* 使用 form 導致跑版，所以額外用 style 調整 */}
							<div className='btnGroup' style={{ margin: '10px' }}>
								{timer ? (
									<button className='btn-cancel' type='button'>
										<CountdownTimer
											timer={timer}
											startUnixTime={startUnixTime || checkUnixTime}
											setTimer={setTimer}
										/>
									</button>
								) : (
									<button
										type='button'
										className='btn-check'
										onClick={handleSendOtpSMS}
									>
										<span>{t('Label_Profile_Retransmit')}</span>
									</button>
								)}
							</div>
						</div>
						<div className='tip active'>
							{t('Label_CryptoWallet_CryptoWalletSubmitNote')}
						</div>
					</div>
					<div className='btnGroup'>
						<button className='btn-cancel' type='button' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button className='btn-check' type='submit'>
							{t('Label_General_Submit')}
						</button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export { AddWalletModal }
