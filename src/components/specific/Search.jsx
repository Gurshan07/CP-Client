import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import { Box, Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search=()=> {

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 700);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

    return (
    <Dialog PaperProps={{ sx: { bgcolor: '#0f121a', border :'solid 0.5px rgb(138, 145, 165,0.25)', borderRadius:'15px' } }} open={isSearch} onClose={searchCloseHandler} sx={{ opacity:'0.97', bgcolor:'#0f121a', '& .MuiDialog-paperScrollPaper': {
      scrollbarGutter: 'stable',
      '&::-webkit-scrollbar': {
        width: '0px',
        height: '0px',        
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#0f121a',
        
      },}
   } }>

        <Box >

            <Stack  className='unselectable'  p={'2rem'} direction={'column'} maxWidth={'25rem'} maxHeight={'25rem'} bgcolor={'#0f121a'} color={'white'}  >

                <DialogTitle   textAlign={'center'}>Find People</DialogTitle>

                <TextField className='customTextField' id='customTextFieldText' value={search.value} onChange={search.changeHandler} variant='outlined' size='small' autoComplete='off' InputProps={{startAdornment:(<InputAdornment position='start' > <SearchIcon sx={{color:'white'}}/> </InputAdornment>),}} />

            <List >
            {users.map((i)=>(
               <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))}
            </List>

            </Stack>
        </Box>

    </Dialog>
    )
}

export default Search
