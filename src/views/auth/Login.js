import React, { Component } from "react";
import { Link } from 'react-router-dom'
import SimpleReactValidator from "simple-react-validator";
import SweetAlert from "react-bootstrap-sweetalert";
//import ReCAPTCHA from "react-google-recaptcha";
import LoadingOverlay from 'react-loading-overlay';


import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

//const recaptchaRef = React.createRef();
export default class login extends Component {

  constructor(props) {
    super(props);

    // Form Validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      alert: null,
      isActive: false // Loader
    };

  }

  componentDidMount() {
    // creates entity
    const validtoken = localStorage.getItem("access_token");
    if(validtoken){
      this.props.history.push("/dashboard");
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    //const recaptchaValue = recaptchaRef.current.getValue();
    //if (this.validator.allValid() && recaptchaValue.length >0) {

      if (this.validator.allValid()) {
        // Show Loader
        this.setState({
          isActive: true
      });

      const apiUrl = process.env.REACT_APP_BASE_API_URL;
      fetch(apiUrl + "/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          otp: 1234,
        }),
      }).then((response) => response.json())
        .then((responseapi) => {
          if (responseapi.status === true) {
            localStorage.setItem("email", responseapi.response.user.email);
            localStorage.setItem("id", responseapi.response.user.id);
            localStorage.setItem(
              "access_token",
              responseapi.response.access_token
            );
            localStorage.setItem("role_id", responseapi.response.user.role_id);
            localStorage.setItem("phone", responseapi.response.user.phone);
            localStorage.setItem(
              "email_verified_at",
              responseapi.response.user.email_verified_at
            );
            localStorage.setItem(
              "taxpayer_type_id",
              responseapi.response.user.taxpayer_type_id
            );
            localStorage.setItem(
              "tax_office_id",
              responseapi.response.user.tax_office_id
            );
            localStorage.setItem("active", responseapi.response.user.active);
            localStorage.setItem(
              "changed_default_password",
              responseapi.response.user.changed_default_password
            );
            localStorage.setItem(
              "corporate_id",
              responseapi.response.user.corporate_id
            );
            localStorage.setItem(
              "created_at",
              responseapi.response.user.created_at
            );
            localStorage.setItem(
              "updated_at",
              responseapi.response.user.updated_at
            );

            const getAlert = () => (
              <SweetAlert
                success
                title="Success"
                onConfirm={() => this.hideAlert()}
              >
                {responseapi.message}
              </SweetAlert>
            );
            this.setState({
              alert: getAlert(),
              isActive:false
            });
            this.props.history.push("/dashboard");
            //window.location.replace("/dashboard");
          } else {
            const getAlert = () => (
              <SweetAlert
                error
                title="OOPs!"
                onConfirm={() => this.hideAlert()}
              >
                {responseapi.message}
              </SweetAlert>
            );
            this.setState({
              alert: getAlert(),
              isActive:false
            });
          }

          console.log(responseapi);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // if (recaptchaValue.length == 0) {
      //   document.getElementById("captchaError").innerHTML =
      //     "Captcha field is required";
      //   }
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  hideAlert() {
    console.log("Hiding alert...");
    this.setState({
      alert: null,
    });
  }

    render() {
      // const token = localStorage.getItem('access_token')
      // if(token !=='' || token !== null){
      //   this.props.history.push("/dashboard");
      // }



      return (
        <LoadingOverlay active={this.state.isActive} spinner text='Loading Please Wait......'>
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      {this.state.alert}
                      <CForm onSubmit={this.onSubmit} method="post">
                        <h1>Login111</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Email" autoComplete="username" value={this.state.email} onChange={this.onChangeEmail}/>
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                            {/**********   This is where the magic happens     ***********/}
                            {this.validator.message("email",this.state.email,"required|email")}
                        </div>

                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Password" autoComplete="current-password" value={this.state.password} onChange={this.onChangePassword}/>
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                            {/**********   This is where the magic happens     ***********/}
                            {this.validator.message("password",this.state.password,"required")}
                        </div>

                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit"  color="primary" className="px-4">Login</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton  color="link" className="px-0">Forgot password?</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.</p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </LoadingOverlay>

    );
    }
}

