/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosRequestConfig } from 'axios'
import { getDeviceType } from '../utils/client'

export interface IAxiosResponse<T> {
	data: T
	totalPages?: number
	pageNumber?: number
	rowCount?: number
	errorCode: number
	message: string
	rawErrorCode?: string
	rawMessage?: string
}

export interface IAxiosError extends globalThis.Error {
	status?: number
	statusText?: string
	errorCode?: number
	data?: any
	rawMessage?: string
}

// 這裡定義前端預給的 Header
const preHeaders = {
	'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`,
	'origin-host':
		typeof window !== 'undefined' ? window?.location?.origin : undefined,
}

// used in clientside rtk query
export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = {
			baseUrl: '',
		}
	): BaseQueryFn<
		{
			url: string
			method: AxiosRequestConfig['method']
			data?: AxiosRequestConfig['data']
			params?: AxiosRequestConfig['params']
			headers?: AxiosRequestConfig['headers']
			responseType?: AxiosRequestConfig['responseType']
		},
		unknown,
		{
			status?: number
			statusText?: string
			errorCode?: number
			message?: string
			data?: any
		}
	> =>
	async ({ url, method, data, params, headers, responseType }) => {
		try {
			const {
				data: axiosData,
				status,
				statusText,
			} = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: { ...preHeaders, ...headers, 'ai-device': getDeviceType() },
				responseType,
			})

			if (axiosData?.errorCode !== 0) {
				const error: IAxiosError = new Error()
				error.message = axiosData?.message
				error.status = status
				error.statusText = statusText
				error.errorCode = axiosData?.errorCode
				error.data = axiosData?.data
				error.rawMessage = axiosData?.rawMessage

				throw error
			}

			return { data: axiosData }
		} catch (axiosError) {
			const error = axiosError as IAxiosError

			return {
				error,
			}
		}
	}
