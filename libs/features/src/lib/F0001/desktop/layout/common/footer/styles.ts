import styled from 'styled-components'

export const FooterContainer = styled.div`
	width: ${({ theme }) => theme.desktop.minContentWidth};
	padding-top: 4rem;
	margin-top: auto;
	background: ${({ theme }) => theme.desktop.footerBg};

	@media (min-width: 1200px) {
		width: 100%;
	}

	.footer-top {
		display: flex;
		gap: 2.4rem;
		padding-bottom: 2.4rem;
		border-bottom: 1px solid #556298;
		a {
			color: #fff;
			font-weight: 700;
			font-size: 1.4rem;
			text-transform: uppercase;

			&:hover {
				color: #939dc5;
			}
		}
	}
	.footer-center {
		display: flex;
		justify-content: space-between;
		padding: 2.4rem 0 4rem;
		&-title {
			font-size: 1.4rem;
			font-weight: 700;
			line-height: normal;
			margin-bottom: 1.6rem;
		}
		.social-media {
			flex: 0 0 24rem;
			&-list {
				display: flex;
				gap: 1.2rem;
				flex-wrap: wrap;
				img {
					width: 3.6rem;
				}
			}
		}
		.payment {
			flex: 0 0 34%;
			.footer-icon {
				display: flex;
				gap: 1.2rem;
				flex-wrap: wrap;
				a {
					display: block;
					border-radius: 6px;
					overflow: hidden;
					img {
						width: 3.6rem;
					}
				}
			}
		}
	}
	.copyright {
		background: ${({ theme }) => theme.desktop.copyRightBg};
		text-align: center;
		font-size: 1.2rem;
		font-weight: 400;
		letter-spacing: 1.44px;
		padding: 1.6rem 0;
	}
`
