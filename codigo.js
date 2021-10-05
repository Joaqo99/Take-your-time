let contenedor_reloj = document.querySelector(".contenedor-reloj")
let reloj = document.getElementById("reloj");

const boton_control = document.getElementById("control");
const boton_reset = document.getElementById("reset");

let relojero;
let tiempo_transcurrido = 0;

/* Bloque de palitos/segunderos */

const fragmento = document.createDocumentFragment();

const f = x => 15 * Math.sin(Math.PI * x)
const g = y => 15 * Math.cos(Math.PI * y)

for (i = 0; i < 100; i++){
    const palito = document.createElement("DIV"); 
    fragmento.appendChild(palito)
    palito.style.transform = `rotate(${i*3.6}deg) translate(${f(i)}em, ${-g(i)}em)`
    palito.setAttribute("class", "milisegundo")
    if (i > 50 && i % 2 == 1){
        palito.setAttribute("id",`milisegundo-${i-50}`)
    }else if (i < 50 && i % 2 == 1){
        palito.setAttribute("id",`milisegundo-${i+50}`)
    }else{
        palito.id = `milisegundo-${i}`
    
    }

}

contenedor_reloj.appendChild(fragmento)

let lista_milisegundos_I = document.querySelectorAll(".milisegundo");
let lista_milisegundos_II = []

for (i in lista_milisegundos_I){
    lista_milisegundos_II.push(document.getElementById(`milisegundo-${i}`))
}
/* Fin del bloque */

const control = () =>{
    const pausado = !boton_control.classList.contains("pause");
    if (pausado){
        boton_control.classList.remove("start")
        boton_control.classList.add("pause")
        boton_control.textContent = "Pause"
        start();
    }else{
        boton_control.classList.remove("pause")
        boton_control.classList.add("start")
        boton_control.textContent = "Start"
        pause();
    }
}

const pause = () =>{
    /* hacer algoritmo de pausa de milisegundos*/
    clearInterval(relojero);
    clearInterval(cronometro_milisegundos);
}

const reset = () =>{
    /* hacer algoritmo de reset de milisegundos */ 
    boton_control.classList.remove("pause");
    boton_control.classList.add("start")
    tiempo_transcurrido = 0;
    clearInterval(relojero);
    clearInterval(cronometro_milisegundos);
    reloj.textContent = "00:00"
    boton_control.textContent = "Start"
}

const start = () =>{
    /* hacer algoritmo de milisegundos */
    let tiempo_arranque = Date.now() - tiempo_transcurrido;

    var cronometro_milisegundos = setInterval(milisegs_runner, 10)
    let milisegundo = 0
    function milisegs_runner(){
        if (milisegundo % 2 == 1){
            lista_milisegundos_II[milisegundo].classList.add("milisegundo-animacion-par")
        }else{
            lista_milisegundos_II[milisegundo].classList.add("milisegundo-animacion-impar")
        }
        milisegundo += 1
    }

    relojero = setInterval( ()=>{
        tiempo_transcurrido = Date.now() - tiempo_arranque;
        reloj.textContent = calculateTime(tiempo_transcurrido);
    }, 1000)
}

const calculateTime = tiempo_transcurrido =>{
    const total_segundos = Math.floor(tiempo_transcurrido / 1000);
    const total_minutos = Math.floor(total_segundos / 60);

    const display_segundos = (total_segundos % 60).toString().padStart(2, "0");
    const display_minutos = total_minutos.toString().padStart(2, "0");

    return `${display_minutos}:${display_segundos}`
}

boton_control.addEventListener("click", control)
boton_reset.addEventListener("click", reset)