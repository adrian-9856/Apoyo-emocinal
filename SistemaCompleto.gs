
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();

    // Submenú: Instalación
    const menuInstalacion = ui.createMenu('⚙️ Instalación')
      .addItem('🚀 Instalar Sistema', 'instalarSistema')
      .addItem('✅ Verificar Instalación', 'verificarInstalacion')
      .addItem('🔄 Instalar Actualizaciones', 'instalarActualizaciones');

    // Submenú: Configuración
    const menuConfiguracion = ui.createMenu('🔧 Configuración')
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
      .addItem('✏️ Instalar Trigger onEdit', 'instalarTriggerOnEdit');

    // Submenú: Bienestar (Importación Automática desde KoboToolbox)
    const menuBienestar = ui.createMenu('🏥 Bienestar')
      .addItem('🆘 VERIFICAR ALERTAS AHORA', 'verificarAlertasRapido')
      .addSeparator()
      .addItem('📧 Configurar Correo de Prueba', 'configurarCorreoPruebaBienestar')
      .addItem('🚀 Activar Modo Producción', 'activarModoProduccionBienestar')
      .addItem('ℹ️ Ver Estado Actual', 'verEstadoCorreosBienestar')
      .addSeparator()
      .addItem('🔍 Probar Importación (Diagnóstico)', 'probarImportacionBienestar')
      .addItem('⚡ Importar Datos Ahora', 'importarDatosAutomatico')
      .addItem('⏰ Activar Importación Rápida (cada 1 min)', 'instalarImportacionAutomatica')
      .addSeparator()
      .addItem('🗑️ Limpiar Hoja de Bienestar', 'limpiarHojaBienestar');

    // Submenú: Mantenimiento
    const menuMantenimiento = ui.createMenu('🛠️ Mantenimiento')
      .addItem('🔧 Reparar Validaciones', 'repararValidaciones')
      .addItem('⚡ Reparar Terapias (Fecha + Validaciones)', 'repararTerapias')
      .addItem('🔧 Reparar Fórmulas Lista Espera', 'repararFormulasListaEspera')
      .addItem('🔧 Actualizar Fórmulas Reporte', 'actualizarFormulasReporte')
      .addItem('🔍 Diagnosticar Reporte', 'diagnosticarReporte')
      .addItem('📦 Compactar Lista Espera', 'compactarListaEspera');

    // Menú principal
    ui.createMenu('🏥 Apoyo Emocional')
      .addSubMenu(menuInstalacion)
      .addSubMenu(menuConfiguracion)
      .addSeparator()
      .addItem('📊 Actualizar Reportes', 'actualizarReportes')
      .addItem('💾 Guardar Reporte Mensual', 'guardarReporteMensual')
      .addSeparator()
      .addSubMenu(menuBienestar)
      .addSubMenu(menuMantenimiento)
      .addSeparator()
      .addItem('🧹 Limpiar Todos los Datos', 'limpiarTodosLosDatos')
      .addToUi();

    // Ejecutar mantenimiento automático al abrir
    try {
      mantenimientoAutomatico();
    } catch (error) {
      Logger.log('Error en mantenimiento automático: ' + error.message);
    }
  } catch (error) {
    // Si getUi() no está disponible (ejecutándose desde trigger instalable o editor)
    // solo registrar el error y continuar
    Logger.log('onOpen ejecutado desde contexto sin UI disponible: ' + error.message);
  }
}

/**
 * Ejecuta mantenimiento automático al abrir el documento
 * - Repara fórmulas de fecha y número en Lista de Espera
 * - Compacta la lista eliminando filas vacías
 * - Actualiza reportes
 */
function mantenimientoAutomatico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    Logger.log('🔧 Iniciando mantenimiento automático...');

    // 1. Reparar fórmulas de Lista de Espera
    const sheet = ss.getSheetByName('Lista de Espera');
    if (sheet) {
      // Crear fórmulas mejoradas para fecha y número
      const formulas = [];
      for (let i = 2; i <= 1000; i++) {
        formulas.push([
          '=IF(C' + i + '<>"",TODAY(),"")',  // Columna A: Fecha
          '=IF(C' + i + '<>"",COUNTA($C$2:C' + i + '),"")'  // Columna B: Número secuencial
        ]);
      }

      // Aplicar fórmulas silenciosamente
      sheet.getRange('A2:B1000').setFormulas(formulas);
      Logger.log('✅ Fórmulas de Lista de Espera reparadas');
    }

    // 2. Compactar Lista de Espera (eliminar filas vacías)
    if (sheet) {
      const ultimaFila = 1000;
      const datos = sheet.getRange(2, 3, ultimaFila - 1, 12).getValues(); // C2:N1000

      // Filtrar solo las filas que tienen nombre (columna C no vacía)
      const datosCompactados = [];
      datos.forEach(fila => {
        const nombre = fila[0]; // Columna C
        if (nombre && nombre.toString().trim() !== '') {
          datosCompactados.push(fila);
        }
      });

      if (datosCompactados.length > 0) {
        // Limpiar todo el rango de datos
        sheet.getRange(2, 3, ultimaFila - 1, 12).clearContent();

        // Escribir los datos compactados desde la fila 2
        sheet.getRange(2, 3, datosCompactados.length, 12).setValues(datosCompactados);
        Logger.log('✅ Lista de Espera compactada: ' + datosCompactados.length + ' registros');
      }
    }

    // 3. Actualizar reportes
    actualizarReportes();
    Logger.log('✅ Reportes actualizados');

    Logger.log('🎉 Mantenimiento automático completado');

  } catch (error) {
    Logger.log('❌ Error en mantenimiento automático: ' + error.message);
  }
}

// =====================================================================
// INSTALACIÓN COMPLETA
// =====================================================================

function instalarSistema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('📋 Creando hojas...', 'Instalando', 3);
    Utilities.sleep(1000);
    crearHojas();

    ss.toast('✅ Configurando validaciones...', 'Instalando', 3);
    Utilities.sleep(1000);
    configurarValidaciones();

    ss.toast('🎨 Aplicando formatos...', 'Instalando', 3);
    Utilities.sleep(1000);
    configurarFormatos();

    ss.toast('📝 Creando ejemplos...', 'Instalando', 3);
    Utilities.sleep(1000);
    crearEjemplos();

    ss.toast('⏰ Instalando triggers automáticos...', 'Instalando', 3);
    Utilities.sleep(1000);

    // Instalar trigger onEdit (necesario para diálogos)
    try {
      const triggers = ScriptApp.getProjectTriggers();
      triggers.forEach(trigger => {
        if (trigger.getHandlerFunction() === 'alEditar' &&
            trigger.getEventType() === ScriptApp.EventType.ON_EDIT) {
          ScriptApp.deleteTrigger(trigger);
        }
      });

      ScriptApp.newTrigger('alEditar')
        .forSpreadsheet(ss)
        .onEdit()
        .create();

      Logger.log('✅ Trigger onEdit instalado');
    } catch (triggerError) {
      Logger.log('⚠️ Error instalando trigger onEdit: ' + triggerError.message);
    }

    // Instalar trigger de tiempo (actualización de reportes cada hora)
    try {
      const triggers = ScriptApp.getProjectTriggers();
      triggers.forEach(trigger => {
        if (trigger.getHandlerFunction() === 'actualizarReportes') {
          ScriptApp.deleteTrigger(trigger);
        }
      });

      ScriptApp.newTrigger('actualizarReportes')
        .timeBased()
        .everyHours(1)
        .create();

      Logger.log('✅ Trigger de tiempo instalado');
    } catch (triggerError) {
      Logger.log('⚠️ Error instalando trigger de tiempo: ' + triggerError.message);
    }

    ss.toast(
      '✅ SISTEMA INSTALADO COMPLETAMENTE\n\n' +
      '✓ Todas las hojas creadas\n' +
      '✓ Validaciones configuradas\n' +
      '✓ Formatos aplicados\n' +
      '✓ Trigger onEdit instalado (para diálogos)\n' +
      '✓ Trigger de tiempo instalado (reportes cada hora)\n\n' +
      '🎯 El sistema está listo para usar.\n\n' +
      'NOTA: Si los diálogos de deserción no aparecen,\n' +
      'use el menú: 🏥 Apoyo Emocional → ✏️ Instalar Trigger onEdit',
      'INSTALACIÓN COMPLETA',
      10
    );

    Logger.log('✅ Sistema instalado completamente');

  } catch (error) {
    ss.toast('❌ Error: ' + error.message, 'ERROR', 10);
    Logger.log('❌ Error en instalación: ' + error.message);
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
    'Fecha Solicitud', 'No.', 'Nombre Completo', 'Creamos ID', 'Género',
    'Edad', 'Malestar Principal', 'Teléfono', 'Derivación o Referencia',
    'Nombre de quien deriva o refiere', 'Programa de Creamos / Organización',
    'Servicio que solicita', 'Terapeuta Asignado', 'Asistió a Cita'
  ];

  sheet.getRange(1, 1, 1, 14).setValues([headers])
    .setBackground('#e91e63')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas para fecha y número automáticos (extendido a 1000 filas)
  const formulas = [];
  for (let i = 2; i <= 1000; i++) {
    formulas.push([
      '=IF(C' + i + '<>"",TODAY(),"")',  // Columna A: Fecha
      '=IF(C' + i + '<>"",COUNTA($C$2:C' + i + '),"")'  // Columna B: Número secuencial
    ]);
  }

  // Aplicar todas las fórmulas de una vez (más eficiente)
  sheet.getRange('A2:B1000').setFormulas(formulas);

  [110, 60, 200, 120, 100, 100, 250, 200, 180, 220, 220, 180, 150, 120].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Proteger columnas de fecha y número para que no se editen manualmente
  sheet.getRange('A2:A1000').protect().setWarningOnly(true);
  sheet.getRange('B2:B1000').protect().setWarningOnly(true);
}

function crearNuevosIngresos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Nuevos Ingresos');
  sheet.clear();

  const headers = [
    'Fecha Ingreso', 'No.', 'Nombre Completo', 'Creamos ID', 'Género',
    'Edad', 'Malestar Principal'
  ];

  sheet.getRange(1, 1, 1, 7).setValues([headers])
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // NO usar fórmulas en columnas A y B
  // La fecha y número se agregarán desde el código JavaScript
  // cuando se agregue cada registro
  // Esto evita que las fechas se actualicen constantemente con TODAY()

  [110, 60, 200, 120, 100, 100, 250].forEach((w, i) => {
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
    'Terapeuta', 'Fecha', 'Participante', 'Creamos ID', 'Género',
    'No. Sesión', 'Estado', 'Motivo Finalización', 'Sesiones Mes Anterior', 'Inasistencias'
  ];

  sheet.getRange(1, 1, 1, 10).setValues([headers])
    .setBackground('#2e7d32')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 110, 200, 120, 80, 80, 120, 300, 120, 100].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Fórmula para la fecha automática (columna B) y valores iniciales
  for (let i = 2; i <= 200; i++) {
    // Columna B: Fecha automática (se actualiza cuando hay participante)
    sheet.getRange('B' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    // Columna I: Sesiones Mes Anterior
    sheet.getRange('I' + i).setValue(0);
    // Columna J: Inasistencias
    sheet.getRange('J' + i).setValue(0);
  }

  // Proteger columna de Fecha para que no se edite manualmente
  sheet.getRange('B2:B200').protect().setWarningOnly(true);
}

function crearProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Procesos Culminados');

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creamos ID', 'Total Sesiones', 'Motivo'];

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

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creamos ID', 'Sesiones', 'Motivo'];

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

  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creamos ID', 'Tipo', 'Motivo'];

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

  const headers = ['Fecha', 'Nombre Completo', 'Creamos ID', 'Género', 'Edad', 'Malestar Principal', 'Terapeuta Asignado', 'Teléfono'];

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

  // Título principal
  const data = [
    ['REPORTE AUTOMATICO - APOYO EMOCIONAL', '', '', ''],
    ['Ultima actualizacion:', '=TEXT(NOW(),"DD/MM/YYYY HH:MM")', 'Mes actual:', '=TEXT(TODAY(),"MMMM YYYY")'],
    ['', '', '', ''],

    // SECCIÓN 1: INGRESOS
    ['NUEVOS INGRESOS', 'Total', 'Este mes', ''],
    ['Participantes que vinieron a primera cita', '=IFERROR(COUNTA(\'Nuevos Ingresos\'!C:C)-1,0)', '=IFERROR(COUNTIFS(\'Nuevos Ingresos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Nuevos Ingresos\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 2: NO ASISTIDAS
    ['PERSONAS NO ASISTIDAS', 'Total', 'Este mes', ''],
    ['Personas que no asistieron a primera cita', '=IFERROR(COUNTA(\'Personas no asistidas\'!B:B)-1,0)', '=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 3: DERIVACIONES
    ['DERIVACIONES INSTITUCIONALES', 'Total', '', ''],
    ['Total derivaciones institucionales', '=IFERROR(COUNTA(\'Lista de Espera\'!K:K)-1,0)', '', ''],
    ['', '', '', ''],

    // SECCIÓN 4: BIENESTAR (Formularios de KoboToolbox)
    ['FORMULARIO DE BIENESTAR', 'Total', 'Alertas suicidio', ''],
    ['Formularios recibidos', '=IFERROR(COUNTA(\'C_03_Formulario de Bienestar (2026)\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Sí")+COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Si"),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 5: CASOS ACTIVOS
    ['CASOS ACTIVOS POR TERAPEUTA', 'Casos activos', 'Sesiones mes', ''],
    ['Gerber', '=IFERROR(COUNTIFS(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso"),0)', '=IFERROR(SUMPRODUCT((Terapias!A2:A500="Gerber")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)', ''],
    ['Melissa', '=IFERROR(COUNTIFS(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso"),0)', '=IFERROR(SUMPRODUCT((Terapias!A2:A500="Melissa")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)', ''],
    ['Diana', '=IFERROR(COUNTIFS(Terapias!A:A,"Diana",Terapias!G:G,"En proceso"),0)', '=IFERROR(SUMPRODUCT((Terapias!A2:A500="Diana")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)', ''],
    ['Karina', '=IFERROR(COUNTIFS(Terapias!A:A,"Karina",Terapias!G:G,"En proceso"),0)', '=IFERROR(SUMPRODUCT((Terapias!A2:A500="Karina")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)', ''],
    ['TOTAL', '=IFERROR(SUM(B17:B20),0)', '=IFERROR(SUM(C17:C20),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 6: PROCESOS CULMINADOS
    ['PROCESOS CULMINADOS', 'Total', 'Este mes', 'Promedio sesiones'],
    ['Procesos terapeuticos completados', '=IFERROR(COUNTA(\'Procesos Culminados\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', '=IFERROR(IF(B24>0,ROUND(AVERAGE(\'Procesos Culminados\'!E2:E500),1),0),0)'],
    ['', '', '', ''],

    // SECCIÓN 7: DESERCIONES
    ['DESERCIONES', 'Total', 'Este mes', 'Tasa desercion'],
    ['Participantes que desertaron', '=IFERROR(COUNTA(Deserciones!A:A)-1,0)', '=IFERROR(COUNTIFS(Deserciones!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Deserciones!A:A,"<="&EOMONTH(TODAY(),0)),0)', '=IFERROR(IF((B24+B27)>0,ROUND(B27/(B24+B27)*100,1)&"%","0%"),"0%")'],
    ['', '', '', ''],

    // SECCIÓN 8: INTERVENCION DE CASOS
    ['INTERVENCION DE CASOS', 'Total', '', ''],
    ['Casos en intervencion', '=IFERROR(COUNTA(\'Intervención de casos\'!A:A)-1,0)', '', ''],
    ['', '', '', ''],

    // SECCIÓN 9: RESUMEN GENERAL
    ['RESUMEN GENERAL', 'Valor', '', ''],
    ['Total casos procesados', '=IFERROR(B24+B27+B30,0)', '', ''],
    ['Tasa de exito', '=IFERROR(IF(B33>0,ROUND(B24/B33*100,1)&"%","0%"),"0%")', '', ''],
    ['Casos activos totales', '=IFERROR(B21,0)', '', '']
  ];

  // Escribir datos
  sheet.getRange(1, 1, data.length, 4).setValues(data);

  // DISEÑO: Título principal (fila 1)
  sheet.getRange('A1:D1')
    .merge()
    .setBackground('#0d47a1')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(16)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 45);

  // DISEÑO: Subtítulo con fecha (fila 2)
  sheet.getRange('A2:D2')
    .setBackground('#e3f2fd')
    .setFontSize(10)
    .setVerticalAlignment('middle');
  sheet.getRange('A2').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.getRange('C2').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.setRowHeight(2, 30);

  // DISEÑO: Headers de secciones (columnas azul oscuro)
  const headerRows = [4, 7, 10, 13, 16, 23, 26, 29, 32];
  headerRows.forEach(row => {
    sheet.getRange('A' + row + ':D' + row)
      .setBackground('#1565c0')
      .setFontColor('white')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setFontSize(11);
    sheet.setRowHeight(row, 35);
  });

  // DISEÑO: Filas totales (azul más claro, negrita)
  const totalRows = [21, 33, 34, 35];
  totalRows.forEach(row => {
    sheet.getRange('A' + row + ':D' + row)
      .setBackground('#bbdefb')
      .setFontWeight('bold')
      .setFontSize(10);
  });

  // DISEÑO: Filas de datos normales (fondo blanco alternado)
  const dataRows = [5, 8, 11, 14, 17, 18, 19, 20, 24, 27, 30];
  dataRows.forEach((row, idx) => {
    const bg = idx % 2 === 0 ? '#ffffff' : '#f5f5f5';
    sheet.getRange('A' + row + ':D' + row)
      .setBackground(bg)
      .setFontSize(10)
      .setVerticalAlignment('middle');
  });

  // Bordes profesionales en toda la tabla
  sheet.getRange('A1:D' + data.length)
    .setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);

  // Anchos de columna optimizados para cualquier laptop
  sheet.setColumnWidth(1, 280);  // Columna descripción
  sheet.setColumnWidth(2, 120);  // Columna valor 1
  sheet.setColumnWidth(3, 120);  // Columna valor 2
  sheet.setColumnWidth(4, 140);  // Columna valor 3

  // Alineación de números
  sheet.getRange('B:D').setHorizontalAlignment('center');
  sheet.getRange('A:A').setHorizontalAlignment('left');

  // Altura predeterminada para filas de datos
  for (let i = 1; i <= data.length; i++) {
    if (!headerRows.includes(i) && i !== 1 && i !== 2) {
      sheet.setRowHeight(i, 28);
    }
  }

  // Congelar las dos primeras filas
  sheet.setFrozenRows(2);
}

function crearReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Reportes Mensuales');

  const headers = [
    'Mes/Año', 'Nuevos Ingresos', 'Culminados', 'Deserciones', 'Gestión Casos',
    'Total Activos', 'Tasa Éxito (%)',
    'Sesiones Gerber', 'Sesiones Melissa', 'Sesiones Diana', 'Sesiones Karina',
    'Activos Gerber', 'Activos Melissa', 'Activos Diana', 'Activos Karina',
    'Derivaciones Externas', 'Fecha Guardado'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#6a1b9a')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 100, 100, 100, 100, 100, 100, 90, 90, 90, 90, 90, 90, 90, 90, 120, 120].forEach((w, i) => {
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
  const intervencion = ss.getSheetByName('Intervención de casos');
  const deserciones = ss.getSheetByName('Deserciones');

  // LIMPIAR TODAS las validaciones existentes primero
  // clearDataValidations() debe llamarse sobre un rango, no sobre la hoja
  nuevos.getRange('A1:Z200').clearDataValidations();
  espera.getRange('A1:Z200').clearDataValidations();
  terapias.getRange('A1:Z200').clearDataValidations();
  if (intervencion) {
    intervencion.getRange('A1:Z200').clearDataValidations();
  }
  if (deserciones) {
    deserciones.getRange('A1:Z200').clearDataValidations();
  }

  // Validaciones de género
  // SOLO en hojas donde el usuario EDITA manualmente
  // NO en Nuevos Ingresos - se llena automáticamente
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('E2:E200').setDataValidation(generoRule);
  terapias.getRange('E2:E200').setDataValidation(generoRule);

  // Edad en Lista de Espera es ahora texto libre (sin validación)

  // Validaciones de terapeuta
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('A2:A200').setDataValidation(terapeutaRule);

  // Validaciones de número de sesión - Terapias columna F
  const sesiones = [];
  for (let i = 1; i <= 20; i++) {
    sesiones.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesiones)
    .setAllowInvalid(false)
    .build();
  terapias.getRange('F2:F200').setDataValidation(sesionRule);

  // Validaciones de estado - Terapias columna G
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['En proceso', 'Proceso culminado', 'deserciones'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('G2:G200').setDataValidation(estadoRule);

  // Validaciones de terapeuta - en Lista de Espera columna M (13)
  espera.getRange('M2:M200').setDataValidation(terapeutaRule);

  // Validaciones de asistencia - en Lista de Espera columna N (14)
  const asistenciaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Vino', 'No vino', 'Pendiente'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('N2:N200').setDataValidation(asistenciaRule);

  // Validaciones de Tipo de Intervención - en Intervención de casos columna E
  if (intervencion) {
    // Validación en columna E (Tipo) - desplegable con 4 opciones
    const tipoIntervencionRule = SpreadsheetApp.newDataValidation()
      .requireValueInList([
        'Referencia programas',
        'Derivación institucional',
        'Paps',
        'Crisis suicida'
      ])
      .setAllowInvalid(true)
      .build();
    intervencion.getRange('E2:E200').setDataValidation(tipoIntervencionRule);

    // NO validación en columna F (Motivo) - debe ser texto libre
  }

  // Validaciones de Motivos de Deserción - en Deserciones columna F
  if (deserciones) {
    const motivoDesercionRule = SpreadsheetApp.newDataValidation()
      .requireValueInList([
        'Otras prioridades',
        'Horario laboral',
        'Retos/problemas familiares',
        'Violencia de parte de la pareja/violencia de género',
        'Migración (por motivos económicos/por violencia)',
        'Embarazo',
        'Retos/problemas de salud física',
        'Retos/problemas de salud mental',
        'Retos/Problemas legales/Privación de libertad',
        'Falta de apoyo',
        'Compromisos religiosos',
        'Problemas financieros',
        'Violencia comunitaria',
        'Falta de motivación',
        'No querer continuar en el proceso',
        'Descontento con la organización',
        'Falta de comunicación',
        'Falta de interés',
        'Asesinato/Fallecimiento',
        'Cuidado de terceras personas',
        'Falta de adaptabilidad'
      ])
      .setAllowInvalid(true)
      .build();
    deserciones.getRange('F2:F200').setDataValidation(motivoDesercionRule);
  }

  // =====================================================================
  // RESUMEN DE VALIDACIONES POR HOJA:
  // =====================================================================
  //
  // NUEVOS INGRESOS:
  //   - SIN validaciones (se llena automáticamente desde código)
  //
  // LISTA DE ESPERA:
  //   - Género (E)
  //   - Edad (F) - texto libre, sin validación
  //   - Terapeuta Asignado (M)
  //   - Asistió a Cita (N)
  //
  // TERAPIAS:
  //   - Terapeuta (A)
  //   - Género (D)
  //   - No. Sesión (E)
  //   - Estado (F)
  //
  // INTERVENCION DE CASOS:
  //   - Tipo (E) - desplegable: Referencia programas, Derivación institucional, Paps, Crisis suicida
  //   - Motivo (F) - texto libre, sin validación
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

  // CASO 1: Lista de Espera - Asignación de Terapeuta (columna N = 14)
  if (hoja === 'Lista de Espera' && columna === 14) {
    Logger.log('✅ Detectada edición en Lista de Espera, columna N (14)');
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

  // CASO 2: Lista de Espera - Confirmación de Asistencia (columna N = 15)
  if (hoja === 'Lista de Espera' && columna === 14) {
    Logger.log('✅ Detectada edición en Lista de Espera, columna N (14)');
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

  // CASO 3: Terapias - Cambio de Número de Sesión (columna F)
  if (hoja === 'Terapias' && columna === 6) {
    Logger.log('✅ Detectado cambio en No. Sesión en Terapias');
    Logger.log('   Fila: ' + fila + ', Nuevo valor: ' + val);

    try {
      // Preguntar si vino o no vino a la sesión
      registrarAsistenciaSesion(sheet, fila, val);
      Logger.log('✅ Asistencia registrada');

      actualizarReportes();
      Logger.log('✅ Reportes actualizados');
    } catch (error) {
      Logger.log('❌ ERROR: ' + error.toString());
    }
  }

  // CASO 4: Terapias - Cambio de Estado (columna G)
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

  // CASO 5: Formulario de Bienestar - Enviar a Lista de Espera (columna E = 5)
  if (hoja === 'C_03_Formulario de Bienestar (2026)' && columna === 5) {
    Logger.log('✅ Detectada edición en Bienestar, columna E (Enviar a Lista)');
    Logger.log('   Valor ingresado: "' + val + '"');

    if (val === 'Sí' || val === 'Si' || val === 'sí' || val === 'si') {
      Logger.log('✅ Usuario seleccionó "Sí" - Enviando a Lista de Espera');
      Logger.log('▶️ EJECUTANDO enviarBienestarAListaEspera...');

      try {
        enviarBienestarAListaEspera(sheet, fila);
        Logger.log('✅ enviarBienestarAListaEspera completado');

        // Marcar la fila con color verde para indicar que fue enviada
        sheet.getRange(fila, 1, 1, 5).setBackground('#d4edda');
        Logger.log('✅ Fila marcada en verde (enviada)');

        actualizarReportes();
        Logger.log('✅ Reportes actualizados');
      } catch (error) {
        Logger.log('❌ ERROR en enviarBienestarAListaEspera: ' + error.toString());
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
    const nombre = sheetOrigen.getRange(fila, 3).getValue(); // Columna C

    if (!nombre || nombre.toString().trim() === '') {
      ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 3);
      sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar terapeuta (columna M)
      return;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log('Asignando ' + nombreLimpio + ' a ' + terapeuta);

    // 1. Enviar email al terapeuta
    const emailEnviado = enviarEmailAsignacionTerapeuta(terapeuta, nombreLimpio, fila);

    // 2. Notificar al usuario
    if (emailEnviado) {
      ss.toast(
        '✅ Caso asignado a ' + terapeuta + '\n\n' +
        '📧 Email enviado al terapeuta\n\n' +
        'El terapeuta debe confirmar si la persona asistió.',
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

    // 3. Marcar fila en amarillo (pendiente)
    sheetOrigen.getRange(fila, 1, 1, 14).setBackground('#fff3cd');

  } catch (error) {
    Logger.log('❌ ERROR en asignarTerapeuta: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    sheetOrigen.getRange(fila, 14).clearContent(); // Limpiar terapeuta (columna N)
  }
}

/**
 * Procesa la confirmación de asistencia por el terapeuta
 */
function procesarConfirmacionAsistencia(sheetOrigen, fila, confirmacion) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Leer todos los datos necesarios (C-M = 11 columnas)
    const datos = sheetOrigen.getRange(fila, 3, 1, 11).getValues()[0];
    const nombre = datos[0];         // C
    const creemosId = datos[1];      // D
    const genero = datos[2];         // E
    const edad = datos[3];           // F: Edad
    const malestar = datos[4];       // G
    const telefono = datos[5];       // H: Teléfono
    const derivacion = datos[6];     // I: Derivación o Referencia
    const quienDeriva = datos[7];    // J: Nombre de quien deriva o refiere
    const programaOrganizacion = datos[8]; // K: Programa de Creamos / Organización
    const servicioSolicita = datos[9]; // L: Servicio que solicita
    const terapeuta = datos[10];     // M: Terapeuta Asignado

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
      enviarANuevosIngresosYTerapias(nombreLimpio, creemosId, genero, edad, malestar, terapeutaNombre, sheetOrigen, fila);
    } else if (confirmacion === 'No vino') {
      // NO VINO: enviar a Personas no asistidas
      Logger.log('Enviando a Personas no asistidas: ' + nombreLimpio);
      enviarAPersonasNoAsistidas(nombreLimpio, creemosId, genero, edad, malestar, terapeutaNombre, telefono, sheetOrigen, fila);
    }
  } catch (error) {
    Logger.log('❌ ERROR en procesarConfirmacionAsistencia: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function enviarANuevosIngresosYTerapias(nombre, creemosId, genero, edad, malestar, terapeuta, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    const terapias = ss.getSheetByName('Terapias');

    Logger.log('Iniciando envío a Nuevos Ingresos y Terapias...');

    // Verificar duplicados en Terapias
    const datosTerapias = terapias.getDataRange().getValues();
    for (let i = 1; i < datosTerapias.length; i++) {
      if (datosTerapias[i][2] && datosTerapias[i][2].toString().trim() === nombre) {
        sheetOrigen.getRange(fila, 1, 1, 14).setBackground('#fff3cd');
        sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar terapeuta (columna M)
        ss.toast('⚠️ ' + nombre + ' ya está en Terapias', 'Ya Asignado', 3);
        Logger.log('Duplicado encontrado en Terapias: ' + nombre);
        return;
      }
    }

    // Verificar duplicados en Nuevos Ingresos
    const datosNuevos = nuevos.getDataRange().getValues();
    for (let i = 1; i < datosNuevos.length; i++) {
      if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombre) { // Columna C (índice 2)
        Logger.log('⚠️ Duplicado encontrado en Nuevos Ingresos: ' + nombre);
        ss.toast(
          '⚠️ DUPLICADO DETECTADO\n\n' +
          nombre + ' ya está en Nuevos Ingresos.\n\n' +
          'No se agregará nuevamente.',
          'Ya Existe',
          4
        );
        sheetOrigen.getRange(fila, 1, 1, 14).setBackground('#fff3cd');
        sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar terapeuta (columna M)
        return;
      }
    }

    // 1. Agregar a Nuevos Ingresos (documentación)
    // Buscar la primera fila vacía en Nuevos Ingresos
    let nuevaFilaNuevos = 2;
    const maxFilasNuevos = 200;

    for (let i = 2; i <= maxFilasNuevos; i++) {
      const nombreExistente = nuevos.getRange(i, 3).getValue(); // Columna C: Nombre
      if (!nombreExistente || nombreExistente.toString().trim() === '') {
        nuevaFilaNuevos = i;
        break;
      }
    }

    const numeroIngreso = nuevaFilaNuevos - 1; // Restar 1 porque fila 1 es header
    const fechaIngreso = new Date();

    const registroNuevos = [
      fechaIngreso,        // Columna A: Fecha
      numeroIngreso,       // Columna B: Número
      nombre,              // Columna C: Nombre
      creemosId || '',     // Columna D: Creamos ID
      genero || '',        // Columna E: Género
      edad || '',          // Columna F: Edad
      malestar || ''       // Columna G: Malestar Principal
    ];
    nuevos.getRange(nuevaFilaNuevos, 1, 1, 7).setValues([registroNuevos]);
    Logger.log('✅ Agregado a Nuevos Ingresos en fila: ' + nuevaFilaNuevos);

    // 2. Crear registro en Terapias
    // Buscar la primera fila vacía en Terapias
    let nuevaFilaTerapias = 2;
    const maxFilasTerapias = 200;

    for (let i = 2; i <= maxFilasTerapias; i++) {
      const participanteExistente = terapias.getRange(i, 3).getValue(); // Columna C: Participante
      if (!participanteExistente || participanteExistente.toString().trim() === '') {
        nuevaFilaTerapias = i;
        break;
      }
    }

    const registroTerapias = [
      terapeuta,          // A: Terapeuta
      '',                 // B: Fecha (se llena automáticamente con la fórmula)
      nombre,             // C: Participante
      creemosId || '',    // D: Creamos ID
      genero || '',       // E: Género
      1,                  // F: No. Sesión
      'En proceso',       // G: Estado
      '',                 // H: Motivo Finalización
      0,                  // I: Sesiones Mes Anterior
      0                   // J: Inasistencias
    ];
    terapias.getRange(nuevaFilaTerapias, 1, 1, 10).setValues([registroTerapias]);
    Logger.log('✅ Agregado a Terapias en fila: ' + nuevaFilaTerapias);

    // Marcar como procesado en verde
    sheetOrigen.getRange(fila, 1, 1, 14).setBackground('#d4edda');
    sheetOrigen.getRange(fila, 13).clearContent(); // Limpiar terapeuta (columna M)
    sheetOrigen.getRange(fila, 14).clearContent(); // Limpiar asistió (columna N)

    SpreadsheetApp.flush();
    ss.toast('✅ ' + nombre + '\n→ Nuevos Ingresos\n→ Terapias con ' + terapeuta, 'Asignado', 4);
    Logger.log('✅ Proceso completado exitosamente');
  } catch (error) {
    Logger.log('❌ ERROR en enviarANuevosIngresosYTerapias: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function enviarAPersonasNoAsistidas(nombre, creemosId, genero, edad, malestar, terapeuta, telefono, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const noAsistidas = ss.getSheetByName('Personas no asistidas');

    Logger.log('Iniciando envío a Personas no asistidas...');

    // Buscar la primera fila vacía
    let nuevaFila = 2;
    const maxFilas = 200;

    for (let i = 2; i <= maxFilas; i++) {
      const nombreExistente = noAsistidas.getRange(i, 2).getValue(); // Columna B: Nombre
      if (!nombreExistente || nombreExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

    const registro = [
      new Date(),
      nombre,
      creemosId || '',
      genero || '',
      edad || '',
      malestar || '',
      terapeuta,
      telefono || ''
    ];

    noAsistidas.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
    Logger.log('✅ Agregado a Personas no asistidas en fila: ' + nuevaFila);

    // Marcar como procesado en rojo (no asistió)
    sheetOrigen.getRange(fila, 1, 1, 14).setBackground('#f8d7da');
    sheetOrigen.getRange(fila, 14).clearContent(); // Limpiar terapeuta (columna N)
    sheetOrigen.getRange(fila, 14).clearContent(); // Limpiar asistió (columna N)

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

  const datos = sheetOrigen.getRange(fila, 3, 1, 5).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Verificar duplicados en Terapias
  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][2] && datosTerapias[i][2].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 7).setBackground('#fff3cd');
      ss.toast(nombreLimpio + ' ya está en Terapias', 'Ya Asignado', 2);
      return;
    }
  }

  // Crear registro en Terapias
  // Buscar la primera fila vacía (columna C debe estar vacía)
  let nuevaFila = 2; // Empezar después del header
  const maxFilas = 200;

  for (let i = 2; i <= maxFilas; i++) {
    const participanteExistente = terapias.getRange(i, 3).getValue(); // Columna C: Participante
    if (!participanteExistente || participanteExistente.toString().trim() === '') {
      nuevaFila = i;
      break;
    }
  }

  const registro = [
    terapeuta,
    '', // Fecha (se llena automáticamente con la fórmula)
    nombreLimpio,
    creemosId || '',
    genero || '',
    1,
    'En proceso',
    '',
    0,  // I: Sesiones Mes Anterior (inicializa en 0)
    0   // J: Inasistencias (inicializa en 0)
  ];

  terapias.getRange(nuevaFila, 1, 1, 10).setValues([registro]);

  // Marcar como procesado
  sheetOrigen.getRange(fila, 1, 1, 7).setBackground('#d4edda');

  SpreadsheetApp.flush(); // Forzar actualización
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta + '\nCaso creado en Terapias', 'Asignado', 3);
}

/**
 * Registra la asistencia a una sesión de terapia
 * Pregunta si el participante vino o no vino a la sesión
 * Si no vino, incrementa el contador de inasistencias
 */
function registrarAsistenciaSesion(sheet, fila, numSesion) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Obtener datos del participante
  const participante = sheet.getRange(fila, 3).getValue(); // Columna C
  const terapeuta = sheet.getRange(fila, 1).getValue();    // Columna A

  if (!participante || participante.toString().trim() === '') {
    Logger.log('⚠️ No hay participante en esta fila, ignorando');
    return;
  }

  const nombre = participante.toString().trim();

  // Mostrar diálogo preguntando si vino o no vino
  const mensaje =
    'REGISTRO DE ASISTENCIA\n\n' +
    'Participante: ' + nombre + '\n' +
    'Terapeuta: ' + terapeuta + '\n' +
    'Sesion: ' + numSesion + '\n\n' +
    'El participante asistio a esta sesion?';

  const respuesta = ui.alert(
    'Asistencia a Sesion',
    mensaje,
    ui.ButtonSet.YES_NO
  );

  if (respuesta === ui.Button.YES) {
    // Vino a la sesión - no hacer nada con el contador
    Logger.log('✅ Participante asistió a la sesión ' + numSesion);
    ss.toast('✅ Asistencia registrada\n\n' + nombre + ' asistio a la sesion ' + numSesion, 'Vino', 3);

  } else if (respuesta === ui.Button.NO) {
    // No vino - incrementar contador de inasistencias
    Logger.log('⚠️ Participante NO asistió a la sesión ' + numSesion);

    const inasistenciasActuales = sheet.getRange(fila, 10).getValue() || 0; // Columna J
    const nuevasInasistencias = parseInt(inasistenciasActuales) + 1;

    sheet.getRange(fila, 10).setValue(nuevasInasistencias); // Columna J

    Logger.log('📊 Inasistencias actualizadas: ' + inasistenciasActuales + ' → ' + nuevasInasistencias);

    ss.toast(
      'INASISTENCIA REGISTRADA\n\n' +
      nombre + ' NO asistio a la sesion ' + numSesion + '\n\n' +
      'Total inasistencias: ' + nuevasInasistencias,
      'No vino',
      4
    );
  } else {
    // Usuario canceló
    Logger.log('⚠️ Usuario canceló el registro de asistencia');
  }
}

/**
 * Muestra un diálogo para seleccionar motivo de deserción usando ui.prompt
 */
function mostrarDialogoMotivoDesercion(nombre, terapeuta, numSesion) {
  const ui = SpreadsheetApp.getUi();

  const motivosDeserciones = [
    '1. Otras prioridades',
    '2. Horario laboral',
    '3. Retos/problemas familiares',
    '4. Violencia de parte de la pareja/violencia de género',
    '5. Migración (por motivos económicos/por violencia)',
    '6. Embarazo',
    '7. Retos/problemas de salud física',
    '8. Retos/problemas de salud mental',
    '9. Retos/Problemas legales/Privación de libertad',
    '10. Falta de apoyo',
    '11. Compromisos religiosos',
    '12. Problemas financieros',
    '13. Violencia comunitaria',
    '14. Falta de motivación',
    '15. No querer continuar en el proceso',
    '16. Descontento con la organización',
    '17. Falta de comunicación',
    '18. Falta de interés',
    '19. Asesinato/Fallecimiento',
    '20. Cuidado de terceras personas',
    '21. Falta de adaptabilidad'
  ];

  const listaMotivos = motivosDeserciones.join('\n');

  const mensaje =
    '🔴 MOTIVO DE DESERCIÓN\n\n' +
    'Participante: ' + nombre + '\n' +
    'Terapeuta: ' + terapeuta + '\n' +
    'Sesiones: ' + numSesion + '\n\n' +
    'MOTIVOS DISPONIBLES:\n' +
    listaMotivos + '\n\n' +
    'Ingrese el NÚMERO (1-21) del motivo:';

  const respuesta = ui.prompt(
    'Motivo de Deserción',
    mensaje,
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) {
    Logger.log('⚠️ Usuario canceló el diálogo');
    return '';
  }

  const numeroSeleccionado = respuesta.getResponseText().trim();
  const numero = parseInt(numeroSeleccionado);

  if (isNaN(numero) || numero < 1 || numero > 21) {
    ui.alert('❌ Error', 'Debe ingresar un número entre 1 y 21', ui.ButtonSet.OK);
    Logger.log('❌ Número inválido ingresado: ' + numeroSeleccionado);
    return '';
  }

  // Obtener el motivo sin el número
  const motivoCompleto = motivosDeserciones[numero - 1];
  const motivo = motivoCompleto.substring(motivoCompleto.indexOf('.') + 2); // Quitar "1. "

  Logger.log('✅ Motivo seleccionado: ' + motivo);
  return motivo;
}

/**
 * Procesa la finalización de terapia (Proceso culminado o deserciones)
 */
function procesarFinalizacionTerapia(sheetOrigen, fila, tipoFinal) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const datos = sheetOrigen.getRange(fila, 1, 1, 10).getValues()[0];
  const terapeuta = datos[0];
  const participante = datos[2];
  const creemosId = datos[3];
  const genero = datos[4];
  const numSesion = datos[5];
  const inasistencias = datos[9] || 0; // Columna J

  if (!participante || participante.toString().trim() === '') {
    ss.toast('⚠️ Error: No hay participante en esta fila', 'Error', 3);
    return;
  }

  const nombre = participante.toString().trim();

  let motivo = '';

  // Solo para DESERCIONES pedir motivo con diálogo
  if (tipoFinal === 'deserciones') {
    try {
      Logger.log('📋 Solicitando motivo de deserción para: ' + nombre);
      motivo = mostrarDialogoMotivoDesercion(nombre, terapeuta, numSesion);
      Logger.log('✅ Motivo recibido: ' + motivo);

      if (!motivo || motivo === '') {
        // Usuario canceló o no seleccionó nada
        Logger.log('⚠️ Usuario canceló o no seleccionó motivo');
        sheetOrigen.getRange(fila, 7).setValue('En proceso');
        ss.toast('❌ Deserción cancelada\n\nNo se seleccionó motivo', 'Cancelado', 3);
        return;
      }
    } catch (error) {
      // Error al mostrar diálogo - probablemente el trigger no está instalado
      Logger.log('❌ Error mostrando diálogo: ' + error.message);
      Logger.log('   Stack: ' + error.stack);
      sheetOrigen.getRange(fila, 7).setValue('En proceso');

      ss.toast(
        '⚠️ ERROR: No se puede mostrar el diálogo\n\n' +
        'Para que funcione el diálogo de deserciones, debe:\n' +
        '1. Ir al menú: 🏥 Apoyo Emocional\n' +
        '2. Hacer clic en: ✏️ Instalar Trigger onEdit\n' +
        '3. Autorizar los permisos\n\n' +
        'Después de instalar el trigger, vuelva a seleccionar "deserciones".\n\n' +
        'Error: ' + error.message,
        'Trigger No Instalado',
        15
      );
      return;
    }
  } else if (tipoFinal === 'Proceso culminado') {
    // Para proceso culminado, NO pedir motivo - enviar directo
    motivo = 'Proceso terapéutico completado';
    Logger.log('✅ Proceso culminado - motivo automático');
  }

  Logger.log('💾 Guardando motivo en columna H: ' + tipoFinal + ': ' + motivo);
  // Guardar motivo en columna H
  sheetOrigen.getRange(fila, 8).setValue(tipoFinal + ': ' + motivo);

  Logger.log('📧 Enviando email a la directora');
  // Enviar email a la directora
  const emailEnviado = enviarEmailFinalizacion(nombre, terapeuta, tipoFinal, motivo, numSesion);

  if (!emailEnviado) {
    Logger.log('⚠️ Email no enviado, pero continuando con el proceso');
    ss.toast(
      '⚠️ ADVERTENCIA\n\n' +
      'El caso se procesó correctamente PERO el email\n' +
      'NO se pudo enviar.\n\n' +
      'Verifica la configuración de email:\n' +
      'Menú → 📧 Configurar Email Director',
      'Email No Enviado',
      6
    );
  }

  // Copiar a la hoja correspondiente
  let ok = false;
  if (tipoFinal === 'Proceso culminado') {
    Logger.log('📂 Copiando a Procesos Culminados...');
    ok = copiarACulminados(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipoFinal === 'deserciones') {
    Logger.log('📂 Copiando a Deserciones...');
    Logger.log('   Participante: ' + nombre);
    Logger.log('   Terapeuta: ' + terapeuta);
    Logger.log('   Motivo: ' + motivo);
    ok = copiarADeserciones(nombre, terapeuta, creemosId, numSesion, motivo);
  }

  if (ok) {
    Logger.log('✅ Copia exitosa');

    if (tipoFinal === 'deserciones') {
      // Para deserciones: marcar en rojo, mostrar mensaje, y ELIMINAR fila
      sheetOrigen.getRange(fila, 1, 1, 10).setBackground('#f8d7da');
      SpreadsheetApp.flush(); // Forzar actualización visual

      ss.toast(
        '✅ DESERCIÓN PROCESADA\n\n' +
        'Participante: ' + nombre + '\n' +
        'Motivo: ' + motivo + '\n' +
        'Sesiones: ' + numSesion + '\n\n' +
        'Enviado a hoja Deserciones\n' +
        'La fila se eliminará de Terapias',
        'Deserción Registrada',
        5
      );

      // ELIMINAR la fila de Terapias después de copiarla
      Logger.log('🗑️ Eliminando fila ' + fila + ' de Terapias');
      sheetOrigen.deleteRow(fila);
      Logger.log('✅ Fila eliminada exitosamente');

    } else if (tipoFinal === 'Proceso culminado') {
      // Para procesos culminados: solo marcar en verde (NO eliminar)
      sheetOrigen.getRange(fila, 1, 1, 10).setBackground('#d4edda');
      ss.toast('✅ ' + nombre + '\n' + tipoFinal + '\nSesiones: ' + numSesion, 'Procesado', 4);
    }
  } else {
    Logger.log('❌ Error al copiar a la hoja');
    ss.toast('❌ Error al copiar a la hoja de ' + tipoFinal, 'Error', 5);
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
      '4. En la columna "Asistió a Cita" (columna N), selecciona:\n' +
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

/**
 * Configura el correo de prueba para alertas de Bienestar
 */
function configurarCorreoPruebaBienestar() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();

  const emailActual = props.getProperty('EMAIL_PRUEBA_BIENESTAR') || 'No configurado';

  const respuesta = ui.prompt(
    '📧 Configurar Correo de Prueba - Bienestar',
    '🧪 MODO DE PRUEBA\n\n' +
    'Este correo recibirá las alertas de protocolo de suicidio\n' +
    'durante las pruebas del sistema.\n\n' +
    'Email actual: ' + emailActual + '\n\n' +
    'Ingresa tu correo de prueba:',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  const email = respuesta.getResponseText().trim();

  if (!email || !email.includes('@') || !email.includes('.')) {
    ui.alert(
      '❌ Email Inválido',
      'Por favor ingresa un email válido.\n\nEjemplo: tumail@ejemplo.com',
      ui.ButtonSet.OK
    );
    return;
  }

  // Guardar en propiedades
  props.setProperty('EMAIL_PRUEBA_BIENESTAR', email);

  // Activar modo de prueba
  props.setProperty('MODO_PRUEBA_BIENESTAR', 'true');

  ui.alert(
    '✅ Correo de Prueba Configurado',
    '📧 Email: ' + email + '\n\n' +
    '🧪 MODO DE PRUEBA ACTIVADO\n\n' +
    'Ahora las alertas de protocolo de suicidio se enviarán\n' +
    'SOLO a este correo (no a todos los terapeutas).\n\n' +
    '💡 Para desactivar el modo de prueba y enviar a todos\n' +
    'los terapeutas, simplemente deja el correo vacío.',
    ui.ButtonSet.OK
  );

  Logger.log('✅ Correo de prueba configurado: ' + email);
}

/**
 * Activa el modo producción (desactiva modo de prueba)
 * Las alertas se enviarán a TODOS los terapeutas
 */
function activarModoProduccionBienestar() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();

  const modoPruebaActual = props.getProperty('MODO_PRUEBA_BIENESTAR') === 'true';

  if (!modoPruebaActual) {
    ui.alert(
      'ℹ️ Ya está en Modo Producción',
      'El sistema ya está configurado para enviar alertas\n' +
      'a TODOS los terapeutas.\n\n' +
      'No es necesario hacer nada.',
      ui.ButtonSet.OK
    );
    return;
  }

  const confirmacion = ui.alert(
    '🚀 Activar Modo Producción',
    '⚠️ ATENCIÓN\n\n' +
    'Estás a punto de DESACTIVAR el modo de prueba.\n\n' +
    'Después de esto:\n' +
    '✅ Las alertas de protocolo de suicidio se enviarán a:\n' +
    '   • Todos los terapeutas (Gerber, Melissa, Diana, Karina)\n' +
    '   • Director/a\n\n' +
    '❌ YA NO se enviarán solo a tu correo de prueba\n\n' +
    '¿Estás seguro de continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    return;
  }

  // Eliminar propiedades de modo de prueba
  props.deleteProperty('MODO_PRUEBA_BIENESTAR');
  props.deleteProperty('EMAIL_PRUEBA_BIENESTAR');

  ui.alert(
    '✅ Modo Producción Activado',
    '🚀 MODO PRODUCCIÓN ACTIVADO\n\n' +
    'Ahora las alertas se enviarán a:\n' +
    '• Todos los terapeutas configurados\n' +
    '• Director/a\n\n' +
    '💡 Si necesitas volver al modo de prueba,\n' +
    'usa la opción "Configurar Correo de Prueba"',
    ui.ButtonSet.OK
  );

  Logger.log('✅ Modo producción activado - alertas irán a todos los terapeutas');
}

/**
 * Muestra el estado actual del sistema de correos
 */
function verEstadoCorreosBienestar() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();

  const modoPrueba = props.getProperty('MODO_PRUEBA_BIENESTAR') === 'true';
  const emailPrueba = props.getProperty('EMAIL_PRUEBA_BIENESTAR');

  let mensaje = '';
  let titulo = '';

  if (modoPrueba && emailPrueba) {
    titulo = '🧪 Modo de Prueba ACTIVO';
    mensaje =
      '🧪 MODO DE PRUEBA\n\n' +
      'Estado: ACTIVO ✅\n' +
      'Correo de prueba: ' + emailPrueba + '\n\n' +
      'Las alertas de protocolo de suicidio se están enviando\n' +
      'SOLO a este correo (no a los terapeutas).\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '💡 Para enviar alertas a todos los terapeutas:\n' +
      '   🏥 Bienestar → 🚀 Activar Modo Producción';
  } else {
    titulo = '🚀 Modo Producción ACTIVO';
    mensaje =
      '🚀 MODO PRODUCCIÓN\n\n' +
      'Estado: ACTIVO ✅\n\n' +
      'Las alertas de protocolo de suicidio se envían a:\n' +
      '• Gerber\n' +
      '• Melissa\n' +
      '• Diana\n' +
      '• Karina\n' +
      '• Director/a\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '💡 Para hacer pruebas sin molestar a los terapeutas:\n' +
      '   🏥 Bienestar → 📧 Configurar Correo de Prueba';
  }

  ui.alert(titulo, mensaje, ui.ButtonSet.OK);

  Logger.log('Estado actual: ' + (modoPrueba ? 'MODO PRUEBA' : 'MODO PRODUCCIÓN'));
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

    // VERIFICAR SI YA EXISTE para evitar duplicados
    const datos = sheet.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      const nombreExistente = datos[i][1]; // Columna B: Participante
      if (nombreExistente && nombreExistente.toString().trim() === participante.toString().trim()) {
        Logger.log('⚠️ Participante ya existe en Procesos Culminados: ' + participante);
        ss.toast(
          '⚠️ DUPLICADO DETECTADO\n\n' +
          participante + ' ya está en Procesos Culminados.\n\n' +
          'No se agregará nuevamente.',
          'Ya Existe',
          4
        );
        return false; // No agregar duplicado
      }
    }

    // Buscar la primera fila vacía
    let nuevaFila = 2;
    const maxFilas = 200;

    for (let i = 2; i <= maxFilas; i++) {
      const participanteExistente = sheet.getRange(i, 2).getValue(); // Columna B: Participante
      if (!participanteExistente || participanteExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

    const datosNuevos = [new Date(), participante, terapeuta, creemosId || '', parseInt(sesiones) || 1, motivo];

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datosNuevos]);
    Logger.log('✅ Agregado a Procesos Culminados: ' + participante + ' en fila ' + nuevaFila);
    return true;
  } catch (error) {
    Logger.log('❌ Error culminados: ' + error.message);
    return false;
  }
}

function copiarADeserciones(participante, terapeuta, creemosId, sesiones, motivo) {
  try {
    Logger.log('🔍 copiarADeserciones - Inicio');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Deserciones');

    if (!sheet) {
      Logger.log('❌ Hoja "Deserciones" no encontrada');
      ss.toast('❌ Error: Hoja "Deserciones" no existe', 'Error', 5);
      return false;
    }

    Logger.log('✅ Hoja Deserciones encontrada');

    // VERIFICAR SI YA EXISTE para evitar duplicados
    const datos = sheet.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      const nombreExistente = datos[i][1]; // Columna B: Participante
      if (nombreExistente && nombreExistente.toString().trim() === participante.toString().trim()) {
        Logger.log('⚠️ Participante ya existe en Deserciones: ' + participante);
        ss.toast(
          '⚠️ DUPLICADO DETECTADO\n\n' +
          participante + ' ya está en Deserciones.\n\n' +
          'No se agregará nuevamente.',
          'Ya Existe',
          4
        );
        return false; // No agregar duplicado
      }
    }

    // Buscar la primera fila vacía
    let nuevaFila = 2;
    const maxFilas = 200;

    for (let i = 2; i <= maxFilas; i++) {
      const participanteExistente = sheet.getRange(i, 2).getValue(); // Columna B: Participante
      if (!participanteExistente || participanteExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

    Logger.log('📍 Nueva fila para deserción: ' + nuevaFila);

    const datosNuevos = [new Date(), participante, terapeuta, creemosId || '', parseInt(sesiones) || 1, motivo];

    Logger.log('📝 Datos a guardar:');
    Logger.log('   Fecha: ' + new Date());
    Logger.log('   Participante: ' + participante);
    Logger.log('   Terapeuta: ' + terapeuta);
    Logger.log('   Creamos ID: ' + (creemosId || ''));
    Logger.log('   Sesiones: ' + (parseInt(sesiones) || 1));
    Logger.log('   Motivo: ' + motivo);

    sheet.getRange(nuevaFila, 1, 1, 6).setValues([datosNuevos]);
    Logger.log('✅ Datos guardados en fila ' + nuevaFila + ' de hoja Deserciones');

    return true;
  } catch (error) {
    Logger.log('❌ Error en copiarADeserciones: ' + error.message);
    Logger.log('   Stack: ' + error.stack);
    ss.toast('❌ Error al copiar a Deserciones: ' + error.message, 'Error', 5);
    return false;
  }
}

function copiarAGestion(participante, terapeuta, creemosId, tipo, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Intervención de casos');

    // Buscar la primera fila vacía
    let nuevaFila = 2;
    const maxFilas = 200;

    for (let i = 2; i <= maxFilas; i++) {
      const participanteExistente = sheet.getRange(i, 2).getValue(); // Columna B: Participante
      if (!participanteExistente || participanteExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

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

    // 1. Actualizar fecha y hora solamente
    reporte.getRange('B2').setValue(new Date());

    // 2. NO sobrescribir las fórmulas de casos activos por terapeuta
    // Las celdas B14-B17 y C14-C17 deben mantener sus fórmulas
    // NO tocar esas celdas aquí

    // 3. Forzar recalculo de todas las fórmulas del reporte
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
      '</ol>' +
      '</div>' +
      '<p style="text-align: center; margin: 20px 0;">' +
      '<a href="' + urlHoja + '" class="button">📊 Abrir Hoja de Cálculo</a>' +
      '</p>' +
      '<p><strong>Sistema:</strong> ' + nombreHoja + '</p>' +
      '<p style="color: #666; font-size: 14px;">💡 <strong>Nota:</strong> Al guardar el reporte, el sistema actualizará automáticamente el conteo de sesiones para el nuevo mes. No se borrarán datos.</p>' +
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

/**
 * Instala el trigger onEdit como instalable para permitir diálogos HTML
 */
function instalarTriggerOnEdit() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Eliminar triggers onEdit existentes
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'alEditar' &&
          trigger.getEventType() === ScriptApp.EventType.ON_EDIT) {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger onEdit instalable
    ScriptApp.newTrigger('alEditar')
      .forSpreadsheet(ss)
      .onEdit()
      .create();

    ss.toast(
      '✅ Trigger onEdit instalado correctamente\n\n' +
      'Ahora los diálogos de motivo funcionarán correctamente cuando:\n' +
      '- Seleccione "Proceso culminado" en Estado de Terapias\n' +
      '- Seleccione "deserciones" en Estado de Terapias',
      'Trigger onEdit Instalado',
      6
    );

    Logger.log('✅ Trigger onEdit instalado correctamente');
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ Error: ' + error.message + '\n\n' +
      'Es posible que necesite autorizar los permisos del script.',
      'Error',
      5
    );
    Logger.log('❌ Error instalando trigger onEdit: ' + error.message);
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

    // Referencias correctas según el nuevo diseño del reporte
    const nuevosIngresos = reporte.getRange('C5').getValue(); // Nuevos ingresos este mes
    const culminados = reporte.getRange('C21').getValue(); // Culminados este mes
    const deserciones = reporte.getRange('C24').getValue(); // Deserciones este mes
    const gestion = reporte.getRange('B27').getValue(); // Total en intervención
    const activos = reporte.getRange('B18').getValue(); // Total casos activos
    const tasaExito = reporte.getRange('B31').getValue(); // Tasa de éxito

    // Sesiones por terapeuta (columna C de cada fila)
    const sesionesGerber = reporte.getRange('C14').getValue();
    const sesionesMelissa = reporte.getRange('C15').getValue();
    const sesionesDiana = reporte.getRange('C16').getValue();
    const sesionesKarina = reporte.getRange('C17').getValue();

    // Activos por terapeuta (columna B de cada fila)
    const activosGerber = reporte.getRange('B14').getValue();
    const activosMelissa = reporte.getRange('B15').getValue();
    const activosDiana = reporte.getRange('B16').getValue();
    const activosKarina = reporte.getRange('B17').getValue();

    const derivacionesExternas = reporte.getRange('B11').getValue(); // Derivaciones institucionales

    const nuevaFila = mensuales.getLastRow() + 1;
    const datos = [
      mesActual,
      nuevosIngresos,
      culminados,
      deserciones,
      gestion,
      activos,
      tasaExito,
      sesionesGerber,
      sesionesMelissa,
      sesionesDiana,
      sesionesKarina,
      activosGerber,
      activosMelissa,
      activosDiana,
      activosKarina,
      derivacionesExternas,
      new Date()
    ];

    mensuales.getRange(nuevaFila, 1, 1, 17).setValues([datos]);

    // Actualizar "Sesiones Mes Anterior" para el próximo mes
    // Copiar el valor actual de "No. Sesión" a "Sesiones Mes Anterior"
    actualizarSesionesMesAnterior();

    ss.toast(
      '✅ REPORTE MENSUAL GUARDADO\n\n' +
      'Mes: ' + mesActual + '\n' +
      'Guardado en fila: ' + nuevaFila + '\n\n' +
      'Las sesiones del proximo mes se contaran desde cero.',
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

/**
 * Actualiza "Sesiones Mes Anterior" para empezar el conteo del nuevo mes
 * NO borra ningún dato, solo actualiza la columna de tracking
 */
function actualizarSesionesMesAnterior() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Actualizar "Sesiones Mes Anterior" en Terapias
    // Copiar el valor actual de "No. Sesión" (columna F) a "Sesiones Mes Anterior" (columna I)
    const terapias = ss.getSheetByName('Terapias');
    if (terapias && terapias.getLastRow() > 1) {
      const ultimaFila = terapias.getLastRow();

      // Recorrer cada fila y copiar No. Sesión a Sesiones Mes Anterior
      for (let fila = 2; fila <= ultimaFila; fila++) {
        const participante = terapias.getRange(fila, 3).getValue(); // Columna C: Participante
        const numSesion = terapias.getRange(fila, 6).getValue(); // Columna F: No. Sesión

        // Solo actualizar si hay un participante (fila tiene datos)
        if (participante && participante.toString().trim() !== '') {
          // Copiar el número actual de sesiones a "Sesiones Mes Anterior"
          terapias.getRange(fila, 9).setValue(numSesion || 0); // Columna I
        }
      }

      Logger.log('✅ Terapias: Sesiones del mes anterior actualizadas');
    }

    // Actualizar reportes
    actualizarReportes();

    Logger.log('✅ Sesiones mes anterior actualizadas para nuevo mes');
  } catch (error) {
    Logger.log('❌ Error actualizando sesiones mes anterior: ' + error.toString());
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
    ['Ana Martínez', 'AM001', 'Mujer', '26 a 30', 'Ansiedad', 'Primera consulta'],
    ['Juan Pérez', 'JP002', 'Hombre', '31 a 40', 'Depresión', 'Urgente'],
    ['Laura Gómez', 'LG003', 'Mujer', '18 a 25', 'Estrés', 'Estudiante']
  ];

  // Agregar datos en filas 2, 3 y 4 (columnas C-H: Nombre, Creamos ID, Género, Edad, Malestar, Teléfono)
  espera.getRange(2, 3, datosPrueba.length, 6).setValues(datosPrueba);

  ss.toast(
    '✅ 3 DATOS DE PRUEBA CREADOS\n\n' +
    'Ubicación: Lista de Espera (filas 2-4)\n\n' +
    'CÓMO PROBAR EL SISTEMA:\n' +
    '1. En columna N (Terapeuta Asignado) seleccione un terapeuta\n' +
    '2. En columna N (Asistió a Cita) seleccione Vino o No vino\n' +
    '3. Si Vino + tiene terapeuta → Nuevos Ingresos + Terapias\n' +
    '4. Si No vino → Personas no asistidas\n\n' +
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
    '- Reportes Mensuales\n' +
    '- Formulario de Bienestar (2026)',
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
      espera.getRange(2, 1, espera.getLastRow() - 1, 14).clearContent();
      espera.getRange(2, 1, espera.getLastRow() - 1, 14).setBackground(null);
      // Restaurar fórmulas
      for (let i = 2; i <= 100; i++) {
        espera.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
        espera.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
      }
    }

    // Limpiar Nuevos Ingresos (desde fila 2)
    const nuevos = ss.getSheetByName('Nuevos Ingresos');
    if (nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 7).clearContent();
      nuevos.getRange(2, 1, nuevos.getLastRow() - 1, 7).setBackground(null);
      // NO restaurar fórmulas - los valores se agregan directamente desde el código
    }

    // Limpiar Terapias (desde fila 2)
    const terapias = ss.getSheetByName('Terapias');
    if (terapias.getLastRow() > 1) {
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 10).clearContent();
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 10).setBackground(null);
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

    // Limpiar Formulario de Bienestar (desde fila 2)
    const bienestar = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (bienestar && bienestar.getLastRow() > 1) {
      bienestar.getRange(2, 1, bienestar.getLastRow() - 1, 7).clearContent();
      bienestar.getRange(2, 1, bienestar.getLastRow() - 1, 7).setBackground(null);
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

/**
 * Repara la hoja de Terapias: columna Fecha y validaciones
 * Soluciona problemas cuando se agregó la columna Fecha
 */
function repararTerapias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '⚡ Reparar Hoja de Terapias',
    '¿Deseas reparar la hoja de Terapias?\n\n' +
    'Esto hará:\n' +
    '• INSERTAR columna Fecha (B) si no existe\n' +
    '• Mover datos una columna a la derecha\n' +
    '• Configurar validaciones correctas\n\n' +
    '⚠️ IMPORTANTE: Se va a modificar la estructura',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    return;
  }

  try {
    ss.toast('Reparando hoja de Terapias...', 'Reparando', 3);

    const terapias = ss.getSheetByName('Terapias');
    if (!terapias) {
      ui.alert('❌ Error', 'No se encontró la hoja "Terapias"', ui.ButtonSet.OK);
      return;
    }

    // 1. Verificar si ya tiene la columna Fecha
    const headerB = terapias.getRange(1, 2).getValue();
    if (headerB && headerB.toString() === 'Fecha') {
      Logger.log('✅ Columna Fecha ya existe');
    } else {
      // NO tiene columna Fecha, hay que insertarla
      ss.toast('Insertando columna Fecha...', 'Reparando', 2);

      // Insertar columna después de A (Terapeuta)
      terapias.insertColumnAfter(1);

      // Renombrar encabezado
      terapias.getRange(1, 2).setValue('Fecha')
        .setBackground('#2e7d32')
        .setFontColor('white')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      // Ajustar ancho
      terapias.setColumnWidth(2, 110);

      Logger.log('✅ Columna Fecha insertada');
    }

    // 2. Limpiar validaciones
    terapias.getRange('A1:Z200').clearDataValidations();
    Logger.log('✅ Validaciones limpiadas');

    // 3. Agregar fórmulas de Fecha
    for (let i = 2; i <= 200; i++) {
      terapias.getRange('B' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
    }
    Logger.log('✅ Fórmulas de Fecha agregadas');

    // 4. Proteger columna Fecha
    try {
      terapias.getRange('B2:B200').protect().setWarningOnly(true);
      Logger.log('✅ Columna Fecha protegida');
    } catch (e) {
      Logger.log('⚠️ No se pudo proteger: ' + e.message);
    }

    // 5. Aplicar validaciones
    // Terapeuta (A)
    const terapeutaRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
      .setAllowInvalid(false)
      .build();
    terapias.getRange('A2:A200').setDataValidation(terapeutaRule);

    // Género (E)
    const generoRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
      .setAllowInvalid(false)
      .build();
    terapias.getRange('E2:E200').setDataValidation(generoRule);

    // No. Sesión (F)
    const sesiones = [];
    for (let i = 1; i <= 20; i++) {
      sesiones.push(i.toString());
    }
    const sesionRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(sesiones)
      .setAllowInvalid(false)
      .build();
    terapias.getRange('F2:F200').setDataValidation(sesionRule);

    // Estado (G)
    const estadoRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['En proceso', 'Proceso culminado', 'deserciones'])
      .setAllowInvalid(false)
      .build();
    terapias.getRange('G2:G200').setDataValidation(estadoRule);

    Logger.log('✅ Validaciones aplicadas');

    // 6. Inicializar columnas numéricas
    for (let i = 2; i <= 200; i++) {
      const participante = terapias.getRange(i, 3).getValue();
      if (participante && participante.toString().trim() !== '') {
        if (!terapias.getRange(i, 9).getValue()) {
          terapias.getRange(i, 9).setValue(0);
        }
        if (!terapias.getRange(i, 10).getValue()) {
          terapias.getRange(i, 10).setValue(0);
        }
      }
    }

    ui.alert(
      '✅ REPARACIÓN COMPLETA',
      'Estructura actualizada:\n' +
      '• A: Terapeuta (desplegable)\n' +
      '• B: Fecha (automática) ← NUEVA\n' +
      '• C: Participante\n' +
      '• D: Creamos ID\n' +
      '• E: Género (desplegable)\n' +
      '• F: No. Sesión (desplegable 1-20)\n' +
      '• G: Estado (desplegable)\n' +
      '• H: Motivo Finalización\n' +
      '• I: Sesiones Mes Anterior\n' +
      '• J: Inasistencias\n\n' +
      'Recarga la página (F5) para ver cambios.',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Reparación completada');

  } catch (error) {
    ui.alert('❌ Error', 'Error: ' + error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error: ' + error.message);
  }
}

/**
 * Repara las fórmulas de fecha y número en Lista de Espera
 * Útil cuando las fórmulas no están funcionando correctamente
 */
function repararFormulasListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('Reparando formulas de Lista de Espera...', 'Reparando', 3);

    const sheet = ss.getSheetByName('Lista de Espera');
    if (!sheet) {
      ss.toast('Error: No se encuentra la hoja "Lista de Espera"', 'Error', 5);
      return;
    }

    // Crear fórmulas mejoradas para fecha y número
    const formulas = [];
    for (let i = 2; i <= 1000; i++) {
      formulas.push([
        '=IF(C' + i + '<>"",TODAY(),"")',  // Columna A: Fecha
        '=IF(C' + i + '<>"",COUNTA($C$2:C' + i + '),"")'  // Columna B: Número secuencial
      ]);
    }

    // Aplicar fórmulas
    sheet.getRange('A2:B1000').setFormulas(formulas);

    // Proteger columnas para que no se editen manualmente
    try {
      // Eliminar protecciones existentes primero
      const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
      protections.forEach(protection => {
        const range = protection.getRange();
        if (range.getA1Notation().startsWith('A2:A') || range.getA1Notation().startsWith('B2:B')) {
          protection.remove();
        }
      });

      // Aplicar nuevas protecciones
      sheet.getRange('A2:A1000').protect().setWarningOnly(true);
      sheet.getRange('B2:B1000').protect().setWarningOnly(true);
    } catch (protectionError) {
      Logger.log('Advertencia protegiendo rangos: ' + protectionError.message);
    }

    ss.toast(
      'FORMULAS REPARADAS\n\n' +
      'Las formulas de fecha y numero han sido reparadas.\n' +
      'Ahora funcionaran correctamente cuando agregues nombres.\n\n' +
      'Fecha: Se llena automaticamente con la fecha actual\n' +
      'Numero: Se numera secuencialmente (1, 2, 3...)\n\n' +
      'Cobertura: Hasta 1000 filas',
      'Reparacion Exitosa',
      8
    );

  } catch (error) {
    ss.toast('Error: ' + error.message, 'Error', 5);
    Logger.log('Error reparando formulas: ' + error.message);
  }
}

/**
 * Actualiza las fórmulas del reporte existente con las correctas (con IFERROR)
 */
function actualizarFormulasReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const reporte = ss.getSheetByName('Reporte');

    if (!reporte) {
      ss.toast('❌ No se encontró la hoja Reporte', 'Error', 3);
      return;
    }

    // Actualizar TODAS las fórmulas con IFERROR
    // Fila 5: Nuevos Ingresos
    reporte.getRange('B5').setFormula('=IFERROR(COUNTA(\'Nuevos Ingresos\'!C:C)-1,0)');
    reporte.getRange('C5').setFormula('=IFERROR(COUNTIFS(\'Nuevos Ingresos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Nuevos Ingresos\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 8: Personas no asistidas
    reporte.getRange('B8').setFormula('=IFERROR(COUNTA(\'Personas no asistidas\'!B:B)-1,0)');
    reporte.getRange('C8').setFormula('=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 11: Derivaciones institucionales
    reporte.getRange('B11').setFormula('=IFERROR(COUNTA(\'Lista de Espera\'!K:K)-1,0)');

    // Fila 14: Formulario de Bienestar
    reporte.getRange('B14').setFormula('=IFERROR(COUNTA(\'C_03_Formulario de Bienestar (2026)\'!A:A)-1,0)');
    reporte.getRange('C14').setFormula('=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Sí")+COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Si"),0)');

    // Filas 17-20: Casos activos por terapeuta (columna B: casos activos)
    reporte.getRange('B17').setFormula('=IFERROR(COUNTIFS(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso"),0)');
    reporte.getRange('B18').setFormula('=IFERROR(COUNTIFS(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso"),0)');
    reporte.getRange('B19').setFormula('=IFERROR(COUNTIFS(Terapias!A:A,"Diana",Terapias!G:G,"En proceso"),0)');
    reporte.getRange('B20').setFormula('=IFERROR(COUNTIFS(Terapias!A:A,"Karina",Terapias!G:G,"En proceso"),0)');

    // Filas 17-20: Sesiones mes (columna C) - FILTRADO POR "En proceso"
    reporte.getRange('C17').setFormula('=IFERROR(SUMPRODUCT((Terapias!A2:A500="Gerber")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)');
    reporte.getRange('C18').setFormula('=IFERROR(SUMPRODUCT((Terapias!A2:A500="Melissa")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)');
    reporte.getRange('C19').setFormula('=IFERROR(SUMPRODUCT((Terapias!A2:A500="Diana")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)');
    reporte.getRange('C20').setFormula('=IFERROR(SUMPRODUCT((Terapias!A2:A500="Karina")*(Terapias!G2:G500="En proceso")*(Terapias!F2:F500-Terapias!I2:I500)),0)');

    // Fila 21: TOTAL casos activos y sesiones
    reporte.getRange('B21').setFormula('=IFERROR(SUM(B17:B20),0)');
    reporte.getRange('C21').setFormula('=IFERROR(SUM(C17:C20),0)');

    // Fila 24: Procesos culminados
    reporte.getRange('B24').setFormula('=IFERROR(COUNTA(\'Procesos Culminados\'!A:A)-1,0)');
    reporte.getRange('C24').setFormula('=IFERROR(COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
    reporte.getRange('D24').setFormula('=IFERROR(IF(B24>0,ROUND(AVERAGE(\'Procesos Culminados\'!E2:E500),1),0),0)');

    // Fila 27: Deserciones
    reporte.getRange('B27').setFormula('=IFERROR(COUNTA(Deserciones!A:A)-1,0)');
    reporte.getRange('C27').setFormula('=IFERROR(COUNTIFS(Deserciones!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Deserciones!A:A,"<="&EOMONTH(TODAY(),0)),0)');
    reporte.getRange('D27').setFormula('=IFERROR(IF((B24+B27)>0,ROUND(B27/(B24+B27)*100,1)&"%","0%"),"0%")');

    // Fila 30: Intervención de casos
    reporte.getRange('B30').setFormula('=IFERROR(COUNTA(\'Intervención de casos\'!A:A)-1,0)');

    // Fila 33: Total casos procesados
    reporte.getRange('B33').setFormula('=IFERROR(B24+B27+B30,0)');

    // Fila 34: Tasa de éxito
    reporte.getRange('B34').setFormula('=IFERROR(IF(B33>0,ROUND(B24/B33*100,1)&"%","0%"),"0%")');

    // Fila 35: Casos activos totales
    reporte.getRange('B35').setFormula('=IFERROR(B21,0)');

    ss.toast(
      '✅ FORMULAS ACTUALIZADAS\n\n' +
      'Todas las formulas del reporte han sido actualizadas\n' +
      'con proteccion IFERROR y filtros correctos.\n\n' +
      'Ahora deberia mostrar valores correctos.',
      'Reporte Actualizado',
      5
    );

    Logger.log('✅ Fórmulas del reporte actualizadas correctamente');

  } catch (error) {
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    Logger.log('❌ Error actualizando fórmulas del reporte: ' + error.message);
  }
}

/**
 * Diagnóstico del reporte - Muestra qué hay en Terapias y por qué no funciona
 */
function diagnosticarReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    const terapias = ss.getSheetByName('Terapias');
    const reporte = ss.getSheetByName('Reporte');

    if (!terapias) {
      ui.alert('❌ Error', 'No se encontró la hoja Terapias', ui.ButtonSet.OK);
      return;
    }

    if (!reporte) {
      ui.alert('❌ Error', 'No se encontró la hoja Reporte', ui.ButtonSet.OK);
      return;
    }

    // Obtener datos de Terapias
    const datos = terapias.getDataRange().getValues();
    let totalRegistros = 0;
    let casosGerber = 0;
    let casosMelissa = 0;
    let casosDiana = 0;
    let casosKarina = 0;
    let terapeutasEncontrados = [];
    let estadosEncontrados = [];

    for (let i = 1; i < datos.length; i++) {
      const terapeuta = datos[i][0]; // Columna A
      const participante = datos[i][1]; // Columna B
      const estado = datos[i][5]; // Columna F

      if (participante && participante.toString().trim() !== '') {
        totalRegistros++;

        if (terapeuta) terapeutasEncontrados.push('"' + terapeuta + '"');
        if (estado) estadosEncontrados.push('"' + estado + '"');

        if (terapeuta === 'Gerber' && estado === 'En proceso') casosGerber++;
        if (terapeuta === 'Melissa' && estado === 'En proceso') casosMelissa++;
        if (terapeuta === 'Diana' && estado === 'En proceso') casosDiana++;
        if (terapeuta === 'Karina' && estado === 'En proceso') casosKarina++;
      }
    }

    // Ver qué hay en las celdas del reporte
    const celdasReporte = {
      B14: reporte.getRange('B14').getValue(),
      C14: reporte.getRange('C14').getValue(),
      B14_formula: reporte.getRange('B14').getFormula()
    };

    const mensaje =
      '═══ DIAGNÓSTICO DEL REPORTE ═══\n\n' +
      '📊 DATOS EN TERAPIAS:\n' +
      'Total registros: ' + totalRegistros + '\n\n' +
      'Casos "En proceso" por terapeuta:\n' +
      '  • Gerber: ' + casosGerber + '\n' +
      '  • Melissa: ' + casosMelissa + '\n' +
      '  • Diana: ' + casosDiana + '\n' +
      '  • Karina: ' + casosKarina + '\n\n' +
      '🔍 TERAPEUTAS ENCONTRADOS (primeros 5):\n' +
      terapeutasEncontrados.slice(0, 5).join(', ') + '\n\n' +
      '🔍 ESTADOS ENCONTRADOS (únicos):\n' +
      [...new Set(estadosEncontrados)].slice(0, 5).join(', ') + '\n\n' +
      '📋 CELDA B14 (Casos Gerber):\n' +
      'Valor: ' + celdasReporte.B14 + '\n' +
      'Fórmula: ' + (celdasReporte.B14_formula || 'SIN FÓRMULA') + '\n\n' +
      '═══════════════════════════\n' +
      'Si ves "No configurado" es porque\n' +
      'la celda tiene TEXTO en lugar de FÓRMULA.';

    ui.alert('Diagnóstico del Reporte', mensaje, ui.ButtonSet.OK);

    Logger.log('Diagnóstico completado');
    Logger.log('Total registros: ' + totalRegistros);
    Logger.log('Gerber: ' + casosGerber);
    Logger.log('Terapeutas: ' + [...new Set(terapeutasEncontrados)].join(', '));
    Logger.log('Estados: ' + [...new Set(estadosEncontrados)].join(', '));

  } catch (error) {
    ui.alert('❌ Error', error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error en diagnóstico: ' + error.message);
  }
}

/**
 * Compacta los datos de Lista de Espera eliminando filas vacías
 * Mueve todos los registros hacia arriba para que queden consecutivos desde la fila 2
 */
function compactarListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('Compactando Lista de Espera...', 'Procesando', 3);

    const sheet = ss.getSheetByName('Lista de Espera');
    if (!sheet) {
      ss.toast('Error: No se encuentra la hoja "Lista de Espera"', 'Error', 5);
      return;
    }

    // Leer todos los datos (columnas C a N = 12 columnas, desde C hasta N)
    const ultimaFila = 1000; // Leer hasta fila 1000
    const datos = sheet.getRange(2, 3, ultimaFila - 1, 12).getValues(); // C2:N1000

    // Filtrar solo las filas que tienen nombre (columna C no vacía)
    const datosCompactados = [];
    datos.forEach(fila => {
      const nombre = fila[0]; // Columna C (índice 0 en el array)
      if (nombre && nombre.toString().trim() !== '') {
        datosCompactados.push(fila);
      }
    });

    if (datosCompactados.length === 0) {
      ss.toast('No hay datos para compactar', 'Lista Vacía', 3);
      return;
    }

    // Limpiar todo el rango de datos (columnas C a N)
    sheet.getRange(2, 3, ultimaFila - 1, 12).clearContent();
    sheet.getRange(2, 3, ultimaFila - 1, 12).setBackground(null);

    // Escribir los datos compactados desde la fila 2
    sheet.getRange(2, 3, datosCompactados.length, 12).setValues(datosCompactados);

    // Las columnas A (Fecha) y B (Número) se llenarán automáticamente por las fórmulas

    ss.toast(
      'COMPACTACION EXITOSA\n\n' +
      'Registros encontrados: ' + datosCompactados.length + '\n' +
      'Los datos ahora estan consecutivos desde la fila 2.\n\n' +
      'Las fechas y numeros se actualizaran automaticamente.',
      'Compactacion Completa',
      8
    );

    Logger.log('✅ Lista de Espera compactada: ' + datosCompactados.length + ' registros');

  } catch (error) {
    ss.toast('Error: ' + error.message, 'Error', 5);
    Logger.log('Error compactando Lista de Espera: ' + error.message);
  }
}
// =====================================================================
// SISTEMA DE FORMULARIO DE BIENESTAR - KOBOTOOLBOX
// =====================================================================



