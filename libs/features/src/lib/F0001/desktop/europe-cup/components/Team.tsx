const fallbackImgUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/eurocup/empty.svg`

export interface ITeamProps {
	countryName?: string
	imageName?: string
	position?: string
	className?: string
}

const Team = ({
	countryName,
	imageName,
	position,
	className = 'group-item',
}: ITeamProps) => {
	const imgSrc = imageName
		? `https://sportsimgs.0814media.net/Country%20Team/${imageName}`
		: fallbackImgUrl

	return (
		<div className={className}>
			<img
				src={imgSrc}
				alt=''
				onError={e => {
					e.currentTarget.src = fallbackImgUrl
				}}
			/>
			<div>{countryName || position}</div>
		</div>
	)
}

export default Team
