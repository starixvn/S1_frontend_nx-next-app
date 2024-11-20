import styled from "styled-components";

export const HomeProfile = styled.div`
	background: #f9f9f9;
	position: absolute;
	z-index: 3;
	border-radius: 20px;
	right: 257px;
	top: 95px;
	display: none;
	box-shadow: 0 0 10px #0a1b389e;
	width: 282px;

	.home-profile-top {
		background: #efefef;
		padding: 20px;
		border-radius: 20px 20px 0 0;
		color: #0a1b38;
		> div {
			&:first-child {
				display: flex;
				margin-bottom: 5px;
				span {
					color: #ff7600;
					font-size: 16px;
				}
			}
		}
		.vip-img {
			display: flex;
			align-items: center;
			margin-bottom: 5px;
			img {
				width: 75px;
				&:nth-child(2) {
					width: 90px;
				}
			}
		}
		.progress {
			width: 242px;
			height: 6px;
			background: #fff;
			border-radius: 50px;
			.progress-bar {
				background: linear-gradient(90deg, #cdcdcd 10%, #ff7600);
				height: 6px;
				border-radius: 50px;
			}
		}
		.progress-number {
			font-size: 10px;
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			width: 100%;
			a {
				color: #cbcbcb;
				display: flex;
				align-items: center;
				margin-left: 5px;
				&::after {
					display: block;
					content: '';
					background: url(#{$public-banner-host}/desktop/img/4.0/right-4.png)
						no-repeat center / cover;
					width: 12px;
					height: 12px;
				}
			}
		}
	}
	.home-profile-bottom {
		padding: 20px;
		a {
			display: flex;
			align-items: center;
			color: #0a1b38;
			margin-bottom: 15px;
			img {
				width: 30px;
				margin-right: 10px;
			}
		}
		.home-profile-country {
			.flag {
				margin: 0;
				height: 40px;
				span {
					width: 135px;
					text-align: start;
				}
				&::before {
					border: 1px solid #0a1b38;
					width: 25px;
					height: 25px;
					margin: 0 13px 0 0;
				}
				&.arrow {
					&.flag {
						flex-direction: row;
					}
					&.active {
						&::after {
							transform: rotate(180deg);
							transition: 0.35s;
						}
					}
					&::after {
						display: block;
						content: '';
						background: url(#{$public-banner-host}/desktop/img/4.0/down-2.png)
							no-repeat center / cover;
						width: 15px;
						height: 15px;
						margin-left: 50px;
						transition: 0.35s;
					}
				}
			}
			.country-list {
				position: unset;
				min-width: unset;
				margin-top: unset;
				background: transparent;
				box-shadow: unset;
				padding: 0;
			}
			.country-current {
				padding: 15px 10px;
				.flag {
					&::before {
						width: 30px;
						height: 30px;
						margin-right: 7px;
					}
				}
			}
		}
		.logout-btn {
			display: flex;
			align-items: center;
			color: #ff7600;
			margin-top: 15px;
			img {
				width: 25px;
				margin: 0 15px 0 3px;
			}
		}
	}
	&.active {
		display: block;
	}
	&.highest {
		.home-profile-top {
			display: flex;
			flex-direction: column;
			align-items: center;
			.vip-img {
				img {
					width: 85px;
				}
			}
			.highest-text {
				color: #0a1b38;
				margin-left: 10px;
				display: flex;
				align-items: center;
				&::after {
					display: block;
					content: '';
					background: url(#{$public-banner-host}/desktop/img/4.0/right-5.png)
						no-repeat center / cover;
					width: 15px;
					height: 15px;
					margin-left: 5px;
				}
			}
		}
	}
`
export const Grade = styled.div`
	font-size: 1.2rem;

	.grade-text {
		display: flex;
		align-items: center;
		margin-bottom: 0.8rem;
		font-weight: 600;
		color: ${({ theme }) => theme.desktop.gradeTextColor};

		.icon {
			font-size: 2rem;
		}
	}

	.grade-color {
		display: inline-flex;
		padding: 0.3rem 0.8rem;
		gap: 3rem;
		border-radius: 10rem;
		text-align: center;
		font-size: 1rem;
		font-weight: 700;
	}

	&.vintage .grade-color {
		background: ${({ theme }) => theme.desktop.gradeVintageBg};
		color: ${({ theme }) => theme.desktop.gradeVintageColor};
	}

	&.silver .grade-color {
		background: ${({ theme }) => theme.desktop.gradeSilverBg};
		color: ${({ theme }) => theme.desktop.gradeSilverColor};
	}

	&.gold .grade-color {
		background: ${({ theme }) => theme.desktop.gradeGoldBg};
		color: ${({ theme }) => theme.desktop.gradeGoldColor};
	}

	&.titanium .grade-color {
		background: ${({ theme }) => theme.desktop.gradeTitaniumBg};
		color: ${({ theme }) => theme.desktop.gradeTitaniumColor};
	}

	&.diamond .grade-color {
		background: ${({ theme }) => theme.desktop.gradeDiamondBg};
		color: ${({ theme }) => theme.desktop.gradeDiamondColor};
	}

	&.nova .grade-color {
		background: ${({ theme }) => theme.desktop.gradeNovaBg};
		color: ${({ theme }) => theme.desktop.gradeNovaColor};
	}

	&.active {
		${HomeProfile} {
			display: block;
		}

		.icon-chevron_down {
			transform: rotate(180deg);
			transition: 0.35s;
		}
	}
`

