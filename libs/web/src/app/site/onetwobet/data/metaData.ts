import { paths } from '@nx-next-app/constants'
import { IMetaData } from '@nx-next-app/types'

const getAlternateLinks = (path: string) => [
	{
		rel: 'alternate',
		media: 'only screen and (max-width: 640px)',
		href: `https://smart.12bet.com/en/join`,
	},
	{ rel: 'canonical', href: `https://www.12bet.com/en${path}` },
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'en-MY',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'ms-MY',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'id-ID',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'th-TH',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'hi-IN',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'zh-MY',
	},
	{
		rel: 'alternate',
		href: `https://www.12bet.com/en${path}`,
		hrefLang: 'bn-BD',
	},
]

export const META_DATA: IMetaData = {
	[paths.home.root]: {
		en: {
			title: `Experience one of a kind betting with Asia's trusted brand 12BET`,
			description: `Asia's top-notch online gaming brand, 12BET, offers variety of outstanding Sports, BTiSports, Esports, Casino and Virtual Sports to bet on.`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		cs: {
			title: `12BET壹贰博官网｜狼队足球俱乐部合作伙伴`,
			description: `14年老牌娱乐网站，信誉有保障。产品包含：沙巴体育、BTi体育、IM电竞牛、Playtech、AG真人、VR彩票等，应有尽有畅玩无限。`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		id: {
			title: `12BET Indonesia Situs Judi Bola Dan Casino Online Resmi`,
			description: `12BET regional Indonesia merupakan salah satu situs judi online dengan permainan judi bola online dan live casino beserta judi slot online terpercaya Asia`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		th: {
			title: `12BET เว็บพนันที่มีความน่าเชื่อถือสูงกับประสบการณ์ในไทยมากกว่า10ปี`,
			description: `เรามีความสนุกให้คุณครบครัน ไม่ว่าจะเป็นการเดิมพันฟุตบอล อีสปอร์ต บาคาร่า หวย และอีกมากมายๆให้คุณได้เลือกเล่นตามความถนัด ที่ 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		my: {
			title: `Experience one of a kind betting with Asia's trusted brand 12BET`,
			description: `Asia's top-notch online gaming brand, 12BET, offers variety of outstanding Sports, BTiSports, Esports, Casino and Virtual Sports to bet on.`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		te: {
			title: `ఉత్తమ భారతీయ బెట్టింగ్ సైట్ | ఆన్‌లైన్ బెట్టింగ్ గేమ్‌లను ఆడండి - 12BET.com`,
			description: `భారతదేశంలోనే  ఉత్తమ చట్టపరమైన బెట్టింగ్ గేమ్‌ సైట్ - 12BET.com. నిజమైన పందెం గేమ్‌లను ఆన్‌లైన్‌లో ఆడండి. IPL, క్రికెట్, క్యాసినో & మరిన్నింటిలో మీ పందెం వెయ్యండి మరియు గెలవండి. ఉత్తమ బెట్టింగ్ `,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		bd: {
			title: `Experience one of a kind betting with Asia's trusted brand 12BET`,
			description: `Asia's top-notch online gaming brand, 12BET, offers variety of outstanding Sports, BTiSports, Esports, Casino and Virtual Sports to bet on. `,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		kh: {
			title: `Experience one of a kind betting with Asia's trusted brand 12BET`,
			description: `Asia's top-notch online gaming brand, 12BET, offers variety of outstanding Sports, BTiSports, Esports, Casino and Virtual Sports to bet on. `,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		vn: {
			title: `12BET - Nhà Cái Cá Cược Thể Thao Uy Tín`,
			description: `Vui cược bóng đá kèo châu Âu, châu Á, bóng rổ, casino, số đề online và liên tục nhận những ưu đãi hấp dẫn. Uy tín đã được khẳng định hơn 10 năm qua!`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
		ko: {
			title: `12벳: 온라인 베팅 | 최고의 베팅 배당률`,
			description: `12벳 안전한 해외 베팅업체로 빠른 충환전시스템 &보안, 다양한 스포츠 배당의 상한선을 제공합니다.`,
			keyword: ``,
			links: getAlternateLinks(paths.home.root),
		},
	},
	[paths.join.root]: {
		en: {
			title: `Only at 12BET where your gaming experience matters`,
			description: `Get a the complete list of your favorite games with the best odds offered here at 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		cs: {
			title: `12BET壹贰博官网｜免费注册`,
			description: `注册12BET，新会员可申请高达100%欢迎红利，投注无论输赢可享无限返水优惠。`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		th: {
			title: `สมัครสมาชิก 12BET วันนี้รับโบนัสต้อนรับและโปรโมชั่นมากมาย`,
			description: `สมัคร12BET เลยแล้วคุณจะไม่ผิดหวัง เว็บไซต์แทงบอลออนไลน์ ที่นำเสนออัตราต่อรองและค่าน้ำที่ดีที่สุดในเอเชีย ให้คุณคุ้มค่าทุกการเดิมพัน`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		id: {
			title: `Pendaftaran Di 12BET Situs Judi online Terbesar Dunia`,
			description: `Halaman pendaftaran 12BET selaku situs judi online terpercaya yang punya permainan lengkap serta bekerja sama dengan platform terbaik dunia`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		kh: {
			title: `Only at 12BET where your gaming experience matters`,
			description: `Get a the complete list of your favorite games with the best odds offered here at 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		te: {
			title: `12BET పుంటర్ లకు ఇది అగ్రశ్రేణి ఆన్‌లైన్ బెట్టింగ్ వెబ్‌సైట్`,
			description: `12BET వద్ద ఉత్తమ ఆడ్స్ లతో మీకు ఇష్టమైన గేమ్‌ల పూర్తి జాబితాలో పందెం వేయండి.`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		bd: {
			title: `Only at 12BET where your gaming experience matters`,
			description: `Get a the complete list of your favorite games with the best odds offered here at 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		vn: {
			title: `Đăng Ký Tài Khoản Tại Nhà Cái 12BET`,
			description: `Tạo tài khoản tại nhà cái 12BET để trải nghiệm và chiến thắng cùng những trò chơi đặc sắc, nhận ưu đãi lớn với rất nhiều chương trình khuyến mãi hấp dẫn. `,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
		ko: {
			title: `12BET회원가입 l 아시아 스포츠배팅& 라이브 카지노`,
			description: `12벳회원가입 후  높은 배당률의 라이브 스코어,스포츠 분석 &베팅을 즐기세요!`,
			keyword: ``,
			links: getAlternateLinks(paths.join.root),
		},
	},
	[paths.promotion.root]: {
		en: {
			links: getAlternateLinks(paths.promotion.root),
		},
		cs: {
			links: getAlternateLinks(paths.promotion.root),
		},
		th: {
			links: getAlternateLinks(paths.promotion.root),
		},
		id: {
			links: getAlternateLinks(paths.promotion.root),
		},
		kh: {
			links: getAlternateLinks(paths.promotion.root),
		},
		te: {
			links: getAlternateLinks(paths.promotion.root),
		},
		bd: {
			links: getAlternateLinks(paths.promotion.root),
		},
		vn: {
			links: getAlternateLinks(paths.promotion.root),
		},
		ko: {
			links: getAlternateLinks(paths.promotion.root),
		},
	},
	[paths.vip.root]: {
		en: {
			title: `Make yourself our top priority being a VIP member of 12BET!`,
			description: `See our 12VIP Program as we offer lucrative giveaways and lavish trips to reward our prestigious members!`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		th: {
			title: `12VIP คลับของคนเหนือระดับ`,
			description: `12BET ภูมิใจนำเสนอ 12VIP ที่จะทำให้คุณได้สัมผัสประสบการณ์ระดับ VIP กับการบริการที่เหนือไปอีกขั้นเพื่อให้ประสบการณ์เดิมพันของคุณพิเศษแล้วคุณจะรักชีวิตแบบVIP`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		id: {
			title: `12VIP Program Bagi Para Member Setia 12BET`,
			description: `12BET dengan bangga mempersembahkan program 12VIP bagi para member setia dengan memberikan layanan dan fitur khusus serta bonus paling besar`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		te: {
			title: `Make yourself our first priority being a VIP member of 12BET!`,
			description: `We offer lucrative giveaways and lavish trips to reward our prestigious members in 12VIP Program!`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		cs: {
			title: `12BET壹贰博官网｜12VIP至尊俱乐部`,
			description: `VIP至尊配套、优先办理及尊荣服务、VIP在线客服、存款回馈及负盈利返还。`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		bd: {
			title: `Make yourself our top priority being a VIP member of 12BET!`,
			description: `See our 12VIP Program as we offer lucrative giveaways and lavish trips to reward our prestigious members!`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		kh: {
			title: `Make yourself our top priority being a VIP member of 12BET!`,
			description: `See our 12VIP Program as we offer lucrative giveaways and lavish trips to reward our prestigious members!`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		vn: {
			title: `Tài Khoản VIP 12BET - Khẳng Định Bản Lĩnh, Xứng Tầm Đẳng Cấp`,
			description: `Tận hưởng những Ưu Đãi Độc Quyền chỉ dành riêng cho Thành viên VIP tại 12BET như tiền cược miễn phí, dịch vụ hỗ trợ ưu tiên, quà tặng VIP đẳng cấp v.v…`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
		ko: {
			title: `이벤트 12BET VIP | VIP카지노 & 온라인 카지노,12벳`,
			description: `12BET온라인 VIP카지노는 올해 전세계파워 50 E-게임 업체fh 럭셔리한 특전과 리워드를 지원합니다.`,
			keyword: ``,
			links: getAlternateLinks(paths.vip.root),
		},
	},
	[paths.sports.root]: {
		en: {
			title: `12BET provides quality and comprehensive odds`,
			description: `Always be on top of the game with competitive sportsbook and odds with our duo sports platform: 12Sports and BTi Sports. Visit us to find out more!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		cs: {
			title: `12BET壹贰博官网｜业内最佳体育平台`,
			description: `12BET在体育博彩及赔率方面处于业内领先地位，体验双重体育平台【12体育及BTi体育】为您带来的乐趣！欢迎成为我们的会员，并且尽情畅玩12BET。`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		th: {
			title: `12BET ให้ค่าน้ำเยอะที่สุดและประเภทการเดิมพันครอบคลุมทุกรูปแบบ`,
			description: `เว็บไซต์เดิมพันเกมกีฬาอันดับหนึ่งที่ให้ค่าน้ำเยอะที่สุดและอัตราต่อรองที่หลากหลาย มีให้เล่นมากถึง 2 แพลตฟอร์ม : หน้ากีฬา 12BET และ หน้ากีฬา BTi เชิญเข้าดูข้อมูลเพิ่มเติม!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		id: {
			title: `Odds yang meningkat & berkualitas di 12BET`,
			description: `Selalu berada di puncak permainan dengan Sportsbook dan odds menarik kami di 2 platform olahraga: 12Sports & BTi Sports. Kunjungi kami untuk tahu lebih banyak lagi!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		kh: {
			title: `12BET provides quality and comprehensive odds`,
			description: `Always be on top of the game with competitive sportsbook and odds with our duo sports platform: 12Sports and BTi Sports. Visit us to find out more!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		bd: {
			title: `12BET provides quality and comprehensive odds`,
			description: `Always be on top of the game with competitive sportsbook and odds with our duo sports platform: 12Sports and BTi Sports. Visit us to find out more!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		vn: {
			title: `12BET cung cấp tỷ lệ cược chất lượng và toàn diện nhất`,
			description: `Luôn dẫn đầu cung cấp các giải đấu phong phú và tỷ lệ cược tốt với bộ đôi: 12Thể thao và BTi Sports. Hãy ghé thăm chúng tôi để tìm hiểu thêm!`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
		ko: {
			title: `12BET 다양하고 높은 배당을 제공합니다 `,
			description: `12스포츠 & BTi 스포츠 듀오 플랫폼으로 전 세계적으로 가장 경쟁력 있는 스포츠 배당을 제공합니다 . 지금 확인하세요.`,
			keyword: ``,
			links: getAlternateLinks(paths.sports.root),
		},
	},
	[paths.eSport.root]: {
		en: {
			title: `12BET Esports will take you to the world of champions`,
			description: `Experience the trusted name in Esports betting that offers unbeatable odds for all major Esports events | 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		th: {
			title: `12BET ผู้นำการเดิมพันอีสปอร์ต ครบจบทุกเกมส์ Dota2,CSGO และอีกมากมาย`,
			description: `เดิมพันอีสปอร์ตกับรูปแบบเว็บไซต์ที่มีความเป็น Esport ให้คุณได้เพลิดเพลินกับสถิติต่างๆของผู้เล่นที่คุณชื่นชอบ วิเคราะห์ก่อนการเดิมพัน มีให้เดิมพันครบทุกเกมส์ ทุกทัวร์นาเมนต์ดัง`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		id: {
			title: `Judi Taruhan Esports Di Situs Resmi 12BET Indonesia`,
			description: `12BET menjadi salah satu pelopor permainan judi esports online atau yang lebih populer dengan taruhan esports untuk regional Asia termasuk Indonesia`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		te: {
			title: `12BET ఇస్పోర్ట్స్, ఛాంపియన్ల ప్రపంచాన్ని అనుభవించండి.`,
			description: `అన్ని ప్రధాన ఇస్పోర్ట్స్ ఈవెంట్‌లకు సాటిలేని ఆడ్స్ ను అందించే ఇస్పోర్ట్స్ బెట్టింగ్‌లో విశ్వసనీయ పేరు | 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		cs: {
			title: `12BET壹贰博官网｜电子竞技`,
			description: `提供双电竞投注平台，提供各类热门赛事如：王者荣耀、刀塔2、CS:GO、英雄联盟等，汇集全球赛事的专业电竞网站。`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		bd: {
			title: `12BET Esports will take you to the world of champions`,
			description: `Experience the trusted name in Esports betting that offers unbeatable odds for all major Esports events | 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		kh: {
			title: `12BET Esports will take you to the world of champions`,
			description: `Experience the trusted name in Esports betting that offers unbeatable odds for all major Esports events | 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		vn: {
			title: `12BET Cá Cược Thể Thao Điện Tử Trực Tuyến`,
			description: `Trổ tài dự đoán kết quả, đặt cược cho các game thủ và đội tuyển E-Sports yêu thích của bạn ở các bộ môn LOL, DOTA, CSGO,... và thắng lớn cùng 12BET!`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
		ko: {
			title: `12벳: 이스포츠 롤드컵 | 롤 토토,메이저 업계 1위`,
			description: `이스포츠 일정 및 전적분석 사이트를 찾고 계십니까?고배당 안전한 메이저 업계#1위 12벳롤드컵에서 우승하세요.`,
			keyword: ``,
			links: getAlternateLinks(paths.eSport.root),
		},
	},
	[paths.liveCasino.root]: {
		en: {
			title: `Live Casino Games to play at 12BET`,
			description: `Explore vast selection of top casino table and card games live with fun dealers to interact and enjoy with as you play!`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		th: {
			title: `คาสิโนออนไลน์  บาคาร่า รูเล็ต และอีกมากมายพร้อมให้คุณสนุกแล้ว ที่12BET`,
			description: `12BET เว็บพนันออนไลน์ ให้คุณได้สนุกกับคาสิโนออนไลน์ บาคาร่า รูเล็ต ตามความถนัดของคุณหากคุณเป็นเซียนตัวจริงเงินรางวัลมากมายรอคุณอยู่  เข้ามาเลยอย่ารอช้า`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		id: {
			title: `12BET Situs Judi Casino Online Terlengkap Asia`,
			description: `12BET situs terbesar di Asia mempersembahkan permainan live casino terbaik dari provider-provider judi online terkenal dunia`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		te: {
			title: `12BET వద్ద లైవ్ క్యాసినో గేమ్‌లపై పందెం వేయండి`,
			description: `మీరు ఆడుతున్నప్పుడు ఇంటరాక్ట్ అవ్వడానికి మరియు ఆనందించడానికి లైవ్ ఫన్ డీలర్‌లతో టాప్ లైవ్ కాసినో టేబుల్ మరియు కార్డ్ గేమ్‌ల యొక్క విస్తారమైన ఎంపిక!`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		cs: {
			title: `12BET壹贰博官网｜真人娱乐城`,
			description: `12BET根据不同的游戏供应商作区别，每个平台有其归属的娱乐厅，每个娱乐厅用不同的宝石作为代表。`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		bd: {
			title: `Live Casino Games to play at 12BET`,
			description: `Explore vast selection of top casino table and card games live with fun dealers to interact and enjoy with as you play!`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		kh: {
			title: `Live Casino Games to play at 12BET`,
			description: `Explore vast selection of top casino table and card games live with fun dealers to interact and enjoy with as you play!`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		vn: {
			title: `Sòng Bạc Người Đẹp Chia Bài Trực Tuyến 12BET`,
			description: `Tận hưởng những phút giây giải trí tuyệt vời tại sòng casino online với những người đẹp chia bài cực hot tại nhà cái 12BET.`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
		ko: {
			title: `12벳 라이브 딜러 | 실시간 라이브  바카라   - 12벳,12BET`,
			description: `12벳,12BET 실시간 라이브 카지노 게임 바카라, 블랙잭, 룰렛 그리고 식보 즐거운 경험을 시작하세요.`,
			keyword: ``,
			links: getAlternateLinks(paths.liveCasino.root),
		},
	},
	[paths.slots.root]: {
		en: {
			title: `The world-class online casino platform is at your reach | 12BET`,
			description: `Level-up your gaming experience as the finest casino games, slot games and more await. Be more than just lucky when you venture and prosper here at 12BET! `,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		cs: {
			title: `12BET壹贰博官网｜娱乐城`,
			description: `12BET根据不同的游戏供应商作区别，每个平台有其归属的娱乐厅，每个娱乐厅用不同的宝石作为代表。`,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		th: {
			title: `คาสิโนออนไลน์ ที่ 12BET มีเกมส์ให้เลือกมากมายพร้อมโบนัสและโปรโมชั่น`,
			description: `12BET ผู้นำด้านคาสิโนออนไลน์ในเอเชียกับคลับคาสิโนมากที่สุดไม่ว่าจะเป็นเกมส์แนวไหนเรามีให้คุณเลือกตามความถนัด เงินรางวัลมากมายรอคุณอยู่`,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		id: {
			title: `12BET Situs Judi Slot Online Terpercaya Indonesia`,
			description: `Permainan judi slot online dari provider terbaik hanya bisa anda temukan di situs judi online terpercaya 12BET Indonesia`,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		kh: {
			title: `The world-class online casino platform is at your reach | 12BET`,
			description: `Level-up your gaming experience as the finest casino games, slot games and more await. Be more than just lucky when you venture and prosper here at 12BET! `,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		bd: {
			title: `The world-class online casino platform is at your reach | 12BET`,
			description: `Level-up your gaming experience as the finest casino games, slot games and more await. Be more than just lucky when you venture and prosper here at 12BET! `,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		te: {
			title: `ప్రపంచ స్థాయి ఆన్‌లైన్ క్యాసినో ప్లాట్‌ఫారమ్ మీకు అందుబాటులో ఉంది | 12BET`,
			description: `మీ గేమింగ్ అనుభవాన్ని అత్యుత్తమ కాసినో గేమ్‌లుగా పెంచుకోండి మరియు మరిన్నిటికి వేచి ఉండండి. అదృష్టవంతులుకన్నా ఎక్కువ గా మీరు 12BET వద్ద వెంచర్ చేసినప్పుడు అభివృద్ధి చెందుతారు. `,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		vn: {
			title: `Sòng Bạc Casino Trực Tuyến 12BET`,
			description: `Trải nghiệm slot game cực hiện đại, hệ thống sòng bài phong phú với các trò chơi như Xì Dách, Poker, Roulette, Sic Bo… với nhiều ưu đãi từ tài khoản 12VIP.`,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
		ko: {
			title: `카지노 베팅 | 라이브 바카라 전략 - 12벳,12BET`,
			description: `12벳-카지노에 오신걸 환영합니다! 보너스 받고 블랙잭/다이사이/호게임 보다 전략적인 바카라카지노에 도전하세요.`,
			keyword: ``,
			links: getAlternateLinks(paths.slots.root),
		},
	},
	[paths.game.root]: {
		en: {
			links: getAlternateLinks(paths.game.root),
		},
		th: {
			links: getAlternateLinks(paths.game.root),
		},
		id: {
			links: getAlternateLinks(paths.game.root),
		},
		te: {
			links: getAlternateLinks(paths.game.root),
		},
		cs: {
			links: getAlternateLinks(paths.game.root),
		},
		bd: {
			links: getAlternateLinks(paths.game.root),
		},
		kh: {
			links: getAlternateLinks(paths.game.root),
		},
		vn: {
			links: getAlternateLinks(paths.game.root),
		},
		ko: {
			links: getAlternateLinks(paths.game.root),
		},
	},
	[paths.fishing.root]: {
		en: {
			links: getAlternateLinks(paths.fishing.root),
		},
		th: {
			links: getAlternateLinks(paths.fishing.root),
		},
		id: {
			links: getAlternateLinks(paths.fishing.root),
		},
		te: {
			links: getAlternateLinks(paths.fishing.root),
		},
		cs: {
			links: getAlternateLinks(paths.fishing.root),
		},
		bd: {
			links: getAlternateLinks(paths.fishing.root),
		},
		kh: {
			links: getAlternateLinks(paths.fishing.root),
		},
		vn: {
			links: getAlternateLinks(paths.fishing.root),
		},
		ko: {
			links: getAlternateLinks(paths.fishing.root),
		},
	},
	[paths.fourD.root]: {
		en: {
			links: getAlternateLinks(paths.fourD.root),
		},
		th: {
			links: getAlternateLinks(paths.fourD.root),
		},
		id: {
			links: getAlternateLinks(paths.fourD.root),
		},
		te: {
			links: getAlternateLinks(paths.fourD.root),
		},
		cs: {
			links: getAlternateLinks(paths.fourD.root),
		},
		bd: {
			links: getAlternateLinks(paths.fourD.root),
		},
		kh: {
			links: getAlternateLinks(paths.fourD.root),
		},
		vn: {
			links: getAlternateLinks(paths.fourD.root),
		},
		ko: {
			links: getAlternateLinks(paths.fourD.root),
		},
	},
	[paths.lottery.root]: {
		en: {
			title: `See the basket of 12BET full of lottery games!`,
			description: `Explore multiple game types of lottery and get to pick your favorite while you enjoy the returns as you keep on playing!`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		th: {
			title: `หวยออนไลน์ สลากกินแบ่งรัฐบาลออนไลน์ โดย 12BET`,
			description: `หากคุณมีเลขเด็ดจากสำนักดังแต่ไม่รู้จะไปเดิมพันที่ไหนเราขอแนะนำ 12BET เรารับแทงหวยออนไลน์ ไม่ว่าจะเป็น เลข2ตัว 3ตัวตรง เลขเด็ดเลขดังเรารับเดิมพันตลอด 24ชั่วโมง`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		id: {
			title: `12BET Situs Judi Permainan Togel Online Terbaik`,
			description: `12BET juga menyediakan permainan judi togel online atau lottery yang sangat menarik dengan pasaran-pasaran taruhan terbaik`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		te: {
			title: `12BET వివిధ రకాల లాటరీ గేమ్‌లను అందిస్తుంది!`,
			description: `బహుళ లాటరీ గేమ్‌లను అన్వేషించండి మరియు మార్కెట్‌లోని ఉత్తమ లాటరీ ప్రొడక్ట్స్ నుండి భారీ విజయాలను సొంతం చేసుకోండి!`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		cs: {
			title: `12BET壹贰博官网｜彩票`,
			description: `各种热门主流彩票，应有尽有。是以小博大，实现梦想的最佳工具。`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		bd: {
			title: `See the basket of 12BET full of lottery games!`,
			description: `Explore multiple game types of lottery and get to pick your favorite while you enjoy the returns as you keep on playing!`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		kh: {
			title: `See the basket of 12BET full of lottery games!`,
			description: `Explore multiple game types of lottery and get to pick your favorite while you enjoy the returns as you keep on playing!`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		vn: {
			title: `Các Thể Loại Xổ Số Đặc Sắc Tại Nhà Cái 12BET`,
			description: `Đặt cược vào các con số may mắn của bạn và thắng cược tại hệ thống xổ số của 12BET.`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
		ko: {
			title: `복권게임, 12벳 로또 웰컴 보너스`,
			description: `로또 게임 플레이하시고 백만 장자의 꿈을 이루시기 바랍니다!`,
			keyword: ``,
			links: getAlternateLinks(paths.lottery.root),
		},
	},
	[paths.numberGame.root]: {
		en: {
			title: `Get those combinations right with our Number Game!`,
			description: `Pick the right combination of numbers and amass high returns with this products attractive odds`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		th: {
			title: `12BET ขอแนะนำเกมส์หมายเลขที่จะให้คุณได้ใช้ความคิดสู่ความสำเร็จ`,
			description: `เกมส์หมายเลขที่จะช่วยให้คุณได้ฝึกสมองประลองปัญญาพร้อมรับเงินรางวัลมากมายเพลิดเพลินไปกับตัวเลขพิชิตโบนัสหลักแสนได้แล้ววันนี้ที่ 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		id: {
			title: `12BET Permainan Angka Terbaik Di Indonesia`,
			description: `Judi permainan angka online di 12BET Indonesia sejatinya bisa menjadi sangat menyenangkan dan menghasilkan banyak keuntungan bagi anda.`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		te: {
			title: `12BET యొక్క నంబర్ గేమ్‌తో ఆ కలయికలను సరిగ్గా పొందండి!`,
			description: `సరైన సంఖ్యల కలయికను ఎంచుకోండి మరియు ఈ ప్రొడక్ట్స్ తో ఆకర్షణీయమైన ఆడ్స్ తో అధిక రాబడిని పొందండి.`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		cs: {
			title: `12BET壹贰博官网｜百练赛`,
			description: `百练赛是从宾果游戏获得启发的彩票，玩家需要投注在宾果机的数字，由即时视讯的美女直播开奖。申请32%欢迎红利，投注无论输赢可享返水优惠。`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		bd: {
			title: `Get those combinations right with our Number Game!`,
			description: `Pick the right combination of numbers and amass high returns with this products attractive odds`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		kh: {
			title: `Get those combinations right with our Number Game!`,
			description: `Pick the right combination of numbers and amass high returns with this products attractive odds`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		vn: {
			title: `12BET Nhà Cái Number Game Trực Tuyến`,
			description: `Thử vận may của bạn cùng các con số với trò chơi number game tại nhà cái 12BET và nhận nhiều ưu đãi hấp dẫn.`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
		ko: {
			title: `라이브 빙고| 행운의 숫자|12BET,12벳`,
			description: `12벳에서  배팅을 하면 할수록 더 높은 캐시백이 쌓여갑니다!`,
			keyword: ``,
			links: getAlternateLinks(paths.numberGame.root),
		},
	},
	[paths.keno.root]: {
		en: {
			title: `Taste the feeling of excitement playing Keno`,
			description: `Choose your favorite numbers and match them all to get our jackpot!`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		th: {
			title: `12BET คีโน่ เกมส์เสียงโชคที่ดัดแปลงมาจากหลายหลายวัฒนธรรม`,
			description: `เป็นเกมส์ที่เล่นง่ายได้เงินเร็ววิธีการเล่นจะมีความคล้ายกับหวยออนไลน์แต่จะมีรอบออกรางวัลที่มากกว่า สามารถเล่นได้ตลอด 24ชั่วโมงที่ 12BET`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		id: {
			title: `12BET Situs Judi Keno Online Terbaik Di Indonesia`,
			description: `12BET regional Indonesia merupakan situs judi dengan permainan keno online terbaik, dengan berbagai pasaran yang tersedia untuk anda.`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		te: {
			title: `12BET కినో ఆడుతున్న ఉత్సాహం అనుభూతిని ఆస్వాదించండి`,
			description: `మీకు ఇష్టమైన నంబర్‌లను ఎంచుకోండి మరియు భారీ జాక్‌పాట్ గెలవడానికి వాటిని జతపరచండి.`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		cs: {
			title: `12BET壹贰博官网｜快乐彩`,
			description: `12BET快乐彩标榜更高中奖率与最可靠的游戏平台，游戏是从80个球中随机选择20个球。申请100%欢迎红利，投注无论输赢可享无限返水优惠。`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		bd: {
			title: `Taste the feeling of excitement playing Keno`,
			description: `Choose your favorite numbers and match them all to get our jackpot!`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		kh: {
			title: `Taste the feeling of excitement playing Keno`,
			description: `Choose your favorite numbers and match them all to get our jackpot!`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		vn: {
			title: `Chơi KENO Tại Nhà Cái 12BET`,
			description: `KENO tại 12BET mang đến cho bạn trải nghiệm tuyệt vời cùng với những chương trình ưu đã và khuyến mãi cực hấp dẫn.`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
		ko: {
			title: `키노게임: 케노|로또|12BET,12벳`,
			description: `12벳 케노 억만장자가 나타났습니다! 행운이 깃든 키노게임?! 오늘  당신의 번호는 적중입니다!`,
			keyword: ``,
			links: getAlternateLinks(paths.keno.root),
		},
	},
}
