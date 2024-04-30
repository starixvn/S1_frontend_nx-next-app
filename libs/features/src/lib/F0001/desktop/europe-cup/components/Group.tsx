import Team, { ITeamProps } from './Team'

const Group = ({ name, teams }: { name: string; teams: ITeamProps[] }) => (
	<div className='group-match'>
		<div className='title'>{name}</div>
		{teams?.map(({ countryName, imageName }) => (
			<Team key={countryName} countryName={countryName} imageName={imageName} />
		))}
	</div>
)

export default Group
