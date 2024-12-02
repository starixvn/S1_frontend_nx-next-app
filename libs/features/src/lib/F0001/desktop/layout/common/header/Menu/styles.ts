import styled from "styled-components";

export const MenuContainer = styled.div`
	position: relative;
	display: flex;
	height: 4.8rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.menuContainerBg};

	--transition: 0.6s;

	.icon-home,
	.icon-mobile {
		font-size: 2rem;

		&:hover:before {
			color: ${({ theme }) => theme.desktop.menuItemColorHover};
		}
	}

	> div {
		display: flex;
		align-items: center;
		margin: auto;
		width: ${({ theme }) => theme.desktop.minContentWidth};
		height: 100%;
		justify-content: space-between;

		@media (min-width: 1450px) {
			width: ${({ theme }) => theme.desktop.contentWidth};
		}

		.menu-item,
		> button {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 0.8rem;
			padding-right: 0.8rem;
			height: 100%;
			font-size: 1.4rem;
			font-weight: 700;
			text-transform: uppercase;
			color: ${({ theme }) => theme.desktop.menuItemColor};
			transition: color 0.3s ease-in-out;

			&:after {
				content: '';
				display: block;
				background: ${({ theme }) => theme.desktop.menuItemActiveLine};
				width: calc(100% - 3px);
				height: 3px;
				position: absolute;
				bottom: 0;
				z-index: 2;
				display: none;
			}

			&:hover,
			&.active {
				background: ${({ theme }) => theme.desktop.menuItemBgHover};
				color: ${({ theme }) => theme.desktop.menuItemColorHover};
				cursor: pointer;

				&:after {
					display: block;
				}
			}

			div {
				&.label {
					position: absolute;
					left: 50%;
					top: -0.5rem;
					display: flex;
					align-items: center;
					min-height: 1.6rem;
					transform: translateX(-50%);
					padding: 0 0.6rem;
					border-radius: 5rem;
					font-size: 1rem;
					font-weight: 700;

					&.label-new {
						background: ${({ theme }) => theme.desktop.newLabelBg};
						color: ${({ theme }) => theme.desktop.newLabelColor};
					}

					&.label-hot {
						padding-left: 0;
						background: ${({ theme }) => theme.desktop.hotLabelBg};
						color: ${({ theme }) => theme.desktop.newLabelColor};

						.icon:before {
							font-size: 1rem;
							color: ${({ theme }) => theme.desktop.hotIconColor};
						}
					}
				}
			}
		}
	}
`
