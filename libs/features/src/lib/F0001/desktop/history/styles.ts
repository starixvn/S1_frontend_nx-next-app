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
`
