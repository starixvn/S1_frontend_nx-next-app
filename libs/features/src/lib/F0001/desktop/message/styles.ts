import styled from 'styled-components'

export const WrapperMessage = styled.div`
	.custom-nodata {
		border-top: none;
		margin-top: 0;
		padding-top: 0;
	}

	.personal {
		overflow: hidden;
		.list {
			border-radius: 8px;
			overflow: hidden;
			border: 1px solid #374375;
			font-size: 1.4rem;
			font-weight: 600;
			line-height: normal;
			.year {
				margin-right: 0.5rem;
			}
			.functionMenu {
				background: #232b4f;
				display: flex;
				align-items: center;
				.group-btn-message {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					.group-btn {
						display: flex;
						gap: 1.6rem;
					}
				}
				> div {
					padding: 1.5rem 1.6rem;
					border: 1px solid #374375;
					border-right: none;
					border-top: none;
					&:first-child {
						border-left: none;
					}
				}
			}
			.haveRead {
				.listHeader {
					background: #182043;
					color: #939dc5;
					display: flex;
					&.active {
						background: #232b4f;
					}
					> div {
						padding: 1.5rem 1.6rem;
						border: 1px solid #374375;
						border-right: none;
						border-top: none;
						&:first-child {
							border-left: none;
						}
					}
					.group-title-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 100%;
					}
				}
				&:last-child {
					.listHeader {
						> div {
							border-bottom: none;
						}
					}
				}
			}
			.icon {
				&:before {
					font-size: 2rem;
					margin: 0;
				}
			}
			.txt-blue {
				font-weight: 600 !important;
				display: flex;
				align-items: center;
				gap: 0.8rem;
			}
		}
		.group-toggle-content {
			display: flex;
			.empty-box {
				display: none;
				padding: 1.5rem 1.6rem;
				border-right: 1px solid #374375;
				border-bottom: 1px solid #374375;
				.checkbox {
					opacity: 0;
				}
				&.active {
					display: block;
				}
			}
			.backstage {
				display: none;
				border-bottom: 1px solid #374375;
				padding: 1.5rem 1.6rem;
				font-size: 1.4rem;
				font-weight: 400;
				line-height: normal;
				color: #939dc5;
				width: 100%;
				&.active {
					display: block;
				}
			}
		}
	}
`
