export default interface SetlistSong {
    id: number,
    name : string,
    visible: boolean,
    artist? : string,
    language? : 'en' | 'jp'
}