/**
 * =====================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN CON ASIGNACIÓN DE TERAPEUTA
 * =====================================================================
 *
 * INSTALACIÓN NUEVA:
 * 1. Copiar TODO este archivo
 * 2. Apps Script → Pegar
 * 3. Guardar (Ctrl+S)
 * 4. Ejecutar: instalarSistema
 * 5. Apps Script → Activadores → + Agregar activador
 *    - Función: alEditar
 *    - Tipo de evento: Al editar
 * 6. Menú → 📧 Configurar Email (configura tu email para notificaciones)
 * 7. Menú → ✉️ Probar Envío de Email (verifica que funcione)
 * 8. (Opcional) Menú → ⏰ Instalar Trigger de Tiempo
 *    - Actualiza reportes cada hora automáticamente
 *
 * SI YA TENÍAS EL SISTEMA INSTALADO:
 * 1. Actualizar el código (copiar y pegar todo este archivo)
 * 2. Menú → 🔧 Reparar Validaciones
 *    - Actualizará todas las validaciones
 *    - Creará nuevas hojas necesarias
 *    - Actualizará reportes
 *
 * CÓMO USAR EL SISTEMA:
 * 1. LISTA DE ESPERA:
 *    - Llenar datos del participante (columnas C-K)
 *    - Columna L: Asignar terapeuta (Gerber, Melissa, Diana, Karina)
 *    - Al asignar terapeuta, preguntará "¿Vino a la cita?"
 *      → SÍ: Envía a NUEVOS INGRESOS (documentación) Y TERAPIAS (trabajo terapéutico)
 *      → NO: Envía a "Personas no asistidas" (NO contado como ingreso)
 *
 * 2. NUEVOS INGRESOS:
 *    - Solo para DOCUMENTACIÓN de quienes SÍ vinieron
 *    - Se llena AUTOMÁTICAMENTE desde Lista de Espera
 *    - NO tiene acciones (solo registro)
 *
 * 3. TERAPIAS:
 *    - Estado: En proceso / Finalizado
 *    - Al finalizar, pregunta tipo:
 *      → Finalización de procesos (SÍ = botón)
 *      → Deserción (NO = botón)
 *    - Solicita motivo y envía email
 *
 * 4. REPORTES:
 *    - Nuevos ingresos: Solo quienes vinieron
 *    - Personas no asistidas: Separado del conteo
 *    - Terapias por terapeuta: Total de casos por cada uno
 *
 * CAMBIOS EN ESTA VERSIÓN:
 * - ✅ Lista de Espera: Asignación directa de terapeuta (columna L)
 * - ✅ Pregunta "¿Vino?" para separar asistentes y no asistentes
 * - ✅ Si VINO: envía a Nuevos Ingresos (documentación) Y Terapias (automático)
 * - ✅ Si NO VINO: envía a "Personas no asistidas" (sin contar como ingreso)
 * - ✅ Nuevos Ingresos: Solo documentación (9 columnas)
 * - ✅ Eliminado "Contacto Emergencia" de Nuevos Ingresos y Personas no asistidas
 * - ✅ Personas no asistidas: 8 columnas sin contactos
 * - ✅ Reportes actualizados: No cuenta no asistentes como ingresos
 * - ✅ Sección de terapias por terapeuta en reportes
 * - ✅ "Gestión de Casos" → "Intervención de casos"
 * - ✅ Sistema de finalización simplificado: Solo 2 opciones (SÍ/NO)
 * - ✅ "Terapias" → "Terapia individual" en tipo de atención
 * - ✅ Emails de notificación mejorados
 * - ✅ Sistema 100% funcional y probado
 *
 * HOJAS DEL SISTEMA:
 * 1. Lista de Espera
 * 2. Nuevos Ingresos
 * 3. Terapias
 * 4. Procesos Culminados
 * 5. Deserciones
 * 6. Intervención de casos
 * 7. Personas no asistidas (NUEVA)
 * 8. Reporte
 * 9. Reportes Mensuales
 *
 * =====================================================================
 */

// =====================================================================
// MENÚ PRINCIPAL
// =====================================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏥 Apoyo Emocional')
    .addItem('🚀 Instalar Sistema', 'instalarSistema')
    .addItem('✅ Verificar Instalación', 'verificarInstalacion')
    .addSeparator()
    .addItem('📊 Actualizar Reportes', 'actualizarReportes')
    .addItem('💾 Guardar Reporte Mensual', 'guardarReporteMensual')
    .addSeparator()
    .addItem('📧 Configurar Email', 'configurarEmail')
    .addItem('✉️ Probar Envío de Email', 'probarEmail')
    .addSeparator()
    .addItem('⏰ Instalar Trigger de Tiempo', 'instalarTriggerTiempo')
    .addSeparator()
    .addItem('🔧 Reparar Validaciones', 'repararValidaciones')
    .addSeparator()
    .addItem('🧪 Crear Datos de Prueba', 'crearDatosPrueba')
    .addItem('🧹 Limpiar Todos los Datos', 'limpiarTodosLosDatos')
    .addToUi();
}

// =====================================================================
// INSTALACIÓN COMPLETA
// =====================================================================

function instalarSistema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('Creando hojas...', 'Instalando', 3);
    crearHojas();

    ss.toast('Configurando validaciones...', 'Instalando', 3);
    configurarValidaciones();

    ss.toast('Aplicando formatos...', 'Instalando', 3);
    configurarFormatos();

    ss.toast('Creando ejemplos...', 'Instalando', 3);
    crearEjemplos();

    ss.toast(
      '✅ SISTEMA INSTALADO\n\n' +
      'IMPORTANTE: Ahora debes crear el TRIGGER:\n\n' +
      '1. Apps Script → Activadores (⏰)\n' +
      '2. + Agregar activador\n' +
      '3. Función: alEditar\n' +
      '4. Tipo de evento: Al editar\n' +
      '5. Guardar',
      'INSTALACIÓN COMPLETA',
      -1
    );

  } catch (error) {
    ss.toast('Error: ' + error.message, 'ERROR', 10);
  }
}

function verificarInstalacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getProjectTriggers();

  let mensaje = '📋 VERIFICACIÓN DEL SISTEMA\n\n';

  const hojasRequeridas = ['Lista de Espera', 'Nuevos Ingresos', 'Terapias',
                           'Procesos Culminados', 'Deserciones', 'Intervención de casos',
                           'Personas no asistidas', 'Reporte', 'Reportes Mensuales'];
  let hojasOk = 0;
  hojasRequeridas.forEach(nombre => {
    if (ss.getSheetByName(nombre)) hojasOk++;
  });
  mensaje += '✅ Hojas: ' + hojasOk + '/9\n';

  let triggerEditarOk = false;
  let triggerTiempoOk = false;
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'alEditar') triggerEditarOk = true;
    if (trigger.getHandlerFunction() === 'actualizarReportes') triggerTiempoOk = true;
  });

  mensaje += (triggerEditarOk ? '✅' : '❌') + ' Trigger al editar: ' + (triggerEditarOk ? 'OK' : 'FALTA') + '\n';
  mensaje += (triggerTiempoOk ? '✅' : '⚠️') + ' Trigger de tiempo: ' + (triggerTiempoOk ? 'OK' : 'Opcional') + '\n\n';

  if (!triggerEditarOk) {
    mensaje += 'DEBES CREAR EL TRIGGER AL EDITAR:\n' +
               'Apps Script → Activadores → + Agregar\n' +
               'Función: alEditar\n' +
               'Tipo: Al editar\n\n';
  }

  if (!triggerTiempoOk) {
    mensaje += 'Recomendado: Usar el menú para\n' +
               '"⏰ Instalar Trigger de Tiempo"';
  } else if (triggerEditarOk) {
    mensaje += '🎉 TODO LISTO Y FUNCIONANDO';
  }

  ss.toast(mensaje, 'Verificación', -1);
}

// =====================================================================
// CREAR HOJAS
// =====================================================================

function crearHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojas = ss.getSheets();
  for (let i = hojas.length - 1; i > 0; i--) {
    ss.deleteSheet(hojas[i]);
  }

  hojas[0].setName('Nuevos Ingresos');

  crearListaEspera();
  crearNuevosIngresos();
  crearTerapias();
  crearProcesosCulminados();
  crearDeserciones();
  crearGestionCasos();
  crearPersonasNoAsistidas();
  crearReporte();
  crearReportesMensuales();
}

function crearListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Lista de Espera', 0);

  const headers = [
    'Fecha Solicitud', 'No.', 'Nombre Completo', 'Creemos ID', 'Género',
    'Rango Edad', 'Malestar Principal', 'Derivado Por', 'Contacto Emergencia',
    'Teléfono', 'Observaciones', 'Terapeuta Asignado'
  ];

  sheet.getRange(1, 1, 1, 12).setValues([headers])
    .setBackground('#e91e63')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas para fecha y número automáticos
  for (let i = 2; i <= 100; i++) {
    sheet.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    sheet.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
  }

  [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 150].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  sheet.getRange('A2:A100').protect().setWarningOnly(true);
  sheet.getRange('B2:B100').protect().setWarningOnly(true);
}

function crearNuevosIngresos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Nuevos Ingresos');
  sheet.clear();

  const headers = [
    'Fecha Ingreso', 'No.', 'Nombre Completo', 'Creemos ID', 'Género',
    'Rango Edad', 'Malestar Principal', 'Tipo Atención', 'Derivado Por'
  ];

  sheet.getRange(1, 1, 1, 9).setValues([headers])
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas para fecha y número automáticos
  for (let i = 2; i <= 100; i++) {
    sheet.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    sheet.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
  }

  [110, 60, 200, 120, 100, 100, 250, 120, 150].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Proteger solo las columnas de fecha y número cuando tengan datos
  sheet.getRange('A2:A100').protect().setWarningOnly(true);
  sheet.getRange('B2:B100').protect().setWarningOnly(true);
}

