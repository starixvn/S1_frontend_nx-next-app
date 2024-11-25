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
	.quickSelect {
		display: flex;
		gap: 1.6rem;
		align-items: center;
		margin-top: 1.6rem;
		.inputBox-blue,
		.input-spacing {
			display: flex;
			margin-top: 0;
			justify-content: space-between;
			width: 100%;
		}
		.txt-blue {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 2rem;
			white-space: nowrap;
		}
		.dropdown {
			button {
				color: ${({ theme }) => theme.desktop.white};
				font-size: 1.4rem;
			}
		}
		.react-datepicker__input-container {
			input {
				color: ${({ theme }) => theme.desktop.white};
			}
		}
		.btnGroup {
			margin-top: 0;
		}
	}
	.table-history {
		padding-top: 1.6rem;
		margin-top: 1.6rem;
		border-top: 1px solid #374375;
	}
`
