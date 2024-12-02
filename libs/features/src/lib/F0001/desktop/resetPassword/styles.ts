import styled from 'styled-components'

export const WrapperResetPassword = styled.div`
	.infoModule {
		max-width: 80rem;
		margin: 0 auto;
		border-radius: 20px 20px;
		margin-bottom: 25.5vh;
		overflow: hidden;
		.inside-title {
			background: ${({ theme }) => theme.desktop.rightModuleTitleBg};
			padding: 1.4rem 1.6rem;
		}
		.inputBox-blue {
			margin-top: 0;
		}
		.wrapper-reset-pass {
			padding: 4rem 1.6rem;
			background: #182043;
			display: flex;
			align-items: flex-start;
			gap: 1.6rem;
			.btnGroup {
				margin: 0;
			}
		}
		.txt-blue {
			color: #7883b4;
			white-space: nowrap;
		}
	}
	.forgetPassWord {
		display: block;
	}
`
