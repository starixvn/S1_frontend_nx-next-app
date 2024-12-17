import { SettingCollapse } from '@nx-next-app/components/H0001'
import { LANG_GROUP_COUNTRY, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { isEqual } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const List = () => {
	const { t } = useTranslation()

	const { push, reload } = useRouter()
	const [rootUrl, setRootUrl] = useState('')
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
	useEffect(() => {
		setRootUrl(window.location.origin)
	})

	return (
		<SettingCollapse>
			<SettingCollapse.Item
				imgName='icon-u_globe'
				header={t('Label_General_Languages')}
				defaultActive
			>
				<div className={classNames('country-current', { after: isLogin })}>
					<div className='country-item'>
						<div className='country-title'>
							<div>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/${icon}.jpg`}
									alt='country'
								/>
							</div>
						</div>
						<div>
							<div>{LANG_GROUP_COUNTRY[icon || 'th']}</div>
							<div className='group-button'>
								{languageGroup[icon || 'th']?.map(
									({ displayText, currencyId, value }) => {
										return (
											<button
												key={`languageGroup-${value}`}
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
					{!isLogin && (
						<div className='country'>
							{Object.entries(languageGroup).length > 2 &&
								Object.entries(languageGroup).map(([lang, items]) => {
									return (
										<div
											key={`${lang}-${items}`}
											className={classNames(
												'country-item country-item-child ',
												{
													active: lang === icon,
												}
											)}
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
				</div>
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='icon-file-fill-pc'
				header={t('Label_General_OurPolicies')}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_ResponsibleGaming')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/TermsConditions.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`} // 2024.8.22 需求說先改成統一導到en語系
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_TermsConditions')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PrivacyPolicy.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_PrivacyPolicy')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/CookiePolicy.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_CookiePolicy')}
				</a>
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='icon-help-circle-outline'
				header={t('Label_General_HelpSupport')}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/RulesandRegulations.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_RuleRegulations')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AccountTerms.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_AccountTerms')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/FAQ.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_FAQ')}
				</a>
			</SettingCollapse.Item>

			<SettingCollapse.Item
				imgName='icon-ns-site'
				header={String(process.env['NEXT_PUBLIC_BRAND_NAME']).toUpperCase()}
			>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_AboutUs')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_Terms')}
				</a>
				<a
					href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html?url=${rootUrl}/${langId}&siteName=${process.env['NEXT_PUBLIC_SITE_NAME']}&imageUrl=${process.env['NEXT_PUBLIC_BANNER_HOST']}&lang=${langId}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{t('Label_General_ContactUs')}
				</a>

				{/* <a href={`/${langId}/milestones`}>{t('Label_General_Milestone')}</a> */}
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
