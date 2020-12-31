export interface EmbedInterface {
    author?: {
        name: string;
        // eslint-disable-next-line camelcase
        icon_url?: string;
    }

    /**
     * The embed title.
     */
    title?: string;

    /**
     * The embed description.
     */
    description?: string;

    /**
     * The embed color.
     */
    color?: number;

    /**
     * The embed fields, if any.
     */
    fields?: Array<{ name: string, value: string, inline?: boolean }>;

    /**
     * The embed url.
     */
    url?: string;
}
