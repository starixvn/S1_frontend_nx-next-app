import styled from 'styled-components'

export const MenuContainer = styled.div`
	background: ${({ theme }) => theme.mobile.menuContainerBg};
	display: flex;
	gap: 3.9vw;
	width: 100vw;

	.embla__viewport {
		overflow: initial;
	}

	.icon-home {
		font-size: 3.8vw;
	}

	button,
	.menu-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 11.6vw;
		padding: 0 2vw;
		transform: none;
		flex: none;
		white-space: nowrap;
		color: ${({ theme }) => theme.mobile.menuItemColor};
		font-size: 3.1vw;
		font-weight: 700;
		text-transform: uppercase;

		.new-icon {
			position: absolute;
			top: -1.4vw;
			left: 50%;
			transform: translateX(-50%);
			padding: 0.4vw 1.4vw;
			border-radius: 12.6vw;
			background: ${({ theme }) => theme.mobile.newLabelBg};
			color: ${({ theme }) => theme.mobile.newLabelColor};
			font-size: 2.4vw;
			font-weight: 700;
			text-transform: uppercase;
		}

		&.active {
			position: relative;
			color: ${({ theme }) => theme.mobile.menuItemColorHover};

			&::after {
				display: block;
				content: '';
				width: 100%;
				height: 0.5vw;
				position: absolute;
				bottom: 0;
				background: ${({ theme }) => theme.mobile.menuItemActiveLine};
			}

			.icon-home:before {
				color: ${({ theme }) => theme.mobile.menuItemColorHover};
			}
		}
	}
`
