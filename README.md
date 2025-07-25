comando para rodar na extensão : npm rum build
comando para rodar no localhost: npm rum dev


no front-end, no arquivo .env é necessario colocar a url da api publica:

<img width="530" height="122" alt="image" src="https://github.com/user-attachments/assets/a2aa8968-b06c-45bc-8db7-c057b0f65f32" />

no  back-end é necessário ter o CORS: 
e ta configurado assim:
policy.WithOrigins(
        "http://localhost:5173",                                  // exemplo de Frontend local
        "https://dda5d6517c3c.ngrok-free.app",                   // exemplo de uma URL pública no ngrok ou outra qualquer
        "chrome-extension://kllanimkmjifhopglllfckdploiijcgh"    // id da sua extensão que no Chrome
    )
<img width="1236" height="455" alt="image" src="https://github.com/user-attachments/assets/ff9a06a7-820b-4d09-9081-741bb2ffae53" />
