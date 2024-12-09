import styled from "styled-components";

export const PromotionDetailContainer = styled.div`
	.promotions {
		width: 100%;
		overflow-y: auto;

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

		.rolloverList {
			display: flex;
			flex-direction: column;
			gap: 1px;
			margin-top: 5.8vw;
			margin-bottom: 5.8vw;
			border: 1px solid #374375;
			background: #374375;
			border-radius: 2.42vw;
			overflow: hidden;

			.row {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: 12.62vw;
				align-items: center;
				gap: 1px;
				background: #374375;
			}

			.row-title,
			.value {
				display: flex;
				align-items: center;
				height: 100%;
				padding: 0 3.88vw;
				font-size: 3.39vw;
			}

			.row-title {
				background: #232b4f;
				font-weight: 700;
				color: #fff;
			}

			.value {
				color: #939dc5;
				font-weight: 600;
				background: #182043;
			}
		}

		.load-bo-config {
			p,
			span {
				background: transparent !important;
				color: var(--Color-9, #939dc5) !important;
				font-size: 3.39vw !important;
				font-weight: 500 !important;
				line-height: 4.36vw !important;
			}

			a {
				color: #fff !important;
			}

			td {
				border: 1px solid #374375 !important;
				background: #182043 !important;
				color: #fff;
			}

			tr:first-child {
				td {
					background: #232b4f !important;
				}
			}
		}
	}
`
