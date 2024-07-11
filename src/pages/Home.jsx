import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'

const Home=()=> {
    return (
        
        <Box style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '85vh',marginTop:'4vh',}}>

            <Typography className='unselectable' p={'2rem'} variant='h4' textAlign={'center'}>Select a Friend to Chat</Typography>
        </Box>
    )
}

export default AppLayout()(Home)
