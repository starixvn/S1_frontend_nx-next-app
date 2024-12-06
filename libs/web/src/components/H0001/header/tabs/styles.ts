import styled from 'styled-components'

export const QuickSelectContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-top: 0;
	border-bottom: 1px solid #374375;
	background: #0f1428;

	.embla {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			height: 11.65vw;
			width: 22.8vw;
			background: linear-gradient(270deg, #0f1428 0%, rgba(15, 20, 40, 0) 100%);
		}
	}

	+ .functionList {
		padding: 2vw 4vw;
		width: calc(100% - 8vw);
		position: unset;
		.infoModule.parts {
			flex-flow: nowrap;
			.inputBox {
				max-width: 28vw;
			}
		}
		.icon-icon32px_1 {
			margin: 0 0 0 1vw;
			color: $lightblue;
			display: flex;
			align-items: center;
		}
		.btn-group {
			margin: 0 0 0 1vw;
			flex: 1;
			align-items: center;
			button {
				padding: 2.5vw;
				white-space: nowrap;
			}
		}
	}

	.tab-item {
		height: 11.65vw;
		padding: 0 1.94vw;
		color: ${({ theme }) => theme.mobile.menuItemColor};
		font-size: 3.39vw;
		font-weight: 700;
		text-transform: uppercase;
		white-space: nowrap;

		&.active {
			border-bottom: 1px solid ${({ theme }) => theme.mobile.menuItemActiveLine};
			color: ${({ theme }) => theme.mobile.menuItemColorHover};
		}
	}

	.icon {
		position: fixed;
		right: 1vw;
		color: #112240;
		&:before {
			font-size: 6vw;
		}
	}
`
