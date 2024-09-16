import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useImageFile } from '@nx-next-app/hooks'
import { IDepositInfoHistoryData } from '@nx-next-app/service'
import { convertBase64ToFile, convertFileToBase64 } from '@nx-next-app/utils'
import classNames from 'classnames'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

interface IBankSlipModalProps {
	bankName?: string
	bankSite?: string
	accountName?: string
	accountNo?: string
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

	const { closeModal } = useGlobalModal()
	const [, copy] = useCopyToClipboard()

	const { errorMessage, imageFile, setImageFile, onImageFileChange } =
		useImageFile()

	const handleBankSlipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (imageFile) {
			const image = await convertFileToBase64(imageFile)
			onSubmit({
				transId,
				receipt: image as string,
			})
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
		<div className='active'>
			<div className='bankSlip popUp active'>
				{isShowReceiptInfo && (
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
									onClick={() => copy(accountName || '')}
								/>
							</li>
							<li>
								<div>
									<span className='title'>{t('Label_History_BankNumber')}</span>
									<span>{accountNo}</span>
								</div>
								<button
									className='icon icon-files-empty clickBtn copyBtn'
									onClick={() => copy(accountNo || '')}
								/>
							</li>

							<li>
								<div>
									<span className='title'>{t('Label_General_Remark')}</span>
									<span>{code}</span>
								</div>
								<button
									className='icon icon-files-empty clickBtn copyBtn'
									onClick={() => copy(code || '')}
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
									onClick={() => copy(amount?.toString())}
								/>
							</li>
						</ul>
					</div>
				)}
				<span className='text'>{t('Label_History_AttachFile')}</span>
				{depositReceipt?.length > 0 ? (
					<div className='uploadModule'>
						{depositReceipt.length < 6 && (
							<label
								className='upload_img'
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
							<label
								key={uniqueId(receiptNo.toString())}
								className='upload_img'
							>
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
						<input type='file' accept='image/*' onChange={onImageFileChange} />
						{imageFile ? (
							<img src={URL.createObjectURL(imageFile)} alt='Selected' />
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
				<form onSubmit={handleBankSlipSubmit}>
					<div className='btn-group'>
						<button
							className='cancel ghost'
							onClick={() => {
								closeModal()
							}}
						>
							{t('Label_General_Cancel')}
						</button>
						<button
							type='submit'
							disabled={!imageFile}
							className='gray primary'
							// className={`${
							// 	currencyId !== CurrenciesEnum.THB ||
							// 	(currencyId === CurrenciesEnum.THB && imageFile)
							// 		? 'blue'
							// 		: 'gray'
							// } closePopup`}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DepositBankSlipModal
