import React, { Component } from 'react';
import SimpleSiderAdmin from '../../components/AdminSiders/SimpleSiderAdmin';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { addCategory } from '../../Services/adminServices';
import { Link } from 'react-router-dom';

import Joi from '@hapi/joi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Form } from 'react-bootstrap';

class AddCategory extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            category: "",
            errors: "",
            name: "",
            description: "",
            isLogin: localStorage.getItem('jwt')
        }
    }

    validateCategory(category)
    {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50)
                .error(() =>
                {
                    return new Error("Please enter a Valide name(the name must be between 3 and 50 character)")
                }),
            description: Joi.string().min(20).max(2000)
                .error(() =>
                {
                    return new Error("Please enter a Valide description(the description must be between 20 and 2000 character)")
                })
        });
        return schema.validate(category);
    }

    validateData(categoryAdd)
    {
        const { error } = this.validateCategory(categoryAdd);
        if (error)
        {
            this.setState({ errors: error.message });
            return false;
        }
        return true;
    }

    handleSubmit()
    {
        const categoryToAdd = {
            name: this.state.name,
            description: this.state.description
        }

        if (this.validateData(categoryToAdd))
        {
            addCategory(categoryToAdd)
                .then((res) =>
                {
                    if (res.status == 200)
                    {
                        toast.success("Added successfuly");
                    } else
                    {
                        toast.error("ERROR occured while adding Category")
                    }
                })
                .catch(() => { toast.error("ERROR occured while adding Category") });
        }
    }

    render()
    {
        return this.state.isLogin ?
            <>
                <div>

                    <AdminHeader />

                    <SimpleSiderAdmin />

                    <label
                        htmlFor='name'
                        style={{ marginLeft: "10px", textAlign: "center" }}
                    >
                        Category name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="mb-3"
                        style={{ height: "50px", width: "220px", display: 'block', marginLeft: "30px", borderRadius: "5px" }}
                        required
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                    />

                    <label
                        htmlFor='name'
                        style={{ marginLeft: "10px" }}
                    >
                        Category description:
                    </label>

                    <textarea
                        id="name"
                        type="text"
                        name="description"
                        className="mb-3"
                        cols="40"
                        rows="10"
                        style={{ display: 'block', marginLeft: "30px", marginBottom: "20px", borderRadius: "5px" }}
                        required
                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                    />


                    {this.state.errors ?
                        <Form.Group>
                            <Form.Label
                                style={{ display: "true" }}
                            >
                                <Alert variant="danger" style={{ marginLeft: "10px" }}>{this.state.errors}</Alert>
                            </Form.Label>
                        </Form.Group>
                        :
                        <></>
                    }

                    <button
                        className='btn btn-success'
                        style={{ marginLeft: "150px" }}
                        onClick={() => { this.handleSubmit() }}
                    >
                        Submit
                    </button>
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
            ;
    }
}

export default AddCategory;