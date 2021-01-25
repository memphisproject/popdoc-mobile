export class User {
    _id: string;
    role: string;
    email: string;
    name: string;
    userInfo: {
        image: string;
        tagline: string;
        bio: string;
        location: string;
        interests: string;
        selectedMicrosite: string;
    };
    msite: {banner: string};
    token: string;
    lastVisit: string;
}
