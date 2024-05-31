/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { Link } from '../styles/StyledComponents'
import { Stack, Typography,Box } from '@mui/material'
import AvatarCard from './AvatarCard'
import { motion } from "framer-motion";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {return <Link  
  sx={{color:'#cfcfcf',padding:'0',marginTop:'1rem',marginRight:'1rem',marginLeft:'0.5rem', borderRadius:'10px',transition:'background-color 0.5s ease','&:hover': {backgroundColor: '#2e2e2e', '& svg': {color: 'white',filter: 'brightness(10%)'},}}}
  to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
    
      <motion.div 
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
      style={{
       backgroundColor:sameSender? '#404040':'unset',
        
       borderRadius:'10px',
        display:'flex',
        gap:'1rem',
        alignItems:'center',
        padding:'1rem',
        paddingLeft:'2rem',
        position:'relative'
      }}
      >
        <div style={{position:'relative',right:'1rem'}}>
        <AvatarCard  avatar={avatar} isOnline= {groupChat? false :isOnline} />

        </div>
        <Stack>
        <Typography sx={{position:'relative'}}>{name}</Typography>
        {newMessageAlert &&(
                  <Typography  style={{color:sameSender?'grey':'#04fb19',fontSize:'0.7rem'}} >{newMessageAlert.count} New Mesage</Typography>) }
        
        </Stack>
       
      </motion.div> 

  </Link>
}

export default memo(ChatItem);