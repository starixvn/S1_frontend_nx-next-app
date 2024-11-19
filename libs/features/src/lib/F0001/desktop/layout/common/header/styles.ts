import styled from 'styled-components'

export const HeaderTop = styled.div`
	display: flex;
	height: 7.6rem;
	padding: 1.4rem 0;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: ${({ theme }) => theme.desktop.headerBg};
	color: ${({ theme }) => theme.desktop.headerColor};
`
