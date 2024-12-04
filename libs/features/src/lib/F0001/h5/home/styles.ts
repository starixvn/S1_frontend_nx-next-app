import styled from "styled-components";

export const HomPageContainer = styled.div`
	.home-mainbanner {
		.swiper-container {
			position: relative;
			margin: 0 auto;
			overflow: hidden;
			list-style: none;
			padding-bottom: 9.7vw;
			width: 100%;

			.swiper-slide.swiper-slide-active {
				display: flex;
				justify-content: center;
			}

			.swiper-pagination-bullet-active {
				background: $lightblue;
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
				width: 2.4vw;
				height: 1.4vw;
				background: ${({ theme }) => theme.desktop.bannerBulletBg};
				margin: 0 0.97vw;
				border-radius: 0.8rem;

				&.swiper-pagination-bullet-active {
					width: 10.9vw;
					height: 1.4vw;
					background: ${({ theme }) => theme.desktop.bannerBulletBgActive};
				}
			}
		}
	}
`

export const GameContainer = styled.div`
	display: grid;
	gap: 3.8vw;
	margin-top: 5.8vw;
`

export const GroupTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	color: ${({ theme }) => theme.desktop.homePageTitleColor};
	font-size: 5.8vw;
	font-weight: 700;

	.load-more {
		display: flex;
		align-items: center;
		margin-right: 26vw;
		color: ${({ theme }) => theme.desktop.homePageLoadMoreColor};
		font-size: 4.1vw;
		font-weight: 600;

		.icon:before {
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
	padding: 9.8vw 3.8vw;

	&.promotion {
		width: ${({ theme }) => theme.desktop.minContentWidth};
		margin: 0 auto;

		@media (min-width: 1450px) {
			width: 140rem;
		}

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
			background: linear-gradient(
				270deg,
				#0f1428ed 0%,
				rgba(15, 20, 40, 0) 100%
			);
		}
	}

	.embla__container {
		--largeGameWidth: 32rem;
		--slide-height: 18.9rem;
		--slide-size: 14rem;
		--column-count: 3.5;
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
		top: 8.7vw;
		right: 0;
		grid-template-columns: auto;
		gap: 1.9vw;
		margin-top: 0;

		.embla__button {
			border-radius: 2.4vw;
			border: 2px solid ${({ theme }) => theme.desktop.carouselBtnBorder};
			background: ${({ theme }) => theme.desktop.carouselBtnBg};
			font-size: 5.8vw;

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