export const HomeBalance = styled.div`
	.wallet {
		color: ${({ theme }) => theme.desktop.headerBalanceColor};
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 600;
		.icon {
			font-size: 2rem;
		}
	}

	&.active {
		.icon-chevron_down {
			transform: rotate(180deg);
			transition: 0.35s;
		}
	}

	.icon-spinner {
		.icon {
			font-size: 2rem;
		}
		&.active {
			animation: rotate 0.5s linear 2;
		}
	}

	.balance-money {
		position: relative;
		left: -0.6rem;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 1.2rem;
		font-weight: 600;
		color: ${({ theme }) => theme.desktop.headerBalanceColor};

		.icon {
			cursor: pointer;
		}

		.icon-minus_circle {
			font-size: 2rem;
		}

		.icon-plus-circle {
			font-size: 1.8rem;
		}
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
					background: url(${process.env[
							'NEXT_PUBLIC_BANNER_HOST'
						]}/desktop/img/4.0/refresh_w.png)
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
`

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

		&:hover {
			color: ${({ theme }) => theme.desktop.headerForgotPasswordColorHover};
		}
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
		min-width: 30rem;
		display: none;
		position: absolute;
		background: ${({ theme }) => theme.desktop.countryCurrentBg};
		border-radius: 1.5rem;
		right: 0;
		top: 5.5rem;
		z-index: 3;
		box-shadow: 0 0 1rem #0a1b389e;
		background: #374375;

		.country-option {
			display: flex;
			height: 35rem;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			gap: 0.1rem;
			align-items: flex-start;
			background: ${({ theme }) => theme.desktop.countryOptionsBg};
			border-radius: 0 0 1.5rem 1.5rem;
			font-size: 14px;

			&::-webkit-scrollbar {
				width: 0.5rem;
			}

			/* Track */
			&::-webkit-scrollbar-track {
				background: transparent;
			}

			/* Handle */
			&::-webkit-scrollbar-thumb {
				background: #888;
				border-radius: 1.5rem;
			}

			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background: #555;
			}

			.flag {
				display: flex;
				align-items: center;
				width: calc(100% - 3.2rem);
				padding: 1.4rem 1.6rem;
				background: ${({ theme }) => theme.desktop.countryOptionsItemBg};

				&:before {
					width: 2.4rem;
					height: 2.4rem;
					margin-right: 1rem;
				}
			}
		}

		.country-name {
			font-weight: bold;
			font-size: 1.4rem;
			margin-bottom: 0.4rem;
			color: ${({ theme }) => theme.desktop.countryOptionsItemColor};

			&:hover {
				color: ${({ theme }) => theme.desktop.countryOptionsItemColorHover};
			}
		}
		&.active {
			display: block;
		}
	}

	.country-current {
		display: flex;
		align-items: center;
		padding: 2rem 1.6rem;
		background: ${({ theme }) => theme.desktop.countryCurrentBg};
		border-bottom: 1px solid
			${({ theme }) => theme.desktop.countryCurrentBorderColor};
		border-radius: 1.5rem 1.5rem 0 0;

		.flag {
			display: flex;
			align-items: center;

			&:before {
				width: 4.8rem;
				height: 4.8rem;
				margin-right: 1rem;
				bottom: 0.1rem;
				border-color: #dadada;
			}
		}

		.country-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1.2rem;
		}

		.country-name {
			font-weight: 600;
			color: ${({ theme }) => theme.desktop.countryCurrentColor};
		}

		.group {
			display: flex;
			align-items: center;
			gap: 0.1rem;
			flex-flow: row;
			height: 2.4rem;
			border-radius: 2rem;
			background: ${({ theme }) => theme.desktop.countryCurrentBtnGroupBg};
			overflow: hidden;

			.change-country {
				padding: 0.8rem;
				font-size: 1.2rem;
				background: ${({ theme }) => theme.desktop.countryCurrentBtnBg};
				color: ${({ theme }) => theme.desktop.countryCurrentBtnColor};

				&:hover {
					color: ${({ theme }) => theme.desktop.countryCurrentBtnColorHover};
					background: ${({ theme }) => theme.desktop.countryCurrentBtnBgHover};
				}
			}
		}
	}

	.member-info {
		width: 60px;
		margin-right: 5px;
	}

	.line {
		border-right: 1px solid #374375;
		height: 4.4rem;
	}

	.deposit-btn {
		display: flex;
		padding: 1rem 1.2rem;
		flex-direction: column;
		align-items: flex-start;
		gap: 3rem;
		border-radius: 10rem;
		color: ${({ theme }) => theme.desktop.depositBtnColor};
		background: ${({ theme }) => theme.desktop.depositBtnBg};
		box-shadow: ${({ theme }) => theme.desktop.depositBtnBoxShadow};
		font-size: 1.4rem;
		font-weight: 600;

		&:hover {
			color: ${({ theme }) => theme.desktop.depositBtnColorHover};
			background: ${({ theme }) => theme.desktop.depositBtnBgHover};
			box-shadow: none;
		}
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
