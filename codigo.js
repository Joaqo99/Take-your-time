let contenedor_reloj = document.querySelector(".contenedor-reloj")
let reloj = document.getElementById("reloj");

const boton_control = document.getElementById("control");
const boton_reset = document.getElementById("reset");

let relojero;
let tiempo_transcurrido = 0;
let intervalID;

/* Bloque de palitos/milisegundos */

const fragmento = document.createDocumentFragment();

const f = x => 15 * Math.sin(Math.PI * x)
const g = y => 15 * Math.cos(Math.PI * y)

for (i = 0; i < 100; i++){
    const palito = document.createElement("DIV"); 
    fragmento.insertBefore(palito, null);
    palito.style.transform = `rotate(${i*3.6}deg) translate(${f(i)}em, ${-g(i)}em)`
    palito.setAttribute("class", "milisegundo")
    if (i > 50 && i % 2 == 1){
        palito.setAttribute("id",`milisegundo${i-50}`)
    }else if (i < 50 && i % 2 == 1){
        palito.setAttribute("id",`milisegundo${i+50}`)
    }else{
        palito.setAttribute("id", `milisegundo${i}`)
    }

}

contenedor_reloj.insertBefore(fragmento, reloj)


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
        pause(tiempo_transcurrido);
    }
}

const start = () =>{
    let tiempo_arranque = Date.now() - tiempo_transcurrido;

    intervalID = setInterval(milisegs_runner, 10)
    var milisegundo = 0
    function milisegs_runner(){
        if (milisegundo % 2 == 1){
            document.getElementById(`milisegundo${milisegundo}`).classList.add("milisegundo-animacion-impar")
        }else{
            document.getElementById(`milisegundo${milisegundo}`).classList.add("milisegundo-animacion-par")
        }
        milisegundo ++
        if (milisegundo == 100){
            clearInterval(intervalID);
        }
    }

    relojero = setInterval( ()=>{
        tiempo_transcurrido = Date.now() - tiempo_arranque;
        reloj.textContent = calculateTime(tiempo_transcurrido)[0];
    }, 10)
}

const detener_milisegundos = ()=>{
    clearInterval(intervalID);
    for (i = 0; i < 100; i++){
        element = document.getElementById(`milisegundo${i}`)
        element.classList.remove("milisegundo-animacion-par", "milisegundo-animacion-impar")
    }
} 

const pause = tiempo_transcurrido =>{
    clearInterval(relojero);
    detener_milisegundos();

    let milisegs = calculateTime(tiempo_transcurrido)[1];
    let milisegundo_final = Math.floor(milisegs/10)
    console.log(milisegs)
    console.log(milisegundo_final)
    document.getElementById(`milisegundo${milisegundo_final}`).classList.add("milisegundo-final")
}


const reset = () =>{
    boton_control.classList.remove("pause");
    boton_control.classList.add("start")
    tiempo_transcurrido = 0;
    clearInterval(relojero);
    detener_milisegundos()
    for (i = 0; i < 100; i++){
        document.getElementById(`milisegundo${i}`).classList.remove("milisegundo-final")
    }
    reloj.textContent = "00:00"
    boton_control.textContent = "Start"
}

const calculateTime = tiempo_transcurrido =>{
    const total_segundos = Math.floor(tiempo_transcurrido / 1000);
    const milisegundos = tiempo_transcurrido % (total_segundos * 1000)
    const total_minutos = Math.floor(total_segundos / 60);

    const display_segundos = (total_segundos % 60).toString().padStart(2, "0");
    const display_minutos = total_minutos.toString().padStart(2, "0");

    return [`${display_minutos}:${display_segundos}`, milisegundos]
}

boton_control.addEventListener("click", control)
boton_reset.addEventListener("click", reset)