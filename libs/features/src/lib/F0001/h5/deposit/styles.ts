import styled from 'styled-components'

export const WrapperDepositH5 = styled.div`
	.deposit {
		padding: 5vw 4vw 30vw 4vw;
	}
	.mainWallet {
		margin-bottom: 2vw;
		font-size: 3.5vw;
		font-weight: bold;
		.account {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-flow: wrap;
			position: relative;
			margin-top: 0;
			.group-icon {
				display: flex;
				align-items: center;
				gap: 0.8rem;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				font-weight: 400;
				font-size: 3.4vw;
			}
			.money {
				font-weight: 400;
				font-size: 3.4vw;
				color: ${({ theme }) => theme.mobile.white};
			}
			.icon {
				&:before {
					font-size: 5vw;
					margin-right: 1vw;
				}
			}
			&.active {
				margin: 0;
				padding: 0;
				color: #112240;
			}
			.bankLogo {
				flex: 1;
				text-align: center;
			}
		}
	}
	.rememberMode {
		display: flex;
		flex-flow: wrap;
		position: relative;
		gap: 0.8rem;
		margin-bottom: 4.5vw;
		.swithModule {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			font-size: 3.4vw;
		}
		.group-tool-tip {
			position: relative;
			.icon {
				&:before {
					font-size: 5vw;
				}
			}
			.inputInfo {
				position: absolute;
				width: 50vw;
				right: 0;
				z-index: 2;
				&:before {
					content: '';
					border-width: 0 2vw 2vw 2vw;
					border-style: solid dashed dashed;
					border-color: transparent transparent #ea6118 transparent;
					right: 0.7vw;
					top: -1.5vw;
				}
			}
		}
	}
	.depositModule {
		margin: auto;
		display: none;
		&.active {
			display: block;
		}
		.selectModule {
			display: flex;
			flex-flow: row wrap;
			flex: 1 1;
			text-align: center;
			gap: 5vw;
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
				.check {
					display: none;
				}
				&.active {
					border: 2px solid ${({ theme }) => theme.mobile.hrefColorPrimary};
					.icon {
						&:before {
							color: ${({ theme }) => theme.mobile.white};
						}
					}
					.check {
						display: flex;
						background: ${({ theme }) => theme.mobile.hrefColorPrimary};
						width: 4.4vw;
						height: 4.4vw;
						align-items: center;
						justify-content: center;
						position: absolute;
						right: -3px;
						bottom: -3px;
						border-radius: 5px;
						.icon {
							&:before {
								font-size: 3.1vw;
							}
						}
					}
				}
				.icon {
					&:before {
						font-size: 6vw;
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
					}
				}
			}
			.subtitle {
				font-weight: bold;
				white-space: nowrap;
				font-size: 2.5vw;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-top: 1.5vw;
				font-weight: 700;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				max-width: 20vw;
			}
			.subinfo {
				font-size: 2.9vw;
				color: #939dc5;
				span {
					display: block;
				}
			}
		}
	}
	.depositModule > .title:not(.text-org) {
		font-weight: normal;
		background: #112240;
		padding: 5px;
		border-radius: 5px 5px 0 0;
		margin: 4vw 0 0;
	}

	.Bank,
	.Payment,
	.Channel {
		.selectModule {
			justify-content: space-between;
			gap: 3.5vw;
			.block-grid {
				display: grid;
				width: 45%;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(4, 3.5vw);
				height: 11.6vw;
				gap: 1vw;
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
	}
	.inputBox-blue {
		.icon {
			&:before {
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
	}
	.buttonBox {
		display: flex;
		flex-wrap: wrap;
		margin-top: 3.1vw;
		gap: 3.1vw;
		button {
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			background: #374375;
			padding: 2vw 3vw;
			border-radius: 100px;
			font-size: 3.2vw;
			&.active {
				background: #717fba;
				color: ${({ theme }) => theme.mobile.white};
			}
		}
	}
	.buttonBox button[disabled] {
		background: #232b4f !important;
		color: #374375 !important;
	}
	.group-dropdown {
		width: 100%;
		.inputBox {
			width: 100%;
		}
		.text-dropdown {
			span {
				font-size: 3.2vw;
			}
		}
	}
	.Amount,
	.Channel {
		.inputBox-blue {
			margin-top: 1vw;
		}
		.infoModule {
			width: 100%;
		}
		.selectModule {
			display: block;
		}
	}
	.Channel {
		.inputBox-blue {
			margin-top: 0;
		}
		.infoModule {
			display: flex !important;
			width: 100% !important;
			gap: 2vw !important;
		}
		.btn-group {
			a {
				width: 9vw;
				height: 9vw;
				background: #374375;
				padding: 0;
				.icon {
					&:before {
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
						font-size: 7.5vw;
					}
				}
			}
		}
	}
	.Promotion {
		.group-dropdown {
			.spacing-input-0 {
				margin-top: 0;
			}
		}
		.infoModule {
			width: 100%;
		}
	}

	.block-qr-code {
		.title {
			text-align: left;
			background: none;
			padding: 0;
			border: none;
			border-radius: 0;
			margin-bottom: 3.5vw;
		}
		.qrCode {
			background: ${({ theme }) => theme.mobile.white};
			max-width: 27vw;
			height: 27vw;
			padding: 2vw;
			border-radius: 10px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.important {
		flex: 0 0 21.8rem;
		border-radius: 20px;
		padding: 2rem 1.6rem;
		background: ${({ theme }) => theme.desktop.importantBg};
		margin-top: 1.6rem;
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
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				a,
				span {
					color: #1b5bff;
					font-weight: 600;
				}
			}
		}
	}

	.depositModule > .title .info {
		color: #f77a00;
		margin-left: 0.75vw;
		font-size: 2.75vw;
	}

	.infoAccount {
		border-top: 1px solid #374375;
		padding-top: 3.5vw;
		width: 100%;
		.selected-bank {
			display: flex;
			margin-bottom: 2.5vw;
			padding-bottom: 0;
			align-items: center;
			gap: 0.8rem;
			img {
				height: 11.6vw;
				width: 11.6vw;
				border-radius: 10px;
			}
			> div {
				color: #fff;
				font-size: 3.4vw;
				font-weight: 700;
				text-align: left;
			}
		}
		.input-type {
			display: flex;
			align-items: center;
			background: #232b4f;
			margin-bottom: 2.9vw;
			padding: 1.5vw 2vw;
			border-radius: 5px;
			justify-content: space-between;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			font-size: 3.5vw;
			&:last-child {
				margin-bottom: 0;
			}
			.icon {
				margin: 0;
				&:before {
					font-size: 5vw;
					color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				}
			}
		}
		&.remark {
			.title {
				padding: 0;
				background: none;
				border-bottom: 0;
				text-align: left;
				margin-bottom: 3.1vw;
			}
		}
	}
	.Bank {
		.Deposit {
			&.Amount {
				.title {
					text-align: left;
					background: none;
					padding: 0;
					border: none;
					border-top: 1px solid #374375;
					padding-top: 3.5vw;
					border-radius: 0;
					margin-bottom: 3.5vw;
				}
			}
		}
	}

	.infoModule {
		.btnGroup {
			margin-top: 0;
		}
	}

	.mobile-payform {
		.Channel {
			.selectModule {
				display: flex;
			}
		}
	}
	.bankimg {
		max-width: 34vw;
		margin: 3vw auto;
		border-radius: 10px;
	}
`
