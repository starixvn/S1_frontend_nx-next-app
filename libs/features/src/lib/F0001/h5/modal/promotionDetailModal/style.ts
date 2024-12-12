import styled from 'styled-components'

export const PromotionDetailContainer = styled.div`
	.promotions {
		width: 100%;
		overflow-y: auto;

		.btn-group {
			margin-top: 5.8vw;
		}

		.protitle {
			margin-top: 5.8vw;
			margin-bottom: 1.94vw;
			font-size: 4.12vw;
			font-weight: 700;
		}

		.text {
			font-size: 3.39vw;
			font-weight: 400;
			line-height: 4.36vw;
		}

		.rolloverList,
		.depositSlip {
			display: flex;
			flex-direction: column;
			gap: 1px;
			margin-top: 5.8vw;
			margin-bottom: 5.8vw;
			border: 1px solid ${({ theme }) => theme.mobile.promotionGroupBorder};
			background: ${({ theme }) => theme.mobile.promotionGroupBorder};
			border-radius: 2.42vw;
			overflow: hidden;

			.row {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: 12.62vw;
				align-items: center;
				gap: 1px;
				background: ${({ theme }) => theme.mobile.promotionGroupBorder};
			}

			.row-title,
			.row-value {
				display: flex;
				align-items: center;
				height: 100%;
				padding: 0 3.88vw;
				font-size: 3.39vw;
			}

			.row-title {
				background: ${({ theme }) => theme.mobile.promotionHeaderGroupBg};
				font-weight: 700;
				color: ${({ theme }) => theme.mobile.promotionHeaderGroupColor};
			}

			.row-value {
				background: ${({ theme }) => theme.mobile.promotionGroupBg};
				font-weight: 600;
				color: ${({ theme }) => theme.mobile.promotionGroupColor};
			}
		}

		.load-bo-config {
			p,
			span {
				background: transparent !important;
				color: ${({ theme }) => theme.mobile.promotionGroupColor} !important;
				font-size: 3.39vw !important;
				font-weight: 500 !important;
				line-height: 4.36vw !important;
			}

			a {
				color: #fff !important;
			}

			table {
				width: 100% !important;
			}

			td {
				border: 1px solid ${({ theme }) => theme.mobile.promotionGroupBorder} !important;
				background: ${({ theme }) => theme.mobile.promotionGroupBg} !important;
				color: ${({ theme }) => theme.mobile.promotionHeaderGroupColor};
				font-size: 3.39vw !important;
			}

			tr:first-child {
				td {
					background: ${({ theme }) =>
						theme.mobile.promotionHeaderGroupBg} !important;
				}
			}
		}

		.depositSlip {
			margin: 2vw 0 0;

			.deposit-group {
				display: none;

				&.active {
					display: flex;
					flex-direction: column;
					gap: 1px;
				}
			}
		}

		.view-all {
			display: flex;
			align-items: center;
			margin-top: 1.92vw;
			margin-bottom: 3.88vw;
			font-size: 3.39vw;
			color: ${({ theme }) => theme.mobile.promotionLinkColor};

			.icon:before {
				color: ${({ theme }) => theme.mobile.promotionLinkColor};
				font-size: 4.85vw;
			}
		}
	}
`
