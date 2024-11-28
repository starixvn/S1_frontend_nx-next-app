import styled from 'styled-components'

export const WrapperStament = styled.div`
	.quickSelect {
		margin-bottom: 1.6rem;
		padding-bottom: 1.6rem;
		border-bottom: 1px solid #374375;
		.inputBox-blue {
			max-width: 30rem;
		}
	}
	.statement {
		.custom-th {
			width: 100% !important;
		}
	}
	.custom-nodata {
		border-top: none;
	}
	.custom-table-tbody {
		.custom-td {
			.td {
				display: flex;
				align-items: center;
				justify-content: center;
				&:first-child {
					width: 100%;
				}
			}
			&:nth-child(even) {
				background: #1d2447;
			}
		}
	}
`
