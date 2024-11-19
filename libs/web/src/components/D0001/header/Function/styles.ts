import styled from 'styled-components'

export const FunctionContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: end;
	position: relative;
	gap: 1.2rem;

	.btn {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: nowrap;
		min-width: 6.2rem;
		height: 3.6rem;
		padding: 0 1.2rem;
		border-radius: 10rem;

		&:hover {
			box-shadow: none;
		}
	}

	.btn-login {
		background: ${({ theme }) => theme.desktop.headerLoginBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.headerLoginBtnShadow};
		color: ${({ theme }) => theme.desktop.headerLoginBtnColor};

		&:hover {
			background: ${({ theme }) => theme.desktop.headerLoginBgHover};
		}
	}

	.btn-join {
		background: ${({ theme }) => theme.desktop.headerRegisterBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.headerRegisterBtnShadow};
		color: ${({ theme }) => theme.desktop.headerRegisterBtnColor};

		&:hover {
			background: ${({ theme }) => theme.desktop.headerRegisterBgHover};
		}
	}

	.btn-line-login {
		display: flex;
		background: ${({ theme }) => theme.desktop.headerLineLoginBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.headerLineLoginBtnShadow};
		color: ${({ theme }) => theme.desktop.headerLineLoginBtnColor};
		&:hover {
			background: ${({ theme }) => theme.desktop.headerLineLoginBgHover};
		}

		align-items: center;
		img {
			width: 2rem;
			height: 2rem;
		}
	}

	.forgot {
		position: absolute;
		top: 4rem;
		color: ${({ theme }) => theme.desktop.headerForgotPasswordColor};
		font-size: 1rem;
		font-style: italic;
	}

	.flag {
		display: flex;
		align-items: center;

		&:before {
			width: 3.4rem;
			height: 3.4rem;
		}
	}

	.country-list {
		min-width: 280px;
		display: none;
		position: absolute;
		margin-top: 40px;
		background: #ececec;
		border-radius: 15px;
		padding: 0 6px;
		right: 0;
		top: 55px;
		z-index: 3;
		box-shadow: 0 0 10px #0a1b389e;

		.country-option {
			height: 350px;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			background: #fff;
			border-radius: 15px;
			padding: 10px 20px;
			margin: 6px 0;
			font-size: 14px;
			/* width */
			&::-webkit-scrollbar {
				width: 5px;
			}

			/* Track */
			&::-webkit-scrollbar-track {
				background: transparent;
			}

			/* Handle */
			&::-webkit-scrollbar-thumb {
				background: #888;
				border-radius: 15px;
			}

			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background: #555;
			}

			button,
			div {
				margin: 6px 0;
			}

			.flag {
				display: flex;
				align-items: center;
				&:before {
					width: 25px;
					height: 25px;
					margin-right: 14px;
					bottom: 1px;
					border-color: #dadada;
				}
			}
		}

		.country-name {
			font-weight: bold;
			font-size: 14px;
			margin-bottom: 4px;
		}

		button,
		a,
		div {
			display: flex;
			align-items: center;
			color: #0a1b38;
			flex-flow: row;
			button {
				border-right: 1px solid $blue16;
				border-right-color: #878787;

				padding: 0 8px;
				&:last-child {
					border-right: 0;
					padding: 0 0 0 8px;
				}
				&:first-child {
					padding: 0 8px 0 0;
				}
				&:hover {
					color: $orange;
				}
			}
		}
		&.active {
			display: block;
		}
	}

	.country-current {
		margin: 6px 0;
		background: #fff;
		border-radius: 15px;
		padding: 20px;
		display: flex;
		align-items: center;

		.flag {
			display: flex;
			align-items: center;
			&:before {
				width: 38px;
				height: 38px;
				margin-right: 14px;
				bottom: 1px;
				border-color: #dadada;
			}
		}
		button {
			font-size: 12px;
			color: #878787;
		}
		.country-info {
			flex-direction: column;
			align-items: flex-start;
		}
		.country-name {
			color: #0a1b38;
		}
		div {
			display: flex;
			align-items: center;
			color: #0a1b38;
			flex-flow: row;
			button {
				border-right: 1px solid $blue16;
				border-right-color: #878787;

				padding: 0 8px;
				&:last-child {
					border-right: 0;
					padding: 0 0 0 8px;
				}
				&:first-child {
					padding: 0 8px 0 0;
				}
				&:hover {
					color: $orange;
				}
			}
		}
	}

	.memberinfo {
		width: 60px;
		margin-right: 5px;
	}

	.grade {
		margin-right: 10px;
		&-text {
			display: flex;
			align-items: center;
			color: #fff;
			&.active {
				&::after {
					transform: rotate(180deg);
					transition: 0.35s;
				}
			}
			&::after {
				content: '';
				display: block;
				background: url(#{$public-banner-host}/desktop/img/4.0/down-1.png)
					no-repeat center center / cover;
				width: 12px;
				height: 14px;
				margin-left: 5px;
				transition: 0.35s;
			}
		}
		&-color {
			display: flex;
			align-items: center;
			.dots {
				width: 15px;
				height: 15px;
				background: #e8ae37;
				border-radius: 50px;
				margin-right: 4px;
			}
		}
		&.vintage {
			.dots {
				background: #c8600b;
			}
		}
		&.silver {
			.dots {
				background: #cacaca;
			}
		}
		&.gold {
			.dots {
				background: #ce9b0a;
			}
		}
		&.titanium {
			.dots {
				background: #828282;
			}
		}
		&.diamond {
			.dots {
				background: #63cde0;
			}
		}
		&.nova {
			.dots {
				background: #d4d4d4;
			}
		}
		&.active {
			.home-profile {
				display: block;
			}
		}
	}
	.message {
		position: relative;
		display: none;
		img {
			width: 75%;
		}
		&-text {
			position: absolute;
			top: -4px;
			right: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: red;
			width: 10px;
			height: 10px;
			border-radius: 50px;
		}
		.msgPop {
			display: flex;
			position: absolute;
			top: 1px;
			left: -10px;
			transform: translateY(100%);
			background: #ff7600;
			padding: 6px 12px 6px 15px;
			display: flex;
			align-items: center;
			border-radius: 10px;
			z-index: 3;
			box-shadow: 0 0 3px #797979;
			div {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 150px;
			}
			button {
				border: 1px solid white;
				color: #fff;
				width: 18px;
				height: 18px;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				margin: 0 0 0 10px;
				&::before {
					transform: scale(0.7);
				}
			}
			&::after {
				border-color: transparent transparent #ff7600;
				border-style: solid solid solid solid;
				border-width: 8px;
				top: 1px;
				content: '';
				height: 0;
				position: absolute;
				width: 0;
				transform: translateY(-100%);
			}
		}
		&.active {
			display: block;
		}
	}
	.line {
		border-right: 1px solid white;
		height: 40px;
		margin: 0 10px;
	}
	.home-balance {
		.wallet {
			color: #fff;
			display: flex;
			align-items: center;
			&.active {
				&::after {
					transform: rotate(180deg);
					transition: 0.35s;
				}
			}
			&::after {
				content: '';
				display: block;
				background: url(#{$public-banner-host}/desktop/img/4.0/down-1.png)
					no-repeat center / cover;
				width: 12px;
				height: 14px;
				margin-left: 5px;
				transition: 0.35s;
			}
		}
		.icon-spinner {
			&::before {
				content: '';
				display: block;
				background: url(#{$public-banner-host}/desktop/img/4.0/refresh-1.png)
					no-repeat center / cover;
				width: 15px;
				height: 15px;
				margin-right: 2px;
			}
			&.active {
				animation: rotate 0.5s linear 2;
			}
		}
		.icon-plus {
			&::before {
				cursor: pointer;
				content: '';
				display: block;
				background: url(#{$public-banner-host}/desktop/img/4.0/plus.png)
					no-repeat center / cover;
				width: 15px;
				height: 15px;
				margin-left: 2px;
			}
		}
		.icon-minus {
			&::before {
				cursor: pointer;
				content: '';
				display: block;
				background: url(#{$public-banner-host}/desktop/img/4.0/minus.png)
					no-repeat center / cover;
				width: 15px;
				height: 15px;
				margin-left: 2px;
			}
		}
		.balance-money {
			display: flex;
			align-items: center;
		}
		.balance-submenu {
			display: none;
			background: #fff;
			position: absolute;
			top: 95px;
			right: 20px;
			z-index: 3;
			color: #0a1b38;
			border-radius: 20px;
			padding: 20px;
			font-size: 12px;
			width: 300px;
			box-shadow: 0 0 10px #0a1b389e;
			.balance {
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				padding: 0 8px;
				margin-bottom: 10px;

				span {
					&:nth-child(2) {
						display: flex;
						align-items: center;
					}
				}
				.refresh-icon {
					margin-left: 2px;
					&::after {
						display: block;
						content: '';
						background: url(#{$public-banner-host}/desktop/img/4.0/refresh_w.png)
							no-repeat center / cover;
						width: 16px;
						height: 16px;
					}
				}
			}
			.walletBalance {
				background: #cdcdcd;
				padding: 8px;
				font-size: 15px;
				border-radius: 6px;
				margin-bottom: 10px;
				.walletName {
					display: flex;
					justify-content: space-between;
				}
				.bouns {
					font-size: 13px;
					display: flex;
					justify-content: space-between;
					margin-top: 10px;
				}
				.percentage {
					font-size: 13px;
				}
			}
			.btnGroup {
				margin: 20px 0;
				a {
					&:nth-child(2) {
						margin-left: 10px;
					}
				}
				.orange {
					font-size: 14px;
					background: #0a1b38;
					margin: 0;
					&:hover {
						background: #ff7600;
					}
				}
			}
			.loginLog {
				display: flex;
				justify-content: space-between;
			}
			.transactionLog {
				display: flex;
				justify-content: space-between;
				margin-top: 5px;
			}
		}
		&.active {
			.balance-submenu {
				display: block;
			}
		}
	}
	.deposit-btn {
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ff7600;
		width: 125px;
		height: 48px;
		border-radius: 50px;
		margin-left: 10px;
		color: #fff;
	}
`

export const LoginForm = styled.div`
	position: relative;
	display: flex;

	.form {
		display: flex;
	}

	.form-input {
		display: flex;
		padding: 1rem 2.4rem 1rem 1.2rem;
		flex-direction: column;
		align-items: flex-start;
		gap: 3rem;
		align-self: stretch;
		border-radius: 10rem;
		background: ${({ theme }) => theme.desktop.headerInputBg};
		color: ${({ theme }) => theme.desktop.headerInputColor};
		font-size: 1.4rem;
		text-align: left;
		border: none;
		outline: none;

		&::placeholder {
			color: ${({ theme }) => theme.desktop.headerInputPlaceHolderColor};
		}

		&:-webkit-autofill {
			box-shadow: none;
			-webkit-text-fill-color: white;
		}

		&:focus-within {
			border: none;
			outline: none;
		}
	}

	.form-input + .form-input {
		margin-left: 1.2rem;
	}
`
