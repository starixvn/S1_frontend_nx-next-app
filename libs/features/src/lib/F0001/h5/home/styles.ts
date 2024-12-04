import styled from "styled-components";

export const HomPageContainer = styled.div`
	.home-mainbanner {
		.swiper-container {
			position: relative;
			margin: 0 auto;
			overflow: hidden;
			list-style: none;
			padding: 0;
			width: 100%;

			.swiper-slide.swiper-slide-active {
				display: flex;
				justify-content: center;
			}

			.swiper-pagination-bullet-active {
				background: $lightblue;
			}
		}

		.mainbanner {
			height: 36vw;
			display: block;
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
`
