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
		}
		.custom-td {
			.td {
				padding: 1.8rem 0;
				&:nth-child(2) {
					display: flex !important;
					justify-content: center;
				}
			}
		}
		.btnGroup {
			gap: 0.8rem;
			padding: 0 1rem;
			.btn {
				padding: 0 1.6rem;
				width: 100% !important;
			}
		}
		.custom-nodata {
			border-top: none;
		}
	}
	.dropdown {
		.btn {
			color: #fff;
		}
	}
`
