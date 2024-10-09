import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGlobalData } from '@nx-next-app/data-access'
import dayjs from 'dayjs'
import { cloneDeep, uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'

export interface IHistoryMsgModalProps {
	transId: string
	messageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

const HistoryMsgModal = ({ transId, messageDetail }: IHistoryMsgModalProps) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	// 使用 sort 時應建立副本，並對副本做更動，因 sort 會修改原始資料，直接更動 api 回傳的 data 會導致報錯
	const cloneMessageDetail = cloneDeep(messageDetail)
	return (
		<div className='statuspop'>
			<img src={getBannerUrl('/desktop/img/noticea.png')} alt='' />
			<div className='statustitle'>
				{transId} {t('Label_General_Message')}
			</div>
			<div className='statuscontent'>
				{cloneMessageDetail
					?.slice()
					.sort(
						({ createTime: createTimeA }, { createTime: createTimeB }) =>
							new Date(createTimeB).getTime() - new Date(createTimeA).getTime()
					)
					.map(({ createTime, errorTypeName, message }) => (
						<div key={uniqueId(createTime)}>
							<div className='subtitle'>{errorTypeName}</div>
							<div>{dayjs(createTime).format('MM/DD/YYYY hh:mm:ss A (Z)')}</div>
							<div>{message}</div>
						</div>
					))}
			</div>
			<button className='success' onClick={() => closeModal()}>
				{t('Label_General_OK')}
			</button>
		</div>
	)
}

export default HistoryMsgModal
