const fallbackImgUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/empty.svg`

interface ITeamProps {
	position?: string
	countryName?: string
	imageName?: string
}

const Team = ({ countryName, imageName, position }: ITeamProps) => {
	const imgSrc = imageName
		? `https://minio-api.lumigame.com/s1-sportsimgs/Country%20Team/${imageName}`
		: fallbackImgUrl

	return (
		<div className='team'>
			<img
				src={imgSrc}
				alt='country-flag'
				onError={e => {
					e.currentTarget.src = fallbackImgUrl
				}}
			/>
			<div>{countryName || position}</div>
		</div>
	)
}

export default Team
