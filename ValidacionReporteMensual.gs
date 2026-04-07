/**
 * =============================================================================
 * SCRIPT DE VALIDACIÓN DE REPORTE MENSUAL
 * =============================================================================
 *
 * Este script analiza los datos del reporte y compara con los datos reales
 * para identificar discrepancias y ayudarte a justificar los números.
 */

/**
 * Crea un menú personalizado para validación
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Validación Reporte')
    .addItem('🔍 Analizar Reporte Actual', 'analizarReporteActual')
    .addItem('📅 Validar Mes Específico', 'validarMesEspecifico')
    .addItem('📋 Generar Reporte Detallado', 'generarReporteDetallado')
    .addSeparator()
    .addItem('🔧 Corregir Fórmulas', 'corregirFormulas')
    .addToUi();
}

/**
 * Analiza el reporte actual y compara con los datos reales
 */
function analizarReporteActual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    const reporte = ss.getSheetByName('Reporte');
    if (!reporte) {
      ui.alert('❌ No se encontró la hoja "Reporte"');
      return;
    }

    // Obtener mes y año actual
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1; // 0-11, así que sumamos 1
    const anioActual = hoy.getFullYear();
    const nombreMes = Utilities.formatDate(hoy, Session.getScriptTimeZone(), 'MMMM yyyy');

    let resultado = '📊 ANÁLISIS DEL REPORTE - ' + nombreMes.toUpperCase() + '\n';
    resultado += '═══════════════════════════════════════════════════\n\n';

    // 1. NUEVOS INGRESOS
    resultado += '1️⃣ NUEVOS INGRESOS\n';
    resultado += '─────────────────────────────────\n';
    const nuevosIngresosReporte = reporte.getRange('C5').getValue();
    const nuevosIngresosReal = contarNuevosIngresos(mesActual, anioActual);
    resultado += `   • Según Reporte: ${nuevosIngresosReporte}\n`;
    resultado += `   • Conteo Real: ${nuevosIngresosReal}\n`;
    resultado += `   • Coincide: ${nuevosIngresosReporte === nuevosIngresosReal ? '✅ SÍ' : '❌ NO'}\n\n`;

    // 2. SESIONES POR TERAPEUTA
    resultado += '2️⃣ SESIONES DEL MES POR TERAPEUTA\n';
    resultado += '─────────────────────────────────\n';
    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    const filas = [17, 18, 19, 20];

    let totalSesionesReporte = 0;
    let totalSesionesReal = 0;

    terapeutas.forEach((terapeuta, idx) => {
      const sesionesReporte = reporte.getRange('C' + filas[idx]).getValue();
      const sesionesReal = contarSesionesMes(terapeuta, mesActual, anioActual);
      totalSesionesReporte += sesionesReporte;
      totalSesionesReal += sesionesReal;

      resultado += `   ${terapeuta}:\n`;
      resultado += `      • Según Reporte: ${sesionesReporte} sesiones\n`;
      resultado += `      • Conteo Real (Asistencias): ${sesionesReal} sesiones\n`;
      resultado += `      • Coincide: ${sesionesReporte === sesionesReal ? '✅' : '❌'}\n`;
    });

    resultado += `\n   TOTAL:\n`;
    resultado += `      • Según Reporte: ${totalSesionesReporte} sesiones\n`;
    resultado += `      • Conteo Real: ${totalSesionesReal} sesiones\n`;
    resultado += `      • Coincide: ${totalSesionesReporte === totalSesionesReal ? '✅ SÍ' : '❌ NO'}\n\n`;

    // 3. CASOS ACTIVOS
    resultado += '3️⃣ CASOS ACTIVOS\n';
    resultado += '─────────────────────────────────\n';
    terapeutas.forEach((terapeuta, idx) => {
      const activosReporte = reporte.getRange('B' + filas[idx]).getValue();
      const activosReal = contarCasosActivos(terapeuta);

      resultado += `   ${terapeuta}: ${activosReporte} (Reporte) vs ${activosReal} (Real) ${activosReporte === activosReal ? '✅' : '❌'}\n`;
    });

    // 4. PROCESOS CULMINADOS
    resultado += '\n4️⃣ PROCESOS CULMINADOS (Este mes)\n';
    resultado += '─────────────────────────────────\n';
    const culminadosReporte = reporte.getRange('C24').getValue();
    const culminadosReal = contarCulminados(mesActual, anioActual);
    resultado += `   • Según Reporte: ${culminadosReporte}\n`;
    resultado += `   • Conteo Real: ${culminadosReal}\n`;
    resultado += `   • Coincide: ${culminadosReporte === culminadosReal ? '✅ SÍ' : '❌ NO'}\n\n`;

    // 5. RETIRADOS/DESERCIONES
    resultado += '5️⃣ RETIRADOS/DESERCIONES (Este mes)\n';
    resultado += '─────────────────────────────────\n';
    const retiradosReporte = reporte.getRange('C27').getValue();
    const retiradosReal = contarRetirados(mesActual, anioActual);
    resultado += `   • Según Reporte: ${retiradosReporte}\n`;
    resultado += `   • Conteo Real: ${retiradosReal}\n`;
    resultado += `   • Coincide: ${retiradosReporte === retiradosReal ? '✅ SÍ' : '❌ NO'}\n\n`;

    // RESUMEN
    resultado += '\n═══════════════════════════════════════════════════\n';
    resultado += '📋 RESUMEN\n';
    resultado += '═══════════════════════════════════════════════════\n';

    const discrepancias = [];
    if (nuevosIngresosReporte !== nuevosIngresosReal) discrepancias.push('Nuevos Ingresos');
    if (totalSesionesReporte !== totalSesionesReal) discrepancias.push('Total Sesiones');
    if (culminadosReporte !== culminadosReal) discrepancias.push('Culminados');
    if (retiradosReporte !== retiradosReal) discrepancias.push('Retirados');

    if (discrepancias.length === 0) {
      resultado += '\n✅ TODOS LOS DATOS COINCIDEN CORRECTAMENTE\n';
      resultado += '\nEl reporte está funcionando correctamente.\n';
    } else {
      resultado += '\n⚠️ SE ENCONTRARON DISCREPANCIAS EN:\n';
      discrepancias.forEach(d => resultado += `   • ${d}\n`);
      resultado += '\n🔧 POSIBLES CAUSAS:\n';
      resultado += '   1. Las fórmulas del reporte no están actualizadas\n';
      resultado += '   2. Los datos fueron modificados manualmente\n';
      resultado += '   3. Hay filas vacías o con formato incorrecto\n';
      resultado += '   4. Las fechas no están en formato correcto\n';
      resultado += '\n💡 SOLUCIÓN:\n';
      resultado += '   Usa el menú "📊 Validación Reporte" → "🔧 Corregir Fórmulas"\n';
    }

    // Mostrar resultado
    mostrarResultadoEnHoja(resultado, 'Análisis Reporte');

    ss.toast('✅ Análisis completado. Revisa la hoja "Análisis Reporte"', 'Análisis', 5);

  } catch (error) {
    ui.alert('❌ Error: ' + error.toString());
    Logger.log('❌ Error en análisis: ' + error.toString());
  }
}

