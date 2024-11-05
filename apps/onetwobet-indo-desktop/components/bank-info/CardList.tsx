import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useBankInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const CardList = () => {
	const { bankInfoDetail, onDeleteCard } = useBankInfo()
	const { modal } = useGlobalModal()
	const { t } = useTranslation()

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
									onClick={() =>
										modal.confirm(
											<div>
												{t('Label_BankInfo_AreYouSureDelete')}
												<br />
												{t('Label_BankInfo_CantBeRestore')}
											</div>,
											{ onOK: () => onDeleteCard({ accountNo, sysId }) }
										)
									}
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
