import styled from 'styled-components'

export const WrapperFooter = styled.div`
	background: ${({ theme }) => theme.mobile.bgFooter};
	margin-top: 4rem;
	padding: 2.4rem 1.6rem 0;
	.home-bottom {
		&.logged-in {
			padding-bottom: 20vw;
		}
	}
	.footer-top {
		display: flex;
		gap: 2.4rem;
		margin-bottom: 2.4rem;
		padding-bottom: 2.4rem;
		border-bottom: 1px solid ${({ theme }) => theme.mobile.borderFooterTop};
		a {
			color: ${({ theme }) => theme.mobile.white};
			font-size: 3.1vw;
			font-weight: 700;
			line-height: normal;
			text-transform: uppercase;
			white-space: nowrap;
		}
	}
	.footer-center-title {
		font-size: 1.4rem;
		font-weight: 700;
		line-height: normal;
		color: ${({ theme }) => theme.mobile.white};
		margin-bottom: 1.6rem;
	}
	.social-media {
		margin-bottom: 2.4rem;
		&-list {
			display: flex;
			gap: 0.8rem;
			flex-wrap: wrap;
		}
	}
	.footer-icon {
		display: flex;
		gap: 1.2rem;
		flex-wrap: wrap;
		margin-bottom: 2.4rem;
		a {
			width: 7.5vw;
			height: 7.5vw;
			border-radius: 6px;
			overflow: hidden;
		}
	}
	.footerModule {
		margin: 0 -1.6rem;
		padding: 1.6rem 2rem;
		font-size: 1.2rem;
		font-weight: 400;
		line-height: normal;
		letter-spacing: 1.44px;
		background: ${({ theme }) => theme.mobile.copyRightBg};
	}
`
