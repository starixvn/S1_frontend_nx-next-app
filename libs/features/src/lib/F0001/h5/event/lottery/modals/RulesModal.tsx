import { useGlobalModal } from '@nx-next-app/components/config-provider'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'

const Collapsible = (props: { title: string; children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className={classNames('rules-item', { active: isOpen })}>
			<button className='title-group' onClick={() => setIsOpen(prev => !prev)}>
				<div className='title'>{props.title}</div>
				<div className='arrow' />
			</button>
			{isOpen && props.children}
		</div>
	)
}

const parseContent = (content: string) =>
	content.split('\n').map(line => {
		if (!line) return null
		const isHeading = line.startsWith('# ')
		const className = isHeading ? 'title' : undefined
		const text = isHeading ? line.slice(2) : line
		return (
			<li key={line} className={className}>
				{text}
			</li>
		)
	})

const RulesModal = () => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	return (
		<div id='popup' className='event-lottery-popup-mask active'>
			<div className='event-lottery-popup rules'>
				<div className='icon icon-close' onClick={closeModal} />
				<div className='popup-content'>
					<div className='title'>{t('Label_Event_Rules')}</div>
					<Collapsible title={t('Label_Event_EventDetails')}>
						<div className='content'>
							<div className='wrapper'>
								<div className='title'>
									{t('Label_Event_EventParticipation')}
								</div>
								<ul>
									{parseContent(
										t('Label_Event_Lottery_EventParticipation_Content')
									)}
								</ul>
							</div>
							<div className='wrapper'>
								<div className='title'>
									{t('Label_Event_TermsAndStandardRules')}
								</div>
								<ul>
									{parseContent(
										t('Label_Event_Lottery_TermsAndStandardRules_Content')
									)}
								</ul>
							</div>
						</div>
					</Collapsible>
					<Collapsible title={t('Label_Event_DrawMethod')}>
						<div className='content'>
							<div className='wrapper'>
								<div className='title'>{t('Label_Event_DrawMethod')}</div>
								<ul>
									{parseContent(t('Label_Event_Lottery_DrawMethod_Content'))}
								</ul>
							</div>
						</div>
					</Collapsible>
					<Collapsible title={t('Label_Event_JackpotRule')}>
						<div className='content'>
							<div className='wrapper'>
								<div className='jackpot-group'>
									<div
										className='jackpot-title'
										style={{ textTransform: 'uppercase' }}
									>
										{t('Label_Event_Jackpot')}
									</div>
									<div className='wrapper'>
										<div className='prize-group'>
											<span className='title'>{t('Label_Event_1stPrize')}</span>
											<div className='icon trophy' />
										</div>
										<div className='icon plus' />
										<div className='sticker-group'>
											<div className='title'>
												{t('Label_Event_JackpotSticker')}
											</div>
											<div className='icon sticker' />
										</div>
									</div>
								</div>
								<ul>
									{parseContent(t('Label_Event_Lottery_JackpotRule_Content'))}
								</ul>
							</div>
						</div>
					</Collapsible>
				</div>
			</div>
		</div>
	)
}

export default RulesModal
