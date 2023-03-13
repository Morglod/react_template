// headers: makeFetchHeaders((h) => {
//     h.append("Accept", "application/json");
//     h.append("Content-Type", "application/json");
// }),

export const makeFetchHeaders = (factory: (h: Headers) => void) => {
    const h = new Headers();
    factory(h);
    return h;
};
