import styled from 'styled-components'

export const WrapperBankInFo = styled.div`
	.stepBar {
		background: #374375;
		height: 0.6rem;
		display: flex;
		border-radius: 30px;
		position: relative;
		margin: 4rem 0;
		.stepLine {
			background: #ea6118;
			position: absolute;
			height: 100%;
			border-radius: 10px 0px 0 10px;
		}
		.stepLine ~ div {
			flex: 1;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			z-index: 1;
			flex-flow: column;
			position: relative;
			&:after {
				content: '';
				width: 2rem;
				height: 0.8rem;
				background: #134dae;
				border-radius: 20px;
			}
			&.active {
				span {
					color: ${({ theme }) => theme.desktop.white};
				}
				&:after {
					background: #374375;
					display: none;
				}
			}
		}
		.stepLine ~ div span {
			position: absolute;
			font-size: 1.4rem;
			color: ${({ theme }) => theme.desktop.white};
			font-weight: 400;
			&:first-child {
				margin-top: -4rem;
			}
			&:last-child {
				margin-top: 4rem;
			}
		}
	}
	.accountName {
		justify-content: space-between;
		max-width: 40rem;
		width: 100%;
		.txt-blue,
		.group-name {
			display: flex;
			align-items: center;
			gap: 0.8rem;
		}
	}
	.tip {
		display: none;
		&.active {
			display: block;
		}
	}
	.addBank {
		margin-top: 1.6rem;
		flex-wrap: wrap;
		.remainder {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
	}
	.group-bank-icon {
		margin-top: 1.6rem;
		width: 100%;
		position: relative;
		.subModuleList {
			border-radius: 10px;
			padding: 1.6rem;
			border: 1px solid ${({ theme }) => theme.desktop.rightModuleBorderColor};
			ul {
				display: flex;
				align-items: flex-start;
				justify-content: flex-start;
				flex-wrap: wrap;
				gap: 1.6rem;
				img {
					width: 4.8rem;
					height: 4.8rem;
					border-radius: 10px;
				}
			}
		}
	}
	.group-step {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 1.6rem;
	}
	.group-bank-name {
		.bankName {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 0.8rem;
			font-size: 1.4rem;
			font-weight: 700;
			color: ${({ theme }) => theme.desktop.white};
			img {
				width: 4.8rem;
				height: 4.8rem;
				border-radius: 10px;
			}
		}
	}
	.btnGroup {
		button {
			width: max-content;
		}
	}
	.group {
		display: flex;
		align-items: flex-start;
		gap: 1.6rem;
		.icon-arrow-left-line {
			position: absolute;
			top: 70px;
			left: -5%;
			font-size: 20px;
		}
	}
`
