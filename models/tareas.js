import { Tarea } from './tarea.js'

class Tareas{

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( keys => {
            const tarea = this._listado[keys];
            listado.push( tarea );
        })
        return listado
    }

    constructor(){
        this._listado = {}; 
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea( id = '' ){

        if(this._listado[id]){
            delete this._listado[id];

        };
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){

        this.listadoArr.forEach( (tarea, index) => {

            const id = `${index + 1}.`.green;
            const { desc, completado } = tarea
            const estado = ( completado ) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            
            console.log(`\n ${ id } ${ desc } :: ${ estado }`);
                                
        });
    }

    listarCompletadasPendientes(completadas = true ){

        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completado } = tarea
            const estado = ( completado ) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            
            if (completadas){

                if( completado ){
                    contador += 1; 
                    console.log(`\n ${ (contador + '.').green } ${ desc } :: ${ completado }`);
                };

            }else{

                if(!completado){

                    contador += 1;
                    console.log(`\n ${ (contador + '.').green } ${ desc } :: ${ estado }`);

                };
            };               
        });
    }

    toggleCompletadas ( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completado ){
                tarea.completado = new Date().toDateString();
            } 
            
            
        });
        
        this.listadoArr.forEach( tarea => {
    
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completado = null;
            }
        });
    } 
};

export { Tareas }