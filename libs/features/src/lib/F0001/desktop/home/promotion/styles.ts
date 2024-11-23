import styled from "styled-components";

export const PromotionContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding: 4rem 0;
	.swiper-container {
		overflow: unset;
		height: 21.2rem;
	}
	.swiper-slide {
		transform: scale(0.82);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rem;
	}
	.swiper-slide-active {
		transform: scale(1.25);
	}
	.promos-item {
		img {
			width: 65rem;
		}
	}
	.swiper-button-next,
	.swiper-button-prev {
		font-size: 2.4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.8rem;
		width: 2.8rem;
		border-radius: 10rem;
		border: 2px solid var(--Color-2, #0f1428);
		background: var(--Color-5, #ea6118);
		font-size: 2.4rem;
	}

	.swiper-button-prev {
		position: absolute;
		left: 40.2rem;
	}

	.swiper-button-next {
		position: absolute;
		right: 40.2rem;
	}
`
