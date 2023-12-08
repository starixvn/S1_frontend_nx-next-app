import { useCryptoWallet } from '@nx-next-app/features/F0002/providers'

const WalletList = () => {
	const { USDTDetail } = useCryptoWallet()

	if (!USDTDetail || USDTDetail.length === 0) return null

	return (
		<div className='infoModule'>
			<div className='walletModule'>
				<div className='addBank haveBank'>
					{USDTDetail.map(({ currencyId, usdtAddress, nickName }) => (
						<div className='addBankName' key={`${currencyId}-${usdtAddress}`}>
							<div className='cryptoInfo'>
								<i className='icon icon-USDT' />
								<div>{usdtAddress}</div>
							</div>
							<div className='walletNickname'>{nickName}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export { WalletList }
