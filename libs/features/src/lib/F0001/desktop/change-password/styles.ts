import styled from 'styled-components'

export const WrapperChangePassWord = styled.div`
	.form-changepass {
		.title-pass {
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 1.8rem;
		}
		.inputBox-blue {
			max-width: 70rem;
			width: 100%;
		}
		.txt-blue {
			white-space: nowrap;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
		}
		.btnGroup {
			button {
				width: max-content;
			}
		}
	}
`
