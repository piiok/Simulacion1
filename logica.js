/**Apenas carga la pagina y todas las librerias estan cargadas se ejcuta */
window.onload = function() {
	var q = getRandomInt();
	$('#quantum').val('' + q);
	proceso(q);
	var cantidad = getRandomInt();
	$('#capacidad').val('' + cantidad);
	var pisos = getRandomInt();
	$('#pisos').val('' + pisos);
	proceso2();
	proceso3();
};

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**  METODOS COLAS */
function proceso(q) {
	q = parseInt(q);
	var grafica = (document.getElementById('grafica').innerHTML =
		"<canvas id='canvas1' height='450' width='600'></canvas>");
	var ctx1 = document.getElementById('canvas1').getContext('2d');
	var p1 = getRandomInt();
	var p2 = getRandomInt();
	$('#p1').val('' + p1);
	$('#p2').val('' + p2);
	var config1 = configuracion(roundRobin(q, p1, p2));
	window.myLine = new Chart(ctx1, config1);
}

function configuracion(r) {
	return {
		type: 'bar',
		data: {
			labels: r[0],
			datasets: [
				{
					label: 'Proceso 1',
					backgroundColor: '#49147F',
					fill: false,
					data: r[1][0]
				},
				{
					label: 'Proceso 2',
					backgroundColor: '#EA38C9',
					fill: false,
					data: r[1][1]
				},
				{
					label: 'T. de salida Proceso 1',
					backgroundColor: '#6D0204',
					fill: false,
					data: r[1][2]
				},
				{
					label: 'T. de salida Proceso 2',
					backgroundColor: '#246420',
					fill: false,
					data: r[1][3]
				}
			]
		},
		options: {
			scales: {
				yAxes: [
					{
						display: true,
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}
	};
}

function roundRobin(quantum, p1, p2) {
	tiempoSalida1 = 0;
	tiempoSalida2 = 0;
	checkpoint = 0;
	tiempos = [ [ p1 ], [ p2 ], [ tiempoSalida1 ], [ tiempoSalida2 ] ]; // se llena con p1, p2, ts1, ts2 respectivamente
	labels = [];

	termino1 = false;
	termino2 = false;

	while (p1 != 0 || p2 != 0) {
		//Mirar si p1 > quantum
		if (!termino1) {
			if (p1 > quantum) {
				avance = quantum;
				tiempoSalida1 += quantum;
				p1 -= quantum;
			} else {
				ultAvance1 = p1;
				tiempoSalida1 += p1;
				p1 = 0;
				termino1 = true;
			}
		}
		tiempos[0].push(p1);
		tiempos[2].push(tiempoSalida1);

		//mirar si p2 > quantum
		if (!termino2) {
			if (p2 > quantum) {
				if (!termino1) {
					tiempoSalida2 = tiempoSalida2 + avance + quantum;
					tiempoSalida1 = tiempoSalida2;
				} else {
					tiempoSalida2 += ultAvance1;
					ultAvance1 = 0;
					tiempoSalida2 += quantum;
				}
				p2 -= quantum;
			} else {
				if (!termino1) {
					tiempoSalida2 = tiempoSalida2 + avance + p2;
					tiempoSalida1 = tiempoSalida2;
				} else {
					tiempoSalida2 += ultAvance1;
					ultAvance1 = 0;
					tiempoSalida2 += p2;
				}
				p2 = 0;
				termino2 = true;
			}
		}
		tiempos[1].push(p2);
		tiempos[3].push(tiempoSalida2);
	}
	//llenar array de labels
	for (i = 0; i < tiempos[0].length; i++) {
		numeroPaso = i.toString();
		labels.push('Paso ' + i);
	}
	return [ labels, tiempos ];
}
/**FIN METODOS COLAS */

/** METODOS ASCENSOR */
function proceso2() {
	var grafica = (document.getElementById('grafica1').innerHTML =
		"<canvas id='canvas2' height='450' width='600'></canvas>");
	var ctx1 = document.getElementById('canvas2').getContext('2d');
	var capacidad = parseInt($('#capacidad').val());
	var pisos = parseInt($('#pisos').val());
	result = ascensor(capacidad, pisos);
	var config1 = configuracion2([ result[0], result[1] ]);
	$('#inicial').val(result[2]);
	window.myLine2 = new Chart(ctx1, config1);
}

function configuracion2(a) {
	return {
		type: 'horizontalBar',
		data: {
			labels: a[0],
			// backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			datasets: [
				{
					backgroundColor: '#49147F',
					label: 'Personas en el ascensor',
					fill: false,
					data: a[1]
				}
			]
		},
		options: {
			scales: {
				xAxes: [
					{
						display: true,
						ticks: {
							min: 0
						}
					}
				]
			}
		}
	};
}
function ascensor(capMax, canPisos) {
	let personasAscensor = Math.floor(Math.random() * capMax) + 1;
	const personasInicial = personasAscensor;
	let cont = 0;
	console.log('El ascensor comenzo con:', personasAscensor, 'personas.');
	let pisoBajan = [];
	let bajanPorPiso = [];
	let pasajerosPiso = [];
	let labels = [];

	//arreglo que contiene el piso donde se va a bajar cada persona
	for (let i = 0; i < canPisos; i++) {
		if (cont < personasInicial) {
			const pisoBaja = Math.floor(Math.random() * canPisos) + 1;
			cont += 1;
			pisoBajan.push(pisoBaja);
		} else {
			pisoBajan.push(0);
		}
	}

	//arreglo que tiene la cantidad de personas que se van a bajar por piso
	for (let i = 1; i <= canPisos; i++) {
		console.log('Piso ', i);
		const personas = pisoBajan.filter((x) => x === i).length;
		personasAscensor -= personas;
		console.log('Se bajaron', personas, 'personas y quedan', personasAscensor);
		labels.push('Piso ' + i.toString());
		pasajerosPiso.push(personasAscensor);
		bajanPorPiso.push(personas);
	}

	console.log('Piso en el que se baja cada pasajero', pisoBajan);
	console.log('Cantidad de pasajeros que se baja por piso', bajanPorPiso);

	return [ labels, pasajerosPiso, personasInicial ];
}
/**FIN METODOS ASCENSOR */

/** METODOS PELOTA */
function proceso3() {
	var grafica = (document.getElementById('grafica2').innerHTML =
		"<canvas id='canvas3' height='450' width='600'></canvas>");
	var ctx1 = document.getElementById('canvas3').getContext('2d');
	var config1 = configuracion3(altura());
	window.myLine3 = new Chart(ctx1, config1);
}
function altura() {
	var labels = [];
	var a = [];
	var p = [ 0.5, 0.25, 0.1 ];
	var b = true;
	for (i = 0; i < 3; i++) {
		a[i] = [ 7 ];
	}
	//console.log(a);
	var j = 0;
	labels.push('' + j);
	do {
		j++;
		labels.push('' + j);
		for (i = 0; i < 3; i++) {
			a[i].push(a[i][a[i].length - 1] * (1 - p[i]));
			//console.log(a[i]);
		}
		if (a[0][a[0].length - 1] <= 0.0005 && a[1][a[1].length - 1] <= 0.0005 && a[2][a[2].length - 1] <= 0.0005) {
			b = false;
		}
	} while (b);
	return [ labels, a ];
}

function configuracion3(a) {
	console.log(a);
	return {
		type: 'line',
		data: {
			labels: a[0],
			datasets: [
				{
					backgroundColor: '#49147F',
					borderColor: '#49147F',
					label: 'Porcentaje 0,5',
					fill: false,
					data: a[1][0]
				},
				{
					backgroundColor: '#EA38C9',
					borderColor: '#EA38C9',
					label: 'Porcentaje 0,25',
					fill: false,
					data: a[1][1]
				},
				{
					backgroundColor: '#246420',
					borderColor: '#246420',
					label: 'Porcentaje 0,1',
					fill: false,
					data: a[1][2]
				}
			]
		},
		options: {
			scales: {
				yAxes: [
					{
						display: true,
						ticks: {
							min: 0
						}
					}
				]
			}
		}
	};
}
/**FIN METODOS PELOTA */
