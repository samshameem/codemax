
export class Inventory
{
    id: string;
    name: string;
    model_name: string;
    color: string;
    list: number;
    /**
     * Constructor
     *
     * @param inventory
     */
    constructor(inventory)
    {
        {
            this.id = inventory.id || '';
            this.name = inventory.name || '';
            this.model_name = inventory.model_name || '';
            this.color = inventory.color || '';
            this.list = inventory.list || '';
        }
    }
}
