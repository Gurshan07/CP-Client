import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Suspense, lazy,  } from "react";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationDialog = lazy(() => import('../specific/Notifications'))
const NewGroupDialog = lazy(() => import('../specific/NewGroup'))


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  return <>

    <Box sx={{ flexGrow: 1 }} height={'4rem'}>

      <AppBar position='static' sx={{ bgcolor: '#0f121a' ,boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.9)',}}>

        <Toolbar>
        <Link href="/" underline="none" color={'gray'} >
  <Typography className='unselectable' variant='h5' sx={{ display: { xs: 'none', sm: 'block', },color:'white' }}>
    ChatPulse
  </Typography>
</Link>

          <Box sx={{ display: { xs: 'block', sm: 'none' }, }}>
            <IconButton color='white' onClick={handleMobile}>
              <MenuIcon sx={{color:'white'}} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>

            <IconBtn title={'Search users'} icon={<SearchIcon />} onClick={openSearch} />
            <IconBtn title={'New Group'} icon={<AddIcon />} onClick={openNewGroup} />
            <IconBtn title={'Manage Groups'} icon={<GroupIcon />} onClick={navigateToGroup} />
            <IconBtn title={"Notifications"} icon={<NotificationsIcon />} onClick={openNotification} value={notificationCount} />

            <Tooltip title={'Logout'}>

              <IconButton color='inherit' size='large' onClick={logoutHandler} sx={{ color: 'grey', '&:hover': { backgroundColor: '#2e2e2e', '& svg': { color: 'red', filter: 'brightness(100%)' }, } }} >
                <LogoutIcon />
              </IconButton>

            </Tooltip>
          </Box>

        </Toolbar>

      </AppBar>


    </Box>


    {isSearch && <Suspense fallback={<Backdrop open />}><SearchDialog  /></Suspense>}

    {isNotification && <Suspense fallback={<Backdrop open />}><NotificationDialog /></Suspense>}

    {isNewGroup && <Suspense fallback={<Backdrop open />}><NewGroupDialog /></Suspense>}



  </>
}
const IconBtn = ({ title, icon, onClick,value  }) => {

  return (
    <Tooltip title={title}>

      <IconButton color='default' size='large' onClick={(event) => onClick(event)} sx={{
        color: 'grey', '&:hover': { backgroundColor: '#2e2e2e', '& svg': { color: 'white', filter: 'brightness(100%)', }, },
      }}>
         {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}

      </IconButton>

    </Tooltip>
  )
}

export default Header
