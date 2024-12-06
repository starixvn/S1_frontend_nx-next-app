import styled from 'styled-components'

export const WrapperBankInfoH5 = styled.div`
	.Wallet {
		padding: 5vw 4vw 35vw;
		.btnGroup {
			button {
				min-height: 7vw;
			}
			.icon {
				&:before {
					font-size: 5.1vw;
				}
			}
		}
	}
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
	.name {
		font-size: 3.5vw;
		font-weight: bold;
		text-align: center;
		margin: 2vw 0;
		color: ${({ theme }) => theme.mobile.white};
	}
	.name + .text-org {
		text-align: center;
		font-size: 2.9vw;
		font-weight: 400;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
	.icon-member {
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		padding: 3vw;
		width: 13vw;
		height: 13vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
		margin: 0 auto;
		position: relative;
	}
	.icon-member:before {
		font-size: 10vw;
		z-index: 1;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
	.icon-member .circleAnimation {
		display: flex;
		z-index: 0;
		top: auto;
	}
	.icon-member .circleAnimation:before {
		width: 26vw;
		height: 26vw;
	}
	.icon-member .circleAnimation:after {
		width: 22vw;
		height: 22vw;
		background: #112240;
	}
	.text-gray {
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		text-align: center;
		font-size: 2.9vw;
		font-weight: 400;
	}
	.group-select-bank {
		margin-top: 3.4vw;
		.block-grid {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(4, 3.5vw);
			height: 11.6vw;
			gap: 1vw;
		}
		.bankName {
			height: 11.6vw;
			width: 11.6vw;
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			border-radius: 10px;
			padding: 0 0 0;
			margin: auto;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;
			img {
				border-radius: 10px;
			}
		}
		.subtitle {
			margin-top: 0;
			grid-column: 2 / 4;
			grid-row: 1;
			text-align: left;
			font-weight: 700;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.4vw;
			max-width: unset;
		}
		.subinfo {
			grid-column: 2 / 4;
			grid-row: 2;
			text-align: left;
			color: #939dc5;
		}
		.code {
			grid-column: 2 / 4;
			grid-row: 3;
			text-align: left;
			color: #939dc5;
		}
	}
`