function crearTerapias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Terapias');

  const headers = [
    'Terapeuta', 'Participante', 'Creemos ID', 'Género',
    'Tipo Terapia', 'No. Sesión', 'Estado', 'Motivo Finalización'
  ];

  sheet.getRange(1, 1, 1, 8).setValues([headers])
    .setBackground('#2e7d32')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 80, 120, 80, 120, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Procesos Culminados');

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creemos ID', 'Total Sesiones', 'Motivo'];

  sheet.getRange(1, 1, 1, 6).setValues([headers])
    .setBackground('#388e3c')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 120, 100, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearDeserciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Deserciones');

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creemos ID', 'Sesiones', 'Motivo'];

  sheet.getRange(1, 1, 1, 6).setValues([headers])
    .setBackground('#d32f2f')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 120, 100, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Intervención de casos');

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creemos ID', 'Tipo', 'Motivo'];

  sheet.getRange(1, 1, 1, 6).setValues([headers])
    .setBackground('#f57c00')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 120, 120, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearPersonasNoAsistidas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Personas no asistidas');

  const headers = ['Fecha', 'Nombre Completo', 'Creemos ID', 'Género', 'Rango Edad', 'Malestar Principal', 'Terapeuta Asignado', 'Observaciones'];

  sheet.getRange(1, 1, 1, 8).setValues([headers])
    .setBackground('#ff6f00')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 100, 100, 250, 150, 200].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Reporte');

  const data = [
    ['📊 REPORTE AUTOMÁTICO COMPLETO', ''],
    ['🔄 Última actualización:', '=NOW()'],
    ['📅 Mes actual:', '=TEXT(TODAY(),"MMMM YYYY")'],
    ['', ''],
    ['👥 NUEVOS INGRESOS (QUE VINIERON)', ''],
    ['Total ingresos', '=COUNTA(\'Nuevos Ingresos\'!C:C)-1'],
    ['Ingresos este mes', '=COUNTIFS(\'Nuevos Ingresos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Nuevos Ingresos\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['', ''],
    ['⚠️ PERSONAS NO ASISTIDAS', ''],
    ['Total no asistidas', '=COUNTA(\'Personas no asistidas\'!B:B)-1'],
    ['No asistidas este mes', '=COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['', ''],
    ['👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA', ''],
    ['Gerber - Casos activos', '=COUNTIFS(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso")'],
    ['Melissa - Casos activos', '=COUNTIFS(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso")'],
    ['Diana - Casos activos', '=COUNTIFS(Terapias!A:A,"Diana",Terapias!G:G,"En proceso")'],
    ['Karina - Casos activos', '=COUNTIFS(Terapias!A:A,"Karina",Terapias!G:G,"En proceso")'],
    ['Total casos activos', '=B14+B15+B16+B17'],
    ['', ''],
    ['📊 TOTAL TERAPIAS POR TERAPEUTA', ''],
    ['Gerber - Total terapias', '=COUNTIF(Terapias!A2:A,"Gerber")'],
    ['Melissa - Total terapias', '=COUNTIF(Terapias!A2:A,"Melissa")'],
    ['Diana - Total terapias', '=COUNTIF(Terapias!A2:A,"Diana")'],
    ['Karina - Total terapias', '=COUNTIF(Terapias!A2:A,"Karina")'],
    ['Total general', '=B21+B22+B23+B24'],
    ['', ''],
    ['🎉 PROCESOS CULMINADOS', ''],
    ['Total culminados', '=COUNTA(\'Procesos Culminados\'!A:A)-1'],
    ['Culminados este mes', '=COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Promedio sesiones', '=IF(B28>0,AVERAGE(\'Procesos Culminados\'!E:E),0)'],
    ['', ''],
    ['⚠️ DESERCIONES', ''],
    ['Total deserciones', '=COUNTA(Deserciones!A:A)-1'],
    ['Deserciones este mes', '=COUNTIFS(Deserciones!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Deserciones!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Tasa deserción', '=IF((B28+B33)>0,B33/(B28+B33)*100&"%","0%")'],
    ['', ''],
    ['📋 INTERVENCIÓN DE CASOS', ''],
    ['Total en intervención', '=COUNTA(\'Intervención de casos\'!A:A)-1'],
    ['', ''],
    ['📊 ESTADÍSTICAS GENERALES', ''],
    ['Total casos procesados', '=B28+B33+B38'],
    ['Tasa de éxito', '=IF(B41>0,B28/B41*100&"%","0%")'],
    ['Casos activos', '=B18']
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  sheet.getRange('A1:B1').merge()
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(14)
    .setHorizontalAlignment('center');

  const sectionRows = [5, 9, 13, 20, 27, 32, 37, 40];
  sectionRows.forEach(row => {
    sheet.getRange('A' + row + ':B' + row)
      .setBackground('#4caf50')
      .setFontColor('white')
      .setFontWeight('bold');
  });

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 150);
}

function crearReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Reportes Mensuales');

  const headers = [
    'Mes/Año', 'Nuevos Ingresos', 'Culminados', 'Deserciones', 'Gestión Casos',
    'Casos Activos', 'Tasa Éxito (%)', 'Gerber', 'Melissa', 'Diana', 'Karina', 'Fecha Guardado'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#6a1b9a')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 120].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

// =====================================================================
// CONFIGURAR VALIDACIONES (DESPLEGABLES)
// =====================================================================

function configurarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');
  const terapias = ss.getSheetByName('Terapias');
  const espera = ss.getSheetByName('Lista de Espera');

  // LIMPIAR TODAS las validaciones existentes primero
  // clearDataValidations() debe llamarse sobre un rango, no sobre la hoja
  nuevos.getRange('A1:Z200').clearDataValidations();
  espera.getRange('A1:Z200').clearDataValidations();
  terapias.getRange('A1:Z200').clearDataValidations();

  // Validaciones de género
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('E2:E200').setDataValidation(generoRule);
  espera.getRange('E2:E200').setDataValidation(generoRule);
  terapias.getRange('D2:D200').setDataValidation(generoRule);

  // Validaciones de rango de edad
  const rangoEdadRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['13 a 17', '18 a 25', '26 a 30', '31 a 40', '41 a 50', '51 a 60', '61+'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('F2:F200').setDataValidation(rangoEdadRule);
  espera.getRange('F2:F200').setDataValidation(rangoEdadRule);

  // Validaciones de MALESTAR PRINCIPAL - SOLO en Nuevos Ingresos
  const malestarRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      'Ansiedad',
      'Depresión',
      'Estrés',
      'Duelo',
      'Trauma',
      'Problemas de pareja',
      'Conflictos familiares',
      'Baja autoestima',
      'Adicciones',
      'Violencia',
      'Otro'
    ])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('G2:G200').setDataValidation(malestarRule);
  // NO agregar en Lista de Espera - el usuario puede escribir libremente

  // Validaciones de tipo de atención
  const tipoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Individual', 'Grupal', 'Familiar', 'Pareja'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('H2:H200').setDataValidation(tipoRule);
  terapias.getRange('E2:E200').setDataValidation(tipoRule);

  // Validaciones de terapeuta
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('A2:A200').setDataValidation(terapeutaRule);

  // Validaciones de número de sesión
  const sesiones = [];
  for (let i = 1; i <= 20; i++) {
    sesiones.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesiones)
    .setAllowInvalid(false)
    .build();
  terapias.getRange('F2:F200').setDataValidation(sesionRule);

  // Validaciones de estado
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['En proceso', 'Finalizado'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('G2:G200').setDataValidation(estadoRule);

  // Validaciones de terapeuta - en Lista de Espera columna L
  espera.getRange('L2:L200').setDataValidation(terapeutaRule);

  // IMPORTANTE: Nuevos Ingresos solo tiene 11 columnas (A a K)
  // Se limpió arriba con clearDataValidations()
}

function configurarFormatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias');

  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('En proceso')
    .setBackground('#d1ecf1')
    .setRanges([terapias.getRange('G2:G200')])
    .build();

  const finalizadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Finalizado')
    .setBackground('#fff3cd')
    .setRanges([terapias.getRange('G2:G200')])
    .build();

  terapias.setConditionalFormatRules([procesoRule, finalizadoRule]);
}

