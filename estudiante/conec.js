import {
    obtenerPersona, 
    guardarPersona, 
    eliminaPersona, 
    obtenerPersonaXid,
    actualizarPersona, 
  } from "./grabaestudiante.js";
  
  const personaForm = document.getElementById("form-firebase");
  const personaContenido = document.getElementById("persona");
  
  let editarPersona = false;
  let id = "";
  
 
  window.addEventListener("DOMContentLoaded", async (e) => {
    obtenerPersona((querySnapshot) => {
      personaContenido.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const personaInfo = doc.data();
  
       personaContenido.innerHTML += `
       <link rel="stylesheet" type="text/css" href="../login/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
         <link rel="stylesheet" href="../css/tabla.css">
       <div class="site-wrap">
       <table align="center" border='1' id="customers">
           <thead>
           <tr align="center">
                   <th>Paterno</th>
                   <th>Materno</th>
                   <th>Nombre</th>
                   <th>Fecha</th>
                   <th>Direccion</th>
                   <th>Telefono</th>
                   <th>Email</th>
                   <th>Genero</th>
               </tr></thead>
               <tbody id="myTable">
               <tr align='center'>
               <td>${personaInfo.appa}</td>
            <td>${personaInfo.apma}</td>
          <td>${personaInfo.nombre}</td>
          <td>${personaInfo.fecha}</td>
          <td>${personaInfo.dir}</td>
          <td>${personaInfo.tel}</td>
          <td>${personaInfo.email}</td>
          <td>${personaInfo.genero}</td>
          <td><button class="btn btn-primary btn-eliminar" data-id="${doc.id}">
              Eliminar
            </button></td>
            <td><button class="btn btn-secondary btn-actualizar" data-id="${doc.id}">
              Actualizar
            </button></td>
          </div>
        </div>`;
      });
  
      const btnsEliminar = personaContenido.querySelectorAll(".btn-eliminar");
      btnsEliminar.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await eliminaPersona(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEditar = personaContenido.querySelectorAll(".btn-actualizar");
      btnsEditar.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await obtenerPersonaXid(e.target.dataset.id);
            const personaInfo = doc.data();
            
            personaForm["appa"].value = personaInfo.appa;
            personaForm["apma"].value = personaInfo.apma;
            personaForm["nombre"].value = personaInfo.nombre;
            personaForm["fecha"].value = personaInfo.fecha;
            personaForm["dir"].value = personaInfo.dir;
            personaForm["tel"].value = personaInfo.tel;
            personaForm["email"].value = personaInfo.email;
            personaForm["genero"].value = personaInfo.genero;
            editarPersona = true;
            id = doc.id;
            personaForm["btn-form-firebase"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  personaForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 
  
    
    const appa = personaForm["appa"];
    const apma = personaForm["apma"];
    const nombre = personaForm["nombre"];
    const fecha = personaForm["fecha"];
    const dir = personaForm["dir"];
    const tel = personaForm["tel"];
    const email = personaForm["email"];
    const genero = personaForm["genero"];

  
    try {
      if (!editarPersona) { 
        await guardarPersona(appa.value, apma.value, nombre.value,fecha.value,dir.value,tel.value,email.value,genero.value,);
      } else {
        await actualizarPersona(id, {
          appa: appa.value,
          apma: apma.value,
          nombre: nombre.value,
          fecha: fecha.value,
          dir: dir.value,
          tel: tel.value,
          email: email.value,
          genero: genero.value        
        });
  
        editarPersona = false;
        id = "";
        personaForm["btn-form-firebase"].innerText = "Guardar";
      }
  
      personaForm.reset(); 
    } catch (error) {
      console.log(error);
    }
  });
  