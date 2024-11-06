import LoginModal from '@12b-indo-desktop/components/modal/LoginModal'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useJackPot } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const JackPot = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId },
		auth: { isLogin },
	} = useAuth()
	const jackpotCurrency = t(`Label_General_Currency_${currencyId}`)
	const { isJackPotLoaded } = useJackPot(jackpotCurrency)

	const handleDepositClick = () => {
		if (!isLogin) {
			modal.open(<LoginModal />)
			return
		}
		push(paths.deposit.root)
	}
	return (
		<div className='home-jackpots'>
			<div className='title'>{t('Label_Event_All_Jackpots').toUpperCase()}</div>
			<div className='content'>
				<div className='jackpots-amount'>
					{isJackPotLoaded && (
						<span className='currency'>{jackpotCurrency}</span>
					)}
					<span className='number' id='jpot-id' />
					{!isJackPotLoaded && (
						<span className='number'>{t('Label_Event_ComingSoon')}</span>
					)}
				</div>
			</div>
			<div className='btnGroup'>
				<Link href={paths.promotion.root} passHref>
					<button className='primary'>
						{t('Label_Promotions').toUpperCase()}
					</button>
				</Link>
				<button className='primary' onClick={handleDepositClick}>
					{t('Label_Deposit_Now').toUpperCase()}
				</button>
			</div>
		</div>
	)
}

export default JackPot
