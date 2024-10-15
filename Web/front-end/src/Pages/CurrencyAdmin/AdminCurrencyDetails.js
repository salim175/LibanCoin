import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import { getCurrencyById } from '../../Services/adminServices';

class CurrencyDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            item: {},
            isLogin: localStorage.getItem('jwt')
        };
    }

    // 3mel load la kol lcomponents
    componentDidMount()
    {
        getCurrencyById(this.props.location.state.id)
            .then(res => { this.setState({ item: res }) })
            .catch(err => { console.log(err) });
    }

    render()
    {
        return this.state.isLogin ?
            <>
                <AdminHeader />

                <SimpleSiderAdmin />

                <h1 style={{ fontFamily: "serif", textAlign: "center" }}>Currency Details</h1>
                <div className='container'>
                    <Card key={this.state.item._id}>
                        <Card.Body>

                            <Card.Header as='h5' style={{ textAlign: "center" }}>{this.state.item.name}</Card.Header>

                            <Card.Text style={{ textAlign: "left" }}>
                                {this.state.item.abr}
                            </Card.Text>

                            <Link to="/admin/currency">
                                <Button variant="primary" >Go Back</Button>
                            </Link>

                        </Card.Body>
                    </Card>
                </div>
            </>
            :
            <>
                <SimpleSiderAdmin />
                <h1 style={{ textAlign: "center", fontFamily: "serif" }}>Please Login First</h1>
                <Link to="/auth/admin" style={{ color: "blue" }}>
                    <h5 style={{ textAlign: "center" }}>SignIn Here!</h5>
                </Link>
            </>

    }
}

export default CurrencyDetails;