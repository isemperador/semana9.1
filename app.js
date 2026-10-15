const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const teclado = readline.createInterface({
    input,
    output
});

let estudiantes = [];
let siguienteId = 1;

// CREATE: Registrar un estudiante
function crearEstudiante(nombre) {
    const nuevoEstudiante = {
        id: siguienteId,
        nombre: nombre
    };
    estudiantes.push(nuevoEstudiante);
    siguienteId++;
    console.log("Estudiante registrado correctamente.");
}

// READ (General): Listar todos los estudiantes
function listarEstudiantes() {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }
    console.log("\n--- LISTA DE ESTUDIANTES ---");
    estudiantes.forEach(est => {
        console.log(`ID: ${est.id} | Nombre: ${est.nombre}`);
    });
}

// READ (Específico): Mostrar un estudiante por su ID
function buscarEstudiantePorId(id) {
    const estudiante = estudiantes.find(e => e.id === id);
    if (estudiante) {
        console.log("\n--- ESTUDIANTE ENCONTRADO ---");
        console.log(`ID: ${estudiante.id}`);
        console.log(`Nombre: ${estudiante.nombre}`);
        return estudiante;
    } else {
        console.log("No se encontró ningún estudiante con ese ID.");
        return null;
    }
}

// UPDATE: Actualizar / Corregir el nombre de un estudiante
function actualizarEstudiante(id, nuevoNombre) {
    const estudiante = estudiantes.find(e => e.id === id);
    if (estudiante) {
        estudiante.nombre = nuevoNombre;
        console.log("¡Nombre del estudiante corregido correctamente!");
    } else {
        console.log("No se encontró el estudiante con ese ID.");
    }
}

// DELETE: Eliminar un estudiante
function eliminarEstudiantes(id) {
    const cantidadAnterior = estudiantes.length;
    // CONSERVEMOS A TODOS MENOS AL ESTUDIANTE CON ESE ID
    estudiantes = estudiantes.filter(function(e) {
        return e.id !== id;
    });
    
    if (estudiantes.length < cantidadAnterior) {
        console.log("Estudiante Eliminado");
    } else {
        console.log("No se encontró el estudiante");
    }
}

// MENU PRINCIPAL DEL PROYECTO
async function menu() {
    let salir = false;
    while (!salir) {
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("1. Registrar estudiante");
        console.log("2. Listar todos los estudiantes");
        console.log("3. Buscar estudiante por ID (READ específico)");
        console.log("4. Buscar y corregir nombre de estudiante");
        console.log("5. Eliminar estudiante");
        console.log("6. Salir");
        
        const opcion = await teclado.question("Elige una opcion: ");

        switch (opcion.trim()) {
            case "1":
                const nombre = await teclado.question("Ingresa el nombre del estudiante: ");
                crearEstudiante(nombre.trim());
                break;
            case "2":
                listarEstudiantes();
                break;
            case "3":
                listarEstudiantes();
                if (estudiantes.length > 0) {
                    const idBusqStr = await teclado.question("Ingresa el ID del estudiante que deseas buscar: ");
                    buscarEstudiantePorId(Number(idBusqStr.trim()));
                }
                break;
            case "4":
                listarEstudiantes();
                if (estudiantes.length > 0) {
                    const idActStr = await teclado.question("Ingresa el ID del estudiante a corregir: ");
                    const idNum = Number(idActStr.trim());
                    // Primero hacemos READ para mostrar al estudiante antes de corregirlo
                    const encontrado = buscarEstudiantePorId(idNum);
                    if (encontrado) {
                        const nuevoNom = await teclado.question("Ingresa el nuevo nombre corregido: ");
                        actualizarEstudiante(idNum, nuevoNom.trim());
                    }
                }
                break;
            case "5":
                listarEstudiantes();
                if (estudiantes.length > 0) {
                    const idDelStr = await teclado.question("Ingresa el ID del estudiante a eliminar: ");
                    eliminarEstudiantes(Number(idDelStr.trim()));
                }
                break;
            case "6":
                salir = true;
                console.log("Saliendo...");
                break;
            default:
                console.log("Opcion no valida.");
                break;
        }
    }
    teclado.close();
}

menu();