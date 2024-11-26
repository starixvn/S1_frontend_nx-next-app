import styled from 'styled-components'

export const WrapperWithdrawl = styled.div`
	.infoModuleLeft {
		width: 100%;
	}
	.inside-body {
		display: flex;
		align-items: flex-start;
		gap: 1.6rem;
	}

	.walletModule {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.6rem;
		padding: 1.6rem 0;
		border-bottom: 1px solid
			${({ theme }) => theme.desktop.rightModuleBorderColor};
		&-info {
			border: none;
			padding-top: 0;
		}
		.inputBox-blue {
			width: 100%;
			margin-top: 0;
			display: flex;
			font-size: 1.4rem;
			font-weight: 400;
			align-items: center;
			justify-content: space-between;
			border: 1px solid ${({ theme }) => theme.desktop.borderOutLine};
			background: ${({ theme }) => theme.desktop.bgOutLine};
			.left-input,
			.right-input {
				display: flex;
				align-items: center;
				gap: 0.8rem;
				.tip {
					position: absolute;
					width: 100%;
					right: 0;
					bottom: -17px;
				}
			}
			.name {
				color: ${({ theme }) => theme.desktop.labelOutLineColor};
			}
			.icon {
				margin-top: 0;
				&.active {
					animation: rotate 0.5s linear 2;
				}
			}
		}
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
`
