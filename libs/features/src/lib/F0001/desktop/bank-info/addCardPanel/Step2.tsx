import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'

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
										<Image
											src={`${
												process.env['NEXT_PUBLIC_PAYMENT_HOST']
											}/square/${bankLogo.toLowerCase()}`}
											alt={bankName}
											width={43}
											height={43}
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
