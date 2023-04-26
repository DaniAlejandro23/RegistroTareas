import { inquirerMenu, 
         pausa, 
         leerImput, 
         listadoTareasBorrar, 
         confirmarSeleccion, 
         checkList } from './helpers/inquirer.js';

import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { Tareas } from './models/tareas.js';
 
const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tarasDB = leerDB();

  if ( tarasDB ) {
    
    tareas.cargarTareasFromArray( tarasDB );

  }

  do {

    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Crear Tarea
        const desc = await leerImput('Descripcion: ');
        //console.log(desc);
        tareas.crearTarea(desc);
        break;
      case '2':
        // Listar Tarea
        tareas.listadoCompleto();
        break;
      case '3':
        // Listar Tareas completadas 
        tareas.listarCompletadasPendientes( true );
        break;
      case '4':
        // Listar Tareas Pendientes 
        tareas.listarCompletadasPendientes( false );
        break;
      case '5':
        // Completar tarea(s) 
        const ids = await checkList( tareas.listadoArr );
        // console.log( ids );
        tareas.toggleCompletadas( ids );       
        
        break;
      case '6':
        // Borrar tarea(s) 
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if ( id !== '0' ){
          const confirmar = await confirmarSeleccion( '¿Esta seguro?' );          
          if (confirmar){
            tareas.borrarTarea( id );
            console.log('Tarea borrada exitosamente');
          }
        }
        break;  
  
    }

    guardarDB( tareas.listadoArr );

    if ( opt !== '0') await pausa();


  } while (opt !== '0');

};
 
main();

