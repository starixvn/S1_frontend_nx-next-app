import styled from 'styled-components'

export const WrapperSettingPage = styled.div`
	.after {
		.menu-top {
			background: url(${({ theme }) =>
					theme.assetUrl}/h5/img/new-ui/menu-after-bg.webp)
				no-repeat center/cover;
			height: 42vw;
			border-radius: 0 0 20px 20px;
			.profile-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 6vw 4vw 3vw 4vw;
				> div {
					display: flex;
					align-items: center;
					gap: 1.2rem;
				}
				&-user {
					background: #d7dcef;
					width: 10vw;
					height: 10vw;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 100px;
					.icon-user-2-fill {
						&:before {
							font-size: 6.5vw;
						}
					}
				}
				.message {
					width: 10vw;
					height: 10vw;
					border-radius: 10px;
					background: #717fba;
					display: flex;
					align-items: center;
					justify-content: center;
					&.active {
						.icon {
							&:after {
								top: 0;
								left: 5vw;
								position: absolute;
								display: block;
								content: '';
								background: red;
								width: 2vw;
								height: 2vw;
								border-radius: 10px;
								-webkit-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
								-webkit-animation: 1.5s ease 0s infinite normal none move;
								animation: 1.5s ease 0s infinite normal none move;
							}
						}
					}
					.icon {
						position: relative;
						&:before {
							font-size: 5.6vw;
							color: ${({ theme }) => theme.desktop.white};
						}
					}
				}
			}
			.group-user-name {
				.user-name {
					font-size: 3.4vw;
					font-weight: 700;
					line-height: normal;
				}
				a {
					display: flex;
					align-items: center;
					gap: 0.4rem;
					color: ${({ theme }) => theme.desktop.white};
					font-weight: 600;
					font-size: 1.2rem;
				}
			}
			&-balance {
				padding: 0 4vw;
				margin-top: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.balance-group {
					.balance-name {
						font-size: 3vw;
						font-weight: 600;
						line-height: normal;
					}
					.balance-number {
						font-size: 4.1vw;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
					}
				}
				.btnGroup {
					margin-top: 0;
				}
			}
		}

		.wallet-box {
			background: ${({ theme }) => theme.desktop.rightModuleBg};
			margin: -11vw 4vw 0;
			border-radius: 15px;
			color: #0a1b38;
			border-radius: 20px;
			overflow: hidden;
			.bank-list {
				display: flex;
				justify-content: space-around;
				margin-top: 5vw;
			}
			.bank-list > a {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 0 0 19vw;
				line-height: 4vw;
				text-align: center;
			}
			.money-name {
				color: #ea6118;
				font-size: 3.4vw;
				font-weight: 700;
				line-height: normal;
			}
			.bank-list > a img {
				width: 10vw;
				margin-bottom: 2vw;
			}
			.bank-list > a > div {
				font-weight: 500;
				color: #0a1b38;
			}
			.casino-wallet {
				margin-top: 5vw;
			}
			.casino-wallet-item {
				background: #efefef;
				padding: 5vw 3vw 3vw;
				border-radius: 10px;
			}
			.casino-wallet-item .money {
				display: flex;
				justify-content: space-between;
				font-weight: 500;
				margin-bottom: 2vw;
			}
			.casino-wallet-item .money > div:last-child {
				margin-right: 1vw;
			}
			.casino-wallet-item .progress {
				background: white;
				width: 74vw;
				height: 2vw;
				border-radius: 20px;
			}
			.casino-wallet-item .progress-bar {
				background: -webkit-gradient(
					linear,
					left top,
					right top,
					from(rgb(56, 117, 227)),
					to(rgb(167, 167, 167))
				);
				background: linear-gradient(
					90deg,
					rgb(56, 117, 227) 0%,
					rgb(167, 167, 167) 100%
				);
				width: 50vw;
				height: 2vw;
				border-radius: 20px;
			}
			.casino-wallet-item .progress-number {
				text-align: end;
				margin-top: 1vw;
				color: #a7a7a7;
				margin-right: 1vw;
			}
			.wallet-list {
				margin-bottom: 9vw;
			}
			.wallet-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 500;
				padding: 3vw 3.5vw;
				font-size: 3.4vw;
				font-weight: 600;
				line-height: normal;
			}
			.wallet-list-item.main-wallet {
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.rightModuleBorderColor};
				background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
				color: ${({ theme }) => theme.desktop.white};
			}
			.wallet-list a {
				background: -webkit-gradient(
					linear,
					left top,
					right top,
					from(rgb(30, 62, 119)),
					to(rgb(50, 95, 177))
				);
				background: linear-gradient(
					90deg,
					rgb(30, 62, 119) 0%,
					rgb(50, 95, 177) 100%
				);
				padding: 2vw;
				border-radius: 50px;
				padding: 3vw;
				display: block;
				width: 100%;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				text-align: center;
			}
		}
	}
	@-webkit-keyframes move {
		0% {
			opacity: 1;
		}
		10% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
		}
		80% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			opacity: 1;
		}
	}
	@keyframes move {
		0% {
			opacity: 1;
		}
		10% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.5vw;
		}
		80% {
			-webkit-transform: translate3d(-0.1vw, 0, 0);
			transform: translate3d(-0.1vw, 0, 0);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			box-shadow: rgba(255, 0, 0, 0.4705882353) 0 0 0 0.8vw;
			opacity: 1;
		}
	}
`
