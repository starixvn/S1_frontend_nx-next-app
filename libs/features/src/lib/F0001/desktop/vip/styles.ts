import styled from 'styled-components'

export const WrapperVipPage = styled.div`
	.vip {
		width: ${({ theme }) => theme.desktop.minContentWidth};
		margin: 2rem auto;
		@media (min-width: 1450px) {
			width: ${({ theme }) => theme.desktop.contentWidth};
		}
		.swiper-slide {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			overflow: hidden;
			position: relative;
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
			width: 100%;
			margin-bottom: 2.5rem;
			border-radius: 20px;
		}
		.newvipinfo {
			margin-top: 10rem;
			background: #182043;
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
			background: #e4e4e4;
			color: #f77900;
		}
		.eventList tr:not(.title):not(.lastTd):hover td:first-child {
			background: #979797;
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
	}

	.vip .swiper-slide.infinity .rewardinfo {
		width: 600px;
		font-size: 23px;
	}
	.vip .swiper-slide.infinity .rewardinfo span {
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
		display: flex;
		flex-direction: column;
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
		display: flex;
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
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		z-index: 0;
	}
	.vip .viprule-item {
		display: flex;
		flex-direction: column;
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
		display: flex;
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
		-ms-flex-flow: wrap;
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
`
