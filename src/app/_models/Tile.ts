export class Tile {
    _id: string;
    title: string;
    belongsTo: string;
    author: {
        lastVisit: string;
        name: string;
        role: string;
        email: string;
        _id: string
    };
    user: string;
    accessDropboxToken: string;
    lastModified: string;
    level: string;
    meta: {
        content: string;
        hashTags: [];
        description: string;
        preview: string;
        secretName: string;
    };
    letterId: string;
    htmlContent: string;
    metaId: string;
    quantityMessageByTile: number;
    type: string;
    froala: boolean;
    completePath: boolean;
    created: string;
    storyNav: {
        up: number;
        down: number;
        right: number;
        left: number;
    };
}
