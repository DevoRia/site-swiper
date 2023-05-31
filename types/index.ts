export type Site = {
    id: string;
    name: string;
    url: string;
};

export type RootStackParamList = {
    Home: undefined;
    Details: { site: Site };
};
