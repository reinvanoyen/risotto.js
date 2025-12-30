import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const EventDetailPage = ({event}: any) => {
    return (
        <Layout>
            <h1>{event.title}</h1>
            <Counter />
            <Counter />
            <Counter />
        </Layout>
    );
};

export default EventDetailPage;