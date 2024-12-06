import styled from 'styled-components'

export const WrapperWithdrawalH5 = styled.div`
	.header-waiting {
		.title {
			font-size: 4.1vw;
			font-weight: 700;
			background: #0f1428;
			border-bottom: 1px solid #374375;
			height: 14.8vw;
		}
	}
	.kyc-text {
		text-align: center;
		margin: 3vw 0;
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
		&.title {
			font-size: 4.1vw;
			font-weight: 700;
		}
	}
	.icon-noti {
		width: 10vw;
		height: 10vw;
		margin: auto;
		border-radius: 100px;
		border: 6px solid #1d2447;
		background: #232b4f;
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			&:before {
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				font-size: 7.8vw;
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
	.important {
		flex: 0 0 21.8rem;
		border-radius: 20px;
		padding: 2rem 1.6rem;
		background: ${({ theme }) => theme.desktop.importantBg};
		.title {
			text-align: center;
			margin-bottom: 0.8rem;
			font-size: 1.4rem;
			font-weight: 700;
			line-height: normal;
			color: ${({ theme }) => theme.desktop.inputBorderColorError};
			display: flex;
			align-items: center;
			gap: 0.8rem;
			justify-content: center;
			.icon {
				&:before {
					font-size: 2rem;
					color: ${({ theme }) => theme.desktop.inputBorderColorError};
				}
			}
		}
		ul {
			li {
				font-size: 1.2rem;
				font-weight: 400;
				line-height: 2rem;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				a,
				span {
					color: #1b5bff;
					font-weight: 600;
				}
			}
		}
	}
	.balanceModule {
		display: flex;
		justify-content: space-between;
		margin: 3vw 0;
		gap: 2vw;
		.spin-button {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			background: #232b4f;
			border-radius: 5px;
			padding: 1vw 2vw;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			font-weight: 600;
			font-size: 3.4vw;
			.icon {
				&:before {
					color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				}
			}
			&.active {
				.icon {
					animation: rotate 1s ease;
				}
			}
		}
		.btn-secondary {
			min-width: 30vw;
			border-radius: 100px;
		}
	}
	.group-withdrawal {
		border-radius: 20px;
		background: ${({ theme }) => theme.mobile.rightModuleBg};
		padding: 3.9vw;
		.selectBank {
			display: flex;
			flex-direction: column;
		}
		.group-block-gird {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 4vw;
		}
		.block-grid {
			display: grid;
			width: 50%;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(4, 3.5vw);
			height: 11.6vw;
			gap: 2vw;
		}
		.subtitle {
			margin-top: 0;
			grid-column: 2 / 4;
			grid-row: 1;
			text-align: left;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.4vw;
			max-width: unset;
		}
		.subinfo {
			grid-column: 2 / 4;
			grid-row: 2;
			text-align: left;
		}
	}
`
