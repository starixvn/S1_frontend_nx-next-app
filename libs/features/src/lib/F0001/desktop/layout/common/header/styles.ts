import styled from "styled-components";

export const HeaderTop = styled.div`
	display: flex;
	height: 7.6rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	width: ${({ theme }) => theme.desktop.contentWidth};
	margin: auto;
	background: ${({ theme }) => theme.desktop.headerBg};
	color: ${({ theme }) => theme.desktop.headerColor};
`
export const Message = styled.div`
	position: relative;
	display: none;

	&.active {
		display: block;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		border-radius: 1rem;
		background: #182043;
		height: 4rem;
		width: 4rem;
		font-size: 2.4rem;
	}

	.message-text {
		position: absolute;
		top: 0.5rem;
		right: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: red;
		width: 1rem;
		height: 1rem;
		border-radius: 5rem;
	}

	.msgPop {
		display: flex;
		position: absolute;
		top: 1px;
		left: -10px;
		transform: translateY(100%);
		background: #ff7600;
		padding: 6px 12px 6px 15px;
		display: flex;
		align-items: center;
		border-radius: 10px;
		z-index: 3;
		box-shadow: 0 0 3px #797979;
		div {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 150px;
		}
		button {
			border: 1px solid white;
			color: #fff;
			width: 18px;
			height: 18px;
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			margin: 0 0 0 10px;
			&::before {
				transform: scale(0.7);
			}
		}
		&::after {
			border-color: transparent transparent #ff7600;
			border-style: solid solid solid solid;
			border-width: 8px;
			top: 1px;
			content: '';
			height: 0;
			position: absolute;
			width: 0;
			transform: translateY(-100%);
		}
	}
`
