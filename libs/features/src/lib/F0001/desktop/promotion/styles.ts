import styled from 'styled-components'

export const WrapperPromotion = styled.div`
	.inside {
		margin-bottom: 8rem;
	}
	.tabs-list {
		border-radius: 20px;
		overflow: hidden;
		&-control {
			.promosSelect {
				.promoType {
					display: flex;
					button {
						padding: 0;
						font-size: 1.4rem;
						font-weight: 600;
						line-height: normal;
						color: ${({ theme }) => theme.desktop.white};
						background: ${({ theme }) => theme.desktop.promotionNavBg};
						padding: 1.7rem 0.8rem;
						width: 100%;
						&.blue {
							background: ${({ theme }) => theme.desktop.promotionNavActiveBg};
						}
					}
				}
			}
		}
		&-body {
			background: ${({ theme }) => theme.desktop.promotionTabsBodyBg};
			padding: 2rem;
			.proListNew {
				&-item {
					padding: 1.6rem;
					background: ${({ theme }) => theme.desktop.promotionItemsBg};
					border: 1px solid ${({ theme }) => theme.desktop.promotionItemsBg};
					overflow: hidden;
					border-radius: 20px;
					display: flex;
					gap: 2.4rem;
					position: relative;
					margin-bottom: 2.4rem;
					&:hover {
						border: 1px solid
							${({ theme }) => theme.desktop.promotionBorderItems};
						background: ${({ theme }) => theme.desktop.promotionItemBgHover};
						.remain {
							background: ${({ theme }) => theme.desktop.promotionTimeBgHover};
						}
					}
					&:last-child {
						margin-bottom: 0;
					}
					.promotion-status {
						position: absolute;
						padding: 0.6rem 1.2rem;
						right: 12px;
						top: 12px;
						border-radius: 50px;
						font-size: 1rem;
						font-weight: 700;
						line-height: normal;
						color: ${({ theme }) => theme.desktop.white};
					}
					.promoImg {
						height: 17rem;
						overflow: hidden;
						border-radius: 20px;
						position: relative;
						width: 100%;
						max-width: 65.3rem;
						img {
							position: absolute;
							top: 0;
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					.promotion-status {
						position: absolute;
					}
					.promoInfo {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						&-heading {
							font-size: 2.5rem;
							font-weight: 700;
							line-height: normal;
							margin-bottom: 0.4rem;
						}
						&-description {
							font-size: 1.4rem;
							font-weight: 400;
							line-height: 1.8rem;
						}
						.btnGroup {
							margin: 0;
							justify-content: flex-start;
							button {
								max-width: 18.2rem;
							}
						}
					}
					.remain {
						position: absolute;
						bottom: 0;
						right: 0;
						border-radius: 20px 0px 0px 0px;
						background: ${({ theme }) => theme.desktop.promotionTimeBg};
						padding: 1rem 2rem;
						.group-icon {
							display: flex;
							gap: 0.4rem;
							align-items: center;
							font-size: 1.4rem;
							text-transform: capitalize;
							.icon {
								&:before {
									font-size: 1.6rem;
								}
							}
						}
						.time {
							margin-top: 0.4rem;
							text-align: center;
							font-size: 17px;
							font-weight: 700;
							line-height: normal;
							color: ${({ theme }) => theme.desktop.hrefColorPrimary};
						}
					}
				}
			}
		}
		.custom-nodata {
			border-top: none;
			margin-top: 0;
			padding-top: 0;
		}
		.icon-refresh-fill {
			border-radius: 100px;
			&:before {
				margin: 0;
			}
		}
	}
	#popup {
		z-index: 999;
	}
`
