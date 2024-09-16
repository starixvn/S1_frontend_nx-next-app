import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePhoneOtp } from '@nx-next-app/hooks'
import {
	ICryptoNetwork,
	IOTPSMSData,
	ISetCustCryptoWalletArgs,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CountdownTimer, Form, InputBox, Select } from '../common'

const AddWalletModal = ({
	cryptoNetworkList,
	cryptoCurrencyOptions,
	handleGetOtpInfo,
	handleSetCustCryptoWallet,
}: {
	cryptoNetworkList: ICryptoNetwork[]
	cryptoCurrencyOptions: { value: number; label: string }[]
	handleGetOtpInfo: () => Promise<IOTPSMSData | undefined>
	handleSetCustCryptoWallet: (args: ISetCustCryptoWalletArgs) => Promise<void>
}) => {
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

		if (errorMsg) {
			modal.error(errorMsg)
		} else {
			closeModal()
		}
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
			<div className='popTit'>
				<div className='icon icon-close' onClick={closeModal} />
				{t('Label_CryptoWallet_AddCryptoWallet')}
			</div>
			<Form onSubmit={handleSubmit(handleSubmitForm)}>
				<div className='popTxt'>
					<Select
						options={cryptoCurrencyOptions}
						value={getValues('cryptoCurrency')}
						defaultValue={cryptoCurrencyOptions[0].value}
						placeholder={t('Label_Join_PrefferedCurrency') as string}
						onChange={currencyId => selectCryptoCurrency(currencyId as number)}
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
						placeholder={t('Label_CryptoWallet_CryptoWalletNickName') as string}
					/>
					<InputBox
						register={register('walletAddress', {
							required: {
								value: true,
								message: t('Label_CryptoWallet_PleaseEnterWalletAddress'),
							},
							onBlur: () => trigger('walletAddress'),
						})}
						placeholder={t('Label_CryptoWallet_CryptoWalletAddress') as string}
						error={!!errors['walletAddress']}
						touched={!!touchedFields['walletAddress']}
						requiredIcon
					/>
					<div className='infoModule parts'>
						<div>
							<InputBox
								register={register('otpCode', {
									required: {
										value: true,
										message: t('Label_CryptoWallet_PleaseEnterWalletAddress'),
									},
									onBlur: () => trigger('otpCode'),
								})}
								error={!!errors['otpCode']}
								touched={!!touchedFields['otpCode']}
								placeholder='OTP'
							/>
						</div>
						<div className='btn-group'>
							{timer ? (
								<button className='gray ghost' type='button'>
									<CountdownTimer
										timer={timer}
										startUnixTime={startUnixTime || checkUnixTime}
										setTimer={setTimer}
									/>
								</button>
							) : (
								<button
									type='button'
									className='btn-check primary'
									onClick={handleSendOtpSMS}
								>
									<span>{t('Label_Profile_Retransmit')}</span>
								</button>
							)}
						</div>
					</div>
					<div className='btn-group'>
						<button className='cancel ghost' type='button' onClick={closeModal}>
							{t('Label_General_Cancel')}
						</button>
						<button className='btn-check primary' type='submit'>
							{t('Label_General_Submit')}
						</button>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default AddWalletModal
