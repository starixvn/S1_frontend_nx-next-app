import { useBankInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { Img } from '../../image'

const Step2 = () => {
	const { t } = useTranslation()

	const { setStep, setSelBank, bankInfoSysList } = useBankInfo()

	return (
		<>
			<div className='platformName'>
				<div className='icon icon-arrow-right2' />
				<div>
					<div>{t('Label_BankInfo_SelectBank')}</div>
				</div>
				<button className='icon icon-arrow-left2' onClick={() => setStep(1)} />
			</div>
			<div className='subModuleList'>
				<div className='subModule'>
					<div className='subModuleBody'>
						<ul>
							{bankInfoSysList.map(({ bankLogo, bankName, sysId }) => (
								<li key={sysId}>
									<a>
										<Img
											src={`${
												process.env['NEXT_PUBLIC_PAYMENT_HOST']
											}/square/${bankLogo?.toLowerCase()}`}
											alt={bankName}
											onClick={() => {
												setSelBank({ bankLogo, bankName, sysId })
												setStep(3)
											}}
										/>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export { Step2 }
