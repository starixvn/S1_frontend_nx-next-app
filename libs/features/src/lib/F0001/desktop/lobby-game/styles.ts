import styled from "styled-components";

export const LobbyGamePage = styled.div`
	.banner-container {
		padding-top: 2rem;
		height: 39rem;
		background: url(${({ theme }) =>
			theme.assetUrl}/desktop/img/new-ui/banner-bg.webp);

		.img {
			height: 36.4rem;
		}
	}

	.filter-form {
		display: flex;
		padding: 2rem;
		flex-direction: column;
		align-items: flex-start;
		align-self: stretch;
		border-radius: 2rem;
		background: ${({ theme }) => theme.desktop.filterFormBg};
	}
`

export const GameListContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	.game-icon {
		margin-top: 4rem;
		flex: 0 0 calc(100% / 6 - 10rem);
		position: relative;

		.img-wrapper {
			position: relative;
			overflow: hidden;
			border-radius: 2rem;
			z-index: 2;
			width: 21.6rem;
			min-height: 29.1rem;

			img {
				width: 100%;
			}

			.btn-container {
				background: linear-gradient(
					180deg,
					rgba(0, 0, 0, 0.3169642857142857) 0%,
					rgba(0, 0, 0, 1) 100%
				);
				position: absolute;
				z-index: 2;
				width: 222px;
				height: 222px;
				border-radius: 25px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				transition: 0.3s;
				transform: translateY(0%);
				opacity: 0;
				visibility: hidden;
				.btn {
					&-play,
					&-demo {
						border-radius: 50px;
						width: 110px;
						height: 40px;
						color: white;
					}
					&-play {
						background: #ff7700;
						margin-bottom: 15px;
					}
					&-demo {
						border: 1px solid white;
					}
				}
			}
			&:hover {
				.btn-container {
					transform: translateY(-100%);
					visibility: visible;
					opacity: 1;
				}
			}
		}
		.details {
			display: flex;
			align-items: center;
			position: relative;
			> div {
				&:first-child {
					border: 1px solid #dcdcdc;
					width: 220px;
					margin-top: -40px;
					border-radius: 25px;
					padding: 48px 0 12px;
				}
				&:last-child {
					position: absolute;
					right: 30px;
					bottom: 20px;
					img {
						width: 23px;
						filter: drop-shadow(0 0 6px #c9c9c9);
					}
					&.active {
						img {
							filter: unset;
						}
					}
				}
				> div {
					margin-left: 12px;
					&:first-child {
						color: $primary;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 155px;
					}
					&:last-child {
						color: #929292;
						font-size: 10px;
					}
				}
			}
		}
		&:hover {
			cursor: pointer;
			.details {
				> div {
					&:first-child {
						background: linear-gradient(
							180deg,
							rgba(62, 130, 249, 1) 0%,
							rgba(17, 34, 64, 1) 100%
						);
						border: 0;
						width: 222px;
					}
					> div {
						&:first-child {
							color: white;
						}
					}
				}
			}
		}
		.under {
			background: #000000a1;
			width: 222px;
			height: 221px;
			border-radius: 25px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 16px;
			text-shadow: 0 0 4px white;
		}
		.new-icon {
			right: 10px;
			top: -13px;
		}
	}
`

export const SearchForm = styled.div`
	position: relative;
	display: flex;
	width: 100%;

	.icon {
		position: absolute;
		font-size: 2rem;
		top: 1rem;
		left: 1rem;
	}

	.search-input {
		display: flex;
		align-items: center;
		align-self: stretch;
		height: 4rem;
		width: 100%;
		padding: 0 4rem;
		border-radius: 10rem;
		background: ${({ theme }) => theme.desktop.filterFormInputBg};
		color: ${({ theme }) => theme.desktop.filterFormInputColor};
		font-size: 1.4rem;
		font-weight: 400;

		&::-webkit-input-placeholder {
			color: ${({ theme }) => theme.desktop.filterFormInputPlaceHolderColor};
		}
	}
`

export const CategoryFilterTabs = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.6rem;
	width: 100%;
	margin-top: 4rem;
	border-bottom: ${({ theme }) => theme.desktop.gameTabBorder};

	.tab-item {
		position: relative;
		top: 0.1rem;
		display: flex;
		align-items: center;
		min-height: 4.8rem;
		padding: 0 0.8rem;
		font-size: 1.4rem;
		font-weight: 600;
		color: ${({ theme }) => theme.desktop.gameTabItemColor};

		&.active {
			border-bottom: ${({ theme }) => theme.desktop.gameTabItemBorderHover};
			color: ${({ theme }) => theme.desktop.gameTabItemColorHover};
		}
		&:hover {
			color: ${({ theme }) => theme.desktop.gameTabItemColorHover};
			cursor: pointer;
		}
	}
`
