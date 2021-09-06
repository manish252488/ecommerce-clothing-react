import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import History from '../../@history';
import Auth from '../../api/auth';
import { renderIfElse } from '../../config/Utils';
import AppBaseScreen from '../common/layout/user/AppBaseScreen';
const Profile = (props) => {
    const isAuth = useSelector(({ Auth }) => Auth.isAuthenticated)
    const user = useSelector(({ Auth }) => Auth.user)
    const [userData, setUserData] = useState(null)
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
    }, [isAuth])

    const ProfileComponent = () => (
        JSON.stringify(userData)
    )
    return <AppBaseScreen>
        {renderIfElse(userData,<ProfileComponent/>, null) }
    </AppBaseScreen>
}
export default Profile;