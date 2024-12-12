import { Header } from '@nx-next-app/components/H0001'
import { WrapperWithdrawalH5 } from '@nx-next-app/features/F0001/h5/withdrawal/styles'
import {
	useKycUploader,
	useWithdrawal,
} from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { Img } from 'react-image'

const Kyc = () => {
	const { t } = useTranslation()
	const { handleUploadKyc } = useWithdrawal()
	const { onSubmit, kycFile, onChangeInput } = useKycUploader(handleUploadKyc)

	return (
		<WrapperWithdrawalH5>
			<Header className='header submit-photo'>
				<div className='title'>{t('Label_Withdrawal_SubmitPhotoId')}</div>
			</Header>
			<main className='main kyc submit-photo'>
				<span className='text-org '>
					{t('Label_Withdrawal_SubmitPhotoIdHint')}
				</span>
				<div className='infoModule parts'>
					<label className='inputBox'>
						{!kycFile && <i className='icon icon-add-fill' />}
						<Img
							className='img'
							src={kycFile?.fileImg as string}
							alt={kycFile?.fileData.name}
						/>
						<input
							type='file'
							accept='image/*'
							onChange={e => {
								onChangeInput(e)
							}}
						/>
					</label>
					<div className='btnGroup'>
						<button
							className={kycFile ? 'btn-primary' : 'btn-disable'}
							onClick={onSubmit}
						>
							{t('Label_General_Upload')}
						</button>
					</div>
				</div>
				<div className='kyc-bottom'>
					<div className='title'>
						{t('Label_Withdrawal_SubmitPhotoIdListTitle')}
					</div>
					<ul>
						<li>{t('Label_Withdrawal_NationalIdentityCard')}</li>
						<li>{t('Label_Withdrawal_Passport')}</li>
						<li>{t('Label_Withdrawal_DrivingLicense')}</li>
					</ul>
				</div>
			</main>
		</WrapperWithdrawalH5>
	)
}

export default Kyc
