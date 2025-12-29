import { DataProperties, Model, ResponseModelInterface } from '@littlemissrobot/jsonapi-client';

export default class Location extends Model {
    public id!: string;
    public title!: string;

    /**
     * @protected
     */
    protected static endpoint: string = 'api/location';

    /**
     * @protected
     */
    protected static include = [
        'hero_image',
        'components',
        'components.images',
        'components.video',
        'components.video.media_video',
        'components.video.thumbnail',
        'components.locations',
        'components.events',
        'components.events.event_type',
        'components.stories',
        'components.collections',
        'components.tiles',
        'components.items',
        'components.image',
        'components.news',
        'components.pages',
        'components.manual_cards',
        'components.research',
        'components.research.research_type',
        'components.research.tool_type',
        'components.research.tool_access',
        'components.research.tool_theme',
        'components.research.research_label',
        'components.media',
        'footer_components',
        'footer_components.pages',
        'footer_components.collections',
        'footer_components.manual_cards',
        'footer_components.research',
        'footer_components.research.research_type',
        'footer_components.locations',
        'footer_components.events',
        'footer_components.events.event_type',
        'footer_components.image',
    ];

    // Tell the model how to map from the response data
    async map(response: ResponseModelInterface): Promise<DataProperties<Location>> {

        return {
            id: response.get<string>('id', ''),
            title: response.get<string>('title', ''),
        };
    }
}
