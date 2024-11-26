import styled from 'styled-components'

export const HeaderContainer = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	width: 100%;
	height: 12.4rem;
	background: ${({ theme }) => theme.desktop.headerBg};
	z-index: 10;
`

export const LogoContainer = styled.div`
	width: 110px;
	height: 46px;
`
export const FunctionContainer = styled.div`
	display: flex;
`
