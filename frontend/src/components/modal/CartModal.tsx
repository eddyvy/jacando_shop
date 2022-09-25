import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CallMade, CreditCard } from '@mui/icons-material'
import { Box, Button, Modal, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import { useAppSelector } from '../../app'
import { CREATE_ORDER, Order } from '../../features/cart'
import { getUniqueProducts } from '../../features/product'
import { CartCard } from '../card'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: '80vh',
  maxWidth: '85vw',
  p: 4,
  overflowY: 'auto',
}

type Props = {
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
}

export const CartModal = ({ open, setOpen }: Props) => {
  const { products, price } = useAppSelector((st) => st.cart)
  const navigate = useNavigate()
  const [createOrder, { loading, error }] = useMutation<
    Order,
    { products: number[] }
  >(CREATE_ORDER)

  const handleClose = () => setOpen(false)

  const handleBuy = () => {
    setOpen(false)
    Swal.fire({
      title: 'Are you sure?',
      text: 'Articles will be ordered',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const prodIds = products.map((p) => p.id)
            createOrder({ variables: { products: prodIds } })
              .then(() => {
                Swal.fire({
                  title: 'Done!',
                  text: 'Order correctly done!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                }).then(() => {
                  navigate(0)
                })
              })
              .catch(() => {
                Swal.fire({
                  title: 'Erro has occurred!',
                  text: 'Could not make the order correctly',
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                }).then(() => {
                  navigate(0)
                })
              })
          },
        })
      } else {
        setOpen(true)
      }
    })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h6'
            component='h2'
            sx={{ marginBottom: '30px' }}
          >
            🛒 Your Shopping Cart
          </Typography>
          {products.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: '1fr',
                maxWidth: '50rem',
                width: '100%',
              }}
            >
              {getUniqueProducts(products).map((p) => (
                <CartCard key={p.id} product={p} />
              ))}
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {products.length > 0 ? (
              <Typography sx={{ margin: '20px' }}>
                Total Price: <b>{price.toFixed(2)} CHF</b>
              </Typography>
            ) : (
              <Typography sx={{ margin: '20px' }}>
                Your shopping cart is currently empty 😕
              </Typography>
            )}
            {error && (
              <Typography sx={{ margin: '20px' }} color='error'>
                It has been an error creating your order
              </Typography>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px',
              }}
            >
              <Button
                variant='contained'
                color='info'
                endIcon={<CallMade />}
                onClick={handleClose}
                sx={{ margin: 1 }}
              >
                Continue shopping
              </Button>
              <Button
                variant='contained'
                color={error ? 'error' : 'success'}
                disabled={products.length === 0 || loading}
                endIcon={<CreditCard />}
                sx={{ margin: 1 }}
                onClick={handleBuy}
              >
                Buy
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
