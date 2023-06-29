import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { isString } from 'lodash-es'

const Join = () => {
	const { push, query } = useRouter()
	const { t } = useTranslation()
	const fromRoute = isString(query['from']) ? query['from'] : paths.home.root

	return (
		<div>
			<div className='logoSwitch active'>
				<button
					data-testid='close_join_modal_btn'
					onClick={() => push(fromRoute)}
				>
					<div className='icon icon-close' />
				</button>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/logo_en_w.png`}
					alt='logo'
				/>
				<button className='switch'>
					<div className='switchBg right' />
					<div className='switchLogin'>
						<Link
							href={{
								pathname: paths.login.root,
								query: { from: fromRoute },
							}}
						>
							<a>{t('Label_General_LogIn')}</a>
						</Link>
					</div>
					<div className='switchJoin active'>
						<Link
							href={{
								pathname: paths.join.root,
								query: { from: fromRoute },
							}}
						>
							<a>{t('Label_General_Join')}</a>
						</Link>
					</div>
				</button>
				<div className='step'>
					<div className='stepLine'>
						<div />
					</div>
					<div className='circle active'>
						<div>
							<div>1</div>
						</div>
					</div>
					<div className='circle'>
						<div>
							<div>2</div>
						</div>
					</div>
					<div className='circle'>
						<div>
							<div>3</div>
						</div>
					</div>
				</div>
				<div className='Join'>
					<div className='infoModule '>
						<div className='inputInfo ' data-testid='inputInfo'>
							For security, we suggest that your username does not contain your
							real name.
						</div>
						<div className='inputBox '>
							<i className='icon icon-member' />
							<input
								data-testid='UserName_ipt'
								placeholder='Username'
								type='text'
								className='textRight'
								value=''
							/>
							<div className='icon-module'>
								<i data-testid='showTipBtn' className='icon icon-information' />
							</div>
						</div>
						<div className='tip' data-testid='UserName_msg' />
					</div>
					<div className='infoModule'>
						<div className='inputBox '>
							<i className='icon icon-key' />
							<input
								data-testid='Password_ipt'
								type='password'
								placeholder='Password'
								value=''
							/>
							<div className='icon-module'>
								<i data-testid='showPsw' className='icon icon-eye-blocked' />
							</div>
						</div>
					</div>
					<div className='infoModule'>
						<div className='inputBox '>
							<i className='icon icon-key' />
							<input
								data-testid='ConfirmPwd_ipt'
								type='password'
								placeholder='Confirm Password'
								value=''
							/>
							<div className='icon-module'>
								<i data-testid='showPsw' className='icon icon-eye-blocked' />
							</div>
						</div>
					</div>
					<div className='infoModule '>
						<div className='inputInfo ' data-testid='inputInfo'>
							FULL NAME must match with your valid ID name, it is forbidden to
							fill in special symbols
						</div>
						<div className='inputBox '>
							<i className='icon icon-member' />
							<input
								data-testid='RealName_ipt'
								placeholder='Real Name'
								type='text'
								className='textRight'
								value=''
							/>
							<div className='icon-module'>
								<i data-testid='showTipBtn' className='icon icon-information' />
							</div>
						</div>
						<div className='tip' data-testid='RealName_msg' />
					</div>
					<div className='infoModule '>
						<div className='inputInfo ' data-testid='inputInfo'>
							Please enter Affiliate ID (Optional), it can not change once
							enter!
						</div>
						<div className='inputBox '>
							<i className='icon icon-affiliate' />
							<input
								data-testid='AffiliateId_ipt'
								placeholder='Affiliate ID/Referral'
								type='text'
								className='textRight'
								value=''
							/>
							<div className='icon-module'>
								<i data-testid='showTipBtn' className='icon icon-information' />
							</div>
						</div>
						<div className='tip' data-testid='AffiliateId_msg' />
					</div>
					<div className='Terms'>
						By clicking the JOIN NOW button, I hereby acknowledge that I am
						above 18 years old and have read and accepted your{' '}
						<a
							rel='noreferrer'
							target='_blank'
							href='https://banner.0814media.net/Static/my_en/TermsConditions.html'
						>
							Terms And Conditions
						</a>
						.
					</div>
					<div className='btn-group'>
						<button data-testid='next'>Join Now</button>
					</div>
					<a href='/en/'>
						<div className='visit'>
							I would like to visit !<i className='icon icon-visit' />
						</div>
					</a>
				</div>
				<div className='features'>
					<div className='title'>
						<span className='icon icon-star-full' />
						FEATURES
					</div>
					<div className='title'>MEMBER BENEFITS</div>
					<ul>
						<li>SPORTSBOOK WELCOME BONUS</li>
						<li>LIVE CASINO WELCOME BONUS</li>
						<li>SLOT GAME WELCOME BONUS</li>
						<li>DAILY CASH REBATE UP TO 2.0%</li>
					</ul>
					<div className='title'>
						ENJOY NOVA88 VIP EXCLUSIVE BONUS &amp; REBATES
					</div>
					<ul>
						<li>
							Multiple product platforms with better odds and full gameplay
							experience.
						</li>
						<li>Speedy deposit and withdrawal with multiple deposit option.</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Join
