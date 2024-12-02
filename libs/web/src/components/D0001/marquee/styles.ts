import styled from "styled-components";

export const HomeMarquee = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 4rem;
	background: ${({ theme }) => theme.desktop.marqueeMessageBg};

	.content-container {
		display: grid;
		grid-template-columns: 1fr 12rem;
	}

	.marquee {
		position: relative;
		overflow: hidden;
		font-size: 1.3rem;

		.marquee-box {
			overflow: hidden;
			padding: 0 1.2rem;

			width: 100%;
			margin: auto;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-style: normal;
			font-weight: 700;

			&::before {
				display: flex;
				align-items: center;
				content: 'NEW';
				height: 2rem;
				background: #fff;
				padding: 0 0.8rem;
				border-radius: 10rem;
				color: #e13c29;
			}
		}
		.marquee-run {
			position: absolute;
			display: flex;
			flex-flow: row;
			padding-left: 6rem;
			white-space: nowrap;
			button {
				font-style: italic;
				font-weight: 400;
				color: ${({ theme }) => theme.desktop.marqueeMessageColor};
				margin-right: 1rem;
			}
		}
	}

	.live-chat {
		display: flex;
		align-items: center;
		justify-content: end;
		height: 100%;
		color: ${({ theme }) => theme.desktop.liveChatColor};

		.icon:before {
			font-size: 2rem;
			color: ${({ theme }) => theme.desktop.liveChatColor};
		}
	}
`
