import { Carousel, ICarouselProps } from '@nx-next-app/components/H0001'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'

interface ILinePayFormProps {
	redirectLink?: string
}

const LinePayForm = ({ redirectLink }: ILinePayFormProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { getBannerUrl } = useGlobalData()

	const params: ICarouselProps = {
		spaceBetween: 200,
		centeredSlides: true,
		autoplay: false,
		pagination: false,
		rebuildOnUpdate: true,
		navigation: false,
	}

	return (
		<div className='depositModule active'>
			<div className='downloadModule'>
				<div className='guideMark' />
				<Carousel {...params}>
					<a href={redirectLink} target='_blank' rel='noreferrer'>
						<img
							src={getBannerUrl(
								`/h5/img/line/ling-1_${langId === 'th' ? 'th' : 'en'}.png`
							)}
							alt='img-ling'
						/>
					</a>

					<a href={redirectLink} target='_blank' rel='noreferrer'>
						<img
							src={getBannerUrl(
								`/h5/img/line/ling-2_${langId === 'th' ? 'th' : 'en'}.png`
							)}
							alt='img-ling'
						/>
					</a>

					<a href={redirectLink} target='_blank' rel='noreferrer'>
						<img
							src={getBannerUrl(
								`/h5/img/line/ling-3_${langId === 'th' ? 'th' : 'en'}.png`
							)}
							alt='img-ling'
						/>
					</a>
				</Carousel>
			</div>
		</div>
	)
}

export default LinePayForm