/**
 * Importa datos automáticamente desde KoboToolbox
 * IMPORTA TODAS LAS COLUMNAS TAL COMO VIENEN DEL CSV
 */
function importarDatosAutomatico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  ss.toast('Descargando datos de KoboToolbox...', 'Importando', -1);

  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';

    Logger.log('🔄 Descargando CSV desde: ' + url);

    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    const responseCode = response.getResponseCode();
    Logger.log('📡 Código de respuesta: ' + responseCode);

    if (responseCode !== 200) {
      ss.toast('', '', 1);
      ui.alert(
        'Error al Descargar',
        'No se pudo descargar el CSV (código ' + responseCode + ').\n\n' +
        'Verifica que el enlace sea público.',
        ui.ButtonSet.OK
      );
      return;
    }

    const csvData = response.getContentText();
    Logger.log('✅ CSV descargado (' + csvData.length + ' caracteres)');

    if (!csvData || csvData.trim().length === 0) {
      ss.toast('', '', 1);
      ui.alert('CSV Vacío', 'El CSV descargado está vacío', ui.ButtonSet.OK);
      return;
    }

    // Detectar delimitador automáticamente
    const primeraLinea = csvData.split('\n')[0] || '';
    const numComas = (primeraLinea.match(/,/g) || []).length;
    const numPuntosComa = (primeraLinea.match(/;/g) || []).length;
    const delimitador = numPuntosComa > numComas ? ';' : ',';

    Logger.log('🔍 Delimitador detectado: ' + (delimitador === ';' ? 'punto y coma (;)' : 'coma (,)'));
    Logger.log('   Comas en primera línea: ' + numComas);
    Logger.log('   Puntos y coma en primera línea: ' + numPuntosComa);

    // Parser simple y robusto para CSV
    const lineas = csvData.split('\n');
    const filas = [];

    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();

      // Saltar líneas vacías
      if (!linea) continue;

      // Split simple por delimitador (asumiendo sin comillas complejas)
      const columnas = linea.split(delimitador).map(c => c.trim().replace(/^"|"$/g, ''));

      // Solo agregar si tiene datos
      if (columnas.length > 0 && columnas.join('').trim()) {
        filas.push(columnas);
      }
    }

    Logger.log('📊 Total filas parseadas: ' + filas.length);
    if (filas.length > 0) {
      Logger.log('📋 Primera fila (headers) tiene ' + filas[0].length + ' columnas');
      Logger.log('📋 Primera columna: "' + filas[0][0] + '"');
      Logger.log('📋 Segunda columna: "' + filas[0][1] + '"');
      Logger.log('📋 Tercera columna: "' + filas[0][2] + '"');

      if (filas.length > 1) {
        Logger.log('📋 Segunda fila (primer dato) tiene ' + filas[1].length + ' columnas');
        Logger.log('📋 Primer dato columna 1: "' + filas[1][0] + '"');
        Logger.log('📋 Primer dato columna 2: "' + filas[1][1] + '"');
        Logger.log('📋 Primer dato columna 3: "' + filas[1][2] + '"');
      }
    }

    if (filas.length <= 1) {
      ss.toast('', '', 1);
      ss.toast('No hay datos nuevos en KoboToolbox', 'Sin Datos', 3);
      return;
    }

    // Crear o obtener la hoja
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      sheet = ss.insertSheet('C_03_Formulario de Bienestar (2026)');
      Logger.log('✅ Hoja creada');
    }

    // Obtener encabezados del CSV (primera fila)
    const headersCSV = filas[0];

    Logger.log('📋 Columnas CSV totales: ' + headersCSV.length);
    Logger.log('📋 Primeras 10 columnas: ' + JSON.stringify(headersCSV.slice(0, 10)));

    // Buscar índices de las 3 columnas que necesitamos (búsqueda FLEXIBLE)
    const colCreamosID = headersCSV.findIndex(h =>
      h && (
        h.toString() === 'Creamos ID' ||
        h.toString().toLowerCase().includes('creamos') ||
        h.toString().toLowerCase() === 'id'
      )
    );
    const colProtocoloSuicidio = headersCSV.findIndex(h =>
      h && h.toString().toLowerCase().includes('activar_protocolo_suicidio')
    );
    const colApoyo = headersCSV.findIndex(h =>
      h && h.toString().toLowerCase().includes('apoyo emocional')
    );

    Logger.log('📍 Índice Creamos ID: ' + colCreamosID + (colCreamosID >= 0 ? ' (' + headersCSV[colCreamosID] + ')' : ''));
    Logger.log('📍 Índice Protocolo Suicidio: ' + colProtocoloSuicidio + (colProtocoloSuicidio >= 0 ? ' (' + headersCSV[colProtocoloSuicidio] + ')' : ''));
    Logger.log('📍 Índice Apoyo Emocional: ' + colApoyo + (colApoyo >= 0 ? ' (' + headersCSV[colApoyo] + ')' : ''));

    // Verificar que encontramos las columnas necesarias
    if (colCreamosID < 0 || colProtocoloSuicidio < 0 || colApoyo < 0) {
      ss.toast('', '', 1);

      // Crear lista de TODAS las columnas disponibles (sin límite)
      let columnasDisponibles = '\n\nCOLUMNAS DISPONIBLES EN EL CSV (' + headersCSV.length + ' total):\n';
      for (let i = 0; i < headersCSV.length; i++) {
        columnasDisponibles += (i + 1) + '. "' + headersCSV[i] + '"\n';
      }

      // Mostrar en el log también
      Logger.log('═══════════════════════════════════════');
      Logger.log('DIAGNÓSTICO: Columnas no encontradas');
      Logger.log('═══════════════════════════════════════');
      Logger.log(columnasDisponibles);
      Logger.log('═══════════════════════════════════════');

      ui.alert(
        '❌ Error: Columnas no encontradas',
        'No se encontraron todas las columnas necesarias en el CSV:\n\n' +
        '• Creamos ID: ' + (colCreamosID >= 0 ? '✅ "' + headersCSV[colCreamosID] + '"' : '❌') + '\n' +
        '• activar_protocolo_suicidio: ' + (colProtocoloSuicidio >= 0 ? '✅ "' + headersCSV[colProtocoloSuicidio] + '"' : '❌') + '\n' +
        '• Apoyo Emocional: ' + (colApoyo >= 0 ? '✅ "' + headersCSV[colApoyo] + '"' : '❌') + '\n\n' +
        'Revisa el LOG (Ver → Registros) para ver\n' +
        'la lista completa de ' + headersCSV.length + ' columnas disponibles.',
        ui.ButtonSet.OK
      );
      return;
    }

    // Verificar si la hoja está vacía
    const ultimaFila = sheet.getLastRow();
    const esHojaNueva = ultimaFila === 0;

    if (esHojaNueva) {
      // Crear encabezados con columna Nota + dropdown (5 columnas)
      const encabezadosCortos = [
        'Creamos ID',
        'activar_protocolo_suicidio',
        '¿Te gustaría que nuestro equipo de Apoyo Emocional se pusiera en contacto contigo para informarte sobre sus servicios?',
        'Nota',
        'Enviar a Lista de Espera'
      ];

      sheet.getRange(1, 1, 1, 5).setValues([encabezadosCortos])
        .setBackground('#d9534f')
        .setFontColor('white')
        .setFontWeight('bold')
        .setHorizontalAlignment('center')
        .setWrap(true);

      // Anchos de columna optimizados
      sheet.setColumnWidth(1, 150);  // Creamos ID
      sheet.setColumnWidth(2, 200);  // activar_protocolo_suicidio
      sheet.setColumnWidth(3, 300);  // Apoyo Emocional
      sheet.setColumnWidth(4, 250);  // Nota
      sheet.setColumnWidth(5, 180);  // Enviar a Lista de Espera

      sheet.setFrozenRows(1);

      // Configurar validación de dropdown para columna E (Enviar a Lista)
      const validacionEnvio = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Sí', 'No'], true)
        .setAllowInvalid(false)
        .build();
      sheet.getRange('E2:E1000').setDataValidation(validacionEnvio);

      Logger.log('✅ Encabezados creados (5 columnas: 3 datos + Nota + dropdown)');
    }

    let filasNuevas = 0;
    let alertasDetectadas = 0;
    let enviadasAListaEspera = 0;

    // Procesar cada fila del CSV
    for (let i = 1; i < filas.length; i++) {
      const filaCompleta = filas[i];

      // Saltar filas vacías
      if (!filaCompleta || filaCompleta.length === 0 || !filaCompleta.join('').trim()) {
        continue;
      }

      // LOG: Mostrar lo que contiene filaCompleta
      Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      Logger.log('📄 Procesando fila ' + i + ' del CSV');
      Logger.log('   Columnas en esta fila: ' + filaCompleta.length);
      Logger.log('   Contenido completo: ' + JSON.stringify(filaCompleta));

      // Extraer SOLO las 3 columnas necesarias
      const creamosID = filaCompleta[colCreamosID] || '';
      const protocoloSuicidio = filaCompleta[colProtocoloSuicidio] || '';
      const apoyoEmocional = filaCompleta[colApoyo] || '';

      Logger.log('   Extraído -> Creamos ID: "' + creamosID + '"');
      Logger.log('   Extraído -> Protocolo: "' + protocoloSuicidio + '"');
      Logger.log('   Extraído -> Apoyo: "' + apoyoEmocional + '"');

      // Verificar duplicados por Creamos ID
      let existe = false;
      if (creamosID && creamosID.toString().trim()) {
        const datosActuales = sheet.getDataRange().getValues();

        for (let j = 1; j < datosActuales.length; j++) {
          const creamosIDExistente = datosActuales[j][0]; // Columna A = Creamos ID
          if (creamosIDExistente && creamosIDExistente.toString().trim() === creamosID.toString().trim()) {
            existe = true;
            Logger.log('⚠️ DUPLICADO encontrado - saltando fila');
            break;
          }
        }
      }

      if (existe) {
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        continue;
      }

      // Crear fila con 5 columnas (3 datos + Nota vacía + dropdown vacío)
      const filaFiltrada = [creamosID, protocoloSuicidio, apoyoEmocional, '', ''];

      Logger.log('   Array a escribir: ' + JSON.stringify(filaFiltrada));

      // Agregar nueva fila
      const nuevaFila = sheet.getLastRow() + 1;
      sheet.getRange(nuevaFila, 1, 1, 5).setValues([filaFiltrada]);
      filasNuevas++;

      Logger.log('✅ Fila ' + nuevaFila + ' escrita exitosamente');
      Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Verificar alerta de suicidio
      const protocoloValorNormalizado = protocoloSuicidio ? protocoloSuicidio.toString().toLowerCase().trim() : '';

      Logger.log('🔍 Protocolo: "' + protocoloSuicidio + '" (normalizado: "' + protocoloValorNormalizado + '")');

      if (protocoloValorNormalizado === 'sí' || protocoloValorNormalizado === 'si' || protocoloValorNormalizado === 'yes') {
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        Logger.log('🆘 ¡ALERTA DE PROTOCOLO DE SUICIDIO DETECTADA!');
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Marcar fila con fondo rojo claro
        sheet.getRange(nuevaFila, 1, 1, 5).setBackground('#ffcccc');

        // Verificar si ya se envió alerta para este Creamos ID
        const props = PropertiesService.getDocumentProperties();
        const alertaEnviada = props.getProperty('ALERTA_ENVIADA_' + creamosID);

        if (alertaEnviada) {
          Logger.log('⚠️ Alerta ya enviada anteriormente para Creamos ID: ' + creamosID);
          Logger.log('   Fecha envío anterior: ' + alertaEnviada);
        } else {
          try {
            // Enviar alerta INMEDIATA por correo con los datos completos del CSV
            enviarAlertaSuicidioFlexible(filaCompleta, headersCSV);
            alertasDetectadas++;

            // Marcar que ya se envió esta alerta
            props.setProperty('ALERTA_ENVIADA_' + creamosID, new Date().toLocaleString());

            Logger.log('✅ Alerta enviada por correo electrónico');
            Logger.log('✅ Creamos ID marcado como alertado: ' + creamosID);
          } catch (error) {
            Logger.log('❌ Error enviando alerta: ' + error.message);
            Logger.log('Stack: ' + error.stack);
          }
        }
      } else if (protocoloSuicidio) {
        Logger.log('ℹ️ Protocolo NO activado (valor: "' + protocoloValorNormalizado + '")');
      }

      // Enviar a Lista de Espera si quiere apoyo emocional
      const quiereApoyo = apoyoEmocional ? apoyoEmocional.toString().toLowerCase().trim() : '';
      Logger.log('🔍 Apoyo Emocional: "' + apoyoEmocional + '" (normalizado: "' + quiereApoyo + '")');

      if (quiereApoyo === 'sí' || quiereApoyo === 'si' || quiereApoyo === 'yes') {
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        Logger.log('📤 ENVIANDO AUTOMÁTICAMENTE A LISTA DE ESPERA');
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        try {
          // Obtener headers de la hoja de Bienestar (no del CSV)
          const headersBienestar = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          enviarBienestarAListaEsperaFlexible(sheet, nuevaFila, headersBienestar);
          enviadasAListaEspera++;
          Logger.log('✅ Enviado automáticamente a Lista de Espera');
          Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } catch (error) {
          Logger.log('❌ Error enviando a lista: ' + error.message);
          Logger.log('Stack: ' + error.stack);
          Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
      } else if (apoyoEmocional) {
        Logger.log('ℹ️ NO quiere apoyo emocional (valor: "' + quiereApoyo + '")');
      }
    }

    ss.toast('', '', 1);

    if (filasNuevas > 0) {
      ui.alert(
        '✅ IMPORTACIÓN COMPLETADA',
        'Registros nuevos: ' + filasNuevas + '\n' +
        'Columnas importadas: 5\n' +
        '  • Creamos ID\n' +
        '  • activar_protocolo_suicidio\n' +
        '  • Apoyo Emocional\n' +
        '  • Nota (editable)\n' +
        '  • Enviar a Lista (dropdown)\n\n' +
        'Alertas de suicidio: ' + alertasDetectadas + '\n' +
        'Enviadas automáticamente a Lista de Espera: ' + enviadasAListaEspera,
        ui.ButtonSet.OK
      );
    } else {
      ss.toast('No hay datos nuevos', 'Sin Cambios', 3);
    }

    Logger.log('📊 Importación: ' + filasNuevas + ' nuevas');

  } catch (error) {
    ss.toast('', '', 1);
    Logger.log('❌ Error: ' + error.message);
    Logger.log('Stack: ' + error.stack);

    ui.alert(
      'Error al Importar',
      'Error: ' + error.message + '\n\n' +
      'Revisa el log (Ver → Registros)',
      ui.ButtonSet.OK
    );
  }
}

