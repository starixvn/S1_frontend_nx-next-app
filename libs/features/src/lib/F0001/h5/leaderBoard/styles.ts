import styled from 'styled-components'

export const WrapperLeaderBoard = styled.div`
	.rankingNew {
		padding: 5vw 4vw 35vw;
		width: calc(100% - 8vw);
		.title {
			color: ${({ theme }) => theme.mobile.white};
			font-size: 5vw;
			font-weight: 700;
			position: relative;
			padding: 3.4vw 0;
			text-align: center;
			> div {
				font-weight: 400;
				margin-top: 1vw;
				color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
			}
		}
		.rankList {
			background: ${({ theme }) => theme.mobile.rightModuleTitleBg};
			border-radius: 20px;
			padding: 2.9vw 4vw;
			.title {
				font-size: 4.1vw;
				padding: 2vw 0;
			}
			ul {
				li {
					display: flex;
					align-items: center;
					background: #182043;
					border-radius: 50px;
					margin: 2vw 0;
					padding: 2vw 3vw;
					&:first-child {
						padding: 2vw 3vw;
						font-size: 2.9vw;
						font-weight: 700;
						background: transparent;
						border: 0;
						> div {
							color: ${({ theme }) => theme.mobile.white};
							&:first-child {
								margin-left: 6.1vw;
								flex: 1;
							}
						}
					}
					div {
						font-size: 2.9vw;
						font-weight: 700;
						color: ${({ theme }) => theme.mobile.rightModuleSloganColor};
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						&:first-child {
							flex: 1.4;
							justify-content: flex-start;
							text-align: left;
						}
						&:last-child {
							flex: 0.6;
							justify-content: center;
						}
						img {
							width: 5.8vw;
							margin-right: 1vw;
						}
					}
				}
			}
		}
	}
	.btnGroup {
		justify-content: center;
		a {
			width: max-content;
		}
	}
	.rankList ul li.userRank {
		color: #5574a7;
		background: white;
		text-align: center;
		font-weight: bold;
	}
	.rankList ul li.userRank span {
		color: #a5aab1;
		margin: 0 0 0 2vw;
	}
	.text-blue {
		color: #5574a7;
		margin-bottom: 2vw;
	}
	.filterBtn button {
		white-space: nowrap;
	}
`
