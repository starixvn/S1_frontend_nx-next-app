import styled from "styled-components";

export const HomeMarquee = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 4rem;
	padding: 0 calc((100% - ${({ theme }) => theme.desktop.contentWidth}) / 2);
	margin-bottom: 2rem;
	background: ${({ theme }) => theme.desktop.marqueeMessageBg};

	.marquee {
		position: relative;
		overflow: hidden;
		font-size: 1.3rem;

		.marquee-box {
			overflow: hidden;
			padding: 0 1.2rem;

			width: 120rem;
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
		height: 100%;
		color: ${({ theme }) => theme.desktop.liveChatColor};

		.icon:before {
			font-size: 2rem;
			color: ${({ theme }) => theme.desktop.liveChatColor};
		}
	}
`
