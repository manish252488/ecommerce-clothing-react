import { Button, Card, CardContent, CardHeader, CircularProgress, Container, Divider, Accordion, AccordionActions, AccordionDetails, AccordionSummary, Grid, IconButton, TextField, Typography, useMediaQuery, useTheme, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { Create, ExpandMore, NaturePeopleOutlined, PlusOne, Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import History from '../../@history';
import Auth from '../../api/auth';
import { renderIfElse } from '../../config/Utils';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import ImageUpload from 'image-upload-react'
import './index.less'
import DatePicker from 'react-datepicker';
import AddressCard from '../common/AddressCard';
import { checkJWT, showMessageBar } from '../../store/actions';
import CountrySelect from '../common/CountrySelectField';
import moment from 'moment'
import DetailView from './components/DetailView';
import AddressUpdate from './components/AddressUpdate';
import DetailUpdate from './components/DetailUpdate';
import ResponsiveDialogs from '../common/ResponsiveDialogs';

const Profile = (props) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
    const user = useSelector(({ Auth }) => Auth.user)
    const [userData, setUserData] = useState(null)
    const [imageSrc, setImageSrc] = useState()
    const [addressEditor,openAddressEditor] = useState(false)
    const [selectedAddress,setSelectedAddress] = useState(null)
    // container states
    const [profileEditor, openProfileEditor] = useState(false)
    const fetchUserDetails = () => {
        Auth.getUserDetail().then(res => setUserData(res.data))
            .catch(err => console.log(err.message))
    }
    useEffect(() => {
        if (isAuth) {
            History.replace("/profile/" + user.id)
            fetchUserDetails()
        } else {
            History.push('/login')
        }
        //eslint-disable-next-line
    }, [isAuth, user])
    const handleImageSelect = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }
    const setdefaultAdd = (id) => {
        Auth.setDefaultAddress(id).then(res => {
            dispatch(checkJWT())
            dispatch(showMessageBar('success', res.message))

        }).catch(err => {
            dispatch(showMessageBar('error', err.message))
        })
    }


    const ProfileComponent = () => (
            <Card variant="outlined" className="container">
                <CardContent>
                    <Grid container>
                        <Grid item xs={matches ? 12 : 8} >
                            <div className="image-handler">
                            <ImageUpload
                                handleImageSelect={handleImageSelect}
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                                style={{
                                    width: 700,
                                    height: 500,
                                    background: 'gold'
                                }}
                            />
                            </div>

                            <Container maxWidth="lg" className="profileForm">
                                <DetailView user={userData} editOnClick={() => openProfileEditor(true)}/>
                                <Divider />
                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography style={{fontWeight: 'bold'}}>Saved Address</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            userData?.savedAddress?.map((val, index) => <AddressCard key={index} data={val} setDefaultAdd={setdefaultAdd} width={300} selectEditAddress={setSelectedAddress} />)
                                        }
                                    </AccordionDetails>
                                    <AccordionActions>
                                        <Button variant="contained" color="primary" size="small" onClick={() => openAddressEditor(true)}>Add Address</Button>
                                    </AccordionActions>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                       <Typography style={{fontWeight: 'bold'}}>Login Activities</Typography> 
                                    </AccordionSummary>
                                    {console.log(userData)}
                                    <AccordionDetails >
                                        <List>
                                        {
                                            userData.deviceData.map(val => (
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>{val.os.slice(0,1)}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${val?.os} ${val?.vendor} - ${val?.model}`} 
                                                    secondary={moment(val.date).fromNow()} />
                                                </ListItem>
                                            ))
                                        }
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Container>
                        </Grid>
                    </Grid>
                    <ResponsiveDialogs openState={profileEditor} handleCloseBar={openProfileEditor} title="Edit Profile">
                        <DetailUpdate userData={userData} success={openProfileEditor}/>
                    </ResponsiveDialogs>
                    <ResponsiveDialogs openState={addressEditor} handleCloseBar={openAddressEditor} title="Edit Profile">
                        <AddressUpdate success={openAddressEditor}/>
                    </ResponsiveDialogs>
                    <ResponsiveDialogs openState={selectedAddress} handleCloseBar={setSelectedAddress} title="Edit Profile">
                        <AddressUpdate data={selectedAddress} success={setSelectedAddress}/>
                    </ResponsiveDialogs>
                </CardContent>
            </Card>
    )
    return <AppBaseScreen>
        {renderIfElse(userData, <ProfileComponent />, null)}
    </AppBaseScreen>
}
export default Profile;