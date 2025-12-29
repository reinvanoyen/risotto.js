import { type DataProperties, Model, type ResponseModelInterface } from '@littlemissrobot/jsonapi-client';

export default class Event extends Model {

    public id!: string;
    public title!: string;

    /**
     * @protected
     */
    protected static endpoint: string = 'api/event';

    /**
     * @protected
     */
    protected static include = [
        'hero_image',
        'event_type',
        'components',
        'components.image',
        'components.images',
        'components.items',
        'components.video',
        'components.video.media_video',
        'components.video.thumbnail',
        'footer_components',
        'footer_components.image',
        'footer_components.pages',
        'footer_components.collections',
        'footer_components.pages',
        'footer_components.manual_cards',
        'footer_components.research',
        'footer_components.research.research_type',
        'footer_components.locations',
        'footer_components.events',
        'footer_components.events.event_type',
        'footer_components.image',
    ];

    /**
     * Override the default gate to only include events that have a title
     * @param responseModel
     */
    public static gate(responseModel: ResponseModelInterface): boolean {
        return responseModel.get('title', false);
    }

    /**
     * Tell the model how to map from the response data
     * @param response
     */
    async map(response: ResponseModelInterface): Promise<DataProperties<Event>> {
        return {
            id: response.get('id', ''),
            title: response.get('title', ''),
        };
    }
}