/**
 * Instala un trigger para importar automáticamente cada 1 minuto
 */
function instalarImportacionAutomatica() {
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    'Activar Importación Rápida',
    '¿Deseas activar la importación rápida de KoboToolbox?\n\n' +
    '⚡ VELOCIDAD MÁXIMA: cada 1 minuto\n\n' +
    'El sistema:\n' +
    '• Descarga CSV cada minuto\n' +
    '• Detecta nuevas personas INMEDIATAMENTE\n' +
    '• Procesa alertas de suicidio AL INSTANTE\n' +
    '• Envía a Lista de Espera automáticamente\n\n' +
    '💡 Perfecto para pruebas y respuesta rápida\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  try {
    // Eliminar triggers existentes de importación automática
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'importarDatosAutomatico') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger cada 1 minuto
    ScriptApp.newTrigger('importarDatosAutomatico')
      .timeBased()
      .everyMinutes(1)
      .create();

    ui.alert(
      '✅ Importación Rápida Activada',
      '⚡ El sistema importará datos CADA 1 MINUTO\n\n' +
      'Ahora el sistema:\n' +
      '1. Descargará el CSV de KoboToolbox\n' +
      '2. Detectará personas nuevas\n' +
      '3. Procesará alertas de suicidio\n' +
      '4. Enviará a Lista de Espera\n\n' +
      '🚀 Máxima velocidad de respuesta\n\n' +
      'También puedes importar manualmente:\n' +
      'Menú → Bienestar → Importar Datos Ahora',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Trigger de importación rápida instalado (cada 1 min)');

  } catch (error) {
    ui.alert('Error', 'Error al instalar trigger: ' + error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error instalando trigger: ' + error.message);
  }
}

