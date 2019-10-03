
export class Model
{
    id: string;
    model_name: string;
    color: string;
    year: string;
    reg_number : string;
    note : string;
    pic_1 : string;
    pic_2 : string;
    manufacturer_id : string;
    /**
     * Constructor
     *
     * @param model
     */
    constructor(model)
    {
        {
            this.id = model.id || '';
            this.model_name = model.model_name || '';
            this.color = model.color || '';
            this.year = model.year || '';
            this.reg_number = model.reg_number || '';
            this.note = model.note || '';
            this.pic_1 = model.pic_1 || '';
            this.pic_2 = model.pic_2 || '';
            this.manufacturer_id = model.manufacturer_id || '';
        }
    }
}
