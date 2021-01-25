import { Tile } from './Tile';
import { User } from './User';

export class Collection {
    _id: string;
    image: string;
    coverImg: string;
    user: User;
    description: string;
    isInHomepage: boolean;
    lastModified: string;
    level: number;
    allowToInvite: boolean;
    PublishMicrosite: boolean;
    public: boolean;
    archive: [];
    discovered: [];
    shareList: [];
    msite: {};
    tags: [];
    content: string;
    type: string;
    title: string;
    created: string;
    isSticky: false;
    lastModifiedUserId: string;
    things: Tile[];
}
