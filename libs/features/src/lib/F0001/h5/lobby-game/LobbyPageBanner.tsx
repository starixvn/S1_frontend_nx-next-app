import { LoadingIcon, NoGameIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import { Img } from "react-image";

type IBanner = {
	src: string
	alt: string
}
const LobbyPageBanner: React.FC<IBanner> = (props: IBanner) => {
	const { src, alt } = props

	return (
		<div className='banner-container'>
			<Img
				className='img-banner'
				src={src}
				loader={<LoadingIcon />}
				unloader={<NoGameIcon />}
				alt={alt}
			/>
		</div>
	)
}

export default LobbyPageBanner
