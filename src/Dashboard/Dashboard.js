import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get_airports, get_flights, refresh_data } from './../store/actions/FlightsAction';
import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            flights: [],
            selectedAirport: null,
            departingMinutes: 0,
            arrivingMinutes: 0,
            showModal: false
        }
    }
    componentDidMount = () => {
        if(!this.props.is_logged_in) {
            this.props.history.push('/');
        }
        this.props.onLoadDashboard();
    }
    handleClose = () =>  {
        this.setState({ showModal: false, departingMinutes: 0, arrivingMinutes: 0, selAirport: null }, () => this.props.refreshData());
    }
    showData = () => {
        this.props.getFlights(this.state.selectedAirport, this.state.arrivingMinutes, this.state.departingMinutes);
    }
    handleShow = (icao) => {
        this.setState({ showModal: true, selectedAirport: icao });
    }
    changeDeparting = (event) => {
        if(event.target.value) {
            this.setState({
                departingMinutes: event.target.value
            })
        }
    }
    changeArriving = (event) => {
        if(event.target.value) {
            this.setState({
                arrivingMinutes: event.target.value
            })
        }
        
    }
    renderButton = () => {
        if(this.props.loading) {
            return (
                <span><img className="loader-img" alt="loading..." src="/loader.gif" /></span>  
            )
        }
        return (
            <Button bsStyle="primary" onClick={() => this.showData()}>Show</Button>
        )        
    }
    renderModal = () => {
        if(this.state.selectedAirport && this.props.airports) {
            let selAirport = this.props.airports.find((el) => el.key === this.state.selectedAirport);
            return (
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{textAlign:'center', textTransform:'uppercase', fontWeight: 'bold'}}>{selAirport.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Departing flights in the last&ensp;
                             <input type="number" onChange={this.changeDeparting} min="0"/> minutes
                        </h4>
                        {this.renderDepartingFlights()}
                        <div className="border-grey"></div>
                        <h4>Arriving flights in the last&ensp;
                            <input type="number" onChange={this.changeArriving} min="0"/> minutes
                        </h4>
                        {this.renderArrivingFlights()}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.renderButton()}
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return (
                <div></div>
            )
        }
       
    }

    renderDepartingFlights = () => {
        if(this.props.departingFlights && this.props.departingFlights.length > 0) {
            let listItems = this.props.departingFlights.map((el, index) => {
                return (
                    <li key={index}> Airplaine icao24: <b>{el.icao24}</b>
                        <ul className="listItems"> 
                            <li>ICAO: <b>{el.estDepartureAirport}</b></li>
                            <li>Number of other possible departure airports: <b>{el.departureAirportCandidatesCount}</b></li>
                        </ul>
                    </li>
                )
            });
            return (
                <div>
                    {(this.props.departingFlights.length >0 ) && <b>Total Departing Flights: {this.props.departingFlights.length}</b>}
                    <div className="listBlock">
                        <ul className="listItems">{listItems}</ul>
                    </div>
                </div>
                
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    renderArrivingFlights = () => {
        if(this.props.arrivingFlights && this.props.arrivingFlights.length > 0) {
            let listItems = this.props.arrivingFlights.map((el, index) => {
                return (
                    <li key={index}> Airplaine icao24: <b>{el.icao24}</b>
                        <ul className="listItems"> 
                            <li>ICAO: <b>{el.estArrivalAirport}</b></li>
                            <li>Number of other possible arrival airports: <b>{el.arrivalAirportCandidatesCount}</b></li>
                        </ul>
                    </li>
                )
            });
            return (
                <div>
                    {(this.props.arrivingFlights.length > 0) && <b>Total Arriving Flights: {this.props.arrivingFlights.length}</b>}
                    <div className="listBlock">
                        <ul className="listItems">{listItems}</ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    renderAirports = () => {
        if(!this.props.airports) {
            return (
                <div>loading...</div>
            )
        } else {
            let airports = this.props.airports.map((airport, index) => {
                return (
                    <Col key={airport.key} xs={4} md={4} sm={4} className="align-center" onClick={() => this.handleShow(airport.key)}>
                        <div className="shadow-block" > 
                          {airport.name}
                        </div>
                    </Col>
                )
            })
            return airports;
        }
    }

    render = () => {
        return (
            <div className="container margin-top-200 fadeIn">
                <Grid>
                    <Row>
                   {this.renderAirports()}
                   </Row>
                </Grid>
                {this.renderModal()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        airports: state.airports,
        departingFlights: state.departingFlights,
        arrivingFlights: state.arrivingFlights,
        is_logged_in: state.user_is_logged_in,
        loading: state.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLoadDashboard: () => {
            dispatch(get_airports());
        },
        getFlights : (icao, arrivingMinutes, departingMinutes) => {
            dispatch(get_flights(icao, arrivingMinutes, departingMinutes))
        },
        refreshData: () => {
            dispatch(refresh_data());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);