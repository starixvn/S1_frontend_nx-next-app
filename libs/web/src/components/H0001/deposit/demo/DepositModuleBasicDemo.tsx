/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ISelectProps,
	Img,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DepositModule from '../deposit-module'

const App = () => {
	const { t } = useTranslation()
	const { register, formState } = useForm({ mode: 'onBlur' })
	const { errors, touchedFields } = formState

	const [value, setValue] = useState<string | number | undefined>()

	const options: ISelectProps['options'] = [
		{
			value: 2,
			label: 'label-2',
		},
		{
			value: 3,
			label: 'label-3',
		},
		{
			value: 4,
			label: 'label-4',
		},
	]

	return (
		<>
			s
			<DepositModule title='Deposit Option'>
				<DepositModule.SubModuleButtonGroup matchKey='deposit-option'>
					<DepositModule.SubModuleButton
						label='Auto Deposit'
						icon='icon icon-library fast'
						matchValue='deposit-option-1'
					>
						<div>Credit Time ：Instant</div>
					</DepositModule.SubModuleButton>
					<DepositModule.SubModuleButton
						label='Auto Deposit'
						icon='icon icon-library fast'
						matchValue='deposit-option-2'
					>
						<div>Credit Time ：Instant</div>
					</DepositModule.SubModuleButton>
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>
			<DepositModule title='Payment Methods'>
				<DepositModule.SubModuleButtonGroup matchKey='payment-methods'>
					<DepositModule.SubModuleButton
						label='DirePay'
						imgName='direpay.png'
						matchValue='payment-methods-1'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
					<DepositModule.SubModuleButton
						label='DirePay'
						imgName='direpay.png'
						matchValue='payment-methods-2'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>
			<DepositModule title='Select Bank' required>
				<DepositModule.SubModuleButtonGroup matchKey='select-bank'>
					<DepositModule.SubModuleButton
						label='Select Bank'
						imgName='square/cimb.png'
						matchValue='select-bank-1'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
					<DepositModule.SubModuleButton
						label='Select Bank'
						imgName='square/cimb.png'
						matchValue='select-bank-2'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>
			<DepositModule title='Bank Account' className='bankQR'>
				<DepositModule.BankAccount
					bankName='CIMB Bank Berhad'
					accountName='Chang KoK Hua'
					accountNumber='7631162904'
				/>
			</DepositModule>
			<DepositModule title='Select Channel' required>
				<DepositModule.SubModuleButtonGroup matchKey='select-channel'>
					<DepositModule.SubModuleButton
						label='DuitNowQR'
						imgName='duitnowqr.png'
						matchValue='select-channel-1'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
					<DepositModule.SubModuleButton
						label='DuitNowQR'
						imgName='duitnowqr.png'
						matchValue='select-channel-2'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>

					<DepositModule.SubModuleButton
						label='DuitNowQR'
						imgName='duitnowqr.png'
						matchValue='select-channel-3'
					>
						<div>Min: 20</div>
						<div>Max: 10,000</div>
					</DepositModule.SubModuleButton>
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>
			<DepositModule title='Deposit Amount' required>
				<div className='column' />
				<InputBox
					className='inputBox-white'
					register={register('cardCode', {
						required: { value: true, message: '不填是怎樣？' },
					})}
					placeholder='Card Code'
					touched={!!touchedFields['cardCode']}
				/>

				<DepositModule.ShortcutList
					shortcutList={[10, 20, 30, 50, 100, 200, 300, 500, 1000]}
				/>
			</DepositModule>
			<DepositModule title='Deposit Amount' required>
				<div className='input-column'>
					<div>
						<InputBox
							className='inputBox-white'
							register={register('cardCode', {
								required: { value: true, message: '不填是怎樣？' },
							})}
							placeholder='Card Code'
							touched={!!touchedFields['cardCode']}
						/>
						<button className='icon icon-files-empty' />
					</div>
					<div className='tip active'>
						Please provide us with the bank slip here so we can process your
						request quickly.
					</div>
					<div>
						<InputBox
							className='inputBox-white'
							register={register('cardCode', {
								required: { value: true, message: '不填是怎樣？' },
							})}
							placeholder='Card Code'
							touched={!!touchedFields['cardCode']}
						/>
						<button className='icon icon-files-empty' />
					</div>
					<div className='tip active'>
						Please provide us with the bank slip here so we can process your
						request quickly.
					</div>
				</div>
				<div className='tipImg '>
					<Img
						src='https://banner.0814media.net/desktop/img/cardinfo.png'
						alt='cardinfoImg'
					/>
				</div>

				<DepositModule.ShortcutList
					shortcutList={[10, 20, 30, 50, 100, 200, 300, 500, 1000]}
				/>
			</DepositModule>
			<DepositModule title='Deposit Channel' required>
				<Select
					value={value}
					options={options}
					onChange={value => setValue(value)}
				/>

				<div className='tip active'>tes</div>
			</DepositModule>
			<DepositModule title='Submit Bank Slip' required>
				<DepositModule.BankSlipButton
					tip='Please provide us with the bank slip here so we can process your
					request quickly.'
				>
					Upload Receipt
				</DepositModule.BankSlipButton>
			</DepositModule>
			<DepositModule title='Choose Available Promotion'>
				<Select
					value={value}
					options={options}
					onChange={value => setValue(value)}
				/>

				<InputBox
					className='inputBox-white'
					register={register('promoCode')}
					placeholder='Promo Code'
					touched={!!touchedFields['promoCode']}
				/>
			</DepositModule>
		</>
	)
}
