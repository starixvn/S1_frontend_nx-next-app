import styled from 'styled-components'

export const WrapperVerificationH5 = styled.div`
	.vip_mark {
		margin: auto;
		position: relative;
		text-align: center;
		max-width: 35vw;
		&.infinity {
			div {
				background: ${({ theme }) => theme.desktop.gradeNovaBg};
			}
		}
		&.vintage {
			div {
				background: ${({ theme }) => theme.desktop.gradeVintageBg};
			}
		}
		&.silver {
			div {
				background: ${({ theme }) => theme.desktop.gradeSilverBg};
			}
		}
		&.gold {
			div {
				background: ${({ theme }) => theme.desktop.gradeGoldBg};
			}
		}
		&.titanium {
			div {
				background: ${({ theme }) => theme.desktop.gradeTitaniumBg};
			}
		}
		&.diamond {
			div {
				background: ${({ theme }) => theme.desktop.gradeDiamondBg};
			}
		}
		img {
			width: 25vw;
			z-index: 1;
			position: relative;
			margin: 0 auto;
		}
		div {
			background: #112240;
			padding: 1vw;
			margin-top: 3.1vw;
			border-radius: 15px;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.1vw;
			font-weight: 700;
			line-height: normal;
		}
		.circleAnimation {
			display: flex;
			z-index: 0;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 15vw;
			height: 15vw;
			border-radius: 100%;
			&:before {
				width: 28vw;
				height: 28vw;
			}
			&:after {
				width: 24vw;
				height: 24vw;
				background: #112240;
			}
		}
	}
	.accountSafety {
		display: flex;
		color: #5574a7;
		align-items: center;
		justify-content: center;
		margin: 2vw 0;
		font-size: 2.9vw;
		> div {
			&:first-child {
				font-weight: bold;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
			&:last-child {
				color: ${({ theme }) => theme.mobile.white};
			}
		}
	}
	.safetyLv {
		display: flex;
		justify-content: center;
		span {
			width: 7vw;
			height: 1.5vw;
			background: #374375;
			margin: 0 3px;
			border-radius: 50px;
			&:nth-child(1) {
				&.active {
					background: #fbc208;
				}
			}
			&:nth-child(2) {
				&.active {
					background: #7fca3a;
				}
			}
			&:nth-child(3) {
				&.active {
					background: #39b248;
				}
			}
		}
	}

	.userVerification {
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		margin-bottom: 5vw;
		font-size: 3vw;
		font-weight: 400;
		> div:first-child {
			margin: 2.5vw 0;
			text-align: center;
		}
		> div:last-child {
			display: flex;
			justify-content: center;
			> div {
				width: 8.6vw;
				height: 8.6vw;
				background: #374375;
				border-radius: 100%;
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				cursor: pointer;
				margin: 0 2vw;
				&:after {
					content: '＄';
					width: 4vw;
					height: 4vw;
					background: #ffc000;
					border-radius: 100%;
					font-size: 3vw;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					bottom: 0;
					right: -1vw;
				}
				&.icon {
					&:before {
						font-size: 4vw;
					}
				}
			}
		}
	}

	.userVerification > div:last-child > div.icon-email .description {
		width: 83vw;
		transform: translate(-39vw, 12vw);
	}
	.userVerification > div:last-child > div.icon-email .description:before,
	.userVerification > div:last-child > div.icon-email .description:after {
		left: 40vw;
	}
	.userVerification > div:last-child > div.icon-mobile:before {
		font-size: 6vw;
	}
	.userVerification > div:last-child > div.icon-mobile .description {
		width: 85vw;
		-webkit-transform: translate(-52vw, 12vw);
		transform: translate(-52vw, 12vw);
	}
	.userVerification > div:last-child > div.icon-mobile .description:before,
	.userVerification > div:last-child > div.icon-mobile .description:after {
		left: 53vw;
	}
	.userVerification > div:last-child > div.active {
		background: #717fba;
	}
	.userVerification > div:last-child > div.active:after {
		font-family: 'S1NewIcons';
		content: '\\e91a';
		background: #01b901;
	}
	.userVerification > div:last-child > div.openTip .description {
		display: block;
		font-family: ${({ theme }) => theme.desktop.fontFamily};
	}
	.userVerification .description {
		position: absolute;
		border: 1px solid #ea6118;
		border-radius: 10px;
		background: #ea6118;
		font-size: 3vw;
		z-index: 1;
		padding: 2vw;
		width: max-content;
		text-align: center;
		color: #5574a7;
		left: 0;
		top: 0;
		transform: translate(-3vw, 12vw);
		display: none;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
		> div {
			color: ${({ theme }) => theme.mobile.white};
		}
	}
	.userVerification .description:before {
		border-color: transparent transparent #ea6118;
		border-style: solid solid solid;
		border-width: 2vw;
		top: 0;
		content: '';
		height: 0;
		left: 4vw;
		position: absolute;
		width: 0px;
		transform: translateY(-100%);
	}
	.userVerification .description:after {
		border-color: transparent transparent #ea6118;
		border-style: solid solid solid solid;
		border-width: 2vw;
		top: 1px;
		content: '';
		height: 0px;
		left: 4vw;
		position: absolute;
		width: 0px;
		-webkit-transform: translateY(-100%);
		transform: translateY(-100%);
	}
	.userVerification .description .title {
		color: ${({ theme }) => theme.mobile.white};
		font-size: 3.1vw;
		margin-bottom: 1vw;
	}
`

export const WrapperEditAddressH5 = styled.div`
	.addressModule {
		margin: 3.1vw 0;
		.title {
			text-align: center;
			color: ${({ theme }) => theme.mobile.white};
			margin-bottom: 3.6vw;
			font-size: 3.4vw;
			font-weight: 700;
			line-height: normal;
		}
		.group-sub-title {
			background: #182043;
			border-radius: 20px;
			overflow: hidden;
			.heading-box {
				padding: 2.7vw 5vw;
				background: #232b4f;
				border-bottom: 1px solid #374375;
			}
			.body-box {
				padding: 5vw;
				.infoModule {
					margin-bottom: 3.4vw;
					position: relative;
				}
				.inputBox-blue {
					margin-top: 2vw;
				}
			}
			.inputInfo {
				position: absolute;
				right: 0;
				z-index: 9;
			}
		}
	}
`
