import styled from "styled-components";

export const HomeProfile = styled.div`
	background: ${({ theme }) => theme.desktop.dropdownBg};
	position: absolute;
	z-index: 3;
	border-radius: 2rem;
	right: 25.7rem;
	top: 5.4rem;
	display: none;
	box-shadow: ${({ theme }) => theme.desktop.dropdownShadow};
	width: 30rem;
	overflow: hidden;

	.home-profile-top {
		background: ${({ theme }) => theme.desktop.dropdownHeaderBg};
		padding: 1.6rem 1.4rem;
		border-radius: 2rem 2rem 0 0;

		&.vip-level-highest {
			text-align: center;

			.vip-img {
				justify-content: center;
			}

			.highest-text {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.4rem;
				font-weight: 600;
				color: #fff;

				.icon:before {
					font-size: 2rem;
					color: #717fba;
				}
			}
		}

		> div {
			&:first-child {
				display: flex;
				gap: 1.2rem;
				margin-bottom: 0.5rem;
			}
		}

		.vip-img {
			display: flex;
			align-items: center;
			margin-bottom: 5px;
			img {
				width: 6rem;

				&:nth-child(2) {
					width: 12.4rem;
				}
			}
		}

		.progress-number {
			margin-top: 1.2rem;
			display: flex;
			justify-content: space-between;
			width: 100%;
			font-size: 1.2rem;
			color: ${({ theme }) => theme.desktop.dropdownTextColor};
			a {
				display: flex;
				align-items: center;
				margin-left: 5px;
				color: ${({ theme }) => theme.desktop.dropdownTextColor};
			}

			.icon:before {
				color: ${({ theme }) => theme.desktop.dropdownTextColor};
			}
		}
	}
	.home-profile-bottom {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		background: ${({ theme }) => theme.desktop.dropdownMainBg};
		font-size: 1.4rem;

		.item {
			display: flex;
			align-items: center;
			background: ${({ theme }) => theme.desktop.dropdownItemBg};
			color: ${({ theme }) => theme.desktop.dropdownItemColor};
			padding: 1.4rem 1.6rem;

			.icon {
				margin-right: 0.5rem;
				font-size: 2rem;
			}

			&:hover {
				color: ${({ theme }) => theme.desktop.dropdownItemColorHover};
			}
		}

		.home-profile-country {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.4rem;

			.country-list {
				position: static;
				min-width: auto;
				width: 100%;
			}

			button {
				position: relative;
				width: 100%;
			}

			button.flag {
				&:before {
					width: 2.4rem;
					height: 2.4rem;
					margin-right: 1rem;
				}

				&:after {
					position: absolute;
					right: 0;
					content: '\\e925';
					font-family: 'S1NewIcons' !important;
					font-size: 2rem;
					color: #fff;
				}

				span {
					font-size: 1.4rem;
					color: ${({ theme }) => theme.desktop.dropdownItemColor};
				}
			}
		}

		.logout-btn {
			color: #fff;
		}
	}
	&.active {
		display: block;
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
			font-size: 2rem;
		}
	}

	.balance-submenu {
		display: none;
		position: absolute;
		top: 5.4rem;
		right: 2rem;
		z-index: 3;
		border-radius: 2rem;
		padding: 2rem 1.6rem;
		width: 30rem;
		background: ${({ theme }) => theme.desktop.dropdownBg};
		box-shadow: ${({ theme }) => theme.desktop.dropdownShadow};
		color: #fff;
		font-size: 1.4rem;
		font-weight: 400;

		.balance {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1.2rem;

			span {
				&:nth-child(2) {
					display: flex;
					align-items: center;
				}
			}

			.icon:before {
				color: #717fba;
				font-size: 2rem;
			}
		}

		.walletBalance {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-bottom: 1.6rem;
			min-height: 3.6rem;
			padding: 0 1.2rem;
			border-radius: 10rem;
			background: ${({ theme }) => theme.desktop.dropdownHeaderBg};
			color: ${({ theme }) => theme.desktop.dropdownHeaderColor};

			&.hasBonus {
				border-radius: 1rem;
				padding: 0.8rem;
			}

			.progress-container {
				display: flex;
				align-items: center;
				gap: 1rem;
			}

			.walletName {
				display: flex;
				justify-content: space-between;
				align-items: center;
				align-self: stretch;
				line-height: 1.8rem;
			}

			.bonus {
				margin-top: 1rem;
			}

			.percentage {
				font-size: 13px;
			}
		}

		.btnGroup {
			display: flex;
			gap: 1.2rem;
			margin: 20px 0;
		}

		.loginLog {
			display: flex;
			justify-content: space-between;
		}

		.transactionLog {
			display: flex;
			justify-content: space-between;
			margin-top: 1.6rem;
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
		position: absolute;
		right: 0;
		top: 4.5rem;
		z-index: 3;
		min-width: 30rem;
		display: none;
		border-radius: 1.5rem;
		background: ${({ theme }) => theme.desktop.dropdownBg};
		box-shadow: ${({ theme }) => theme.desktop.dropdownShadow};
		overflow: hidden;

		.country-option {
			display: flex;
			height: 5rem;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			gap: 0.1rem;
			align-items: flex-start;
			background: ${({ theme }) => theme.desktop.dropdownMainBg};
			border-radius: 0 0 1.5rem 1.5rem;
			font-size: 1.4rem;

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
				background: ${({ theme }) => theme.desktop.dropdownItemBg};

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
			color: ${({ theme }) => theme.desktop.dropdownItemColor};

			&:hover {
				color: ${({ theme }) => theme.desktop.dropdownItemColorHover};
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
		background: ${({ theme }) => theme.desktop.dropdownHeaderBg};
		border-bottom: 1px solid ${({ theme }) => theme.desktop.dropdownLineColor};
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
				white-space: nowrap;

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

	.progress {
		width: 100%;
		height: 0.6rem;
		background: ${({ theme }) => theme.desktop.homeProfileProgressBg};
		border-radius: 5rem;

		.progress-bar {
			background: ${({ theme }) => theme.desktop.homeProfileProgressBarBg};
			height: 0.6rem;
			border-radius: 5rem;
		}
	}
`

export const LoginForm = styled.div`
	position: relative;
	display: flex;

	.form {
		display: flex;
	}

	.inputBox-blue {
		margin-top: 0;
	}

	.form-input {
		background: ${({ theme }) => theme.desktop.headerInputBg};
		color: ${({ theme }) => theme.desktop.headerInputColor};
		font-size: 1.4rem;
		text-align: left;
		border: none;
		outline: none;
		box-shadow: none;
		width: 100%;
		color: #fff;
	}

	.inputBox-blue + .inputBox-blue {
		margin-left: 1.2rem;
	}
`