/**
 * Desactiva la sincronización automática
 */
function desactivarSincronizacionAutomatica() {
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    'Desactivar Sincronización Automática',
    '¿Estás seguro de desactivar la sincronización automática?\n\n' +
    'Tendrás que importar datos manualmente.',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  try {
    // Eliminar todos los triggers de importación automática
    const triggers = ScriptApp.getProjectTriggers();
    let eliminados = 0;

    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'importarDatosKoboAutomatico') {
        ScriptApp.deleteTrigger(trigger);
        eliminados++;
      }
    });

    ui.alert(
      '✅ Sincronización Desactivada',
      'Se eliminaron ' + eliminados + ' triggers.\n\n' +
      'La importación automática está desactivada.',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Sincronización automática desactivada (' + eliminados + ' triggers eliminados)');

  } catch (error) {
    ui.alert('Error', 'Error al desactivar: ' + error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error desactivando sincronización: ' + error.message);
  }
}

/**
 * Función ULTRA RÁPIDA para verificar alertas de suicidio
 * Optimizada para velocidad máxima - mínimo logging
 */
function verificarAlertasRapido() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Toast inicial
  ss.toast('🆘 Verificando alertas de protocolo de suicidio...', 'VERIFICACIÓN DE ALERTAS', -1);

  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';

    // Descargar CSV
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    if (response.getResponseCode() !== 200) {
      ss.toast('', '', 1);
      ui.alert('❌ Error', 'No se pudo descargar el CSV de KoboToolbox', ui.ButtonSet.OK);
      return;
    }

    const csvData = response.getContentText();

    if (!csvData || csvData.trim().length === 0) {
      ss.toast('', '', 1);
      ui.alert('⚠️ Sin Datos', 'El CSV está vacío', ui.ButtonSet.OK);
      return;
    }

    // Parsear CSV (simple y rápido)
    const primeraLinea = csvData.split('\n')[0] || '';
    const delimitador = (primeraLinea.match(/;/g) || []).length > (primeraLinea.match(/,/g) || []).length ? ';' : ',';

    const lineas = csvData.split('\n');
    const filas = [];
    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      if (!linea) continue;
      const columnas = linea.split(delimitador).map(c => c.trim().replace(/^"|"$/g, ''));
      if (columnas.length > 0 && columnas.join('').trim()) {
        filas.push(columnas);
      }
    }

    if (filas.length <= 1) {
      ss.toast('', '', 1);
      ui.alert('ℹ️ Sin Datos Nuevos', 'No hay registros nuevos en KoboToolbox', ui.ButtonSet.OK);
      return;
    }

    // Obtener hoja
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      ss.toast('', '', 1);
      ui.alert('⚠️ Hoja No Existe', 'Primero debes importar datos con "Importar Datos Ahora"', ui.ButtonSet.OK);
      return;
    }

    // Buscar columnas
    const headersCSV = filas[0];
    const colCreamosID = headersCSV.findIndex(h => h && (h.toString() === 'Creamos ID' || h.toString().toLowerCase().includes('creamos')));
    const colProtocoloSuicidio = headersCSV.findIndex(h => h && h.toString().toLowerCase().includes('activar_protocolo_suicidio'));
    const colApoyo = headersCSV.findIndex(h => h && h.toString().toLowerCase().includes('apoyo emocional'));

    if (colCreamosID < 0 || colProtocoloSuicidio < 0 || colApoyo < 0) {
      ss.toast('', '', 1);
      ui.alert('❌ Error', 'No se encontraron las columnas necesarias en el CSV', ui.ButtonSet.OK);
      return;
    }

    let alertasNuevas = 0;
    let registrosNuevos = 0;
    let enviadosALista = 0;
    const datosActuales = sheet.getDataRange().getValues();

    // Procesar filas (sin logging extensivo)
    for (let i = 1; i < filas.length; i++) {
      const filaCompleta = filas[i];
      if (!filaCompleta || filaCompleta.length === 0) continue;

      const creamosID = filaCompleta[colCreamosID] || '';
      const protocoloSuicidio = filaCompleta[colProtocoloSuicidio] || '';
      const apoyoEmocional = filaCompleta[colApoyo] || '';

      // Verificar duplicados
      let existe = false;
      if (creamosID && creamosID.toString().trim()) {
        for (let j = 1; j < datosActuales.length; j++) {
          if (datosActuales[j][0] && datosActuales[j][0].toString().trim() === creamosID.toString().trim()) {
            existe = true;
            break;
          }
        }
      }

      if (existe) continue;

      // Agregar fila
      const nuevaFila = sheet.getLastRow() + 1;
      sheet.getRange(nuevaFila, 1, 1, 5).setValues([[creamosID, protocoloSuicidio, apoyoEmocional, '', '']]);
      registrosNuevos++;

      // VERIFICAR ALERTA DE SUICIDIO
      const protocoloNorm = protocoloSuicidio ? protocoloSuicidio.toString().toLowerCase().trim() : '';
      if (protocoloNorm === 'sí' || protocoloNorm === 'si' || protocoloNorm === 'yes') {
        sheet.getRange(nuevaFila, 1, 1, 5).setBackground('#ffcccc');

        const props = PropertiesService.getDocumentProperties();
        const alertaEnviada = props.getProperty('ALERTA_ENVIADA_' + creamosID);

        if (!alertaEnviada) {
          try {
            enviarAlertaSuicidioFlexible(filaCompleta, headersCSV);
            props.setProperty('ALERTA_ENVIADA_' + creamosID, new Date().toLocaleString());
            alertasNuevas++;
          } catch (error) {
            Logger.log('Error enviando alerta: ' + error.message);
          }
        }
      }

      // Enviar automáticamente a Lista de Espera
      const quiereApoyo = apoyoEmocional ? apoyoEmocional.toString().toLowerCase().trim() : '';
      if (quiereApoyo === 'sí' || quiereApoyo === 'si' || quiereApoyo === 'yes') {
        try {
          const headersBienestar = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          enviarBienestarAListaEsperaFlexible(sheet, nuevaFila, headersBienestar);
          enviadosALista++;
        } catch (error) {
          // Silencioso
        }
      }
    }

    ss.toast('', '', 1);

    // Mensaje final
    let mensaje = '';
    let titulo = '';

    if (alertasNuevas > 0) {
      titulo = '🆘 ¡ALERTA DE SUICIDIO DETECTADA!';
      mensaje =
        '🆘 SE DETECTARON ' + alertasNuevas + ' ALERTA(S) DE PROTOCOLO DE SUICIDIO\n\n' +
        '📧 Se han enviado correos INMEDIATOS a:\n';

      const props = PropertiesService.getDocumentProperties();
      const modoPrueba = props.getProperty('MODO_PRUEBA_BIENESTAR') === 'true';

      if (modoPrueba) {
        const emailPrueba = props.getProperty('EMAIL_PRUEBA_BIENESTAR');
        mensaje += '   • ' + emailPrueba + ' (MODO PRUEBA)\n';
      } else {
        mensaje += '   • Todos los terapeutas\n   • Director/a\n';
      }

      mensaje += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      mensaje += 'Registros nuevos: ' + registrosNuevos + '\n';
      mensaje += 'Enviados a Lista de Espera: ' + enviadosALista;

      ui.alert(titulo, mensaje, ui.ButtonSet.OK);
    } else if (registrosNuevos > 0) {
      titulo = '✅ Verificación Completa';
      mensaje =
        '✅ NO SE DETECTARON ALERTAS DE SUICIDIO\n\n' +
        'Registros nuevos: ' + registrosNuevos + '\n' +
        'Enviados a Lista de Espera: ' + enviadosALista + '\n\n' +
        'Todo está bajo control.';

      ui.alert(titulo, mensaje, ui.ButtonSet.OK);
    } else {
      ui.alert('ℹ️ Sin Cambios', 'No hay registros nuevos en KoboToolbox', ui.ButtonSet.OK);
    }

  } catch (error) {
    ss.toast('', '', 1);
    Logger.log('Error en verificarAlertasRapido: ' + error.message);
    ui.alert('❌ Error', 'Error al verificar alertas:\n\n' + error.message, ui.ButtonSet.OK);
  }
}

