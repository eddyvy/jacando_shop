import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import vegIcon from '../../assets/img/vegetable.png'
import fruIcon from '../../assets/img/fruits.png'
import cheIcon from '../../assets/img/cheese.png'
import './AppSidebar.sass'

export const AppSidebar = () => {
  const categories = [
    {
      name: 'Vegetables',
      icon: vegIcon,
      link: '/vegetables',
    },
    {
      name: 'Fruits',
      icon: fruIcon,
      link: '/fruits',
    },
    {
      name: 'Cheese',
      icon: cheIcon,
      link: '/cheese',
    },
  ]
  return (
    <nav className='sidebar'>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <List sx={{ position: 'sticky', top: '8.5rem' }}>
          <ListItem key='title'>
            <ListItemText
              sx={{
                margin: '0 10px',
                cursor: 'default',
              }}
            >
              <b>Categories</b>
            </ListItemText>
          </ListItem>
          <Divider />
          {categories.map(({ name, icon }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <div className='sidebarImg'>
                  <img src={icon} alt={name} />
                </div>
                <ListItemText
                  primary={name}
                  sx={{ margin: '0 10px' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </nav>
  )
}
