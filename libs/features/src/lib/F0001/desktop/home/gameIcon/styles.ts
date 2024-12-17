import styled from 'styled-components'

export const GameIconContainer = styled.div.attrs<{ $isMaintain: boolean }>(
	props => {
		return {
			style: {
				cursor: props.$isMaintain ? 'not-allowed' : 'pointer',
			},
		}
	}
)`
	position: relative;
	border-radius: 2rem;
	background: ${({ theme }) => theme.desktop.gameIconBg};
	overflow: hidden;
	&.maintain {
		.um-container {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			border-radius: 2rem;
			background: rgba(0, 0, 0, 0.5);
			z-index: 3;
		}

		.txt-maintain {
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			padding: 27px 8px;
			background: ${({ theme }) => theme.desktop.gameIconMaintainBg};
			color: ${({ theme }) => theme.desktop.gameIconMaintainColor};
			font-size: 1.4rem;
			font-weight: 700;
			text-align: center;
		}
	}
	// &.spacing-top-0 {
	// 	.um-container {
	// 		background: none;
	// 	}
	// 	.txt-maintain {
	// 		padding: 0;
	// 		height: 100%;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 	}
	// }

	.img-wrapper {
		height: 100%;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.btn-play {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		padding: 1rem 2.4rem;
	}

	.providerName {
		position: absolute;
		bottom: 0.4rem;
		text-align: center;
		width: 100%;
		line-height: 1.8rem;
		color: ${({ theme }) => theme.desktop.gameIconProviderNameColor};
		text-overflow: ellipsis;
		font-size: 1.2rem;
		font-weight: 400;
	}

	&:hover:not(.maintain) {
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: ${({ theme }) => theme.desktop.gameIconBgHover};
		}

		.btn-play {
			display: block;
		}
	}

	.img-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export const NoGameIconWrapper = styled.div`
	.icon:before {
		font-size: 3rem;
		color: ${({ theme }) => theme.desktop.gameIconNoGameIconColor};
	}
`

export const SpinnerBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.icon-loading {
		font-size: 2rem;
		animation: spin 1s linear 0s infinite;

		@keyframes spin {
			from {
				transform: rotate(0);
			}
			to {
				transform: rotate(359deg);
			}
		}
	}
`
