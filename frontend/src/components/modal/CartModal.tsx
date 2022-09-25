import { CallMade, CreditCard } from '@mui/icons-material'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useAppSelector } from '../../app'
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

  const handleClose = () => setOpen(false)

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
                color='success'
                disabled={products.length === 0}
                endIcon={<CreditCard />}
                sx={{ margin: 1 }}
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
