import { useGlobalData } from '@nx-next-app/data-access'

export const bannerUrl = (url: string) => {
	const { bannerDomain } = useGlobalData()
	return bannerDomain ? `https://${bannerDomain}${url}` : url
}
export const imageUrl = (url: string) => {
	const { imgDomain } = useGlobalData()
	return imgDomain ? `https://${imgDomain}${url}` : url
}
export const paymentUrl = (url: string) => {
	const { paymentDomain } = useGlobalData()
	return paymentDomain ? `https://${paymentDomain}${url}` : url
}
