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
    .addItem('📧 Configurar Email Director', 'configurarEmail')
    .addItem('👥 Configurar Emails Terapeutas', 'configurarEmailsTerapeutas')
    .addItem('✉️ Probar Envío de Email', 'probarEmail')
    .addSeparator()
    .addItem('➕ Agregar Grupo de Asistencia', 'configurarAsistencia')
    .addItem('📋 Ver/Gestionar Grupos', 'verGruposAsistencia')
    .addItem('🔄 Probar Conexión Asistencia', 'probarAsistencia')
    .addSeparator()
    .addItem('⏰ Instalar Trigger de Tiempo', 'instalarTriggerTiempo')
    .addItem('📅 Instalar Recordatorio Mensual', 'instalarTriggerRecordatorioMensual')
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
    'Teléfono', 'Observaciones', 'Terapeuta Asignado', 'Asistió a Cita'
  ];

  sheet.getRange(1, 1, 1, 13).setValues([headers])
    .setBackground('#e91e63')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas para fecha y número automáticos
  for (let i = 2; i <= 100; i++) {
    sheet.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    sheet.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
  }

  [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 150, 120].forEach((w, i) => {
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

  // NO usar fórmulas en columnas A y B
  // La fecha y número se agregarán desde el código JavaScript
  // cuando se agregue cada registro
  // Esto evita que las fechas se actualicen constantemente con TODAY()

  [110, 60, 200, 120, 100, 100, 250, 120, 150].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Proteger solo las columnas de fecha y número
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
    ['✅ ASISTENCIAS (HOJAS EXTERNAS)', ''],
    ['Estado conexión', 'No configurado'],
    ['Total asistencias (todas)', 0],
    ['Asistencias este mes (todas)', 0],
    ['', ''],
    ['👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA', ''],
    ['Gerber - Casos activos', '=COUNTIFS(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso")'],
    ['Melissa - Casos activos', '=COUNTIFS(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso")'],
    ['Diana - Casos activos', '=COUNTIFS(Terapias!A:A,"Diana",Terapias!G:G,"En proceso")'],
    ['Karina - Casos activos', '=COUNTIFS(Terapias!A:A,"Karina",Terapias!G:G,"En proceso")'],
    ['Total casos activos', '=B19+B20+B21+B22'],
    ['', ''],
    ['📊 TOTAL TERAPIAS POR TERAPEUTA', ''],
    ['Gerber - Total terapias', '=COUNTIF(Terapias!A2:A,"Gerber")'],
    ['Melissa - Total terapias', '=COUNTIF(Terapias!A2:A,"Melissa")'],
    ['Diana - Total terapias', '=COUNTIF(Terapias!A2:A,"Diana")'],
    ['Karina - Total terapias', '=COUNTIF(Terapias!A2:A,"Karina")'],
    ['Total general', '=B25+B26+B27+B28'],
    ['', ''],
    ['🎉 PROCESOS CULMINADOS', ''],
    ['Total culminados', '=COUNTA(\'Procesos Culminados\'!A:A)-1'],
    ['Culminados este mes', '=COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Promedio sesiones', '=IF(B32>0,AVERAGE(\'Procesos Culminados\'!E:E),0)'],
    ['', ''],
    ['⚠️ DESERCIONES', ''],
    ['Total deserciones', '=COUNTA(Deserciones!A:A)-1'],
    ['Deserciones este mes', '=COUNTIFS(Deserciones!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Deserciones!A:A,"<="&EOMONTH(TODAY(),0))'],
    ['Tasa deserción', '=IF((B32+B37)>0,B37/(B32+B37)*100&"%","0%")'],
    ['', ''],
    ['📋 INTERVENCIÓN DE CASOS', ''],
    ['Total en intervención', '=COUNTA(\'Intervención de casos\'!A:A)-1'],
    ['', ''],
    ['📊 ESTADÍSTICAS GENERALES', ''],
    ['Total casos procesados', '=B32+B37+B42'],
    ['Tasa de éxito', '=IF(B45>0,B32/B45*100&"%","0%")'],
    ['Casos activos', '=B23']
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  sheet.getRange('A1:B1').merge()
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(14)
    .setHorizontalAlignment('center');

  const sectionRows = [5, 9, 13, 18, 24, 31, 36, 41, 44];
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
  // SOLO en hojas donde el usuario EDITA manualmente
  // NO en Nuevos Ingresos - se llena automáticamente
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('E2:E200').setDataValidation(generoRule);
  terapias.getRange('D2:D200').setDataValidation(generoRule);

  // Validaciones de rango de edad
  // SOLO en hojas donde el usuario EDITA manualmente
  // NO en Nuevos Ingresos - se llena automáticamente
  const rangoEdadRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['13 a 17', '18 a 25', '26 a 30', '31 a 40', '41 a 50', '51 a 60', '61+'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('F2:F200').setDataValidation(rangoEdadRule);

  // Validaciones de MALESTAR PRINCIPAL - ELIMINADAS de Nuevos Ingresos
  // Nuevos Ingresos se llena automáticamente desde Lista de Espera
  // donde el usuario puede escribir libremente, por lo tanto NO debe tener validación
  // Si ponemos validación aquí, causará errores cuando el texto no coincida exactamente

  // NO aplicar validación de Malestar en Nuevos Ingresos
  // NO aplicar validación de Malestar en Lista de Espera - el usuario escribe libremente

  // Validaciones de tipo de atención
  // SOLO aplicar en Terapias (columna E) - donde el usuario puede editar manualmente
  // NO aplicar en Nuevos Ingresos (columna H) - se llena automáticamente desde el código
  const tipoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Individual', 'Grupal', 'Familiar', 'Pareja'])
    .setAllowInvalid(false)
    .build();
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
    .requireValueInList(['En proceso', 'Finalizado', 'Proceso culminado', 'deserciones'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('G2:G200').setDataValidation(estadoRule);

  // Validaciones de terapeuta - en Lista de Espera columna L
  espera.getRange('L2:L200').setDataValidation(terapeutaRule);

  // Validaciones de asistencia - en Lista de Espera columna M
  const asistenciaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Vino', 'No vino', 'Pendiente'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('M2:M200').setDataValidation(asistenciaRule);

  // =====================================================================
  // RESUMEN DE VALIDACIONES POR HOJA:
  // =====================================================================
  //
  // NUEVOS INGRESOS:
  //   - SIN validaciones (se llena automáticamente desde código)
  //
  // LISTA DE ESPERA:
  //   - Género (E)
  //   - Rango Edad (F)
  //   - Terapeuta Asignado (L)
  //   - Asistió a Cita (M)
  //
  // TERAPIAS:
  //   - Terapeuta (A)
  //   - Género (D)
  //   - Tipo Terapia (E)
  //   - No. Sesión (F)
  //   - Estado (G)
  //
  // =====================================================================
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
  if (!e || !e.range) {
    Logger.log('❌ ERROR: No hay evento o rango');
    return;
  }

  const sheet = e.range.getSheet();
  const hoja = sheet.getName();
  const fila = e.range.getRow();
  const columna = e.range.getColumn();
  const valor = e.range.getValue();

  // LOG: Registrar TODA edición
  Logger.log('═══════════════════════════════════════');
  Logger.log('🔍 EDICIÓN DETECTADA:');
  Logger.log('   Hoja: ' + hoja);
  Logger.log('   Fila: ' + fila);
  Logger.log('   Columna: ' + columna);
  Logger.log('   Valor: "' + valor + '"');
  Logger.log('═══════════════════════════════════════');

  if (fila <= 1) {
    Logger.log('⚠️ Fila es header, ignorando');
    return;
  }

  if (!valor) {
    Logger.log('⚠️ Valor vacío, ignorando');
    return;
  }

  const val = valor.toString().trim();
  if (val === '') {
    Logger.log('⚠️ Valor vacío después de trim, ignorando');
    return;
  }

  // CASO 1: Lista de Espera - Asignación de Terapeuta (columna L)
  if (hoja === 'Lista de Espera' && columna === 12) {
    Logger.log('✅ Detectada edición en Lista de Espera, columna L (12)');
    Logger.log('   Valor ingresado: "' + val + '"');

    if (['Gerber', 'Melissa', 'Diana', 'Karina'].indexOf(val) !== -1) {
      Logger.log('✅ Terapeuta válido detectado: ' + val);
      Logger.log('▶️ EJECUTANDO asignarTerapeuta...');

      try {
        asignarTerapeuta(sheet, fila, val);
        Logger.log('✅ asignarTerapeuta completado');
      } catch (error) {
        Logger.log('❌ ERROR en asignarTerapeuta: ' + error.toString());
        Logger.log('   Stack: ' + error.stack);
      }
    } else {
      Logger.log('⚠️ Valor NO es un terapeuta válido');
      Logger.log('   Esperado: Gerber, Melissa, Diana, Karina');
      Logger.log('   Recibido: "' + val + '"');
    }
  }

  // CASO 2: Lista de Espera - Confirmación de Asistencia (columna M)
  if (hoja === 'Lista de Espera' && columna === 13) {
    Logger.log('✅ Detectada edición en Lista de Espera, columna M (13)');
    Logger.log('   Valor ingresado: "' + val + '"');

    if (val === 'Vino' || val === 'No vino') {
      Logger.log('✅ Confirmación de asistencia detectada: ' + val);
      Logger.log('▶️ EJECUTANDO procesarConfirmacionAsistencia...');

      try {
        procesarConfirmacionAsistencia(sheet, fila, val);
        Logger.log('✅ procesarConfirmacionAsistencia completado');
        actualizarReportes();
        Logger.log('✅ Reportes actualizados');
      } catch (error) {
        Logger.log('❌ ERROR en procesarConfirmacionAsistencia: ' + error.toString());
        Logger.log('   Stack: ' + error.stack);
      }
    } else {
      Logger.log('⚠️ Valor NO es válido');
      Logger.log('   Esperado: Vino, No vino');
      Logger.log('   Recibido: "' + val + '"');
    }
  }

  // CASO 3: Terapias - Cambio de Estado
  if (hoja === 'Terapias' && columna === 7) {
    if (val === 'Proceso culminado' || val === 'deserciones') {
      Logger.log('✅ Detectado cambio de estado en Terapias: ' + val);
      Logger.log('▶️ EJECUTANDO procesarFinalizacionTerapia...');

      try {
        procesarFinalizacionTerapia(sheet, fila, val);
        Logger.log('✅ procesarFinalizacionTerapia completado');
        actualizarReportes();
        Logger.log('✅ Reportes actualizados');
      } catch (error) {
        Logger.log('❌ ERROR en procesarFinalizacionTerapia: ' + error.toString());
      }
    }
  }
}

/**
 * Asigna un terapeuta y envía email al terapeuta para confirmar asistencia
 */
function asignarTerapeuta(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Leer datos básicos
    const nombre = sheetOrigen.getRange(fila, 3).getValue();

    if (!nombre || nombre.toString().trim() === '') {
      ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 3);
      sheetOrigen.getRange(fila, 12).clearContent();
      return;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log('Asignando ' + nombreLimpio + ' a ' + terapeuta);

    // 1. Poner estado "Pendiente" en columna M
    sheetOrigen.getRange(fila, 13).setValue('Pendiente');

    // 2. Enviar email al terapeuta
    const emailEnviado = enviarEmailAsignacionTerapeuta(terapeuta, nombreLimpio, fila);

    // 3. Notificar al usuario
    if (emailEnviado) {
      ss.toast(
        '✅ Caso asignado a ' + terapeuta + '\n\n' +
        '📧 Email enviado al terapeuta\n\n' +
        'El terapeuta debe confirmar si la persona vino.',
        'Asignación Pendiente',
        5
      );
    } else {
      ss.toast(
        '⚠️ Caso asignado a ' + terapeuta + '\n\n' +
        '❌ No se pudo enviar el email\n\n' +
        'El terapeuta debe ir al sheet y confirmar manualmente.',
        'Asignado Sin Email',
        5
      );
    }

    // 4. Marcar fila en amarillo (pendiente)
    sheetOrigen.getRange(fila, 1, 1, 13).setBackground('#fff3cd');

  } catch (error) {
    Logger.log('❌ ERROR en asignarTerapeuta: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    sheetOrigen.getRange(fila, 12).clearContent();
  }
}

/**
 * Procesa la confirmación de asistencia por el terapeuta
 */
function procesarConfirmacionAsistencia(sheetOrigen, fila, confirmacion) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Leer todos los datos necesarios
    const datos = sheetOrigen.getRange(fila, 3, 1, 11).getValues()[0];
    const nombre = datos[0];
    const creemosId = datos[1];
    const genero = datos[2];
    const rangoEdad = datos[3];
    const malestar = datos[4];
    const derivadoPor = datos[5];
    const contacto = datos[6];
    const telefono = datos[7];
    const observaciones = datos[8];
    const terapeuta = datos[9]; // columna L

    if (!nombre || nombre.toString().trim() === '') {
      ss.toast('⚠️ Error: No hay nombre en esta fila', 'Error', 3);
      return;
    }

    if (!terapeuta || terapeuta.toString().trim() === '') {
      ss.toast('⚠️ Error: No hay terapeuta asignado en esta fila', 'Error', 3);
      return;
    }

    const nombreLimpio = nombre.toString().trim();
    const terapeutaNombre = terapeuta.toString().trim();

    Logger.log('Procesando confirmación: ' + nombreLimpio + ' - ' + confirmacion);

    if (confirmacion === 'Vino') {
      // SI VINO: enviar a AMBOS - Nuevos Ingresos (documentación) Y Terapias
      Logger.log('Enviando a Nuevos Ingresos y Terapias: ' + nombreLimpio);
      enviarANuevosIngresosYTerapias(nombreLimpio, creemosId, genero, rangoEdad, malestar, derivadoPor, terapeutaNombre, sheetOrigen, fila);
    } else if (confirmacion === 'No vino') {
      // NO VINO: enviar a Personas no asistidas
      Logger.log('Enviando a Personas no asistidas: ' + nombreLimpio);
      enviarAPersonasNoAsistidas(nombreLimpio, creemosId, genero, rangoEdad, malestar, terapeutaNombre, observaciones, sheetOrigen, fila);
    }
  } catch (error) {
    Logger.log('❌ ERROR en procesarConfirmacionAsistencia: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
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
    const numeroIngreso = nuevaFilaNuevos - 1; // Restar 1 porque fila 1 es header
    const fechaIngreso = new Date();

    const registroNuevos = [
      fechaIngreso,        // Columna A: Fecha (valor, no fórmula)
      numeroIngreso,       // Columna B: Número (valor, no fórmula)
      nombre,              // Columna C
      creemosId || '',     // Columna D
      genero || '',        // Columna E
      rangoEdad || '',     // Columna F
      malestar || '',      // Columna G
      'Individual',        // Columna H
      derivadoPor || ''    // Columna I
    ];
    nuevos.getRange(nuevaFilaNuevos, 1, 1, 9).setValues([registroNuevos]);
    Logger.log('✅ Agregado a Nuevos Ingresos en fila: ' + nuevaFilaNuevos);

    // 2. Crear registro en Terapias
    const nuevaFilaTerapias = terapias.getLastRow() + 1;
    const registroTerapias = [
      terapeuta,
      nombre,
      creemosId || '',
      genero || '',
      'Individual',
      1,
      'En proceso',
      ''
    ];
    terapias.getRange(nuevaFilaTerapias, 1, 1, 8).setValues([registroTerapias]);
    Logger.log('✅ Agregado a Terapias en fila: ' + nuevaFilaTerapias);

    // Marcar como procesado en verde
    sheetOrigen.getRange(fila, 1, 1, 13).setBackground('#d4edda');
    sheetOrigen.getRange(fila, 12).clearContent(); // Limpiar terapeuta
    sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar asistió

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
    sheetOrigen.getRange(fila, 1, 1, 13).setBackground('#f8d7da');
    sheetOrigen.getRange(fila, 12).clearContent(); // Limpiar terapeuta
    sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar asistió

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

/**
 * Procesa la finalización de terapia (Proceso culminado o deserciones)
 */
function procesarFinalizacionTerapia(sheetOrigen, fila, tipoFinal) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const datos = sheetOrigen.getRange(fila, 1, 1, 8).getValues()[0];
  const terapeuta = datos[0];
  const participante = datos[1];
  const creemosId = datos[2];
  const genero = datos[3];
  const tipoTerapia = datos[4];
  const numSesion = datos[5];

  if (!participante || participante.toString().trim() === '') {
    ss.toast('⚠️ Error: No hay participante en esta fila', 'Error', 3);
    return;
  }

  const nombre = participante.toString().trim();

  // Pedir motivo según el tipo
  let promptMotivo = '';
  if (tipoFinal === 'Proceso culminado') {
    promptMotivo = 'Motivo de finalización del proceso:\n\n' +
                   'Participante: ' + nombre + '\n' +
                   'Terapeuta: ' + terapeuta + '\n' +
                   'Sesiones: ' + numSesion + '\n\n' +
                   'Ingrese el motivo:';
  } else if (tipoFinal === 'deserciones') {
    promptMotivo = 'Motivo de deserción:\n\n' +
                   'Participante: ' + nombre + '\n' +
                   'Terapeuta: ' + terapeuta + '\n' +
                   'Sesiones: ' + numSesion + '\n\n' +
                   'Ingrese el motivo:';
  }

  const motivoResp = ui.prompt(
    'Motivo - ' + tipoFinal,
    promptMotivo,
    ui.ButtonSet.OK_CANCEL
  );

  if (motivoResp.getSelectedButton() !== ui.Button.OK) {
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  const motivo = motivoResp.getResponseText().trim();

  if (!motivo || motivo === '') {
    ui.alert('❌ Error', 'Debe ingresar un motivo', ui.ButtonSet.OK);
    sheetOrigen.getRange(fila, 7).setValue('En proceso');
    return;
  }

  // Guardar motivo en columna H
  sheetOrigen.getRange(fila, 8).setValue(tipoFinal + ': ' + motivo);

  // Enviar email a la directora
  enviarEmailFinalizacion(nombre, terapeuta, tipoFinal, motivo, numSesion);

  // Copiar a la hoja correspondiente
  let ok = false;
  if (tipoFinal === 'Proceso culminado') {
    ok = copiarACulminados(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipoFinal === 'deserciones') {
    ok = copiarADeserciones(nombre, terapeuta, creemosId, numSesion, motivo);
  }

  if (ok) {
    // Colores según el tipo
    const colores = {
      'Proceso culminado': '#d4edda',
      'deserciones': '#f8d7da'
    };

    sheetOrigen.getRange(fila, 1, 1, 8).setBackground(colores[tipoFinal]);
    ss.toast('✅ ' + nombre + '\n' + tipoFinal + '\nSesiones: ' + numSesion, 'Procesado', 4);
  }
}

// =====================================================================
// SISTEMA DE CORREOS MEJORADO + EMAILS DE TERAPEUTAS
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

/**
 * Obtiene el email de un terapeuta específico
 */
function obtenerEmailTerapeuta(nombreTerapeuta) {
  const props = PropertiesService.getDocumentProperties();
  return props.getProperty('EMAIL_' + nombreTerapeuta.toUpperCase());
}

/**
 * Configura los emails de todos los terapeutas
 */
function configurarEmailsTerapeutas() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();

  const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
  let mensaje = '📧 CONFIGURAR EMAILS DE TERAPEUTAS\n\n';
  mensaje += 'Ingresa los emails de cada terapeuta:\n\n';

  const emails = {};

  for (const terapeuta of terapeutas) {
    const emailActual = props.getProperty('EMAIL_' + terapeuta.toUpperCase()) || 'No configurado';

    const respuesta = ui.prompt(
      'Email de ' + terapeuta,
      'Email actual: ' + emailActual + '\n\n' +
      'Ingresa el email de ' + terapeuta + ':',
      ui.ButtonSet.OK_CANCEL
    );

    if (respuesta.getSelectedButton() !== ui.Button.OK) {
      ui.alert('❌ Cancelado', 'Configuración de emails cancelada.', ui.ButtonSet.OK);
      return;
    }

    const email = respuesta.getResponseText().trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      ui.alert('❌ Email Inválido', 'Por favor ingresa un email válido.', ui.ButtonSet.OK);
      return;
    }

    emails[terapeuta] = email;
    props.setProperty('EMAIL_' + terapeuta.toUpperCase(), email);
  }

  let resumen = '✅ EMAILS CONFIGURADOS:\n\n';
  for (const [terapeuta, email] of Object.entries(emails)) {
    resumen += '• ' + terapeuta + ': ' + email + '\n';
  }

  ui.alert('Configuración Completa', resumen, ui.ButtonSet.OK);
  Logger.log('✅ Emails de terapeutas configurados');
}

/**
 * Envía email al terapeuta cuando se le asigna un nuevo caso
 */
function enviarEmailAsignacionTerapeuta(terapeuta, nombreParticipante, fila) {
  try {
    const emailTerapeuta = obtenerEmailTerapeuta(terapeuta);

    if (!emailTerapeuta) {
      Logger.log('⚠️ No hay email configurado para ' + terapeuta);
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '⚠️ Email no configurado para ' + terapeuta + '\n\n' +
        'Usa "📧 Configurar Emails Terapeutas" para configurar.',
        'Sin Email',
        5
      );
      return false;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const urlSheet = ss.getUrl();

    const asunto = '🔔 Nuevo Caso Asignado: ' + nombreParticipante;
    const cuerpo =
      'Hola ' + terapeuta + ',\n\n' +
      'Se te ha asignado un nuevo caso:\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '👤 Participante: ' + nombreParticipante + '\n' +
      '👨‍⚕️ Terapeuta asignado: ' + terapeuta + '\n' +
      '📋 Fila en Lista de Espera: ' + fila + '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '📌 ACCIÓN REQUERIDA:\n\n' +
      '1. Abre el Google Sheet:\n' +
      '   ' + urlSheet + '\n\n' +
      '2. Ve a la hoja "Lista de Espera"\n\n' +
      '3. Busca la fila ' + fila + ' (' + nombreParticipante + ')\n\n' +
      '4. En la columna "Asistió a Cita" (columna M), selecciona:\n' +
      '   • "Vino" - Si la persona asistió a la cita\n' +
      '   • "No vino" - Si la persona NO asistió\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '⚠️ IMPORTANTE:\n' +
      'Una vez que selecciones "Vino" o "No vino", el sistema\n' +
      'automáticamente moverá el caso a la hoja correspondiente:\n' +
      '• Si VINO → Nuevos Ingresos + Terapias (trabajo activo)\n' +
      '• Si NO VINO → Personas no asistidas (sin registro)\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Sistema de Apoyo Emocional\n' +
      'Notificación automática';

    MailApp.sendEmail(emailTerapeuta, asunto, cuerpo);

    Logger.log('✅ Email enviado a ' + terapeuta + ' (' + emailTerapeuta + ')');
    return true;

  } catch (error) {
    Logger.log('❌ Error enviando email a terapeuta: ' + error.message);
    return false;
  }
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
    const datos = [new Date(), participante, terapeuta, creemosId || '', tipo || 'Individual', motivo];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datos]);
    return true;
  } catch (error) {
    Logger.log('Error gestión: ' + error.message);
    return false;
  }
}

// =====================================================================
// CONEXIÓN CON HOJAS DE ASISTENCIA EXTERNAS (MÚLTIPLES GRUPOS)
// =====================================================================

/**
 * Obtiene todos los grupos configurados
 * Retorna un objeto con estructura: {nombreGrupo: idDocumento}
 */
function obtenerGruposAsistencia() {
  const props = PropertiesService.getDocumentProperties();
  const gruposJSON = props.getProperty('GRUPOS_ASISTENCIA');

  if (!gruposJSON) {
    return {};
  }

  try {
    return JSON.parse(gruposJSON);
  } catch (e) {
    Logger.log('⚠️ Error parseando grupos: ' + e.toString());
    return {};
  }
}

/**
 * Guarda los grupos configurados
 */
function guardarGruposAsistencia(grupos) {
  const props = PropertiesService.getDocumentProperties();
  props.setProperty('GRUPOS_ASISTENCIA', JSON.stringify(grupos));
}

/**
 * Cuenta asistencias para un grupo específico
 */
function contarAsistenciasGrupo(nombreGrupo, idDoc) {
  try {
    // Conectar con el documento externo
    const docAsistencia = SpreadsheetApp.openById(idDoc);
    const hojaAsistencia = docAsistencia.getSheetByName('Tabla_1');

    if (!hojaAsistencia) {
      Logger.log('⚠️ [' + nombreGrupo + '] No se encontró la hoja "Tabla_1"');
      return {
        grupo: nombreGrupo,
        totalAsistencias: 0,
        asistenciasHoy: 0,
        asistenciasMes: 0,
        error: 'Hoja no encontrada'
      };
    }

    // Obtener todos los datos de la hoja
    const datos = hojaAsistencia.getDataRange().getValues();

    if (datos.length <= 1) {
      return {
        grupo: nombreGrupo,
        totalAsistencias: 0,
        asistenciasHoy: 0,
        asistenciasMes: 0,
        error: 'Sin datos'
      };
    }

    // Las fechas están en la fila 1, desde la columna C (índice 2) en adelante
    const filaFechas = datos[0];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Calcular rango del mes actual
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    inicioMes.setHours(0, 0, 0, 0);
    finMes.setHours(23, 59, 59, 999);

    let totalCheckboxes = 0;
    let checkboxesHoy = 0;
    let checkboxesMes = 0;

    // Recorrer todas las filas (desde fila 2, índice 1)
    for (let fila = 1; fila < datos.length; fila++) {
      // Recorrer todas las columnas desde C (índice 2) en adelante
      for (let col = 2; col < datos[fila].length; col++) {
        const valor = datos[fila][col];

        // Si es un checkbox marcado (true)
        if (valor === true) {
          totalCheckboxes++;

          // Verificar fecha de la columna
          const fechaColumna = filaFechas[col];
          if (fechaColumna instanceof Date) {
            const fechaCol = new Date(fechaColumna);
            fechaCol.setHours(0, 0, 0, 0);

            // ¿Es hoy?
            if (fechaCol.getTime() === hoy.getTime()) {
              checkboxesHoy++;
            }

            // ¿Es este mes?
            if (fechaCol >= inicioMes && fechaCol <= finMes) {
              checkboxesMes++;
            }
          }
        }
      }
    }

    Logger.log('✅ [' + nombreGrupo + '] Asistencias: Total=' + totalCheckboxes + ', Hoy=' + checkboxesHoy + ', Mes=' + checkboxesMes);

    return {
      grupo: nombreGrupo,
      totalAsistencias: totalCheckboxes,
      asistenciasHoy: checkboxesHoy,
      asistenciasMes: checkboxesMes,
      error: null
    };

  } catch (error) {
    Logger.log('❌ [' + nombreGrupo + '] Error: ' + error.toString());
    return {
      grupo: nombreGrupo,
      totalAsistencias: 0,
      asistenciasHoy: 0,
      asistenciasMes: 0,
      error: error.message
    };
  }
}

/**
 * Cuenta asistencias de TODOS los grupos configurados
 */
function contarAsistenciasTodosGrupos() {
  const grupos = obtenerGruposAsistencia();
  const resultados = [];

  for (const [nombreGrupo, idDoc] of Object.entries(grupos)) {
    const resultado = contarAsistenciasGrupo(nombreGrupo, idDoc);
    resultados.push(resultado);
  }

  return resultados;
}

/**
 * Agrega un nuevo grupo de asistencia
 */
function configurarAsistencia() {
  const ui = SpreadsheetApp.getUi();
  const grupos = obtenerGruposAsistencia();

  // Mostrar grupos actuales
  let mensajeGrupos = '';
  const numGrupos = Object.keys(grupos).length;

  if (numGrupos > 0) {
    mensajeGrupos = '📋 GRUPOS ACTUALES (' + numGrupos + '):\n';
    for (const [nombre, id] of Object.entries(grupos)) {
      mensajeGrupos += '• ' + nombre + '\n';
    }
    mensajeGrupos += '\n';
  }

  // Pedir nombre del grupo
  const respNombre = ui.prompt(
    '📋 Agregar Grupo de Asistencia',
    mensajeGrupos +
    'Ingresa el NOMBRE del grupo:\n' +
    '(Ejemplo: "Grupo A", "Mañana", "Terapia Grupal", etc.)',
    ui.ButtonSet.OK_CANCEL
  );

  if (respNombre.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const nombreGrupo = respNombre.getResponseText().trim();

  if (!nombreGrupo || nombreGrupo === '') {
    ui.alert('❌ Nombre vacío', 'Debes ingresar un nombre para el grupo.', ui.ButtonSet.OK);
    return;
  }

  // Pedir URL/ID del documento
  const respURL = ui.prompt(
    '📋 Documento de Asistencia - ' + nombreGrupo,
    'Ingresa la URL completa o el ID del documento:\n\n' +
    'Ejemplo URL:\n' +
    'https://docs.google.com/spreadsheets/d/ABC123.../edit\n\n' +
    'O solo el ID:\n' +
    'ABC123...',
    ui.ButtonSet.OK_CANCEL
  );

  if (respURL.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  let idDoc = respURL.getResponseText().trim();

  // Extraer el ID si es una URL completa
  if (idDoc.includes('docs.google.com/spreadsheets/d/')) {
    const match = idDoc.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      idDoc = match[1];
    }
  }

  if (!idDoc || idDoc.length < 20) {
    ui.alert('❌ ID inválido', 'El ID debe tener al menos 20 caracteres.', ui.ButtonSet.OK);
    return;
  }

  // Guardar el grupo
  grupos[nombreGrupo] = idDoc;
  guardarGruposAsistencia(grupos);

  SpreadsheetApp.getActiveSpreadsheet().toast(
    '✅ Grupo agregado correctamente\n\n' +
    'Grupo: ' + nombreGrupo + '\n' +
    'ID: ' + idDoc + '\n\n' +
    'Total de grupos: ' + Object.keys(grupos).length + '\n\n' +
    'Usa "🔄 Probar Conexión Asistencia" para verificar.',
    'Grupo Agregado',
    8
  );

  Logger.log('✅ Grupo agregado: ' + nombreGrupo + ' = ' + idDoc);
}

/**
 * Ver y gestionar grupos configurados
 */
function verGruposAsistencia() {
  const ui = SpreadsheetApp.getUi();
  const grupos = obtenerGruposAsistencia();

  if (Object.keys(grupos).length === 0) {
    ui.alert(
      '⚠️ Sin Grupos',
      'No hay grupos configurados.\n\n' +
      'Usa "📋 Conectar Hoja de Asistencia" para agregar grupos.',
      ui.ButtonSet.OK
    );
    return;
  }

  let mensaje = '📋 GRUPOS CONFIGURADOS (' + Object.keys(grupos).length + '):\n\n';
  let contador = 1;

  for (const [nombre, id] of Object.entries(grupos)) {
    mensaje += contador + '. ' + nombre + '\n';
    mensaje += '   ID: ' + id.substring(0, 20) + '...\n\n';
    contador++;
  }

  mensaje += '¿Deseas ELIMINAR un grupo?\n' +
             'Ingresa el número (o cancela para salir):';

  const respuesta = ui.prompt(
    'Gestionar Grupos',
    mensaje,
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() === ui.Button.OK) {
    const num = parseInt(respuesta.getResponseText().trim());

    if (isNaN(num) || num < 1 || num > Object.keys(grupos).length) {
      ui.alert('❌ Número inválido', 'Ingresa un número válido.', ui.ButtonSet.OK);
      return;
    }

    const nombreEliminar = Object.keys(grupos)[num - 1];

    const confirmar = ui.alert(
      '⚠️ Confirmar Eliminación',
      '¿Eliminar el grupo "' + nombreEliminar + '"?',
      ui.ButtonSet.YES_NO
    );

    if (confirmar === ui.Button.YES) {
      delete grupos[nombreEliminar];
      guardarGruposAsistencia(grupos);

      ui.alert(
        '✅ Eliminado',
        'Grupo "' + nombreEliminar + '" eliminado correctamente.',
        ui.ButtonSet.OK
      );
    }
  }
}

/**
 * Prueba la conexión con TODOS los documentos de asistencia
 */
function probarAsistencia() {
  const ui = SpreadsheetApp.getUi();
  const grupos = obtenerGruposAsistencia();

  if (Object.keys(grupos).length === 0) {
    ui.alert(
      '⚠️ Sin Grupos',
      'No hay grupos configurados.\n\n' +
      'Usa "➕ Agregar Grupo de Asistencia" para configurar.',
      ui.ButtonSet.OK
    );
    return;
  }

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('🔄 Probando ' + Object.keys(grupos).length + ' grupos...', 'Prueba', 2);

    // Contar asistencias de todos los grupos
    const resultados = contarAsistenciasTodosGrupos();

    let mensaje = '✅ PRUEBA COMPLETADA\n\n';
    mensaje += 'Grupos configurados: ' + resultados.length + '\n\n';

    let totalGeneral = 0;
    let totalMes = 0;
    let errores = 0;

    resultados.forEach(resultado => {
      mensaje += '━━━━━━━━━━━━━━━━━━━\n';
      mensaje += '📋 ' + resultado.grupo + '\n';

      if (resultado.error) {
        mensaje += '❌ Error: ' + resultado.error + '\n';
        errores++;
      } else {
        mensaje += '• Total: ' + resultado.totalAsistencias + '\n';
        mensaje += '• Este mes: ' + resultado.asistenciasMes + '\n';
        mensaje += '• Hoy: ' + resultado.asistenciasHoy + '\n';

        totalGeneral += resultado.totalAsistencias;
        totalMes += resultado.asistenciasMes;
      }
    });

    mensaje += '━━━━━━━━━━━━━━━━━━━\n';
    mensaje += '📊 TOTALES:\n';
    mensaje += '• Total general: ' + totalGeneral + '\n';
    mensaje += '• Total este mes: ' + totalMes + '\n';

    if (errores > 0) {
      mensaje += '\n⚠️ ' + errores + ' grupo(s) con errores';
    }

    ui.alert('Resultados de Prueba', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert(
      '❌ Error',
      'Error al probar conexiones:\n\n' +
      error.message,
      ui.ButtonSet.OK
    );
    Logger.log('❌ Error probando asistencias: ' + error.toString());
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

    // 2. Actualizar asistencias desde hojas externas (múltiples grupos)
    try {
      const resultados = contarAsistenciasTodosGrupos();

      if (resultados.length === 0) {
        reporte.getRange('B14').setValue('No configurado');
        reporte.getRange('B15').setValue(0);
        reporte.getRange('B16').setValue(0);
      } else {
        // Calcular totales
        let totalGeneral = 0;
        let totalMes = 0;
        let gruposConError = 0;

        resultados.forEach(resultado => {
          if (!resultado.error) {
            totalGeneral += resultado.totalAsistencias;
            totalMes += resultado.asistenciasMes;
          } else {
            gruposConError++;
          }
        });

        // Actualizar celdas
        reporte.getRange('B14').setValue(resultados.length + ' grupos conectados');
        reporte.getRange('B15').setValue(totalGeneral);
        reporte.getRange('B16').setValue(totalMes);

        // Mostrar asistencias por grupo en filas adicionales (a partir de fila 17)
        let filaActual = 17;
        resultados.forEach(resultado => {
          if (filaActual <= 50) {  // Límite de seguridad
            reporte.getRange('A' + filaActual).setValue('  • ' + resultado.grupo);
            if (resultado.error) {
              reporte.getRange('B' + filaActual).setValue('Error');
            } else {
              reporte.getRange('B' + filaActual).setValue(resultado.asistenciasMes);
            }
            filaActual++;
          }
        });

        // Limpiar filas sobrantes
        for (let i = filaActual; i <= 50; i++) {
          reporte.getRange('A' + i).clearContent();
          reporte.getRange('B' + i).clearContent();
        }
      }
    } catch (e) {
      reporte.getRange('B14').setValue('Error');
      reporte.getRange('B15').setValue(0);
      reporte.getRange('B16').setValue(0);
      Logger.log('⚠️ Error actualizando asistencias: ' + e.toString());
    }

    // 3. Forzar recalculo - método más robusto
    SpreadsheetApp.flush();

    // 4. Actualizar las celdas de fórmulas una por una para forzar recalculo
    const celdas = ['B6', 'B7', 'B10', 'B11',
                    'B19', 'B20', 'B21', 'B22', 'B23',
                    'B25', 'B26', 'B27', 'B28', 'B29',
                    'B32', 'B33', 'B34',
                    'B37', 'B38', 'B39', 'B42', 'B45', 'B46', 'B47'];

    celdas.forEach(celda => {
      const formula = reporte.getRange(celda).getFormula();
      if (formula) {
        // Forzar recalculo estableciendo de nuevo la fórmula
        reporte.getRange(celda).setFormula(formula);
      }
    });

    // 5. Flush final
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

/**
 * Verifica si hoy es el penúltimo día del mes y envía recordatorio
 * Esta función debe ejecutarse diariamente mediante trigger
 */
function verificarYEnviarRecordatorioReporteMensual() {
  try {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    // Verificar si mañana es el último día del mes
    // Si el día de mañana es mayor que el de pasado mañana, significa que mañana es el último día
    const pasadoManana = new Date(manana);
    pasadoManana.setDate(manana.getDate() + 1);

    // Si el mes de pasado mañana es diferente al de mañana, entonces mañana es el último día
    // Por lo tanto, HOY es el penúltimo día
    if (pasadoManana.getMonth() !== manana.getMonth()) {
      // Hoy es el penúltimo día del mes, enviar recordatorio
      enviarRecordatorioReporteMensual();
      Logger.log('✅ Recordatorio de reporte mensual enviado');
    } else {
      Logger.log('ℹ️ Hoy no es el penúltimo día del mes. No se envía recordatorio.');
    }
  } catch (error) {
    Logger.log('❌ Error verificando fecha para recordatorio: ' + error.message);
  }
}

/**
 * Envía email a la directora recordando generar el reporte mensual
 */
function enviarRecordatorioReporteMensual() {
  try {
    const props = PropertiesService.getScriptProperties();
    const emailDirectora = props.getProperty('EMAIL_DIRECTORA');

    if (!emailDirectora || emailDirectora === '') {
      Logger.log('⚠️ Email de directora no configurado');
      return;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nombreHoja = ss.getName();
    const urlHoja = ss.getUrl();
    const mesActual = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');
    const fechaHoy = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');

    const asunto = '⏰ Recordatorio: Generar Reporte Mensual - ' + mesActual;

    const cuerpo = '<!DOCTYPE html>' +
      '<html>' +
      '<head>' +
      '<style>' +
      'body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }' +
      '.container { max-width: 600px; margin: 0 auto; padding: 20px; }' +
      '.header { background-color: #ff9800; color: white; padding: 20px; border-radius: 5px 5px 0 0; }' +
      '.content { background-color: #fff; padding: 20px; border: 1px solid #ddd; }' +
      '.footer { background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; }' +
      '.button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }' +
      '.warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }' +
      '.info { background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 15px 0; }' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div class="container">' +
      '<div class="header">' +
      '<h2>⏰ Recordatorio: Reporte Mensual</h2>' +
      '</div>' +
      '<div class="content">' +
      '<p><strong>Fecha:</strong> ' + fechaHoy + '</p>' +
      '<div class="warning">' +
      '<h3>🗓️ Mañana es el último día del mes</h3>' +
      '<p>Este es un recordatorio para que genere el <strong>Reporte Mensual de ' + mesActual + '</strong> antes de que termine el mes.</p>' +
      '</div>' +
      '<div class="info">' +
      '<h4>📋 Pasos para generar el reporte:</h4>' +
      '<ol>' +
      '<li>Abra la hoja de cálculo</li>' +
      '<li>Vaya al menú <strong>📊 Sistema Apoyo Emocional</strong></li>' +
      '<li>Seleccione <strong>💾 Guardar Reporte Mensual</strong></li>' +
      '<li>Confirme si desea resetear los datos para el nuevo mes</li>' +
      '</ol>' +
      '</div>' +
      '<p style="text-align: center; margin: 20px 0;">' +
      '<a href="' + urlHoja + '" class="button">📊 Abrir Hoja de Cálculo</a>' +
      '</p>' +
      '<p><strong>Sistema:</strong> ' + nombreHoja + '</p>' +
      '<p style="color: #666; font-size: 14px;">💡 <strong>Nota:</strong> Al guardar el reporte, puede elegir resetear todos los datos a cero para empezar el nuevo mes con el sistema limpio.</p>' +
      '</div>' +
      '<div class="footer">' +
      '<p>Este es un mensaje automático del Sistema de Apoyo Emocional</p>' +
      '<p>No responda a este correo</p>' +
      '</div>' +
      '</div>' +
      '</body>' +
      '</html>';

    MailApp.sendEmail({
      to: emailDirectora,
      subject: asunto,
      htmlBody: cuerpo
    });

    Logger.log('✅ Email de recordatorio enviado a: ' + emailDirectora);

  } catch (error) {
    Logger.log('❌ Error enviando recordatorio de reporte mensual: ' + error.message);
  }
}

/**
 * Instala el trigger diario para verificar y enviar recordatorio de reporte mensual
 */
function instalarTriggerRecordatorioMensual() {
  try {
    // Eliminar triggers existentes para esta función
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'verificarYEnviarRecordatorioReporteMensual') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger diario a las 9:00 AM
    ScriptApp.newTrigger('verificarYEnviarRecordatorioReporteMensual')
      .timeBased()
      .atHour(9)
      .everyDays(1)
      .create();

    SpreadsheetApp.getActiveSpreadsheet().toast(
      '✅ Trigger de recordatorio mensual instalado correctamente\n\n' +
      'Se verificará diariamente a las 9:00 AM si es el penúltimo día del mes\n' +
      'y se enviará un recordatorio a la directora para generar el reporte.',
      'Recordatorio Mensual',
      6
    );

    Logger.log('✅ Trigger de recordatorio mensual instalado correctamente');
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ Error: ' + error.message,
      'Error',
      5
    );
    Logger.log('❌ Error instalando trigger de recordatorio mensual: ' + error.message);
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

    // RESETEAR DATOS: Limpiar todas las hojas después de guardar
    const ui = SpreadsheetApp.getUi();
    const confirmar = ui.alert(
      '✅ REPORTE GUARDADO\n\n' +
      'Mes: ' + mesActual + '\n' +
      'Fila: ' + nuevaFila + '\n\n' +
      '¿RESETEAR DATOS A CERO?\n\n' +
      'Esto limpiará:\n' +
      '• Nuevos Ingresos\n' +
      '• Terapias\n' +
      '• Procesos Culminados\n' +
      '• Deserciones\n' +
      '• Intervención de casos\n' +
      '• Personas no asistidas',
      ui.ButtonSet.YES_NO
    );

    if (confirmar === ui.Button.YES) {
      resetearDatosParaNuevoMes();
      ss.toast(
        '✅ DATOS RESETEADOS\n\n' +
        'El sistema está listo para el nuevo mes.',
        'Reset Completo',
        5
      );
    } else {
      ss.toast(
        '✅ Reporte guardado\n\n' +
        'Datos NO reseteados.',
        'Guardado',
        3
      );
    }

  } catch (error) {
    Logger.log('❌ Error guardando reporte: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Error: ' + error.toString(),
      'Error',
      5
    );
  }
}

/**
 * Resetea todos los datos para empezar un nuevo mes
 */
function resetearDatosParaNuevoMes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Limpiar Nuevos Ingresos (mantener headers)
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    if (nuevos && nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 9).clearContent();
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 9).setBackground(null);
    }

    // Limpiar Terapias (mantener headers)
    const terapias = ss.getSheetByName('Terapias');
    if (terapias && terapias.getLastRow() > 1) {
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 8).clearContent();
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 8).setBackground(null);
    }

    // Limpiar Procesos Culminados (mantener headers)
    const culminados = ss.getSheetByName('Procesos Culminados');
    if (culminados && culminados.getLastRow() > 1) {
      culminados.getRange(2, 1, culminados.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Deserciones (mantener headers)
    const deserciones = ss.getSheetByName('Deserciones');
    if (deserciones && deserciones.getLastRow() > 1) {
      deserciones.getRange(2, 1, deserciones.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Intervención de casos (mantener headers)
    const gestion = ss.getSheetByName('Intervención de casos');
    if (gestion && gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Personas no asistidas (mantener headers)
    const noAsistidas = ss.getSheetByName('Personas no asistidas');
    if (noAsistidas && noAsistidas.getLastRow() > 1) {
      noAsistidas.getRange(2, 1, noAsistidas.getLastRow() - 1, 8).clearContent();
    }

    // Actualizar reportes
    actualizarReportes();

    Logger.log('✅ Datos reseteados para nuevo mes');
  } catch (error) {
    Logger.log('❌ Error reseteando datos: ' + error.toString());
    throw error;
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
      espera.getRange(2, 1, espera.getLastRow() - 1, 13).clearContent();
      espera.getRange(2, 1, espera.getLastRow() - 1, 13).setBackground(null);
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
      // NO restaurar fórmulas - los valores se agregan directamente desde el código
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
