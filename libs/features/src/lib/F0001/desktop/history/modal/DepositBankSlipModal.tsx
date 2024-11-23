import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperModalBankSlipDeposit } from '@nx-next-app/features/F0001/desktop/history/modal/style'
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
			<WrapperModalBankSlipDeposit>
				<div className='upload_new active'>
					<div
						className='close-popup icon icon-close-line'
						onClick={closeModal}
					/>
					{isShowReceiptInfo && (
						<div className='smallList checkBankSlip bankaccount'>
							<div className='title'>{t('Label_History_BankAccount')}</div>
							<div className='slogan'>{t('Label_History_TransactionHint')}</div>
							<div className='group-bank-slip'>
								<div className='group-bank-name'>
									<div>{t('Label_History_BankName')}</div>
									<div>{bankName}</div>
								</div>
								<a
									target='_blank'
									rel='noreferrer'
									href={bankSite}
									className='icon icon-share-box-fill'
								/>
							</div>
							<div className='group-bank-slip'>
								<div className='group-bank-name'>
									<div>{t('Label_History_BankAccountName')}</div>
									<div>{accountName}</div>
								</div>
								<button
									className='icon icon-file-copy-line copyBtn custom-tooltip'
									onClick={() => copy(accountName)}
								>
									<span className='custom-tooltip-body'>
										{t('Label_General_Copy')}
									</span>
								</button>
							</div>
							<div className='group-bank-slip'>
								<div className='group-bank-name'>
									<div>{t('Label_History_BankNumber')}</div>
									<div>{accountNo}</div>
								</div>
								<button
									className='icon icon-file-copy-line copyBtn custom-tooltip'
									onClick={() => copy(accountNo)}
								>
									<span className='custom-tooltip-body'>
										{t('Label_General_Copy')}
									</span>
								</button>
							</div>
							<div className='group-bank-slip'>
								<div className='group-bank-name'>
									<div>{t('Label_General_Remark')}</div>
									<div>{code}</div>
								</div>
								<button
									className='icon icon-file-copy-line copyBtn custom-tooltip'
									onClick={() => copy(code || '')}
								>
									<span className='custom-tooltip-body'>
										{t('Label_General_Copy')}
									</span>
								</button>
							</div>

							<div className='group-bank-slip'>
								<div className='group-bank-name'>
									<div>{t('Label_History_DepositAmount')}</div>
									<div>{numberFormat(amount, currencyId, 0)}</div>
								</div>
								<button
									className='icon icon-file-copy-line copyBtn custom-tooltip'
									onClick={() => copy(amount.toString())}
								>
									<span className='custom-tooltip-body'>
										{t('Label_General_Copy')}
									</span>
								</button>
							</div>
						</div>
					)}
					<div className='smallList checkBankSlip'>
						<div className='title'>{t('Label_General_SubmitBankSlip')}</div>
						<div className='slogan'>{t('Label_History_AttachFile')}</div>
						{depositReceipt?.length > 0 ? (
							<div className='uploadModule'>
								{depositReceipt.length < 6 && (
									<label
										className={classNames('upload_img', {
											error: errorMessage,
										})}
										onDragOver={e => e.preventDefault()}
										onDrop={onImageFileChange}
									>
										<input
											type='file'
											accept='image/*'
											onChange={onImageFileChange}
										/>
										{imageFile ? (
											<img
												src={URL.createObjectURL(imageFile)}
												alt='Selected'
											/>
										) : (
											<i className='icon icon-add-fill' />
										)}
									</label>
								)}
								{depositReceipt.map(({ receiptNo, depositPic }) => (
									<label key={receiptNo} className='upload_img'>
										<input type='file' disabled />
										{depositPic ? <img src={depositPic} alt='' /> : null}
									</label>
								))}
							</div>
						) : (
							<div className='uploadModule'>
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
										<i className='icon icon-add-fill' />
									)}
								</label>
							</div>
						)}

						<div
							className='error-msg'
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
									className='btn-secondary'
									onClick={() => {
										closeModal()
									}}
								>
									{t('Label_General_Cancel')}
								</button>
								<button type='submit' className='btn-primary'>
									{t('Label_General_Submit')}
								</button>
							</div>
						</form>
					</div>
				</div>
			</WrapperModalBankSlipDeposit>
		</div>
	)
}

export default DepositBankSlipModal
