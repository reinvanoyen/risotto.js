import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";
import Server from "../../../src/Server";

const ProjectPage = () => {
    return (
        <Layout>
            <h1>Projects! {Server.get('title')}</h1>
            <Counter />
        </Layout>
    );
};

export default ProjectPage;