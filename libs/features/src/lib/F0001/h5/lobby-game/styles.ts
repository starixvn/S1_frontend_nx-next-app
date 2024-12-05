import styled from "styled-components";

export const LobbyGamePage = styled.div`
	.title {
		width: 100%;
		height: 15.05vw;
		border-bottom: 1px solid #374375;
		background: #0f1428;
		display: flex;
		align-items: center;
		font-size: 4.26vw;
		font-weight: 700;
		padding-left: 14vw;

		.icon-back {
			font-size: 8.25vw;
		}

		a {
			position: absolute;
			left: 1.88vw;
			width: 12vw;
			height: 100%;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
			z-index: 1;
		}

		&.searchBar {
			position: relative;

			.icon-search {
				position: absolute;
				right: 3.88vw;
				top: 50%;
				transform: translateY(-50%);
				font-size: 4.85vw;
			}

			.infoModule {
				position: absolute;
				right: 3.88vw;
				top: 2.4vw;
				width: 0;
				opacity: 0;

				.inputBox {
					background: #232b4f;
					border-radius: 24.27vw;
					border: none;
					height: 8.73vw;
					padding: 0 2.9vw;

					input {
						padding: 0;
						height: 6vw;
						color: #fff;

						&::placeholder {
							color: #7883b4;
							text-align: left;
						}
					}
				}
				.icon-close {
					position: revert;
				}
				&.active {
					transition: 0.3s;
					width: 82.5vw;
					opacity: 1;
				}
			}
		}
	}

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

		.parts {
			.dropdown-container {
				background: white;
			}
		}

		.filterSelect {
			display: flex;
			height: 11.65vw;
			margin-top: 3.88vw;
			margin-bottom: 3.88vw;
			gap: 3.88vw;

			button,
			a {
				color: #717fba;
				margin: 0 1.94vw;
				padding: 0 1.94vw;
				white-space: nowrap;
				border-radius: 0;
				font-size: 3.39vw;
				font-weight: 600;

				&.active {
					margin-top: 1vw;
					color: #fff;
					border-bottom: 0.48vw solid #ea6118;
				}
			}
		}

		.partnerSelect {
			display: flex;
			flex-wrap: wrap;
			gap: 3.88vw;
			width: 100%;

			.provider-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 1.8vw;
				flex: 0 0 calc((100% - 7.76vw) / 3);
				height: 21.8vw;
				background: #1d2447;
				border-radius: 2.42vw;
				color: #fff;
				font-size: 12px;
				font-style: normal;
				font-weight: 700;

				.img-container {
					width: 8.7vw;
					height: 8.7vw;
					border-radius: 50%;
					background: #dcdee9;
				}

				&.active {
					background: linear-gradient(0deg, #717fba 0%, #a2afe5 100%);
					color: white;
				}
			}

			.provider-name {
				text-align: center;
				font-size: 2.91vw;
				font-style: normal;
				font-weight: 700;
			}
		}
	}

	.game-container {
	}
`
export const GameListContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	gap: 2rem;
	padding-bottom: 4rem;
`

export const GameIconContainer = styled.div`
	position: relative;
	margin-top: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 calc(100% / 3 - 10rem);
	background: ${({ theme }) => theme.desktop.gameIconBg};
	border-radius: 2rem;

	.img-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 21.6rem;
		min-height: 29.1rem;
		border-radius: 2rem;
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
		border-radius: 2rem;
		overflow: hidden;

		.providerName {
			position: absolute;
			bottom: 1.6rem;
			width: 100%;
			text-align: center;
			color: ${({ theme }) => theme.desktop.gameIconProviderNameColor};
			font-size: 1.7rem;
			font-weight: 400;
		}

		.icon-favorite {
			position: absolute;
			top: 1.2rem;
			right: 1.2rem;
			font-size: 3.2rem;

			&:before {
				color: ${({ theme }) => theme.desktop.gameIconFavoriteColor};
			}

			&.active:before {
				color: ${({ theme }) => theme.desktop.gameIconFavoriteColorActive};
			}
		}

		.button {
			display: none;
			padding-left: 2.4rem;
			padding-right: 2.4rem;
		}

		.btn-container {
			display: flex;
			flex-direction: column;
			gap: 0.8rem;
		}

		&:hover {
			cursor: pointer;
			background: ${({ theme }) => theme.desktop.gameIconBgHover};
			.button {
				display: block;
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
			padding: 2.7rem 0;
			background: ${({ theme }) => theme.desktop.gameIconMaintainBg};
			color: ${({ theme }) => theme.desktop.gameIconMaintainColor};
			text-align: center;
			font-size: 1.4rem;
			font-weight: 700;
		}
	}

	.new-icon {
		position: absolute;
		left: 1.6rem;
		top: 1.6rem;
		padding: 0.3rem 0.6rem;
		border-radius: 5.2rem;
		background: ${({ theme }) => theme.desktop.gameIconNewBg};
		box-shadow: ${({ theme }) => theme.desktop.gameIconNewShadow};
		color: ${({ theme }) => theme.desktop.gameIconNewColor};
		font-size: 1.2rem;
		font-weight: 600;
		z-index: 2;
	}
`
