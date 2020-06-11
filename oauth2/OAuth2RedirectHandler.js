import React, {Component} from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
import {Redirect} from 'react-router-dom'
import LocalSessionStorageService from "../../services/LocalStorageService";
import { verifyUser } from '../../service/authService';
import axios from '../../utils/axios';

const localStorageService = LocalSessionStorageService.getService();

class OAuth2RedirectHandler extends Component {

    state = {
        userrole: '',
        errorMessage: ''
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role.name)
            this.setState({ 'userrole': response.data.role.name });
            verifyUser();

        }, error => {

        })
    }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const accessToken = this.getUrlParameter(ACCESS_TOKEN);
        const refreshToken = this.getUrlParameter(REFRESH_TOKEN);
        const isNewUser = this.getUrlParameter("isNewUser");

        const error = this.getUrlParameter('error');

        if (accessToken) {
            localStorageService.setAccessToken(accessToken);
            localStorageService.setRefreshToken(refreshToken);
            if (isNewUser === 'true') {
                return <Redirect to={{
                    pathname: "/oauth2/fullRegister",
                    state: {from: this.props.location}
                }}/>;
            } else {
                this.getRole();
                verifyUser();
            }


        } else {
            return window.location.href = "/"
        }
    }
}

export default OAuth2RedirectHandler;