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
	}
	.custom-nodata {
		border-top: none;
	}
`
