let provincias = '';
const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias';


$.get(urlProvincias,(respuesta, estado) => {

    if (estado == 'success') {

        provincias = respuesta.provincias.sort(Producto.dynamicSort('nombre'));           

        for (const provincia of provincias) {

            $(`#provincias-dropdown`).append(`
            
            <option>${provincia.nombre}</option> 

            `);
        }
    }
});