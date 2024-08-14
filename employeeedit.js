import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EmployeeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const res = await axios.get(http://localhost:5000/api/employees/${id});
            setEmployee(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setEmployee({ ...employee, course: [...employee.course, value] });
        } else {
            setEmployee({ ...employee, course: employee.course.filter((course) => course !== value) });
        }
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        formData.append('course', employee.course);
        if (employee.image) {
            formData.append('image', employee.image);
        }

        try {
            await axios.put(http://localhost:5000/api/employees/${id}, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Employee updated successfully!');
            navigate('/employee-list');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="employee-edit">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mobile No</label>
                    <input
                        type="text"
                        name="mobile"
                        value={employee.mobile}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    <select
                        name="designation"
                        value={employee.designation}
                        onChange={handleInputChange}
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={employee.gender === 'Male'}
                            onChange={handleInputChange}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={employee.gender === 'Female'}
                            onChange={handleInputChange}
                        />
                        Female
                    </div>
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <div>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            checked={employee.course.includes('MCA')}
                            onChange={handleCourseChange}
                        />
                        MCA
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            checked={employee.course.includes('BCA')}
                            onChange={handleCourseChange}
                        />
                        BCA
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            checked={employee.course.includes('BSC')}
                            onChange={handleCourseChange}
                        />
                        BSC
                    </div>
                </div>
                <div className="form-group">
                    <label>Image Upload</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EmployeeEdit;
