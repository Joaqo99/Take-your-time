let contenedor_reloj = document.querySelector(".contenedor-reloj")
let reloj = document.getElementById("reloj");

const boton_control = document.getElementById("control");
const boton_reset = document.getElementById("reset");

let relojero;
let tiempo_transcurrido = 0;

const control = () =>{
    const pausado = !boton_control.classList.contains("pause");
    if (pausado){
        boton_control.textContent = "Pause"
        start();
    }else{
        boton_control.textContent = "Start"
        pause();
    }
}

const pause = () =>{
    /* hacer algoritmo de pausa de milisegundos*/
    clearInterval(tiempo_transcurrido);
}

const reset = () =>{
    /* hacer algoritmo de reset de milisegundos */ 
    boton_control.classList.remove("pause");
    tiempo_transcurrido = 0;
    clearInterval(tiempo_transcurrido);
    reloj.textContent = "00:00"
}

const start = () =>{
    /* hacer algoritmo de milisegundos */
    let tiempo_arranque = Date.now() - tiempo_transcurrido;
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