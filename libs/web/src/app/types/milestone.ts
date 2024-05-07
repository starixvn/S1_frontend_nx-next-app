export interface IMilestone {
	year: string
	index: number
	imgSrc: string
}
interface ISlideItem {
	title: string
	subtitle: string
	content: string
	imgSrc: string
	className: string
}

export type ISlide = ISlideItem[]
