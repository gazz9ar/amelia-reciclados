class Usuario
{    
    
    constructor(id,user,fechaCreacion,fechaNacimiento)
    {
        this.id = parseInt(id);
        this.user = user;        
        this.fechaCreacion = new Date(fechaCreacion);
        this.fechaNacimiento =  new Date(fechaNacimiento);

        // propiedades utiles para devolver la edad
        this.Year = new Date().getFullYear();
        this.Month = new Date().getMonth();
        this.day = new Date().getDay();
    }
    get edad()
    {
        //primero pregunto si el mes es mayor
        if (this.Month > this.fechaNacimiento.getMonth()) {
            return (this.Year - this.fechaNacimiento.getFullYear())
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
    // SIEMPRE CREO UN USUARIO COMPLETO. PUEDE TENER  ESTOS CAMPOS VACIOS
class UsuarioCompleto extends Usuario{

    constructor(nombre,apellido,pais,provincia,telefono)
    {
             
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = pais;
        this.provincia = provincia;
        this.telefono = telefono;
    }   




}