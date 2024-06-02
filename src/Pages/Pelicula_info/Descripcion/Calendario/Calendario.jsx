import React, { useEffect } from "react";
import "./Calendario.css";
import { useState } from "react";

const meses = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
};

function diasEnElMes(mes, año) {
    if (mes === 2) {
        if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    } else if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        return 30;
    } else {
        return 31;
    }
}

function calcularDiaInicial(mes, año) {
    const claveMeses = {
        1: 0,
        2: 3,
        3: 3,
        4: 6,
        5: 1,
        6: 4,
        7: 6,
        8: 2,
        9: 5,
        10: 0,
        11: 3,
        12: 5,
    };
    const claveSiglos = {
        16: 6,
        17: 4,
        18: 2,
        19: 0,
        20: 6,
    };

    const res =
        (1 +
            claveMeses[mes] +
            claveSiglos[año.toString().slice(0, 2)] +
            Math.floor(año.toString().slice(2, 4) / 4) +
            (año.toString().slice(2, 4) % 7)) %
        7;

    if (
        ((mes === 1 || mes === 2) && año % 4 === 0 && año % 100 !== 0) ||
        año % 400 === 0
    ) {
        if (res === 0) {
            return 7;
        }
        return res;
    } else {
        return res + 1;
    }
}
//tolerancia meses atras/adelante es el intervalo que deja al usuario en el calendario
const Calendario = ({
    mesInicial = 1,
    diaInicial = 1,
    añoInicial = 2024,
    ToleranciaMesesAtras = 0,
    ToleranciaMesesAdelante = 2,
    diasDisponibles = [],
    cambioDeFecha = () => {},
}) => {
    const [mes, setMes] = useState(mesInicial);
    const [año, setAño] = useState(añoInicial);
    const [dias, setDias] = useState(diasEnElMes(mes, año));

    const [seleccion, setSeleccion] = useState(diaInicial);
    const iterableDias = [];

    useEffect(() => {
        setDias(diasEnElMes(mes, año));
        cambioDeFecha(seleccion, mes, año);
    }, [seleccion, mes, año]);

    for (let i = 1; i <= dias; i++) {
        iterableDias.push(i);
    }
    let sePuedeRestarMes =
        mes + 12 * (año - añoInicial) !== mesInicial - ToleranciaMesesAtras &&
        año !== 1600;
    const restarmes = () => {
        if (sePuedeRestarMes) {
            if (mes === 1) {
                setMes(12);
                setAño(año - 1);
                
            } else {
                setMes(mes - 1);
                
            }
        }
        
    };
    let sePuedeSumarMes =
        mes + 12 * (año - añoInicial) !==
            mesInicial + ToleranciaMesesAdelante && año !== 2099;
    const sumarmes = () => {
        if (sePuedeSumarMes) {
            if (mes === 12) {
                setMes(1);
                setAño(año + 1);
            } else {
                setMes(mes + 1);
            }
        } 
        
    };
    return (
        <div className="Calendario">
            <div className="BotonesSuperiores">
                <button className="BotonMesRestar" onClick={() => restarmes()}>
                    {" "}
                    {"<"}
                </button>
                <h1>
                    {meses[mes]} {año}
                </h1>
                <button className="BotonMesSumar" onClick={() => sumarmes()}>
                    {" "}
                    {">"}
                </button>
            </div>
            <ol className="NumerosCalendario">
                <li className="DiasSemana">DOM</li>
                <li className="DiasSemana">LUN</li>
                <li className="DiasSemana">MAR</li>
                <li className="DiasSemana">MIE</li>
                <li className="DiasSemana">JUE</li>
                <li className="DiasSemana">VIE</li>
                <li className="DiasSemana">SAB</li>
                {iterableDias.map((dia) => (
                    <li key={dia} className={`${dia === 1 ? "Primero " : ""}`}>
                        <div className="ButtonContainer">
                            <button className={`${seleccion === dia ? "SeleccionActual " : ""}${diasDisponibles.includes(dia) ? "diaDisponible" : "diaNoDisponible"}` + " Numero"} onClick={() => setSeleccion(dia)}>
                                {dia}
                            </button>
                        </div>
                    </li>
                ))}
                <style>
                    {`.Primero {
                        grid-column-start: ${calcularDiaInicial(mes, año)};
                    }
                    .BotonMesSumar{
                        color: ${sePuedeSumarMes ? "black" : "#B5C7D8"};
                    }
                    .BotonMesRestar {
                        color: ${sePuedeRestarMes ? "black" : "#B5C7D8"};
                    }
                    .Calendario {
                        height: ${
                            (dias == 31 && calcularDiaInicial(mes, año) >= 6) ||
                            (dias == 30 && calcularDiaInicial(mes, año) >= 7)
                                ? "435px"
                                : "385px"
                        };
                    }
                    `}
                </style>
            </ol>
        </div>
    );
};

export default Calendario;