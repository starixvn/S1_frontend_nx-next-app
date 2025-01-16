import styled from 'styled-components'

export const WrapperInfoList = styled.div`
	.recent {
		visibility: hidden;
		transition: 0.7s;
		opacity: 0;
		height: 0;
		&.active {
			visibility: visible;
			transition: 0.7s;
			opacity: 1;
			height: auto;
			.info {
				display: block;
				padding: 2.9vw;
				margin: 3.5vw 0;
				background: ${({ theme }) => theme.mobile.rightModuleBg};
				border-radius: 20px;
			}
		}
		.info {
			display: none;
			ul {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: 1vw;
				li {
					font-size: 3.4vw;
					margin-bottom: 2vw;
					width: 49%;
					display: flex;
					flex-direction: column;
					gap: 1.45vw;

					.title {
						font-weight: 600;
						color: ${({ theme }) => theme.mobile.white};
					}
					.value {
						font-weight: 400;
						color: #939dc5;
						overflow-wrap: break-word;
					}
					.body {
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
						font-weight: 400;
						word-break: break-all;
					}
				}
			}
		}
		.pending,
		.approved,
		.reject,
		.cancel,
		.undefined,
		.cancelled {
			font-size: 1.2rem;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			padding: 0.4rem 1.2rem;
			border-radius: 100px;
			display: inline-flex;
			align-items: center;
			gap: 3px;
			width: fit-content;
			.infobtn {
				&:before {
					font-family: 'S1NewIcons';
					display: block;
					content: '\\e910';
					font-size: 1.5rem;
					color: #fff;
				}
			}
		}
		.pending,
		.undefined {
			color: ${({ theme }) => theme.desktop.tableStatusPenddingColor};
			border: 1px solid ${({ theme }) => theme.desktop.tableStatusPenddingColor};
			.infobtn {
				&:before {
					color: ${({ theme }) => theme.desktop.tableStatusPenddingColor};
				}
			}
		}
		.approved {
			color: ${({ theme }) => theme.desktop.tableStatusApprovedColor};
			border: 1px solid ${({ theme }) => theme.desktop.tableStatusApprovedColor};
			.infobtn {
				&:before {
					color: ${({ theme }) => theme.desktop.tableStatusApprovedColor};
				}
			}
		}
		.reject {
			color: ${({ theme }) => theme.desktop.tableStatusRejetctColor};
			border: 1px solid ${({ theme }) => theme.desktop.tableStatusRejetctColor};
			.infobtn {
				&:before {
					color: ${({ theme }) => theme.desktop.tableStatusRejetctColor};
				}
			}
		}
		.cancel,
		.cancelled {
			color: ${({ theme }) => theme.desktop.tableStatusCancelColor};
			border: 1px solid ${({ theme }) => theme.desktop.tableStatusCancelColor};
			.infobtn {
				&:before {
					color: ${({ theme }) => theme.desktop.tableStatusCancelColor};
				}
			}
		}
	}
	.btn-recent-history {
		color: ${({ theme }) => theme.mobile.btnRecenterHistoryColor};
		background: ${({ theme }) => theme.mobile.btnRecenterHistoryBg};
		.icon {
			&:before {
				font-size: 5vw;
				color: ${({ theme }) => theme.mobile.btnRecenterHistoryColor};
			}
		}
	}

	.recentBtn {
		a {
			min-height: 8vw;
		}
	}
`

export const WrapperCustomTitleBack = styled.div`
	width: 100%;
	.title {
		&.custom-title-back {
			padding: 0;
			background: ${({ theme }) => theme.mobile.headerBg};
			font-weight: 700;
			justify-content: flex-start;
			gap: 4vw;
			a {
				position: unset;
				width: 9vw;
			}
			.icon-back {
				font-size: unset;
			}
			.icon-arrow-left-line {
				margin-left: 5vw;
				letter-spacing: 0;
				&:before {
					font-size: 6.25vw;
				}
			}
		}
	}
`

export const WrapperErrorPageH5 = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(${({ theme }) => theme.assetUrl}/h5/img/new-ui/bg-error.webp);
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
			max-width: 100%;
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
