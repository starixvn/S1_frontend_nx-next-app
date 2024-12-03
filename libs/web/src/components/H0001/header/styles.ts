import styled from "styled-components";

export const HeaderContainer = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	background: ${({ theme }) => theme.mobile.headerBg};
	flex-flow: wrap;
	display: flex;
	align-items: center;
	padding: 0;
	z-index: 3;
	justify-content: space-between;

	.btn-groups {
		display: flex;
	}

	.header-login {
		display: flex;
		gap: 2vw;
		margin-right: 1.5vw;
	}

	.icon-hamburger {
		font-size: 7.8vw;
	}

	.headerModule {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		position: relative;
		> a {
			display: flex;
			align-items: center;
			height: 13.5vw;
			width: 42vw;
			clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
			img {
				width: 21vw;
				margin-left: 2vw;
			}
		}
		> div {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin: 1.5vw;
		}

		.headerInfo {
			display: flex;
			font-size: 3vw;
			span {
				margin-right: 1vw;
			}
			.MemberID {
				color: white;
				display: flex;
				align-items: center;
				margin-left: 1vw;
			}
		}
	}
	button.clickBtn {
		display: flex;
		width: 5vw;
		height: 5vw;
		padding: 0;
		margin: 0 0 0 2.5vw;
		&::before {
			transform: scale(0.75);
		}
	}
`
