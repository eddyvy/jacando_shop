import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Page.sass'

export const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const handleClick = () => {
    setLoading(true)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset data',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              axios
                .get('http://localhost:4000/fixtures')
                .then(() => {
                  Swal.fire({
                    title: 'Done!',
                    text: 'Data succesfully reset',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    navigate(0)
                  })
                })
                .catch(() => {
                  Swal.fire({
                    title: 'Erro has occurred!',
                    text: 'Data could not be reset',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    navigate(0)
                  })
                })
            },
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div id='homePage' className='page'>
      <h1 className='pageTitle'>Welcome to Jacando Shop!</h1>
      <h3 className='pageSubtitle'>Buy the best food you can eat</h3>
      <section className='homeSection'>
        <p>First time you visit the web?</p>
        <p>Do you want to reset the database?</p>
        <p>👇 Just click here! 👇</p>
        <Button
          onClick={handleClick}
          variant='contained'
          disabled={loading}
          sx={{ marginTop: '10px' }}
        >
          Reset Data
        </Button>
      </section>
    </div>
  )
}