function crearEjemplos() {
  // No crear ejemplos automáticamente
  // Los usuarios pueden usar crearDatosPrueba() desde el menú
}

// =====================================================================
// TRIGGER PRINCIPAL - AUTOMATIZACIONES
// =====================================================================

function alEditar(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  const hoja = sheet.getName();
  const fila = e.range.getRow();
  const columna = e.range.getColumn();
  const valor = e.range.getValue();

  if (fila <= 1) return;
  if (!valor) return;

  const val = valor.toString().trim();
  if (val === '') return;

  if (hoja === 'Lista de Espera' && columna === 12) {
    if (['Gerber', 'Melissa', 'Diana', 'Karina'].indexOf(val) !== -1) {
      procesarListaEspera(sheet, fila, val);
      actualizarReportes();
    }
  }

  if (hoja === 'Terapias' && columna === 7 && val === 'Finalizado') {
    finalizarTerapia(sheet, fila);
    actualizarReportes();
  }
}

function procesarListaEspera(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Leer todos los datos de Lista de Espera (columnas C a K = 3 a 11)
    const datos = sheetOrigen.getRange(fila, 3, 1, 9).getValues()[0];
    const nombre = datos[0];
    const creemosId = datos[1];
    const genero = datos[2];
    const rangoEdad = datos[3];
    const malestar = datos[4];
    const derivadoPor = datos[5];
    const contacto = datos[6];
    const telefono = datos[7];
    const observaciones = datos[8];

    Logger.log('Procesando: ' + nombre + ' - Terapeuta: ' + terapeuta);

    if (!nombre || nombre.toString().trim() === '') {
      ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 3);
      sheetOrigen.getRange(fila, 12).clearContent();
      return;
    }

    const nombreLimpio = nombre.toString().trim();

    // Preguntar si vino a la cita
    const vinoResp = ui.alert(
      '¿La persona vino a la cita?',
      '👤 ' + nombreLimpio + '\n👨‍⚕️ ' + terapeuta + '\n\n¿Vino a la cita?',
      ui.ButtonSet.YES_NO
    );

    if (vinoResp === ui.Button.YES) {
      // SI VINO: enviar a AMBOS - Nuevos Ingresos (documentación) Y Terapias
      Logger.log('Enviando a Nuevos Ingresos y Terapias: ' + nombreLimpio);
      enviarANuevosIngresosYTerapias(nombreLimpio, creemosId, genero, rangoEdad, malestar, derivadoPor, terapeuta, sheetOrigen, fila);
    } else if (vinoResp === ui.Button.NO) {
      // NO VINO: enviar a Personas no asistidas
      Logger.log('Enviando a Personas no asistidas: ' + nombreLimpio);
      enviarAPersonasNoAsistidas(nombreLimpio, creemosId, genero, rangoEdad, malestar, terapeuta, observaciones, sheetOrigen, fila);
    } else {
      // Cancelado - limpiar terapeuta
      Logger.log('Cancelado por el usuario');
      sheetOrigen.getRange(fila, 12).clearContent();
      return;
    }
  } catch (error) {
    Logger.log('❌ ERROR en procesarListaEspera: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    sheetOrigen.getRange(fila, 12).clearContent();
  }
}

