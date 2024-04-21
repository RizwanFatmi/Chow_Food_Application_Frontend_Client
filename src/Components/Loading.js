import React from "react";
import BarLoader from 'react-spinners/BarLoader';

export default function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <BarLoader
                color={'#4B92C8'}
                loading={true}
                width={250}
                aria-label="Loading Spinner"
                data-testid="loader"    
            />
        </div>
    );
}
