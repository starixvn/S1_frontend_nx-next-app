import styled from 'styled-components'

export const WrapperDepositPageHistoryH5 = styled.div`
	.quickSelect {
		display: flex;
		padding: 0 8vw;
		width: calc(100% - 7vw);
		border-bottom: 1px solid
			${({ theme }) => theme.mobile.customNodataBorderColor};
		overflow: scroll;
		align-items: center;
		margin-top: 0;
		position: relative;
		background: #0f1428;
		&:before {
			content: '';
			position: fixed;
			width: 20vw;
			height: 20vw;
			background: linear-gradient(270deg, #0f1428 0%, rgba(15, 20, 40, 0) 100%);
			right: 0;
			top: 51px;
		}
	}
	#header {
		box-shadow: none;
	}
	.quickSelect + .functionList {
		padding: 4vw 0;
		width: calc(100% - 6.5vw);
		position: unset;
		border-bottom: 1px solid #374375;
		background: #0f1428;
	}

	.quickSelect + .functionList .btn-group button {
		padding: 2.5vw;
		white-space: nowrap;
	}
	.quickSelect button {
		color: ${({ theme }) => theme.mobile.white};
		white-space: nowrap;
		font-weight: 700;
		font-size: 3.4vw;
		text-transform: uppercase;
		padding: 3.8vw 0;
		border-bottom: 2px solid #0f1428;
	}
	.quickSelect button.active {
		color: ${({ theme }) => theme.mobile.hrefColorPrimary};
		border-bottom: 2px solid ${({ theme }) => theme.mobile.hrefColorPrimary};
	}
	.quickSelect .icon:before {
		font-size: 6vw;
	}

	.functionList {
		padding: 3vw 0;
		margin: 0vw 3.88vw;
		width: calc(100% - 3.88vw);
		left: -3vw;
		z-index: 2;
		top: 25vw;
		border-bottom: 1px solid ${({ theme }) => theme.mobile.menuQuickSlectBorder};
		background: ${({ theme }) => theme.mobile.menuQuickSlectBg};

		.infoModule {
			display: flex;
			align-items: center;
			gap: 2.9vw;
		}
		.btnGroup {
			margin-top: 0;
		}
		.inputBox-blue {
			margin-top: 0;
			input {
				border-radius: 22px;
			}
		}
	}
	.history {
		padding: 20vw 4vw 30vw 4vw;
	}
	.infoList {
		.info {
			margin-top: 0 !important;
		}
	}
`
