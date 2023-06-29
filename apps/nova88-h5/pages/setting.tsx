import React from 'react'
import Link from 'next/link'
import { includes } from 'lodash-es'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Setting } from '@nx-next-app/features/F0001/h5'
import { SettingCollapse } from '@nx-next-app/components/H0001'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'

const SettingPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: InitialPropsInterface) => {
	const { t } = useTranslation()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<Setting
						renderCollapse={({ isLogin, currencyId, langId }) => {
							return (
								<>
									{isLogin && (
										<SettingCollapse.Item
											header={() => (
												<Link href={paths.myAccount.root}>
													<a className='title icon icon-person'>
														{t('Label_General_MyAccount')}
													</a>
												</Link>
											)}
										/>
									)}

									{includes(ALLOWED_CURRENCIES.VIP, currencyId) && (
										<SettingCollapse.Item
											header={() => (
												<a
													className='title icon icon-medal'
													href={paths.vip.root}
												>
													VIP
												</a>
											)}
										/>
									)}

									{includes(ALLOWED_CURRENCIES.REWARDS, currencyId) && (
										<SettingCollapse.Item
											header={() => (
												<a
													className='title icon icon-star-full'
													href={`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`}
													target='_blank'
													rel='noreferrer'
												>
													{t('Label_General_Rewards')}

													<img
														src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/88rewards.png`}
														alt='Rewards'
													/>
												</a>
											)}
										/>
									)}

									{includes(ALLOWED_CURRENCIES.LEADER_BOARD, currencyId) && (
										<SettingCollapse.Item
											header={() => (
												<Link href={paths.leaderboard.root}>
													<a className='title icon icon-trophy'>
														{t('Label_General_LeaderBoard')}
													</a>
												</Link>
											)}
										/>
									)}

									{includes(ALLOWED_CURRENCIES.AFFILIATE, currencyId) && (
										<SettingCollapse.Item
											header={() => (
												<a
													className='title icon icon-affiliate'
													href={`${
														process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']
													}?lang=${langId || 'en'}`}
												>
													{t('Label_General_Affiliate')}
												</a>
											)}
										/>
									)}

									<SettingCollapse.Item
										header={isActive => (
											<button
												className={classNames('title icon icon-sphere', {
													active: isActive,
												})}
											>
												{t('Label_General_Languages')}
												<i className='icon icon-keyboard_arrow_down' />
											</button>
										)}
									>
										<div className='countryNew'>
											<div className='active'>
												<div className='countryName'>
													<img
														src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/ch.jpg`}
														alt='MY'
													/>
													Malaysia
												</div>
												<button className=''>English</button>
												<button className='active'>简体中文</button>
												<button className=''>Malay</button>
											</div>
										</div>
									</SettingCollapse.Item>

									<SettingCollapse.Item
										header={isActive => (
											<button
												className={classNames('title icon icon-policies', {
													active: isActive,
												})}
											>
												{t('Label_General_OurPolicies')}
												<i className='icon icon-keyboard_arrow_down' />
											</button>
										)}
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
										header={isActive => (
											<button
												className={classNames('title icon icon-question', {
													active: isActive,
												})}
											>
												{t('Label_General_HelpSupport')}
												<i className='icon icon-keyboard_arrow_down' />
											</button>
										)}
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
										header={isActive => (
											<button
												className={classNames('title icon icon-member', {
													active: isActive,
												})}
											>
												{String(
													process.env['NEXT_PUBLIC_SITE_NAME']
												).toUpperCase()}
												<i className='icon icon-keyboard_arrow_down' />
											</button>
										)}
									>
										<a
											href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/AboutUs.html`}
											target='_blank'
											rel='noreferrer noopener'
										>
											{t('Label_General_AboutUs')}
										</a>
										<a
											href={`${
												process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']
											}?lang=${langId || 'en'}`}
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
										<a href='/cs/game-provider'>
											{t('Label_General_GameProvider')}
										</a>
									</SettingCollapse.Item>
								</>
							)
						}}
					/>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default SettingPage
