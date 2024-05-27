import { IMilestone, ISlide } from '@nx-next-app/types'

export const milestonesData: IMilestone[] = [
	{ year: '2020', index: 0, imgSrc: 'phone.png' },
	{ year: '2021', index: 1, imgSrc: 'amber.png' },
	{ year: '2022', index: 2, imgSrc: 'joe.png' },
	{ year: '2023', index: 3, imgSrc: 'fc.png' },
	{ year: '2024', index: 4, imgSrc: 'milan.png' },
]

export const slideData: ISlide = [
	{
		title: 'Label_Milestone_2020',
		subtitle: 'Label_Milestone_2020_Subtitle',
		content: 'Label_Milestone_2020_Content',
		imgSrc: 'phone.png',
		className: 'swiper-slide two',
	},
	{
		title: 'Label_Milestone_2021',
		subtitle: 'Label_Milestone_2021_Subtitle',
		content: 'Label_Milestone_2021_Content',
		imgSrc: 'amber.png',
		className: 'swiper-slide three',
	},
	{
		title: 'Label_Milestone_2022',
		subtitle: 'Label_Milestone_2022_Subtitle',
		content: 'Label_Milestone_2022_Content',
		imgSrc: 'joe.png',
		className: 'swiper-slide four',
	},
	{
		title: 'Label_Milestone_2023',
		subtitle: 'Label_Milestone_2023_Subtitle',
		content: 'Label_Milestone_2023_Content',
		imgSrc: 'fc.png',
		className: 'swiper-slide five',
	},
	{
		title: 'Label_Milestone_2024',
		subtitle: 'Label_Milestone_2024_Subtitle',
		content: 'Label_Milestone_2024_Content',
		imgSrc: 'milan.png',
		className: 'swiper-slide six',
	},
]