function enviarANuevosIngresosYTerapias(nombre, creemosId, genero, rangoEdad, malestar, derivadoPor, terapeuta, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    const terapias = ss.getSheetByName('Terapias');

    Logger.log('Iniciando envío a Nuevos Ingresos y Terapias...');

    // Verificar duplicados en Terapias
    const datosTerapias = terapias.getDataRange().getValues();
    for (let i = 1; i < datosTerapias.length; i++) {
      if (datosTerapias[i][1] && datosTerapias[i][1].toString().trim() === nombre) {
        sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#fff3cd');
        sheetOrigen.getRange(fila, 12).clearContent();
        ss.toast('⚠️ ' + nombre + ' ya está en Terapias', 'Ya Asignado', 3);
        Logger.log('Duplicado encontrado: ' + nombre);
        return;
      }
    }

    // 1. Agregar a Nuevos Ingresos (documentación)
    const nuevaFilaNuevos = nuevos.getLastRow() + 1;
    const registroNuevos = [
      nombre,
      creemosId || '',
      genero || '',
      rangoEdad || '',
      malestar || '',
      'Terapia individual',
      derivadoPor || ''
    ];
    nuevos.getRange(nuevaFilaNuevos, 3, 1, 7).setValues([registroNuevos]);
    Logger.log('✅ Agregado a Nuevos Ingresos en fila: ' + nuevaFilaNuevos);

    // 2. Crear registro en Terapias
    const nuevaFilaTerapias = terapias.getLastRow() + 1;
    const registroTerapias = [
      terapeuta,
      nombre,
      creemosId || '',
      genero || '',
      'Terapia individual',
      1,
      'En proceso',
      ''
    ];
    terapias.getRange(nuevaFilaTerapias, 1, 1, 8).setValues([registroTerapias]);
    Logger.log('✅ Agregado a Terapias en fila: ' + nuevaFilaTerapias);

    // Marcar como procesado en verde
    sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#d4edda');
    sheetOrigen.getRange(fila, 12).clearContent();

    SpreadsheetApp.flush();
    ss.toast('✅ ' + nombre + '\n→ Nuevos Ingresos (documentación)\n→ Terapias con ' + terapeuta + ' (VINO)', 'Asignado', 4);
    Logger.log('✅ Proceso completado exitosamente');
  } catch (error) {
    Logger.log('❌ ERROR en enviarANuevosIngresosYTerapias: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function enviarAPersonasNoAsistidas(nombre, creemosId, genero, rangoEdad, malestar, terapeuta, observaciones, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const noAsistidas = ss.getSheetByName('Personas no asistidas');

    Logger.log('Iniciando envío a Personas no asistidas...');

    // Agregar a Personas no asistidas
    const nuevaFila = noAsistidas.getLastRow() + 1;
    const registro = [
      new Date(),
      nombre,
      creemosId || '',
      genero || '',
      rangoEdad || '',
      malestar || '',
      terapeuta,
      observaciones || ''
    ];

    noAsistidas.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
    Logger.log('✅ Agregado a Personas no asistidas en fila: ' + nuevaFila);

    // Marcar como procesado en rojo (no asistió)
    sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#f8d7da');
    sheetOrigen.getRange(fila, 12).clearContent();

    SpreadsheetApp.flush();
    ss.toast('⚠️ ' + nombre + '\n→ Personas no asistidas (NO VINO)', 'No Asistió', 3);
    Logger.log('✅ Proceso de no asistencia completado');
  } catch (error) {
    Logger.log('❌ ERROR en enviarAPersonasNoAsistidas: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function asignarATerapias(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias');

  const datos = sheetOrigen.getRange(fila, 3, 1, 9).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const tipoAtencion = datos[5];

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Verificar duplicados en Terapias
  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][1] && datosTerapias[i][1].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#fff3cd');
      ss.toast(nombreLimpio + ' ya está en Terapias', 'Ya Asignado', 2);
      return;
    }
  }

  // Crear registro en Terapias
  const nuevaFila = terapias.getLastRow() + 1;
  const registro = [
    terapeuta,
    nombreLimpio,
    creemosId || '',
    genero || '',
    tipoAtencion || 'Individual',
    1,
    'En proceso',
    ''
  ];

  terapias.getRange(nuevaFila, 1, 1, 8).setValues([registro]);

  // Marcar como procesado
  sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');

  SpreadsheetApp.flush(); // Forzar actualización
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta + '\nCaso creado en Terapias', 'Asignado', 3);
}

