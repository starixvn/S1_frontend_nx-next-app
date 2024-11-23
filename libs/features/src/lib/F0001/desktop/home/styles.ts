import styled from "styled-components";

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

export const GroupTitle = styled.div`
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
