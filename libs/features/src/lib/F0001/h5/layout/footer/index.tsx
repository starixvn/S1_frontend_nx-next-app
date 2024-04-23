import Link from 'next/link'
import { includes } from 'lodash-es'
import classNames from 'classnames'
import { useBoolean } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGetMsgCountQuery } from '@nx-next-app/service'

const FOOTER_HOME_DOMAIN = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/footer`

const LayoutFooter = () => {
	const { t } = useTranslation()
	const { value: isFooterPopupActive, toggle: toggleIsFooterPopupActive } =
		useBoolean()
	const {
		userInfo: { langId, currencyId },
		auth: { isLogin },
	} = useAuth()
	const router = useRouter()
	const { pathname } = router
	const { ALLOWED_CURRENCIES, LIVE_CHAT_ID_BY_LANG_ID } = useStaticData()

	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null, {
		skip: !isLogin,
	})

	// 廣告商用的事件記錄器，綁在 DepositButton 底下
	const handleYuriAddToCartClick = () => {
		/* eslint no-underscore-dangle: 0 */
		if ((window as any)._yuri_track) {
			;(window as any)._yuri_track('AddToCart')
		}
	}

	// * 根據語系有不同的 LIVE CHAT ID, 默認為 en
	const liveChatUrl = `https://direct.lc.chat/${
		process.env['NEXT_PUBLIC_LIVECHAT_LICENSE']
	}/${LIVE_CHAT_ID_BY_LANG_ID[langId] || 'en'}`

	return (
		<>
			<footer id='footer' className='footer'>
				<Link href={paths.home.root} passHref>
					<a
						className={classNames('footer-item', {
							active: pathname === paths.home.root,
						})}
					>
						<img
							src={`${FOOTER_HOME_DOMAIN}/home${
								pathname === paths.home.root ? '-dark' : ''
							}.png`}
							alt='img-home'
						/>
						<span className='footer-title'>{t('Label_General_Home')}</span>
					</a>
				</Link>

				<Link href={paths.promotion.root} passHref>
					<a
						className={classNames('footer-item', {
							active: pathname === paths.promotion.root,
						})}
					>
						<img
							src={`${FOOTER_HOME_DOMAIN}/gift${
								pathname === paths.promotion.root ? '-dark' : ''
							}.png`}
							alt='img-gift'
						/>
						<span className='footer-title'>{t('Label_General_Promotion')}</span>
					</a>
				</Link>

				<a
					className={classNames('footer-item plus', {
						active: isFooterPopupActive,
					})}
					onClick={toggleIsFooterPopupActive}
				/>

				<a
					rel='noreferrer'
					target='_blank'
					href={liveChatUrl}
					className='footer-item'
				>
					<img src={`${FOOTER_HOME_DOMAIN}/livechat.png`} alt='img-livechat' />
					<span className='footer-title'>{t('Label_General_LiveChat')}</span>
				</a>

				<Link href={paths.setting.root} passHref>
					<a
						className={classNames('footer-item', {
							active: pathname === paths.setting.root,
							me: msgCount > 0,
						})}
					>
						<img
							src={`${FOOTER_HOME_DOMAIN}/me${
								pathname === paths.setting.root ? '-dark' : ''
							}.png`}
							alt='img-setting'
						/>
						<span className='footer-title'>{t('Label_General_Me')}</span>
					</a>
				</Link>
			</footer>

			<div
				className={classNames('footer-popup', {
					active: isFooterPopupActive,
				})}
			>
				<div className='footer-popup-item'>
					<Link href={paths.deposit.root}>
						<a onClick={handleYuriAddToCartClick}>
							<div className='footer-popup-img'>
								<img src={`${FOOTER_HOME_DOMAIN}/deposit.png`} alt='Deposit' />
							</div>
						</a>
					</Link>
					<div className='footer-popup-title'>{t('Label_General_Deposit')}</div>
				</div>
				<div className='footer-popup-item'>
					<Link href={paths.withdrawal.root}>
						<a>
							<div className='footer-popup-img'>
								<img
									src={`${FOOTER_HOME_DOMAIN}/withdrawal.png`}
									alt='Withdrawal'
								/>
							</div>
						</a>
					</Link>
					<div className='footer-popup-title'>
						{t('Label_General_Withdrawal')}
					</div>
				</div>
				{includes(ALLOWED_CURRENCIES['TRANSFER'], currencyId) && (
					<div className='footer-popup-item'>
						<Link href={paths.transferFunds.root}>
							<a>
								<div className='footer-popup-img'>
									<img
										src={`${FOOTER_HOME_DOMAIN}/transfer.png`}
										alt='Transfer'
									/>
								</div>
							</a>
						</Link>
						<div className='footer-popup-title'>
							{t('Label_General_Transfer')}
						</div>
					</div>
				)}
				<div className='footer-popup-item'>
					<Link href={paths.message.root}>
						<a>
							<div className='footer-popup-img'>
								<img src={`${FOOTER_HOME_DOMAIN}/massage.png`} alt='Message' />
							</div>
						</a>
					</Link>

					<div className='footer-popup-title'>{t('Label_General_Message')}</div>
				</div>
			</div>
		</>
	)
}

export default LayoutFooter
