
export class Manufacturer
{
    id: string;
    name: string;
    /**
     * Constructor
     *
     * @param manufacturer
     */
    constructor(manufacturer)
    {
        {
            this.id = manufacturer.id || '';
            this.name = manufacturer.name || '';
        }
    }
}