/**
 * Limpia completamente la hoja de Bienestar para empezar de cero
 */
function limpiarHojaBienestar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const confirmacion = ui.alert(
    '🗑️ Limpiar Hoja de Bienestar',
    '⚠️ ADVERTENCIA\n\n' +
    'Esta acción eliminará COMPLETAMENTE la hoja:\n' +
    '"C_03_Formulario de Bienestar (2026)"\n\n' +
    'Se perderán todos los datos actuales.\n\n' +
    '💡 Usa esto para empezar desde cero con pruebas.\n\n' +
    '¿Estás seguro?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    return;
  }

  try {
    const nombreHoja = 'C_03_Formulario de Bienestar (2026)';
    const sheet = ss.getSheetByName(nombreHoja);

    if (sheet) {
      ss.deleteSheet(sheet);
      Logger.log('✅ Hoja eliminada: ' + nombreHoja);

      ui.alert(
        '✅ Hoja Eliminada',
        'La hoja "' + nombreHoja + '" ha sido eliminada.\n\n' +
        '🔄 En la próxima importación se creará automáticamente\n' +
        'una hoja nueva y limpia.\n\n' +
        'Ahora puedes:\n' +
        '1. Llenar nuevos formularios en KoboToolbox\n' +
        '2. Importar datos manualmente o esperar la importación automática\n' +
        '3. Ver los datos aparecer en tiempo real',
        ui.ButtonSet.OK
      );
    } else {
      ui.alert(
        'ℹ️ Hoja No Encontrada',
        'La hoja "' + nombreHoja + '" no existe.\n\n' +
        'Se creará automáticamente en la próxima importación.',
        ui.ButtonSet.OK
      );
    }

  } catch (error) {
    ui.alert(
      '❌ Error',
      'Error al eliminar la hoja:\n\n' + error.message,
      ui.ButtonSet.OK
    );
    Logger.log('❌ Error eliminando hoja: ' + error.message);
  }
}

