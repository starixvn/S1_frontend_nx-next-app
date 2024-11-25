import { Img } from '@nx-next-app/components/D0001'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const Step2 = () => {
	const { t } = useTranslation()

	const { setStep, setSelBank, bankInfoSysList } = useBankInfo()

	return (
		<div className='group-bank-icon'>
			<button
				className='icon icon-arrow-left-line'
				onClick={() => setStep(1)}
			/>
			<div className='subModuleList'>
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
	)
}

export { Step2 }