/**
 * Cuenta nuevos ingresos del mes
 */
function contarNuevosIngresos(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 9).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(fila => {
    const fechaIngreso = fila[0]; // Columna A
    const participante = fila[3]; // Columna D

    if (participante && fechaIngreso instanceof Date) {
      if (fechaIngreso >= primerDia && fechaIngreso <= ultimoDia) {
        contador++;
      }
    }
  });

  return contador;
}

/**
 * Cuenta sesiones del mes para un terapeuta (suma de columna M - Asistencias)
 */
function contarSesionesMes(terapeuta, mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();
  let contador = 0;

  datos.forEach(fila => {
    const terapeutaFila = fila[1]; // Columna B
    const estado = fila[8]; // Columna I
    const asistencias = fila[12] || 0; // Columna M

    if (terapeutaFila === terapeuta && estado === 'En proceso') {
      contador += Number(asistencias);
    }
  });

  return contador;
}

/**
 * Cuenta casos activos de un terapeuta
 */
function contarCasosActivos(terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 2, terapias.getLastRow() - 1, 8).getValues();
  let contador = 0;

  datos.forEach(fila => {
    const terapeutaFila = fila[0]; // Columna B
    const estado = fila[7]; // Columna I

    if (terapeutaFila === terapeuta && estado === 'En proceso') {
      contador++;
    }
  });

  return contador;
}

/**
 * Cuenta procesos culminados en el mes
 */
function contarCulminados(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const culminados = ss.getSheetByName('Procesos Culminados');

  if (!culminados || culminados.getLastRow() < 2) return 0;

  const datos = culminados.getRange(2, 1, culminados.getLastRow() - 1, 1).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(fila => {
    const fecha = fila[0];
    if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
      contador++;
    }
  });

  return contador;
}

/**
 * Cuenta retirados en el mes
 */
function contarRetirados(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const retiradx = ss.getSheetByName('Retiradx');

  if (!retiradx || retiradx.getLastRow() < 2) return 0;

  const datos = retiradx.getRange(2, 1, retiradx.getLastRow() - 1, 1).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(fila => {
    const fecha = fila[0];
    if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
      contador++;
    }
  });

  return contador;
}

/**
 * Genera un reporte detallado de todos los casos del mes
 */
