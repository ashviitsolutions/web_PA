import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { IP } from '../../../Constant';
import ReactPaginate from 'react-paginate';

function Clients() {
    const [data, setData] = useState(0);
    const [count, setCount] = useState(0);
    const [user, setUser] = useState([]);

    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/admin/allusers`, {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    },
                });
                const data = await res.json();
                setUser(data);
                setCount(data.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (selected) => {
        setData(selected.selected);
    };

    const itemsPerPage = 10;
    const startIndex = data * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log('user', user);
    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper" id="clientget">
                                <div className="gutter pull-left">
                                    <h3>All Clients</h3>
                                    <p>list of all Clients</p>
                                </div>
                                <div className="gutter pull-left">
                                    <Link to="/admin/clients/add_client">
                                        <button className="button small primary" type="button">
                                            Add Client
                                        </button>
                                    </Link>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <div className="input_group">
                                    <select name="" id="" className="input">
                                        <option value="">status</option>
                                        <option value="">active</option>
                                        <option value="">banned</option>
                                        <option value="">trashed</option>
                                    </select>
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="Created At" />
                                    <span className="highlight"></span>
                                </div>
                                <div className="input_group pull-right" style={{ maxWidth: '20%' }}>
                                    <input type="text" className="input" placeholder="search here.." />
                                    <span className="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="gutter">
                            <table className="table-responsive ultra_responsive">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Created at</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody id="post_container">
                                    {user.slice(startIndex, endIndex).map((client, index) => (
                                        <tr className="wrapper" key={index} id={`tr_post_${client.id}`}>
                                            <td>
                                                <div className="content">
                                                    <Link to={`/admin/clients/edit_client/${client.id}`}>
                                                        <span className="title">{client.name}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="content">
                                                    <Link to={`/admin/clients/edit_client/${client.id}`}>
                                                        <span className="title">{client.email}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>{client.createdAt}</td>
                                            <td>admin</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ReactPaginate
                                pageCount={Math.ceil(count / itemsPerPage)}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={3}
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination justify-content-center py-3'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Clients;
