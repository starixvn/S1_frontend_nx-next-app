import Image from 'next/image'
import Carousel from '..'

const IMAGE_LIST: { alt: string; url: string }[] = []

// * 預設的 Pagination, Navigation, Autoplay 都會打開
export const BasicCarousel = () => {
	return (
		<Carousel>
			{IMAGE_LIST.map(item => (
				<div key={item.alt}>
					<Image src={item.url} alt={item.alt} height={365} width={1400} />
				</div>
			))}
		</Carousel>
	)
}

// * 關閉其中功能
export const BasicWithNoCore = () => {
	return (
		<Carousel navigation={false} pagination={false} autoplay={false}>
			{IMAGE_LIST.map(item => (
				<div key={item.alt}>
					<Image src={item.url} alt={item.alt} height={365} width={1400} />
				</div>
			))}
		</Carousel>
	)
}

// * 當設計有 over write css 時，可加入 class name
export const BasicWithClassName = () => {
	return (
		<Carousel className='testClassName'>
			{IMAGE_LIST.map(item => (
				<div key={item.alt}>
					<Image src={item.url} alt={item.alt} height={365} width={1400} />
				</div>
			))}
		</Carousel>
	)
}
