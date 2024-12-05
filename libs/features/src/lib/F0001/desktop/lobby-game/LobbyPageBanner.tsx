import { LoadingIcon, NoGameIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { Img } from "react-image";

type IBanner = {
	src: string
	alt: string
}
const LobbyPageBanner: React.FC<IBanner> = (props: IBanner) => {
	const { src, alt } = props

	return (
		<div className='banner-container'>
			<div className='content-container'>
				<Img
					className='img-banner'
					src={src}
					loader={<LoadingIcon />}
					unloader={<NoGameIcon />}
					alt={alt}
				/>
			</div>
		</div>
	)
}

export default LobbyPageBanner
