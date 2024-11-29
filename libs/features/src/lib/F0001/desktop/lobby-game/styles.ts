import styled from 'styled-components'

export const LobbyGamePage = styled.div`
	.banner-container {
		padding-top: 2rem;
		height: 39rem;
		background: url(${({ theme }) =>
			theme.assetUrl}/desktop/img/new-ui/banner-bg.webp);

		.img {
			height: 36.4rem;
		}

		.content-container {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 36.4rem;
			background: #1d2447;
			border-radius: 2rem;
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

	.custom-nodata {
		margin-top: 2rem;
	}
`

export const GameIconContainer = styled.div`
	position: relative;
	margin-top: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 calc(100% / 6 - 10rem);
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

	.under {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
		z-index: 3;
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

export const GameListContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	gap: 2rem;
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
