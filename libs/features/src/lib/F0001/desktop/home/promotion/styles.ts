import styled from 'styled-components'

export const PromotionContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 4rem;
	padding-bottom: 1.6rem;

	.swiper-wrapper {
		align-items: center;
	}

	.swiper-container {
		overflow: unset;
	}

	.swiper-slide {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rem;
		overflow: hidden;
		object-fit: cover;
		height: 13.8rem;
	}

	.promos-item img {
		width: auto;
		transform: scale(0.38);
	}

	.swiper-slide-active {
		width: 66.8rem !important;
		height: 21.2rem;
		img {
			transform: scale(0.6);
		}
	}

	.swiper-slide-prev,
	.swiper-slide-next {
		width: 34rem !important;
	}

	.swiper-button-next,
	.swiper-button-prev {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.8rem;
		width: 2.8rem;
		border-radius: 10rem;
		border: 2px solid #0f1428;
		background: ${({ theme }) => theme.desktop.hrefColorPrimary};
		font-size: 2.4rem;
		z-index: 3;
	}

	.swiper-button-prev {
		left: 25rem;
	}

	.swiper-button-next {
		right: 24.8rem;
	}

	@media (min-width: 1450px) {
		.swiper-button-prev {
			left: 34.8rem;
		}

		.swiper-button-next {
			right: 34.8rem;
		}
	}
`
