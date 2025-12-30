import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";
import Server from "../../../src/Server";

const EventDetailPage = () => {

    const location = Server.get('location');

    return (
        <Layout>
            <h1>{location.title}</h1>
            <Counter />
            <Counter />
            <Counter />
        </Layout>
    );
};

export default EventDetailPage;