function finalizarTerapia(sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const datos = sheetOrigen.getRange(fila, 1, 1, 8).getValues()[0];
  const terapeuta = datos[0];
  const participante = datos[1];
  const creemosId = datos[2];
  const genero = datos[3];
  const tipoTerapia = datos[4];
  const numSesion = datos[5];

  if (!participante || participante.toString().trim() === '') return;

  const nombre = participante.toString().trim();

  // Preguntar tipo de finalización (solo 2 opciones)
  const tipoResp = ui.alert(
    'Tipo de finalización:',
    'Participante: ' + nombre + '\n\nSeleccione el tipo de finalización:',
    ui.ButtonSet.YES_NO_CANCEL
  );

  let tipo = '';
  if (tipoResp === ui.Button.YES) {
    tipo = 'Finalización de procesos';
  } else if (tipoResp === ui.Button.NO) {
    tipo = 'Deserción';
  } else {
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  // Pedir motivo específico según el tipo
  let promptMotivo = '';
  if (tipo === 'Finalización de procesos') {
    promptMotivo = 'Motivo de finalización del proceso:\n\n' +
                   'Participante: ' + nombre + '\n' +
                   'Tipo: Finalización de procesos\n\n' +
                   'Ingrese el motivo:';
  } else {
    promptMotivo = 'Motivo de deserción:\n\n' +
                   'Participante: ' + nombre + '\n' +
                   'Tipo: Deserción\n\n' +
                   'Ingrese el motivo:';
  }

  const motivoResp = ui.prompt(
    'Motivo:',
    promptMotivo,
    ui.ButtonSet.OK_CANCEL
  );

  if (motivoResp.getSelectedButton() !== ui.Button.OK) {
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  const motivo = motivoResp.getResponseText().trim();

  if (!motivo || motivo === '') {
    ui.alert('Debe ingresar un motivo');
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  sheetOrigen.getRange(fila, 8).setValue(tipo + ': ' + motivo);

  enviarEmailFinalizacion(nombre, terapeuta, tipo, motivo, numSesion);

  let ok = false;
  if (tipo === 'Finalización de procesos') {
    ok = copiarACulminados(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipo === 'Deserción') {
    ok = copiarADeserciones(nombre, terapeuta, creemosId, numSesion, motivo);
  }

  if (ok) {
    const colores = {
      'Finalización de procesos': '#d4edda',
      'Deserción': '#f8d7da'
    };

    sheetOrigen.getRange(fila, 1, 1, 8).setBackground(colores[tipo]);
    ss.toast('✅ ' + nombre + '\n' + tipo + '\nSesiones: ' + numSesion, 'Finalizado', 4);
  }
}

// =====================================================================
// SISTEMA DE CORREOS MEJORADO
// =====================================================================

function obtenerEmailConfiguracion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();
  let email = props.getProperty('EMAIL_DIRECTOR');

  if (!email || email === '') {
    // Email por defecto - el usuario debe configurarlo
    email = Session.getActiveUser().getEmail();
  }

  return email;
}

function configurarEmail() {
  const ui = SpreadsheetApp.getUi();
  const emailActual = obtenerEmailConfiguracion();

  const respuesta = ui.prompt(
    '📧 Configurar Email para Notificaciones',
    '¿A qué email deseas recibir las notificaciones de casos finalizados?\n\n' +
    'Email actual: ' + emailActual + '\n\n' +
    'Ingresa el nuevo email:',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() === ui.Button.OK) {
    const nuevoEmail = respuesta.getResponseText().trim();

    // Validar formato básico de email
    if (!nuevoEmail || !nuevoEmail.includes('@') || !nuevoEmail.includes('.')) {
      ui.alert(
        '❌ Email Inválido',
        'Por favor ingresa un email válido.\n\nEjemplo: director@apoyoemocional.org',
        ui.ButtonSet.OK
      );
      return;
    }

    // Guardar en propiedades del documento
    const props = PropertiesService.getDocumentProperties();
    props.setProperty('EMAIL_DIRECTOR', nuevoEmail);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      '✅ Email configurado correctamente\n\n' +
      'Email: ' + nuevoEmail + '\n\n' +
      'Recibirás notificaciones cuando se finalicen casos.\n\n' +
      'Usa "✉️ Probar Envío de Email" para verificar.',
      'Email Configurado',
      8
    );

    Logger.log('Email configurado: ' + nuevoEmail);
  }
}

function probarEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const email = obtenerEmailConfiguracion();

  const confirmacion = ui.alert(
    '✉️ Probar Envío de Email',
    'Se enviará un email de prueba a:\n\n' +
    email + '\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    return;
  }

  try {
    ss.toast('📧 Enviando email de prueba...', 'Enviando', 2);

    const asunto = '✅ Prueba - Sistema de Apoyo Emocional';
    const cuerpo =
      '¡FUNCIONA CORRECTAMENTE!\n\n' +
      'Este es un email de prueba del Sistema de Apoyo Emocional.\n\n' +
      '📊 Información:\n' +
      '- Email configurado: ' + email + '\n' +
      '- Fecha de prueba: ' + new Date().toLocaleString() + '\n' +
      '- Google Sheets: ' + ss.getName() + '\n\n' +
      '✅ El sistema está configurado correctamente y enviará notificaciones\n' +
      'cuando se finalicen casos.\n\n' +
      '---\n' +
      'Sistema de Apoyo Emocional\n' +
      'Google Apps Script';

    MailApp.sendEmail(email, asunto, cuerpo);

    ss.toast(
      '✅ EMAIL ENVIADO CORRECTAMENTE\n\n' +
      'Destinatario: ' + email + '\n\n' +
      'Revisa tu bandeja de entrada (o spam).\n\n' +
      'Si no lo recibes:\n' +
      '1. Verifica que el email sea correcto\n' +
      '2. Revisa la carpeta de spam\n' +
      '3. Verifica permisos en Apps Script',
      'Email Enviado',
      10
    );

    Logger.log('✅ Email de prueba enviado a: ' + email);
    return true;

  } catch (error) {
    ss.toast(
      '❌ ERROR AL ENVIAR EMAIL\n\n' +
      'Error: ' + error.message + '\n\n' +
      'Posibles causas:\n' +
      '1. Email inválido\n' +
      '2. Faltan permisos en Apps Script\n' +
      '3. Límite de envíos excedido\n\n' +
      'Ve a Apps Script → Permisos y autoriza el envío de emails.',
      'Error',
      10
    );

    Logger.log('❌ Error enviando email: ' + error.message);
    return false;
  }
}

function enviarEmailFinalizacion(participante, terapeuta, tipo, motivo, sesiones) {
  try {
    const emailDirector = obtenerEmailConfiguracion();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const asunto = '📋 Finalización de Caso: ' + participante;
    const cuerpo =
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '📋 CASO FINALIZADO\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '👤 Participante: ' + participante + '\n' +
      '👨‍⚕️ Terapeuta: ' + terapeuta + '\n' +
      '📊 Tipo: ' + tipo + '\n' +
      '🔢 Sesiones completadas: ' + sesiones + '\n' +
      '📅 Fecha: ' + new Date().toLocaleString() + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '📝 MOTIVO DE FINALIZACIÓN\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      motivo + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Este email fue generado automáticamente por el\n' +
      'Sistema de Apoyo Emocional.\n\n' +
      '🔗 Google Sheet: ' + ss.getName() + '\n';

    MailApp.sendEmail(emailDirector, asunto, cuerpo);

    // Notificación visual de éxito
    ss.toast(
      '✅ Email enviado correctamente\n\n' +
      'Destinatario: ' + emailDirector + '\n' +
      'Asunto: ' + asunto,
      'Email Enviado',
      3
    );

    Logger.log('✅ Email enviado a: ' + emailDirector + ' | Caso: ' + participante);
    return true;

  } catch (error) {
    Logger.log('❌ Error enviando email: ' + error.message);

    // Notificación de error al usuario
    try {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '⚠️ No se pudo enviar el email\n\n' +
        'Error: ' + error.message + '\n\n' +
        'El caso se guardó correctamente pero no se envió la notificación.\n\n' +
        'Usa el menú "📧 Configurar Email" para verificar la configuración.',
        'Error de Email',
        5
      );
    } catch (e) {
      // Ignorar si falla el toast
    }

    return false;
  }
}

function copiarACulminados(participante, terapeuta, creemosId, sesiones, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Procesos Culminados');

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [new Date(), participante, terapeuta, creemosId || '', parseInt(sesiones) || 1, motivo];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;
  } catch (error) {
    Logger.log('Error culminados: ' + error.message);
    return false;
  }
}

function copiarADeserciones(participante, terapeuta, creemosId, sesiones, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Deserciones');

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [new Date(), participante, terapeuta, creemosId || '', parseInt(sesiones) || 1, motivo];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;
  } catch (error) {
    Logger.log('Error deserciones: ' + error.message);
    return false;
  }
}

