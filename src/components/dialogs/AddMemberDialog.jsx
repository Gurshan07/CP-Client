import {
    Button,
    Dialog,
    Skeleton,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import UserItem from "../shared/UserItem";
  import {
    useAddGroupMembersMutation,
    useAvailableFriendsQuery,
  } from "../../redux/api/api";
  import { useAsyncMutation, useErrors } from "../../hooks/hook";
  import { useDispatch, useSelector } from "react-redux";
  import { setIsAddMember } from "../../redux/reducers/misc";
  const AddMemberDialog = ({ chatId }) => {
    const dispatch = useDispatch();
  
    const { isAddMember } = useSelector((state) => state.misc);
  
    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  
    const [addMembers, isLoadingAddMembers] = useAsyncMutation(
      useAddGroupMembersMutation
    );
  
    const [selectedMembers, setSelectedMembers] = useState([]);
  
    const selectMemberHandler = (id) => {
      setSelectedMembers((prev) =>
        prev.includes(id)
          ? prev.filter((currElement) => currElement !== id)
          : [...prev, id]
      );
    };
  
    const closeHandler = () => {
      dispatch(setIsAddMember(false));
    };
    const addMemberSubmitHandler = () => {
      addMembers("Adding Members...", { members: selectedMembers, chatId });
      closeHandler();
    };
  
    useErrors([{ isError, error }]);

    // const btn = (
    //                 <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} >
    //                    <Button color='inherit' onClick={closeHandler}>Cancel</Button>
    //                        <Button color='info' variant='outlined' onClick={addMemberSumbitHandler} disabled={isLoadingAddMember} >Confirm</Button>
    //                 </Stack>
    //                 )
    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={'2rem'} width={'20rem'} spacing={'2rem'} className='unselectable' sx={{ border: '0.1px solid grey', borderRadius: '4px', backgroundColor: '#1d1d1d', color: 'grey' }} >
                

                {/* <Stack spacing={'1rem'}>
                    
                    {members.length > 0 ? ( <>
                        <DialogTitle textAlign={'center'} color={'white'} fontWeight={'bold'}>Add Member</DialogTitle>
                     {sampleUsers.map(i => (<UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} /> ))} {btn}</>)
                        : <Typography textAlign={'center'}>No Friends </Typography>
                    }
                </Stack> */}

<Stack spacing={"1rem"}>
          {isLoading ? (<Skeleton />) : data?.friends?.length > 0 ? (data?.friends?.map((i) => (
              <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} /> ))
          ) : (
            <Typography textAlign={"center"}>No Friends Available</Typography>
          )}
        </Stack>

        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"} >
          <Button color="error" onClick={closeHandler}>Cancel </Button>
          <Button onClick={addMemberSubmitHandler} variant="contained" disabled={isLoadingAddMembers} >
            Submit Changes
          </Button>
        </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog
