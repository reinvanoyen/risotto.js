import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const EventDetailPage = ({id, event}: any) => {
    return (
        <Layout>
            <h1>{event.title}</h1>
            <h2>{id}</h2>
            <Counter />
            <Counter />
            <Counter />
        </Layout>
    );
};

export default EventDetailPage;