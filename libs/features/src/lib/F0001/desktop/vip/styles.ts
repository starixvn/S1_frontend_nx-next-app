import styled from 'styled-components'

export const WrapperVipPage = styled.div`
	.vip {
		min-width: ${({ theme }) => theme.desktop.minContentWidth};
		margin: 2rem auto;
		@media (min-width: 1450px) {
			width: ${({ theme }) => theme.desktop.contentWidth};
		}
		.swiper-wrapper {
			margin-bottom: 4rem;
			background: #232b4f;
			border-radius: 0 0 5vw 5vw;
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
				width: 1.5rem;
				height: 0.6rem;
				background: ${({ theme }) => theme.desktop.bannerBulletBg};
				margin: 0 0.4rem;
				border-radius: 0.8rem;

				&.swiper-pagination-bullet-active {
					width: 4.5rem;
					height: 0.6rem;
					background: ${({ theme }) => theme.desktop.bannerBulletBgActive};
				}
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
			border-radius: 20px;
			.vipbg {
				width: 100%;
				text-align: center;
				position: relative;
				z-index: 1;
			}
			&.vintage {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipVintageBtnColor};
				}
				.viprule {
					span {
						&:last-child {
							color: ${({ theme }) => theme.desktop.vipVintageBtnColor};
							background: ${({ theme }) => theme.desktop.vipVintageBtnBg};
						}
					}
				}
			}
			&.silver {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipSilverBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.desktop.vipSilverTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.desktop.vipSilverBtnColor};
						background: ${({ theme }) => theme.desktop.vipSilverBtnBg};
					}
				}
			}
			&.gold {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipGoldBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.desktop.vipGoldTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.desktop.vipGoldBtnColor};
						background: ${({ theme }) => theme.desktop.vipGoldBtnBg};
					}
				}
			}
			&.titanium {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipTitaniumBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.desktop.vipTitaniumTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.desktop.vipTitaniumBtnColor};
						background: ${({ theme }) => theme.desktop.vipTitaniumBtnBg};
					}
				}
			}
			&.diamond {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipDiamonBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.desktop.vipDiamonTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.desktop.vipDiamonBtnColor};
						background: ${({ theme }) => theme.desktop.vipDiamonBtnBg};
					}
				}
			}
			&.infinity {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.desktop.vipInfinityBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.desktop.vipInfinityTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.desktop.vipInfinityBtnColor};
						background: ${({ theme }) => theme.desktop.vipInfinityBtnBg};
					}
				}
			}
		}
		.swiper-container {
			border-radius: 20px;
		}
		.newvipinfo {
			margin-top: 16rem;
			background: #182043;
			display: flex;
			padding: 4rem 1.6rem 1.6rem 1.6rem;
			border-radius: 20px;
			.img {
				min-width: 60rem;
				margin-top: -12rem;
				img {
					width: 100%;
				}
			}
			&-content {
				&-items {
					margin-bottom: 1rem;
					.heading {
						margin-bottom: 0.4rem;
						color: ${({ theme }) => theme.desktop.hrefColorPrimary};
						font-size: 1.7rem;
						font-weight: 700;
					}
					.content {
						font-weight: 400;
						font-size: 1.4rem;
					}
				}
				.last-items {
					color: #01b901;
					font-size: 1.7rem;
					font-weight: 700;
				}
			}
		}
		.vipPage {
			border-radius: 10px;
			overflow: hidden;
			border: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
			margin-top: 8rem;
		}
		.medal {
			width: 100%;
			background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
			tr {
				td {
					width: 11%;
					text-align: center;
					color: ${({ theme }) => theme.desktop.white};
					padding: 1.6rem;
					font-weight: 600;
					font-size: 1.4rem;
					border-right: 1px solid
						${({ theme }) => theme.desktop.rightModuleBorderColor};
					&:last-child {
						border: none;
					}
					&:first-child {
						width: 34%;
						text-align: left;
					}
					img {
						max-width: 10rem;
						margin: 0.5rem auto;
					}
				}
			}
		}
		.eventList {
			margin: 0;
			font-weight: normal;
			width: 100%;
			tr {
				font-size: 1.4rem;
				font-weight: 700;
				background: ${({ theme }) => theme.desktop.rightModuleBg};
				&.title {
					background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
					td {
						&:first-child {
							color: ${({ theme }) => theme.desktop.white};
						}
					}
				}
				td {
					width: 11%;
					padding: 10px;
					line-height: 30px;
					text-align: center;
					color: #5574a7;
					border: 1px solid
						${({ theme }) => theme.desktop.rightModuleBorderColor};
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					.group-vip-icon {
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.icon-check {
						&:before {
							font-size: 2.4rem;
							color: #01b901;
						}
					}
					&:first-child {
						border-left: none;
						text-align: left;
						width: 34%;
						color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
					&:last-child {
						border-right: none;
					}
				}
				&.lastTd {
					background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
					td {
						border-bottom: none;
						color: ${({ theme }) => theme.desktop.white};
					}
				}
			}
		}
		.eventList .icon-nova88 {
			font-size: 17px;
			padding: 5px;
		}
		.eventList .icon-nova88:before {
			font-weight: normal;
			margin-left: 0;
		}
		.eventList tr.title td:last-child {
			color: white;
		}
		.eventList tr:not(.title):not(.lastTd):hover td {
			background: #48558b;
			color: white;
		}
		.eventList tr:not(.title):not(.lastTd):hover td:first-child {
			background: #48558b;
			color: white;
		}

		.eventList tr td span.txt-orange {
			color: white;
		}
		.vip-bottom {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 8rem 0;
			gap: 2.4rem;
			&-item {
				span {
					margin: auto;
					font-size: 1.4rem;
					font-weight: 700;
					text-align: center;
					display: flex;
					justify-content: center;
					width: 12rem;
					font-weight: bold;
				}
			}
		}
		.vipinfo {
			position: absolute;
			bottom: 40px;
			left: 13%;
			font-size: 1.7rem;
			text-align: center;
			width: 40rem;
			z-index: 9;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.4rem;
			span {
				font-size: 1.7rem;
				font-weight: 700;
			}
		}
		.rewardinfo {
			background: #374375;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50px;
			font-size: 1.4rem;
			color: #717fba;
			font-weight: 400;
			padding: 1rem 1.2rem;
			width: 100%;
			span {
				margin-left: 1rem;
				font-weight: 700;
			}
		}
		.vintage {
			.vipinfo {
				bottom: 70px;
			}
		}
		.viprule {
			display: flex;
			justify-content: center;
			text-align: center;
			position: absolute;
			z-index: 9;
			right: 4rem;
			bottom: 4rem;
			gap: 1.6rem;
			&-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				word-wrap: break-word;
				border-radius: 8px;
				overflow: hidden;
				opacity: 0;
				transform: translateY(30px);
				transition: all 0.5s ease-out;
				span {
					text-align: center;
					background: #faa972;
					width: 19rem;
					height: 4rem;
					padding: 5px;
					font-size: 1.1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					text-transform: capitalize;
					font-weight: 700;
					&:nth-child(2) {
						background: white;
						color: #faa972;
						font-size: 1.4rem;
						height: auto;
					}
				}
			}
		}
	}

	.vip + footer .footerList > div a ~ div {
		display: none;
	}
	.vip .vip .vip-bottom-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.walletNickname {
		border-top: 1px dotted #666;
		text-align: center;
		margin-top: 10px;
		padding: 10px 10px 0;
	}

	.vipInfo {
		display: flex;
		flex-flow: wrap;
		background: rgba(210, 226, 249, 0.5);
		border-radius: 15px;
		padding: 20px 40px;
		margin-bottom: 30px;
		color: #666;
	}
	.vipInfo .vipTitle {
		display: flex;
		align-items: center;
		font-size: 18px;
		margin: 20px 0;
		font-weight: bold;
		color: #5574a7;
		width: 100%;
	}
	.swiper-slide {
		&-active {
			.viprule-item {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
`
