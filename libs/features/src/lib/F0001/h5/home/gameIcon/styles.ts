import styled from "styled-components";

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
	background: ${({ theme }) => theme.mobile.gameIconBg};
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
		}

		.txt-maintain {
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			padding: 27px 8px;
			background: ${({ theme }) => theme.mobile.gameIconMaintainBg};
			color: ${({ theme }) => theme.mobile.gameIconMaintainColor};
			font-size: 1.4rem;
			font-weight: 700;
			text-align: center;
		}
	}

	.img-wrapper {
		height: 100%;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.providerName {
		position: absolute;
		bottom: 0.4rem;
		text-align: center;
		width: 100%;
		line-height: 1;
		color: ${({ theme }) => theme.mobile.gameIconProviderNameColor};
		text-overflow: ellipsis;
		font-size: 1.2rem;
		font-weight: 400;
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
		color: ${({ theme }) => theme.mobile.gameIconNoGameIconColor};
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
