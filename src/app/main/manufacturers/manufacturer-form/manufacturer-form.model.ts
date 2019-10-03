export class Manufacturer
{
    id: string;
    name: string;

    /**
     * Constructor
     *
     * @param manufacturer
     */
    constructor(manufacturer?)
    {
        manufacturer = manufacturer || {};
        this.id = manufacturer.id || 0;
        this.name = manufacturer.name || '';
    }
}
