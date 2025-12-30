import React from "react";
import EventPage from "../../components/routes/EventPage";
import Server from "../../../src/Server";
import Event from "../../models/Event";
import EventDetailPage from "../../components/routes/EventDetailPage";

const events = {
    async index() {

        return <EventPage events={await Server.get('events', async (req) => {
            return (await Event.query().all()).serialize();
        })} />;
    },
    async view() {

        await Server.setAll(async (req) => {

            const { id } = req.params;

            return {
                id,
                'event': (await Event.query().find(id)).serialize()
            };
        });

        return <EventDetailPage id={await Server.get('id')} event={await Server.get('event')} />;
    }
};

export default events;