//  =============
//  EcmaScript5
//  =============
// function Producto(id,nombre,precio,cantidad,fecha) {
    
//     this.id = id,
//     this.nombre = nombre,
//     this.precio = precio,
//     this.cantidad = cantidad,
//     this.fecha = fecha;
//     this.vendido = false;
//     this.agregarCant = function(cant) 
//     {
//         
//     }
// }

//  =============
//  EcmaScript6
//  =============

class Producto
{
    constructor(id,nombre,precio,cantidad,fecha,url,description){

     this.id = parseInt(id),
     this.nombre = nombre,
     this.precio = parseFloat(precio),
     this.cantidad = parseInt(cantidad),
     this.fecha = fecha;
     this.imgUrl = url;
     this.description = description;
     this.vendido = false;

    }

    
    descuento(porcentaje)
    {
        this.precio = this.precio * (porcentaje / 100)
    }
    agregarCant (cant) 
    {
        this.cantidad += cant;
    }

    restarCant(cant)
    {
        if (cant >= this.cantidad) {
            
            this.cantidad = 0;
        }
        else {
            this.cantidad -= cant;
        }
        
    }
    static dynamicSort(property) {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */            
            if (property == 'fecha') {
                let result = ( b[property] <  a[property]) ? -1 : ( b[property >  a[property] ]) ? 1 : 0;
                return result;
            }
            else {
                let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
           
        }
    }

}


class Pago 
{
    constructor(id,total,urlPago,userEmail,fecha)
    {
        this.id = id;
        this.total = total;
        this.urlPago = urlPago;
        this.userEmail = userEmail;     
       

        this.fecha = fecha;
    }
    
}




const guardarLocal = (clave,valor) => {

    localStorage.setItem(clave,valor);

}



