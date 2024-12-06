import styled from 'styled-components'

export const LobbyGamePage = styled.div`
	.banner-container {
		max-height: 36.4vw;
		padding-bottom: 5.83vw;

		.img {
			width: 100%;
			height: auto;
		}
	}

	.functionList {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding: 0 3.88vw;
	}
`

export const CategoryFilterTabs = styled.div`
	display: flex;
	height: 11.65vw;
	border-bottom: 1px solid #556298;
	margin: 3.88vw 1.94vw;
	gap: 3.88vw;
	width: 92vw;

	.embla {
		--slide-size: auto;
	}

	.tab-item {
		position: relative;
		bottom: 0.72vw;
		height: 11.65vw;
		padding: 0 1.94vw;
		margin-top: 1vw;
		white-space: nowrap;
		color: #717fba;
		font-size: 3.39vw;
		font-weight: 600;

		&.active {
			color: #fff;
			border-bottom: 0.48vw solid #ea6118;
		}
	}
`

export const GameListContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	gap: 3.88vw;
	padding: 0 3.88vw;

	&.sport {
		padding-bottom: 5.82vw;
	}
`

export const GameIconContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 calc((100% - 7.76vw) / 3);
	background: ${({ theme }) => theme.mobile.gameIconBg};
	border-radius: 2rem;

	.img-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 37.8vw;
		border-radius: 4.85vw;
		overflow: hidden;
		z-index: 2;

		img {
			width: 100%;
		}
	}

	.details {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		border-radius: 4.85vw;
		overflow: hidden;

		.providerName {
			position: absolute;
			bottom: 1.9vw;
			width: 100%;
			text-align: center;
			color: ${({ theme }) => theme.mobile.gameIconProviderNameColor};
			font-size: 2.9vw;
			font-style: normal;
			font-weight: 400;
		}

		.icon-favorite {
			position: absolute;
			top: 1.9vw;
			right: 1.9vw;
			font-size: 4.85vw;

			&:before {
				color: ${({ theme }) => theme.mobile.gameIconFavoriteColor};
			}

			&.active:before {
				color: ${({ theme }) => theme.mobile.gameIconFavoriteColorActive};
			}
		}
	}

	.um-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 2rem;
		background: rgba(0, 0, 0, 0.5);
		z-index: 3;

		.under {
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1.9vw 0;
			background: ${({ theme }) => theme.mobile.gameIconMaintainBg};
			color: ${({ theme }) => theme.mobile.gameIconMaintainColor};
			text-align: center;
			font-size: 2.4vw;
			font-weight: 700;
		}
	}

	.new-icon {
		position: absolute;
		left: 1.9vw;
		top: 1.9vw;
		padding: 0.72vw 1.45vw;
		border-radius: 12.6vw;
		background: ${({ theme }) => theme.mobile.gameIconNewBg};
		box-shadow: ${({ theme }) => theme.mobile.gameIconNewShadow};
		color: ${({ theme }) => theme.mobile.gameIconNewColor};
		font-size: 2.4vw;
		font-weight: 600;
		z-index: 2;
	}
`
