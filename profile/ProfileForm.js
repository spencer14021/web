import React, {Component} from "react";
import axios from "../../utils/axios";
import {CssBaseline, FormControl, FormHelperText, Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import MyDialog from "../resourceTemplate/popUp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Alert} from "@material-ui/lab";
import {logout} from '../../service/authService';


const textFieldStyles = {
    width: 300,
    minWidth: 100,
    maxWidth: 300
};
const style = {
    marginTop: 50,
    height: 700,
    wight: 500
};

const photoLarge = {
    width: 400,
    height: 350,
    // align: "center"
    margin: "0 auto"
};

class ProfileForm extends Component {
    state = {
        photo: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        oldName: "",
        oldLastName: "",
        oldPhone: "",
        password: undefined,
        selectedFile: undefined,
        oldPassword: undefined,
        newPassword: undefined,
        confirmationPassword: undefined,
        showOldPassword: false,
        showPassword: false,
        showConfPassword: false,
        openDialogChangePassword: false,
        openDialogChangeEmail: false,
        openDialogChangeData: false,
        openDialogDelete: false,
        openDialogDeletePicture: false,
        errorMessage: '',
        errorMessages: {},
        err: undefined,
        reLogin: ''
    }
    validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(_)/><?"|+=:]{8,}$/;
        return re.test(password);
    }
    validateEmail = (email) => {
        let re = /^\s*[a-zA-Z0-9]+(([._-])?[a-zA-Z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}\s*$/;
        return re.test((email).toLowerCase());
    };
    validatePhone = (phone) => {
        let re = /^\s*\+[0-9]{12}\s*$/;
        return re.test(phone);
    };
    validateFirstName = (firstName) => {
        let re = /^\s*(([A-Za-z]){2,})+(((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(firstName);
    };

    validateLastName = (lastName) => {
        let re = /^\s*([A-Za-z]+((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(lastName);
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };
    handleClickShowConfPassword = () => {
        this.setState({showConfPassword: !this.state.showConfPassword});
    };
    handleClickShowOldPassword = () => {
        this.setState({showOldPassword: !this.state.showOldPassword});
    };
    onChangePassword = (event) => {
        let newPassword = event.target.value;
        this.setState({newPassword});
        if (!this.validatePassword(newPassword)) {
            let errors = {
                ...this.state.errorMessages,
                ["newPassword"]: "Password must contain at least eight characters and at least one character of "
                + " uppercase letter, lowercase letter, digit, special character"
            };
            this.setState({errorMessages: errors});
        } else {
            let errors = {...this.state.errorMessages, ["newPassword"]: undefined};
            this.setState({errorMessages: errors});
        }
    };
    onChangeOldPassword = (event) => {
        let oldPassword = event.target.value;
        this.setState({oldPassword});
    }
    onChangeConfirmationPassword = (event) => {
        let confirmationPassword = event.target.value;
        this.setState({confirmationPassword});
        if (confirmationPassword !== this.state.newPassword) {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: "Passwords do not match"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangePhone = (event) => {
        let phone = event.target.value;
        this.setState({phone});
        if (!this.validatePhone(phone)) {
            let errors = {...this.state.errorMessages, ["phone"]: "Phone number is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["phone"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangeFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({firstName});
        if (!this.validateFirstName(firstName)) {
            let errors = {...this.state.errorMessages, ["firstName"]: "First name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["firstName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    };
    onChangeLastName = (event) => {
        let lastName = event.target.value;
        this.setState({lastName});
        if (!this.validateLastName(lastName)) {
            let errors = {...this.state.errorMessages, ["lastName"]: "Last name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["lastName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangeEmail = (event) => {
        let email = event.target.value;
        this.setState({email});

        if (!this.validateEmail(email)) {
            let errors = {...this.state.errorMessages, ["email"]: "Email is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["email"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };


    getData = () => {
        axios.get(`/profile`).then(
            response => {
                console.log(response.data);
                let data = response.data;
                this.setState({
                    id: data.id,
                    photo: data.imageUrl,
                    firstName: data.firstName,
                    oldName: data.firstName,
                    oldLastName: data.lastName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    oldPhone: data.phone,
                    enabled: data.enabled
                })
            }).catch(error => {
            console.dir(error.response.data);

        })
    };

    handleClickAddPhoto = (event) => {
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            this.setState({
                selectedFile: event.target.files[0]
            }, () => this.UpdatePhoto());
        }
    };

    UpdatePhoto = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.put("/profile/updatePhoto", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            this.getData();
        });
    };

    handleClickDeletePhoto = () => {
        axios.delete("/profile/deletePhoto").then(r => {
                this.getData();
            },
            error => {
                this.setState({
                    errorMessage: error.response.data.message,
                });
            });
        this.setState({openDialogDeletePicture: false})
    };

    handleOpenDialogChangePassword = () => {
        this.setState({openDialogChangePassword: true});
    };
    handleCloseDialogChangePassword = () => {
        this.setState({openDialogChangePassword: false});
    };

    handleOpenDialogChangeEmail = () => {
        this.setState({openDialogChangeEmail: true});
    };
    handleCloseDialogChangeEmail = () => {
        this.setState({openDialogChangeEmail: false});
        this.getData()
    };

    handleOpenDialogChangeData = () => {
        this.setState({openDialogChangeData: true});
    };
    handleCloseDialogChangeData = () => {
        this.setState({openDialogChangeData: false});
        this.getData()
    };

    handleOpenDialogDeletePicture = () => {
        this.setState({openDialogDeletePicture: true});
    };
    handleCloseDialogDeletePicture = () => {
        this.setState({openDialogDeletePicture: false});
    };
    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };
    delete = () => {
        axios.delete(`/delete`).then(
            response => {
                this.reLogin();
                window.location.href = "/";
            }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message,
                openDialogDelete: false
            });
        })
        this.setState({
            openDialogDelete: false
        });

    }

    componentDidMount() {
        this.getData();
        // this.handleClickAddPhoto();
    }

    editPassword = () => {
        axios.patch(`/profile/update/password`, {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }
        ).then(
            response => {
                this.setState({openDialogChangePassword: false})
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
        });
    };

    editData = () => {
        let data = {};
        data.firstName = null;
        data.lastName = null;
        data.phone = null;
        if (this.state.firstName !== this.state.oldName) {
            data.firstName = this.state.firstName;
        }
        if (this.state.lastName !== this.state.oldLastName) {
            data.lastName = this.state.lastName
        }
        if (this.state.phone !== this.state.oldPhone) {
            data.phone = this.state.phone
        }
        axios.put(`/profile/update`, data
        ).then(
            response => {
                this.setState({openDialogChangeData: false})
            }).catch(error => {
            let errors = {};
            // error.response.data.forEach(err => {
            errors["phone"] = error.response.data.message;
            // });
            this.setState({errorMessages: errors}
            );
        });
    };
    checkMimeType = (event) => {
        let files = event.target.files[0];
        if ((files.type !== 'image/png') && (files.type !== 'image/jpeg') && (files.type !== 'image/gif')) {
            this.setState({err: files.type+' is not a supported format'});
        } else {
            this.setState({err: ('')});
            return true;
        }
    }


    checkFileSize = (event) => {
        let files = event.target.files[0];
        let size = 4000000;
        if (files.size > size) {
            this.setState({err: 'image is too large, please pick a smaller file'});
            return false
        } else {
            this.setState({err: ('')});
            return true;
        }
    }


    reLogin = () => {
        setTimeout(() => {
            logout();
        }, 10000);
    };
    editEmail = () => {
        axios.patch(`/profile/update/email`, {
                password: this.state.oldPassword,
                email: this.state.email
            }
        ).then(
            response => {
                this.setState({
                    reLogin: "You have successfully changed you email. Now you will be redirected to login page for login with new email address "
                });
                this.reLogin();
                window.location.href = "/";
            }, errors => {
                if (errors.response.data.message) {
                    this.setState({errorMessage: errors.response.data.message}, () => console.log(this.state));
                } else {
                    let error = {};
                    errors.response.data.forEach(err => {
                        error[[err.name]] = err.message;

                        this.setState({errorMessages: error}, () => console.log(this.state));
                    })
                }
            });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid xs={12} sm={10}>
                    <Card style={style}
                    >
                        <CardContent>
                            <CssBaseline/>
                            {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                            <Grid container={"true"} justify={"space-evenly"}>
                                <Grid item xs={12} sm={8} style={{position: "relative"}}>
                                    <Avatar src={this.state.photo}
                                            style={photoLarge}
                                    />
                                    {/*<Grid*/}
                                    {/*    item xs={12} sm={12}*/}
                                    {/*    style={{*/}
                                    {/*        position: "absolute",*/}
                                    {/*        top: 0,*/}
                                    {/*        right: 0*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0
                                    }}>
                                        <IconButton
                                            // color="primary"
                                            component="label"
                                        >
                                            <AddAPhotoIcon/>
                                            <Input type='file' disableUnderline='true' fullWidth='true'
                                                   style={{display: "none"}}
                                                   onChange={this.handleClickAddPhoto}
                                                   placeholder='Change profile picture'/>
                                        </IconButton>
                                        <IconButton
                                            // color="primary"
                                            onClick={this.handleOpenDialogDeletePicture}>
                                            <DeleteIcon/></IconButton>
                                        <MyDialog
                                            delete={this.handleClickDeletePhoto}
                                            open={this.state.openDialogDeletePicture}
                                            handleClose={this.handleCloseDialogDeletePicture}
                                            title="Delete profile picture"
                                            msg="Are you sure you want to delete your profile picture?"/>
                                    </div>
                                </Grid>
                                <Grid container justify={"space-evenly"}>
                                    <Grid xl={12} xs={12}>
                                        <Typography variant="h3" component="h3" style={{marginTop: 10}}
                                                    align={"center"} color="textPrimary">
                                            {this.state.firstName} {this.state.lastName}
                                        </Typography>
                                    </Grid>
                                    {/*<Grid direction={"column"}>*/}
                                    <Grid xs={12} sm={12}
                                        // alignContent={"flex-start"}
                                    >
                                        <Typography variant="h5"
                                            // style={{
                                            //     // padding: 3,
                                            //     position: "relative",
                                            //     right: 19,
                                            //     marginTop: 3
                                            // }}
                                                    color="textSecondary" component="p">
                                            {this.state.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} sm={12}
                                        // alignContent={"flex-start"}
                                    >

                                        <Typography variant="h5" color="textSecondary" component="p"
                                                    style={{
                                                        position: "relative",
                                                        left: "25px"
                                                    }}
                                        >
                                            {this.state.email}
                                            <IconButton
                                                // variant="contained"
                                                color="primary"
                                                onClick={this.handleOpenDialogChangeEmail}
                                            ><EditIcon/></IconButton>
                                            <Dialog
                                                open={this.state.openDialogChangeEmail}
                                                onClose={this.handleCloseDialogChangeEmail}
                                                aria-labelledby="responsive-dialog-title"
                                            >
                                                <DialogTitle id="responsive-dialog-title">Change email</DialogTitle>
                                                <DialogContentText>
                                                    Please enter your password
                                                </DialogContentText>
                                                <DialogContent>
                                                    {this.state.reLogin && <Alert severity="success">
                                                        {this.state.reLogin}
                                                    </Alert>}
                                                    <FormControl>
                                                        <InputLabel htmlFor="Password">Password</InputLabel>
                                                        <Input id="Password"
                                                               type={this.state.showPassword ? 'text' : 'password'}
                                                               placeholder="Password"
                                                               style={textFieldStyles}
                                                               onChange={this.onChangeOldPassword}
                                                               endAdornment={
                                                                   <InputAdornment position="end">
                                                                       <IconButton
                                                                           onClick={this.handleClickShowPassword}>
                                                                           {this.state.showPassword ? <Visibility/> :
                                                                               <VisibilityOff/>}
                                                                       </IconButton>
                                                                   </InputAdornment>
                                                               }
                                                        />
                                                        {!!this.state.errorMessage &&
                                                        <FormHelperText style={textFieldStyles}
                                                                        htmlFor="Password"
                                                                        error={true}>
                                                            {this.state.errorMessage}
                                                        </FormHelperText>}
                                                    </FormControl>
                                                    <TextField type="email" label="Email" style={textFieldStyles}
                                                               onChange={this.onChangeEmail}
                                                               helperText={this.state.errorMessages["email"]}
                                                               error={this.state.errorMessages["email"] !== undefined}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={this.handleCloseDialogChangeEmail}
                                                            color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={this.editEmail} color="primary">
                                                        Save
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} sm={12} justify={"flex-start"} class={"buttonContainer"}>
                                        <Button
                                            align={"left"}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{
                                                marginRight: "10px"
                                            }}
                                            onClick={this.handleOpenDialogChangeData}
                                            startIcon={<EditIcon/>}>
                                            Change data</Button>
                                        <Dialog
                                            open={this.state.openDialogChangeData}
                                            onClose={this.handleCloseDialogChangeData}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">Change profile data</DialogTitle>
                                            <DialogContent>
                                                <TextField type="firstName" style={textFieldStyles} label="First name"
                                                           onChange={this.onChangeFirstName}
                                                           defaultValue={this.state.firstName}
                                                           helperText={this.state.errorMessages["firstName"]}
                                                           error={this.state.errorMessages["firstName"] !== undefined}
                                                />
                                                <TextField type="lastName" label="Last name" style={textFieldStyles}
                                                           onChange={this.onChangeLastName}
                                                           defaultValue={this.state.lastName}
                                                           helperText={this.state.errorMessages["lastName"]}
                                                           error={this.state.errorMessages["lastName"] !== undefined}
                                                />
                                                <TextField type="phone" label="Phone" style={textFieldStyles}
                                                           onChange={this.onChangePhone}
                                                           defaultValue={this.state.phone}
                                                           helperText={this.state.errorMessages["phone"]}
                                                           error={this.state.errorMessages["phone"] !== undefined}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseDialogChangeData}
                                                        color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.editData} color="primary">
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Button
                                            align="left"
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{
                                                margin: "0 10px"
                                            }}
                                            onClick={this.handleOpenDialogChangePassword}
                                            startIcon={<EditIcon/>}>
                                            Change password</Button>
                                        <Dialog
                                            open={this.state.openDialogChangePassword}
                                            onClose={this.handleCloseDialogChangePassword}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">Change password</DialogTitle>
                                            <DialogContent>
                                                <FormControl>
                                                    <InputLabel htmlFor="Old Password">Old Password</InputLabel>
                                                    <Input type={this.state.showOldPassword ? 'text' : 'password'}
                                                           placeholder="Old Password"
                                                           fullWidth
                                                           id={"Old Password"}
                                                           style={textFieldStyles}
                                                           onChange={this.onChangeOldPassword}
                                                           helperText={this.state.errorMessage}
                                                           error={!!this.state.errorMessage}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowOldPassword}>
                                                                       {this.state.showOldPassword ? <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {!!this.state.errorMessage &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="Old Password"
                                                                    error={true}>
                                                        {this.state.errorMessage}
                                                    </FormHelperText>}
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel htmlFor="New Password">Password</InputLabel>
                                                    <Input id="New Password"
                                                           type={this.state.showPassword ? 'text' : 'password'}
                                                           placeholder="New Password"
                                                           style={textFieldStyles}
                                                           fullWidth
                                                           onChange={this.onChangePassword}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowPassword}>
                                                                       {this.state.showPassword ? <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {this.state.errorMessages["newPassword"] !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="New Password"
                                                                    error={true}>
                                                        {this.state.errorMessages["newPassword"]}
                                                    </FormHelperText>}
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel htmlFor="Repeat Password">Repeat
                                                        Password</InputLabel>
                                                    <Input type={this.state.showConfPassword ? 'text' : 'password'}
                                                           placeholder="Repeat Password"
                                                           id={"Repeat Password"}
                                                           style={textFieldStyles}
                                                           onChange={this.onChangeConfirmationPassword}
                                                           helperText={this.state.errorMessages["confirmationPassword"]}
                                                           error={this.state.errorMessages["confirmationPassword"] !== undefined}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowConfPassword}>
                                                                       {this.state.showConfPassword ?
                                                                           <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {this.state.errorMessages["confirmationPassword"] !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="Repeat Password"
                                                                    error={true}>
                                                        {this.state.errorMessages["confirmationPassword"]}
                                                    </FormHelperText>}
                                                </FormControl>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseDialogChangePassword}
                                                        color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.editPassword} color="primary">
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{
                                                marginLeft: "10px"
                                            }}
                                            startIcon={<DeleteIcon/>}
                                            onClick={this.handleOpenDialogDelete}
                                        >
                                            Delete Account</Button>
                                        <MyDialog
                                            delete={this.delete}
                                            open={this.state.openDialogDelete}
                                            handleClose={this.handleCloseDialogDelete}
                                            title="Delete account"
                                            msg="Are you sure you want to delete your account?"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileForm;