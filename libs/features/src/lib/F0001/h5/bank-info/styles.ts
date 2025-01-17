import styled from 'styled-components'

export const WrapperBankInfoH5 = styled.div`
	.Wallet {
		padding: 5vw 4vw 35vw;
		.custom-btn-group {
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
			height: 11.6vw;
			gap: 2vw;
			display: flex;
			align-items: center;
		}
		.bankName {
			height: 11.6vw;
			width: 11.6vw;
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			border-radius: 10px;
			padding: 0 0 0;
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
			text-align: left;
			font-weight: 700;
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.4vw;
			max-width: unset;
		}
		.group-subtitle {
			width: 60vw;
		}
		.subinfo {
			text-align: left;
			color: ${({ theme }) => theme.mobile.bankAccountSubInfoColor};
		}
		.code {
			text-align: left;
			color: ${({ theme }) => theme.mobile.bankAccountSubInfoColor};
		}
	}
	.account {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2vw;
		padding: 2vw;
		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.mobile.bankAccountBoderColor};
		.icon {
			&:before {
				font-size: 5vw;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
	}
	.dropdown {
		.btn {
			margin-left: 0;
		}
	}
	.text-dropdown {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		.bankLogo {
			img {
				border-radius: 50px;
				width: 5.8vw;
				height: 5.8vw;
			}
		}
	}
	.dropdown-container {
		align-items: center;
		gap: 0.8rem;
		.bankLogo {
			img {
				border-radius: 50px;
				width: 5.8vw;
				height: 5.8vw;
			}
		}
	}
	.dropdown-item {
		gap: 0.8rem;
		padding: 0 3vw;
	}
`
