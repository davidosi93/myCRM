export class Notes {
    title: string;
    text: string;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.text = obj ? obj.text : '';
    }

    public toJSON() {
        return {
            title: this.title,
            text: this.text
        }
    }
}