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
					font-weight: 700;
					.icon {
						&:before {
							font-size: 2.4rem;
						}
					}
				}
				&-body {
					background: ${({ theme }) => theme.desktop.registerBodyBg};
					padding: 1.6rem;
					height: 100%;
					.title-list {
						color: ${({ theme }) => theme.desktop.hrefColorPrimary};
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
				.slogan-form {
					ont-size: 1.4rem;
					font-weight: 400;
					color: ${({ theme }) => theme.desktop.white};
					button {
						color: ${({ theme }) => theme.desktop.buttonSloganBg};
						font-size: 1.4rem;
						font-style: normal;
						font-weight: 700;
						margin-left: 0.5rem;
					}
				}
				.react-datepicker__day-name,
				.react-datepicker__day,
				.react-datepicker__time-name {
					width: 2.7rem;
					font-size: 1rem;
				}
			}
		}
		.Terms {
			margin-top: 1.6rem;
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 1.8rem;
			color: ${({ theme }) => theme.desktop.white};
			a {
				margin-left: 0.4rem;
				color: ${({ theme }) => theme.desktop.hrefColorPrimary};
				text-decoration: underline;
			}
		}
	}
	.dropdown {
		button {
			display: flex;
			align-items: center;
			.flag {
				&:before {
					width: 2rem;
					height: 2rem;
				}
			}
		}
	}
`
