import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";


const AdminLogin = () => {

  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;


  return (
    <Container  component={'main'} maxWidth='xs' sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Paper  elevation={3} sx={{ color: 'white', bgcolor: '#1d1d1d', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               
        <>
  <Typography variant='h4' className='unselectable' marginBottom={'2rem'} fontWeight={'bold'} textAlign={'center'} >Admin</Typography>
  
  <form style={{  width: '100%', marginTop: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={submitHandler}>
    <TextField style={{ margin: '1rem auto' }} className='customTextField' id='customTextFieldText' required  label="Secret Key" type='password' margin='normal' variant='outlined' value={secretKey.value} onChange={secretKey.changeHandler} />
    <Button sx={{ marginTop: '1rem' }} variant='outlined' color='secondary' type='submit' >Login</Button>
  </form>
</>
                
            

        </Paper>
    </Container>
  )
}

export default AdminLogin
