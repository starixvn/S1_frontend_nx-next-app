import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0006'
import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/features/F0006/providers'

const WithdrawalHeader = () => {
	const { t } = useTranslation()
	const { withdrawalAllowed } = useWithdrawal()

	// 根據 allowed 權限生成上方 tags
	const bankCardTags = (() => {
		const { bankCardAllowed, eWalletCardAllowed, cryptoCardAllowed } =
			withdrawalAllowed
		const tags = []

		if (bankCardAllowed) {
			tags.push({
				href: paths.withdrawal.root,
				label: t('Label_General_Withdrawal'),
			})
		}
		if (eWalletCardAllowed) {
			tags.push({
				href: paths.eWalletWithdrawal.root,
				label: t('Label_General_EWalletWithdrawal'),
			})
		}
		if (cryptoCardAllowed) {
			tags.push({
				href: paths.cryptoWithdrawal.root,
				label: t('Label_General_CryptoWithdrawal'),
			})
		}

		return tags
	})()

	return (
		<Header className='header'>
			<Header.Tags
				tags={[
					{
						href: paths.withdrawal.root,
						label: t('Label_General_Withdrawal'),
						subPaths: bankCardTags.map(({ href }) => href),
					},
					{
						href: paths.withdrawalHistory.root,
						label: t('Label_General_WithdrawalHistory'),
					},
				]}
			/>
			<Header.Tags className='tag' tags={bankCardTags} />
		</Header>
	)
}

export { WithdrawalHeader }
