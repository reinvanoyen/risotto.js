import React from "react";
import EventPage from "../../components/routes/EventPage";
import Server from "../../../src/Server";
import Event from "../../models/Event";
import EventDetailPage from "../../components/routes/EventDetailPage";

const events = {
    async index() {

        await Server.set('events', async (req) => {
            return (await Event.query().all()).serialize();
        });

        return <EventPage events={await Server.get('events')} />;
    },
    async view() {

        await Server.set('event', async (req) => {
            return (await Event.query().find(req.params.id)).serialize();
        });

        return <EventDetailPage event={await Server.get('event')} />;
    }
};

export default events;