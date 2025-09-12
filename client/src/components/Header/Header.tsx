import React from 'react';
import NavBar from '@/src/components/NavBar/NavBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <>
    <div className="container-fluid shadow pt-2">
          <div className="row">
            <h1 className="font-bold col-1 me-4">AJE</h1>
            <div className="col d-flex justify-content-center ms-5">
              <input type="search" placeholder="Search Journal" aria-label="Search" size={100}/>
                <button className="btn btn-outline-secondary" type="button">
    <FontAwesomeIcon icon={['fas', 'search']} />
  </button>
            </div>
            <div className ="col d-flex justify-content-end mt-2">
            <FontAwesomeIcon icon={['fas', 'circle-user']} size='2xl' />
            </div>
            <div />
            </div>
    </div>
      <NavBar title="Journal Guide" />
    </>
  );
}
export default Header;