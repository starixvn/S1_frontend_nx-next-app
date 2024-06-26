import { useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { Header, Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSetQuestionnaireMutation } from '@nx-next-app/service'
import { EMAIL_OR_PHONE_REGEX } from '@nx-next-app/constants'

type TSurveyForm = {
	content: string
	contactInfo: string
}

const Survey = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const router = useRouter()
	const [isSubmitted, setIsSubmit] = useState<boolean>(false)
	const { register, handleSubmit, reset, formState } = useForm<TSurveyForm>({
		mode: 'onBlur',
	})
	const { errors, isSubmitting, isDirty, isValid } = formState

	const [setQuestionnaire] = useSetQuestionnaireMutation()

	const onSubmit: SubmitHandler<TSurveyForm> = async data => {
		try {
			await setQuestionnaire({
				...data,
			}).unwrap()
			reset()
			setIsSubmit(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onCancel = () => {
		reset()
		router.back()
	}

	const renderInfoMessage = (errMsg: string) => {
		if (errMsg) {
			return <div className={classNames('tip', 'active')}>{errMsg}</div>
		}
		return null
	}

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_Survey')}</div>
			</Header>
			<main className='main survey'>
				<div
					className={classNames('survey-before', {
						close: isSubmitted,
					})}
				>
					<div>{t('Label_Survey_Title')}</div>
					<div>{t('Label_Survey_Hint1')}</div>
					<Form className='survey-input' onSubmit={handleSubmit(onSubmit)}>
						<fieldset className={classNames({ error: !!errors['content'] })}>
							<textarea
								{...register('content', {
									required: {
										value: true,
										message: t('Label_Survey_Req_Content'),
									},
									maxLength: 2000,
								})}
								placeholder={t('Label_Survey_Phd_Content') ?? ''}
								maxLength={2000}
							/>
							{renderInfoMessage(errors['content']?.message as string)}
						</fieldset>
						<fieldset
							className={classNames({ error: !!errors['contactInfo'] })}
						>
							<input
								{...register('contactInfo', {
									required: {
										value: false,
										message: '',
									},
									pattern: {
										value: EMAIL_OR_PHONE_REGEX,
										message: t('Label_Survey_Vld_Contact'),
									},
								})}
								type='text'
								placeholder={t('Label_Survey_Phd_Contact') ?? ''}
							/>
							{renderInfoMessage(errors['contactInfo']?.message as string)}
						</fieldset>
						<fieldset className='survey-btn'>
							<button
								type='submit'
								disabled={!isDirty || !isValid || isSubmitting}
							>
								{t('Label_General_Submit')}
							</button>
							<button type='button' onClick={onCancel}>
								{t('Label_General_Cancel')}
							</button>
						</fieldset>
					</Form>
				</div>
				<div
					className={classNames('survey-after', {
						close: !isSubmitted,
					})}
				>
					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/thankyou.png`}
							alt='thankyou'
						/>
						<div>{t('Label_General_Thankyou')}</div>
					</div>
					<div>{t('Label_Survey_Hint2')}</div>
				</div>
			</main>
		</>
	)
}

export default Survey
