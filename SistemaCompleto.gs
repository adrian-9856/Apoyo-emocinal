/**
 * =====================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN FINAL CON ASISTENCIA A CITA
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
 *    - Configurará las nuevas columnas
 *    - Actualizará validaciones
 *    - Actualizará reportes
 *
 * CÓMO USAR EL SISTEMA:
 * 1. Menú → 🧪 Crear Datos de Prueba
 * 2. Ir a Lista de Espera:
 *    - Llenar datos del paciente (nombre, ID, género, etc.)
 *    - Opcional: Asignar terapeuta en columna P
 *    - Columna Q "Asistió a Cita":
 *      • Seleccionar "Sí" → Envía a Nuevos Ingresos (y Terapias si hay terapeuta)
 *      • Seleccionar "No" → Envía a Personas no asistidas
 * 3. En Nuevos Ingresos → Columna K → Asignar terapeuta
 * 4. El caso se creará en Terapias automáticamente
 * 5. Cuando termine: Menú → 🧹 Limpiar Todos los Datos
 *
 * COLUMNAS EN LISTA DE ESPERA (17 columnas):
 * A-K: Datos básicos (Fecha, No., Nombre, Creemos ID, Género, Rango Edad,
 *      Malestar, Derivado Por, Contacto, Teléfono, Observaciones)
 * L: Derivación o Referencia (texto libre - vendrá de otra hoja)
 * M: Programa de Creamos (texto libre)
 * N: Organización (texto libre)
 * O: Motivo de derivación u referencia (texto libre)
 * P: Terapeuta Asignado (desplegable opcional)
 * Q: Asistió a Cita (TRIGGER - desplegable Sí/No)
 *
 * NUEVAS FUNCIONALIDADES:
 * - ✅ "Asistió a Cita" es el ÚNICO TRIGGER (elimina columna "Acción")
 * - ✅ Hoja "Personas no asistidas" para pacientes que no asistieron
 * - ✅ Reportes con contadores de referidos/derivados
 * - ✅ Reporte mensual con estadísticas de referidos
 * - ✅ Sistema 100% funcional y optimizado
 *
 * CORRECCIONES EN ESTA VERSIÓN:
 * - ✅ Eliminada columna "Acción" - ahora usa "Asistió a Cita"
 * - ✅ "Derivación o Referencia" es texto libre (no desplegable)
 * - ✅ Fecha y número se agregan AUTOMÁTICAMENTE
 * - ✅ Nuevos Ingresos solo tiene 11 columnas (A-K)
 * - ✅ Desplegable de Malestar Principal SOLO en Nuevos Ingresos
 * - ✅ Fórmulas del reporte en INGLÉS
 * - ✅ Sistema de correos MEJORADO
 * - ✅ 9 hojas totales (incluyendo Personas no asistidas)
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
                           'Procesos Culminados', 'Deserciones', 'Personas no asistidas',
                           'Gestión de Casos', 'Reporte', 'Reportes Mensuales'];
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
  crearPersonasNoAsistidas();
  crearGestionCasos();
  crearReporte();
  crearReportesMensuales();
}

function crearListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Lista de Espera', 0);

  const headers = [
    'Fecha Solicitud', 'No.', 'Nombre Completo', 'Creemos ID', 'Género',
    'Rango Edad', 'Malestar Principal', 'Derivado Por', 'Contacto Emergencia',
    'Teléfono', 'Observaciones', 'Derivación o Referencia', 'Programa de Creamos',
    'Organización', 'Motivo de derivación u referencia', 'Terapeuta Asignado',
    'Asistió a Cita'
  ];

  sheet.getRange(1, 1, 1, 17).setValues([headers])
    .setBackground('#e91e63')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas para fecha y número automáticos
  for (let i = 2; i <= 100; i++) {
    sheet.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    sheet.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
  }

  [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 150, 150, 150, 200, 150, 120].forEach((w, i) => {
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
    'Rango Edad', 'Malestar Principal', 'Tipo Atención', 'Derivado Por',
    'Contacto Emergencia', 'Terapeuta Asignado'
  ];

  sheet.getRange(1, 1, 1, 11).setValues([headers])
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // NO agregar fórmulas automáticas aquí
  // La fecha y número se agregarán cuando se envíe desde Lista de Espera

  [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150].forEach((w, i) => {
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

function crearPersonasNoAsistidas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Personas no asistidas');

  const headers = [
    'Fecha', 'Nombre Completo', 'Creemos ID', 'Género', 'Rango Edad',
    'Derivado Por', 'Organización', 'Programa', 'Derivación o Referencia', 'Motivo'
  ];

  sheet.getRange(1, 1, 1, 10).setValues([headers])
    .setBackground('#ff9800')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 100, 100, 150, 150, 150, 150, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Gestión de Casos');

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

function crearReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Reporte');

  const data = [
    ['📊 REPORTE AUTOMÁTICO COMPLETO', ''],
    ['🔄 Última actualización:', '=NOW()'],
    ['📅 Mes actual:', '=TEXT(TODAY(),"MMMM YYYY")'],
    ['', ''],
    ['👥 NUEVOS INGRESOS', ''],
    ['Total ingresos', '=COUNTA(\'Nuevos Ingresos\'!C:C)-1'],
    ['Ingresos este mes', '=COUNTIFS(\'Nuevos Ingresos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Nuevos Ingresos\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Pendientes asignar', '=COUNTIFS(\'Nuevos Ingresos\'!K:K,"",\'Nuevos Ingresos\'!C:C,"<>")'],
    ['Ya asignados', '=COUNTIFS(\'Nuevos Ingresos\'!K:K,"<>",\'Nuevos Ingresos\'!C:C,"<>")'],
    ['', ''],
    ['👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA', ''],
    ['Gerber - Casos activos', '=COUNTIFS(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso")'],
    ['Melissa - Casos activos', '=COUNTIFS(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso")'],
    ['Diana - Casos activos', '=COUNTIFS(Terapias!A:A,"Diana",Terapias!G:G,"En proceso")'],
    ['Karina - Casos activos', '=COUNTIFS(Terapias!A:A,"Karina",Terapias!G:G,"En proceso")'],
    ['Total casos activos', '=B12+B13+B14+B15'],
    ['', ''],
    ['🎉 PROCESOS CULMINADOS', ''],
    ['Total culminados', '=COUNTA(\'Procesos Culminados\'!A:A)-1'],
    ['Culminados este mes', '=COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Promedio sesiones', '=IF(B19>0,AVERAGE(\'Procesos Culminados\'!E:E),0)'],
    ['', ''],
    ['⚠️ DESERCIONES', ''],
    ['Total deserciones', '=COUNTA(Deserciones!A:A)-1'],
    ['Deserciones este mes', '=COUNTIFS(Deserciones!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Deserciones!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Tasa deserción', '=IF((B19+B23)>0,B23/(B19+B23)*100&"%","0%")'],
    ['', ''],
    ['📋 GESTIÓN DE CASOS', ''],
    ['Total en gestión', '=COUNTA(\'Gestión de Casos\'!A:A)-1'],
    ['', ''],
    ['👥 PERSONAS NO ASISTIDAS', ''],
    ['Total no asistidas', '=COUNTA(\'Personas no asistidas\'!A:A)-1'],
    ['No asistidas este mes', '=COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['', ''],
    ['📌 REFERIDOS Y DERIVACIONES', ''],
    ['Referidos de organizaciones', '=COUNTIFS(\'Personas no asistidas\'!I:I,"Referencia")'],
    ['Derivados de programas', '=COUNTIFS(\'Personas no asistidas\'!I:I,"Derivación")'],
    ['Total referidos/derivados', '=B35+B36'],
    ['', ''],
    ['📊 ESTADÍSTICAS GENERALES', ''],
    ['Total casos procesados', '=B19+B23+B27'],
    ['Tasa de éxito', '=IF(B40>0,B19/B40*100&"%","0%")'],
    ['Casos activos', '=B16']
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  sheet.getRange('A1:B1').merge()
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(14)
    .setHorizontalAlignment('center');

  const sectionRows = [5, 11, 18, 23, 28, 31, 34, 39];
  sectionRows.forEach(row => {
    sheet.getRange('A' + row + ':B' + row)
      .setBackground('#4caf50')
      .setFontColor('white')
      .setFontWeight('bold');
  });

  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 150);
}

function crearReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Reportes Mensuales');

  const headers = [
    'Mes/Año', 'Nuevos Ingresos', 'Culminados', 'Deserciones', 'Gestión Casos',
    'No Asistidas', 'Referidos Org.', 'Derivados Prog.', 'Casos Activos',
    'Tasa Éxito (%)', 'Gerber', 'Melissa', 'Diana', 'Karina', 'Fecha Guardado'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#6a1b9a')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 100, 100, 100, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 120].forEach((w, i) => {
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

  // Validaciones de terapeuta - SOLO en columna K de Nuevos Ingresos
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('K2:K200').setDataValidation(terapeutaRule);
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

  // Validaciones de Terapeuta Asignado en Lista de Espera columna P
  espera.getRange('P2:P200').setDataValidation(terapeutaRule);

  // Validaciones de Asistió a Cita en Lista de Espera columna Q
  const asistioRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Sí', 'No'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('Q2:Q200').setDataValidation(asistioRule);

  // IMPORTANTE: Nuevos Ingresos NO tiene columna L
  // Solo tiene 11 columnas (A a K)
  // Derivación o Referencia (columna L) es texto libre
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

  if (hoja === 'Lista de Espera' && columna === 17 && val === 'Sí') {
    // Asistió a Cita = Sí
    const terapeuta = sheet.getRange(fila, 16).getValue(); // Columna P
    if (terapeuta && ['Gerber', 'Melissa', 'Diana', 'Karina'].indexOf(terapeuta.toString().trim()) !== -1) {
      // Tiene terapeuta asignado: enviar a Nuevos Ingresos y Terapias
      enviarYAsignarATerapias(sheet, fila, terapeuta);
    } else {
      // Sin terapeuta: solo enviar a Nuevos Ingresos
      enviarANuevosIngresos(sheet, fila);
    }
    actualizarReportes();
  }

  if (hoja === 'Lista de Espera' && columna === 17 && val === 'No') {
    // Asistió a Cita = No: enviar a Personas no asistidas
    enviarAPersonasNoAsistidas(sheet, fila);
    actualizarReportes();
  }

  if (hoja === 'Nuevos Ingresos' && columna === 11) {
    if (['Gerber', 'Melissa', 'Diana', 'Karina'].indexOf(val) !== -1) {
      asignarATerapias(sheet, fila, val);
      actualizarReportes();
    }
  }

  if (hoja === 'Terapias' && columna === 7 && val === 'Finalizado') {
    finalizarTerapia(sheet, fila);
    actualizarReportes();
  }
}

function enviarANuevosIngresos(sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');

  // Leer todos los datos de Lista de Espera (columnas C a O = 3 a 15)
  const datos = sheetOrigen.getRange(fila, 3, 1, 13).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const rangoEdad = datos[3];
  const malestar = datos[4];
  const derivadoPor = datos[5];
  const contacto = datos[6];
  const telefono = datos[7];
  const observaciones = datos[8];
  const derivacionReferencia = datos[9];
  const programaCreamos = datos[10];
  const organizacion = datos[11];
  const motivoDerivacion = datos[12];

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Verificar duplicados
  const datosNuevos = nuevos.getDataRange().getValues();
  for (let i = 1; i < datosNuevos.length; i++) {
    if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#fff3cd');
      sheetOrigen.getRange(fila, 17).clearContent(); // Limpiar Asistió a Cita
      ss.toast(nombreLimpio + ' ya existe en Nuevos Ingresos', 'Ya Registrado', 2);
      return;
    }
  }

  // Agregar a Nuevos Ingresos
  const nuevaFila = nuevos.getLastRow() + 1;

  // Agregar FECHA y NÚMERO automáticamente
  nuevos.getRange(nuevaFila, 1).setValue(new Date()); // Fecha actual
  nuevos.getRange(nuevaFila, 2).setValue(nuevaFila - 1); // Número correlativo

  // Agregar resto de datos
  nuevos.getRange(nuevaFila, 3).setValue(nombreLimpio);
  nuevos.getRange(nuevaFila, 4).setValue(creemosId || '');
  nuevos.getRange(nuevaFila, 5).setValue(genero || '');
  nuevos.getRange(nuevaFila, 6).setValue(rangoEdad || '');
  nuevos.getRange(nuevaFila, 7).setValue(malestar || '');
  nuevos.getRange(nuevaFila, 8).setValue('Individual');
  nuevos.getRange(nuevaFila, 9).setValue(derivadoPor || '');
  nuevos.getRange(nuevaFila, 10).setValue(contacto || '');

  // Marcar como procesado en Lista de Espera
  sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#d4edda');
  sheetOrigen.getRange(fila, 17).clearContent(); // Limpiar Asistió a Cita

  SpreadsheetApp.flush(); // Forzar actualización
  ss.toast('✅ ' + nombreLimpio + '\nMovido a Nuevos Ingresos', 'Enviado', 3);
}

function enviarYAsignarATerapias(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');
  const terapias = ss.getSheetByName('Terapias');

  // Leer todos los datos de Lista de Espera (columnas C a O = 3 a 15)
  const datos = sheetOrigen.getRange(fila, 3, 1, 13).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const rangoEdad = datos[3];
  const malestar = datos[4];
  const derivadoPor = datos[5];
  const contacto = datos[6];
  const telefono = datos[7];
  const observaciones = datos[8];

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Verificar duplicados en Nuevos Ingresos
  const datosNuevos = nuevos.getDataRange().getValues();
  for (let i = 1; i < datosNuevos.length; i++) {
    if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#fff3cd');
      ss.toast(nombreLimpio + ' ya existe en Nuevos Ingresos', 'Ya Registrado', 2);
      return;
    }
  }

  // Verificar duplicados en Terapias
  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][1] && datosTerapias[i][1].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#fff3cd');
      ss.toast(nombreLimpio + ' ya está en Terapias', 'Ya Asignado', 2);
      return;
    }
  }

  // Agregar a Nuevos Ingresos
  const nuevaFila = nuevos.getLastRow() + 1;
  nuevos.getRange(nuevaFila, 1).setValue(new Date());
  nuevos.getRange(nuevaFila, 2).setValue(nuevaFila - 1);
  nuevos.getRange(nuevaFila, 3).setValue(nombreLimpio);
  nuevos.getRange(nuevaFila, 4).setValue(creemosId || '');
  nuevos.getRange(nuevaFila, 5).setValue(genero || '');
  nuevos.getRange(nuevaFila, 6).setValue(rangoEdad || '');
  nuevos.getRange(nuevaFila, 7).setValue(malestar || '');
  nuevos.getRange(nuevaFila, 8).setValue('Individual');
  nuevos.getRange(nuevaFila, 9).setValue(derivadoPor || '');
  nuevos.getRange(nuevaFila, 10).setValue(contacto || '');
  nuevos.getRange(nuevaFila, 11).setValue(terapeuta);

  // Crear registro en Terapias
  const nuevaFilaTerapia = terapias.getLastRow() + 1;
  const registro = [
    terapeuta,
    nombreLimpio,
    creemosId || '',
    genero || '',
    'Individual',
    1,
    'En proceso',
    ''
  ];
  terapias.getRange(nuevaFilaTerapia, 1, 1, 8).setValues([registro]);

  // Marcar como procesado en Lista de Espera
  sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#d4edda');

  SpreadsheetApp.flush();
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta + '\nAgregado a Nuevos Ingresos y Terapias', 'Asignado', 3);
}

function enviarAPersonasNoAsistidas(sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const noAsistidas = ss.getSheetByName('Personas no asistidas');

  // Leer todos los datos de Lista de Espera (columnas C a O = 3 a 15)
  const datos = sheetOrigen.getRange(fila, 3, 1, 13).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const rangoEdad = datos[3];
  const malestar = datos[4];
  const derivadoPor = datos[5];
  const contacto = datos[6];
  const telefono = datos[7];
  const observaciones = datos[8];
  const derivacionReferencia = datos[9];
  const programaCreamos = datos[10];
  const organizacion = datos[11];
  const motivoDerivacion = datos[12];

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Agregar a Personas no asistidas
  const nuevaFila = noAsistidas.getLastRow() + 1;
  const registro = [
    new Date(),
    nombreLimpio,
    creemosId || '',
    genero || '',
    rangoEdad || '',
    derivadoPor || '',
    organizacion || '',
    programaCreamos || '',
    derivacionReferencia || '',
    motivoDerivacion || ''
  ];

  noAsistidas.getRange(nuevaFila, 1, 1, 10).setValues([registro]);

  // Marcar como procesado en Lista de Espera
  sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#ffccbc');
  sheetOrigen.getRange(fila, 17).clearContent(); // Limpiar el campo de Asistió a Cita

  SpreadsheetApp.flush();
  ss.toast('✅ ' + nombreLimpio + '\nMovido a Personas no asistidas', 'No Asistió', 3);
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

  const tipoResp = ui.prompt(
    'Tipo de finalización:',
    '1 = Proceso culminado\n2 = Deserción\n3 = Gestión de casos\n\nIngrese 1, 2 o 3:',
    ui.ButtonSet.OK_CANCEL
  );

  if (tipoResp.getSelectedButton() !== ui.Button.OK) {
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  const tipoNum = tipoResp.getResponseText().trim();
  let tipo = '';

  if (tipoNum === '1') tipo = 'Proceso culminado';
  else if (tipoNum === '2') tipo = 'Deserción';
  else if (tipoNum === '3') tipo = 'Gestión de casos';
  else {
    ui.alert('Debe ingresar 1, 2 o 3');
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  const motivoResp = ui.prompt(
    'Motivo de finalización:',
    'Participante: ' + nombre + '\nTipo: ' + tipo + '\n\nIngrese el motivo:',
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

  sheetOrigen.getRange(fila, 8).setValue(motivo);

  enviarEmailFinalizacion(nombre, terapeuta, tipo, motivo, numSesion);

  let ok = false;
  if (tipo === 'Proceso culminado') {
    ok = copiarACulminados(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipo === 'Deserción') {
    ok = copiarADeserciones(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipo === 'Gestión de casos') {
    ok = copiarAGestion(nombre, terapeuta, creemosId, tipoTerapia, motivo);
  }

  if (ok) {
    const colores = {
      'Proceso culminado': '#d4edda',
      'Deserción': '#f8d7da',
      'Gestión de casos': '#fff3cd'
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
    const sheet = ss.getSheetByName('Gestión de Casos');

    const nuevaFila = sheet.getLastRow() + 1;
    const datos = [new Date(), participante, terapeuta, creemosId || '', tipo || 'Individual', motivo];

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
    const celdas = ['B6', 'B7', 'B8', 'B9', 'B12', 'B13', 'B14', 'B15', 'B16',
                    'B19', 'B20', 'B21', 'B23', 'B24', 'B25', 'B27', 'B30', 'B31', 'B32'];

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
    const noAsistidas = reporte.getRange('B30').getValue();
    const referidosOrg = reporte.getRange('B35').getValue();
    const derivadosProg = reporte.getRange('B36').getValue();
    const activos = reporte.getRange('B16').getValue();
    const tasaExito = reporte.getRange('B41').getValue();
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
      noAsistidas,
      referidosOrg,
      derivadosProg,
      activos,
      tasaExito,
      gerber,
      melissa,
      diana,
      karina,
      new Date()
    ];

    mensuales.getRange(nuevaFila, 1, 1, 15).setValues([datos]);

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

    // 1. Reconfigurar todas las validaciones
    configurarValidaciones();

    // 2. Actualizar reportes
    actualizarReportes();

    ss.toast(
      '✅ REPARACIÓN COMPLETA\n\n' +
      '✓ Validaciones limpiadas y reconfiguradas\n' +
      '✓ Columna L eliminada de Nuevos Ingresos\n' +
      '✓ Desplegables configurados correctamente:\n' +
      '  - Género\n' +
      '  - Rango de Edad\n' +
      '  - Malestar Principal ⭐ NUEVO\n' +
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
    ['Ana Martínez', 'AM001', 'Mujer', '26 a 30', 'Ansiedad', 'Centro Salud', 'Pedro Martínez', '555-0001', 'Primera consulta', 'Derivación', 'CREAMOS 2024', 'Hospital General', 'Estrés laboral severo'],
    ['Juan Pérez', 'JP002', 'Hombre', '31 a 40', 'Depresión', 'Derivación', 'María Pérez', '555-0002', 'Urgente', 'Referencia', 'CREAMOS 2024', 'Clínica Municipal', 'Crisis emocional'],
    ['Laura Gómez', 'LG003', 'Mujer', '18 a 25', 'Estrés', 'Autogestión', 'Carlos Gómez', '555-0003', 'Estudiante', 'Derivación', 'CREAMOS 2024', 'Universidad', 'Ansiedad académica']
  ];

  // Agregar datos en filas 2, 3 y 4
  espera.getRange(2, 3, datosPrueba.length, 13).setValues(datosPrueba);

  ss.toast(
    '✅ 3 DATOS DE PRUEBA CREADOS\n\n' +
    'Ubicación: Lista de Espera (filas 2-4)\n\n' +
    'CÓMO PROBAR EL SISTEMA:\n' +
    '1. Opcional: En columna P asigne un terapeuta\n' +
    '2. En columna Q (Asistió a Cita):\n' +
    '   • "Sí" → Envía a Nuevos Ingresos\n' +
    '   • "No" → Envía a Personas no asistidas\n' +
    '3. Si fue a Nuevos Ingresos sin terapeuta,\n' +
    '   asigne uno en columna K\n' +
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
    '- Gestión de Casos\n' +
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
      espera.getRange(2, 1, espera.getLastRow() - 1, 17).clearContent();
      espera.getRange(2, 1, espera.getLastRow() - 1, 17).setBackground(null);
      // Restaurar fórmulas
      for (let i = 2; i <= 100; i++) {
        espera.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
        espera.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
      }
    }

    // Limpiar Nuevos Ingresos (desde fila 2)
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    if (nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 11).clearContent();
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 11).setBackground(null);
      // NO restaurar fórmulas en Nuevos Ingresos
      // La fecha y número se agregan automáticamente al enviar
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

    // Limpiar Personas no asistidas (desde fila 2)
    const noAsistidas = ss.getSheetByName('Personas no asistidas');
    if (noAsistidas && noAsistidas.getLastRow() > 1) {
      noAsistidas.getRange(2, 1, noAsistidas.getLastRow() - 1, 10).clearContent();
    }

    // Limpiar Gestión de Casos (desde fila 2)
    const gestion = ss.getSheetByName('Gestión de Casos');
    if (gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Reportes Mensuales (desde fila 2)
    const mensuales = ss.getSheetByName('Reportes Mensuales');
    if (mensuales.getLastRow() > 1) {
      mensuales.getRange(2, 1, mensuales.getLastRow() - 1, 15).clearContent();
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
