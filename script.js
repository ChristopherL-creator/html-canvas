const canvas = document.getElementById('canvas'); 
// console.log(canvas);

const context = canvas.getContext('2d'); 

console.log(context); 

rectArray = []; 



for (let i = 0; i < 500; i++) {
//  rettangoli sono sovrapposti quindi se ne vede comunque uno; bisogna randomizzarli  (arte generativa);
    const randomX = Math.random() * 500; 
    
    const randomY = Math.random() * 380;
    
    const randomW = Math.random() * 100;
    
    const randomH = Math.random() * 100; 

    const randomRed = Math.random() * 255; 
    
    const randomGreen = Math.random() * 255;
    
    const randomBlue = Math.random() * 255; 

    const randomAlpha = Math.random(); 

    const randomVX = randomBetween(-2, 2);  

    const randomVY = randomBetween(-1, 1); 


    const colorRgbString = 'rgba(' + randomRed + ', ' + randomGreen + ', ' + randomBlue + ', ' + randomAlpha + ')' 
    console.log(colorRgbString); 

    const rect = { 
        x: randomX, 
        y: randomY, 
        width: randomW, 
        heigth: randomH, 
        color: colorRgbString, 
        velX: randomVX, 
        velY: randomVY
    } 

    rectArray.push(rect);

    // context.fillStyle = colorRgbString //  ultime due cifre sono trasparenza;

//  canva va vista come piano cartesiano con origien in alto a sinistra; 
//  le prime due misure indicano il punto d'origine rispetto a canvas; le ultime due larghezza e altezza; 
    // context.fillRect(randomX, randomY, randomW, randomH);
     
} 

//  per animare
// setInterval(() =>{ 
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     for (const rect of rectArray) { 
//         context.fillStyle = rect.color;
//         context.fillRect(rect.x, rect.y, rect.width, rect.heigth); 
//         rect.x = rect.x + rect.velX;    //  per spostare rettangolo, sembra che si ingrandisca, ma perchè rimangono quelli precednti 
//         rect.y = rect.y + rect.velY; 

//         if (rect.x < 0 || (rect.x + rect.width) > canvas.width) { //    determino quando quadrato esce
//             rect.velX = rect.velX * -1; // inverto velocità
//         } 

//         if (rect.y < 0 || (rect.y + rect.heigth) > canvas.height) { 
//             rect.velY = rect.velY * -1;
//         }
//     }
// }, Math.random()); // intervallo in millisecondi;  

let actualTime = 0;

function update(event) { 
    console.log(event); //  per vedere somma di intervalli tra frame successivi; 

    const deltaTime = event - actualTime; 

    actualTime = event; 
    console.log(deltaTime); //  per vedere intervallo preciso tra frames successivi;

        context.clearRect(0, 0, canvas.width, canvas.height);
    for (const rect of rectArray) { 
        context.fillStyle = rect.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.heigth); 
        rect.x = rect.x + rect.velX * deltaTime / 10;    //  per spostare rettangolo, sembra che si ingrandisca, ma perchè rimangono quelli precednti; 
        rect.y = rect.y + rect.velY * deltaTime / 10;   //  con deltaTime/10 mi assicuro che i rettangoli si muovano sempre allo stesso 
        //                                                  framerate(piuttosto con qualche scatto;

        if (rect.x < 0 || (rect.x + rect.width) > canvas.width) { //    determino quando quadrato esce;
            rect.velX = rect.velX * -1; // inverto velocità
        } 

        if (rect.y < 0 || (rect.y + rect.heigth) > canvas.height) { 
            rect.velY = rect.velY * -1;
        }
    } 
    requestAnimationFrame(update)   //  fissa il framerate automaticamente, permette di vedere intervallo tra frames successivi;
}

requestAnimationFrame(update)   

// setTimeout(() => {  //   per ritardare codice
//     console.log('ciao');
// }, 10000)

// console.log(rectArray); 

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
