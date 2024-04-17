const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", function (event) {
   
    
      const imageUrl = document.getElementById('imageUrl').value.trim().toString();
      console.log(imageUrl)

      // Verifica si la URL de la imagen en formato .jpg y .jpg
      if (!imageUrl.endsWith('.png')  &&  !imageUrl.endsWith('.jpg')) {
          manejoError();
      }
      function manejoError(){
        const errorSpan = document.querySelector('.error');
          errorSpan.textContent = 'Debe ingresar una URL que contenga la extensión .png o .jpg';
          errorSpan.style.color = 'red';
          event.preventDefault(); // Evita que el formulario se envíe
      }
} );