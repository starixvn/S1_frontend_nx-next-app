import styled from 'styled-components'

export const WrapperMessageH5 = styled.div`
	.Message,
	.Announcement {
		padding: 0 0 30vw 0;
		width: 100%;
		.icon {
			&:before {
				font-size: 5vw;
			}
		}
		.functionList {
			display: flex;
			justify-content: space-between;
			background: #232b4f;
			align-items: center;
			padding: 3.4vw 4vw;
		}
		.checkbox {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			font-size: 3.4vw;
			font-weight: 700;
			input {
				display: none;
			}
		}
	}
	.smallBtn-group {
		display: flex;
		align-items: center;
		gap: 3vw;
	}
	.account {
		margin-top: 1vw;
		.info {
			background: ${({ theme }) => theme.desktop.rightModuleBg};
			padding: 3.4vw 4vw;
			display: flex;
			align-items: flex-start;
			gap: 2vw;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-size: 3.4vw;
			.icon {
				&:before {
					color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
				}
			}
		}
		.content {
			background: ${({ theme }) => theme.desktop.rightModuleBg};
			padding: 1vw 4vw 4vw 10vw;
			display: none;
			color: ${({ theme }) => theme.desktop.rightModuleSloganColor};
			font-weight: 500;
			font-size: 3.4vw;
		}
		&.active {
			.content {
				display: block;
			}
		}
		&.noread {
			.introduction {
				span {
					color: ${({ theme }) => theme.desktop.white};
				}
			}
		}
	}
	.introduction {
		display: flex;
		flex-flow: wrap;
		width: 100%;
	}
	.introduction span {
		width: 100%;
		font-weight: 400;
		font-size: 2.9vw;
		margin-top: 1vw;
		&.title {
			font-weight: 700;
			font-size: 3.4vw;
			margin-top: 0;
		}
	}
	.Announcement {
		.content {
			padding: 1vw 4vw 4vw 4vw;
		}
		.custom-nodata {
			padding-top: 1.6rem;
		}
	}
`
