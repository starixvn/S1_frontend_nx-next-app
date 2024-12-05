import styled from 'styled-components'

export const WrapperJoinPage = styled.div`
	.group-dropdown {
		.inputBox {
			display: flex;
			align-items: center;
			width: 100%;
			.dropdown {
				width: 100%;
				.text {
					width: 100%;
					display: block;
				}
				&-item {
					min-height: unset;
				}
				&-container {
					max-height: 20rem;
					overflow-y: auto;
				}
			}
		}
	}
	.infoModule {
		&.parts {
			display: flex;
			justify-content: space-between;
			gap: 0.8rem;
			.group-dropdown {
				width: 100%;
			}
		}
	}
	.phone {
		display: flex;
		align-items: center;
		.inputBox {
			width: auto;
		}
	}
`
