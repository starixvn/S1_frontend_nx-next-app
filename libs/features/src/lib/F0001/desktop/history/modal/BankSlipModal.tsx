import React, { useState } from 'react'
import classNames from 'classnames'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import { numberFormat } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useCopyToClipboard } from 'usehooks-ts'
import { convertFileToBase64 } from '@nx-next-app/features/F0001/desktop/history/modal/utils'
import Image from 'next/future/image'
import { IDepositInfoHistoryData } from '@nx-next-app/service'

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
	bankSlipInfo: IDepositInfoHistoryData
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
		<div className='pop'>
			<div className='upload_new active'>
				<div
					className='icon icon-close'
					onClick={() => {
						closeModal()
					}}
				/>
				<div className='smallList checkBankSlip'>
					<div className='title'>{t('Label_History_BankAccount')}</div>
					<div className='txt-lightgray'>
						{t('Label_History_TransactionHint')}
					</div>
					<ul>
						<li>{t('Label_History_BankName')}</li>
						<li>{bankName}</li>
						<li>
							<a
								target='_blank'
								rel='noreferrer'
								href={bankSite}
								className='icon icon-new-tab'
							/>
						</li>
					</ul>
					<ul>
						<li>{t('Label_History_BankAccountName')}</li>
						<li>{accountName}</li>
						<li>
							<button
								className='icon icon-files-empty copyBtn'
								onClick={() => copy(accountName)}
							>
								<span>{t('Label_Copy')}</span>
							</button>
						</li>
					</ul>
					<ul>
						<li>{t('Label_History_BankNumber')}</li>
						<li>{accountNo}</li>
						<li>
							<button
								className='icon icon-files-empty copyBtn'
								onClick={() => copy(accountNo)}
							>
								<span>{t('Label_Copy')}</span>
							</button>
						</li>
					</ul>
					{amount ? (
						<ul>
							<li>{t('Label_History_DepositAmount')}</li>
							<li>{numberFormat(amount, currencyId, 0)}</li>
							<li>
								<button
									className='icon icon-files-empty copyBtn'
									onClick={() => copy(amount.toString())}
								>
									<span>{t('Label_Copy')}</span>
								</button>
							</li>
						</ul>
					) : null}
				</div>
				<div className='smallList checkBankSlip'>
					<span className='title'>{t('Label_History_SubmitProof')}</span>
					<div className='txt-lightgray'>{t('Label_History_AttachFile')}</div>
					{depositReceipt.length > 0 ? (
						<div className='uploadModule'>
							{depositReceipt.length < 6 && (
								<label
									className={classNames('upload_img', { error: errorMessage })}
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
								<label key={receiptNo} className='upload_img'>
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

					<div
						className='txt-red'
						style={{
							visibility: errorMessage ? 'visible' : 'hidden',
						}}
					>
						{errorMessage}
					</div>

					<div className='directions'>
						<ul>
							<li>{t('Label_History_BankSlipHint1')}</li>
							<li>{t('Label_History_BankSlipHint2')}</li>
							<li>{t('Label_History_BankSlipHint3')}</li>
						</ul>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='btnGroup'>
							<button
								className='btn-cancel'
								onClick={() => {
									closeModal()
								}}
							>
								{t('Label_General_Cancel')}
							</button>
							<button type='submit' className='btn-check'>
								{t('Label_General_Submit')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default BankSlipModal
