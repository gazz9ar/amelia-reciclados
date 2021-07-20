

/* INICIALIZO variable de firebase */
const db = firebase.firestore();



/* INICIALIZO EL OBJETO "BLOG" */
const blog = {};

let id = '';

const tablaBlogs = document.getElementById('tabla');
/* CAPTURO EL FORMULARIO */
const blogForm = document.getElementById('blog-form');

const addBlog = document.getElementById('addBlog');

const modalVistaPrevia = document.getElementById('modalBlogbody');

const modalNuevo = document.getElementById('modalNuevoBlog');


let editStatus = false;



/* FUNCION PARA AGREGAR NUEVO BLOG */
const saveBlog = (blog) => {
  /* agrego un nuevo blog (si no existe la colleccion "blogs" crea una nueva) */
  db.collection('blogs').doc().set(blog);
}

/* FUNCION PARA OBTENER COLECCION DE BLOGS  */

const getBlogs = () => {

  const collection = db.collection('blogs');  
    return collection.get(); 

}



/* FUNCION PARA 1 BLOG  */

const getBlog = (id) => {

      const collection = db.collection('blogs');

      return collection.doc(id).get();
  

}


/* FUNCION PARA OBTENER COLECCION DE BLOGS CADA VEZ QUE SE ACTUALICE */

const ongetBlogs = (callback) => {

  const blogsCollection = db.collection('blogs');

  blogsCollection.onSnapshot(callback);
  

}


// const deleteBlog = (id) => {

//   db.collection('blogs').doc(id).delete();
// }

/* FUNCION PARA ELIMINAR BLOG */
const deleteBlog = (id) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      db.collection('blogs').doc(id).delete();
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })

}


/* FUNCION PARA ACTUALIZAR BLOG */
const updateBlog = (id,updatedBlog) => {

  db.collection('blogs').doc(id).update(updatedBlog);
}


/*  CARGA AUTOMATICA DE TABLA DE BLOGS // EDIT  // DELETE */
window.addEventListener('DOMContentLoaded', async (e) => {

   

  ongetBlogs((querySnapshot) => {

           
      tabla.innerHTML = `
      
      
                    <table class="table table-striped table-hover" id="tabla">
                    <caption>Lista de blogs subidos</caption>
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Titulo</th>
                            <th class="text-center">Fecha</th>
                            <th class="text-center">Descripcion</th>
                            <th class="text-center">Editar</th>
                            <th class="text-center">Vista Previa</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                    </tbody>
                    </table>
      
      `

    querySnapshot.forEach(doc => {

      const blog = doc.data(); 
      blog.id = doc.id; 
     
     tabla.innerHTML += `   
            <tr>      
              <td class="text-center">${blog.id}</td>
            <td class="text-center">${blog.title}</td>
              <td class="text-center">${blog.date}</td>
            <td class="text-center">${blog.description}</td>                                
              <td class="text-center">
                  <i  class="bi bi-pencil-fill btn-edit" data-id="${blog.id}" style="font-size: 2rem; color: black;cursor: pointer;">
                  </i>
                  <i  class="bi bi-x-square btn-delete" data-id="${blog.id}" style="font-size: 2rem; color: red; cursor: pointer;">
                  </i>

              </td>
              <td class="text-center">
              <button type="button " class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#modalBlog">
              Vista Previa
              </button>   
              </td>
              </tr>

                  
                `;



          /* CAPTUIRO LOS BOTONES DELETE*/ 
        const btnDelete = document.querySelectorAll('.btn-delete');

        btnDelete.forEach((btn)=> {

          btn.addEventListener('click', async (e) =>{

           await deleteBlog(e.target.dataset.id);
            
          })
        })

        const btnEdit = document.querySelectorAll('.btn-edit');

        btnEdit.forEach((btn) =>{
          
          btn.addEventListener('click', async (e) => {

            
              /* OBTENGO EL DOCUMENTO DE FIREBASE CON X ID */
              const doc = await getBlog(e.target.dataset.id);             

              /* MUESTRO EL MODAL, USANDO UN METODO DE BOOTSRAP */
              const modalNuevo =  new bootstrap.Modal(document.getElementById('modalNuevoBlog'))
              modalNuevo.show();

              blogForm['btn-task-form'].innerHTML = 'Actualizar';
              editStatus = true;
              id = doc.id;

              /* RELLENO LOS VALORES DEL MODAL ABIERTO CON EL OBJETO A EDITAR */
              blogForm['blog-title'].value = doc.data().title
              blogForm['blog-description'].value = doc.data().description

              
              

          })
        })

        

    });
  })

  

});


/* BOTON VISTA PREVIA  */
modalVistaPrevia.addEventListener( 'DOMContentLoaded', async (e) => {


  const querySnapshot = await getBlogs();

  console.log(querySnapshot.data())

  querySnapshot.data().forEach();

  modalVistaPrevia.innerHTML = `
      <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="modalBlogLabel">${querySnapshot.data().title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- CUERPO DEL MODAL -->
          <div class="modal-body">

              <h2>${querySnapshot.data().title}</h2>
              <span class="text-secondary">${querySnapshot.data().date}</span>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iure voluptate quis delectus
                  corrupti fugiat ad? Aliquam excepturi quidem odio quibusdam architecto ipsam animi dignissimos
                  repellat magni. Animi, asperiores dolor?</p>

              <!-- CAROUSEL -->
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                          class="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                          aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                          aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">
                      <div class="carousel-item active">
                          <img src="./images/gallery/beautiful-shot-of-modern-house-kitchen-and-dining-room.jpg"
                              class="d-block w-50 m-auto" alt="...">
                      </div>
                      <div class="carousel-item">
                          <img src="./images/gallery/before-1.jpg" class="d-block w-50 m-auto" alt="...">
                      </div>
                      <div class="carousel-item">
                          <img src="./images/gallery/hairdresser-cut-hair-her-client-in-hair-salon.jpg"
                              class="d-block w-50 m-auto" alt="...">
                      </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                  </button>
              </div>

          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

          </div>
      </div>
  </div>
      
      
      
      `;
});




 /*  BOTON GUARDAR */
blogForm.addEventListener('submit', async (e) => {

  e.preventDefault();

  
  /*CAPTURO LOS INPUT*/
  const title_input = blogForm['blog-title'];


  /* ASIGNO LOS VALORES DEL INPUT AL OBJETO */
  blog.title = blogForm['blog-title'].value;
  blog.description = blogForm['blog-description'].value;
  blog.id = id;

  if (!editStatus)
  {
    await saveBlog(blog);

    blogForm.reset();
    Swal.fire(
      'Buen trabajo!',
      'El blog ha sido creado',
      'success'
    )
  }
  else 
  {
    await updateBlog(id,blog);
    editStatus = false;
    blogForm['btn-task-form'].innerHTML = 'Guardar';


    /* CERRAR FORM*/     
    var myModal = new bootstrap.Modal(document.getElementById('modalNuevoBlog'))
    blogForm.reset();
    myModal.hide();
      
        Swal.fire(
          'Buen trabajo!',
          'El blog ha sido modificado',
          'success'
        )
      

      
  }

  
  
 

  

  


});



/*  BOTON Añadir Blog */
addBlog.addEventListener('click', (e) =>{

  editStatus = false;
  blogForm['btn-task-form'].innerHTML = 'Guardar';
  blogForm.reset();

})








































