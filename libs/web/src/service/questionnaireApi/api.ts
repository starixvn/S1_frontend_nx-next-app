import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import type { ISetQuestionnaireArgs } from './type'

export const questionnaireApiUrl = {
	setQuestionnaire: 'Questionnaire/Set',
}

export const questionnaireApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		setQuestionnaire: builder.mutation<
			IAxiosResponse<void>,
			ISetQuestionnaireArgs
		>({
			query: data => ({
				url: questionnaireApiUrl.setQuestionnaire,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['QUESTIONNAIRE_POST'],
		}),
	}),
})

export const { useSetQuestionnaireMutation } = questionnaireApi
