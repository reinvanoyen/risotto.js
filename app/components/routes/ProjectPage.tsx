import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";
import server from "../../../src/utils/server";

const ProjectPage = () => {
    return (
        <Layout>
            <h1>Projects! {server.get('title')}</h1>
            <Counter />
        </Layout>
    );
};

export default ProjectPage;