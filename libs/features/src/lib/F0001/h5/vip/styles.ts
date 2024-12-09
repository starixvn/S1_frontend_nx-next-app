import styled from "styled-components";

export const WrapperVipPageH5 = styled.div`
	.vip {
		padding: 0;
		width: 100%;
		.swiper-container {
			width: 100%;
			height: 100%;
			margin-left: auto;
			margin-right: auto;

			> .swiper-wrapper {
				margin-bottom: 3.88vw;
				background: #232b4f;
				border-radius: 0 0 5vw 5vw;
			}
		}

		.swiper-slide {
			text-align: center;
			font-size: 18px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.vipbanner {
				width: 100%;
				z-index: 1;
			}
			.vipinfo {
				font-weight: 400;
				font-size: 4vw;
				color: #fff;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				z-index: 1;
				span {
					font-weight: 700;
				}
				.rewardinfo {
					width: 90%;
					background: #374375;
					color: #717fba;
					border-radius: 10vw;
					padding: 2vw 2vw;
					margin-top: 1vw;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 3.4vw;
					span {
						margin-left: 1vw;
						font-size: 3.4vw;
						font-weight: 700;
						color: #fff;
					}
				}
			}
			.vip-group {
				width: 100%;
			}
			&.vintage {
				text-transform: uppercase;
				.vipinfo {
					color: #faa972;
				}
				.viprule {
					span {
						&:last-child {
							color: #faa972;
							background: #fff2ea;
						}
					}
				}
			}
			&.silver {
				text-transform: uppercase;
				.vipinfo {
					color: #fff;
				}
				.viprule {
					span:first-child {
						background: #adadad;
					}
					span:last-child {
						color: #adadad;
						background: #e5e5e5;
					}
				}
			}
			&.gold {
				text-transform: uppercase;
				.vipinfo {
					color: #f0c966;
				}
				.viprule {
					span:first-child {
						background: #e8bb4a;
					}
					span:last-child {
						color: #e8bb4a;
						background: #f8edd1;
					}
				}
			}
			&.titanium {
				text-transform: uppercase;
				.vipinfo {
					color: #fff;
				}
				.viprule {
					span:first-child {
						background: #606677;
					}
					span:last-child {
						color: #606677;
						background: #c6c9cb;
					}
				}
			}
			&.diamond {
				text-transform: uppercase;
				.vipinfo {
					color: #2aafe1;
				}
				.viprule {
					span:first-child {
						background: #6dbdf2;
					}
					span:last-child {
						color: #6dbdf2;
						background: #def2ff;
					}
				}
			}
			&.infinity {
				text-transform: uppercase;
				.vipinfo {
					color: #bcaca3;
				}
				.viprule {
					span:first-child {
						background: #bcaca3;
					}
					span:last-child {
						color: #bcaca3;
						background: #f5f5f5;
					}
				}
			}
		}
	}

	.vip .swiper-slide.nova .rewardinfo {
		font-size: 3.5vw;
		width: 92vw;
		height: 7vw;
	}
	.vip .swiper-slide.nova .rewardinfo span {
		font-size: 4vw;
	}
	.vip .viprule {
		color: #002b4d;
		height: 100%;
		width: 100%;
		margin-top: -8vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 8vw 0 5vw;
		border-radius: 0 0 5vw 5vw;
		font-size: 3vw;
	}
	.viprule-item {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 3vw;
		align-items: center;
		justify-content: center;
		span {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: #fff;
			height: 8vw;
			border-radius: 10px;
			width: 100%;
			text-transform: capitalize;
			font-weight: bold;
			&:first-child {
				background: #faa972;
				flex: 0 0 65vw;
				padding-right: 15vw;
				padding-left: 3vw;
			}
			&:last-child {
				position: relative;
				color: #000;
				background: #fff;
				z-index: 1;
				flex: 0 0 20vw;
				margin-left: -10vw;
				justify-content: center;
			}
		}
	}

	.vip .swiper-pagination-bullet-active {
		background-color: #fff;
	}
	.vip .medal {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		font-size: 2.5vw;
		font-weight: bold;
		word-break: break-all;
	}
	.vip .medal-item {
		color: #a9a9a9;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-align: center;
		padding: 1vw 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-flow: column;
		flex-flow: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		margin: 2vw 0 0;
		border-radius: 3vw 3vw 0 0;
	}
	.vip .medal-item:first-child {
		border-left: 0;
	}
	.vip .medal-item img {
		width: 16vw;
		opacity: 0.3;
	}
	.vip .medal-item:nth-child(odd) {
		background: #efefef;
	}
	.vip .medal-item:nth-child(even) {
		background: #e9e9e9;
	}
	.vip .medal-item.vintage {
		background: #fff2ea;
		color: #d57331;
	}
	.vip .medal-item.vintage img {
		opacity: 1;
	}
	.vip .medal-item.silver {
		background: #d7d7d7;
		color: #818181;
	}
	.vip .medal-item.silver img {
		opacity: 1;
	}
	.vip .medal-item.gold {
		background: #f8edd1;
		color: #e3b43d;
	}
	.vip .medal-item.gold img {
		opacity: 1;
	}
	.vip .medal-item.titanium {
		background: #c5c5c5;
		color: #666666;
	}
	.vip .medal-item.titanium img {
		opacity: 1;
	}
	.vip .medal-item.diamond {
		background: #def2ff;
		color: #4d94c3;
	}
	.vip .medal-item.diamond img {
		opacity: 1;
	}
	.vip .medal-item.nova {
		background: -webkit-gradient(
				linear,
				left bottom,
				left top,
				from(#53698f),
				to(#e4e9f2)
			)
			0;
		background: linear-gradient(to top, #53698f, #e4e9f2) 0;
		color: #fff;
	}
	.vip .medal-item.nova img {
		opacity: 1;
	}
	.vip .medal-item > div {
		width: 15vw;
		text-transform: capitalize;
	}
	.vip .medal-item > div span {
		display: block;
	}
	.vipprogram {
		color: #fff;
		text-align: left;
		background: #182043;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0vw 3vw 5vw;
		margin: 25vw 3.4vw 10vw 3.4vw;
		border-radius: 20px;
		font-size: 3.4vw;
		img {
			margin-bottom: 3vw;
			margin-top: -12vw;
		}
		.vipTitle {
			font-weight: 700;
			color: #ea6118;
			margin: 3vw 0 1vw;
			&:last-child {
				margin-top: 5vw;
				color: #01b901;
				text-transform: uppercase;
			}
		}
		span {
			color: #a6a6a6;
			padding: 0 3vw;
		}
	}

	.swiper-pagination {
		width: max-content;
		bottom: 10px;
		right: unset;
		left: 50% !important;
		transform: translateX(-50%);
		z-index: 1;
		display: flex;
		align-items: center;

		.swiper-pagination-bullet {
			width: 2.4vw;
			height: 1.4vw;
			background: ${({ theme }) => theme.mobile.bannerBulletBg};
			margin: 0 0.97vw;
			border-radius: 0.8rem;

			&.swiper-pagination-bullet-active {
				width: 10.9vw;
				height: 1.4vw;
				background: ${({ theme }) => theme.mobile.bannerBulletBgActive};
			}
		}
	}

	.vipPage {
		.viptable {
			display: block;
			.viptable-item-title {
				background: #b5c7df;
				color: #fff;
				padding: 2vw 2vw;
			}
		}
	}
	.vip .vipPage .viptable-item-text {
		color: #939393;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		padding-left: 2vw;
	}
	.vip .vipPage .viptable-item-text li {
		border-right: 0.02rem solid #e1e6ed;
		height: 8vw;
		-webkit-box-flex: 0;
		-ms-flex: 0 0 70%;
		flex: 0 0 70%;
		width: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.vip .vipPage .viptable-item-text li:last-child {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		border: 0;
		-webkit-box-flex: 0;
		-ms-flex: 0 0 30%;
		flex: 0 0 30%;
	}
	.vip .vipPage .viptable-item-text li.High::before {
		content: '';
		display: block;
		background: url(https://minio-api.lumigame.com/s1-nova88/h5/img/check.png)
			no-repeat center/100%;
		height: 3vw;
		width: 3vw;
	}
	.vip .vipPage .viptable-item-text:nth-child(odd) {
		background: #f5f5f5;
	}
	.vip .vipPage .viptable-item:last-child .viptable-item-text:last-child {
		background: -webkit-gradient(
				linear,
				left top,
				right top,
				from(#ff5e00),
				to(#f7c5a6)
			)
			0;
		background: linear-gradient(to right, #ff5e00, #f7c5a6) 0;
		color: #fff;
	}
	.vip .vipPage .viptable.vintage .viptable-item-title {
		background: #efb592;
	}
	.vip .vipPage .viptable.vintage .viptable-item-text:nth-child(odd) {
		background: #fbf3ef;
	}
	.vip .vipPage .viptable.silver .viptable-item-title {
		background: #bfbfbf;
	}
	.vip .vipPage .viptable.silver .viptable-item-text:nth-child(odd) {
		background: #f5f5f5;
	}
	.vip .vipPage .viptable.gold .viptable-item-title {
		background: #e3b43d;
	}
	.vip .vipPage .viptable.gold .viptable-item-text:nth-child(odd) {
		background: #fbf6e9;
	}
	.vip .vipPage .viptable.titanium .viptable-item-title {
		background: #a3a3a3;
	}
	.vip .vipPage .viptable.titanium .viptable-item-text:nth-child(odd) {
		background: #f5f5f5;
	}
	.vip .vipPage .viptable.diamond .viptable-item-title {
		background: #a2cbe5;
	}
	.vip .vipPage .viptable.diamond .viptable-item-text:nth-child(odd) {
		background: #eff9ff;
	}
	.vip .vipPage .viptable.nova .viptable-item-title {
		background: radial-gradient(
			circle farthest-corner at left,
			#112240,
			#808dad,
			#f0f4fb
		);
	}
	.vip .vipPage .viptable.nova .viptable-item-text:nth-child(odd) {
		background: #f1f4f9;
	}
	.vip .vip-bottom {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background: url(https://minio-api.lumigame.com/s1-nova88/h5/img/vip-bottom-bg.png)
			no-repeat center/100%;
		height: 100%;
		padding-bottom: 20vw;
		margin-top: 10vw;
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
		width: 40vw;
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
`
