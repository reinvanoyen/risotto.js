import React from "react";
import Layout from "../Layout";
import Counter from "../ui/Counter";

const EventPage = ({ events }: { events: any[] }) => {
    return (
        <Layout>
            <h1>Events!</h1>
            <ul>
                {events.map((event) => {
                    return (
                        <li key={event.id}>
                            <a href={`events/${event.id}`} title={event.title}>
                                {event.title}
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

export default EventPage;