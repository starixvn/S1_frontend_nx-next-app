import {
	useKycUploader,
	useWithdrawal,
} from '@nx-next-app/features/F0001/providers'
import { KycStatusEnum } from '@nx-next-app/features/F0001/types'
import { useTranslation } from 'next-i18next'

const PendingPanel = () => {
	const { t } = useTranslation()
	return (
		<div className='subModuleList kycHeight'>
			<div className='subModule'>
				<div className='subModuleBody column align-items-center'>
					<div className='icon icon-icon32px_worker' />
					<span className='title txt-yellow'>
						{t('Label_Withdrawal_WaitKYC')}
					</span>
					<div className='txt-lightgray'>
						{t('Label_Withdrawal_WaitKYCHint')}
					</div>
				</div>
			</div>
		</div>
	)
}
const KycPanel = () => {
	const { t } = useTranslation()
	const { kycStatus, handleUploadKyc } = useWithdrawal()

	const { onSubmit, kycFile, onChangeInput, onDropDown } =
		useKycUploader(handleUploadKyc)

	// pending early return , pending 狀態則不執行底下程式碼
	if (kycStatus === KycStatusEnum.KycPending) return <PendingPanel />

	return (
		<div className='subModuleList submit-photo-id'>
			<div className='subModule'>
				<div className='subModuleBody  column align-items-center'>
					<span className='title'>{t('Label_Withdrawal_SubmitPhotoId')}</span>
					<div className='txt-lightgray'>
						{t('Label_Withdrawal_SubmitPhotoIdListTitle')}
						<br />
						{t('Label_Withdrawal_ImageUploadWarning')}{' '}
						{t('Label_Withdrawal_ImageJpgPngOnly')}
					</div>
					<label
						className='upload_img'
						onDragOver={e => e.preventDefault()}
						onDrop={e => {
							onDropDown(e)
						}}
					>
						<input
							type='file'
							onChange={e => {
								onChangeInput(e)
							}}
						/>
						{kycFile ? (
							<img alt='kyc' src={kycFile.fileImg as string} />
						) : (
							<i className='icon icon-add-fill' />
						)}
					</label>
					<div className='directions'>
						<ul>
							<li>{t('Label_Withdrawal_NationalIdentityCard')}</li>
							<li>{t('Label_Withdrawal_Passport')}</li>
							<li>{t('Label_Withdrawal_DrivingLicense')}</li>
						</ul>
					</div>
					<div className='btnGroup'>
						<button
							className={kycFile ? 'btn-primary' : 'btn-disable'}
							onClick={onSubmit}
							disabled={!kycFile}
						>
							{t('Label_General_Submit')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export { KycPanel }
