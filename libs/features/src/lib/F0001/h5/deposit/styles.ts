import styled from 'styled-components'

export const WrapperDepositH5 = styled.div`
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
			> div {
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
				width: auto;
				background: #374375;
				padding: 1rem 1rem;
				.icon {
					&:before {
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
						font-size: 4.5vw;
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
	}

	// .depositModule > .title.fast:after {
	// 	content: '';
	// 	background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/fast-icon.png)
	// 		no-repeat center/cover;
	// 	display: block;
	// 	width: 14vw;
	// 	height: 4vw;
	// 	margin-left: 1vw;
	// }
	.depositModule > .title .info {
		color: #f77a00;
		margin-left: 0.75vw;
		font-size: 2.75vw;
	}

	.depositModule .selectModule .infoAccount {
		width: 100%;
		margin: 2vw 2vw -0.5vw;
		padding-top: 2vw;
		border-top: 1px solid #bfcce2;
	}
	.depositModule .selectModule .infoAccount li {
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
	}
	.depositModule .selectModule .infoAccount li:first-child {
		padding-top: 0;
	}
	.depositModule .selectModule .infoAccount li:last-child {
		padding-bottom: 0;
	}
	.depositModule .selectModule .infoAccount li > img {
		margin-right: 1vw;
	}
	.depositModule .selectModule .infoAccount li span {
		width: 69vw;
		color: #fff;
		background: #5574a7;
		border-radius: 3px;
		padding: 1vw 0 1vw 1.5vw;
	}
	.depositModule .selectModule .infoAccount li button {
		margin: 0 0 0 1.5vw;
	}
	.depositModule .selectModule .infoAccount .title {
		border: 0;
		margin-top: 0;
		padding: 0;
	}
	.depositModule .selectModule .infoAccount .tip {
		color: #666;
	}
	.depositModule .selectModule.inner {
		width: 100%;
		padding: 0 2vw;
	}
	.depositModule .selectModule.inner .infoModule {
		margin: 1vw 0 0;
	}
	.depositModule .selectModule.inner .infoModule .inputBox,
	.depositModule .selectModule.inner .infoModule .euro .inputBox-event,
	.euro .depositModule .selectModule.inner .infoModule .inputBox-event,
	.depositModule
		.selectModule.inner
		.infoModule
		.worldcupEvent
		.event
		.event-content
		.inputBox-event,
	.worldcupEvent
		.event
		.event-content
		.depositModule
		.selectModule.inner
		.infoModule
		.inputBox-event {
		margin-right: 1vw;
	}
	.depositModule .selectModule .parts .inputBox,
	.depositModule .selectModule .parts .euro .inputBox-event,
	.euro .depositModule .selectModule .parts .inputBox-event,
	.depositModule
		.selectModule
		.parts
		.worldcupEvent
		.event
		.event-content
		.inputBox-event,
	.worldcupEvent
		.event
		.event-content
		.depositModule
		.selectModule
		.parts
		.inputBox-event {
		margin: 0;
	}

	.depositModule .selectModule li span {
		padding: 0 0 0 1.5vw;
	}
	.depositModule .selectModule li button {
		margin: 0 1.5vw 0;
	}
	// .depositModule .selectModule .bankName.fast::after {
	// 	content: '';
	// 	background: url(https://minio-api.lumigame.com/s1-nova88/desktop/img/fast-icon.png)
	// 		no-repeat center/cover;
	// 	display: block;
	// 	width: 13vw;
	// 	height: 4vw;
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// }
	.depositModule .selectModule .bankName.open:before {
		content: '●';
		border-radius: 100%;
		color: #42ac5e;
		position: absolute;
		top: -2vw;
		right: 0;
		font-size: 5vw;
	}
	.depositModule .selectModule .bankName.close:before {
		content: '●';
		border-radius: 100%;
		color: #e92529;
		position: absolute;
		top: -2vw;
		right: 0;
		font-size: 5vw;
	}
	.depositModule .selectModule .bankName.pending {
		width: auto;
	}
	.depositModule .selectModule .bankName.pending .mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(40, 73, 133, 0.6);
		border-radius: 5px;
		z-index: 1;
	}
	.depositModule .selectModule .bankName .bank {
		margin: 0 0 0 3vw;
		position: absolute;
		left: 24vw;
	}
	.depositModule .selectModule .bankName .bank > div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 50vw;
	}
	.depositModule .selectModule .bankName .bank > div:first-child {
		color: #5574a7;
	}
	.depositModule .selectModule .bankName .bank > div:last-child {
		color: #666;
	}
	.depositModule .selectModule .bankName img {
		width: auto;
		max-width: 20vw;
		margin: 0 auto;
		display: block;
	}
	.depositModule .selectModule .inputBox,
	.depositModule .selectModule .euro .inputBox-event,
	.euro .depositModule .selectModule .inputBox-event,
	.depositModule
		.selectModule
		.worldcupEvent
		.event
		.event-content
		.inputBox-event,
	.worldcupEvent
		.event
		.event-content
		.depositModule
		.selectModule
		.inputBox-event {
		margin: 1.5vw 0;
		padding: 0 1.2vw;
	}
	.depositModule .selectModule .inputBox input,
	.depositModule .selectModule .euro .inputBox-event input,
	.euro .depositModule .selectModule .inputBox-event input,
	.depositModule
		.selectModule
		.worldcupEvent
		.event
		.event-content
		.inputBox-event
		input,
	.worldcupEvent
		.event
		.event-content
		.depositModule
		.selectModule
		.inputBox-event
		input {
		padding: 1.5vw;
	}
	.depositModule .selectModule .title {
		margin-top: 2vw;
		padding-top: 1.5vw;
		width: 100%;
		text-align: left;
		border-top: 1px solid #bfcce2;
		font-size: 3.2vw;
	}
	.depositModule .selectModule .title span {
		color: #e92529;
		margin-right: 0.5vw;
	}

	.depositModule .downloadModule {
		margin: 2vw 0;
		padding: 2vw;
		position: relative;
		text-align: center;
		overflow: hidden;
	}
	.depositModule .downloadModule .guideMark {
		position: absolute;
		width: calc(100% - 19vw);
		height: calc(100% - 4vw);
		top: 0;
		left: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		z-index: 2;
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		border-color: rgba(210, 226, 249, 0.5);
		border-style: solid;
		border-width: 2vw 9.5vw;
		background: transparent;
		pointer-events: none;
	}
	.depositModule .downloadModule .swiper-container {
		position: relative;
		padding: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		width: 45vw;
		overflow: unset;
	}
	.depositModule .downloadModule .swiper-pagination-bullets {
		bottom: -3vw;
	}
	.depositModule .input-group {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.depositModule .input-group .inputBox,
	.depositModule .input-group .euro .inputBox-event,
	.euro .depositModule .input-group .inputBox-event,
	.depositModule
		.input-group
		.worldcupEvent
		.event
		.event-content
		.inputBox-event,
	.worldcupEvent
		.event
		.event-content
		.depositModule
		.input-group
		.inputBox-event {
		width: 76vw;
	}
	.depositModule .cardinfo {
		text-align: left;
		margin-top: 2vw;
	}
	.depositModule .cardinfo img {
		border-radius: 5px;
		width: 74vw;
	}
	.depositModule .note {
		width: 100% !important;
		background: #e2e2e2;
		color: #838383;
		border-radius: 5px;
		padding: 1vw 2vw;
		font-size: 3vw;
		text-align: left;
		margin: 1.5vw auto;
	}
	.depositModule .note .title {
		margin: 0 0 1.5vw 0;
		color: #cf0404;
		border-top: 0;
	}
	.depositModule .note .title .icon-warning::before {
		font-size: 3.5vw;
	}
	.depositModule .note li {
		margin-bottom: 2vw;
		line-height: 1.5;
	}
`
