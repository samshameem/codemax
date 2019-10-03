export class Model
{
    id: string;
    manufacturer_id: string;
    model_name: string;
    color: string;
    year: number;
    reg_number: string;
    note: string;
    pic_1: FileList | null;
    pic_2: FileList | null;

    /**
     * Constructor
     *
     * @param model
     */
    constructor(model?)
    {
        model = model || {};
        this.id = model.id || 0;
        this.manufacturer_id = model.manufacturer_id || '';
        this.model_name = model.model_name || '';
        this.color = model.color || '';
        this.year = model.year || 0;
        this.reg_number = model.reg_number || '';
        this.note = model.note || '';
        this.pic_1 = model.pic_1 || '';
        this.pic_2 = model.pic_2 || '';
    }
}
