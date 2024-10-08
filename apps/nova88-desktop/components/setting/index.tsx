/* eslint-disable react/self-closing-comp */ // << 設計的線是使用空div標籤，搭配 classNameName，但 esLint 會報錯，所以先關掉此規則

import { useAuth } from '@nx-next-app/data-access'

import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from './ChangePasswordForm'
import { DepositModeChange } from './DepositModeChange'
import { NotificationSetting } from './NotificationSetting'
import { SocialConnect } from './SocialConnect'

const Setting = () => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='setting-title'>{t('Label_General_Setting')}</span>
				</div>
				<div className='setting-container'>
					<NotificationSetting />
					<DepositModeChange />
					<div className='bottom-line'></div>
				</div>

				<div className='setting-container'>
					<div className='setting-subtitle'>
						{t('Label_General_ChangePassword')}
					</div>
					<div className='setting-tip'>
						{t('Label_ChangePassword_ChangePasswordHint')}
					</div>
					<ChangePasswordForm />
				</div>

				{/* Line connect 僅在 THB 使用 */}
				{currencyId === CurrenciesEnum.THB && <SocialConnect />}
			</div>
		</div>
	)
}

export default Setting
