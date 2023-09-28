import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useCopyToClipboard } from 'usehooks-ts'
import Image from 'next/future/image'
import { uniqueId } from 'lodash-es'
import { CurrenciesEnum } from '@nx-next-app/types'
import { IDepositInfoHistoryData } from '@nx-next-app/service'
import { useImageFile } from '@nx-next-app/hooks'
import { convertBase64ToFile, convertFileToBase64 } from '@nx-next-app/utils'

interface IBankSlipModalProps {
	bankName?: string
	bankSite?: string
	accountName?: string
	accountNo?: string
	amount?: number
	transId?: string
	depositReceipt?: IDepositInfoHistoryData['depositReceipt']
	defaultReceipt?: string
	onSubmit: ({
		transId,
		receipt,
	}: {
		transId?: string
		receipt: string
	}) => void
}

const DepositBankSlipModal = ({
	bankName,
	bankSite,
	accountName,
	accountNo,
	amount,
	transId,
	depositReceipt = [],
	defaultReceipt,
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
						{amount && (
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
						)}
					</ul>
				</div>
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
									<Image
										width={121}
										height={80}
										src={URL.createObjectURL(imageFile)}
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
						onDrop={onImageFileChange}
					>
						<input type='file' accept='image/*' onChange={onImageFileChange} />
						{imageFile ? (
							<Image
								width={121}
								height={80}
								src={URL.createObjectURL(imageFile)}
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
				<form onSubmit={handleBankSlipSubmit}>
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
							disabled={!imageFile}
							className={`${
								currencyId !== CurrenciesEnum.THB ||
								(currencyId === CurrenciesEnum.THB && imageFile)
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

export default DepositBankSlipModal
