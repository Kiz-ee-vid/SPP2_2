export const tryJsonParse = (object: any, def: any) => {
    try {
        return JSON.parse(object);
    } catch (e: any) {
        return def;
    }
}
