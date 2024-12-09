import styled from 'styled-components'

export const WrapperDepositModalBankSlipH5 = styled.div`
	.pop {
		width: auto;
	}
	.popup-bankslip {
		.heading-bankslip {
			font-size: 4.2vw;
			font-weight: 700;
			line-height: normal;
			margin-bottom: 0.8rem;
		}
		ul {
			margin-bottom: 4vw;
			li {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				margin-bottom: 0.5vw;
				.icon {
					&:before {
						font-size: 5vw;
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
					}
				}
			}
		}
		.group-label {
			font-size: 3.4vw;
			font-weight: 400;
			color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			display: flex;
			flex-direction: column;
			.label {
				margin-right: 2vw;
				font-weight: 600;
			}
		}
	}
	.uploadModule {
		display: flex;
		flex-wrap: wrap;
	}
	.upload_img {
		display: flex;
		background: #1d2447;
		width: 20vw;
		height: 13.6vw;
		border-radius: 10px;
		justify-content: center;
		align-items: center;
		margin: 3vw 0;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.icon {
			&:before {
				font-size: 6.1vw;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
	}
	.rule {
		color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
	}
`
