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
		height: 21.2rem;
	}

	.swiper-slide {
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rem;
		height: 19rem;
		transform: scale(0.75);
	}
	.swiper-slide-active {
		transform: scale(1.26);
	}
	.promos-item img {
		width: 100%;
		height: 100%;
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
		background: #ea6118;
		font-size: 2.4rem;
		z-index: 1;
	}

	.swiper-button-prev {
		left: 43rem;
	}

	.swiper-button-next {
		right: 43rem;
	}
`
