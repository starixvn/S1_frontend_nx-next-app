import { Header } from '@12b-h5/components/common'
import { useTranslation } from 'next-i18next'

import { useKycUploader, useWithdrawal } from '@nx-next-app/operations'

const Kyc = () => {
	const { t } = useTranslation()
	const { handleUploadKyc } = useWithdrawal()
	const { onSubmit, kycFile, onChangeInput } = useKycUploader(handleUploadKyc)

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_Withdrawal_SubmitPhotoId')}</div>
			</Header>
			<main className='main kyc'>
				<span className='text-org'>
					{t('Label_Withdrawal_SubmitPhotoIdHint')}
				</span>
				<div className='infoModule parts'>
					<label className='inputBox'>
						<i className='icon icon-folder-upload' />
						{`${kycFile ? kycFile.fileData.name : t('Label_Kyc_SelectFile')}`}
						<input
							type='file'
							accept='image/*'
							onChange={e => {
								onChangeInput(e)
							}}
						/>
					</label>
					<div className='btn-group'>
						<button className={kycFile ? '' : 'gray'} onClick={onSubmit}>
							{t('Label_General_Upload')}
						</button>
					</div>
				</div>
				<span>{t('Label_Withdrawal_SubmitPhotoIdListTitle')}</span>
				<div>
					<ul>
						<li>{t('Label_Withdrawal_NationalIdentityCard')}</li>
						<li>{t('Label_Withdrawal_Passport')}</li>
						<li>{t('Label_Withdrawal_DrivingLicense')}</li>
					</ul>
				</div>
			</main>
		</>
	)
}

export default Kyc
