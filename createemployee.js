import React, { useState } from 'react';
import axios from 'axios';

function CreateEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                course: checked
                    ? [...prevData.course, value]
                    : prevData.course.filter((course) => course !== value)
            }));
        } else if (type === 'file') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'course') {
                formData[key].forEach((course) => form.append(key, course));
            } else {
                form.append(key, formData[key]);
            }
        });

        try {
            const res = await axios.post('http://localhost:5000/api/employees', form);
            alert('Employee Created Successfully');
        } catch (err) {
            console.error(err);
            alert('Error creating employee');
        }
    };

    return (
        <div className="create-employee">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="radio" name="gender" value="M" onChange={handleChange} required /> Male
                    <input type="radio" name="gender" value="F" onChange={handleChange} required /> Female
                </div>
                <div>
                    <label>Course:</label>
                    <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
                    <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
                    <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
                </div>
                <div>
                    <label>Image Upload:</label>
                    <input type="file" name="image" accept="image/jpeg, image/png" onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateEmployee;
