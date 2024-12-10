import styled from 'styled-components'

export const WrapperHistory = styled.div`
	.historyTag {
		gap: 0.8rem;
		margin-top: 0;
		button {
			width: max-content;
		}
	}
	.historyModule {
		display: none;
		&.active {
			display: block;
		}
	}
	.table-history {
		padding-top: 1.6rem;
		margin-top: 1.6rem;
		border-top: 1px solid #374375;
		.custom-th {
			padding: 1.8rem 0;
			&:nth-child(6) {
				width: 60%;
			}
		}
		.custom-td {
			.td {
				padding: 1.8rem 0;
				&:nth-child(2) {
					display: flex !important;
					justify-content: center;
				}
				&:nth-child(6) {
					width: 60%;
				}
			}
		}
		.btnGroup {
			gap: 0.8rem;
			.btn {
				padding: 0 1.6rem;
			}
		}
		.custom-nodata {
			border-top: none;
		}
	}
	.dropdown {
		.btn {
			color: #fff !important;
		}
	}

	.financial-log-table {
		.custom-th {
			&:nth-child(5),
			&:nth-child(3),
			&:nth-child(6),
			&:nth-child(7) {
				width: 70%;
			}
		}
		.custom-td {
			.td {
				&:nth-child(5),
				&:nth-child(6),
				&:nth-child(3),
				&:nth-child(7) {
					width: 70%;
				}
			}
		}
	}
`
