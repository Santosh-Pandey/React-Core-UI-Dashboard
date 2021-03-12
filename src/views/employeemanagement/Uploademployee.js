import React, { Component } from 'react';
import SimpleReactValidator from "simple-react-validator";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingOverlay from 'react-loading-overlay';
import axios from "axios";


export default class Uploademployee extends Component {
    constructor(props) {
        super(props);
        // Form Validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

        //this.onChangefile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          myfile:"",
          alert: null,
          isActive: false,
        };
    }

    onFileChange = event => {
        // Update the state
        this.setState({ myfile: event.target.files[0] });
    };

    async onSubmit(e) {
        e.preventDefault();

        if (this.validator.allValid()) {
                // Show Loader
                this.setState({
                    isActive: true
                });

                const apiUrl = process.env.REACT_APP_BASE_API_URL + "/employees/import";
                const reqHeader = {
                        "content-type": "application/json",
                        accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    };

                const formData = new FormData();
                // Update the formData object
                formData.append(
                    "employees",
                    this.state.myfile,
                    this.state.myfile.name
                );
                // Details of the uploaded file
                console.log(this.state.myfile);

                const resultObj = await axios.post(apiUrl, formData, {
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
                    //this.props.history.push("/display-employee");
                }else{
                    //alert(result.message);

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
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content" data-select2-id={32}>
                <div className="container-fluid" data-select2-id={31}>
                    {/* SELECT2 EXAMPLE */}
                    <div className="card card-secondary">
                    <div className="card-header custome">
                        <h3 className="card-title">Upload Employees</h3>
                    </div>
                    {/* /.card-header */}
                    {this.state.alert}
                    <div className="card-body">
                        <form onSubmit={this.onSubmit} method="post">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="fileInput">Select File to Upload</label>
                            <div className="custom-file">
                                <input formcontrolname="myfile" id="myfile" type="file" className="custom-file-input" accept=".xls,.xlsx"  onChange={this.onFileChange} required/>
                                <label className="custom-file-label" htmlFor="customFile" />
                            </div>
                            <div className="text-danger">
                              {/* {this.validator.message("File to Upload",this.state.myfile,"required")} */}
                            </div>
                            </div>
                        </div>
                          <button type="submit" className="btn btn-danger"><i class="fas fa-plus-square"></i> Save File</button>
                        </form>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                    </div>
                    </div>
                </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </LoadingOverlay>
        </div>

        )
    }
}
