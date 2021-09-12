import {  Container, Divider, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
import './index.less';
import { Email, Facebook, Instagram, Phone, Twitter } from '@material-ui/icons';
import { SocialLinks } from '../../config/constants/constants';
export default function Contacts(props) {
    return (<AppBaseScreen>
        <div className="container">
            <div className="contact-heading" style={{ background: "url('assets/images/contact-heading.jpg')" }}>
                <Typography variant="h4">CONTACT US</Typography>
                <Typography variant="h2">LET’S GET IN TOUCH</Typography>
            </div>
            <Container maxWidth="md">
                <Grid container wrap={"wrap"}>
                    <Grid item md={12}>
                        <Typography variant="h4">Our Location on Maps</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <div className="map">
                            <iframe title="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29428.62096819578!2d86.13331085060214!3d22.781051162839606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4bc5e8ba913%3A0xc6059e37d017d3d5!2sAdityapur%2C%20Jamshedpur%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1630980613940!5m2!1sen!2sin" width="100%" height="330px" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        <div className="left-content">
                            <h4>Follow us on:</h4>
                            <p></p>
                            <div className="nav-bar">
                                <Link size="small" fullWidth variant="contained" target="_blank" href={SocialLinks.Facebook}><Facebook />@dapperfolks</Link>
                                <Link size="small" fullWidth variant="contained" target="_blank" href={SocialLinks.Instagram}><Instagram />@dapper.folks</Link>
                                <Link size="small" fullWidth variant="contained" target="_blank" href={SocialLinks.twitter}><Twitter />@DapperFolks</Link>
                            </div>
                            <Divider />
                            <h4>Customer Support</h4>
                            <Link style={{ display: 'flex' }}><Phone />&nbsp;{SocialLinks.mobileNumber}</Link>
                            <Link style={{ display: 'flex' }}><Email />&nbsp;admin@dapperfolk.in</Link>

                           

                        </div>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: 80,marginBottom: 80}}/>
            </Container>

            <div id="fb-root"></div>
            <div id="fb-customer-chat" class="fb-customerchat">

            </div>
        </div>
        
    </AppBaseScreen>)
}