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
		.proDataBody {
			font-size: 1.4rem;
			font-style: normal;
			font-weight: 400;
			line-height: 1.8rem;
			color: ${({ theme }) => theme.desktop.white};
		}
	}
	.progressBarModule {
		max-width: unset;
		width: auto;
		margin-bottom: 2.4rem;
	}
`
