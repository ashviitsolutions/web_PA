import React, { useState, useEffect } from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IP } from "../../../Constant";
import { useNavigate } from "react-router-dom";

const Provider = (props) => {
    let token = localStorage.getItem("tokenadmin");
    const [providers, setProviders] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null); // State to track the selected provider

    useEffect(() => {
        // Fetch providers from the server
        fetchProviders();
    }, [pageNumber]);

    const fetchProviders = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${IP}/contractor/get?page=${pageNumber}&limit=10`, {
                headers: {
                    'Authorization': token
                }
            });
            const result = await response.json();
            if (result.msg) {
                // Handle the case where no providers are found
                console.log(result.msg);
            } else {
                setProviders(prevData => {
                    // Check for duplicates and concatenate only unique entries
                    const newData = result.filter(newItem => !prevData.some(oldItem => oldItem._id === newItem._id));
                    return [...prevData, ...newData];
                });
            }
        } catch (error) {
            console.error("Error fetching providers:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        // Filter providers based on the search input
        const filtered = providers.filter(provider =>
            provider.first_name.toLowerCase().includes(searchText.toLowerCase()) || provider.last_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProviders(filtered);
    }, [providers, searchText]);

    const handleProviderSelection = (provider) => {
        // Set the selected provider
        setSelectedProvider(provider);
    };

    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Select provider</Modal.Title>
            </Modal.Header>
            <Modal.Body onScroll={handleInfiniteScroll}>
                <Row>
                    <div className="col-12" style={{ alignSelf: 'center' }}>
                        <input
                            type="text"
                            className="form-control"
                            id="hr"
                            placeholder="Search for provider"
                            value={selectedProvider ? `${selectedProvider.first_name} ${selectedProvider.last_name}` : searchText} // Display selected provider's name if available, else display search text
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </Row>
                <Row>
                    {/* Display filtered providers */}
                    {filteredProviders.map(provider => (
                        <div key={provider.id} className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{`${provider.first_name} ${provider.last_name}`}</h5>
                                    <p className="card-text">{provider?.mailing_address?.address}</p>
                                    <Button className="mx-2 btn-sm" onClick={() => handleProviderSelection(provider)}>Select</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </Row>
                {loading && <div>Loading...</div>}
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
                <Button>Assign Event</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Provider;
