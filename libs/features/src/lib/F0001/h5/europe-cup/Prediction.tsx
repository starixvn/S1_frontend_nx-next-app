import classNames from 'classnames'
import { upperFirst } from 'lodash-es'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths, PRODUCTS } from '@nx-next-app/constants'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useEuropeCup } from '@nx-next-app/features/F0001/hooks/useEuropeCup'
import { CupEventUserTicketStatus, type IGroupData } from '@nx-next-app/service'
import { Form } from '@nx-next-app/components/H0001'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { numFormatToDigits } from '@nx-next-app/utils'
import Select from './components/Select'

const LiveStreamingModalH5 = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const Prediction = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		auth: { isLogin },
	} = useAuth()
	const { onMenuOpen } = useMenu()

	const {
		europeEventTicketData,
		europeCupData: { mission1, mission2, mission3, mission4, groupsOptions },
		userData: { depositProgressPercentage, turnoverProgressPercentage },
		status: {
			mission1Completed,
			mission2Completed,
			mission3Completed,
			mission4Completed,
		},
		prediction: {
			data: {
				userTicket1tsData,
				userTicket2tsData,
				userTicket3tsData,
				userTicket4tsData,
				isParticipate,
				isUnParticipate,
			},
			formMethods,
			onSelectedGroup,
			onSubmitForm,
		},
	} = useEuropeCup()

	const { cupEventPromotionMissionProgress } = europeEventTicketData || {}

	const { setValue, watch, handleSubmit, getValues } = formMethods
	const convertOptionsFormat = (options: IGroupData[] | undefined) => {
		return options?.map(item => ({
			value: item.countryId,
			label: item.countryName,
			prefixOptionIcon: (
				<img
					src={`https://sportsimgs.0814media.net/Country%20Team/${upperFirst(
						item.imageName
					)}`}
					alt='country-icon'
				/>
			),
		}))
	}
	const switchTicketSubmitZone = (
		ticketStatus: CupEventUserTicketStatus | undefined,
		ticketType: number,
		ticketGroupType:
			| 'ticket1.group'
			| 'ticket2.group'
			| 'ticket3.group'
			| 'ticket4.group',
		ticketCountryType:
			| 'ticket1.countryId'
			| 'ticket2.countryId'
			| 'ticket3.countryId'
			| 'ticket4.countryId'
	): ReactNode => {
		const ticketStatusSubmitZone = {
			[CupEventUserTicketStatus.Active]: (
				<div className='btn-group'>
					<button
						className='btn-cancel'
						type='button'
						onClick={() => {
							setValue(ticketGroupType, undefined)
							setValue(ticketCountryType, null)
						}}
					>
						{t('Label_General_Cancel')}
					</button>
					<button
						className={classNames('btn-submit', {
							disable: !getValues(ticketCountryType),
						})}
						type='submit'
						onClick={handleSubmit(() =>
							onSubmitForm(ticketType, getValues(ticketCountryType))
						)}
						disabled={!getValues(ticketCountryType)}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			),
			[CupEventUserTicketStatus.Finish]: (
				<div className='btn-group'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/check-icon-blue.png`}
						alt='eurocup-check-icon'
					/>
					<p>{t('Label_EuropeCup_Ticket_Has_Been_Used')}</p>
				</div>
			),
			[CupEventUserTicketStatus.UnStarted]: (
				<div className='btn-group'>
					<button className='btn-cancel' type='button'>
						{t('Label_General_Cancel')}
					</button>
					<button className='btn-submit' type='submit'>
						{t('Label_General_Submit')}
					</button>
				</div>
			),
		}

		return (
			ticketStatusSubmitZone[ticketStatus || CupEventUserTicketStatus.Active] ||
			null
		)
	}

	const watchTicketOptions1 = convertOptionsFormat(
		onSelectedGroup(watch('ticket1.group'))
	)
	const watchTicketOptions2 = convertOptionsFormat(
		onSelectedGroup(watch('ticket2.group'))
	)
	const watchTicketOptions3 = convertOptionsFormat(
		onSelectedGroup(watch('ticket3.group'))
	)
	const watchTicketOptions4 = convertOptionsFormat(
		onSelectedGroup(watch('ticket4.group'))
	)

	const handleDeposit = () => {
		if (!isLogin) {
			push(paths.login.root)
			return
		}

		push(paths.deposit.root)
	}

	return (
		<div className='euro-predition'>
			<div className='top'>
				<div>
					<div className='title'>
						{t('Label_EuropeCup_Prediction')} {t('Label_EuropeCup_Tickets')}{' '}
					</div>
					<div className='subtitle'>
						{t('Label_EuropeCup_Collection_Accomplishments')}
					</div>
				</div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/tickets-2.png`}
					alt='tickets-2'
				/>
			</div>
			<div
				className={classNames('euro-predition-content', {
					end: isUnParticipate,
				})}
			>
				{/* 任務成就 */}
				<div className='mask'>{t('Label_EuropeCup_Prediction_Dateline')}</div>
				<div
					className={classNames('euro-mission', {
						end: isParticipate,
					})}
				>
					<div className='mask'>{t('Label_EuropeCup_Prediction_Dateline')}</div>
					<div className='euro-mission-item'>
						<div className='title'>
							{t('Label_EuropeCup_Deposit_Mission')}
							<button onClick={handleDeposit}>
								{t('Label_EuropeCup_Deposit_Now')}
							</button>
						</div>
						<div className='euro-mission-status'>
							<div className='progressBar'>
								<div
									className='progressValue'
									style={{ width: `${depositProgressPercentage}%` }}
								>
									<div className='number'>
										{numFormatToDigits(
											cupEventPromotionMissionProgress?.depositAmount || 0
										)}
									</div>
								</div>
								<div
									className={classNames('progressItem', {
										active: mission1Completed,
									})}
								>
									<div className='value'>
										{numFormatToDigits(mission1 || 0)}
									</div>
								</div>
								<div
									className={classNames('progressItem', {
										active: mission2Completed,
									})}
								>
									<div className='value'>
										{numFormatToDigits(mission2 || 0)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='euro-mission-item'>
						<div className='title'>
							{t('Label_EuropeCup_Turnover_Mission')}
							<button
								onClick={() =>
									onMenuOpen(PRODUCTS.Soccer, {
										loginCallback: () => {
											push(paths.login.root)
										},
										messageCallBack: message => modal.error(message),
										liveStreamingCallback: () =>
											modal.open(<LiveStreamingModalH5 />),
									})
								}
							>
								{t('Label_General_BetNow')}
							</button>
						</div>
						<div className='euro-mission-status'>
							<div className='progressBar'>
								<div
									className='progressValue'
									style={{ width: `${turnoverProgressPercentage}%` }}
								>
									<div className='number'>
										{numFormatToDigits(
											cupEventPromotionMissionProgress?.turnoverSum || 0
										)}
									</div>
								</div>
								<div
									className={classNames('progressItem', {
										active: mission3Completed,
									})}
								>
									<div className='value'>
										{numFormatToDigits(mission3 || 0)}
									</div>
								</div>
								<div
									className={classNames('progressItem', {
										active: mission4Completed,
									})}
								>
									<div className='value'>
										{numFormatToDigits(mission4 || 0)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* 下注預測 */}
				<div className='euro-poll'>
					<div className='title'>
						{t('Label_EuropeCup_Champion_Prediction')}
					</div>
					<div
						className={classNames('euro-poll-item', {
							finished:
								userTicket1tsData?.ticketStatus ===
								CupEventUserTicketStatus.Finish,
							closed:
								userTicket1tsData?.ticketStatus ===
									CupEventUserTicketStatus.UnStarted ||
								!userTicket1tsData?.ticketStatus,
						})}
					>
						<Form>
							<div className='mask'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/lock-icon.png`}
									alt='eurocup-lock-icon'
									className='close-icon'
								/>
							</div>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/tickets-3.png`}
								alt='eurocup-tickets-3'
							/>
							<div className='title'>
								{t('Label_EuropeCup_Ticket', { number: 1 })}
							</div>
							<div className='inputBox-group'>
								<Select
									value={watch('ticket1.group')}
									placeholder={userTicket1tsData?.group}
									options={groupsOptions}
									disabled={
										userTicket1tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket1.group', value)
										// 清掉第二層狀態
										setValue('ticket1.countryId', null)
									}}
								/>
								<Select
									value={watch('ticket1.countryId') || undefined}
									options={watchTicketOptions1 || []}
									placeholder={userTicket1tsData?.countryName}
									disabled={
										userTicket1tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket1.countryId', value as number)
									}}
								/>
							</div>
							{switchTicketSubmitZone(
								userTicket1tsData?.ticketStatus,
								1,
								'ticket1.group',
								'ticket1.countryId'
							)}
						</Form>
					</div>
					<div
						className={classNames('euro-poll-item', {
							finished:
								userTicket2tsData?.ticketStatus ===
								CupEventUserTicketStatus.Finish,
							closed:
								userTicket2tsData?.ticketStatus ===
									CupEventUserTicketStatus.UnStarted ||
								!userTicket2tsData?.ticketStatus,
						})}
					>
						<Form>
							<div className='mask'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/lock-icon.png`}
									alt='eurocup-lock-icon'
									className='close-icon'
								/>
							</div>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/tickets-3.png`}
								alt='eurocup-tickets-3'
							/>
							<div className='title'>
								{t('Label_EuropeCup_Ticket', { number: 2 })}
							</div>
							<div className='inputBox-group'>
								<Select
									value={watch('ticket2.group')}
									placeholder={userTicket2tsData?.group}
									options={groupsOptions}
									disabled={
										userTicket2tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket2.group', value)
										// 清掉第二層狀態
										setValue('ticket2.countryId', null)
									}}
								/>
								<Select
									value={watch('ticket2.countryId') || undefined}
									options={watchTicketOptions2 || []}
									placeholder={userTicket2tsData?.countryName}
									disabled={
										userTicket2tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket2.countryId', value as number)
									}}
								/>
							</div>
							{switchTicketSubmitZone(
								userTicket2tsData?.ticketStatus,
								2,
								'ticket2.group',
								'ticket2.countryId'
							)}
						</Form>
					</div>
					<div
						className={classNames('euro-poll-item', {
							finished:
								userTicket3tsData?.ticketStatus ===
								CupEventUserTicketStatus.Finish,
							closed:
								userTicket3tsData?.ticketStatus ===
									CupEventUserTicketStatus.UnStarted ||
								!userTicket3tsData?.ticketStatus,
						})}
					>
						<Form>
							<div className='mask'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/lock-icon.png`}
									alt='eurocup-lock-icon'
									className='close-icon'
								/>
							</div>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/tickets-3.png`}
								alt='eurocup-tickets-3'
							/>
							<div className='title'>
								{t('Label_EuropeCup_Ticket', { number: 3 })}
							</div>
							<div className='inputBox-group'>
								<Select
									value={watch('ticket3.group')}
									placeholder={userTicket3tsData?.group}
									options={groupsOptions}
									disabled={
										userTicket3tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket3.group', value)
										// 清掉第二層狀態
										setValue('ticket3.countryId', null)
									}}
								/>
								<Select
									value={watch('ticket3.countryId') || undefined}
									options={watchTicketOptions3 || []}
									placeholder={userTicket3tsData?.countryName}
									disabled={
										userTicket3tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket3.countryId', value as number)
									}}
								/>
							</div>
							{switchTicketSubmitZone(
								userTicket3tsData?.ticketStatus,
								3,
								'ticket3.group',
								'ticket3.countryId'
							)}
						</Form>
					</div>
					<div
						className={classNames('euro-poll-item', {
							finished:
								userTicket4tsData?.ticketStatus ===
								CupEventUserTicketStatus.Finish,
							closed:
								userTicket4tsData?.ticketStatus ===
									CupEventUserTicketStatus.UnStarted ||
								!userTicket4tsData?.ticketStatus,
						})}
					>
						<Form>
							<div className='mask'>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/lock-icon.png`}
									alt='close-icon'
									className='close-icon'
								/>
							</div>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/tickets-3.png`}
								alt='tickets-4'
							/>
							<div className='title'>
								{t('Label_EuropeCup_Ticket', { number: 4 })}
							</div>
							<div className='inputBox-group'>
								<Select
									value={watch('ticket4.group')}
									placeholder={userTicket4tsData?.group}
									options={groupsOptions}
									disabled={
										userTicket4tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket4.group', value)
										// 清掉第二層狀態
										setValue('ticket4.countryId', null)
									}}
								/>
								<Select
									value={watch('ticket4.countryId') || undefined}
									options={watchTicketOptions4 || []}
									placeholder={userTicket4tsData?.countryName}
									disabled={
										userTicket4tsData?.ticketStatus !==
										CupEventUserTicketStatus.Active
									}
									onChange={value => {
										setValue('ticket4.countryId', value as number)
									}}
								/>
							</div>
							{switchTicketSubmitZone(
								userTicket4tsData?.ticketStatus,
								4,
								'ticket4.group',
								'ticket4.countryId'
							)}
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Prediction
