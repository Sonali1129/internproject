import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(http://localhost:5000/api/employees/${id});
                fetchEmployees(); // Refresh the list
            } catch (err) {
                console.error(err);
            }
        }
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Search Keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={http://localhost:5000/${employee.image}}
                                    alt="Profile"
                                    width="50"
                                />
                            </td>
                            <td>{employee.name}</td>
                            <td>
                                <a href={mailto:${employee.email}}>
                                    {employee.email}
                                </a>
                            </td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course.join(', ')}</td>
                            <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => alert('Edit functionality to be implemented')}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(employee._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
