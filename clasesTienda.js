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

export class Producto
{
    constructor(id,nombre,precio,cantidad,fecha){

     this.id = parseInt(id),
     this.nombre = nombre,
     this.precio = parseFloat(precio),
     this.cantidad = parseInt(cantidad),
     this.fecha = Date.parse(fecha);
     this.vendido = false;

    }

    get totalDisponibleEnDinero(){
        return this.precio * this.cantidad;
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

}


export class Usuario
{    
    
    constructor(id,nombre,fechaCreacion,fechaNacimiento)
    {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.fechaCreacion = new Date(fechaCreacion);
        this.fechaNacimiento =  new Date(fechaNacimiento);
        this.Year = new Date().getFullYear();
        this.Month = new Date().getMonth();
        this.day = new Date().getDay();
    }
    get edad()
    {
        //primero pregunto si el mes es mayor
        if (this.Month > this.fechaNacimiento.getMonth()) {
            return (this.Year - this.fechaNacimiento.getFullYear()  )
        }else if(this.Month == this.fechaNacimiento.getMonth()){

            if (this.day >= this.fechaNacimiento.getDay()) {
                return (this.Year - this.fechaNacimiento.getFullYear()  );
            }
            else {
                return (this.Year - this.fechaNacimiento.getFullYear() - 1 );
            }            
            
        } else {

            return (this.Year - this.fechaNacimiento.getFullYear() - 1 );
        }
     }
        

}




