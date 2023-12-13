import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EventFormView from '../../../component/event/eventform';
const Type = ({ title }) => {
    const { id, name } = useParams();
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <EventFormView editid={id} />
                </div>
            </div>

        </>
    )
}
export default Type;