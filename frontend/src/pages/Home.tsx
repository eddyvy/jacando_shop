import { Button } from '@mui/material'
import './Page.sass'

export const Home = () => {
  return (
    <div id='homePage' className='page'>
      <h1 className='pageTitle'>Welcome to Jacando Shop!</h1>
      <h3 className='pageSubtitle'>Buy the best food you can eat</h3>
      <section className='homeSection'>
        <p>First time you visit the web?</p>
        <p>Do you want to reset the database?</p>
        <p>👇 Just click here! 👇</p>
        <Button variant='contained' sx={{ marginTop: '10px' }}>
          Reset Data
        </Button>
      </section>
    </div>
  )
}
