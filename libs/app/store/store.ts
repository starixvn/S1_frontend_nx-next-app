import { configureStore } from '@reduxjs/toolkit'
import { rootApi } from '@nx-next-app/api'

export const store = configureStore({
	reducer: {
		[rootApi.reducerPath]: rootApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			rootApi.middleware
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
