import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

enum AccordionEnum {
	Languages,
	OutPolicies,
	HelpSupport,
	Member,
}

const Setting = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const { userInfo, auth, onSignOut } = useAuth()
	const [accordionType, setAccordionType] = useState<AccordionEnum>()
	const handleSignOut = async () => {
		await onSignOut()
		router.push(paths.home.root)
	}

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_More')}</div>
			</Header>

			<main className='more'>
				{auth.isLogin && (
					<div className='tag'>
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
							<a className='icon icon-email' href='/cs/message'>
								{t('Label_General_Message')}
								<i className='quantity'>6</i>
							</a>
						</Link>
					</div>
				)}

				{!auth.isLogin && (
					<div className='tag'>
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
					</div>
				)}

				<div className='accordion'>
					{auth.isLogin && (
						<div>
							<a className='title icon icon-person' href={paths.myAccount.root}>
								{t('Label_General_MyAccount')}
							</a>
						</div>
					)}

					<div>
						<a className='title icon icon-medal' href={paths.vip.root}>
							VIP
						</a>
					</div>
					<div>
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
					</div>
					<div>
						<a className='title icon icon-trophy' href={paths.leaderboard.root}>
							{t('Label_General_LeaderBoard')}
						</a>
					</div>
					<div>
						<a
							className='title icon icon-affiliate'
							href={`${process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']}?lang=${
								userInfo.langId || 'en'
							}`}
						>
							{t('Label_General_Affiliate')}
						</a>
					</div>
					<div>
						<button
							className={classNames('title icon icon-sphere', {
								active: accordionType === AccordionEnum.Languages,
							})}
							onClick={() => setAccordionType(AccordionEnum.Languages)}
						>
							{t('Label_General_Languages')}
							<i className='icon icon-keyboard_arrow_down' />
						</button>
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
					</div>
					<div>
						<button
							className={classNames('title icon icon-policies', {
								active: accordionType === AccordionEnum.OutPolicies,
							})}
							onClick={() => setAccordionType(AccordionEnum.OutPolicies)}
						>
							{t('Label_General_OurPolicies')}
							<i className='icon icon-keyboard_arrow_down' />
						</button>
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
					</div>
					<div>
						<button
							className={classNames('title icon icon-question', {
								active: accordionType === AccordionEnum.HelpSupport,
							})}
							onClick={() => setAccordionType(AccordionEnum.HelpSupport)}
						>
							{t('Label_General_HelpSupport')}
							<i className='icon icon-keyboard_arrow_down' />
						</button>
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
					</div>
					<div>
						<button
							className={classNames('title icon icon-member', {
								active: accordionType === AccordionEnum.Member,
							})}
							onClick={() => setAccordionType(AccordionEnum.Member)}
						>
							{String(process.env['NEXT_PUBLIC_SITE_NAME']).toUpperCase()}
							<i className='icon icon-keyboard_arrow_down' />
						</button>
						<a
							href={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/my_cs/AboutUs.html`}
							target='_blank'
							rel='noreferrer noopener'
						>
							{t('Label_General_AboutUs')}
						</a>
						<a
							href={`${process.env['NEXT_PUBLIC_AFFILIATE_DOMAIN']}?lang=${
								userInfo.langId || 'en'
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
					</div>
					{auth.isLogin && (
						<div>
							<button className='title icon icon-exit' onClick={handleSignOut}>
								{t('Label_General_LogOut')}
							</button>
						</div>
					)}
				</div>
			</main>
		</>
	)
}

export default Setting
