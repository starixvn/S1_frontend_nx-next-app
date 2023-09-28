import { configureStore } from '@reduxjs/toolkit'
import { cashierApi, rootApi } from '../../service'

export const store = configureStore({
	reducer: {
		[rootApi.reducerPath]: rootApi.reducer,
		[cashierApi.reducerPath]: cashierApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat([
			rootApi.middleware,
			cashierApi.middleware,
		]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
