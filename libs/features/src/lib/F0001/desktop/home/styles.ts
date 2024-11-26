import styled from 'styled-components'

export const HomePage = styled.div`
	.homebanner {
		width: ${({ theme }) => theme.desktop.contentWidth};
		height: 39.4rem;
		border-radius: 2rem;

		.swiper-container {
			position: relative;

			> .swiper-wrapper {
				align-items: flex-start;
			}

			.banner {
				height: 36.4rem;

				img {
					border-radius: 2rem;
					height: 100%;
				}
			}

			.swiper-pagination {
				width: max-content;
				bottom: 0;
				right: unset;
				left: 50% !important;
				transform: translateX(-50%);
				z-index: 1;
				display: flex;
				align-items: center;

				.swiper-pagination-bullet {
					width: 1rem;
					height: 0.6rem;
					background: ${({ theme }) => theme.desktop.bannerBulletBg};
					margin: 0 4px;
					border-radius: 0.8rem;

					&.swiper-pagination-bullet-active {
						width: 4.5rem;
						height: 0.6rem;
						background: ${({ theme }) => theme.desktop.bannerBulletBgActive};
					}
				}
			}
		}
	}
`

export const GameContainer = styled.div`
	display: grid;
	gap: 2.4rem;
	margin-top: 4rem;
`

export const GroupTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	color: ${({ theme }) => theme.desktop.homePageTitleColor};
	font-size: 3.3rem;
	font-weight: 700;

	.load-more {
		display: flex;
		align-items: center;
		margin-right: 9rem;
		color: ${({ theme }) => theme.desktop.homePageLoadMoreColor};
		font-size: 1.7rem;
		font-weight: 600;

		.icon:before {
			position: relative;
			top: -2px;
			color: ${({ theme }) => theme.desktop.homePageLoadMoreColor};
		}

		&:hover,
		&:hover .icon:before {
			color: ${({ theme }) => theme.desktop.homePageLoadMoreColorHover};
		}
	}
`
export const GameGroup = styled.div`
	position: relative;
	padding-top: 4rem;
	padding-bottom: 4rem;

	&.promotion {
		width: 150rem;
		margin: 0 auto;

		.load-more {
			margin-right: 0;
		}
	}

	.embla__viewport {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
			width: 8rem;
			background: linear-gradient(270deg, #0f1428 0%, rgba(15, 20, 40, 0) 100%);
		}
	}

	&.slot .embla__container {
		--column-count: 6.5;
	}

	&.others .embla__container {
		--column-count: 8.5;
	}

	.embla__container {
		--largeGameWidth: 32rem;
		--slide-height: 18.9rem;
		--slide-size: 14rem;
		--single-column-width: calc(
			(
					(100% + var(--largeGameWidth)) - (var(--column-count) - 1) *
						var(--slide-spacing)
				) / var(--column-count)
		);

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width, var(--single-column-width));
		padding-right: var(--largeGameWidth);
	}

	.embla__controls {
		position: absolute;
		top: 3.8rem;
		right: 0;
		grid-template-columns: auto;
		gap: 0.8rem;
		margin-top: 0;

		.embla__button {
			border-radius: 1rem;
			border: 2px solid ${({ theme }) => theme.desktop.carouselBtnBorder};
			background: ${({ theme }) => theme.desktop.carouselBtnBg};
			font-size: 2.4rem;

			&:disabled .icon:before {
				color: ${({ theme }) => theme.desktop.carouselBtnColorDisabled};
			}

			&:hover:not([disabled]) {
				border: 2px solid ${({ theme }) => theme.desktop.carouselBtnBorderHover};
				background: ${({ theme }) => theme.desktop.carouselBtnBgHover};

				.icon:before {
					color: ${({ theme }) => theme.desktop.carouselBtnColorHover};
				}
			}
		}
	}
`
