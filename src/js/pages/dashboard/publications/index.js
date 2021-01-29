import React from 'react';
import CreatePublication from '../../../components/publication/create-publication'
import PublicationList from '../../../components/publication/publication-list'

const DashboardPublications = () => {
    return (
        <section className="w-full">
            <div className="common-container" style={{width:'650px',maxWidth:'650px', minWidth:'650px'}}>
                <CreatePublication />
                <PublicationList />
            </div>
        </section>
    );
};

export default DashboardPublications;