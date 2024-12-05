import styled from "styled-components";

export const HeaderContainer = styled.div`
	width: 100%;
	position: sticky;
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

	.header-module {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 2vw 0;
		justify-content: space-between;
		.header-logo {
			position: relative;
			img {
				display: block;
				width: 25vw;
				margin-left: 3vw;
			}
		}
		.btn-menu {
			margin: 1vw 2.5vw 0 0;
			img {
				width: 6vw;
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
