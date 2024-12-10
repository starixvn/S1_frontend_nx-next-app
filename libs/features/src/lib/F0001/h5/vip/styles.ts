import styled from 'styled-components'

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
				color: ${({ theme }) => theme.mobile.white};
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
					color: ${({ theme }) => theme.mobile.vipVintageBtnColor};
				}
				.viprule {
					span {
						&:last-child {
							color: ${({ theme }) => theme.mobile.vipVintageBtnColor};
							background: ${({ theme }) => theme.mobile.vipVintageBtnBg};
						}
					}
				}
			}
			&.silver {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.mobile.vipSilverBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.mobile.vipSilverTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.mobile.vipSilverBtnColor};
						background: ${({ theme }) => theme.mobile.vipSilverBtnBg};
					}
				}
			}
			&.gold {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.mobile.vipGoldBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.mobile.vipGoldTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.mobile.vipGoldBtnColor};
						background: ${({ theme }) => theme.mobile.vipGoldBtnBg};
					}
				}
			}
			&.titanium {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.mobile.vipTitaniumBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.mobile.vipTitaniumTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.mobile.vipTitaniumBtnColor};
						background: ${({ theme }) => theme.mobile.vipTitaniumBtnBg};
					}
				}
			}
			&.diamond {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.mobile.vipDiamonBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.mobile.vipDiamonTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.mobile.vipDiamonBtnColor};
						background: ${({ theme }) => theme.mobile.vipDiamonBtnBg};
					}
				}
			}
			&.infinity {
				text-transform: uppercase;
				.vipinfo {
					color: ${({ theme }) => theme.mobile.vipInfinityBtnColor};
				}
				.viprule {
					span:first-child {
						background: ${({ theme }) => theme.mobile.vipInfinityTitleBgColor};
					}
					span:last-child {
						color: ${({ theme }) => theme.mobile.vipInfinityBtnColor};
						background: ${({ theme }) => theme.mobile.vipInfinityBtnBg};
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
		display: flex;
		width: 100%;
		font-size: 2.5vw;
		font-weight: bold;
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
		margin: 20vw 3.4vw 10vw 3.4vw;
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
		margin: 0 3vw;
		border: 1px solid #374375;
		border-radius: 20px;
		overflow: hidden;
		.viptable {
			display: block;
			.viptable-item-title {
				padding: 4vw 2vw;
				background: #232b4f;
				border-top: 0.02rem solid #374375;
				font-weight: 700;
				font-size: 3.4vw;
			}
			&.vintage {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) =>
									theme.mobile.vipVintageTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
			&.silver {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) =>
									theme.mobile.vipSilverTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
			&.gold {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) => theme.mobile.vipGoldTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
			&.titanium {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) =>
									theme.mobile.vipTitaniumTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
			&.diamond {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) =>
									theme.mobile.vipDiamonTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
			&.infinity {
				.viptable-item {
					&:last-child {
						.viptable-item-text {
							&:last-child {
								background: ${({ theme }) =>
									theme.mobile.vipInfinityTitleBgColor};
								color: #fff;
								font-weight: 700;
							}
						}
					}
				}
			}
		}
		.viptable-item-text {
			color: #939dc5;
			display: flex;
			padding-left: 2vw;
			border-top: 0.02rem solid #374375;
			background: #182043;
			li {
				border-right: 0.02rem solid #374375;
				height: 11vw;
				flex: 0 0 70%;
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 3.4vw;
				font-weight: 600;
				&:last-child {
					display: flex;
					align-items: center;
					justify-content: center;
					border: 0;
					flex: 0 0 30%;
				}
			}
		}
		.medal-item {
			color: #717fba;
			font-weight: 700;
			background: #232b4f;
			flex: 1;
			text-align: center;
			padding: 1vw 0;
			display: flex;
			flex-flow: column;
			align-items: center;
			border-right: 0.02rem solid #374375;
			&:last-child {
				border-right: none;
			}
			img {
				width: 15vw;
				opacity: 0.3;
			}
			&.vintage {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipVintageBtnColor};
				}
			}
			&.silver {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipSilverBtnColor};
				}
			}
			&.gold {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipGoldBtnColor};
				}
			}
			&.titanium {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipTitaniumBtnColor};
				}
			}
			&.diamond {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipDiamonBtnColor};
				}
			}
			&.infinity {
				img {
					opacity: 1;
				}
				> div {
					color: ${({ theme }) => theme.mobile.vipInfinityBtnColor};
				}
			}
		}
		.medal-item:first-child {
			border-left: 0;
		}
	}
	.High::before {
		content: '\\e91a';
		font-family: 'S1NewIcons' !important;
		display: block;
		height: 6.1vw;
		width: 6.1vw;
		color: #01b901;
		font-size: 6.1vw;
		margin-right: 1vw;
	}

	.vip-bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding-bottom: 30vw;
		margin-top: 10vw;
	}
	.vip-bottom-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.vip-bottom-item span {
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: 3.4vw;
		text-transform: uppercase;
		width: 30vw;
		font-weight: bold;
	}
`
