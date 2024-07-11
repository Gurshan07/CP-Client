import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import patrickImage from '../images/patrick_with_background.jpg';
const Home=()=> {
    return (
        
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '85vh',
            marginTop: '4vh',
        }} >
            <Typography className='unselectable'  variant='h4' textAlign={'center'}>
                Select a Friend to Chat
            </Typography>
            <img src={patrickImage} height={'20%'} />
        </Box>
        
    )
}

export default AppLayout()(Home)
