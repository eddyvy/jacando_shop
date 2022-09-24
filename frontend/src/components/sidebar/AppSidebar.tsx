import { useState } from 'react'
import {
  Box,
  Collapse,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
  Home,
  Kitchen,
  Menu,
} from '@mui/icons-material'
import vegIcon from '../../assets/img/vegetable.png'
import fruIcon from '../../assets/img/fruits.png'
import cheIcon from '../../assets/img/cheese.png'
import './AppSidebar.sass'

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

export const AppSidebar = () => {
  const [openCategories, setOpenCategories] = useState<boolean>(true)
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleClickFloating = () => {
    setShowSidebar(!showSidebar)
  }

  const handleClickCategories = () => {
    setOpenCategories(!openCategories)
  }

  return (
    <nav
      className={`sidebar ${
        showSidebar ? 'sidebarShow' : 'sidebarNotShow'
      }`}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        <List sx={{ position: 'sticky', top: '8.5rem' }}>
          <ListItem key='home'>
            <ListItemButton>
              <ListItemIcon>
                <Home color='primary' fontSize='large' />
              </ListItemIcon>
              <ListItemText>
                <b>Home</b>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key='categories'>
            <ListItemButton onClick={handleClickCategories}>
              <ListItemIcon>
                <Kitchen color='primary' fontSize='large' />
              </ListItemIcon>
              <ListItemText>
                <b>Categories</b>
              </ListItemText>
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <Collapse in={openCategories} timeout='auto' unmountOnExit>
            <List component='div'>
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
          </Collapse>
        </List>
      </Box>
      <div className='floatingButton'>
        <Fab onClick={handleClickFloating} color='primary'>
          <IconButton color='inherit'>
            <Menu />
          </IconButton>
        </Fab>
      </div>
    </nav>
  )
}
