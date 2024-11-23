import styled from 'styled-components'

export const WrapperModal = styled.div`
	.pop {
		overflow-y: unset !important;
	}
	.loginpop {
		min-width: 84rem;
		margin: 0 auto;
		.joinloginModule {
			display: flex;
			align-items: center;
			gap: 2rem;
			.login-image {
				min-width: 42rem;
				min-height: 46rem;
			}
			.joinloginFunction {
				padding-right: 2rem;
				max-width: 38rem;
				.heading-login {
					font-size: 2.5rem;
					font-weight: 700;
					line-height: normal;
					color: ${({ theme }) => theme.desktop.white};
				}
				.forgot {
					text-align: right;
					margin-top: 1.6rem;
					a {
						color: ${({ theme }) => theme.desktop.white};
						font-size: 1.4rem;
						font-weight: 400;
						line-height: 1.8rem;
					}
				}
			}
		}
		.spacing-bt {
			margin-bottom: 1.6rem;
		}
	}
	.slogan {
		font-size: 1.4rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.8rem;
		color: ${({ theme }) => theme.desktop.white};
		a {
			color: ${({ theme }) => theme.desktop.hrefColorPrimary};
			margin-left: 0.5rem;
		}
	}
	.addBankpop {
		.info-user {
			border: 1px solid
				${({ theme }) => theme.desktop.infoUserAccountBankBorderInputColor};
			background: ${({ theme }) =>
				theme.desktop.infoUserAccountBankBgInputColor};
			.user-group {
				display: flex;
				justify-content: space-between;
				width: 100%;
				> div {
					font-size: 1.4rem;
					font-weight: 400;
					line-height: 1.8rem;
					&:first-child {
						color: ${({ theme }) =>
							theme.desktop.infoUserAccountBankLabelColor};
					}
					&:last-child {
						color: ${({ theme }) =>
							theme.desktop.infoUserAccountBankUserNameColor};
					}
				}
			}
		}
		.inputBox-blue {
			.txt-blue {
				white-space: nowrap;
				color: ${({ theme }) => theme.desktop.infoUserAccountBankLabelColor};
				font-size: 1.4rem;
				font-weight: 400;
				line-height: 1.8rem;
			}
			.dropdown {
				button {
					display: flex;
					align-items: center;
					gap: 1rem;
					margin-left: 0;
					img {
						max-width: 2.4rem;
						border-radius: 50px;
						margin: 0;
					}
				}
				&-item {
					display: flex;
					align-items: center;
					gap: 1rem;
					margin-left: 0;
					padding: 0 1.2rem;
					img {
						max-width: 2.4rem;
						border-radius: 50px;
						margin: 0;
					}
				}
				&-container {
					border-radius: 0;
				}
			}
		}
	}
`