/**
 * Envía email de alerta de suicidio a TODOS los terapeutas
 * @param {Array} registro - Array con todos los datos de la fila
 * @param {Array} headers - Array con los nombres de las columnas
 */
function enviarAlertaSuicidio(registro, headers) {
  try {
    const props = PropertiesService.getDocumentProperties();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Verificar si está en modo de prueba
    const modoPrueba = props.getProperty('MODO_PRUEBA_BIENESTAR') === 'true';
    const emailPrueba = props.getProperty('EMAIL_PRUEBA_BIENESTAR');

    let emailsTerapeutas = [];
    let esPrueba = false;

    if (modoPrueba && emailPrueba) {
      // MODO DE PRUEBA: Enviar solo al correo de prueba
      emailsTerapeutas = [emailPrueba];
      esPrueba = true;
      Logger.log('🧪 MODO DE PRUEBA: Enviando solo a ' + emailPrueba);
    } else {
      // MODO PRODUCCIÓN: Enviar a todos los terapeutas
      const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];

      terapeutas.forEach(terapeuta => {
        const email = props.getProperty('EMAIL_' + terapeuta.toUpperCase());
        if (email) {
          emailsTerapeutas.push(email);
        }
      });

      // También enviar al director
      const emailDirector = props.getProperty('EMAIL_DIRECTOR');
      if (emailDirector) {
        emailsTerapeutas.push(emailDirector);
      }

      Logger.log('📧 MODO PRODUCCIÓN: Enviando a ' + emailsTerapeutas.length + ' destinatarios');
    }

    if (emailsTerapeutas.length === 0) {
      Logger.log('⚠️ No hay emails configurados para enviar alertas');
      ss.toast(
        '⚠️ ADVERTENCIA\n\n' +
        'Se detectó una alerta pero NO hay emails configurados.\n\n' +
        'Configura los emails en:\n' +
        'Menú → 🏥 Bienestar → 📧 Configurar Correo de Prueba',
        'Sin Emails',
        8
      );
      return false;
    }

    // Construir el cuerpo del email con TODA la información
    let cuerpo =
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '🆘 ALERTA URGENTE - PROTOCOLO DE SUICIDIO\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '⚠️ Se ha activado el protocolo de suicidio en el\n' +
      '   Formulario de Bienestar.\n\n' +
      '⏰ Fecha/Hora: ' + new Date().toLocaleString() + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '📋 INFORMACIÓN DEL PARTICIPANTE\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    // Agregar TODOS los datos del formulario
    for (let i = 0; i < headers.length; i++) {
      const campo = headers[i].toString();
      const valor = registro[i] || '(vacío)';

      // Formatear mejor los campos importantes
      if (campo.toLowerCase().includes('nombre')) {
        cuerpo += '👤 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('telefono') || campo.toLowerCase().includes('phone')) {
        cuerpo += '📞 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('email') || campo.toLowerCase().includes('correo')) {
        cuerpo += '📧 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('suicidio') || campo.toLowerCase().includes('riesgo')) {
        cuerpo += '🆘 ' + campo + ': ' + valor + '\n';
      } else {
        cuerpo += '   ' + campo + ': ' + valor + '\n';
      }
    }

    cuerpo += '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '⚠️ ACCIÓN REQUERIDA INMEDIATAMENTE\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '1. Contactar al participante INMEDIATAMENTE\n' +
      '2. Evaluar el nivel de riesgo\n' +
      '3. Activar protocolo de intervención en crisis\n' +
      '4. Documentar todas las acciones tomadas\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Este es un email automático generado por el\n' +
      'Sistema de Apoyo Emocional.\n\n' +
      '🔗 Google Sheet: ' + ss.getName() + '\n' +
      '🔗 URL: ' + ss.getUrl();

    const asunto = '🆘 ALERTA URGENTE - Protocolo de Suicidio Activado';

    // Enviar emails
    emailsTerapeutas.forEach(email => {
      MailApp.sendEmail(email, asunto, cuerpo);
      Logger.log('✅ Email de alerta enviado a: ' + email);
    });

    // Mensaje diferente según modo
    if (esPrueba) {
      ss.toast(
        '✅ ALERTA ENVIADA (MODO PRUEBA)\n\n' +
        '🧪 Se envió 1 email a: ' + emailPrueba + '\n\n' +
        'Esto es una PRUEBA. En producción se enviará\n' +
        'a todos los terapeutas y director.',
        'Email de Prueba Enviado',
        8
      );
    } else {
      ss.toast(
        '✅ ALERTAS ENVIADAS\n\n' +
        'Se enviaron ' + emailsTerapeutas.length + ' emails\n' +
        'a todos los terapeutas y director.',
        'Emails Enviados',
        5
      );
    }

    return true;

  } catch (error) {
    Logger.log('❌ Error enviando alerta de suicidio: ' + error.message);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ Error al enviar alertas: ' + error.message,
      'Error',
      5
    );
    return false;
  }
}

