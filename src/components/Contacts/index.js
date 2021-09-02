import { Button } from '@material-ui/core';
import React from 'react';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
export default function Contacts(props) {
    return (<AppBaseScreen>
        <div className="page-heading contact-heading header-text">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-content">
                            <h4>contact us</h4>
                            <h2>let’s get in touch</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="find-us">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Our Location on Maps</h2>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div id="map">
                            <iframe title="goolemap" src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="330px" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="left-content">
                            <h4>About our office</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.<br /><br />Lorem ipsum dolor sit amet, consectetur adipisic elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti.</p>
                            <ul className="social-icons">
                                <li><a href="/facebook"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="/twitter"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="/insta"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="send-message">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Send us a Message</h2>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="contact-form">
                            <form id="contact" action="" method="post">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required="" />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="email" type="text" className="form-control" id="email" placeholder="E-Mail Address" required="" />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" required="" />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea name="message" rows="6" className="form-control" id="message" placeholder="Your Message" required=""></textarea>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <Button variant="contained" color="primary">Send Message</Button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AppBaseScreen>)
}