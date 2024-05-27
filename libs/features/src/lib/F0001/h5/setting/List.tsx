import classNames from 'classnames'
import { isEqual } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { LANG_GROUP_COUNTRY, paths } from '@nx-next-app/constants'
import { SettingCollapse } from '@nx-next-app/components/H0001'

const List = () => {
	const { t } = useTranslation()

	const { push, reload } = useRouter()

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
		onSignOut,
	} = useAuth()

	const { icon, languageGroup, onSetLanguage } = useLanguageGroup()

	const handleSignOut = async () => {
		await onSignOut()
		push(paths.home.root).then(() => reload())
	}

	return (
		<SettingCollapse>
			<SettingCollapse.Item
				imgName='languages'
				header={t('Label_General_Languages')}
				defaultActive
			>
				<div className={classNames('country-current', { after: isLogin })}>
					<div className='country-item'>
						<div className='country-title'>
							<div>
								<img
									src={`https://banner.0814media.net/h5/img/${icon}.jpg`}
									alt='country'
								/>
							</div>
						</div>
						<div>
							<div>{LANG_GROUP_COUNTRY[icon || 'ch']}</div>
							<div>
								{languageGroup[icon || 'ch']?.map(
									({ displayText, currencyId, value }) => {
										return (
											<button
												onClick={() =>
													onSetLanguage({
														langCode: value,
														currencyId,
													})
												}
												className={classNames({
													active: isEqual(
														{ langId, currencyId },
														{
															langId: value,
															currencyId,
														}
													),
												})}
											>
												{displayText}
											</button>
										)
									}
								)}
							</div>
						</div>
					</div>
				</div>
				{!isLogin && (
					<div className='country'>
						{Object.entries(languageGroup).map(([lang, items]) => {
							return (
								<div
									key={`${lang}-${items}`}
									className={classNames('country-item', {
										active: lang === icon,
									})}
								>
									<div className='country-title'>
										<div>
											<img
												src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${lang}.jpg`}
												alt={lang}
											/>
										</div>
									</div>
									<div>
										{items.map(languageItem => {
											if (!languageItem?.mainLanguage) return
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
								</div>
							)
						})}
					</div>
				)}
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='policies'
				header={t('Label_General_OurPolicies')}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_ResponsibleGaming')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/TermsConditions.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_TermsConditions')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PrivacyPolicy.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_PrivacyPolicy')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/CookiePolicy.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_CookiePolicy')}
				</a>
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='help'
				header={t('Label_General_HelpSupport')}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/RulesandRegulations.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_RuleRegulations')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AccountTerms.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_AccountTerms')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/FAQ.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_FAQ')}
				</a>
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='nova88'
				header={String(process.env['NEXT_PUBLIC_SITE_NAME']).toUpperCase()}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_AboutUs')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_Terms')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_ContactUs')}
				</a>

				<Link href={paths.gameProvider.root}>
					<a>{t('Label_General_GameProvider')}</a>
				</Link>
			</SettingCollapse.Item>

			{isLogin && (
				<button className='btn-logout' onClick={handleSignOut}>
					{t('Label_General_LogOut')}
				</button>
			)}
		</SettingCollapse>
	)
}

export default List
