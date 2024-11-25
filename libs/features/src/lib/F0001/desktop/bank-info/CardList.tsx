import { WrapperCardAddBank } from '@nx-next-app/features/F0001/desktop/withdrawal/common/walletPanel/styles'
import { useBankInfo } from '@nx-next-app/features/F0001/providers'

const CardList = () => {
	const { bankInfoDetail, handleDeleteCard } = useBankInfo()

	if (!bankInfoDetail || bankInfoDetail.length === 0) return null

	return (
		<div className='infoModule'>
			<div className='walletModule'>
				<WrapperCardAddBank>
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
										<div className='group-bank-name'>
											<div className='bank-name'>{bankName}</div>
											<div className='txt-blue'>{accountNo}</div>
										</div>
									</div>
									<div className='checkbox-group'>
										<button
											className='icon icon-delete-bin-fill'
											onClick={() => handleDeleteCard({ accountNo, sysId })}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</WrapperCardAddBank>
			</div>
		</div>
	)
}

export { CardList }
