export const ACCEPT_CONFIG = {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    video: ['.mp4','mpg','mpeg','avi','3gp'],
    document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
    apk: ['.apk'],
    audio:['.mp3'],
    getvideo(){
        // return [...this.image, ...this.video, ...this.document]
        return [ ...this.video,...this.audio]
    },
    getAudio(){
        return [...this.audio]
    },
    getapk(){
        return [ ...this.apk]
    },

};