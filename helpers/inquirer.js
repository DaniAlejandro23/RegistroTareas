import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value : '1',
                name : `${'1.'.green} Crear tarea`
            },
            {
                value : '2',
                name : `${'2.'.green} Listar tarea`
            },
            {
                value : '3',
                name : `${'3.'.green} Listar tarea completada`
            },
            {
                value : '4',
                name : `${'4.'.green} Listar tarea pendiente`
            },
            {
                value : '5',
                name : `${'5.'.green} Completar tarea(s)`
            },
            {
                value : '6',
                name : `${'6.'.green} Eliminar tarea(s)`
            },
            {
                value : '0',
                name : `${'0.'.green} Salir`
            }
          ],
    },
];

const inquirerMenu = async () => {

    console.clear();

    console.log("===================================".green);
    console.log("       Seleccione una opcion       ".white);
    console.log("===================================".green);

    const { opcion } = await inquirer.prompt( preguntas );
    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type : 'input',
            name : 'enter',
            message: `Presiona ${'ENTER'.green} para continuar`
        },
    ];

    console.log('\n');
    await inquirer.prompt( question );
}

const leerImput = async( message ) => {

    const questions = [
        {
            type : 'input', 
            name : 'desc',
            message,
            validate ( value ) {
                if ( value.length === 0 ){
                    return 'Porfavor ingresar un mensaje'
                }
                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(questions)
    return desc;
}

const listadoTareasBorrar = async ( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const indice = `${ i + 1 }.`.green;

        return {
            value: tarea.id,
            name :  `${ indice } ${tarea.desc}`
        }
    });

    choices.push({
        value : '0',
        name: '0. '.green + 'Salir'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message : 'Borrar Tarea',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;

}

const confirmarSeleccion = async (message) => {
    
    const question = [
        {
            type : 'confirm',
            name : 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const checkList = async ( tareas = []) => {

    const choices = tareas.map( tarea => {

        return {
            value: tarea.id,
            name :  `${tarea.desc}`,
            checked : ( tarea.completado ) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message : 'Modificar estado',
            choices
        }
    ]

    
    const { ids } = await inquirer.prompt(question);
    return ids;

}

export { inquirerMenu,
         pausa,
         leerImput, 
         listadoTareasBorrar, 
         confirmarSeleccion, 
         checkList }


