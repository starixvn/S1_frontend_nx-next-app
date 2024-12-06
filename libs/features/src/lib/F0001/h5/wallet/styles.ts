import styled from 'styled-components'

export const WrapperMyWalletH5 = styled.div`
	.walletTotal {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #939dc5;
		border-radius: 100px;
		border: 1px solid #232b4f;
		background: #1d2447;
		padding: 1.8vw 3vw;
	}
	.icon {
		&:before {
			font-size: 4.5vw;
		}
	}
	.group-wallet {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
	.walletTotal {
		span {
			color: #939dc5;
			&:last-child {
				color: #fff;
			}
		}
	}
	.walletTotal .icon {
		color: #112240;
		background: none;
	}
	.acount-input {
		.info {
			> span {
				font-size: 3.4vw;
				font-weight: 600;
				display: block;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
				margin: 3vw 0;
			}
			> div {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #939dc5;
				border-radius: 100px;
				border: 1px solid #232b4f;
				background: #1d2447;
				padding: 1.8vw 3vw;
				color: #fff;
			}
		}
	}
`
