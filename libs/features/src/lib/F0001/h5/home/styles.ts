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

	.home-promos-swiper {
		margin-top: 7.2vw;
		.swiper-slide {
			max-width: 84vw;

			> div {
				width: 100%;
				height: 29vw;
				overflow: hidden;
				display: flex;
				justify-content: center;
				border-radius: 7.2vw;
			}
			img {
				width: auto;
				height: 100%;
			}
		}
	}
`

export const GameContainer = styled.div`
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
		margin-right: 22vw;
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
	padding: 5.8vw 3.8vw;

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

	.embla__container {
		--slide-height: 45.87vw;
		--slide-size: 33.9vw;
		--single-column-width: 33.9vw;

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width, var(--single-column-width));
	}

	.embla__controls {
		position: absolute;
		top: 4.7vw;
		right: 3.8vw;
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
		}
	}
`
