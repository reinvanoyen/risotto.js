import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const Homepage = () => {
    return (
        <Layout>
            <h1>Welcome!</h1>
            <Counter />
        </Layout>
    );
};

export default Homepage;