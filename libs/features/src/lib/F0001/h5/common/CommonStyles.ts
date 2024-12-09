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
				li {
					font-size: 3.4vw;
					margin-bottom: 2vw;
					width: 50%;
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
		color: #939dc5;
		background: #374375;
		.icon {
			&:before {
				font-size: 5vw;
				color: #939dc5;
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
			background: #0f1428;
			font-weight: 700;
			justify-content: flex-start;
			gap: 2vw;

			.icon-arrow-left-line {
				margin-left: 5vw;
			}
		}
	}
`