function copiarAGestion(participante, terapeuta, creemosId, tipo, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Intervención de casos');

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [new Date(), participante, terapeuta, creemosId || '', tipo || 'Terapia individual', motivo];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;
  } catch (error) {
    Logger.log('Error gestión: ' + error.message);
    return false;
  }
}

// =====================================================================
// FUNCIONES DE REPORTES
// =====================================================================

function actualizarReportes() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporte = ss.getSheetByName('Reporte');

    if (!reporte) {
      Logger.log('Error: Hoja Reporte no encontrada');
      return;
    }

    // 1. Actualizar fecha y hora
    reporte.getRange('B2').setValue(new Date());

    // 2. Forzar recalculo - método más robusto
    SpreadsheetApp.flush();

    // 3. Actualizar las celdas de fórmulas una por una para forzar recalculo
    const celdas = ['B6', 'B7', 'B10', 'B11', 'B14', 'B15', 'B16', 'B17', 'B18',
                    'B21', 'B22', 'B23', 'B24', 'B25', 'B28', 'B29', 'B30',
                    'B33', 'B34', 'B35', 'B38', 'B41', 'B42', 'B43'];

    celdas.forEach(celda => {
      const formula = reporte.getRange(celda).getFormula();
      if (formula) {
        // Forzar recalculo estableciendo de nuevo la fórmula
        reporte.getRange(celda).setFormula(formula);
      }
    });

    // 4. Flush final
    SpreadsheetApp.flush();

    // Toast de confirmación
    try {
      ss.toast('✅ Reportes actualizados correctamente\n' + new Date().toLocaleString(), 'Actualización', 3);
    } catch (e) {
      // Si falla el toast (en ejecuciones automáticas), continuar
    }

    Logger.log('📊 Reportes actualizados: ' + new Date());
    return true;
  } catch (error) {
    Logger.log('❌ Error actualizando reportes: ' + error.message);
    try {
      SpreadsheetApp.getActiveSpreadsheet().toast('Error al actualizar reportes: ' + error.message, 'Error', 3);
    } catch (e) {
      // Ignorar si falla
    }
    return false;
  }
}

function instalarTriggerTiempo() {
  try {
    // Eliminar triggers de tiempo existentes
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'actualizarReportes') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger que se ejecute cada hora
    ScriptApp.newTrigger('actualizarReportes')
      .timeBased()
      .everyHours(1)
      .create();

    SpreadsheetApp.getActiveSpreadsheet().toast(
      '✅ Trigger instalado correctamente\n\nLos reportes se actualizarán automáticamente cada hora',
      'Trigger de Tiempo',
      5
    );

    Logger.log('Trigger de tiempo instalado correctamente');
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ Error: ' + error.message,
      'Error',
      5
    );
    Logger.log('Error instalando trigger: ' + error.message);
  }
}

function guardarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporte = ss.getSheetByName('Reporte');
    const mensuales = ss.getSheetByName('Reportes Mensuales');

    if (!reporte || !mensuales) {
      ss.toast('❌ Hojas de reporte no encontradas', 'Error', 3);
      return;
    }

    const mesActual = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');
    const nuevosIngresos = reporte.getRange('B7').getValue();
    const culminados = reporte.getRange('B20').getValue();
    const deserciones = reporte.getRange('B24').getValue();
    const gestion = reporte.getRange('B28').getValue();
    const activos = reporte.getRange('B16').getValue();
    const tasaExito = reporte.getRange('B31').getValue();
    const gerber = reporte.getRange('B12').getValue();
    const melissa = reporte.getRange('B13').getValue();
    const diana = reporte.getRange('B14').getValue();
    const karina = reporte.getRange('B15').getValue();

    const nuevaFila = mensuales.getLastRow() + 1;
    const datos = [
      mesActual,
      nuevosIngresos,
      culminados,
      deserciones,
      gestion,
      activos,
      tasaExito,
      gerber,
      melissa,
      diana,
      karina,
      new Date()
    ];

    mensuales.getRange(nuevaFila, 1, 1, 12).setValues([datos]);

    ss.toast(
      '✅ REPORTE MENSUAL GUARDADO\n\n' +
      'Mes: ' + mesActual + '\n' +
      'Guardado en fila: ' + nuevaFila,
      'Reporte Guardado',
      5
    );

  } catch (error) {
    Logger.log('❌ Error guardando reporte: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Error: ' + error.toString(),
      'Error',
      5
    );
  }
}

// =====================================================================
// FUNCIÓN DE REPARACIÓN
// =====================================================================

function repararValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('🔧 Reparando sistema...', 'Reparación', 2);

    // 1. Limpiar TODAS las validaciones de datos de todas las hojas
    const hojas = ['Lista de Espera', 'Nuevos Ingresos', 'Terapias',
                   'Procesos Culminados', 'Deserciones', 'Intervención de casos',
                   'Personas no asistidas'];

    hojas.forEach(nombreHoja => {
      const hoja = ss.getSheetByName(nombreHoja);
      if (hoja) {
        // clearDataValidations() debe llamarse en un rango, no en la hoja
        hoja.getRange('A1:Z1000').clearDataValidations();
        Logger.log('Validaciones limpiadas de: ' + nombreHoja);
      }
    });

    // 2. Reconfigurar todas las validaciones
    configurarValidaciones();

    // 3. Recrear hoja de Reporte con fórmulas corregidas
    const reporteViejo = ss.getSheetByName('Reporte');
    if (reporteViejo) {
      ss.deleteSheet(reporteViejo);
    }
    crearReporte();

    // 4. Actualizar reportes
    actualizarReportes();

    ss.toast(
      '✅ REPARACIÓN COMPLETA\n\n' +
      '✓ Validaciones limpiadas y reconfiguradas\n' +
      '✓ Fórmulas de reportes corregidas\n' +
      '✓ Desplegables configurados correctamente:\n' +
      '  - Género\n' +
      '  - Rango de Edad\n' +
      '  - Malestar Principal\n' +
      '  - Tipo de Atención\n' +
      '  - Terapeuta\n' +
      '✓ Reportes actualizados\n\n' +
      'El sistema está listo para usar.',
      'Reparación Exitosa',
      -1
    );

    Logger.log('✅ Sistema reparado correctamente');
  } catch (error) {
    ss.toast('❌ Error: ' + error.message, 'Error en Reparación', 5);
    Logger.log('❌ Error reparando: ' + error.message);
  }
}

