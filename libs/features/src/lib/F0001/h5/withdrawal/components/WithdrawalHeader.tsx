import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'

const WithdrawalHeader = () => {
	const { t } = useTranslation()
	const { withdrawalAllowed } = useWithdrawal()

	// 根據 allowed 權限生成上方 tags
	const bankCardTags = (() => {
		const { bankCardAllowed, eWalletCardAllowed } = withdrawalAllowed
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
		tags.push({
			href: paths.cryptoWithdrawal.root,
			label: t('Label_General_CryptoWithdrawal'),
		})
		return tags
	})()

	return (
		<Header className='header'>
			<Header.Tags
				tags={[
					{
						href: paths.withdrawal.root,
						label: t('Label_General_Withdrawal'),
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
