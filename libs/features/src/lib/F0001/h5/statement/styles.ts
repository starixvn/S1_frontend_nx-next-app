import { WrapperInfoList } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import styled from 'styled-components'

export const StatementContainer = styled.div`
	padding-bottom: 22.33vw;

	.header {
		position: sticky;
		top: 0;
		background: #0f1428;
		z-index: 2;
	}
`
export const StatementWrapperInfoList = styled(WrapperInfoList)`
	padding: 0 3.88vw;

	.full-width {
		width: 100% !important;
	}

	.btn-detail {
		width: 100%;
		gap: 0.97vw;
		font-size: 3.39vw;
		font-weight: 600;
	}
`
