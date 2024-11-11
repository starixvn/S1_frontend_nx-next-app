import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useImageFile } from '@nx-next-app/hooks'
import { IDepositInfoHistoryData } from '@nx-next-app/service'
import {
	convertBase64ToFile,
	convertFileToBase64,
	numberFormat,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

interface IBankSlipModalProps {
	bankName: string
	bankSite: string
	accountName: string
	accountNo: string
	code?: string | null
	amount?: number
	transId?: string
	depositReceipt?: IDepositInfoHistoryData['depositReceipt']
	defaultReceipt?: string
	isShowReceiptInfo?: boolean
	onSubmit: ({
		transId,
		receipt,
	}: {
		transId?: string
		receipt: string
	}) => void
}

const DepositBankSlipModal = ({
	bankName = '',
	bankSite = '',
	accountName = '',
	accountNo = '',
	code = '',
	amount = 0,
	transId = '',
	depositReceipt = [],
	defaultReceipt,
	isShowReceiptInfo = true,
	onSubmit,
}: IBankSlipModalProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()
	const [, copy] = useCopyToClipboard()

	const { errorMessage, imageFile, setImageFile, onImageFileChange } =
		useImageFile()

	const handleBankSlipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (imageFile) {
			const image = await convertFileToBase64(imageFile)
			onSubmit({ transId, receipt: image as string })
			closeModal()
		}
	}

	useEffect(() => {
		const setDefaultImageFile = async (dataUrl?: string) => {
			if (dataUrl) {
				const imgFile = await convertBase64ToFile(dataUrl)
				setImageFile(imgFile)
			}
		}
		setDefaultImageFile(defaultReceipt)
	}, [defaultReceipt])

	return (
		<div className='pop'>
			<div className='upload_new active'>
				<div className='icon icon-close' onClick={closeModal} />
				{isShowReceiptInfo && (
					<div className='smallList checkBankSlip bankaccount'>
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
									<span>{t('Label_General_Copy')}</span>
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
									<span>{t('Label_General_Copy')}</span>
								</button>
							</li>
						</ul>
						<ul>
							<li>{t('Label_General_Remark')}</li>
							<li>{code}</li>
							<li>
								<button
									className='icon icon-files-empty copyBtn'
									onClick={() => copy(code || '')}
								>
									<span>{t('Label_General_Copy')}</span>
								</button>
							</li>
						</ul>

						<ul>
							<li>{t('Label_History_DepositAmount')}</li>
							<li>{numberFormat(amount, currencyId, 0)}</li>
							<li>
								<button
									className='icon icon-files-empty copyBtn'
									onClick={() => copy(amount.toString())}
								>
									<span>{t('Label_General_Copy')}</span>
								</button>
							</li>
						</ul>
					</div>
				)}
				<div className='smallList checkBankSlip'>
					<span className='title'>{t('Label_General_SubmitBankSlip')}</span>
					<div className='txt-lightgray'>{t('Label_History_AttachFile')}</div>
					{depositReceipt?.length > 0 ? (
						<div className='uploadModule'>
							{depositReceipt.length < 6 && (
								<label
									className={classNames('upload_img', { error: errorMessage })}
									onDragOver={e => e.preventDefault()}
									onDrop={onImageFileChange}
								>
									<input
										type='file'
										accept='image/*'
										onChange={onImageFileChange}
									/>
									{imageFile ? (
										<img src={URL.createObjectURL(imageFile)} alt='Selected' />
									) : (
										<i className='icon icon-plus' />
									)}
								</label>
							)}
							{depositReceipt.map(({ receiptNo, depositPic }) => (
								<label key={receiptNo} className='upload_img'>
									<input type='file' />
									{depositPic ? <img src={depositPic} alt='' /> : null}
								</label>
							))}
						</div>
					) : (
						<label
							className={classNames('upload_img', { error: errorMessage })}
							onDragOver={e => e.preventDefault()}
							onDrop={onImageFileChange}
						>
							<input
								type='file'
								accept='image/*'
								onChange={onImageFileChange}
							/>

							{imageFile ? (
								<img src={URL.createObjectURL(imageFile)} alt='Selected' />
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
					<form onSubmit={handleBankSlipSubmit}>
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

export default DepositBankSlipModal
