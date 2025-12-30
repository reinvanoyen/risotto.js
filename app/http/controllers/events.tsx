
import React from "react";
import EventPage from "../../components/routes/EventPage";
import Server from "../../../src/Server";
import Event from "../../models/Event";
import EventDetailPage from "../../components/routes/EventDetailPage";

const events = {
    async index() {

        await Server.set(async () => ({
            'events': (await Event.query().all()).serialize()
        }));

        return <EventPage events={Server.get('events')} />;
    },
    async view() {

        await Server.set(async (req) => {

            const { id } = req.params;

            return {
                id,
                'event': (await Event.query().find(id)).serialize()
            };
        });

        return <EventDetailPage />;
    }
};

export default events;