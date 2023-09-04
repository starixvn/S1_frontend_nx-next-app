import React, { useState } from 'react'
import classNames from 'classnames'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useCopyToClipboard } from 'usehooks-ts'
import { convertFileToBase64 } from '@nx-next-app/features/F0001/desktop/history/modal/utils'
import Image from 'next/future/image'
import { uniqueId } from 'lodash-es'
import { CurrenciesEnum } from '@nx-next-app/types'

const BankSlipModal = ({
	bankSlipInfo: {
		bankInfo: { bankName, bankSite },
		depositRep: { accountName, accountNo },
		amount,
		transId,
		depositReceipt,
	},
	onSubmit,
}: {
	bankSlipInfo: {
		bankInfo: {
			sysId: number
			currencyId: number
			bankCode: string
			bankName: string
			bankLogo: string
			bankSite: string
			status: number
		}
		depositRep: {
			ver: number
			sysId: number
			accountName: string
			accountNo: string
			ifscCode: string
			currencyId: number
			isLocalPay: boolean
			groupId: number
			code: null
		}
		amount: number
		transId: string
		depositReceipt: {
			depositId: number
			picFileName: string
			receiptNo: number
			depositPic: null
		}[]
	}
	onSubmit: ({ transId, receipt }: { transId: string; receipt: string }) => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()
	const [, copy] = useCopyToClipboard()
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [errorMessage, setErrorMessage] = useState('')

	const handleFileChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.DragEvent<HTMLLabelElement>
	) => {
		const file =
			(event as React.DragEvent<HTMLLabelElement>).dataTransfer?.files?.length >
			0
				? (event as React.DragEvent<HTMLLabelElement>).dataTransfer?.files[0]
				: (event as React.ChangeEvent<HTMLInputElement>).target?.files?.[0]
		if (file && file.type.startsWith('image/')) {
			setSelectedFile(file)
			setErrorMessage('')
		} else {
			setErrorMessage(
				t('Label_History_File_format_error_please_try_again') as string
			)
			setSelectedFile(null)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (selectedFile) {
			const image = await convertFileToBase64(selectedFile)
			onSubmit({ transId, receipt: image as string })
			closeModal()
		}
	}

	return (
		<div className='active'>
			<div className='bankSlip popUp active'>
				<div className='info infoAccount'>
					<ul>
						<li>
							<div>
								<div className='bankLogo acb' />
								<span>{bankName}</span>
							</div>
							<a href={bankSite} target='_blank' rel='noreferrer'>
								<button className='icon icon-new-tab clickBtn' />
							</a>
						</li>
						<li>
							<div>
								<span className='title'>
									{t('Label_History_BankAccountName')}
								</span>
								<span>{accountName}</span>
							</div>
							<button
								className='icon icon-files-empty clickBtn copyBtn'
								onClick={() => copy(accountName)}
							/>
						</li>
						<li>
							<div>
								<span className='title'>{t('Label_History_BankNumber')}</span>
								<span>{accountNo}</span>
							</div>
							<button
								className='icon icon-files-empty clickBtn copyBtn'
								onClick={() => copy(accountNo)}
							/>
						</li>
						<li>
							<div>
								<span className='title'>
									{t('Label_History_DepositAmount')}
								</span>
								<span>{amount}</span>
							</div>
							<button
								className='icon icon-files-empty clickBtn copyBtn'
								onClick={() => copy(amount.toString())}
							/>
						</li>
					</ul>
				</div>
				<span className='text'>{t('Label_History_AttachFile')}</span>
				{depositReceipt?.length > 0 ? (
					<div className='uploadModule'>
						{depositReceipt.length < 6 && (
							<label
								className='upload_img'
								onDragOver={e => e.preventDefault()}
								onDrop={handleFileChange}
							>
								<input
									type='file'
									accept='image/*'
									onChange={handleFileChange}
								/>
								{selectedFile ? (
									<Image
										width={121}
										height={80}
										src={URL.createObjectURL(selectedFile)}
										alt='Selected'
									/>
								) : (
									<i className='icon icon-plus' />
								)}
							</label>
						)}
						{depositReceipt.map(({ receiptNo, depositPic }) => (
							<label
								key={uniqueId(receiptNo.toString())}
								className='upload_img'
							>
								<input type='file' />
								{depositPic ? (
									<Image width={121} height={80} src={depositPic} alt='' />
								) : null}
							</label>
						))}
					</div>
				) : (
					<label
						className={classNames('upload_img', { error: errorMessage })}
						onDragOver={e => e.preventDefault()}
						onDrop={handleFileChange}
					>
						<input type='file' accept='image/*' onChange={handleFileChange} />
						{selectedFile ? (
							<Image
								width={121}
								height={80}
								src={URL.createObjectURL(selectedFile)}
								alt='Selected'
							/>
						) : (
							<i className='icon icon-plus' />
						)}
					</label>
				)}
				<div className='rule'>
					<ul>
						<li>{t('Label_History_BankSlipHint1')}</li>
						<li>{t('Label_History_BankSlipHint2')}</li>
						<li>{t('Label_History_BankSlipHint3')}</li>
					</ul>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='btn-group'>
						<button
							className='white closePopup'
							onClick={() => {
								closeModal()
							}}
						>
							{t('Label_General_Cancel')}
						</button>
						<button
							type='submit'
							disabled={!selectedFile}
							className={`${
								currencyId !== CurrenciesEnum.THB ||
								(currencyId === CurrenciesEnum.THB && selectedFile)
									? 'blue'
									: 'gray'
							} closePopup`}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default BankSlipModal
