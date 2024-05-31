import { Avatar,  Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon,AlternateEmail as UsernameIcon,CalendarMonth as CalendarIcon } from '@mui/icons-material'
import moment from 'moment'
import { transformImage } from "../../lib/features";

const Profile =({ user })=> {
  return (
    <Stack className='unselectable' spacing={'2rem'} direction={'column'} alignItems={'center'} >
      <Avatar  src={transformImage(user?.avatar?.url)}  sx={{width:100,height:100,objectFit:'contain',marginBottom:'1rem',border:'2px solid grey'}} />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} Icon={<UsernameIcon />} />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />}/>
    </Stack>
  )
}

const ProfileCard =({text,Icon,heading})=> (

<Stack direction={'row'} alignItems={'center'} spacing={'1rem'} color={'white'} textAlign={'center'}  >
{Icon && Icon}


<Stack>

<Typography variant='body1'>{text}</Typography>
<Typography color={'grey'} variant='caption'>{heading}</Typography>

</Stack>

</Stack>
);

export default Profile 
