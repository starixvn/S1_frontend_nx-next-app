import styled from "styled-components";

export const MenuContainer = styled.div`
	background: ${({ theme }) => theme.mobile.menuContainerBg};
	display: flex;
	gap: 3.9vw;
	width: 100vw;

	.embla,
	.embla__viewport,
	.embla__container {
		display: flex;
		width: 100vw;
	}

	button,
	.menu-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.mobile.menuItemColor};
		flex-direction: column;
		height: 11.6vw;
		padding: 0 2vw;
		white-space: nowrap;
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
			&::after {
				display: block;
				content: '';
				width: 100%;
				height: 0.5vw;
				position: absolute;
				bottom: 0;
				color: ${({ theme }) => theme.mobile.menuItemColorHover};
				background: ${({ theme }) => theme.mobile.menuItemActiveLine};
			}
		}
	}
`
