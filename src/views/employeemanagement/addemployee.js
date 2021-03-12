import React, { Component } from 'react';
import SimpleReactValidator from "simple-react-validator";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingOverlay from 'react-loading-overlay';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export default class addemployee extends Component {
  constructor(props) {
    super(props);
    // Form Validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSname = this.onChangeSname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeTaxpayerID = this.onChangeTaxpayerID.bind(this);
    this.onChangeEmpTin = this.onChangeEmpTin.bind(this);
    this.onChangeBvn = this.onChangeBvn.bind(this);
    this.onChangeGrossIncome = this.onChangeGrossIncome.bind(this);
    this.onChangePension = this.onChangePension.bind(this);
    this.onChangeCra = this.onChangeCra.bind(this);
    this.onChangeNhis = this.onChangeNhis.bind(this);
    this.onChangeNfs = this.onChangeNfs.bind(this);
    this.onChangeOtherIncome = this.onChangeOtherIncome.bind(this);
    this.onChangeStartMonth = this.onChangeStartMonth.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeNationality = this.onChangeNationality.bind(this);
    this.onChangeHomeAddress = this.onChangeHomeAddress.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: "",
      title:"",
      sname:"",
      email:"",
      phone:"",
      taxpayer_id:"",
      emptin:"",
      bvn:"",
      gross_income:"",
      pension:"",
      cra:"",
      nhis:"",
      nfs:"",
      other_income:"",
      start_month:"",
      designation:"",
      nationality:"",
      home_address:"",
      zip_code:"",
      alert: null,
      isActive: false // Loader
    };
  }

  componentDidMount(){
    const validtoken = localStorage.getItem("access_token");
    if(validtoken ==='' || validtoken === null){
      this.props.history.push("/login");
    }
  }

  onChangeFname(e) {
    this.setState({
      fname: e.target.value,
    });
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeSname(e) {
    this.setState({
      sname: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeTaxpayerID(e) {
    this.setState({
      taxpayer_id: e.target.value,
    });
  }

  onChangeEmpTin(e) {
    this.setState({
      emptin: e.target.value,
    });
  }

  onChangeBvn(e) {
    this.setState({
      bvn: e.target.value,
    });
  }

  onChangeGrossIncome(e) {
    this.setState({
      gross_income: e.target.value,
    });
  }

  onChangePension(e) {
    this.setState({
      pension: e.target.value,
    });
  }

  onChangeCra(e) {
    this.setState({
      cra: e.target.value,
    });
  }

  onChangeNhis(e) {
    this.setState({
      nhis: e.target.value,
    });
  }

  onChangeNfs(e) {
    this.setState({
      nfs: e.target.value,
    });
  }

  onChangeOtherIncome(e) {
    this.setState({
      other_income: e.target.value,
    });
  }

  onChangeStartMonth(e) {
    this.setState({
      start_month: e.target.value,
    });
  }

  onChangeDesignation(e) {
    this.setState({
      designation: e.target.value,
    });
  }

  onChangeNationality(e) {
    this.setState({
      nationality: e.target.value,
    });
  }

  onChangeHomeAddress(e) {
    this.setState({
      home_address: e.target.value,
    });
  }

  onChangeZipCode(e) {
    this.setState({
      zip_code: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {

      // Show Loader
      this.setState({
        isActive: true
      });
      const apiUrl = process.env.REACT_APP_BASE_API_URL;
      console.log("oooooooooooooooo");
      console.log(this.state);

      fetch(apiUrl + "/employees", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With"
        },

        body: JSON.stringify({
          tin: this.state.emptin,
          bvn: this.state.bvn,
          nhis: this.state.nhis,
          nhf: this.state.nfs,
          designation: this.state.designation,
          title: this.state.title,
          first_name: this.state.fname,
          last_name: this.state.sname,
          email: this.state.email,
          nationality: this.state.nationality,
          zip_code: this.state.zip_code,
          cra: this.state.cra,
          taxpayer_id: this.state.taxpayer_id,
          pension: this.state.pension,
          gross_income: this.state.gross_income,
          other_income: this.state.other_income,
          phone: this.state.phone,
          start_month: this.state.start_month,
          corporate_id: this.state.corporate_id,
          home_address: this.state.home_address
        }),
      }).then((response) => response.json())
        .then((responseapi) => {
          if (responseapi.status === true) {


            const getAlert = () => (
              <SweetAlert success title="Success" onConfirm={() => this.hideAlert()}>
                {responseapi.message}
              </SweetAlert>
            );
            // this.setState({
            //   alert: getAlert(),
            //   isActive: false
            // });

            this.setState({
              fname: "",
              title:"",
              sname:"",
              email:"",
              phone:"",
              taxpayer_id:"",
              emptin:"",
              bvn:"",
              gross_income:"",
              pension:"",
              cra:"",
              nhis:"",
              nfs:"",
              other_income:"",
              start_month:"",
              designation:"",
              nationality:"",
              home_address:"",
              zip_code:"",
              alert: getAlert(),
              isActive: false
            });

            //this.props.history.push("/addemployee");
          } else {

            const getAlert = () => (
              <SweetAlert error title="OOPs!" onConfirm={() => this.hideAlert()}>
                {responseapi.message}
              </SweetAlert>
            );
            this.setState({
              alert: getAlert(),
              isActive: false
            });
          }

          console.log(responseapi);
        })
        .catch((err) => {
          console.log(err);
        });


    }else{
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

    const token = localStorage.getItem('access_token')
    if(token ==='' || token === null){
      this.props.history.push("/login");
    }


    return (
      <div>
        <LoadingOverlay active={this.state.isActive} spinner text='Loading Please Wait......'>
          <CCol xs="12" md="12">
              <CCard>
                <CCardHeader>
                  <h3>Add Employee</h3>
                </CCardHeader>
                <CCardBody>
                  {this.state.alert}
                  <CForm onSubmit={this.onSubmit} method="post" inline>

                  <CFormGroup row className="col-12">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Title <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CSelect custom name="select" id="select" className="col-12" value={this.state.title}  onChange={this.onChangeTitle}>
                                <option>Select Title</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Miss.">Miss.</option>
                              </CSelect>
                              <div className="text-danger">
                                  {this.validator.message("title",this.state.title,"required")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">First Name <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter First name"  value={this.state.fname} onChange={this.onChangeFname}/>
                              <div className="text-danger">
                                 {this.validator.message("fname",this.state.fname,"required|alpha_space")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Surname <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Surname" value={this.state.sname} onChange={this.onChangeSname} />
                              <div className="text-danger">
                                  {this.validator.message("sname",this.state.sname,"required|alpha_space")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Email <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter Email" value={this.state.email} onChange={this.onChangeEmail} />
                              <div className="text-danger">
                                  {this.validator.message("email",this.state.email,"required|email")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Phone No <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Phone no" value={this.state.phone} onChange={this.onChangePhone} />
                              <div className="text-danger">
                                  {this.validator.message("phone",this.state.phone,"required|numeric|min:11|max:11")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Existing Taxpayer ID <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter Existing Taxpayer ID" value={this.state.taxpayer_id} onChange={this.onChangeTaxpayerID} />
                              <div className="text-danger">
                                  {this.validator.message("taxpayer_id",this.state.taxpayer_id,"alpha_num")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Employee TIN <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Employee TIN" value={this.state.emptin} onChange={this.onChangeEmpTin} />
                              <div className="text-danger">
                                {this.validator.message("emptin",this.state.emptin,"required|numeric|min:10|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">BVN <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter BVN" value={this.state.bvn} onChange={this.onChangeBvn} />
                              <div className="text-danger">
                                {this.validator.message("bvn",this.state.bvn,"required|numeric|min:11|max:11")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Gross Income <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Gross Income" value={this.state.gross_income} onChange={this.onChangeGrossIncome} />
                              <div className="text-danger">
                                  {this.validator.message("gross_income",this.state.gross_income,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Pension <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter Pension" value={this.state.pension} onChange={this.onChangePension} />
                              <div className="text-danger">
                                  {this.validator.message("pension",this.state.pension,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">CRA <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter CRA" value={this.state.cra} onChange={this.onChangeCra} />
                              <div className="text-danger">
                                {this.validator.message("cra",this.state.cra,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">NHIS <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter NHIS" value={this.state.nhis} onChange={this.onChangeNhis} />
                              <div className="text-danger">
                                {this.validator.message("nhis",this.state.nhis,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>

                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">NFS <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12"  placeholder="Enter NFS" value={this.state.nfs} onChange={this.onChangeNfs} />
                              <div className="text-danger">
                                  {this.validator.message("nfs",this.state.nfs,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Other Income <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter Other Income" value={this.state.other_income} onChange={this.onChangeOtherIncome} />
                              <div className="text-danger">
                                {this.validator.message("other_income",this.state.other_income,"required|numeric|max:10")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>


                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Start Month <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CSelect custom name="select" id="select" className="col-12" value={this.state.title}  onChange={this.onChangeStartMonth}>
                                <option>Select Start Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                              </CSelect>
                              <div className="text-danger">
                                  {this.validator.message("start_month",this.state.start_month,"required")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Designation <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12"placeholder="Enter Designation" value={this.state.designation} onChange={this.onChangeDesignation} />
                              <div className="text-danger">
                                {this.validator.message("designation",this.state.designation,"required|alpha_space")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>


                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Nationality <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Nationality" value={this.state.nationality} onChange={this.onChangeNationality} />
                              <div className="text-danger">
                                {this.validator.message("nationality",this.state.nationality,"required|alpha_space")}
                              </div>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">Home Address <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="postal-code" className="col-12" placeholder="Enter Home Address" value={this.state.home_address} onChange={this.onChangeHomeAddress} />
                              <div className="text-danger">
                                  {this.validator.message("home_address",this.state.home_address,"required|alpha_num_dash_space")}
                              </div>
                            </CFormGroup>
                          </CCol>
                      </CFormGroup>
                  </CFormGroup>


                  <CFormGroup row className="col-12 mt-4">
                      <CFormGroup row className="my-0 col-12">
                          <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="city">Zip Code <sup className="ml-1 mt-2 text-danger">*</sup></CLabel>
                              <CInput id="city" className="col-12" placeholder="Enter Zip Code" value={this.state.zip_code} onChange={this.onChangeZipCode}/>
                              <div className="text-danger">
                                  {this.validator.message("zip_code",this.state.zip_code,"required|numeric")}
                              </div>
                            </CFormGroup>
                          </CCol>

                      </CFormGroup>
                  </CFormGroup>

                  <CCardFooter className="mt-2 col-12">
                    <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                    <CButton className="ml-2" type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                  </CCardFooter>

                  </CForm>
                </CCardBody>

              </CCard>
          </CCol>
        </LoadingOverlay>
      </div>
    )
  }
}
