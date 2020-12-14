import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ArchisauceLogo from '../../images/ArchisauceLogo.png';
import formPic from '../../images/formDataCollection.png';

const axios = require('axios').default;

class FormDataCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ""
        }
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }
    componentWillMount() {
        if (this.props.loggedIn === false){
            this.props.history.push("/signin")
        }
    }

    componentDidMount() {
        document.body.classList.add('bg-account-pages');
        document.body.classList.add('py-4');
        document.body.classList.add('py-sm-0');
    }

    handleValidSubmit(event, values) {
        var body = values;
        body.email = this.props.mail;
        this.type = "DataCollection";
        console.log(body)
        axios.post('http://localhost:3002/formdatacollection', body)
            .then((response) => {
                console.log(response.data)
                this.setState({ status: "Successfully submitted your response!" })
            })
            .catch((error) => {
                console.log(error.response)
                this.setState({ status: error.response.data })
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-home-btn d-none d-sm-block">
                    <Link to="/" className="text-white"><i className="mdi mdi-home text-orange position-attachment h1"></i></Link>
                    <img alt="Form" src={formPic} className="img-fluid rounded form-pic form-pic-border-50" />
                </div>

                <section className="height-100vh">
                    <div className="display-table">
                        <div className="display-table-cell">
                            <div className="container">
                                <Row className="justify-content-left">
                                    <Col lg="8">
                                        <Card className="account-card">
                                            <CardBody>
                                                <div className="text-center mt-3">
                                                    <h3 className="font-weight-bold"><Link className="navbar-brand logo text-uppercase" to="/"><img alt="" src={ArchisauceLogo} className="img-fluid rounded Archisaucelogo" /></Link></h3>
                                                    <p className="text-muted">Fill up this form about the influences of each of the following terms on your personal life</p>
                                                </div>
                                                <div className="p-3">
                                                    <AvForm onValidSubmit={this.handleValidSubmit}>

                                                        <div className="form-group text-orange">
                                                            <label htmlFor="region">Region</label>
                                                            <AvField type="textarea" name="region" className="form-control" placeholder="Enter Region" required />
                                                        </div>

                                                        <div className="form-group text-orange">
                                                            <label htmlFor="country">Country</label>
                                                            <AvField type="textarea" name="country" className="form-control" placeholder="Enter Country" required />
                                                        </div>

                                                        <div className="form-group text-orange">
                                                            <label htmlFor="peers">Peers</label>
                                                            <AvField type="textarea" name="peers" className="form-control" placeholder="Enter Peers" required />
                                                        </div>
                                                        {this.state.status && <div className="alert alert-warning text-center">{this.state.status}</div>}

                                                        {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                            <label className="custom-control-label" for="customControlInline">Remember me</label>
                                                        </div> */}

                                                        <div className="mt-3">
                                                            <button type="submit" className="btn btn-custom btn-block btn-width-50">Submit</button>
                                                        </div>
                                                    </AvForm>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        );
    }
}

export default FormDataCollection;