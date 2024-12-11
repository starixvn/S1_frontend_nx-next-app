import styled from 'styled-components'

export const HeaderTop = styled.div`
	display: flex;
	height: 7.6rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	width: ${({ theme }) => theme.desktop.minContentWidth};
	margin: auto;
	background: ${({ theme }) => theme.desktop.headerBg};
	color: ${({ theme }) => theme.desktop.headerColor};

	@media (min-width: 1450px) {
		width: ${({ theme }) => theme.desktop.contentWidth};
	}
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
		align-items: center;
		position: absolute;
		top: 1px;
		left: -10px;
		transform: translateY(100%);
		border-radius: 1rem;
		opacity: 0.9;
		background: #ea6118;
		box-shadow: 0 0.6rem 3rem 0 rgba(0, 0, 0, 0.5);
		padding: 0.6rem 0 0.6rem 1.2rem;
		color: #fff;
		font-size: 1.3rem;
		font-weight: 600;
		z-index: 3;

		div {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 150px;
		}

		.icon {
			background: transparent;
			&:hover {
				cursor: pointer;
			}
		}

		&::after {
			content: '';
			position: absolute;
			top: 0.1rem;
			height: 0;
			width: 0;
			transform: translateY(-100%);
			border-color: transparent transparent #ea6118;
			border-style: solid solid solid solid;
			border-width: 0.8rem;
		}
	}
`
