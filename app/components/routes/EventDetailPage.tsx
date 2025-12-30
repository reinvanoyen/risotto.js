import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";
import Server from "../../../src/Server";

const EventDetailPage = () => {

    const id = Server.get('id');
    const event = Server.get('event');

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