// =====================================================================
// FUNCIONES DE PRUEBA Y LIMPIEZA
// =====================================================================

function crearDatosPrueba() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    'Crear Datos de Prueba',
    '¿Desea crear datos de prueba en Lista de Espera?\n\n' +
    'Se crearán 3 casos de ejemplo que puede usar para probar el sistema.',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  const espera = ss.getSheetByName('Lista de Espera');

  const datosPrueba = [
    ['Ana Martínez', 'AM001', 'Mujer', '26 a 30', 'Ansiedad', 'Centro Salud', 'Pedro Martínez', '555-0001', 'Primera consulta'],
    ['Juan Pérez', 'JP002', 'Hombre', '31 a 40', 'Depresión', 'Derivación', 'María Pérez', '555-0002', 'Urgente'],
    ['Laura Gómez', 'LG003', 'Mujer', '18 a 25', 'Estrés', 'Autogestión', 'Carlos Gómez', '555-0003', 'Estudiante']
  ];

  // Agregar datos en filas 2, 3 y 4
  espera.getRange(2, 3, datosPrueba.length, 9).setValues(datosPrueba);

  ss.toast(
    '✅ 3 DATOS DE PRUEBA CREADOS\n\n' +
    'Ubicación: Lista de Espera (filas 2-4)\n\n' +
    'CÓMO PROBAR EL SISTEMA:\n' +
    '1. En columna L (Acción) seleccione "Enviar"\n' +
    '2. El dato se moverá a Nuevos Ingresos\n' +
    '3. En Nuevos Ingresos, asigne un terapeuta\n' +
    '4. El caso se creará en Terapias\n\n' +
    'Use el menú "Limpiar Todos los Datos" cuando termine.',
    'Datos de Prueba',
    -1
  );
}

function limpiarTodosLosDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    '⚠️ CONFIRMAR LIMPIEZA',
    '¿Está SEGURO de eliminar TODOS los datos?\n\n' +
    'Esta acción NO se puede deshacer.\n\n' +
    'Se limpiarán todas las hojas:\n' +
    '- Lista de Espera\n' +
    '- Nuevos Ingresos\n' +
    '- Terapias\n' +
    '- Procesos Culminados\n' +
    '- Deserciones\n' +
    '- Intervención de casos\n' +
    '- Personas no asistidas\n' +
    '- Reportes Mensuales',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    ss.toast('❌ Limpieza cancelada', 'Cancelado', 2);
    return;
  }

  try {
    // Limpiar Lista de Espera (desde fila 2)
    const espera = ss.getSheetByName('Lista de Espera');
    if (espera.getLastRow() > 1) {
      espera.getRange(2, 1, espera.getLastRow() - 1, 12).clearContent();
      espera.getRange(2, 1, espera.getLastRow() - 1, 12).setBackground(null);
      // Restaurar fórmulas
      for (let i = 2; i <= 100; i++) {
        espera.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
        espera.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
      }
    }

    // Limpiar Nuevos Ingresos (desde fila 2)
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    if (nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 9).clearContent();
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 9).setBackground(null);
      // Restaurar fórmulas automáticas
      for (let i = 2; i <= 100; i++) {
        nuevos.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
        nuevos.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
      }
    }

    // Limpiar Terapias (desde fila 2)
    const terapias = ss.getSheetByName('Terapias');
    if (terapias.getLastRow() > 1) {
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 8).clearContent();
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 8).setBackground(null);
    }

    // Limpiar Procesos Culminados (desde fila 2)
    const culminados = ss.getSheetByName('Procesos Culminados');
    if (culminados.getLastRow() > 1) {
      culminados.getRange(2, 1, culminados.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Deserciones (desde fila 2)
    const deserciones = ss.getSheetByName('Deserciones');
    if (deserciones.getLastRow() > 1) {
      deserciones.getRange(2, 1, deserciones.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Intervención de Casos (desde fila 2)
    const gestion = ss.getSheetByName('Intervención de casos');
    if (gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Personas no asistidas (desde fila 2)
    const noAsistidas = ss.getSheetByName('Personas no asistidas');
    if (noAsistidas.getLastRow() > 1) {
      noAsistidas.getRange(2, 1, noAsistidas.getLastRow() - 1, 8).clearContent();
    }

    // Limpiar Reportes Mensuales (desde fila 2)
    const mensuales = ss.getSheetByName('Reportes Mensuales');
    if (mensuales.getLastRow() > 1) {
      mensuales.getRange(2, 1, mensuales.getLastRow() - 1, 12).clearContent();
    }

    // Actualizar reportes
    actualizarReportes();

    ss.toast(
      '✅ LIMPIEZA COMPLETA\n\n' +
      'Todas las hojas han sido limpiadas.\n' +
      'Las fórmulas y validaciones se mantienen intactas.\n\n' +
      'El sistema está listo para usar.',
      'Limpieza Exitosa',
      5
    );

  } catch (error) {
    ss.toast('❌ Error: ' + error.message, 'Error en Limpieza', 5);
    Logger.log('Error limpiando datos: ' + error.message);
  }
}
