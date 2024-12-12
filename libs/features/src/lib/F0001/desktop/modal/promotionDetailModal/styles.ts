import styled from 'styled-components'

export const WrapperModalPromotion = styled.div`
	.promotionsInfo {
		width: 100%;
		overflow-y: auto;
		max-height: 55rem;
		img {
			border-radius: 20px;
			overflow: hidden;
			max-height: 17rem;
			object-fit: cover;
			margin-bottom: 2.4rem;
		}
		.proDataTitle {
			.title {
				font-size: 1.7rem;
				font-weight: 700;
				line-height: normal;
				color: ${({ theme }) => theme.desktop.white};
				margin-bottom: 0.8rem;
			}
			.txt-gray {
				font-size: 1.4rem;
				font-weight: 400;
				line-height: 1.8rem;
				color: ${({ theme }) => theme.desktop.white};
				margin-bottom: 2.4rem;
			}
		}
		.remainingTime,
		.rolloverListNew,
		.minAmount {
			.custom-th,
			.custom-td,
			.td {
				width: 100%;
			}
		}
		.remainingTime {
			border-bottom: none;
			border-radius: 10px 10px 0 0;
		}
		.rolloverListNew {
			border-radius: 0 0 10px 10px;
		}
		.btnGroup {
			justify-content: center;
			button {
				width: max-content;
				padding: 0 3.4rem;
			}
		}
	}
	.progressBarModule {
		max-width: unset;
		width: auto;
		margin-bottom: 2.4rem;
		max-width: 30rem;
	}

	.rolloverList {
		display: flex;
		flex-direction: column;
		border: 0.1rem solid #374375;
		border-radius: 1rem;
		background-color: #374375;
		gap: 0.1rem;
		overflow: hidden;

		.row {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			justify-content: space-between;
			color: #fff;
			font-size: 1.4rem;

			.row-title,
			.row-value {
				display: flex;
				height: 5.2rem;
				padding: 0 1.6rem;
				align-items: center;
			}

			.row-title {
				border-right: 1px solid #374375;
				background: #232b4f;
				font-weight: 700;
			}

			.row-value {
				align-items: center;
				background: #182043;
				font-weight: 600;
			}
		}
	}
	.amount-pop {
		.custom-table-thead {
			.custom-th {
				&:first-child {
					width: 100% !important;
				}
			}
		}
	}
`
