import {
	ICryptoNetwork,
	IOTPSMSData,
	ISetCustCryptoWalletArgs,
} from '@nx-next-app/service'

export interface IAddWalletModalArgs {
	cryptoNetworkList: ICryptoNetwork[]
	cryptoCurrencyOptions: { value: number; label: string }[]
	handleGetOtpInfo: () => Promise<IOTPSMSData | undefined>
	handleSetCustCryptoWallet: (args: ISetCustCryptoWalletArgs) => Promise<void>
}
