import React from "react";

const LocalSessionStorageService = (function () {
    let _service;

    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setAccessToken(accessToken) {
        sessionStorage.setItem('authorization', accessToken);
    }

    function _setRefreshToken(refreshToken) {
        sessionStorage.setItem('refreshToken', refreshToken);
    }

    function _getAccessToken() {
        return sessionStorage.getItem('authorization');
    }

    function _getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }

    function _clearToken() {
        sessionStorage.removeItem('authorization');
        sessionStorage.removeItem('refreshToken');
    }

    return {
        getService: _getService,
        setAccessToken: _setAccessToken,
        setRefreshToken: _setRefreshToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken
    }
})();


export default LocalSessionStorageService;