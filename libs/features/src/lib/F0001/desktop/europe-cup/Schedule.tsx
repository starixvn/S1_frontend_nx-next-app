import { useTranslation } from 'next-i18next'
import { UseEuropeCupProps } from '../../hooks/useEuropeCup'
import Group from './components/Group'
import Team from './components/Team'

interface IScheduleProps {
	europeCupProps: UseEuropeCupProps
}

const Schedule = ({ europeCupProps }: IScheduleProps) => {
	const { t } = useTranslation()
	const {
		schedule: { brackets, selectOptions },
	} = europeCupProps

	const getPropsForPosition = (position: string) => {
		const team = brackets[position]
		return team ?? { position }
	}

	return (
		<div className='euro-fixture active'>
			<div className='group-left'>
				<div className='group-col'>
					<Group
						teams={selectOptions['groupA']}
						name={t('Label_EuropeCup_GroupA')}
					/>
					<Group
						teams={selectOptions['groupB']}
						name={t('Label_EuropeCup_GroupB')}
					/>
					<Group
						teams={selectOptions['groupC']}
						name={t('Label_EuropeCup_GroupC')}
					/>
				</div>
				<div className='group-col-match'>
					<div className='group-row'>
						<div>
							<div className='group-two after-top'>
								<Team {...getPropsForPosition('1A')} />
								<Team {...getPropsForPosition('2C')} />
							</div>
							<div className='group-two after-bottom'>
								<Team {...getPropsForPosition('1B')} />
								<Team {...getPropsForPosition('3A/D/E/F')} />
							</div>
						</div>
						<div>
							<div className='group-two before'>
								<Team {...getPropsForPosition('W39')} />
								<Team {...getPropsForPosition('W37')} />
							</div>
						</div>
						<div>
							<div className='group-one'>
								<Team {...getPropsForPosition('W45')} />
							</div>
						</div>
					</div>
					<div className='group-row'>
						<div>
							<div className='group-two after-top'>
								<Team {...getPropsForPosition('2A')} />
								<Team {...getPropsForPosition('2B')} />
							</div>
							<div className='group-two after-bottom'>
								<Team {...getPropsForPosition('1C')} />
								<Team {...getPropsForPosition('3D/E/F')} />
							</div>
						</div>
						<div>
							<div className='group-two before'>
								<Team {...getPropsForPosition('W40')} />
								<Team {...getPropsForPosition('W38')} />
							</div>
						</div>
						<div>
							<div className='group-one'>
								<Team {...getPropsForPosition('W48')} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='group-middle'>
				<img
					className='logo'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/eurocup/fixture-logo.png`}
					alt=''
				/>
				<div className='group-final'>
					<div className='title'>{t('Label_EuropeCup_Final')}</div>
					<div className='group-item'>
						<Team {...getPropsForPosition('W49')} className='group-item-left' />
						<div className='vs'>VS</div>
						<Team
							{...getPropsForPosition('W50')}
							className='group-item-right'
						/>
					</div>
				</div>
			</div>
			<div className='group-right'>
				<div className='group-col'>
					<Group
						teams={selectOptions['groupD']}
						name={t('Label_EuropeCup_GroupD')}
					/>
					<Group
						teams={selectOptions['groupE']}
						name={t('Label_EuropeCup_GroupE')}
					/>
					<Group
						teams={selectOptions['groupF']}
						name={t('Label_EuropeCup_GroupF')}
					/>
				</div>
				<div className='group-col-match'>
					<div className='group-row'>
						<div>
							<div className='group-two after-top'>
								<Team {...getPropsForPosition('2D')} />
								<Team {...getPropsForPosition('2E')} />
							</div>
							<div className='group-two after-bottom'>
								<Team {...getPropsForPosition('1F')} />
								<Team {...getPropsForPosition('3A/B/C')} />
							</div>
						</div>
						<div>
							<div className='group-two before'>
								<Team {...getPropsForPosition('W41')} />
								<Team {...getPropsForPosition('W42')} />
							</div>
						</div>
						<div>
							<div className='group-one'>
								<Team {...getPropsForPosition('W46')} />
							</div>
						</div>
					</div>
					<div className='group-row'>
						<div>
							<div className='group-two after-top'>
								<Team {...getPropsForPosition('1D')} />
								<Team {...getPropsForPosition('2F')} />
							</div>
							<div className='group-two after-bottom'>
								<Team {...getPropsForPosition('1E')} />
								<Team {...getPropsForPosition('3A/B/C/D')} />
							</div>
						</div>
						<div>
							<div className='group-two before'>
								<Team {...getPropsForPosition('W43')} />
								<Team {...getPropsForPosition('W44')} />
							</div>
						</div>
						<div>
							<div className='group-one'>
								<Team {...getPropsForPosition('W47')} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Schedule
