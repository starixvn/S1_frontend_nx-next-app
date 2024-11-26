import styled from 'styled-components'

export const WrapperCrypto = styled.div`
	.heading-crypto {
		font-size: 1.4rem;
		font-weight: 400;
		line-height: 1.8rem;
		color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
	}
	.accountName {
		.inputBox-blue {
			justify-content: space-between;
			max-width: 40rem;
			width: 100%;
			.group-name,
			.group-button {
				display: flex;
				align-items: center;
				gap: 0.8rem;
			}
		}
	}
	.tip {
		display: none;
		&.active {
			display: block;
		}
	}
	.group-wallet {
		margin-top: 1.6rem;
		.addBank {
			flex-wrap: wrap;
		}
		.addBank {
			gap: 0;
		}
		.remainder {
			margin-top: 1.6rem;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
	}
`
