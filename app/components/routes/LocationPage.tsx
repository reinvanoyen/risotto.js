import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const LocationPage = ({ locations }: { locations: any[] }) => {
    return (
        <Layout>
            <h1>Locations</h1>
            <ul>
                {locations.map((location) => {
                    return (
                        <li key={location.id}>
                            <a href={`locations/${location.id}`} title={location.title}>
                                {location.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <Counter />
            <Counter />
            <Counter />
        </Layout>
    );
};

export default LocationPage;