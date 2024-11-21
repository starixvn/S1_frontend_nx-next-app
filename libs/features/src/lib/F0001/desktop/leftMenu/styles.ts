import styled from 'styled-components'

export const WrapperLeftMenu = styled.div`
	margin-bottom: 0.4rem;
	overflow: hidden;
	&:first-child {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
	&:last-child {
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	.menuModule {
		.menuHeader {
			background: ${({ theme }) => theme.desktop.leftMenuHeaderBgAfterLogin};
			width: 100%;
			color: ${({ theme }) => theme.desktop.white};
			font-size: 1.4rem;
			font-weight: 700;
			line-height: normal;
			padding: 0 1.6rem;
			min-height: 4.2rem;
			text-align: left;
			border-bottom: 1px solid
				${({ theme }) => theme.desktop.leftMenuBorderColor};
		}
		.menuBody {
			background: ${({ theme }) => theme.desktop.leftMenuBodyBgAfterLogin};
			&:last-child {
				.menuSelect {
					border-bottom: none;
				}
			}
			.menuSelect {
				display: block;
				color: ${({ theme }) => theme.desktop.leftMenuItemColorAfterLogin};
				padding: 1.4rem 2.4rem;
				border-bottom: 1px solid
					${({ theme }) => theme.desktop.leftMenuBorderColor};
				&.active,
				&:hover {
					color: ${({ theme }) =>
						theme.desktop.leftMenuItemColorActiveAfterLogin};
					box-shadow: ${({ theme }) =>
						theme.desktop.leftMenuItemBoxShadowActiveAfterLogin};
				}
			}
		}
	}
`
