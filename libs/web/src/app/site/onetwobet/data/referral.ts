interface IReferralInfo {
	name: string
	desktopImg: string
	h5Img: string
	hoverImg: string
	url: string
}

export const REFERRAL_SOCIAL_MEDIA = (
	refUrl: string,
	text: string
): IReferralInfo[] => {
	return [
		{
			name: 'facebook',
			desktopImg: '/desktop/img/icon-Facebook.png',
			h5Img: '/h5/img/icon-Facebook-1.png',
			hoverImg: '/desktop/img/icon-Facebook-1.png',
			url: `https://www.facebook.com/sharer/sharer.php?u=${refUrl}&quote=${text}`,
		},
		{
			name: 'whatsApp',
			desktopImg: '/desktop/img/icon-WhatsApp.png',
			h5Img: '/h5/img/icon-WhatsApp-1.png',
			hoverImg: '/desktop/img/icon-WhatsApp-1.png',
			url: `https://wa.me/?text=${text} ${refUrl}`,
		},
		{
			name: 'telegram',
			desktopImg: '/desktop/img/icon-Telegram.png',
			h5Img: '/h5/img/icon-Telegram-1.png',
			hoverImg: '/desktop/img/icon-Telegram-1.png',
			url: `https://t.me/share/url?url=${refUrl}&text=${text}`,
		},
		{
			name: 'line',
			desktopImg: '/desktop/img/icon-Line.png',
			h5Img: '/h5/img/icon-Line-1.png',
			hoverImg: '/desktop/img/icon-Line-1.png',
			url: `http://line.naver.jp/R/msg/text/?${text}%0D%0A${refUrl}`,
		},
	]
}
