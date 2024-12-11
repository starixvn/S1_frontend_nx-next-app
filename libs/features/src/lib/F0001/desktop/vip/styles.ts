import styled from 'styled-components'

export const WrapperVipPage = styled.div`
	.vip {
		&-main {
			width: ${({ theme }) => theme.desktop.minContentWidth};
			margin: 0 auto;
			@media (min-width: 1450px) {
				width: ${({ theme }) => theme.desktop.contentWidth};
			}
		}
		.swiper-slide {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			overflow: hidden;
			position: relative;
		}
		.swiper-container {
			width: 100%;
			margin-bottom: 25px;
		}
	}

	.vip .swiper-slide .vipbg {
		width: 100%;
		min-width: 2560px;
		text-align: center;
		position: relative;
		z-index: 1;
	}
	.vip .swiper-slide.vintage .vipinfo {
		color: #faa972;
	}
	.vip .swiper-slide.silver .vipinfo {
		color: #d7d7d7;
	}
	.vip .swiper-slide.silver .viprule {
		background: #e5e5e5;
	}
	.vip .swiper-slide.silver .viprule .viprule-item span:nth-child(1) {
		background: #bababa;
	}
	.vip .swiper-slide.silver .viprule .viprule-item span:nth-child(2) {
		color: #8b8b8b;
	}
	.vip .swiper-slide.gold .vipinfo {
		color: #f0c966;
	}
	.vip .swiper-slide.gold .viprule {
		background: #f8edd1;
	}
	.vip .swiper-slide.gold .viprule .viprule-item span:nth-child(1) {
		background: #f0c966;
	}
	.vip .swiper-slide.gold .viprule .viprule-item span:nth-child(2) {
		color: #ebb93b;
	}
	.vip .swiper-slide.titanium .vipinfo {
		color: #acacac;
	}
	.vip .swiper-slide.titanium .viprule {
		background: #c5c5c5;
	}
	.vip .swiper-slide.titanium .viprule .viprule-item span:nth-child(1) {
		background: #666666;
	}
	.vip .swiper-slide.titanium .viprule .viprule-item span:nth-child(2) {
		color: #666666;
	}
	.vip .swiper-slide.diamond .vipinfo {
		color: #84d2f1;
	}
	.vip .swiper-slide.diamond .viprule {
		background: #def2ff;
	}
	.vip .swiper-slide.diamond .viprule .viprule-item span:nth-child(1) {
		background: #6dbdf2;
	}
	.vip .swiper-slide.diamond .viprule .viprule-item span:nth-child(2) {
		color: #6dbdf2;
	}
	.vip .swiper-slide.nova .vipinfo {
		color: #ffffff;
	}
	.vip .swiper-slide.nova .viprule {
		background: #f5f5f5;
	}
	.vip .swiper-slide.nova .viprule .viprule-item span:nth-child(1) {
		background: #d3d7da;
	}
	.vip .swiper-slide.nova .viprule .viprule-item span:nth-child(2) {
		color: #b9bec2;
	}
	.vip .swiper-slide.nova .rewardinfo {
		width: 600px;
		font-size: 23px;
	}
	.vip .swiper-slide.nova .rewardinfo span {
		font-size: 30px;
	}
	.vip .vipinfo {
		position: absolute;
		top: 430px;
		left: calc(50% - 570px);
		font-size: 23px;
		text-align: center;
		width: 650px;
		z-index: 2;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.vip .vipinfo span {
		font-size: 28px;
		font-weight: bold;
	}
	.vip .rewardinfo {
		background: white;
		width: 590px;
		height: 70px;
		margin-top: 10px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		border-radius: 50px;
		font-size: 25px;
		color: #112240;
	}
	.vip .rewardinfo span {
		font-size: 33px;
		margin-left: 10px;
	}
	.vip .viprule {
		background: #fff2ea;
		width: 1400px;
		height: 350px;
		margin: -100px auto 0;
		border-radius: 0 0 40px 40px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		text-align: center;
		position: relative;
		z-index: 0;
	}
	.vip .viprule-item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		margin: 95px 30px 0;
		word-wrap: break-word;
	}
	.vip .viprule-item span {
		text-align: center;
		background: #faa972;
		width: 320px;
		height: 65px;
		padding: 5px;
		font-size: 20px;
		border-radius: 10px 10px 0 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		text-transform: capitalize;
	}
	.vip .viprule-item span:nth-child(2) {
		background: white;
		color: #faa972;
		font-size: 25px;
		border-radius: 10px;
		margin-top: -5px;
	}
	.vip .vipPage {
		width: 1400px;
		margin: 0 auto;
		border-radius: 5px;
	}
	.vip .vipPage ~ img {
		width: 1400px;
		margin: 30px auto;
		cursor: pointer;
	}
	.vip .vipPage .eventList {
		margin: 0;
		font-weight: normal;
		width: 100%;
		margin-bottom: 50px;
	}
	.vip .vipPage .eventList .icon-nova88 {
		font-size: 17px;
		padding: 5px;
	}
	.vip .vipPage .eventList .icon-nova88:before {
		font-weight: normal;
		margin-left: 0;
	}
	.vip .vipPage .eventList tr {
		font-size: 15px;
	}
	.vip .vipPage .eventList tr.title {
		background: #809ac5;
		color: white;
		border-left: 1px solid #809ac5;
		font-weight: normal;
	}
	.vip .vipPage .eventList tr.title td:last-child {
		color: white;
	}
	.vip .vipPage .eventList tr:last-child {
		background: #666;
		font-weight: bold;
	}
	.vip .vipPage .eventList tr:last-child td {
		color: white;
	}
	.vip .vipPage .eventList tr:not(.title):not(.lastTd) td:first-child {
		border-right: 1px solid #e4e4e4;
		color: #5574a7;
	}
	.vip .vipPage .eventList tr:not(.title):not(.lastTd):hover td {
		background: #e4e4e4;
		color: #f77900;
	}
	.vip .vipPage .eventList tr:not(.title):not(.lastTd):hover td:first-child {
		background: #979797;
		color: white;
	}
	.vip .vipPage .eventList tr:not(.title):not(.lastTd) td {
		border: 1px solid #e4e4e4;
	}
	.vip .vipPage .eventList tr td {
		border: 0;
		width: 11%;
		padding: 10px;
		line-height: 30px;
		text-align: center;
		color: #5574a7;
	}
	.vip .vipPage .eventList tr td:first-child {
		text-align: left;
		width: 34%;
		padding-left: 10px;
		color: white;
	}
	.vip .vipPage .eventList tr td span.txt-orange {
		color: white;
	}
	.vip .medal {
		margin-bottom: 20px;
		background: white;
	}
	.vip .medal tr td {
		width: 11%;
		text-align: center;
		color: #5574a7;
	}
	.vip .medal tr td:first-child {
		width: 34%;
		text-align: left;
	}
	.vip .medal tr td img {
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
	}
	.vip + footer .footerList > div a ~ div {
		display: none;
	}
	.vip .swiper-button-next {
		background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/next-right.png)
			no-repeat center/100%;
		width: 45px;
		right: 100px;
		top: 260px;
	}
	.vip .swiper-button-prev {
		background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/next-left.png)
			no-repeat center/100%;
		width: 45px;
		left: 100px;
		top: 260px;
	}
	.vip .vip-bottom {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/vip-bottom-bg.png)
			no-repeat center/100%;
		height: 450px;
	}
	.vip .vip-bottom-item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.vip .vip-bottom-item img {
		width: 300px;
	}
	.vip .vip-bottom-item span {
		text-align: center;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		font-size: 20px;
		width: 150px;
		font-weight: bold;
		-webkit-filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
		filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
	}

	.walletNickname {
		border-top: 1px dotted #666;
		text-align: center;
		margin-top: 10px;
		padding: 10px 10px 0;
	}

	.vipInfo {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-flow: wrap;
		flex-flow: wrap;
		background: rgba(210, 226, 249, 0.5);
		border-radius: 15px;
		padding: 20px 40px;
		margin-bottom: 30px;
		color: #666;
	}
	.vipInfo .vipTitle {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		font-size: 18px;
		margin: 20px 0;
		font-weight: bold;
		color: #5574a7;
		width: 100%;
	}
`
