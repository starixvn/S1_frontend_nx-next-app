import styled from 'styled-components'

export const HeaderContainer = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	width: ${({ theme }) => theme.desktop.minContentWidth};
	height: 12.4rem;
	margin: auto;
	background: ${({ theme }) => theme.desktop.headerBg};
	z-index: 9;

	@media (min-width: 1200px) {
		width: 100%;
	}
`

export const LogoContainer = styled.div`
	width: 110px;
	height: 46px;
`
export const FunctionContainer = styled.div`
	display: flex;
`
