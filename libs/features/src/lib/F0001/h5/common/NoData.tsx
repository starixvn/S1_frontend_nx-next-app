import { useTranslation } from "next-i18next";

export const NoData = ({ customClass }: { customClass?: string }) => {
	const { t } = useTranslation()

	return (
		<div className={`custom-nodata ${customClass}`}>
			<i className='icon icon-file-damage-fill' />
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}
