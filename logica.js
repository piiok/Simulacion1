function roundRobin(quantum, p1, p2) {
  tiempoSalida1 = 0;
  tiempoSalida2 = 0;
  termino1 = false;
  termino2 = false;
  paso = 0;

  labels = [];
  tiempos = [[p1],[p2],[0],[0]];
  console.log(tiempos);

  console.log("Paso:",paso);
  console.log("P1:",p1,"P2:",p2,"Quantum:",quantum)

  while((p1 !== 0) || (p2 !== 0)){
    paso++;
    console.log("Paso:",paso)
    //Proceso 1
    if(p1 <= quantum){
      tiempoSalida1 += p1;
      paso1 = p1;
      p1 = 0;
      termino1 = true;
    } else {
      if(!termino2){
        tiempoSalida1 += quantum;
      }    
      paso1 = quantum;  
      p1 = p1 - quantum;
    }
    console.log("P1:",p1,"Tiempo de salida 1:",tiempoSalida1);
    //Proceso 2
    if(p2 <= quantum){
      tiempoSalida2 = tiempoSalida2 + paso1 + p2;
      aux1 = tiempoSalida1;
      if(!termino1){
        tiempoSalida1 = tiempoSalida2;
      }
      p2 = 0;
      termino2 = true;
    } else {
      tiempoSalida2 = tiempoSalida2 + paso1 + quantum;
      aux1 = tiempoSalida1;
      if(!termino1){
        tiempoSalida1 = tiempoSalida2;
      }
      p2 = p2 - quantum;
    }
    
    console.log("P2:",p2,"Tiempo de salida 2:",tiempoSalida2);
    datosCiclo = [p1, p2, aux1, tiempoSalida2];
    tiempos[0].push(p1);
    tiempos[1].push(p2);
    tiempos[2].push(aux1);
    tiempos[3].push(tiempoSalida2);
  }
  for(i = 0; i <= paso; i++){
    numeroPaso = i.toString();
    labels.push('Paso ' + i);
  }

  return [labels, tiempos];
}

// function ascensor(capMax, canPisos){
//   personasAscensor = Math.floor(Math.random() * capMax) + 1;
//   console.log("El ascensor comenzo con:",personasAscensor,"personas.");
//   labels = [];
//   pasajerosPiso = [];

//   for(i = 1; i <= canPisos; i++){
//     numeroPiso = i.toString();
//     labels.push('Piso ' + i);
//     bajanPorPiso = Math.floor(Math.random() * personasAscensor) + 1;
//     if(personasAscensor !== 0){
//       personasAscensor -= bajanPorPiso;
//     }
//     console.log("Se bajaron",bajanPorPiso,"en el piso",i,"quedan:",personasAscensor);
//     pasajerosPiso.push(personasAscensor);
//   }
//   console.log(labels);
//   console.log(pasajerosPiso);

// }

function ascensor(capMax, canPisos){
  personasAscensor = Math.floor(Math.random() * capMax) + 1;
  personasInicial = personasAscensor;
  console.log("El ascensor comenzo con:",personasAscensor,"personas.");
  labels = [];
  pasajerosPiso = [];

  for(i = 1; i <= canPisos; i++){
    numeroPiso = i.toString();
    labels.push('Piso ' + i);
    if(personasAscensor !== 0){
      quedanAscensor = Math.floor(Math.random() * personasAscensor) + 1;
      console.log("Quedan:",quedanAscensor);
      bajanPorPiso = personasAscensor - quedanAscensor;
      personasAscensor = quedanAscensor;
    }
    console.log("Se bajaron",bajanPorPiso,"en el piso",i,"quedan:",personasAscensor);
    pasajerosPiso.push(personasAscensor);
  }
  console.log(labels);
  console.log(pasajerosPiso);

  return [labels, pasajerosPiso, personasInicial];

}