function generarReporteDetallado() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Solicitar mes y año
  const respuesta = ui.prompt(
    '📅 Mes a Analizar',
    'Ingresa el mes y año (formato: MM/YYYY)\nEjemplo: 04/2026 para Abril 2026',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) return;

  const input = respuesta.getResponseText();
  const partes = input.split('/');

  if (partes.length !== 2) {
    ui.alert('❌ Formato incorrecto. Usa MM/YYYY (ejemplo: 04/2026)');
    return;
  }

  const mes = parseInt(partes[0]);
  const anio = parseInt(partes[1]);

  if (isNaN(mes) || isNaN(anio) || mes < 1 || mes > 12) {
    ui.alert('❌ Mes o año inválido');
    return;
  }

  generarReporteDetalladoMes(mes, anio);
}

/**
 * Genera reporte detallado para un mes específico
 */
function generarReporteDetalladoMes(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias) {
    SpreadsheetApp.getUi().alert('❌ No se encontró la hoja "Terapias Individual"');
    return;
  }

  const nombreMes = Utilities.formatDate(new Date(anio, mes - 1, 1), Session.getScriptTimeZone(), 'MMMM yyyy');

  let resultado = '📋 REPORTE DETALLADO - ' + nombreMes.toUpperCase() + '\n';
  resultado += '═══════════════════════════════════════════════════\n\n';

  // Obtener todos los datos
  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  if (terapias.getLastRow() > 1) {
    const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();

    resultado += '1️⃣ NUEVOS INGRESOS DEL MES\n';
    resultado += '─────────────────────────────────\n';

    let nuevosIngresos = [];
    datos.forEach((fila, idx) => {
      const fechaIngreso = fila[0];
      const terapeuta = fila[1];
      const participante = fila[3];

      if (participante && fechaIngreso instanceof Date) {
        if (fechaIngreso >= primerDia && fechaIngreso <= ultimoDia) {
          nuevosIngresos.push({
            fila: idx + 2,
            fecha: Utilities.formatDate(fechaIngreso, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
            terapeuta: terapeuta,
            participante: participante
          });
        }
      }
    });

    if (nuevosIngresos.length === 0) {
      resultado += '   ℹ️ No hay nuevos ingresos en este mes\n\n';
    } else {
      nuevosIngresos.forEach(caso => {
        resultado += `   • Fila ${caso.fila}: ${caso.fecha} - ${caso.participante} (${caso.terapeuta})\n`;
      });
      resultado += `\n   TOTAL: ${nuevosIngresos.length} nuevos ingresos\n\n`;
    }

    // Sesiones por terapeuta
    resultado += '2️⃣ SESIONES DEL MES POR TERAPEUTA\n';
    resultado += '─────────────────────────────────\n';

    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    let totalSesiones = 0;

    terapeutas.forEach(terapeuta => {
      let sesiones = 0;
      let casosActivos = [];

      datos.forEach((fila, idx) => {
        const terapeutaFila = fila[1];
        const participante = fila[3];
        const estado = fila[8];
        const asistencias = fila[12] || 0;

        if (terapeutaFila === terapeuta && estado === 'En proceso') {
          sesiones += Number(asistencias);
          if (asistencias > 0) {
            casosActivos.push({
              fila: idx + 2,
              participante: participante,
              asistencias: asistencias
            });
          }
        }
      });

      resultado += `\n   ${terapeuta}: ${sesiones} sesiones\n`;
      if (casosActivos.length > 0) {
        casosActivos.forEach(caso => {
          resultado += `      • Fila ${caso.fila}: ${caso.participante} (${caso.asistencias} asistencias)\n`;
        });
      }

      totalSesiones += sesiones;
    });

    resultado += `\n   TOTAL: ${totalSesiones} sesiones en el mes\n\n`;
  }

  // Culminados y Retirados
  resultado += '3️⃣ PROCESOS FINALIZADOS\n';
  resultado += '─────────────────────────────────\n';

  const culminados = contarCulminados(mes, anio);
  const retirados = contarRetirados(mes, anio);

  resultado += `   • Procesos Culminados: ${culminados}\n`;
  resultado += `   • Retirados/Deserciones: ${retirados}\n`;
  resultado += `   • Total Finalizados: ${culminados + retirados}\n\n`;

  // Mostrar en hoja
  mostrarResultadoEnHoja(resultado, 'Reporte Detallado ' + nombreMes);

  ss.toast('✅ Reporte detallado generado. Revisa la nueva hoja.', 'Reporte', 5);
}

/**
 * Muestra resultado en una nueva hoja
 */
