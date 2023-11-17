import React from 'react'
import DashBoard from '../../shared/DashBoard'
export default function Loader() {
    return (
        <DashBoard content={
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                </div>
            </div>

        } />

    )
}
