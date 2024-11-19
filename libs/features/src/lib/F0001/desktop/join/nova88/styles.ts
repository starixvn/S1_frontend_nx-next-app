import styled from 'styled-components'

export const WrapperRegister = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	padding: 4rem 2rem;
	.joinpop {
		.joinloginModule {
			display: flex;
			justify-content: center;
			gap: 2.4rem;
			.features {
				max-width: 45.2rem;
				border-radius: 20px;
				overflow: hidden;
				&-heading {
					background: ${({ theme }) => theme.desktop.footerBg};
					min-height: 5.2rem;
					padding: 0 1.6rem;
					display: flex;
					align-items: center;
					font-size: 1.4rem;
					gap: 1rem;
					.icon {
						&:before {
							font-size: 2.4rem;
						}
					}
				}
				&-body {
					background: ${({ theme }) => theme.desktop.registerBodyBg};
					padding: 1.6rem;
					.title-list {
						color: #ea6118;
						font-size: 1.7rem;
						font-weight: 700;
						line-height: normal;
						margin-bottom: 0.4rem;
					}
					.list {
						margin-bottom: 0.8rem;
						color: #939dc5;
					}
				}
			}
			.joinloginFunction {
				margin-left: 0;
				flex: 0 0 48.4rem;
				padding: 0 2rem;
				.heading-form {
					font-size: 2.5rem;
					font-weight: 700;
					line-height: normal;
					color: #fff;
					margin-bottom: 1.6rem;
				}
				.slogan-form {
					ont-size: 1.4rem;
					font-weight: 400;
					color: #fff;
					button {
						color: ${({ theme }) => theme.desktop.buttonBg};
						font-size: 1.4rem;
						font-style: normal;
						font-weight: 700;
						margin-left: 0.5rem;
					}
				}
			}
		}
	}
`
