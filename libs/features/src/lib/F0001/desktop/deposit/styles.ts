import styled from 'styled-components'

export const WrapperDeposit = styled.div`
	.infoModule {
		overflow: unset !important;
	}
	.inside-title {
		justify-content: space-between;
		.group-icon-title {
			display: flex;
			gap: 1rem;
			align-items: center;
		}
		.btnGroup {
			margin-top: 0;
		}
	}
	.icon-service-fill {
		&:before {
			font-size: 1.6rem !important;
		}
	}
	.deposit-group-title {
		.title {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			position: relative;
			min-height: 3.6rem;
			font-size: 1.4rem;
			font-style: normal;
			font-weight: 400;
			line-height: 1.8rem;
			padding-bottom: 1.6rem;
			display: flex;
			align-items: center;
			border-bottom: 1px solid
				${({ theme }) => theme.desktop.rightModuleBorderColor};
			&-text {
				max-width: 40rem;
			}
		}
		.checkbox {
			&.autotransfer {
				display: flex;
				align-items: center;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				position: absolute;
				top: 0;
				right: 0;
				gap: 0.8rem;
				.icon {
					&:before {
						margin: 0;
						font-size: 2rem;
						color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
				}
			}
		}
	}
	.block-deposit {
		border-bottom: 1px solid
			${({ theme }) => theme.desktop.rightModuleBorderColor};
		padding: 1.6rem 0;
		.subModuleTitle {
			margin-bottom: 1.2rem;
			display: flex;
			.heading {
				color: ${({ theme }) => theme.desktop.white};
				font-size: 1.4rem;
				font-weight: 700;
				line-height: normal;
			}
			.info {
				color: ${({ theme }) => theme.desktop.primaryBtnBg};
				font-size: 1.2rem;
				font-weight: 400;
			}
		}
		.subModule {
			> div {
				display: flex;
				gap: 2.4rem;
				.btn-bank {
					width: auto;
					text-align: center;
					button {
						width: 4.8rem;
						height: 4.8rem;
						background: ${({ theme }) => theme.desktop.bankBgColor};
						border-radius: 10px;
						border: 2px solid ${({ theme }) => theme.desktop.bankBgColor};
						position: relative;
						overflow: hidden;
						.icon-qrpay {
							&:before {
								background: none;
								content: '\\e936';
								color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
								font-size: 2.4rem;
							}
						}
						.icon-library {
							&:before {
								content: '\\e917';
								color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
								font-size: 2.4rem;
							}
						}
						.icon-connection {
							&:before {
								content: '\\e941';
								color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
								font-size: 2.4rem;
							}
						}
						.icon-mobile {
							&:before {
								content: '\\e931';
								color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
								font-size: 2.4rem;
							}
						}
						.icon-check {
							display: none;
						}
						&.active {
							border: 2px solid ${({ theme }) => theme.desktop.primaryBtnBg};
							.icon {
								&:before {
									color: ${({ theme }) => theme.desktop.white};
								}
							}
							.icon-check {
								display: block;
								width: 1.8rem;
								height: 1.8rem;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: 5px;
								position: absolute;
								right: -3px;
								bottom: -1px;
								background: ${({ theme }) => theme.desktop.primaryBtnBg};
								&:before {
									font-size: 2rem !important;
								}
							}
						}
					}
					.bank {
						text-align: center;
						font-size: 1rem;
						font-weight: 700;
						line-height: normal;
						margin-top: 0.8rem;
						color: ${({ theme }) => theme.desktop.rightModuleBorderColor};
						&.active {
							color: ${({ theme }) => theme.desktop.primaryBtnBg};
						}
					}
				}
			}
		}
		.selectBank {
			> div {
				.btn-bank {
					display: flex;
					gap: 0.8rem;
					min-width: 12.7rem;
					button {
						flex: 0 0 4.8rem;
					}
					.bank {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						gap: 0.4rem;
						color: ${({ theme }) => theme.desktop.white};
						&.active {
							color: ${({ theme }) => theme.desktop.white};
						}
						> div {
							&:first-child {
								font-size: 1.4rem;
							}
							&:last-child {
								font-size: 1.2rem;
								font-weight: 400;
								color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
							}
						}
					}
				}
			}
		}
	}

	.bankAccount {
		gap: 1.2rem !important;
		.heading {
			font-size: 1.41rem;
			font-weight: 400;
			line-height: 1.8rem;
		}
		.smallList {
			margin-top: 0;
			border-radius: 10px;
			border: 1px solid ${({ theme }) => theme.desktop.borderColorBankAccount};
			padding: 0.8rem;
			max-width: 35.2rem;
			width: auto;
			margin-right: auto;
			ul {
				display: flex;
				justify-content: space-between;
				width: 100%;
				flex-wrap: nowrap;
				gap: 0.8rem;
				align-items: center;
			}
			> ul li {
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				white-space: nowrap;
				padding: 0 0.8rem;
				min-width: 13rem;
				width: auto;
				display: flex;
				align-items: center;
				font-size: 1.4rem;
				font-weight: 400;
				line-height: 1.8rem;
				min-height: 3rem;
			}
			.icon {
				padding-right: 0.8rem;
				&:before {
					font-size: 2rem;
					margin: 0;
				}
			}
			> ul li:nth-child(odd) {
				color: #5574a7;
			}
			> ul li:first-child {
				color: #5574a7;
				text-align: left;
				font-size: 1.4rem;
				font-weight: 600;
				line-height: 1.8rem;
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			}
			.remark {
				background: #232b4f;
				border-radius: 5px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
			}
			.remark + .tip {
				padding: 0;
			}
		}
	}
	.Amount {
		.shortcut {
			margin-top: 1.2rem;
			gap: 0.8rem !important;
			.btn-deposit-amount {
				background: ${({ theme }) => theme.desktop.btnDepositAmountBg};
				min-height: 2.8rem;
				color: ${({ theme }) => theme.desktop.btnDepositAmountColor};
			}
			button[disabled] {
				background: ${({ theme }) => theme.desktop.btnDepositAmountBgDisabled};
				color: ${({ theme }) => theme.desktop.btnDepositAmountColorDisabled};
				cursor: no-drop;
				pointer-events: auto !important;
			}
		}
		.subModule {
			width: max-content;
			.iconModule {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}
		.inputBox-white {
			min-height: 3.6rem;
			gap: 0 !important;
			align-items: center;
			background: ${({ theme }) => theme.desktop.inputBg};
			border-radius: 100px;
			padding: 0 1.2rem;
			.iconModule {
				color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				.icon {
					&:before {
						color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
				}
			}
		}
	}
	.Slip {
		border-bottom: none;
		.subModule {
			display: flex;
			align-items: center;
			gap: 1.2rem;
		}
		.btn-bank-slip {
			width: max-content;
			margin-top: 0;
		}
		.tool-tip-click {
			width: max-content;
			cursor: pointer;
			position: relative;
			.icon {
				&:before {
					margin: 0;
					font-size: 2rem;
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
		}
	}

	.Promotion {
		padding-top: 0;
		.subModule {
			display: flex;
			align-items: center;
			gap: 1.2rem;
			.inputBox-blue {
				margin-top: 1.2rem;

				flex: 0 0 23.4rem;
			}
		}
	}

	.form {
		.btnGroup {
			max-width: 10rem;
		}
	}
	.inside-body {
		display: flex;
		align-items: flex-start;
		gap: 1.6rem;
	}
	.subModuleListColumn {
		flex: auto;
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
				a {
					color: #1b5bff;
				}
			}
		}
	}

	.deposit-table {
		max-width: max-content;
		a {
			min-height: 2.8rem;
		}
	}
	.history {
		width: 100%;
		margin-top: 2.4rem;
	}

	.Channel {
		.subModule {
			width: 50%;
			position: relative;
			.btn {
				width: 100%;
			}
		}
		.btn-check {
			width: 3.6rem;
			height: 3.6rem;
			background: ${({ theme }) => theme.desktop.bgAddNewModalButton};
			border-radius: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: -50px;
			top: 0;
			.icon {
				&:before {
					font-size: 2rem;
				}
			}
		}
		.btnGroup {
			max-width: max-content;
		}
	}
	.Promotion {
		padding-top: 1.6rem;
		.subModuleTitle {
			margin-bottom: 0;
		}
	}
	.qrCode {
		background: ${({ theme }) => theme.desktop.white};
		max-width: 14.4rem;
		width: 100%;
		border-radius: 10px;
		overflow: hidden;
	}

	// .swithModule .icon {
	// 	color: #5574a7;
	// 	font-size: 18px;
	// 	font-weight: bold;
	// 	margin-bottom: -2px;
	// }
	// .swithModule .icon:hover ~ .inputInfo.transfer {
	// 	display: block;
	// }
	// .swithModule .inputInfo {
	// 	display: none;
	// 	background: #d2e2f9;
	// 	border-radius: 5px;
	// 	padding: 5px 10px;
	// 	position: absolute;
	// 	bottom: 40px;
	// 	right: -5px;
	// 	min-width: 500px;
	// 	font-weight: 400;
	// 	color: #5574a7;
	// 	z-index: 4;
	// 	-webkit-filter: drop-shadow(0px 0px 2px #5574a7);
	// 	filter: drop-shadow(0px 0px 2px #5574a7);
	// }
	// .swithModule .inputInfo.active {
	// 	display: block;
	// }
	// .swithModule .inputInfo:before {
	// 	content: '';
	// 	width: 0;
	// 	height: 0;
	// 	border-width: 10px 10px 0 10px;
	// 	border-style: solid dashed dashed;
	// 	border-color: #d2e2f9 transparent transparent;
	// 	position: absolute;
	// 	bottom: -10px;
	// 	right: 10px;
	// 	z-index: 1;
	// }
	// .swithModule .inputInfo span {
	// 	display: block;
	// 	font-size: 14px;
	// 	font-weight: bold;
	// 	color: #cf0404;
	// 	margin: 0 auto;
	// }
	// .swithModule .inputInfo .btnGroup button {
	// 	padding: 5px 0;
	// 	-webkit-box-flex: 0;
	// 	-ms-flex: 0 0 80px;
	// 	flex: 0 0 80px;
	// }
	// .subModuleTitle {
	// 	color: #112240;
	// 	font-weight: bold;
	// 	margin-bottom: 10px;
	// 	position: relative;
	// 	display: -webkit-box;
	// 	display: -ms-flexbox;
	// 	display: flex;
	// }
	// .subModuleTitle .info {
	// 	margin-left: 5px;
	// 	color: rgba(247, 121, 0, 0.9);
	// 	font-weight: normal;
	// 	font-size: 13px;
	// }
	// .subModuleTitle .txt-blue {
	// 	color: #f77900;
	// }
	// .subModuleTitle .autotransfer {
	// 	right: 0;
	// }
	// .subModuleTitle .autotransfer .swithModule {
	// 	position: unset;
	// }
	// .subModuleTitle .autotransfer .icon-question {
	// 	font-weight: normal;
	// 	font-size: 18px;
	// 	color: #5574a7;
	// 	display: -webkit-box;
	// 	display: -ms-flexbox;
	// 	display: flex;
	// }
	// .subModuleTitle .autotransfer .icon-question + .inputInfo {
	// 	display: none;
	// 	background: #d2e2f9;
	// 	border-radius: 5px;
	// 	padding: 5px 10px;
	// 	position: absolute;
	// 	bottom: 30px;
	// 	right: -5px;
	// 	min-width: 500px;
	// 	font-weight: normal;
	// }
	// .subModuleTitle .autotransfer .icon-question + .inputInfo:before {
	// 	content: '';
	// 	width: 0;
	// 	height: 0;
	// 	border-width: 10px 10px 0 10px;
	// 	border-style: solid dashed dashed;
	// 	border-color: #d2e2f9 transparent transparent;
	// 	position: absolute;
	// 	bottom: -10px;
	// 	right: 10px;
	// 	z-index: 1;
	// }
	// .subModuleTitle .autotransfer .icon-question + .inputInfo.active {
	// 	display: block;
	// }
`
