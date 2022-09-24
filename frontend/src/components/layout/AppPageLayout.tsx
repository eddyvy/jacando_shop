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
      <main className='appPageLayoutMain'>
        {children}
        {Array(80).fill(null).map(Cont)}
      </main>
    </div>
  )
}

const Cont = () => (
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Similique veritatis consequatur asperiores necessitatibus quos
    autem dicta iure labore, fuga pariatur iusto architecto suscipit
    aspernatur porro amet praesentium. Voluptate, repellat minima!
  </p>
)
