import Alert from "@material-ui/lab/Alert";

export const logout = () => {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userrole');
}

export const isUserLoggedIn = () => {
    return sessionStorage.getItem('authorization') !== null;
}

export const getUserRole = () => {
    return sessionStorage.getItem('userrole');
}

export const verifyUser = () => {   
    if(getUserRole() === "ROLE_ADMIN"){
        window.location.href = "/admin-panel";
    } else if(getUserRole() === "ROLE_MANAGER" || getUserRole() === "ROLE_REGISTER" || getUserRole() === "ROLE_USER"){
        window.location.href = "/resource-template";
    } else if(getUserRole() === "ROLE_GUEST"){
        window.location.href = "/welcome";
    }
}

 