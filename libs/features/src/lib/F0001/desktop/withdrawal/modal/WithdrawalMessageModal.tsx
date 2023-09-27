import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { WithdrawalMessageData } from '@nx-next-app/service'
import { cloneDeep } from 'lodash-es'

const WithdrawalMessageModal = ({
	transId,
	withdrawalMessageDetail,
}: {
	transId: string
	withdrawalMessageDetail: WithdrawalMessageData[]
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	// 使用 sort 時應建立副本，並對副本做更動，因 sort 會修改原始資料，直接更動 api 回傳的 data 會導致報錯
	const cloneMessageDetail = cloneDeep(withdrawalMessageDetail)
	return (
		<div className='statuspop'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/noticea.png`}
				alt=''
			/>
			<div className='statustitle'>
				{transId} {t('Label_General_Message')}
			</div>
			<div className='statuscontent'>
				{cloneMessageDetail
					.sort(({ createTime: createTimeA }, { createTime: createTimeB }) => {
						if (createTimeA < createTimeB) {
							return 1
						}
						if (createTimeA > createTimeB) {
							return -1
						}
						return 0
					})
					.map(({ createTime, errorTypeName, message }) => (
						<div key={createTime}>
							<div className='subtitle'>{errorTypeName}</div>
							<div>{dayjs(createTime).format('MM/DD/YYYY hh:mm:ss A (Z)')}</div>
							<div>{message}</div>
						</div>
					))}
			</div>
			<button className='success' onClick={closeModal}>
				{t('Label_General_OK')}
			</button>
		</div>
	)
}

export default WithdrawalMessageModal
