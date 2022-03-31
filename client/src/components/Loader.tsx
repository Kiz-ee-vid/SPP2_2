import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="d-flex justify-content-center m-3">
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div></div>
    );
};

export default Loader;
