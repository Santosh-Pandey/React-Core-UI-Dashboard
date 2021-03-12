import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link } from 'react-router-dom';


//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";


/* Below All Imports for Add Export option in Datatable */
import JSZip from 'jszip';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.pdfMake = pdfMake;

/* End Imports for Add Export option in Datatable */

export default class Displayemployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      isActive: true,
      errormsg: null,
      singleEmp: [],
      data: [],
      showModalView: false,
      showModalEdit: false,
      fname: "",
      title: "",
      sname: "",
      email: "",
      phone: "",
      taxpayer_id: "",
      emptin: "",
      bvn: "",
      gross_income: "",
      pension: "",
      cra: "",
      nhis: "",
      nfs: "",
      other_income: "",
      start_month: "",
      designation: "",
      nationality: "",
      home_address: "",
      zip_code: "",
    };
  }

  showModalViewAction = (id) => {
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

    axios
      .get(apiUrl, {
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
          nfs: res.data.response.nfs,
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
  };

  hideModalViewAction = () => {
    this.setState({
      showModalView: false,
    });
  };

  showModalEditAction = (id) => {
    console.log(id);
    this.setState({
      showModalEdit: true,
    });
  }
  hideModalEditAction = () => {
    this.setState({
      showModalEdit: false,
    });
  };

  componentDidMount() {
    this.getUsersData();
  }

  async getUsersData() {
    const apiUrl = process.env.REACT_APP_BASE_API_URL + "/employees-list";

    const reqHeader = {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };
    const postData = {
      corporate_ids: [localStorage.getItem("coporate_id")],
    };

    const resultObj = await axios.post(apiUrl, postData, {
      headers: reqHeader,
    });
    const result = resultObj.data;

    console.log(result);

    if (result.status === true) {
      const empdata = result.response.data;
      this.setState({
        isActive: false,
        data: empdata,
      });

      $("#example").DataTable({
        searching: true,
        "lengthChange": true,
        dom:
          "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
          {
            extend: "csv",
            className: "btn btn-outline-dark export-btn",
            text: '<i class="fas fa-file-csv"> CSV</i>',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
          },
          {
            extend: "excel",
            className: "btn btn-outline-dark export-btn",
            text: '<i class="fas fa-file-excel"> Excel</i>',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
          },
          // tslint:disable-next-line: max-line-length
          {
            extend: "pdf",
            className: "btn btn-outline-dark export-btn",
            text: '<i class="fas fa-file-pdf"> PDF</i>',
            orientation: "landscape",
            pageSize: "LEGAL",
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
          },
        ],

      });

      console.log(this.state.data);
    } else {
      const getAlert = () => (
        <SweetAlert error title="OOPs!" onConfirm={() => this.hideAlert()}>
          {result.message}
        </SweetAlert>
      );
      this.setState({
        alert: getAlert(),
        isActive: false,
      });
    }
    return;
  }

  hideAlert() {
    console.log("Hiding alert...");
    this.setState({
      alert: null,
    });
  }

  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.isActive}
          spinner
          text="Loading Please Wait......"
        >
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              {/* Default box */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">All Employee's Details</h3>
                </div>
                <div className="card-body p-3">
                  {this.state.alert}

                  <table id="example" className="display">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>BVN</th>
                        <th>Taxpayer ID</th>
                        <th>TIN</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gross Income</th>
                        <th>Edit</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* onClick={this.showModal()} */}
                      {this.state.data.map((result, i) => {
                        return (
                          <tr key={i}>
                            <td>{result.id}</td>
                            <td>{result.first_name + "" + result.last_name}</td>
                            <td>{result.bvn}</td>
                            <td>{result.taxpayer_id}</td>
                            <td>{result.tin}</td>
                            <td>{result.email}</td>
                            <td>{result.phone}</td>
                            <td>{result.gross_income}</td>
                            <td>
                              {/* <button type="button" class="btn btn-danger" onClick={() => this.showModalEditAction(result.id)}> */}
                              <Link type="button" class="btn btn-danger" to={{ pathname: '/edit', state: { id: result.id} }}>
                                <i class="fas fa-edit"></i> Edit
                              </Link>
                            </td>
                            <td>
                              <button type="button" class="btn btn-info" onClick={() => this.showModalViewAction(result.id)}>
                                <i class="fas fa-eye"></i> View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </section>
            {/* /.content */}
          </div>
          {/* /.content-wrapper */}

          <Modal size="lg" show={this.state.showModalView} onHide={this.hideModalViewAction}>
            <Modal.Header>
              <Modal.Title>View Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <section className="content">
                {/* Default box */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Employee's Details</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                        title="Remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    {" "}
                    <br />
                    {this.state.alert}
                    {/* <Spinner animation="border" variant="primary" /> */}
                    <form onSubmit={this.onSubmit} method="post">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Title
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <select
                            formcontrolname="title"
                            className="form-control"
                            disabled
                          >
                            <option>Select Title</option>
                            <option
                              value="Mr."
                              selected={
                                this.state.title === "Mr." ? "selected" : ""
                              }
                            >
                              Mr
                            </option>
                            <option
                              value="Ms"
                              selected={
                                this.state.title === "Ms" ? "selected" : ""
                              }
                            >
                              Mrs
                            </option>
                            <option
                              value="Miss"
                              selected={
                                this.state.title === "Miss" ? "selected" : ""
                              }
                            >
                              Miss
                            </option>
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            First Name
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="fname"
                            className="form-control"
                            placeholder="Enter First Name"
                            disabled
                            value={this.state.fname}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Surname
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="sname"
                            className="form-control"
                            placeholder="Enter Surname"
                            disabled
                            value={this.state.sname}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Email
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="email"
                            className="form-control"
                            placeholder="Enter Email"
                            disabled
                            value={this.state.email}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Phone No
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            maxLength="11"
                            formcontrolname="phone"
                            className="form-control"
                            placeholder="Enter Phone no"
                            disabled
                            value={this.state.phone}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Existing Taxpayer ID
                            <sup className="ml-1 font-wegiht-bold text-danger"></sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="taxpayer_id"
                            className="form-control"
                            placeholder="Enter Existing Taxpayer ID"
                            disabled
                            value={this.state.taxpayer_id}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Employee TIN
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            maxLength="10"
                            formcontrolname="emptin"
                            className="form-control"
                            placeholder="Enter Employee TIN"
                            disabled
                            value={this.state.emptin}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            BVN
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            maxLength="11"
                            formcontrolname="bvn"
                            className="form-control"
                            placeholder="Enter BVN"
                            disabled
                            value={this.state.bvn}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Gross Income
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="gross_income"
                            className="form-control"
                            placeholder="Enter Gross Income"
                            disabled
                            value={this.state.gross_income}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Pension
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="pension"
                            className="form-control"
                            placeholder="Enter Pension"
                            disabled
                            value={this.state.pension}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            CRA
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="cra"
                            className="form-control"
                            placeholder="Enter CRA"
                            disabled
                            value={this.state.cra}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            NHIS
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="nhis"
                            className="form-control"
                            placeholder="Enter NHIS"
                            disabled
                            value={this.state.nhis}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            NFS
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="nfs"
                            className="form-control"
                            placeholder="Enter NFS"
                            disabled
                            value={this.state.nfs}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Other Income
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="other_income"
                            className="form-control"
                            placeholder="Enter Other Income"
                            disabled
                            value={this.state.other_income}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Start Month
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <select
                            formcontrolname="start_month"
                            className="form-control"
                            disabled
                          >
                            <option>Select Start Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Designation
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="designation"
                            className="form-control"
                            placeholder="Enter Designation"
                            disabled
                            value={this.state.designation}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Nationality
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="nationality"
                            className="form-control"
                            placeholder="Enter Nationality"
                            disabled
                            value={this.state.nationality}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Home Address
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            formcontrolname="home_address"
                            className="form-control"
                            placeholder="Enter Home Address"
                            disabled
                            value={this.state.home_address}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4">
                            Zip Code
                            <sup className="ml-1 font-wegiht-bold text-danger">*</sup>
                          </label>
                          <input
                            type="text"
                            maxLength="6"
                            formcontrolname="zip_code"
                            className="form-control"
                            placeholder="Enter Zip Code"
                            disabled
                            value={this.state.zip_code}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </section>
            </Modal.Body>
            <Modal.Footer>
              <button class="btn btn-danger" onClick={this.hideModalViewAction}>
              <i class="far fa-window-close"></i> Cancel
              </button>
            </Modal.Footer>
          </Modal>


          <Modal size="lg" show={this.state.showModalEdit} onHide={this.hideModalEditAction}>
            <Modal.Header>
              <Modal.Title>View Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                              this is edit model
            </Modal.Body>
            <Modal.Footer>
              <button class="btn btn-danger" onClick={this.hideModalEditAction}>
                Cancel
              </button>
              <button class="btn btn-success">Save</button>
            </Modal.Footer>
          </Modal>


        </LoadingOverlay>
      </div>
    );
  }
}
