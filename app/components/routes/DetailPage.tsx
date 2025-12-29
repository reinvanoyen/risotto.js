import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const DetailPage = ({ id }: { id?: string }) => {
    return (
        <Layout>
            <h1>{id}</h1>
            <Counter />
        </Layout>
    );
};

export default DetailPage;