function mostrarResultadoEnHoja(texto, nombreHoja) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar hoja si existe
  let hoja = ss.getSheetByName(nombreHoja);
  if (hoja) {
    ss.deleteSheet(hoja);
  }

  // Crear nueva hoja
  hoja = ss.insertSheet(nombreHoja);

  // Escribir texto línea por línea
  const lineas = texto.split('\n');
  const datos = lineas.map(linea => [linea]);

  hoja.getRange(1, 1, datos.length, 1).setValues(datos);

  // Formato
  hoja.setColumnWidth(1, 800);
  hoja.getRange('A:A').setFontFamily('Courier New').setFontSize(10);

  // Activar hoja
  ss.setActiveSheet(hoja);
}

/**
 * Valida un mes específico del historial
 */
function validarMesEspecifico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.prompt(
    '📅 Validar Mes Específico',
    'Ingresa el mes y año a validar (formato: MM/YYYY)\nEjemplo: 03/2026 para Marzo 2026',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) return;

  const input = respuesta.getResponseText();
  const partes = input.split('/');

  if (partes.length !== 2) {
    ui.alert('❌ Formato incorrecto. Usa MM/YYYY');
    return;
  }

  const mes = parseInt(partes[0]);
  const anio = parseInt(partes[1]);

  if (isNaN(mes) || isNaN(anio) || mes < 1 || mes > 12) {
    ui.alert('❌ Mes o año inválido');
    return;
  }

  validarMesConHistorico(mes, anio);
}

/**
 * Valida un mes comparando el histórico con los datos reales
 */
function validarMesConHistorico(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mensuales = ss.getSheetByName('Reportes Mensuales');

  if (!mensuales) {
    SpreadsheetApp.getUi().alert('❌ No se encontró la hoja "Reportes Mensuales"');
    return;
  }

  const nombreMes = Utilities.formatDate(new Date(anio, mes - 1, 1), Session.getScriptTimeZone(), 'MMMM yyyy');

  // Buscar el mes en Reportes Mensuales
  const datos = mensuales.getDataRange().getValues();
  let filaEncontrada = -1;

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === nombreMes) {
      filaEncontrada = i;
      break;
    }
  }

  let resultado = '🔍 VALIDACIÓN - ' + nombreMes.toUpperCase() + '\n';
  resultado += '═══════════════════════════════════════════════════\n\n';

  if (filaEncontrada === -1) {
    resultado += '⚠️ ESTE MES NO ESTÁ GUARDADO EN "REPORTES MENSUALES"\n\n';
    resultado += 'Posibles razones:\n';
    resultado += '   1. No se ha guardado el reporte mensual de este mes\n';
    resultado += '   2. El mes aún no ha finalizado\n';
    resultado += '   3. El nombre del mes no coincide exactamente\n\n';
    resultado += '💡 Para guardar el reporte actual:\n';
    resultado += '   Menú → 🏥 Apoyo Emocional → 📊 Guardar Reporte Mensual\n';
  } else {
    const fila = datos[filaEncontrada];

    resultado += '✅ MES ENCONTRADO EN REPORTES MENSUALES (fila ' + (filaEncontrada + 1) + ')\n\n';

    // Comparar con datos reales
    const nuevosIngresosHistorico = fila[2]; // Columna C
    const nuevosIngresosReal = contarNuevosIngresos(mes, anio);

    resultado += 'COMPARACIÓN CON DATOS REALES:\n';
    resultado += '─────────────────────────────────\n';
    resultado += `Nuevos Ingresos (Mes):\n`;
    resultado += `   • Histórico: ${nuevosIngresosHistorico}\n`;
    resultado += `   • Real: ${nuevosIngresosReal}\n`;
    resultado += `   • Coincide: ${nuevosIngresosHistorico === nuevosIngresosReal ? '✅' : '❌'}\n\n`;

    if (nuevosIngresosHistorico !== nuevosIngresosReal) {
      resultado += '⚠️ DISCREPANCIA DETECTADA\n\n';
      resultado += 'Posibles causas:\n';
      resultado += '   1. Se agregaron/eliminaron casos después de guardar el reporte\n';
      resultado += '   2. Las fechas de ingreso fueron modificadas\n';
      resultado += '   3. El reporte se guardó antes de completar todo el mes\n\n';
    }
  }

  mostrarResultadoEnHoja(resultado, 'Validación ' + nombreMes);
  ss.toast('✅ Validación completada', 'Validación', 3);
}

/**
 * Corrige las fórmulas del reporte
 */
function corregirFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    '🔧 Corregir Fórmulas del Reporte',
    '¿Quieres actualizar todas las fórmulas del reporte?\n\n' +
    'Esto corregirá:\n' +
    '• Fórmulas de conteo de casos\n' +
    '• Cálculo de sesiones mensuales\n' +
    '• Totales y subtotales\n\n' +
    'Esta acción es segura y no borra datos.',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) return;

  try {
    // Llamar a la función existente del sistema
    actualizarFormulasReporte();
    ui.alert('✅ Fórmulas corregidas exitosamente');
  } catch (error) {
    ui.alert('❌ Error: ' + error.toString());
  }
}
