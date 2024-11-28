import styled from 'styled-components'

export const WrapperStament = styled.div`
	.quickSelect {
		margin-bottom: 1.6rem;
		padding-bottom: 1.6rem;
		border-bottom: 1px solid #374375;
		.inputBox-blue {
			max-width: 30rem;
		}
		.dropdown {
			.btn {
				color: ${({ theme }) => theme.desktop.white};
			}
		}
	}
	.statement {
		.custom-th {
			width: 100% !important;
		}
	}
	.custom-nodata {
		border-top: none;
		padding: 1.6rem 0;
	}
	.custom-table-tbody {
		.custom-td {
			.td {
				&:first-child {
					width: 100%;
				}
			}
			&:nth-child(even) {
				background: #1d2447;
			}
		}
	}
	.btnGroup {
		a {
			width: max-content;
		}
	}
	.wrapper-table {
		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.desktop.customTableBorderColor};
		overflow: hidden;
		.custom-table {
			border: none;
			border-radius: 0;
		}
	}
`
