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
		background: var(--Color-1, #232b4f);
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
		background: var(--Color-3, #374375);
		color: #fff;
		font-size: 1.4rem;
		font-weight: 400;

		&::-webkit-input-placeholder {
			color: #7883b4;
		}
	}

	.select-bar {
		display: flex;
		align-items: center;
		color: #bfbfbf;
		justify-content: space-around;
		width: 1000px;
		margin: 30px auto 10px;
		padding: 10px 0 0;
		border-bottom: 2px solid #ebebeb;
		position: relative;
		> div {
			margin-bottom: -2px;
			padding-bottom: 20px;
			&.active {
				border-bottom: 2px solid #ff6000;
				color: $primary;
			}
			&:hover {
				color: $primary;
				cursor: pointer;
			}
		}
	}
`
