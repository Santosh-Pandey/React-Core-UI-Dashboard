import React, { Component } from 'react';
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingOverlay from 'react-loading-overlay';

export default class Editemployee extends Component {
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
          updateEmpId: "",
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
          isActive: false
        };
    }

    componentDidMount(){
        const {id} = this.props.location.state;
        let ids = id;
        this.setState({
            updateEmpId: ids,
        });
        this.getEmpData(ids);
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


      getEmpData(id) {
        console.log(id);
        this.setState({
          showModalView: true,
          isActive: true,
        });

        const apiUrl = process.env.REACT_APP_BASE_API_URL + "/employees/" + id;
        const reqHeader = {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        };

        axios.get(apiUrl, {
            headers: reqHeader,
          })
          .then((res) =>
            this.setState({
              singleEmp: res.data,
              fname: res.data.response.first_name,
              title: res.data.response.title,
              sname: res.data.response.last_name,
              email: res.data.response.email,
              phone: res.data.response.phone,
              taxpayer_id: res.data.response.taxpayer_id,
              emptin: res.data.response.tin,
              bvn: res.data.response.bvn,
              gross_income: res.data.response.gross_income,
              pension: res.data.response.pension,
              cra: res.data.response.cra,
              nhis: res.data.response.nhis,
              nfs: res.data.response.nhf,
              other_income: res.data.response.other_income,
              start_month: res.data.response.tax_month,
              designation: res.data.response.designation,
              nationality: res.data.response.nationality,
              home_address: res.data.response.home_address,
              zip_code: res.data.response.zip_code,
              isActive: false,
            })
          )
          .catch((err) => console.log(err));
      }



      async onSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {

            // Show Loader
            this.setState({
                isActive: true
            });

            const apiUrl = process.env.REACT_APP_BASE_API_URL + "/employees/update";
            const reqHeader = {
                "content-type": "application/json",
                accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              };
            const postData = {
                id: this.state.updateEmpId,
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
            };

            const resultObj = await axios.post(apiUrl, postData, {
                headers: reqHeader,
            });
            const result = resultObj.data;
            console.log(result);
            if (result.status === true) {
                const getAlert = () => (
                    <SweetAlert success title="Success" onConfirm={() => this.hideAlertWithRedirect('/displayemployee')}>
                      {result.message}
                    </SweetAlert>
                  );
                  this.setState({
                    alert: getAlert(),
                    isActive: false
                  });
                //this.props.history.push("/displayemployee");
            }else{
                const getAlert = () => (
                    <SweetAlert error title="OOPs!" onConfirm={() => this.hideAlert()}>
                      {result.message}
                    </SweetAlert>
                );
                this.setState({
                 alert: getAlert(),
                 isActive: false
                });
            }


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

      hideAlertWithRedirect(urlSegmant){
        console.log("Hiding alert...");
        this.setState({
          alert: null,
        });
        this.props.history.push(urlSegmant);
      }


    render() {
        return (
            <div>
            <LoadingOverlay active={this.state.isActive} spinner text='Loading Please Wait......'>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
              {/* Content Header (Page header) */}
              <section className="content-header">
                {/* /.container-fluid */}
              </section>
              {/* Main content */}
              <section className="content">
                {/* Default box */}
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Update Employee's Details</h3>
                  </div>
                  <div className="card-body p-3"> <br />
                        {this.state.alert}
                        {/* <Spinner animation="border" variant="primary" /> */}

                        <form onSubmit={this.onSubmit} method="post">
                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Title<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <select formcontrolname="title" className="form-control" value={this.state.title}  onChange={this.onChangeTitle}>
                                        <option>Select Title</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Mrs.">Mrs.</option>
                                        <option value="Miss.">Miss.</option>
                                    </select>
                                    <div className="text-danger">
                                      {this.validator.message("title",this.state.title,"required")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">First Name<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="fname" className="form-control" placeholder="Enter First Name"  value={this.state.fname} onChange={this.onChangeFname}/>
                                    <div className="text-danger">
                                     {this.validator.message("fname",this.state.fname,"required|alpha_space")}
                                    </div>
                                </div>
                          </div>
                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Surname<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="sname" className="form-control" placeholder="Enter Surname" value={this.state.sname} onChange={this.onChangeSname}/>
                                    <div className="text-danger">
                                      {this.validator.message("sname",this.state.sname,"required|alpha_space")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="email" className="form-control" placeholder="Enter Email" value={this.state.email} onChange={this.onChangeEmail}/>
                                    <div className="text-danger">
                                      {this.validator.message("email",this.state.email,"required|email")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Phone No<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" maxLength="11" formcontrolname="phone" className="form-control" placeholder="Enter Phone no" value={this.state.phone} onChange={this.onChangePhone}/>
                                    <div className="text-danger">
                                      {this.validator.message("phone",this.state.phone,"required|numeric|min:11|max:11")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Existing Taxpayer ID<sup className="ml-1 font-wegiht-bold text-danger"></sup></label>
                                    <input type="text" formcontrolname="taxpayer_id" className="form-control" placeholder="Enter Existing Taxpayer ID" value={this.state.taxpayer_id} onChange={this.onChangeTaxpayerID}/>
                                    <div className="text-danger">
                                        {this.validator.message("taxpayer_id",this.state.taxpayer_id,"alpha_num")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Employee TIN<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" maxLength="10" formcontrolname="emptin" className="form-control" placeholder="Enter Employee TIN" value={this.state.emptin} onChange={this.onChangeEmpTin}/>
                                    <div className="text-danger">
                                      {this.validator.message("emptin",this.state.emptin,"required|numeric|min:10|max:10")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">BVN<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" maxLength="11" formcontrolname="bvn" className="form-control" placeholder="Enter BVN" value={this.state.bvn} onChange={this.onChangeBvn}/>
                                    <div className="text-danger">
                                      {this.validator.message("bvn",this.state.bvn,"required|numeric|min:11|max:11")}
                                    </div>
                                </div>
                          </div>


                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Gross Income<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="gross_income" className="form-control" placeholder="Enter Gross Income" value={this.state.gross_income} onChange={this.onChangeGrossIncome}/>
                                    <div className="text-danger">
                                        {this.validator.message("gross_income",this.state.gross_income,"required|numeric|max:10")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Pension<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="pension" className="form-control" placeholder="Enter Pension" value={this.state.pension} onChange={this.onChangePension}/>
                                    <div className="text-danger">
                                       {this.validator.message("pension",this.state.pension,"required|numeric|max:10")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">CRA<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="cra" className="form-control" placeholder="Enter CRA" value={this.state.cra} onChange={this.onChangeCra}/>
                                    <div className="text-danger">
                                      {this.validator.message("cra",this.state.cra,"required|numeric|max:10")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">NHIS<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="nhis" className="form-control" placeholder="Enter NHIS" value={this.state.nhis} onChange={this.onChangeNhis}/>
                                    <div className="text-danger">
                                      {this.validator.message("nhis",this.state.nhis,"required|numeric|max:10")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">NFS<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="nfs" className="form-control" placeholder="Enter NFS" value={this.state.nfs} onChange={this.onChangeNfs}/>
                                    <div className="text-danger">
                                       {this.validator.message("nfs",this.state.nfs,"required|numeric|max:10")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Other Income<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="other_income" className="form-control" placeholder="Enter Other Income" value={this.state.other_income} onChange={this.onChangeOtherIncome}/>
                                    <div className="text-danger">
                                      {this.validator.message("other_income",this.state.other_income,"required|numeric|max:10")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Start Month<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <select formcontrolname="start_month" className="form-control" value={this.state.start_month}  onChange={this.onChangeStartMonth}>
                                        <option>Select Start Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                    </select>
                                    <div className="text-danger">
                                       {this.validator.message("start_month",this.state.start_month,"required")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Designation<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="designation" className="form-control" placeholder="Enter Designation" value={this.state.designation} onChange={this.onChangeDesignation}/>
                                    <div className="text-danger">
                                      {this.validator.message("designation",this.state.designation,"required|alpha_space")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Nationality<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="nationality" className="form-control" placeholder="Enter Nationality" value={this.state.nationality} onChange={this.onChangeNationality}/>
                                    <div className="text-danger">
                                      {this.validator.message("nationality",this.state.nationality,"required|alpha_space")}
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Home Address<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" formcontrolname="home_address" className="form-control" placeholder="Enter Home Address" value={this.state.home_address} onChange={this.onChangeHomeAddress}/>
                                    <div className="text-danger">
                                       {this.validator.message("home_address",this.state.home_address,"required|alpha_num_dash_space")}
                                    </div>
                                </div>
                          </div>

                          <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Zip Code<sup className="ml-1 font-wegiht-bold text-danger">*</sup></label>
                                    <input type="text" maxLength="6" formcontrolname="zip_code" className="form-control" placeholder="Enter Zip Code" value={this.state.zip_code} onChange={this.onChangeZipCode}/>
                                    <div className="text-danger">
                                        {this.validator.message("zip_code",this.state.zip_code,"required|numeric")}
                                    </div>
                                </div>

                          </div>
                          <button type="submit" className="btn btn-danger"><i class="fas fa-plus-square"></i> Update Employee</button>
                        </form>

                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </section>
              {/* /.content */}
            </div>
            {/* /.content-wrapper */}
            </LoadingOverlay>
          </div>
        )
    }
}
