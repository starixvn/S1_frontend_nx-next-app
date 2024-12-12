import styled from 'styled-components'

export const HomPageContainer = styled.div`
	.home-mainbanner {
		.swiper-container {
			position: relative;
			margin: 0 auto;
			overflow: hidden;
			list-style: none;
			padding-bottom: 7.28vw;
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
				background: ${({ theme }) => theme.mobile.bannerBulletBg};
				margin: 0 0.97vw;
				border-radius: 0.8rem;

				&.swiper-pagination-bullet-active {
					width: 10.9vw;
					height: 1.4vw;
					background: ${({ theme }) => theme.mobile.bannerBulletBgActive};
				}
			}
		}
	}

	.home-promos-swiper {
		margin-top: 7.2vw;
		margin-left: 0;
		overflow: hidden;

		.swiper-slide {
			max-width: 84vw;

			> div {
				width: 100%;
				height: 29vw;
				overflow: hidden;
				display: flex;
				justify-content: center;
				border-radius: 4.85vw;
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
	color: ${({ theme }) => theme.mobile.homePageTitleColor};
	font-size: 5.8vw;
	font-weight: 700;

	.load-more {
		display: flex;
		align-items: center;
		margin-right: 26.21vw;
		color: ${({ theme }) => theme.mobile.homePageLoadMoreColor};
		font-size: 4.1vw;
		font-weight: 600;

		.icon:before {
			color: ${({ theme }) => theme.mobile.homePageLoadMoreColor};
		}
	}
`
export const GameGroup = styled.div`
	position: relative;
	padding: 5.8vw 0 5.8vw 3.8vw;

	&.promotion .load-more {
		margin-right: 3.2vw !important;
	}

	.embla__container {
		--slide-height: 45.9vw;
		--slide-size: 33.9vw;
		--column-count: 2.5;
		--single-column-width: calc(
			(
					(100% + var(--slide-spacing)) - (var(--column-count)) *
						var(--slide-spacing)
				) / var(--column-count)
		);
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width, var(--single-column-width));
		margin-right: var(--slide-spacing);
	}

	.embla__controls {
		position: absolute;
		top: 5.2vw;
		right: 3.8vw;
		grid-template-columns: auto;
		gap: 1.9vw;
		margin-top: 0;

		.embla__button {
			border-radius: 2.4vw;
			border: 2px solid ${({ theme }) => theme.mobile.carouselBtnBorder};
			background: ${({ theme }) => theme.mobile.carouselBtnBg};
			font-size: 5.8vw;

			&:disabled .icon:before {
				color: ${({ theme }) => theme.mobile.carouselBtnColorDisabled};
			}
		}
	}
`
