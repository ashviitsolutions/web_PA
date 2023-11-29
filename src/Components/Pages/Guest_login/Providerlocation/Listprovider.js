import React, { useState } from 'react';
import "./Listprovider.css"

import providerimage from "../../../assets/img/43547063_s.jpg"

function Listprovider() {
    // Sample list of providers
    const providerList = [
        {
            id: 1,
            image: 'provider1.jpg',
            title: 'Provider 1',
            description: 'Description for Provider 1',
            rating: 4.5,
        },
        {
            id: 2,
            image: 'provider2.jpg',
            title: 'Provider 2',
            description: 'Description for Provider 2',
            rating: 3.8,
        },
        // Add more providers as needed
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProviders, setFilteredProviders] = useState(providerList);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = providerList.filter((provider) =>
            provider.title.toLowerCase().includes(term)
        );

        setFilteredProviders(filtered);
    };

    return (
        <div className='provider-list-container'>
            {/* Search Bar */}
            <div className='search_bar_Listprovider'>
                <input
                    type="text"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Provider List */}

            <div className='Provider_List'>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                        <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                         <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
                <div className='provider_card'>
                    <div className='image'>
                        <img src={providerimage} alt='...' />
                    </div>
                    <div className='content'>
                        <h3>Spa center</h3>
                        <p><strong>4.5★</strong></p>
                    </div>
                    <div className='decription'>
                        <p>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Eligendi earum ab est ipsa impedit qui,
                        </p>
                    </div>
                    <div className='Listprovider_button'>
                        <button className='button'>Select</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Listprovider;
