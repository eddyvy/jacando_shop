import { Add, AddShoppingCart, Remove } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { MouseEventHandler } from 'react'

type Props = {
  count: number
  handleAdd: MouseEventHandler<HTMLButtonElement>
  handleRemove: MouseEventHandler<HTMLButtonElement>
}

export const ProductCounter = ({
  count,
  handleAdd,
  handleRemove,
}: Props) => {
  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <AddShoppingCart color='primary' fontSize='small' />
      <IconButton onClick={handleRemove} size='small'>
        <Remove />
      </IconButton>
      <Typography>{count}</Typography>
      <IconButton onClick={handleAdd} size='small'>
        <Add />
      </IconButton>
    </Stack>
  )
}
