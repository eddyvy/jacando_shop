import { PropsWithChildren } from 'react'
import { AppHeader } from '../header'
import { AppSidebar } from '../sidebar'
import './AppPageLayout.sass'

export const AppPageLayout = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return (
    <div className='appPageLayout'>
      <AppHeader />
      <AppSidebar />
      <main className='appPageLayoutMain'>{children}</main>
    </div>
  )
}