/**
 * Instala o actualiza el sistema con las últimas mejoras
 */
function instalarActualizaciones() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const respuesta = ui.alert(
    '🔄 Instalar Actualizaciones',
    '¿Deseas instalar las últimas actualizaciones del sistema?\n\n' +
    'Esto incluye:\n' +
    '• Crear hoja de Formulario de Bienestar (si no existe)\n' +
    '• Actualizar validaciones\n' +
    '• Reparar fórmulas\n' +
    '• Actualizar reportes\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  try {
    ss.toast('Instalando actualizaciones...', 'Instalando', 3);

    // 1. Crear hoja de Bienestar si no existe
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      crearFormularioBienestar();
      ss.toast('✅ Hoja de Bienestar creada', 'Instalando', 2);
      Utilities.sleep(1000);
    }

    // 2. Reparar validaciones
    ss.toast('Reparando validaciones...', 'Instalando', 2);
    configurarValidaciones();
    Utilities.sleep(1000);

    // 3. Reparar fórmulas
    ss.toast('Reparando fórmulas...', 'Instalando', 2);
    repararFormulasListaEspera();
    Utilities.sleep(1000);

    // 4. Actualizar reportes
    ss.toast('Actualizando reportes...', 'Instalando', 2);
    actualizarReportes();
    Utilities.sleep(1000);

    ui.alert(
      '✅ Actualizaciones Instaladas',
      'El sistema se ha actualizado correctamente.\n\n' +
      'Nuevas funciones disponibles:\n' +
      '• Formulario de Bienestar (2026)\n' +
      '• Importar datos desde KoboToolbox\n' +
      '• Alertas automáticas de protocolo de suicidio\n\n' +
      'Usa el menú "🏥 Apoyo Emocional" para acceder\n' +
      'a las nuevas funciones.',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Actualizaciones instaladas correctamente');

  } catch (error) {
    ui.alert(
      '❌ Error',
      'Error al instalar actualizaciones:\n\n' + error.message,
      ui.ButtonSet.OK
    );
    Logger.log('❌ Error en instalarActualizaciones: ' + error.message);
  }
}


/**
 * Versión flexible de enviarAlertaSuicidio que funciona con cualquier estructura de columnas
 * @param {Array} registro - Array con todos los datos de la fila
 * @param {Array} headers - Array con los nombres de las columnas
 */
function enviarAlertaSuicidioFlexible(registro, headers) {
  // Simplemente llama a la función original que ya es flexible
  return enviarAlertaSuicidio(registro, headers);
}

/**
 * Wrapper simple para enviar desde Bienestar a Lista de Espera
 * Usado por el trigger alEditar()
 * @param {Sheet} sheetOrigen - La hoja de Bienestar
 * @param {number} fila - El número de fila a enviar
 */
function enviarBienestarAListaEspera(sheetOrigen, fila) {
  Logger.log('🔄 enviarBienestarAListaEspera iniciado para fila ' + fila);

  // Obtener los headers de la hoja
  const headers = sheetOrigen.getRange(1, 1, 1, sheetOrigen.getLastColumn()).getValues()[0];

  // Llamar a la versión flexible con todos los parámetros
  return enviarBienestarAListaEsperaFlexible(sheetOrigen, fila, headers);
}

/**
 * Versión flexible de enviarBienestarAListaEspera que detecta columnas dinámicamente
 * @param {Sheet} sheetOrigen - La hoja de Bienestar
 * @param {number} fila - El número de fila a enviar
 * @param {Array} headers - Array con los nombres de las columnas
 */
function enviarBienestarAListaEsperaFlexible(sheetOrigen, fila, headers) {
  Logger.log('🔄 Enviando a Lista de Espera (modo flexible)...');

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const espera = ss.getSheetByName('Lista de Espera');

    if (!espera) {
      Logger.log('❌ No se encontró la hoja Lista de Espera');
      return;
    }

    // Leer TODA la fila
    const numColumnas = headers.length;
    const datos = sheetOrigen.getRange(fila, 1, 1, numColumnas).getValues()[0];

    // Buscar columnas importantes
    const colCreamosID = headers.findIndex(h =>
      h && (h.toString().toLowerCase().includes('creamos') || h.toString() === 'Creamos ID')
    );
    const colApoyo = headers.findIndex(h =>
      h && h.toString().toLowerCase().includes('apoyo emocional')
    );
    const colNota = headers.findIndex(h =>
      h && h.toString().toLowerCase() === 'nota'
    );

    Logger.log('📍 Índice Creamos ID: ' + colCreamosID);
    Logger.log('📍 Índice Apoyo Emocional: ' + colApoyo);
    Logger.log('📍 Índice Nota: ' + colNota);

    // Extraer datos usando los índices encontrados
    const creamosId = colCreamosID >= 0 ? datos[colCreamosID] : '';
    const apoyoEmocional = colApoyo >= 0 ? datos[colApoyo] : '';
    const nota = colNota >= 0 ? datos[colNota] : '';

    Logger.log('   Creamos ID: "' + creamosId + '"');
    Logger.log('   Apoyo Emocional: "' + apoyoEmocional + '"');
    Logger.log('   Nota: "' + nota + '"');

    // Usar Creamos ID como nombre si no hay otro
    const nombre = creamosId;

    // Validar que tenga Creamos ID
    if (!nombre || nombre.toString().trim() === '') {
      Logger.log('⚠️ No se puede enviar: falta Creamos ID');
      ss.toast('⚠️ No se puede enviar: falta Creamos ID', 'Error', 3);
      return;
    }

    // Verificar duplicados en Lista de Espera por Creamos ID (columna D)
    const datosEspera = espera.getDataRange().getValues();
    for (let i = 1; i < datosEspera.length; i++) {
      const creamosIDExistente = datosEspera[i][3]; // Columna D = Creamos ID
      if (creamosIDExistente && creamosIDExistente.toString().trim() === creamosId.toString().trim()) {
        Logger.log('⚠️ Duplicado en Lista de Espera: ' + creamosId);
        ss.toast('⚠️ Ya existe en Lista de Espera: ' + creamosId, 'Duplicado', 3);
        return;
      }
    }

    // Construir malestar principal usando la Nota
    let malestarPrincipal = 'Desde Formulario de Bienestar';
    if (nota && nota.toString().trim()) {
      malestarPrincipal = nota.toString().trim();
    }

    // Buscar primera fila vacía
    const primeraFilaVacia = espera.getLastRow() + 1;

    // Preparar datos para Lista de Espera
    const nuevaFila = [
      '', // A: Fecha (auto)
      '', // B: No. (auto)
      nombre, // C: Nombre
      creamosId || '', // D: Creamos ID
      '', // E: Género
      '', // F: Edad
      malestarPrincipal, // G: Malestar
      '', // H: Teléfono
      'Formulario de Bienestar', // I: Derivación
      'Sistema Automático', // J: Quien deriva
      '', // K: Programa
      'Apoyo Psicológico', // L: Servicio
      '', // M: Terapeuta
      'Pendiente' // N: Asistió
    ];

    // Insertar
    espera.getRange(primeraFilaVacia, 1, 1, 14).setValues([nuevaFila]);

    // Formatear
    espera.getRange(primeraFilaVacia, 1, 1, 14)
      .setBackground('#e8f5e9')
      .setFontColor('black')
      .setHorizontalAlignment('left');

    // Marcar como procesada en Bienestar
    sheetOrigen.getRange(fila, 1, 1, numColumnas).setBackground('#d4edda');

    Logger.log('✅ Enviado a Lista de Espera: ' + nombre);

  } catch (error) {
    Logger.log('❌ Error en enviarBienestarAListaEsperaFlexible: ' + error.message);
  }
}

/**
 * Función de prueba para diagnosticar problemas de importación
 * TEMPORAL - Para ayudar a diagnosticar
 */
function probarImportacionBienestar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  let diagnostico = '🔍 PRUEBA DE IMPORTACIÓN\n\n';
  
  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';
    
    diagnostico += '1️⃣ URL: ' + url.substring(0, 60) + '...\n\n';
    
    // Intentar descargar
    diagnostico += '2️⃣ Descargando CSV...\n';
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });
    
    const codigo = response.getResponseCode();
    diagnostico += '   Código HTTP: ' + codigo + '\n\n';
    
    if (codigo !== 200) {
      diagnostico += '❌ ERROR: No se pudo descargar\n\n';
      diagnostico += 'Posibles causas:\n';
      diagnostico += '• El CSV no es público\n';
      diagnostico += '• La URL cambió\n';
      diagnostico += '• Necesita autenticación\n\n';
      diagnostico += 'SOLUCIÓN:\n';
      diagnostico += '1. Ve a KoboToolbox\n';
      diagnostico += '2. Abre tu formulario\n';
      diagnostico += '3. Settings → Sharing\n';
      diagnostico += '4. Habilita "Share data publicly"\n';
      diagnostico += '5. Copia la nueva URL\n';
      diagnostico += '6. Actualiza el código\n';
      
      ui.alert('Error al Descargar', diagnostico, ui.ButtonSet.OK);
      return;
    }
    
    // Ver contenido
    const csv = response.getContentText();
    diagnostico += '3️⃣ CSV descargado: ' + csv.length + ' caracteres\n\n';
    
    if (!csv || csv.trim().length === 0) {
      diagnostico += '❌ ERROR: El CSV está vacío\n';
      ui.alert('CSV Vacío', diagnostico, ui.ButtonSet.OK);
      return;
    }
    
    // Parsear
    diagnostico += '4️⃣ Parseando CSV...\n';
    let filas;
    try {
      filas = Utilities.parseCsv(csv);
      diagnostico += '   ✅ Parseado con parseCsv\n';
    } catch (e) {
      diagnostico += '   ⚠️ parseCsv falló, usando fallback\n';
      filas = csv.split('\n').filter(l => l.trim().length > 0).map(l => l.split(','));
    }
    
    diagnostico += '   Total filas: ' + filas.length + '\n\n';
    
    if (filas.length === 0) {
      diagnostico += '❌ ERROR: No hay filas\n';
      ui.alert('Sin Datos', diagnostico, ui.ButtonSet.OK);
      return;
    }
    
    // Mostrar encabezados
    diagnostico += '5️⃣ Encabezados (primeras 5 columnas):\n';
    const headers = filas[0];
    for (let i = 0; i < Math.min(5, headers.length); i++) {
      diagnostico += '   ' + (i+1) + '. ' + headers[i] + '\n';
    }
    diagnostico += '   ... (total: ' + headers.length + ' columnas)\n\n';
    
    // Mostrar primera fila de datos
    if (filas.length > 1) {
      diagnostico += '6️⃣ Primera fila de datos:\n';
      const primeraFila = filas[1];
      for (let i = 0; i < Math.min(3, primeraFila.length); i++) {
        const valor = primeraFila[i] || '(vacío)';
        diagnostico += '   ' + headers[i] + ': ' + valor.substring(0, 30) + '\n';
      }
      diagnostico += '\n';
      diagnostico += '✅ TODO FUNCIONA CORRECTAMENTE\n\n';
      diagnostico += 'El CSV se puede descargar y parsear.\n';
      diagnostico += 'Total registros disponibles: ' + (filas.length - 1) + '\n';
    } else {
      diagnostico += '⚠️ El CSV solo tiene encabezados, no hay datos\n';
    }
    
  } catch (error) {
    diagnostico += '\n❌ ERROR GENERAL:\n';
    diagnostico += error.message + '\n\n';
    diagnostico += 'Stack:\n' + error.stack;
  }
  
  ui.alert('Diagnóstico de Importación', diagnostico, ui.ButtonSet.OK);
  Logger.log(diagnostico);
}
