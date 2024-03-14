import { useBankInfo } from '@nx-next-app/features/F0006/providers'

const CardList = () => {
	const { bankInfoDetail, handleDeleteCard } = useBankInfo()

	if (!bankInfoDetail || bankInfoDetail.length === 0) return null

	return (
		<div className='infoModule'>
			<div className='walletModule'>
				<div className='addBank haveBank'>
					{bankInfoDetail.map(({ bankName, bankLogo, accountNo, sysId }) => (
						<div className='addBankName' key={sysId}>
							<div className='addBankInfo'>
								<div className='bankName'>
									<img
										alt={bankName}
										src={`${
											process.env['NEXT_PUBLIC_PAYMENT_HOST']
										}/square/${bankLogo.toLowerCase()}`}
										style={{ width: '45px', height: '45px' }}
									/>
								</div>
							</div>
							<div className='addBankInfo'>
								<div className='txt-blue'>{accountNo}</div>
								<button
									className='icon icon-bin'
									onClick={() => handleDeleteCard({ accountNo, sysId })}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export { CardList }
