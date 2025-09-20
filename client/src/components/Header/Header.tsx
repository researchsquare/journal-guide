import React from 'react';
// import NavBar from '@/src/components/NavBar/NavBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {

  return (
    <>
      <div className="container-fluid shadow py-2">
        <div className="row">
          <h1 className="font-bold col-1 me-2 pb-2">JournalGuide</h1>
          <div className ="col d-flex justify-content-end mt-2">
            <FontAwesomeIcon icon={['fas', 'circle-user']} size='2xl' />
          </div>
        </div>
      </div>
      {/* <NavBar title="Journal Guide" /> */}
    </>
  );
};

export default Header;
