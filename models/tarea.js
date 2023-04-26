import { v4 as uuidv4 } from 'uuid';

class Tarea {

    id = '';
    desc = '';
    completado = null;

    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.completado = null;
    }
}

export { Tarea }