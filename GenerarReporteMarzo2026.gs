/**
 * =============================================================================
 * GENERADOR DE REPORTE ESPECÍFICO PARA MARZO 2026
 * =============================================================================
 *
 * Esta función genera un reporte de marzo 2026 usando los datos actuales
 * del sistema. Útil cuando necesitas regenerar un reporte de un mes anterior.
 */

/**
 * Genera el reporte de marzo 2026 con los datos actuales del sistema
 * y lo guarda en "Reportes Mensuales"
 */
function generarReporteMarzo2026() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Confirmar con el usuario
    const respuesta = ui.alert(
      '📊 Generar Reporte de Marzo 2026',
      'Esta función generará un reporte de MARZO 2026 usando todos los datos actuales del sistema.\n\n' +
      '✅ Contará casos con fecha de ingreso en marzo 2026\n' +
      '✅ Usará el número de "No. Sesión" para contar sesiones\n' +
      '✅ Lo guardará en "Reportes Mensuales"\n\n' +
      '¿Deseas continuar?',
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ui.alert('❌ Cancelado');
      return;
    }

    ss.toast('🔄 Generando reporte de marzo 2026...', 'Generando', 3);

    // Mes y año a procesar
    const mes = 3; // Marzo
    const anio = 2026;
    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);
    const nombreMes = 'Marzo 2026';

    // ═══════════════════════════════════════════════════════════
    // 1. NUEVOS INGRESOS
    // ═══════════════════════════════════════════════════════════
    let nuevosIngresosMes = 0;
    let nuevosIngresosTotal = 0;

    const terapias = ss.getSheetByName('Terapias Individual');
    if (terapias && terapias.getLastRow() > 1) {
      const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 9).getValues();

      datos.forEach(fila => {
        const fechaIngreso = fila[0]; // Columna A
        const participante = fila[3]; // Columna D

        if (participante && participante.toString().trim() !== '') {
          nuevosIngresosTotal++;

          if (fechaIngreso instanceof Date && fechaIngreso >= primerDia && fechaIngreso <= ultimoDia) {
            nuevosIngresosMes++;
          }
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 2. PERSONAS NO ASISTIDAS
    // ═══════════════════════════════════════════════════════════
    let noAsistidasMes = 0;
    let noAsistidasTotal = 0;

    const noAsistidas = ss.getSheetByName('Personas no asistidas');
    if (noAsistidas && noAsistidas.getLastRow() > 1) {
      const datos = noAsistidas.getRange(2, 1, noAsistidas.getLastRow() - 1, 2).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];
        const participante = fila[1];

        if (participante && participante.toString().trim() !== '') {
          noAsistidasTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            noAsistidasMes++;
          }
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 3. DERIVACIONES INSTITUCIONALES
    // ═══════════════════════════════════════════════════════════
    let derivacionesMes = 0;
    let derivacionesTotal = 0;

    const derivaciones = ss.getSheetByName('Derivaciones Institucionales');
    if (derivaciones && derivaciones.getLastRow() > 1) {
      const datos = derivaciones.getRange(2, 1, derivaciones.getLastRow() - 1, 2).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];
        if (fecha) {
          derivacionesTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            derivacionesMes++;
          }
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 4. FORMULARIO DE BIENESTAR
    // ═══════════════════════════════════════════════════════════
    let formulariosTotal = 0;
    let alertasSuicidio = 0;

    const bienestar = ss.getSheetByName('Formulario de Bienestar');
    if (bienestar && bienestar.getLastRow() > 1) {
      formulariosTotal = bienestar.getLastRow() - 1;

      // Contar alertas de suicidio (columna que contiene "Sí" para ideación suicida)
      const datos = bienestar.getRange(2, 1, bienestar.getLastRow() - 1, bienestar.getLastColumn()).getValues();
      datos.forEach(fila => {
        // Buscar en la fila si hay respuesta afirmativa de ideación suicida
        if (fila.some(celda => celda && celda.toString().toLowerCase().includes('sí'))) {
          alertasSuicidio++;
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 5. CASOS ACTIVOS Y SESIONES POR TERAPEUTA
    // ═══════════════════════════════════════════════════════════
    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    const datosTerapeutas = {};

    terapeutas.forEach(terapeuta => {
      datosTerapeutas[terapeuta] = {
        activos: 0,
        sesiones: 0
      };
    });

    if (terapias && terapias.getLastRow() > 1) {
      const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();

      datos.forEach(fila => {
        const terapeuta = fila[1]; // Columna B
        const participante = fila[3]; // Columna D
        const numSesion = fila[7] || 0; // Columna H: No. Sesión
        const estado = fila[8]; // Columna I: Estado

        if (participante && participante.toString().trim() !== '' && estado === 'En proceso') {
          if (terapeutas.includes(terapeuta)) {
            datosTerapeutas[terapeuta].activos++;
            datosTerapeutas[terapeuta].sesiones += Number(numSesion);
          }
        }
      });
    }

    const totalActivos = Object.values(datosTerapeutas).reduce((sum, t) => sum + t.activos, 0);
    const totalSesiones = Object.values(datosTerapeutas).reduce((sum, t) => sum + t.sesiones, 0);

    // ═══════════════════════════════════════════════════════════
    // 6. PROCESOS CULMINADOS
    // ═══════════════════════════════════════════════════════════
    let culminadosMes = 0;
    let culminadosTotal = 0;
    let promedioSesiones = 0;

    const culminados = ss.getSheetByName('Procesos Culminados');
    if (culminados && culminados.getLastRow() > 1) {
      const datos = culminados.getRange(2, 1, culminados.getLastRow() - 1, 5).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];
        const numSesiones = fila[4] || 0; // Columna E: número de sesiones

        if (fecha) {
          culminadosTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            culminadosMes++;
          }
        }
      });

      // Calcular promedio de sesiones de procesos culminados con >= 12 sesiones
      const conMas12 = datos.filter(fila => {
        const numSesiones = fila[4] || 0;
        return numSesiones >= 12;
      });

      if (conMas12.length > 0) {
        const sumaTotal = conMas12.reduce((sum, fila) => sum + (fila[4] || 0), 0);
        promedioSesiones = Math.round(sumaTotal / conMas12.length);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 7. RETIRADX / DESERCIONES
    // ═══════════════════════════════════════════════════════════
    let retiradosMes = 0;
    let retiradosTotal = 0;

    const retirados = ss.getSheetByName('Retiradx');
    if (retirados && retirados.getLastRow() > 1) {
      const datos = retirados.getRange(2, 1, retirados.getLastRow() - 1, 1).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];

        if (fecha) {
          retiradosTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            retiradosMes++;
          }
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 8. INTERVENCIÓN DE CASOS
    // ═══════════════════════════════════════════════════════════
    let casosIntervencion = 0;

    const intervencion = ss.getSheetByName('Intervención de casos');
    if (intervencion && intervencion.getLastRow() > 1) {
      casosIntervencion = intervencion.getLastRow() - 1;
    }

    // ═══════════════════════════════════════════════════════════
    // 9. RESUMEN GENERAL
    // ═══════════════════════════════════════════════════════════
    const totalProcesados = culminadosTotal + retiradosTotal + casosIntervencion;
    const tasaExito = totalProcesados > 0 ? Math.round((culminadosTotal / totalProcesados) * 100) : 0;

    // Tasas
    const tasaCulminacion = promedioSesiones;
    const tasaRetiro = totalProcesados > 0 ? Math.round((retiradosTotal / totalProcesados) * 100) : 0;

    // ═══════════════════════════════════════════════════════════
    // 10. CAPTACIÓN
    // ═══════════════════════════════════════════════════════════
    let hojaInteresTotal = 0;
    let hojaInteresMes = 0;
    let referenciasTotal = 0;
    let referenciasMes = 0;
    let derivInstRecibTotal = derivacionesTotal;
    let derivInstRecibMes = derivacionesMes;

    const hojaInteres = ss.getSheetByName('Hoja de interés');
    if (hojaInteres && hojaInteres.getLastRow() > 1) {
      const datos = hojaInteres.getRange(2, 1, hojaInteres.getLastRow() - 1, 3).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];
        const participante = fila[2];

        if (participante && participante.toString().trim() !== '') {
          hojaInteresTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            hojaInteresMes++;
          }
        }
      });
    }

    const referencias = ss.getSheetByName('Referencias de programas');
    if (referencias && referencias.getLastRow() > 1) {
      const datos = referencias.getRange(2, 1, referencias.getLastRow() - 1, 2).getValues();

      datos.forEach(fila => {
        const fecha = fila[0];
        const participante = fila[1];

        if (participante && participante.toString().trim() !== '') {
          referenciasTotal++;

          if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
            referenciasMes++;
          }
        }
      });
    }

    // ═══════════════════════════════════════════════════════════
    // 11. GUARDAR EN REPORTES MENSUALES
    // ═══════════════════════════════════════════════════════════
    const mensuales = ss.getSheetByName('Reportes Mensuales');
    if (!mensuales) {
      ui.alert('❌ No se encontró la hoja "Reportes Mensuales"');
      return;
    }

    // Verificar si ya existe un reporte de marzo 2026
    const datosExistentes = mensuales.getDataRange().getValues();
    let filaExistente = -1;

    for (let i = 1; i < datosExistentes.length; i++) {
      if (datosExistentes[i][0] === nombreMes || datosExistentes[i][0] === 'marzo 2026') {
        filaExistente = i + 1;
        break;
      }
    }

    const datos = [
      nombreMes,
      // NUEVOS INGRESOS
      nuevosIngresosTotal, nuevosIngresosMes,
      // PERSONAS NO ASISTIDAS
      noAsistidasTotal, noAsistidasMes,
      // DERIVACIONES INSTITUCIONALES
      derivacionesTotal, derivacionesMes,
      // FORMULARIO DE BIENESTAR
      formulariosTotal, alertasSuicidio,
      // CASOS ACTIVOS POR TERAPEUTA
      datosTerapeutas['Gerber'].activos, datosTerapeutas['Gerber'].sesiones,
      datosTerapeutas['Melissa'].activos, datosTerapeutas['Melissa'].sesiones,
      datosTerapeutas['Diana'].activos, datosTerapeutas['Diana'].sesiones,
      datosTerapeutas['Karina'].activos, datosTerapeutas['Karina'].sesiones,
      totalActivos, totalSesiones,
      // PROCESOS CULMINADOS
      culminadosTotal, culminadosMes, tasaCulminacion,
      // RETIRADX
      retiradosTotal, retiradosMes, tasaRetiro,
      // INTERVENCION DE CASOS
      casosIntervencion,
      // RESUMEN GENERAL
      totalProcesados, tasaExito, totalActivos,
      // CAPTACIÓN
      hojaInteresTotal, hojaInteresMes,
      referenciasTotal, referenciasMes,
      derivInstRecibTotal, derivInstRecibMes,
      // FECHA
      new Date()
    ];

    let mensaje = '';

    if (filaExistente > 0) {
      // Actualizar fila existente
      mensuales.getRange(filaExistente, 1, 1, datos.length).setValues([datos]);
      mensaje = '✅ REPORTE DE MARZO 2026 ACTUALIZADO\n\n' +
                'Fila actualizada: ' + filaExistente;
    } else {
      // Agregar nueva fila
      const nuevaFila = mensuales.getLastRow() + 1;
      mensuales.getRange(nuevaFila, 1, 1, datos.length).setValues([datos]);
      mensaje = '✅ REPORTE DE MARZO 2026 GUARDADO\n\n' +
                'Nueva fila: ' + nuevaFila;
    }

    // Mostrar resumen
    const resumen =
      '📊 RESUMEN DEL REPORTE DE MARZO 2026\n' +
      '═══════════════════════════════════════\n\n' +
      'NUEVOS INGRESOS:\n' +
      '   • Total: ' + nuevosIngresosTotal + '\n' +
      '   • Marzo: ' + nuevosIngresosMes + '\n\n' +
      'CASOS ACTIVOS POR TERAPEUTA:\n' +
      '   • Gerber: ' + datosTerapeutas['Gerber'].activos + ' casos, ' + datosTerapeutas['Gerber'].sesiones + ' sesiones\n' +
      '   • Melissa: ' + datosTerapeutas['Melissa'].activos + ' casos, ' + datosTerapeutas['Melissa'].sesiones + ' sesiones\n' +
      '   • Diana: ' + datosTerapeutas['Diana'].activos + ' casos, ' + datosTerapeutas['Diana'].sesiones + ' sesiones\n' +
      '   • Karina: ' + datosTerapeutas['Karina'].activos + ' casos, ' + datosTerapeutas['Karina'].sesiones + ' sesiones\n' +
      '   • TOTAL: ' + totalActivos + ' casos, ' + totalSesiones + ' sesiones\n\n' +
      'PROCESOS FINALIZADOS:\n' +
      '   • Culminados (mes): ' + culminadosMes + '\n' +
      '   • Retirados (mes): ' + retiradosMes + '\n\n' +
      'CAPTACIÓN:\n' +
      '   • Hoja de interés (mes): ' + hojaInteresMes + '\n' +
      '   • Referencias (mes): ' + referenciasMes + '\n' +
      '   • Derivaciones (mes): ' + derivacionesMes;

    Logger.log(resumen);

    ui.alert(
      mensaje + '\n\n' +
      '📋 DATOS PRINCIPALES:\n\n' +
      '• Nuevos Ingresos (Marzo): ' + nuevosIngresosMes + '\n' +
      '• Total Casos Activos: ' + totalActivos + '\n' +
      '• Total Sesiones: ' + totalSesiones + '\n\n' +
      'Ve a "Reportes Mensuales" para ver todos los detalles.'
    );

    ss.toast('✅ Reporte de marzo 2026 generado exitosamente', 'Completado', 5);

  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    ui.alert('❌ Error', 'Error generando reporte: ' + error.toString(), ui.ButtonSet.OK);
  }
}
