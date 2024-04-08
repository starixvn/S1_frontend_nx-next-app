import { IUsdtDetailData } from '@nx-next-app/service'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'

const CryptoCardItem = ({ item }: { item: IUsdtDetailData }) => {
	const { selectedBankInfo, handleSelectCard } = useWithdrawal()
	const { usdtAddress, currencyId, network, currencyName, disabled, nickName } =
		item

	const checked =
		usdtAddress === selectedBankInfo.usdtAddress &&
		currencyId === selectedBankInfo.currencyId

	const displayNetwork =
		network === currencyName ? network : `${currencyName}-${network}`

	const checkKey = `${currencyId}-${usdtAddress}`

	return (
		<div className={`addBankName ${disabled ? 'pending' : ''}`}>
			<div className='cryptoInfo'>
				<div className='title'>{nickName}</div>
				<div className='title'>{displayNetwork}</div>
				<i className='icon icon-USDT' />
				<div>{usdtAddress}</div>
				<div className='checkbox'>
					<input
						type='checkbox'
						id={checkKey}
						onChange={() => {
							handleSelectCard({
								usdtAddress,
								nickName,
								currencyId,
								network,
								currencyName,
								type: WithdrawalBankCardEnum.Crypto,
							})
						}}
						checked={checked}
					/>
					<label htmlFor={checkKey} className='icon icon-checkbox-checked' />
				</div>
				{disabled ? <div className='mask' /> : null}
			</div>
		</div>
	)
}

export { CryptoCardItem }
