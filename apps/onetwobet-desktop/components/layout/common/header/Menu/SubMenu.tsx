import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const LiveStreamingModalDesktop = dynamic(
	() => import('@12b-desktop/components/modal/LiveStreamingModal'),
	{ ssr: false }
)

interface ISubMenuProps {
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const subMenuIcon: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON as number]: null,
	[MenuIconTypeEnum.New as number]: <div className='new-icon'>NEW</div>,
}

const SubMenu = ({ debouncedMenuKey, setMenuKey }: ISubMenuProps) => {
	const { menuList = [], onMenuOpen } = useMenu()
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { modal } = useGlobalModal()

	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, subMenu, category } = mainMenuItem || {}

		const active = debouncedMenuKey === String(category)

		if (subMenu) {
			return (
				<div
					key={lobbyCategoryId}
					className={classNames(`${category.toLowerCase()}-list ${langId}`, {
						active,
					})}
					onMouseLeave={() => setMenuKey(undefined)}
				>
					<div className='container'>
						{subMenu?.map(subMenuItem => {
							// * 後端這裡是字串格式 需做處理
							const subMenuImage =
								subMenuItem?.pcHeaderPicUrl &&
								JSON.parse(subMenuItem?.pcHeaderPicUrl)[0]

							const displayName =
								subMenuItem?.currencyGameName &&
								subMenuItem?.currencyGameName[langId] &&
								subMenuItem?.currencyGameName[langId]

							const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

							const switchSubMenuIcon = (iconType: MenuIconTypeEnum) => {
								return subMenuIcon[iconType] || null
							}

							const submenuIcon =
								(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
									switchSubMenuIcon(iconType)) ||
								null
							return (
								<button
									key={subMenuItem?.tpGameIdNo}
									className={classNames({
										active: subMenuItem?.isTpMaintain,
									})}
									onMouseEnter={() => setMenuKey(debouncedMenuKey)}
									onClick={() => {
										onMenuOpen(subMenuItem, {
											loginCallback: () => modal.open(<LoginModal />),
											messageCallBack: message => modal.error(message),
											liveStreamingCallback: () =>
												modal.open(<LiveStreamingModalDesktop />),
										})
									}}
								>
									{submenuIcon}
									<img
										className='List-npc'
										src={subMenuImage}
										alt={subMenuItem?.productName}
									/>
									<span>{displayName || subMenuItem?.productName}</span>
									{subMenuItem?.isTpMaintain && (
										<div className='under'>
											{t('Label_General_UnderMaintenance')}
										</div>
									)}
								</button>
							)
						})}
					</div>
					{/* <!-- nav-footer --> */}
					<div className='nav-footer'>
						<ul>
							<li>
								<img
									src='https://banner.picasso12.com/desktop/img/lc-icon.png'
									alt=''
								/>
								官方博彩合作夥伴
							</li>
							<li>#BecauseExperienceMatters</li>
							<li>
								<img
									src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
									alt=''
								/>
								亞洲最佳賠率！
							</li>
							<li>
								<img
									src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
									alt=''
								/>
								快速及安全支付方式
							</li>
						</ul>
					</div>
				</div>
			)
		}

		return null
	})

	return (
		<div className='nav-container'>
			{menus}

			{/* TODO:以下記得刪掉 */}
			{/* TODO: 加上 active 控制hover要不要顯示下拉 */}
			{/* <!-- sport --> */}
			<div className='sports-list'>
				<div className='container'>
					<button className='under'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/soccerNPC.png'
							alt=''
						/>
						<span>Soccer</span>
						<div className='under-text'>Dalam Proses Penyelenggaraan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/sabssoccerNPC.png'
							alt=''
						/>
						{/* <!-- <i className="live"></i> --> */}
						<span>Sabs Soccer</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='under'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/basketballNPC.png'
							alt=''
						/>
						<span>Basketball</span>
						<div className='under-text'>Under maintenance</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/badmintonNPC.png'
							alt=''
						/>
						<span>Badminton</span>
						<div className='under-text'>Under maintenance</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/volleyballNPC.png'
							alt=''
						/>
						<span>Volleyball</span>
						<div className='under-text'>Under maintenance</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/sports/betradarsoccerNPC.png'
							alt=''
						/>
						<span>Virtual Sports</span>
						<div className='under-text'>Under maintenance</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- esport --> */}
			<div className='esports-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/esports/esportInplayMatrix.png'
							alt=''
						/>
						<span>IM E-Sports</span>
						<div className='under-text'>Under maintenance</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/esports/esportSABA.png'
							alt=''
						/>
						<span>Saba</span>
						<div className='under-text'>Under maintenance</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/esports/esportTFG.png'
							alt=''
						/>
						<span>TFGaming</span>
						<div className='under-text'>Under maintenance</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- casino --> */}
			<div className='casino-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotPP.png'
							alt=''
						/>
						<span>Pragmatic Play</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotSG.png'
							alt=''
						/>
						<span>Spadegaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotap.png'
							alt=''
						/>
						<span>AdvantPlay</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotEs.png'
							alt=''
						/>
						<span>Endorphina</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotamigo.png'
							alt=''
						/>
						<span>Amigo Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotNextspin.png'
							alt=''
						/>
						<span>Nextspin</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotPG.png'
							alt=''
						/>
						<span>PG Soft</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotbng.png'
							alt=''
						/>
						<span>BNG</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotmg.png'
							alt=''
						/>
						<span>Microgaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotji.png'
							alt=''
						/>
						<span>Jili</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotSPRIBE.png'
							alt=''
						/>
						<span className='active'>SPRIBE</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotJOKER.png'
							alt=''
						/>
						<span>Joker</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotpegasus.png'
							alt=''
						/>
						<span>Pegasus</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotnlc.png'
							alt=''
						/>
						<span>NoLimit City</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotrt.png'
							alt=''
						/>
						<span>Red Tiger</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotnt.png'
							alt=''
						/>
						<span>NetEnt</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotCQ9.png'
							alt=''
						/>
						<span>CQ9</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotplayngo.png'
							alt=''
						/>
						<span>Play' n GO</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotGPI.png'
							alt=''
						/>
						<span>Game Play</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotYGG.png'
							alt=''
						/>
						<span>YGGDrassil</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotAskMe.png'
							alt=''
						/>
						<span>Askmeslot</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotho.png'
							alt=''
						/>
						<span>Habanero</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotSimplePlay.png'
							alt=''
						/>
						<span>SimplePlay</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotsk.png'
							alt=''
						/>
						<span>Skywind</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/slot/slotpt.png'
							alt=''
						/>
						<span>PlayTech</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- live casino --> */}
			<div className='livecasino-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-PP.png'
							alt=''
						/>
						<span>Pragmatic Play</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						{/* <!-- <div className="new-icon">NEW</div> --> */}
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-woncasino.png'
							alt=''
						/>
						<span>Won Casino</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-bg.png'
							alt=''
						/>
						<span>Big Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-ev.png'
							alt=''
						/>
						<span>Evolution Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-AE.png'
							alt=''
						/>
						<span>AE Sexy</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-DG.png'
							alt=''
						/>
						<span>Dream Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-yb.png'
							alt=''
						/>
						<span>Evolution Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-SK.png'
							alt=''
						/>
						<span>Playtech</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-mg.png'
							alt=''
						/>
						<span>Dream Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-pt.png'
							alt=''
						/>
						<span>AE Casino</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-SA.png'
							alt=''
						/>
						<span>SA Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-ALL.png'
							alt=''
						/>
						<span>Allbet</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-ag.png'
							alt=''
						/>
						<span>Asia Gaming</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-WM.png'
							alt=''
						/>
						<span>WM Casino</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-we.png'
							alt=''
						/>
						<span>eBET</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-n2.png'
							alt=''
						/>
						<span>n2-LIVE</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/casino/casino-789.png'
							alt=''
						/>
						<span>n2-LIVE</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- fishing --> */}
			<div className='fishing-list'>
				<div className='container'>
					<button className='fsgw'>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/fishSG.png'
							alt=''
						/>
						<span>Fishing God</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fsgw'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/fishSGwar.png'
							alt=''
						/>
						<span>Fishing War</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fsgw'>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/fishzp.png'
							alt=''
						/>
						<span>Zombie Party</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fsgw'>
						<div className='new-icon'>NEW</div>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/fishah.png'
							alt=''
						/>
						<span>Alien Hunter</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fsgw'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/paradise.png'
							alt=''
						/>
						<span>Paradise</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fscai'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/fishGG.png'
							alt=''
						/>
						<span>Fishing World</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fscai'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/hb.png'
							alt=''
						/>
						<span>Fish Haiba</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fscai'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/hf5.png'
							alt=''
						/>
						<span>Happy Fish 5</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fscai'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/ma.png'
							alt=''
						/>
						<span>Moster Awaken</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
					<button className='fscai'>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/fishing/oneshotfishing.png'
							alt=''
						/>
						<span>Oneshot Fishing</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- number game --> */}
			<div className='numbergame-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-numberGame.png'
							alt=''
						/>
						<span>Number Game</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- keno --> */}
			<div className='keno-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-gpikeno.png'
							alt=''
						/>
						<span>Keno</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>

					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-lottery.png'
							alt=''
						/>
						<span>Keno</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>

			{/* <!-- lottery --> */}
			<div className='lottery-list'>
				<div className='container'>
					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-gpifast3.png'
							alt=''
						/>
						<span>Thai Lottery</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>

					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-tcg.png'
							alt=''
						/>
						<span>Fast 3</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>

					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-lottery.png'
							alt=''
						/>
						<span>Keno</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>

					<button>
						<img
							src='https://banner.picasso12.com/desktop/img/4.0/dropdown/lottery/lo-tableGame.png'
							alt=''
						/>
						<span>Number Game</span>
						<div className='under-text'>Sedang dalam pemeliharaan</div>
					</button>
				</div>
				{/* <!-- nav-footer --> */}
				<div className='nav-footer'>
					<ul>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/lc-icon.png'
								alt=''
							/>
							官方博彩合作夥伴
						</li>
						<li>#BecauseExperienceMatters</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/trophy-icon.png'
								alt=''
							/>
							亞洲最佳賠率！
						</li>
						<li>
							<img
								src='https://banner.picasso12.com/desktop/img/fast-and-safe.png'
								alt=''
							/>
							快速及安全支付方式
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SubMenu
