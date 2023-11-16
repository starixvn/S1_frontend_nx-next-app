import { useCryptoWallet } from '@nx-next-app/features/F0002/providers'

const WalletList = () => {
	const { USDTDetail } = useCryptoWallet()

	if (!USDTDetail || USDTDetail.length === 0) return null

	return (
		<div className='bankAccount'>
			{USDTDetail.map(
				({ currencyId, usdtAddress, nickName, network, currencyName }) => (
					<div className='account' key={`${currencyId}-${usdtAddress}`}>
						<div className='nickName'>{nickName}</div>
						<div className='nickName'>
							{currencyName === network
								? network
								: `${currencyName}-${network}`}
						</div>
						<div className='icon icon-BTC'>{usdtAddress}</div>
					</div>
				)
			)}
		</div>
	)
}

export { WalletList }
