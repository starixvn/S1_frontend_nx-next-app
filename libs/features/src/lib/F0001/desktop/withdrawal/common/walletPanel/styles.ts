import styled from 'styled-components'

export const WrapperCardAddBank = styled.div`
	.addBank {
		display: flex;
		gap: 1.6rem;
		.addBankName {
			min-width: 18.2rem;
			border: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
			border-radius: 10px;
			padding: 0.8rem;
			overflow: hidden;
			&:hover,
			&.active {
				background: ${({ theme }) => theme.desktop.hoverAddBankName};
			}
			.mask {
				display: none;
			}
			&.noBank {
				display: flex;
				align-items: center;
				cursor: pointer;
				gap: 0.8rem;
				.text-bank {
					font-size: 1.4rem;
					font-weight: 400;
					line-height: normal;
					color: #939dc5;
				}

				.icon {
					width: 4.8rem;
					height: 4.8rem;
					border-radius: 10px;
					background: #1d2447;
					display: flex;
					align-items: center;
					justify-content: center;
					&:before {
						margin: 0;
						font-size: 3.2rem;
						color: #939dc5;
					}
				}
				&:hover {
					background: ${({ theme }) => theme.desktop.hoverAddBankName};
					.icon {
						background: #374375;
					}
				}
			}
			&.pending {
				position: relative;
				.mask {
					position: absolute;
					top: 0;
					left: 0;
					background: rgba(40, 73, 133, 0.8);
					width: 100%;
					height: 100%;
					z-index: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					color: ${({ theme }) => theme.desktop.white};
					font-size: 1.4rem;
				}
			}
			.addBankInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.8rem;
				img {
					width: 4.8rem;
					height: 4.8rem;
					border-radius: 10px;
				}
				.bankName {
					display: flex;
					align-items: center;
					gap: 0.8rem;
					.group-bank-name {
						.bank-name {
							font-size: 1.4rem;
							font-weight: 700;
							line-height: normal;
							margin-bottom: 0.4rem;
						}
						.txt-blue {
							color: ${({ theme }) => theme.desktop.labelColor};
						}
					}
				}
				.checkbox-group {
					display: flex;
					flex-direction: column;
					gap: 0.8rem;
					.icon {
						&:before {
							color: ${({ theme }) => theme.desktop.labelColor};
							margin: 0;
							font-size: 2rem;
						}
					}
					.checkbox {
						input[type='checkbox'] {
							display: none;
						}
						.icon {
							&:before {
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
	.eWalletCard {
		.addBank {
			display: block;
			.addBankName {
				max-width: 20rem;
				margin-bottom: 1.2rem;
			}
			.remainder,
			.tip {
				color: ${({ theme }) => theme.desktop.labelColor};
				font-size: 1.4rem;
				font-wright: 400;
			}
			.tip {
				font-size: 1.2rem;
			}
		}
	}
`
