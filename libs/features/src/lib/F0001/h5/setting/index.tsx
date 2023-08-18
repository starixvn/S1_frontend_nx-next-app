import Link from 'next/link'
import classNames from 'classnames'
import { Header, SettingCollapse } from '@nx-next-app/components/H0001'
import { LANG_GROUP_COUNTRY, paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { includes, isEqual } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useGetMsgCountQuery } from '@nx-next-app/service'

const Setting = () => {
	const { push } = useRouter()
	const { t } = useTranslation()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null)
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
		onSignOut,
	} = useAuth()

	const handleSignOut = async () => {
		await onSignOut()
		push(paths.home.root)
	}

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_More')}</div>
			</Header>

			<main className='more'>
				<div className='tag'>
					{isLogin ? (
						<>
							<Link
								href={{
									pathname: paths.profile.root,
									query: { from: paths.setting.root },
								}}
							>
								<a className='icon icon-member'>{t('Label_General_Profile')}</a>
							</Link>
							<i />
							<Link href={paths.message.root}>
								<a className='icon icon-email'>
									{t('Label_General_Message')}
									{msgCount && <i className='quantity'>{msgCount}</i>}
								</a>
							</Link>
						</>
					) : (
						<>
							<Link
								href={{
									pathname: paths.join.root,
									query: { from: paths.setting.root },
								}}
							>
								<a>{t('Label_General_Join')}</a>
							</Link>
							<i />
							<Link
								href={{
									pathname: paths.login.root,
									query: { from: paths.setting.root },
								}}
							>
								<a>{t('Label_General_LogIn')}</a>
							</Link>
						</>
					)}
				</div>

				<SettingCollapse>
					{!isLogin && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-person'
							header={t('Label_General_MyAccount')}
							onClick={() => push(paths.myAccount.root)}
						/>
					)}

					{includes(ALLOWED_CURRENCIES['VIP'], currencyId) && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-medal'
							header='VIP'
							onClick={() => push(paths.vip.root)}
						/>
					)}

					{includes(ALLOWED_CURRENCIES['REWARDS'], currencyId) && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-star-full'
							onClick={() =>
								window.open(
									`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`,
									'rewards'
								)
							}
							header={
								<>
									{t('Label_General_Rewards')}
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/88rewards.png`}
										alt='Rewards'
									/>
								</>
							}
						/>
					)}

					{includes(ALLOWED_CURRENCIES['LEADER_BOARD'], currencyId) && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-trophy'
							onClick={() => push(paths.leaderBoard.root)}
							header={t('Label_General_LeaderBoard')}
						/>
					)}

					{includes(ALLOWED_CURRENCIES['AFFILIATE'], currencyId) && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-affiliate'
							onClick={() =>
								push(
									`${process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']}?lang=${
										langId || 'en'
									}`
								)
							}
							header={t('Label_General_Affiliate')}
						/>
					)}

					<SettingCollapse.Item
						prefixIcon='title icon icon-sphere'
						header={t('Label_General_Languages')}
					>
						<div className='countryNew'>
							{Object.entries(languageGroup).map(([lang, items]) => {
								return (
									<div
										key={`${lang}-${items}`}
										className={classNames({
											active: lang === icon,
										})}
									>
										<div className='countryName'>
											<img
												src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${lang}.jpg`}
												alt={lang}
											/>
											{LANG_GROUP_COUNTRY[lang]}
										</div>

										{items.map(languageItem => {
											return (
												<button
													key={`${languageItem.value}-${languageItem.currencyId}`}
													className={classNames({
														active: isEqual(
															{ langId, currencyId },
															{
																langId: languageItem.value,
																currencyId: languageItem.currencyId,
															}
														),
													})}
													type='button'
													onClick={() => {
														onSetLanguage({
															langCode: languageItem.value,
															currencyId: languageItem.currencyId,
														})
													}}
												>
													{languageItem.displayText}
												</button>
											)
										})}
									</div>
								)
							})}
						</div>
					</SettingCollapse.Item>

					<SettingCollapse.Item
						prefixIcon='title icon icon-policies'
						header={t('Label_General_OurPolicies')}
					>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/ResposibleGaming.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_ResponsibleGaming')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/TermsConditions.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_TermsConditions')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/PrivacyPolicy.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_PrivacyPolicy')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/CookiePolicy.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_CookiePolicy')}
						</a>
					</SettingCollapse.Item>

					<SettingCollapse.Item
						prefixIcon='title icon icon-question'
						header={t('Label_General_HelpSupport')}
					>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/RulesandRegulations.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_RuleRegulations')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/AccountTerms.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_AccountTerms')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/FAQ.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_FAQ')}
						</a>
					</SettingCollapse.Item>

					<SettingCollapse.Item
						prefixIcon='title icon icon-member'
						header={String(process.env['NEXT_PUBLIC_SITE_NAME']).toUpperCase()}
					>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/AboutUs.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_AboutUs')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']}?lang=${
								langId || 'en'
							}`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_Affiliate')}
						</a>
						<a href='/cs/contactUs'>{t('Label_General_ContactUs')}</a>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/Terms.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_Terms')}
						</a>
						<a href='/cs/game-provider'>{t('Label_General_GameProvider')}</a>
					</SettingCollapse.Item>

					{isLogin && (
						<SettingCollapse.Item
							prefixIcon='title icon icon-exit'
							header={t('Label_General_LogOut')}
							onClick={handleSignOut}
						/>
					)}
				</SettingCollapse>
			</main>
		</>
	)
}

export default Setting
