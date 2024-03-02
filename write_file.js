const fs = require('fs'); //Importar la libreria FileSystem

const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum est vel nisi sollicitudin convallis. Quisque id erat nec mi euismod bibendum. Nullam nec efficitur justo. Cras vestibulum venenatis ipsum, non tempor risus sollicitudin sed. Integer consectetur risus id luctus vehicula. In hac habitasse platea dictumst. Ut sit amet ligula vel mi aliquet posuere. Duis eget neque vestibulum, vulputate felis nec, congue nisl. Fusce at turpis tellus. Curabitur eget nibh vel velit faucibus rutrum. Ut eleifend, est ac ullamcorper iaculis, magna odio gravida purus, ut lobortis arcu magna id est. Duis eget nisi a sapien aliquam mattis. Proin interdum leo ut turpis lacinia, at molestie neque facilisis. Sed consectetur felis vitae purus pharetra, vel congue mi laoreet.Suspendisse potenti. Mauris luctus purus ut augue varius, ut efficitur ex malesuada. Nullam varius risus vel arcu suscipit, ut bibendum mi vestibulum. Ut efficitur neque eget sem ultricies, sit amet scelerisque leo ultricies. Vivamus bibendum sagittis libero nec efficitur. Donec auctor, eros sed venenatis convallis, odio metus vehicula sem, nec varius eros mauris nec eros. Nullam nec velit lorem. Duis nec malesuada sem. Nullam ullamcorper nisl at neque bibendum, sed feugiat lorem consequat. Nullam fermentum pretium nulla, nec sodales elit efficitur non. Maecenas feugiat cursus odio"

fs.writeFile('archivo.txt', content, (err) =>{
    if (err){
        console.log(err);
        return;
    }
    console.log("Archivo creado exitosamente");
})