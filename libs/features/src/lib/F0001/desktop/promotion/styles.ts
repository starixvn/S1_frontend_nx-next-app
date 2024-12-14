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
			background: #182043;
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
						max-width: 50rem;
						@media (min-width: 1450px) {
							max-width: 65.3rem;
						}
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
						min-width: 30rem;
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
							max-width: 30rem;
							button {
								max-width: 18.2rem;
								width: 50%;
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
	.specialBonus {
		display: inline-flex;
		padding: 2rem;
		background: #182043;
		width: 100%;
		.inputBox-blue {
			margin-top: 0;
			background: #232b4f;
		}
		.form {
			gap: 1.6rem;
			display: flex;
		}
	}
	.specialBonus .inputBox-white {
		position: unset;
		margin: 0;
		border: 0;
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.specialBonus .btnGroup {
		margin: 0;
	}
`

export const WrapperErrorPage = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(${({ theme }) =>
		theme.assetUrl}/desktop/img/new-ui/bg-error.webp);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	.page-error {
		.logo-page {
			img {
				width: 10rem;
				margin: 3rem auto;
			}
		}
		&-group {
			max-width: 100rem;
			padding: 0 1.2rem;
			width: 100%;
			display: flex;
			align-items: center;
			gap: 4rem;
		}
		&-img {
			width: 100%;
			min-width: 42rem;
		}
		&-box {
			&-title {
				color: ${({ theme }) => theme.desktop.hrefColorPrimary};
				font-size: 2.5rem;
				font-weight: 700;
				margin-bottom: 1.6rem;
			}
			&-content {
				font-size: 1.4rem;
				color: ${({ theme }) => theme.desktop.white};
				line-height: 1.8rem;
			}
			.hour {
				color: #1b5bff;
			}
		}
	}
`
