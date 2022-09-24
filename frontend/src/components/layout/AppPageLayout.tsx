import { PropsWithChildren } from 'react'
import { AppHeader } from '../header'

export const AppPageLayout = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return (
    <>
      <AppHeader />
      <nav>
        <p>Sidebar</p>
      </nav>
      <main>{children}</main>
    </>
  )
}
