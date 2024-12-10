import styled from 'styled-components'

export const WrapperWithdrawl = styled.div`
	width: 100%;
	.infoModuleLeft {
		width: 100%;
	}
	.inside-body {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 1.6rem;
		&.custom {
			display: block;
		}
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
				&:before {
					font-size: 2rem;
				}
				&.icon-information-fill,
				&.icon-refresh-fill {
					&:before {
						color: #717fba;
					}
				}
				&.active {
					animation: rotate 0.5s linear 2;
				}
			}
		}
	}
	.withdraw-table {
		max-width: 15rem;
		margin: 2.4rem auto;
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
				a,
				span {
					color: #1b5bff;
					font-weight: 600;
				}
			}
		}
	}
	.submit-photo-id {
		border: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
		border-radius: 10px;
		padding: 1.6rem;
		.subModule {
			max-width: 42.6rem;
			width: 100%;
			margin: 0 auto;
			text-align: center;
			.title {
				font-size: 1.7rem;
				font-weight: 700;
				line-height: normal;
				color: ${({ theme }) => theme.desktop.white};
			}
			.txt-lightgray {
				font-size: 1.4rem;
				font-weight: 400;
				color: ${({ theme }) => theme.desktop.white};
				line-height: normal;
			}
		}
		.upload_img {
			width: 8rem;
			height: 5.6rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 1.2rem auto;
			border-radius: 10px;
			border: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
			background: ${({ theme }) => theme.desktop.bgUploadFileButton};
			overflow: hidden;
			input {
				display: none;
			}
			.icon {
				&:before {
					font-size: 3.2rem;
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
		}
		.directions {
			ul {
				display: flex;
				justify-content: space-between;
				li {
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					position: relative;
					&:after {
						content: '';
						display: block;
						width: 3px;
						height: 3px;
						position: absolute;
						left: -10px;
						top: 8px;
						background: ${({ theme }) => theme.desktop.rightModuleSloganColor};
					}
				}
			}
		}
		.btnGroup {
			max-width: 14.2rem;
			margin: 1.6rem auto;
		}
	}
	.thank-you {
		text-align: center;
		border: 1px solid #374375;
		border-radius: 10px;
		padding: 1.6rem 0;
		.title {
			color: ${({ theme }) => theme.desktop.white};
			font-size: 1.7rem;
			margin-bottom: 0.8rem;
			font-weight: 700;
			line-height: normal;
			display: block;
		}
		.txt-lightgray {
			font-size: 1.4rem;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
		.icon {
			display: flex;
			width: 4.8rem;
			height: 4.8rem;
			border-radius: 100px;
			align-items: center;
			justify-content: center;
			margin: 1rem auto;
			background: #1d2447;
			&:before {
				font-size: 3.2rem;
			}
		}
	}
`
