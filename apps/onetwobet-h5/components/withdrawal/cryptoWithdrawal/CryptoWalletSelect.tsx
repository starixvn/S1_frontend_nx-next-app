import classNames from 'classnames'

import { useCryptoWallet, useWithdrawal } from '@nx-next-app/operations'

const CryptoWalletSelect = () => {
	const { withdrawalType, bankData, selectedBankInfo, handleSelectCard } =
		useWithdrawal()
	const { usdtDetail } = bankData
	const { handleAddWallet } = useCryptoWallet()

	const banks = (() => {
		return usdtDetail.map(item => {
			const {
				usdtAddress,
				currencyName,
				disabled,
				currencyId,
				nickName,
				network,
			} = item
			const selected =
				selectedBankInfo?.usdtAddress === usdtAddress &&
				selectedBankInfo?.currencyName === currencyName
			return (
				<div
					className={classNames('account', {
						active: selected,
						pending: disabled,
					})}
					key={`${usdtAddress}-${currencyId}`}
					onClick={() =>
						handleSelectCard({
							usdtAddress,
							nickName,
							currencyId,
							network,
							currencyName,
							type: withdrawalType,
						})
					}
				>
					<div className='nickName'>{nickName}</div>
					<div className='nickName'>
						{currencyName === network
							? currencyName
							: `${currencyName}-${network}`}
					</div>
					<div className='icon icon-USDT'>{usdtAddress}</div>
					{disabled ? <div className='mask' /> : null}
				</div>
			)
		})
	})()

	return (
		<div className='bankAccount'>
			{banks}
			{usdtDetail?.length < 3 && (
				<div key='add bank' className='account' onClick={handleAddWallet}>
					<div className='icon icon-plus text-org' />
				</div>
			)}
		</div>
	)
}

export { CryptoWalletSelect }
