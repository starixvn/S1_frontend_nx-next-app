import styled from 'styled-components'

export const WrapperLoginModal = styled.div`
	.loginpop {
		min-width: 84rem;
		margin: 0 auto;
		.joinloginModule {
			display: flex;
			align-items: center;
			gap: 2rem;
			.login-image {
				min-width: 42rem;
				min-height: 46rem;
			}
			.joinloginFunction {
				padding-right: 2rem;
				.heading-login {
					font-size: 2.5rem;
					font-weight: 700;
					line-height: normal;
					color: ${({ theme }) => theme.desktop.white};
				}
				.slogan {
					font-size: 1.4rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1.8rem;
					color: ${({ theme }) => theme.desktop.white};
					a {
						color: ${({ theme }) => theme.desktop.hrefColorPrimary};
						margin-left: 0.5rem;
					}
				}
				.forgot {
					color: ${({ theme }) => theme.desktop.white};
					font-size: 1.4rem;
					font-weight: 400;
					line-height: 1.8rem;
					text-align: right;
					margin-top: 1.6rem;
				}
			}
		}
		.spacing-bt {
			margin-bottom: 1.6rem;
		}
	}
`
