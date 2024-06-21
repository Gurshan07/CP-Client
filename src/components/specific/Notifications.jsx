/* eslint-disable react/display-name */
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Button, Dialog, DialogTitle,Skeleton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications=()=> {

    const { isNotification } = useSelector((state) => state.misc);

    const dispatch = useDispatch();
  
    const { isLoading, data, error, isError } = useGetNotificationsQuery();
  
    const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
  
    const friendRequestHandler = async ({ _id, accept }) => {
      dispatch(setIsNotification(false));
      await acceptRequest("Accepting...", { requestId: _id, accept });
    };
  
    const closeHandler = () => dispatch(setIsNotification(false));
  
    useErrors([{ error, isError }]);

    return ( 
    <Dialog open={isNotification} onClose={closeHandler}>
            <Stack p={{xs:'1rem',sm:'2rem'}} maxWidth={'25rem'} className='unselectable' border={'0.1px solid grey'} borderRadius={'4px'}  bgcolor={'#1d1d1d'} color={'white'} >
                <DialogTitle fontWeight={'bold'}>
                    Friend Requests
                </DialogTitle>
                {isLoading ? (<Skeleton /> 
                ) : (
          <>
            {data?.allRequests.length > 0 ? (data?.allRequests?.map(({ sender, _id }) => (<NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id} /> ))
            ) : (
              <Typography textAlign={"center"}>0 notifications 🫠</Typography>
            )}
          </>
        )}

            </Stack>
    </Dialog>
    )
}

    const NotificationItem=memo(({sender,_id,handler})=>{

        const {name,avatar}=sender;

        return (
            
            <ListItem> 
            
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'} >
                <Avatar src={avatar} />                                                                                                                                                                                         
                <Typography varient='body1' sx={{flexGrow:1,display:'-webkit-box',WebkitLineClamp:1,WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:"ellipsis", width:'100%'}}>{name}</Typography>

                <Stack direction={{xs:'column',sm:'row'}}>
                    <Button variant='text' color='success' onClick={()=>handler({_id,accept:true})}><DoneIcon  /></Button>
                    <Button variant='text' color='error' onClick={()=>handler({_id,accept:false})}><ClearIcon  /></Button>

                </Stack>

            </Stack>

     
        </ListItem>
        )
    })

export default Notifications
