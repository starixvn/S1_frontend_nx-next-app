/* eslint-disable react/self-closing-comp */ // << 設計的線是使用空div標籤，搭配 classNameName，但 esLint 會報錯，所以先關掉此規則
import { Header } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { ChangePassword } from './ChangePassword'
import { DepositModeChange } from './DepositModeChange'
import { NotificationSetting } from './NotificationSetting'
import { SocialConnect } from './SocialConnect'

const Setting = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()
	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_Setting')}</div>
			</Header>
			<main className='main setting'>
				<section className='inside'>
					<div className='setting-container'>
						<NotificationSetting />
						<DepositModeChange />
						<div className='bottom-line'></div>
					</div>
					<div className='setting-container'>
						<div className='setting-title'>
							{t('Label_General_ChangePassword')}
						</div>
						<div className='setting-tip'>
							{t('Label_ChangePassword_ChangePasswordHint')}
						</div>
						<ChangePassword />
					</div>

					{/* Line connect 僅用在 THB 使用 */}
					{currencyId === CurrenciesEnum.THB && <SocialConnect />}
				</section>
			</main>
		</>
	)
}

export default Setting
