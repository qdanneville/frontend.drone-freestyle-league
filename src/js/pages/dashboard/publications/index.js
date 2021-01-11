import React from 'react';
import CreatePublication from '../../../components/publication/create-publication'

const DashboardPublications = () => {
    return (
        <section className="w-full">
            <div className="common-container">
                <CreatePublication />
            </div>
        </section>
    );
};

export default DashboardPublications;