import styled from 'styled-components'

export const WrapperModalBankSlipDeposit = styled.div`
	.upload_new {
		display: flex;
		align-items: flex-start;
		padding: 4rem 2.8rem 2.8rem 2.8rem;
		gap: 2.4rem;
		.checkBankSlip {
			padding: 1.2rem;
			.slogan {
				font-size: 1.4rem;
				font-weight: 400;
				line-height: 1.8rem;
				margin-bottom: 0.4rem;
			}
			&.bankaccount {
				border-radius: 10px;
				border: 1px solid ${({ theme }) => theme.desktop.borderAccountBank};
				max-width: 27rem;

				.group-bank-slip {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					.custom-tooltip-body {
						padding: 0.5rem 1.2rem;
						min-width: inherit;
						margin-top: 0.5rem;
						color: ${({ theme }) => theme.desktop.tooltipColor};
					}
					.icon {
						&:before {
							margin: 0;
							font-size: 2rem;
							color: ${({ theme }) => theme.desktop.secondaryBtnBg};
						}
					}
					.group-bank-name {
						> div {
							margin-bottom: 0.4rem;
							font-size: 1.4rem;
							font-style: normal;
							font-weight: 600;
							line-height: 1.8rem;
							color: ${({ theme }) => theme.desktop.secondaryBtnBg};
							&:last-child {
								margin-bottom: 0.6rem;
							}
						}
					}
				}
			}
		}
		.uploadModule {
			display: flex;
			justify-content: center;
			align-items: center;
			.upload_img {
				background: ${({ theme }) => theme.desktop.bgUploadFileButton};
				border: none;
				cursor: pointer;
				min-width: 8rem;
				min-height: 5.6rem;
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 1.6rem 0;
				input {
					display: none;
				}
				.icon {
					&:before {
						font-size: 3.2rem;
						color: ${({ theme }) => theme.desktop.labelColor};
					}
				}
			}
		}
		.error-msg {
			text-align: center;
			margin-bottom: 1.6rem;
		}
		.directions {
			ul {
				list-style: none;
				li {
					margin-bottom: 0.6rem;
					color: ${({ theme }) => theme.desktop.labelColor};
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
`
