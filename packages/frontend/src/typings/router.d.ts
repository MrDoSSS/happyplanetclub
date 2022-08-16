import { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/store/auth'

export enum guards {
  Admin = 'admin',
}

export interface NextParams {
  stopPipeline?: boolean
  name?: string
  query?: {
    [key: string]: any
  }
}

export type Next = (to?: NextParams) => void

export type Context = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: Next
  store: ReturnType<typeof useAuthStore>
}

export type Guard = (context: Context) => void

export interface GuardPipeline {
  (context: Context, middleware?: guards[], index?: number): (
    params?: NextParams
  ) => void
}
