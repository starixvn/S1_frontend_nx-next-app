import styled from 'styled-components'

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 76px;
	padding: 14px 260px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.headerBg};
`

export const LogoContainer = styled.div`
	width: 110px;
	height: 46px;
`
export const FunctionContainer = styled.div`
	display: flex;
`
