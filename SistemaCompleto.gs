// =====================================================================
// VARIABLES GLOBALES
// =====================================================================

/** Columna de "Malestar Inicial" en Hoja de interés (1-based) - columna 13 (M) */
var COL_MALESTAR_INTERES = 13;

/** Columna de "Terapeuta Asignado" en Hoja de interés (1-based) - columna 14 (N) */
var COL_TERAPEUTA_INTERES = 14;

/** Columna de "Asistió a Cita" en Hoja de interés (1-based) - columna 15 (O) */
var COL_ASISTIO_INTERES = 15;

/** Columna de "Número de llamadas realizadas" en Hoja de interés (1-based) - columna 16 (P) */
var COL_LLAMADAS_INTERES = 16;

/** Columna de "Hoja de Interés" en Referencias de programas (1-based) - columna 10 (J) */
var COL_INTERES_REFERENCIAS = 10;

/** Columna de "Hoja de Interés" en Derivaciones Institucionales (1-based) - columna 12 (L) */
var COL_INTERES_DERIVACIONES = 12;

/** Columna de "Hoja de Interés" en Intervención de casos (1-based) - columna 9 (I) */
var COL_INTERES_INTERVENCION = 9;

/** Columna "Enviar a Lista de Espera" en Hoja de Interés (1-based) - columna 11 (K) */
var COL_ENVIAR_INTERES = 11;

/** URLs de formularios KoboToolbox */
var URL_FORMULARIO_INTERES_HIST = 'https://kf.kobotoolbox.org/api/v2/assets/akz5K2bGfvvisQaE7VaHev/export-settings/esvntaAqU9GDq9aAkoKjPpY/data.csv';  // histórico 2024-2026
var URL_FORMULARIO_INTERES_2026 = 'https://kf.kobotoolbox.org/api/v2/assets/auvEELWQEgiwF54W4pGpV5/export-settings/esd2gxqN87HPuQDypxFqUNi/data.csv';  // formulario activo 2026

// =====================================================================
// FUNCIONES PRINCIPALES
// =====================================================================

function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();

    // ── Submenú: Reimportación de hojas desde KoboToolbox ──
    const menuReimportar = ui.createMenu('📥 Reimportar Hojas')
      .addItem('📄 Hoja de Interés', 'reimportarHojaInteres')
      .addItem('🔗 Referencias de Programas', 'reimportarReferencias')
      .addItem('🏛️ Derivaciones Institucionales', 'reimportarDerivaciones')
      .addItem('📋 Intervención de Casos', 'reimportarIntervencionCasos');

    // ── Submenú: Importación y captación automática ──
    const menuImportacion = ui.createMenu('📥 Importación y Captación')
      .addItem('📥 Importar Captación Ahora', 'importarHojasCaptacionSilencioso')
      .addItem('📜 Importar Históricos 2024-2026', 'importarFormularioInteresHistorico')
      .addSeparator()
      .addItem('✅ Activar auto-captación (cada 10 min)', 'instalarAutoImportCaptacion')
      .addItem('🛑 Desactivar auto-captación', 'desactivarAutoImportCaptacion')
      .addSeparator()
      .addItem('🆘 Verificar Alertas Bienestar', 'verificarAlertasRapido')
      .addItem('⚡ Importar Bienestar Ahora', 'importarDatosAutomatico');

    // ── Submenú: Configuración de emails ──
    const menuEmails = ui.createMenu('📧 Configuración de Emails')
      .addItem('📧 Configurar Email Director', 'configurarEmail')
      .addItem('👥 Configurar Emails Terapeutas', 'configurarEmailsTerapeutas')
      .addSeparator()
      .addItem('✉️ Probar Email Director', 'probarEmail')
      .addItem('🧪 Probar Emails Terapeutas', 'probarEmailsTerapeutas');

    // ── Submenú: Automatización (triggers) ──
    const menuAutomatizacion = ui.createMenu('⏰ Automatización')
      .addItem('📅 Activar Reporte Diario (8AM)', 'instalarTriggerAutoReporteMensual')
      .addItem('🛑 Desactivar Reporte Diario', 'desactivarAutoReporteMensual')
      .addItem('🔄 Reinstalar Hoja en Vivo', 'crearHojaReporteMensualAutomatizado')
      .addSeparator()
      .addItem('⏰ Activar Alertas Automáticas', 'instalarTriggerTiempo')
      .addItem('✏️ Activar Validaciones al Editar', 'instalarTriggerOnEdit');

    // ── Submenú: Validación de reportes ──
    const menuValidacion = ui.createMenu('🔍 Validación de Reportes')
      .addItem('🎨 Rediseñar Hoja Reporte', 'actualizarDisenoReporte')
      .addItem('🩺 Diagnóstico Completo del Reporte', 'diagnosticoCompleto')
      .addItem('📊 Analizar Reporte Actual', 'analizarReporteActual')
      .addItem('📅 Validar Mes Específico', 'validarMesEspecifico')
      .addItem('📋 Generar Reporte Detallado', 'generarReporteDetallado');

    // ── Submenú: Mantenimiento y reparación ──
    const menuMantenimiento = ui.createMenu('🔧 Mantenimiento')
      .addItem('🔧 Reparación Completa', 'reparacionCompleta')
      .addItem('📊 Actualizar Headers Reportes Mensuales', 'actualizarHeadersReportesMensuales')
      .addItem('🛠️ Reparar Filas Reportes Mensuales', 'repararFilasReportesMensuales')
      .addSeparator()
      .addItem('✅ Reinicializar Validaciones (SIN eliminar datos)', 'reinicializarValidacionesSinDatos')
      .addItem('🔄 Resetear Sesiones Mes Anterior', 'resetearSesionesMesAnterior')
      .addItem('🧹 Limpiar Asistencias e Inasistencias', 'limpiarAsistenciasEInasistencias')
      .addSeparator()
      .addItem('🔴 Instalación Completa', 'instalacionCompleta')
      .addItem('✅ Verificar Instalación', 'verificarInstalacion');

    // ── Menú principal ──
    ui.createMenu('🏥 Apoyo Emocional')
      .addItem('🔄 ACTUALIZAR TODO', 'actualizarTodo')
      .addSubMenu(menuReimportar)
      .addSeparator()
      .addItem('💾 Guardar Reporte Mensual', 'guardarReporteMensual')
      .addItem('📅 Guardar Reporte de Mes Específico', 'guardarReporteMesEspecifico')
      .addSeparator()
      .addItem('📊 Ver Reporte Mensual Automatizado', 'crearHojaReporteMensualAutomatizado')
      .addItem('🗂️ Pasar Reporte al Historial', 'pasarReporteAlHistorial')
      .addSeparator()
      .addSubMenu(menuImportacion)
      .addSubMenu(menuEmails)
      .addSubMenu(menuAutomatizacion)
      .addSubMenu(menuValidacion)
      .addSubMenu(menuMantenimiento)
      .addToUi();

    // Ejecutar mantenimiento automático al abrir
    try {
      mantenimientoAutomatico();
    } catch (error) {
      Logger.log('Error en mantenimiento automático: ' + error.message);
    }
  } catch (error) {
    Logger.log('onOpen ejecutado desde contexto sin UI disponible: ' + error.message);
  }
}

/**
 * Oculta la hoja maestra "Copy of CREAMOS ID nuevo" para que no sea visible
 * a los usuarios. Se llama automáticamente al abrir el documento.
 */
function _ocultarHojaMaestra() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Ocultar hoja maestra de datos (nadie debe editarla directamente)
  const hojaMaestra = ss.getSheetByName('Copy of CREAMOS ID nuevo');
  if (hojaMaestra && !hojaMaestra.isSheetHidden()) {
    hojaMaestra.hideSheet();
    Logger.log('👁️ Hoja maestra ocultada');
  }

  // 2. Eliminar hoja de log del complemento "Auto Refresh" si existe
  //    (ese complemento ya no es necesario — el sistema importa datos solo)
  const HOJAS_BASURA = [
    'Auto Refresh Execution Log',
    'Auto-Refresh Log',
    'AutoRefresh Log'
  ];
  HOJAS_BASURA.forEach(function(nombre) {
    const h = ss.getSheetByName(nombre);
    if (h) {
      ss.deleteSheet(h);
      Logger.log('🗑️ Hoja de log eliminada: ' + nombre);
    }
  });
}

/**
 * UN SOLO BOTÓN que hace todo:
 *   1. Renombra hojas con nombres viejos
 *   2. Importa Hoja de interés, Referencias, Derivaciones e Intervención de casos desde KoboToolbox
 *   3. Actualiza fórmulas del Reporte
 *   4. Recalcula el Reporte
 * Diseñado para usuarios no técnicos: presionar este botón es suficiente.
 */
function actualizarTodo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pasos = [];

  ss.toast('🔄 Paso 1/4 — Verificando nombres de hojas...', 'Actualizando Todo', -1);
  try {
    const cambios = repararNombresHojas();
    pasos.push('✅ Nombres de hojas: ' + (cambios.length > 0 ? cambios.join(', ') : 'ya correctos'));
  } catch(e) { pasos.push('⚠️ Nombres: ' + e.message); }

  ss.toast('🔄 Paso 2/4 — Importando datos desde KoboToolbox...', 'Actualizando Todo', -1);
  try {
    importarFormularioInteres();
  } catch(e) { pasos.push('⚠️ Hoja de interés: ' + e.message); }
  try {
    importarReferencias();
  } catch(e) { pasos.push('⚠️ Referencias: ' + e.message); }
  try {
    importarDerivacionesInstitucionales();
  } catch(e) { pasos.push('⚠️ Derivaciones: ' + e.message); }
  try {
    importarIntervencionesCasos();
  } catch(e) { pasos.push('⚠️ Intervención de casos: ' + e.message); }
  pasos.push('✅ Importación captación completada');

  ss.toast('🔄 Paso 2.5/4 — Completando datos faltantes desde hoja maestra...', 'Actualizando Todo', -1);
  try {
    rellenarDatosFaltantes();
    pasos.push('✅ Datos faltantes completados');
  } catch(e) { pasos.push('⚠️ Rellenar datos: ' + e.message); }

  ss.toast('🔄 Paso 3/4 — Actualizando fórmulas del Reporte...', 'Actualizando Todo', -1);
  try {
    actualizarFormulasReporte();
    pasos.push('✅ Fórmulas del Reporte actualizadas');
  } catch(e) { pasos.push('⚠️ Fórmulas: ' + e.message); }

  ss.toast('🔄 Paso 4/4 — Recalculando Reporte...', 'Actualizando Todo', -1);
  try {
    actualizarReportes();
    pasos.push('✅ Reporte actualizado');
  } catch(e) { pasos.push('⚠️ Reporte: ' + e.message); }

  ss.toast('✅ ¡Todo actualizado!', 'Actualizar Todo', 5);
  Logger.log('✅ actualizarTodo completado:\n' + pasos.join('\n'));
}

/**
 * Ejecuta mantenimiento automático al abrir el documento
 * - Actualiza reportes
 * - Rellena datos faltantes
 */
function mantenimientoAutomatico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    Logger.log('🔧 Iniciando mantenimiento automático...');

    // 0. Renombrar hojas antiguas si aún tienen nombre viejo
    try {
      const cambios = repararNombresHojas();
      if (cambios.length > 0) {
        Logger.log('🔤 Hojas renombradas automáticamente: ' + cambios.join(', '));
      }
    } catch (eRep) {
      Logger.log('⚠️ repararNombresHojas: ' + eRep.message);
    }

    // Ocultar hoja maestra si está visible
    try { _ocultarHojaMaestra(); } catch(e) {}

    // 1. Rellenar datos faltantes desde hoja maestra (silencioso, no lanza si no existe)
    try {
      rellenarDatosFaltantes();
    } catch (eFill) {
      Logger.log('⚠️ rellenarDatosFaltantes: ' + eFill.message);
    }

    // 4. Reparar headers de Reportes Mensuales si faltan columnas
    try {
      actualizarHeadersReportesMensuales();
    } catch (eHeaders) {
      Logger.log('actualizarHeadersReportesMensuales: ' + eHeaders.message);
    }

    // 5. Actualizar reportes
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
        .everyMinutes(10)
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
      'NOTA: Si los diálogos de retiro no aparecen,\n' +
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

  const hojasRequeridas = ['Terapias Individual',
                           'Procesos Culminados', 'Retiradx', 'Intervención de casos',
                           'Personas no asistidas', 'Reporte', 'Reportes Mensuales'];
  let hojasOk = 0;
  hojasRequeridas.forEach(nombre => {
    if (ss.getSheetByName(nombre)) hojasOk++;
  });
  mensaje += '✅ Hojas: ' + hojasOk + '/7\n';

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

  // Hojas que NUNCA se deben eliminar (datos maestros externos)
  const HOJAS_PROTEGIDAS = ['Copy of CREAMOS ID nuevo'];

  const hojas = ss.getSheets();
  for (let i = hojas.length - 1; i > 0; i--) {
    if (!HOJAS_PROTEGIDAS.includes(hojas[i].getName())) {
      ss.deleteSheet(hojas[i]);
    }
  }

  // Si la hoja protegida existe, renombrar la primera hoja; si no, usar la primera
  const hojasRestantes = ss.getSheets();
  const primeraEditable = hojasRestantes.find(h => !HOJAS_PROTEGIDAS.includes(h.getName()));
  if (primeraEditable) primeraEditable.setName('Terapias Individual');

  crearTerapias();
  crearProcesosCulminados();
  crearDeserciones();
  crearGestionCasos();
  crearPersonasNoAsistidas();
  crearReporte();
  crearReportesMensuales();
}

function crearTerapias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Terapias Individual');

  // 13 columnas - Incluye Fecha de Ingreso y Edad
  const headers = [
    'Fecha de Ingreso', 'Terapeuta', 'Creamos ID', 'Participante', 'Malestar Inicial',
    'Género', 'Edad', 'No. Sesión', 'Estado', 'Motivo Finalización', 'Sesiones Mes Anterior', 'Inasistencias', 'Asistencias', 'Inasistencias Mes Anterior'
  ];

  sheet.getRange(1, 1, 1, 14).setValues([headers])
    .setBackground('#2e7d32')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [110, 120, 120, 200, 250, 80, 80, 80, 120, 300, 120, 100, 100, 120].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Proteger la columna Fecha de Ingreso (columna A)
  sheet.getRange('A2:A1000').protect().setWarningOnly(true);
}

function crearProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Procesos Culminados');

  // Sin columna Participante - solo Creamos ID como referencia
  const headers = ['Fecha', 'Creamos ID', 'Terapeuta', 'Total Sesiones', 'Motivo'];

  sheet.getRange(1, 1, 1, 5).setValues([headers])
    .setBackground('#388e3c')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 120, 120, 100, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearDeserciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Retiradx');

  // Sin columna Participante - solo Creamos ID como referencia
  const headers = ['Fecha', 'Creamos ID', 'Terapeuta', 'Sesiones', 'Motivo'];

  sheet.getRange(1, 1, 1, 5).setValues([headers])
    .setBackground('#d32f2f')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 120, 120, 100, 300].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Intervención de casos');

  // A:Fecha B:Participante C:Terapeuta D:CreamosID E:Tipo F:Nota G:Motivo H:_uuid I:HojaInterés
  const headers = ['Fecha', 'Participante', 'Terapeuta', 'Creamos ID', 'Tipo', 'Nota', 'Motivo', '_uuid', 'Hoja de Interés'];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#f57c00')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 200, 120, 120, 120, 250, 300, 100, 140].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Ocultar columna H (_uuid)
  try {
    sheet.hideColumns(8);
  } catch(e) {
    Logger.log('⚠️ No se pudo ocultar columna _uuid: ' + e.message);
  }

  // Validación para columna "Hoja de Interés" (columna I/9)
  sheet.getRange('I2:I1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['No', 'Sí'], true).setAllowInvalid(false).build()
  );
}

function crearPersonasNoAsistidas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Personas no asistidas');

  // Sin columna Nombre Completo - solo Creamos ID como referencia
  const headers = ['Fecha', 'Creamos ID', 'Género', 'Edad', 'Malestar Principal', 'Terapeuta Asignado', 'Teléfono', 'Notas de llamadas'];

  sheet.getRange(1, 1, 1, 8).setValues([headers])
    .setBackground('#ff6f00')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  [120, 120, 100, 100, 250, 150, 200, 300].forEach((w, i) => {
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

    // SECCIÓN 1: NO ASISTIDAS
    ['PERSONAS NO ASISTIDAS', 'Total', 'Este mes', ''],
    ['Personas que no asistieron a primera cita', '=IFERROR(COUNTA(\'Personas no asistidas\'!B:B)-1,0)', '=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 3: DERIVACIONES — cuenta desde hoja Derivaciones Institucionales
    ['DERIVACIONES INSTITUCIONALES', 'Total', 'Este mes', ''],
    ['Total derivaciones institucionales', '=IFERROR(COUNTA(\'Derivaciones Institucionales\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Derivaciones Institucionales\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Derivaciones Institucionales\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 4: BIENESTAR (Formularios de KoboToolbox)
    ['FORMULARIO DE BIENESTAR', 'Total', 'Alertas suicidio', ''],
    ['Formularios recibidos', '=IFERROR(COUNTA(\'C_03_Formulario de Bienestar (2026)\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Sí")+COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!B:B,"Si"),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 5: CASOS ACTIVOS - Sesiones mes suma solo Asistencias (columna M)
    ['CASOS ACTIVOS POR TERAPEUTA', 'Casos activos', 'Sesiones mes', ''],
    ['Gerber', '=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Gerber",\'Terapias Individual\'!I:I,"En proceso"),0)', '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Gerber")*(\'Terapias Individual\'!I2:I500="En proceso")*(\'Terapias Individual\'!M2:M500)),0)', ''],
    ['Melissa', '=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Melissa",\'Terapias Individual\'!I:I,"En proceso"),0)', '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Melissa")*(\'Terapias Individual\'!I2:I500="En proceso")*(\'Terapias Individual\'!M2:M500)),0)', ''],
    ['Diana', '=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Diana",\'Terapias Individual\'!I:I,"En proceso"),0)', '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Diana")*(\'Terapias Individual\'!I2:I500="En proceso")*(\'Terapias Individual\'!M2:M500)),0)', ''],
    ['Karina', '=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Karina",\'Terapias Individual\'!I:I,"En proceso"),0)', '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Karina")*(\'Terapias Individual\'!I2:I500="En proceso")*(\'Terapias Individual\'!M2:M500)),0)', ''],
    ['TOTAL', '=IFERROR(SUM(B17:B20),0)', '=IFERROR(SUM(C17:C20),0)', ''],
    ['', '', '', ''],

    // SECCIÓN 6: PROCESOS CULMINADOS
    ['PROCESOS CULMINADOS', 'Total', 'Este mes', 'Tasa culminación (12 ses.)'],
    ['Tasa de culminación de Terapia Individual', '=IFERROR(COUNTA(\'Procesos Culminados\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', '=IFERROR(IF((B24+B27)>0,ROUND(COUNTIF(\'Procesos Culminados\'!E2:E500,">=12")/(B24+B27)*100,1)&"%","0%"),"0%")'],
    ['', '', '', ''],

    // SECCIÓN 7: RETIRADX
    ['RETIRADX', 'Total', 'Este mes', 'Tasa retiro'],
    ['Participantxs que se retiraron', '=IFERROR(COUNTA(Retiradx!A:A)-1,0)', '=IFERROR(COUNTIFS(Retiradx!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Retiradx!A:A,"<="&EOMONTH(TODAY(),0)),0)', '=IFERROR(IF((B24+B27)>0,ROUND(B27/(B24+B27)*100,1)&"%","0%"),"0%")'],
    ['', '', '', ''],

    // SECCIÓN 8: INTERVENCION DE CASOS
    ['INTERVENCION DE CASOS', 'Total', '', ''],
    ['Casos en intervencion', '=IFERROR(COUNTA(\'Intervención de casos\'!A:A)-1,0)', '', ''],
    ['', '', '', ''],

    // SECCIÓN 9: RESUMEN GENERAL
    ['RESUMEN GENERAL', 'Valor', '', ''],
    ['Total casos procesados', '=IFERROR(B24+B27+B30,0)', '', ''],
    ['Tasa de exito', '=IFERROR(IF(B33>0,ROUND(B24/B33*100,1)&"%","0%"),"0%")', '', ''],
    ['Casos activos totales', '=IFERROR(B21,0)', '', ''],
    ['', '', '', ''],

    // SECCIÓN 10: CAPTACIÓN (formularios de ingreso)
    ['CAPTACIÓN', 'Total', 'Este mes', ''],
    ['Hoja de interés (Terapia Individual)', '=IFERROR(COUNTA(\'Hoja de interés\'!C:C)-1,0)', '=IFERROR(COUNTIFS(\'Hoja de interés\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Hoja de interés\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['Referencias de programas recibidas', '=IFERROR(COUNTA(\'Referencias de programas\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Referencias de programas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Referencias de programas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['Derivaciones institucionales recibidas', '=IFERROR(COUNTA(\'Derivaciones Institucionales\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Derivaciones Institucionales\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Derivaciones Institucionales\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', ''],
    ['Nuevos ingresos a Terapia Individual', '=IFERROR(COUNTA(\'Terapias Individual\'!A:A)-1,0)', '=IFERROR(COUNTIFS(\'Terapias Individual\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Terapias Individual\'!A:A,"<="&EOMONTH(TODAY(),0)),0)', '']
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
  const headerRows = [4, 7, 10, 13, 16, 23, 26, 29, 32, 37];
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
  const dataRows = [5, 8, 11, 14, 17, 18, 19, 20, 24, 27, 30, 38, 39, 40, 41];
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
    'Mes/Año',
    'Nuevos Ingresos (Total)', 'Nuevos Ingresos (Mes)',
    'No Asistidas (Total)', 'No Asistidas (Mes)',
    'Derivaciones (Total)', 'Derivaciones (Mes)',
    'Formularios (Total)', 'Alertas Suicidio',
    'Activos Gerber', 'Sesiones Gerber', 'Inasistencias Gerber',
    'Activos Melissa', 'Sesiones Melissa', 'Inasistencias Melissa',
    'Activos Diana', 'Sesiones Diana', 'Inasistencias Diana',
    'Activos Karina', 'Sesiones Karina', 'Inasistencias Karina',
    'Total Activos', 'Total Sesiones', 'Total Inasistencias',
    'Culminados (Total)', 'Culminados (Mes)', 'Culminados 12+ ses.',
    'Retiradx (Total)', 'Retiradx (Mes)', 'Tasa Retiro',
    'Casos Intervención',
    'Total Procesados', 'Tasa Éxito', 'Casos Activos Totales',
    'Hoja Interés (Total)', 'Hoja Interés (Mes)',
    'Referencias (Total)', 'Referencias (Mes)',
    'Deriv. Inst. Recibidas (Total)', 'Deriv. Inst. Recibidas (Mes)',
    'Fecha Guardado'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#6a1b9a')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  const anchos = [120, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 100, 100, 100, 100, 100, 100, 90, 100, 100, 100, 90, 90, 90, 90, 90, 90, 90, 120];
  anchos.forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function actualizarHeadersReportesMensuales() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Reportes Mensuales');

    if (!sheet) {
      ss.toast('No existe la hoja "Reportes Mensuales"', 'Error', 3);
      return;
    }

    const headers = [
      'Mes/Año',
      'Nuevos Ingresos (Total)', 'Nuevos Ingresos (Mes)',
      'No Asistidas (Total)', 'No Asistidas (Mes)',
      'Derivaciones (Total)', 'Derivaciones (Mes)',
      'Formularios (Total)', 'Alertas Suicidio',
      'Activos Gerber', 'Sesiones Gerber', 'Inasistencias Gerber',
      'Activos Melissa', 'Sesiones Melissa', 'Inasistencias Melissa',
      'Activos Diana', 'Sesiones Diana', 'Inasistencias Diana',
      'Activos Karina', 'Sesiones Karina', 'Inasistencias Karina',
      'Total Activos', 'Total Sesiones', 'Total Inasistencias',
      'Culminados (Total)', 'Culminados (Mes)', 'Culminados 12+ ses.',
      'Retiradx (Total)', 'Retiradx (Mes)', 'Tasa Retiro',
      'Casos Intervención',
      'Total Procesados', 'Tasa Éxito', 'Casos Activos Totales',
      'Hoja Interés (Total)', 'Hoja Interés (Mes)',
      'Referencias (Total)', 'Referencias (Mes)',
      'Deriv. Inst. Recibidas (Total)', 'Deriv. Inst. Recibidas (Mes)',
      'Fecha Guardado'
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setBackground('#6a1b9a')
      .setFontColor('white')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);

    const anchos = [120, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 100, 100, 100, 100, 100, 100, 90, 100, 100, 100, 90, 90, 90, 90, 90, 90, 90, 120];
    anchos.forEach((w, i) => {
      sheet.setColumnWidth(i + 1, w);
    });

    sheet.setRowHeight(1, 60);

    ss.toast(
      'Headers actualizados correctamente (41 columnas con inasistencias)',
      'Headers Actualizados',
      5
    );

    Logger.log('Headers de Reportes Mensuales actualizados (con inasistencias)');

  } catch (error) {
    Logger.log('Error actualizando headers: ' + error.message);
    SpreadsheetApp.getActiveSpreadsheet().toast('Error: ' + error.message, 'Error', 5);
  }
}

/**
 * Repara la hoja Reportes Mensuales:
 * 1. Actualiza los headers al formato de 41 columnas
 * 2. Detecta filas en formato viejo y las alinea donde sea posible
 * 3. Color-codea cada fila según su calidad de datos:
 *    🟢 Verde  = formato nuevo completo
 *    🟡 Amarillo = formato parcial / datos incompletos
 *    🟠 Naranja = datos con valores sospechosos corregidos
 */
function repararFilasReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui;
  try { ui = SpreadsheetApp.getUi(); } catch(e) { ui = null; }

  try {
    const sheet = ss.getSheetByName('Reportes Mensuales');
    if (!sheet) {
      if (ui) ui.alert('No existe la hoja "Reportes Mensuales".');
      return;
    }

    // Paso 1: Actualizar headers
    actualizarHeadersReportesMensuales();

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      if (ui) ui.alert('No hay filas de datos para reparar.');
      return;
    }

    const datos = sheet.getRange(2, 1, lastRow - 1, 41).getValues();
    let reparadas = 0, incompletas = 0, correctas = 0;

    for (let i = 0; i < datos.length; i++) {
      const fila = datos[i];
      const rowNum = i + 2;
      const mes = String(fila[0] || '');
      if (!mes) continue;

      const fechaGuardado = fila[40]; // col 41
      const totalActivos  = fila[21]; // col 22
      const activosKarina = fila[18]; // col 19
      const sesionesKarina = fila[19]; // col 20
      const totalSesiones = fila[22]; // col 23

      const tieneFormato41 = fechaGuardado instanceof Date || String(fechaGuardado).includes('/');
      const valorSospechoso = activosKarina > 60 ||
                              (totalActivos === 0 && (fila[9] > 0 || fila[12] > 0)) ||
                              (fila[14] > 50 && sesionesKarina === 0); // inasistencias > 50 con 0 sesiones

      if (tieneFormato41 && !valorSospechoso) {
        // Fila completa y correcta → verde
        sheet.getRange(rowNum, 1, 1, 41).setBackground('#d4edda');
        correctas++;
        continue;
      }

      if (valorSospechoso) {
        // Fila con valores imposibles (ej: marzo guardado con función vieja)
        // Conservar datos confiables, limpiar los sospechosos
        const filaNueva = fila.slice(); // copia

        // Limpiar valores claramente imposibles
        if (activosKarina > 60) filaNueva[18] = ''; // Activos Karina
        if (totalActivos === 0 && fila[9] > 0) {
          // Recalcular total activos de lo que hay
          const sumActivos = (Number(fila[9]) || 0) + (Number(fila[12]) || 0) +
                             (Number(fila[15]) || 0) + (Number(filaNueva[18]) || 0);
          filaNueva[21] = sumActivos > 0 ? sumActivos : '';
        }
        if (Number(fila[22]) === 0 && Number(fila[10]) > 0) {
          // Recalcular total sesiones
          const sumSes = (Number(fila[10]) || 0) + (Number(fila[13]) || 0) +
                         (Number(fila[16]) || 0) + (Number(fila[19]) || 0);
          filaNueva[22] = sumSes > 0 ? sumSes : '';
        }
        // Limpiar inasistencias imposibles (más que sesiones del mismo terapeuta)
        if (Number(fila[11]) > Number(fila[10]) * 2) filaNueva[11] = ''; // Inasist Gerber
        if (Number(fila[14]) > Number(fila[13]) * 2) filaNueva[14] = ''; // Inasist Melissa
        if (Number(fila[17]) > Number(fila[16]) * 2) filaNueva[17] = ''; // Inasist Diana
        if (Number(fila[20]) > Number(fila[19]) * 2) filaNueva[20] = ''; // Inasist Karina

        sheet.getRange(rowNum, 1, 1, 41).setValues([filaNueva]);
        sheet.getRange(rowNum, 1, 1, 41).setBackground('#ffe0b2'); // naranja
        sheet.getRange(rowNum, 1).setNote('⚠️ Fila reparada automáticamente. Algunos valores imposibles fueron limpiados. Verifica los datos.');
        reparadas++;
        continue;
      }

      // Fila sin fecha de guardado pero sin valores imposibles → formato antiguo incompleto
      sheet.getRange(rowNum, 1, 1, 41).setBackground('#fff9c4'); // amarillo
      sheet.getRange(rowNum, 1).setNote('📋 Datos en formato anterior (incompletos). Los campos en blanco no estaban disponibles en ese momento.');
      incompletas++;
    }

    const msg = '✅ Reparación completada:\n\n' +
      '🟢 Correctas: ' + correctas + '\n' +
      '🟡 Incompletas (formato viejo): ' + incompletas + '\n' +
      '🟠 Reparadas (valores corregidos): ' + reparadas;

    if (ui) ui.alert('Reparación de Reportes Mensuales', msg, ui.ButtonSet.OK);
    ss.toast('Listo: ' + correctas + ' correctas, ' + incompletas + ' antiguas, ' + reparadas + ' reparadas', 'Reportes Mensuales', 7);

  } catch (e) {
    Logger.log('Error en repararFilasReportesMensuales: ' + e.message);
    if (ui) ui.alert('Error: ' + e.message);
  }
}

// =====================================================================
// CONFIGURAR VALIDACIONES (DESPLEGABLES)
// =====================================================================

function configurarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');
  const hojaInteres = ss.getSheetByName('Hoja de interés');
  const intervencion = ss.getSheetByName('Intervención de casos');
  const retirxs = ss.getSheetByName('Retiradx');

  // LIMPIAR TODAS las validaciones existentes primero
  // clearDataValidations() debe llamarse sobre un rango, no sobre la hoja
  if (hojaInteres) hojaInteres.getRange('A1:Z1000').clearDataValidations();
  if (terapias) terapias.getRange('A1:Z1000').clearDataValidations();
  if (intervencion) intervencion.getRange('A1:Z1000').clearDataValidations();
  if (retirxs) retirxs.getRange('A1:Z1000').clearDataValidations();

  // Validaciones de género
  // En Terapias Individual (columna F)
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  if (terapias) terapias.getRange('F2:F1000').setDataValidation(generoRule);

  // Género en Hoja de interés (col F) — allowInvalid=true para no romper datos importados
  if (hojaInteres) {
    const generoInteresRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
      .setAllowInvalid(true).build();
    hojaInteres.getRange('F2:F1000').setDataValidation(generoInteresRule);
  }

  // Validaciones de terapeuta
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  if (terapias) terapias.getRange('B2:B1000').setDataValidation(terapeutaRule);

  // Validaciones de Malestar Inicial
  const malestarRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      'Duelo',
      'Sintomatología depresiva',
      'Sintomatología de ansiedad',
      'Dinámica familiar disfuncional',
      'Sintomatología o Trastorno de Personalidad',
      'Requerimiento legal',
      'Violencia de género',
      'Separación de pareja',
      'Dificultad en las relaciones interpersonales',
      'Estrés',
      'Consumo problemático de sustancias',
      'Intento o ideación suicida',
      'Sintomatología de TEA o TEPT',
      'Problemas de la conducta alimentaria',
      'Dificultad en la gestión emocional',
      'Violencia intrafamiliar',
      'Conducta adictiva'
    ])
    .setAllowInvalid(true) // Allow invalid para no romper datos existentes
    .build();
  if (terapias) terapias.getRange('E2:E1000').setDataValidation(malestarRule);

  // Malestar Inicial en Hoja de interés (columna M = 13)
  if (hojaInteres) hojaInteres.getRange('M2:M1000').setDataValidation(malestarRule);

  // Terapeuta en Hoja de interés (columna N = 14)
  if (hojaInteres) hojaInteres.getRange('N2:N1000').setDataValidation(terapeutaRule);

  // Validaciones de número de sesión - Terapias columna H
  const sesiones = [];
  for (let i = 0; i <= 20; i++) {
    sesiones.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesiones)
    .setAllowInvalid(false)
    .build();
  if (terapias) terapias.getRange('H2:H1000').setDataValidation(sesionRule);

  // Validaciones de estado - Terapias columna I
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['En proceso', 'Proceso culminado', 'retirxs'])
    .setAllowInvalid(false)
    .build();
  if (terapias) terapias.getRange('I2:I1000').setDataValidation(estadoRule);

  // Validaciones de asistencia - en Hoja de interés columna O (15)
  const asistenciaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Vino', 'No vino', 'Pendiente'])
    .setAllowInvalid(false)
    .build();
  if (hojaInteres) hojaInteres.getRange('O2:O1000').setDataValidation(asistenciaRule);

  // Validaciones de Tipo de Intervención - en Intervención de casos columna E
  if (intervencion) {
    // Validación en columna E (Tipo) - desplegable
    const tipoIntervencionRule = SpreadsheetApp.newDataValidation()
      .requireValueInList([
        'Paps',
        'Crisis suicida',
        'Derivación institucional',
        'Otras organizaciones de la red'
      ])
      .setAllowInvalid(true)
      .build();
    intervencion.getRange('E2:E200').setDataValidation(tipoIntervencionRule);

    // Columna F = Nota (texto libre), Columna G = Motivo (texto libre)

    // Validación para columna I (9) - Hoja de Interés
    const enviarListaRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Sí', 'No'])
      .setAllowInvalid(false)
      .build();
    intervencion.getRange('I2:I200').setDataValidation(enviarListaRule);
  }

  // Validaciones de Motivos de Retiro - en Retiradx columna F
  if (retirxs) {
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
    retirxs.getRange('F2:F200').setDataValidation(motivoDesercionRule);
  }

  // =====================================================================
  // RESUMEN DE VALIDACIONES POR HOJA:
  // =====================================================================
  //
  // HOJA DE INTERÉS:
  //   - Género (F) - allow invalid para datos importados
  //   - Terapeuta Asignado (M)
  //   - Asistió a Cita (N)
  //
  // TERAPIAS INDIVIDUAL:
  //   - Fecha de Ingreso (A) - Automática, protegida
  //   - Terapeuta (B)
  //   - Malestar Inicial (E) - 17 opciones
  //   - Género (F)
  //   - No. Sesión (H)
  //   - Estado (I)
  //
  // INTERVENCION DE CASOS:
  //   - Tipo (E) - desplegable: Referencia programas, Derivación institucional, Paps, Crisis suicida
  //   - Motivo (F) - texto libre, sin validación
  //
  // RETIRADX:
  //   - Motivo de retiro (F) - 21 opciones
  //
  // =====================================================================
}

function configurarFormatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  // Formatos condicionales para columna I (Estado)
  // Coincide con los valores de validación: 'En proceso', 'Proceso culminado', 'retirxs'
  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('En proceso')
    .setBackground('#d1ecf1')
    .setRanges([terapias.getRange('I2:I200')])
    .build();

  const culminadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Proceso culminado')
    .setBackground('#d4edda')
    .setRanges([terapias.getRange('I2:I200')])
    .build();

  const retirxsRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('retirxs')
    .setBackground('#f8d7da')
    .setRanges([terapias.getRange('I2:I200')])
    .build();

  terapias.setConditionalFormatRules([procesoRule, culminadoRule, retirxsRule]);
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

  // PROTECCIÓN CONTRA EJECUCIONES MÚLTIPLES (Google Sheets bug - dispara 2 veces)
  // Usar CacheService para rastrear ejecuciones recientes
  const cache = CacheService.getDocumentCache();
  // Clave INCLUYE el valor para permitir ediciones legítimas posteriores al mismo celda
  // (ej: después de un revert por no-show, el terapeuta puede volver a editar la misma celda)
  const cacheKey = hoja + '_' + fila + '_' + columna + '_' + valor;
  const yaEjecutado = cache.get(cacheKey);

  if (yaEjecutado) {
    Logger.log('⚠️ Esta edición ya fue procesada recientemente, ignorando duplicado');
    Logger.log('   Clave: ' + cacheKey);
    return;
  }

  // Marcar como ejecutado por 5 segundos (solo para prevenir el doble disparo de Google)
  cache.put(cacheKey, 'true', 5);

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

  // CASO 1: Hoja de interés - Asignación de Terapeuta (columna N = 14)
  if (hoja === 'Hoja de interés' && columna === COL_TERAPEUTA_INTERES) {
    Logger.log('✅ Detectada edición en Hoja de interés, columna N (' + COL_TERAPEUTA_INTERES + ') - Terapeuta Asignado');
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

  // CASO 2: Hoja de interés - Confirmación de Asistencia (columna O = 15)
  if (hoja === 'Hoja de interés' && columna === COL_ASISTIO_INTERES) {
    Logger.log('✅ Detectada edición en Hoja de interés, columna O (' + COL_ASISTIO_INTERES + ') - Asistió a Cita');
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

  // CASO 3: Terapias - Cambio de Número de Sesión (columna H)
  if (hoja === 'Terapias Individual' && columna === 8) {
    Logger.log('✅ Detectado cambio en No. Sesión en Terapias');
    Logger.log('   Fila: ' + fila + ', Nuevo valor: ' + val);
    Logger.log('   Valor anterior: ' + (e.oldValue || 'no disponible'));

    try {
      // Preguntar si vino o no vino a la sesión
      // Pasar el valor anterior para poder revertir si no vino
      registrarAsistenciaSesion(sheet, fila, val, e.oldValue);
      Logger.log('✅ Asistencia registrada');

      actualizarReportes();
      Logger.log('✅ Reportes actualizados');
    } catch (error) {
      Logger.log('❌ ERROR: ' + error.toString());
    }
  }

  // CASO 4: Terapias - Cambio de Estado (columna I)
  if (hoja === 'Terapias Individual' && columna === 9) {
    if (val === 'Proceso culminado' || val === 'retirxs') {
      Logger.log('✅ Detectado cambio de estado en Terapias Individual: ' + val);
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

  // CASO 5: Formulario de Bienestar - Hoja de Interés (solo marca color)
  // Funciona igual que Referencias, Derivaciones e Intervención de casos
  if (hoja === 'C_03_Formulario de Bienestar (2026)' && columna === 5) {
    Logger.log('✅ Detectada edición en Bienestar, columna E - Hoja de Interés');
    if (val === 'Sí' || val === 'Si' || val === 'sí' || val === 'si') {
      e.range.setBackground('#d4edda'); // Verde suave
      Logger.log('✅ Color verde aplicado (Sí)');
    } else if (val === 'No' || val === 'no') {
      e.range.setBackground('#f8d7da'); // Rojo suave
      Logger.log('✅ Color rojo aplicado (No)');
    }
  }

  // CASO 6: Hoja de interés — columna M (13) = Terapeuta Asignado
  // Procesado en CASO 1 (líneas arriba)

  // CASO 7: Hoja de interés — columna N (14) = Asistió a Cita
  // Procesado en CASO 2 (líneas arriba)

  // =====================================================================
  // FORMATO AUTOMÁTICO: COLUMNA "HOJA DE INTERÉS"
  // Aplica colores automáticos cuando se cambia el valor
  // =====================================================================

  // Referencias de programas - Columna J (10)
  if (hoja === 'Referencias de programas' && columna === COL_INTERES_REFERENCIAS) {
    Logger.log('✅ Detectada edición en Referencias de programas, columna J - Hoja de Interés');
    if (val === 'Sí' || val === 'Si' || val === 'sí' || val === 'si') {
      e.range.setBackground('#d4edda'); // Verde suave
      Logger.log('✅ Color verde aplicado (Sí)');
    } else if (val === 'No' || val === 'no') {
      e.range.setBackground('#f8d7da'); // Rojo suave
      Logger.log('✅ Color rojo aplicado (No)');
    }
  }

  // Derivaciones Institucionales - Columna L (12)
  if (hoja === 'Derivaciones Institucionales' && columna === COL_INTERES_DERIVACIONES) {
    Logger.log('✅ Detectada edición en Derivaciones Institucionales, columna L - Hoja de Interés');
    if (val === 'Sí' || val === 'Si' || val === 'sí' || val === 'si') {
      e.range.setBackground('#d4edda'); // Verde suave
      Logger.log('✅ Color verde aplicado (Sí)');
    } else if (val === 'No' || val === 'no') {
      e.range.setBackground('#f8d7da'); // Rojo suave
      Logger.log('✅ Color rojo aplicado (No)');
    }
  }

  // Intervención de casos - Columna I (9) - Hoja de Interés
  if (hoja === 'Intervención de casos' && columna === COL_INTERES_INTERVENCION) {
    Logger.log('✅ Detectada edición en Intervención de casos, columna I - Hoja de Interés');
    if (val === 'Sí' || val === 'Si' || val === 'sí' || val === 'si') {
      e.range.setBackground('#d4edda'); // Verde suave
      Logger.log('✅ Color verde aplicado (Sí)');
    } else if (val === 'No' || val === 'no') {
      e.range.setBackground('#f8d7da'); // Rojo suave
      Logger.log('✅ Color rojo aplicado (No)');
    }
  }

}

/**
 * Asigna un terapeuta y envía email al terapeuta para confirmar asistencia
 */
function asignarTerapeuta(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Validar que sheetOrigen es válido
    if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') {
      Logger.log('❌ ERROR: sheetOrigen no es válido');
      ss.toast('❌ Error interno: Hoja de origen no válida', 'Error', 5);
      return;
    }

    // Leer datos básicos de Hoja de interés: D (Nombre) + E (Apellido)
    const nombres = sheetOrigen.getRange(fila, 4).getValue();   // Columna D: Nombre(s)
    const apellidos = sheetOrigen.getRange(fila, 5).getValue(); // Columna E: Apellido(s)

    const nombreCompleto = [nombres, apellidos]
      .filter(v => v && v.toString().trim() !== '')
      .join(' ')
      .trim();

    if (!nombreCompleto) {
      ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 3);
      sheetOrigen.getRange(fila, COL_TERAPEUTA_INTERES).clearContent(); // Limpiar terapeuta (columna N)
      return;
    }

    Logger.log('Asignando ' + nombreCompleto + ' a ' + terapeuta);

    // 1. Enviar email al terapeuta
    const emailEnviado = enviarEmailAsignacionTerapeuta(terapeuta, nombreCompleto, fila);

    // 2. Notificar al usuario
    if (emailEnviado) {
      ss.toast(
        '✅ CASO ASIGNADO\n\n' +
        '👤 Participante: ' + nombreCompleto + '\n' +
        '👨‍⚕️ Terapeuta: ' + terapeuta + '\n\n' +
        '📧 Email enviado exitosamente al terapeuta\n\n' +
        'El terapeuta debe confirmar asistencia en columna O.',
        'Email Enviado',
        6
      );
    } else {
      ss.toast(
        '⚠️ CASO ASIGNADO (SIN EMAIL)\n\n' +
        '👤 Participante: ' + nombreCompleto + '\n' +
        '👨‍⚕️ Terapeuta: ' + terapeuta + '\n\n' +
        '❌ No se envió email (no configurado)\n\n' +
        'CONFIGURAR EMAILS:\n' +
        'Menú → 🏥 Apoyo Emocional → 📧 Configurar Emails Terapeutas\n\n' +
        'El terapeuta debe confirmar asistencia manualmente en columna O.',
        'Sin Email Configurado',
        10
      );
    }

    // 3. Marcar fila en amarillo (pendiente)
    sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#fff3cd');

  } catch (error) {
    Logger.log('❌ ERROR en asignarTerapeuta: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    sheetOrigen.getRange(fila, COL_TERAPEUTA_INTERES).clearContent(); // Limpiar terapeuta (columna N)
  }
}

/**
 * Procesa la confirmación de asistencia por el terapeuta
 */
function procesarConfirmacionAsistencia(sheetOrigen, fila, confirmacion) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // PROTECCIÓN ADICIONAL: Verificar si ya se está procesando esta fila
  const cache = CacheService.getDocumentCache();
  const lockKey = 'procesando_confirmacion_' + sheetOrigen.getName() + '_' + fila;

  if (cache.get(lockKey)) {
    Logger.log('⚠️ Ya se está procesando confirmación para esta fila, ignorando duplicado');
    return;
  }

  // Marcar como en proceso por 30 segundos
  cache.put(lockKey, 'true', 30);

  try {
    // Verificar si esta fila ya fue procesada (por color de fondo)
    const bgColor = sheetOrigen.getRange(fila, 1).getBackground().toLowerCase();
    if (bgColor === '#d4edda') {
      ss.toast('✅ Esta fila ya fue procesada como "Vino" (en Terapias Individual).', 'Ya Procesado', 4);
      return;
    }
    if (bgColor === '#f8d7da') {
      ss.toast('✅ Esta fila ya fue procesada como "No vino" (en Personas no asistidas).', 'Ya Procesado', 4);
      return;
    }

    // Leer todos los datos necesarios de Hoja de interés (B-N)
    const creemosId = sheetOrigen.getRange(fila, 2).getValue();   // B: Creamos ID
    const nombres = sheetOrigen.getRange(fila, 4).getValue();     // D: Nombre(s)
    const apellidos = sheetOrigen.getRange(fila, 5).getValue();   // E: Apellido(s)
    const genero = sheetOrigen.getRange(fila, 6).getValue();      // F: Género
    const edad = sheetOrigen.getRange(fila, 7).getValue();        // G: Edad
    const telefono = sheetOrigen.getRange(fila, 8).getValue();    // H: Teléfono
    const programas = sheetOrigen.getRange(fila, 11).getValue();  // K: Programas Interés
    const terapeuta = sheetOrigen.getRange(fila, COL_TERAPEUTA_INTERES).getValue(); // N: Terapeuta

    // Construir nombre completo
    const nombreCompleto = [nombres, apellidos]
      .filter(v => v && v.toString().trim() !== '')
      .join(' ')
      .trim();

    if (!nombreCompleto) {
      ss.toast('⚠️ Error: No hay nombre en esta fila', 'Error', 3);
      return;
    }

    if (!terapeuta || terapeuta.toString().trim() === '') {
      // Limpiar la celda de confirmación para no dejar "Vino"/"No vino" sin procesar
      sheetOrigen.getRange(fila, COL_ASISTIO_INTERES).clearContent();
      ss.toast(
        '⚠️ No hay terapeuta asignado en esta fila.\n\n' +
        'Primero asigna un terapeuta en columna N,\nluego selecciona "Vino" o "No vino".',
        'Falta Terapeuta', 5
      );
      return;
    }

    const terapeutaNombre = terapeuta.toString().trim();
    // Usar "Apoyo Emocional" como malestar genérico (viene de Hoja de interés)
    const malestar = 'Apoyo Emocional';

    Logger.log('Procesando confirmación: ' + nombreCompleto + ' - ' + confirmacion);

    if (confirmacion === 'Vino') {
      // SI VINO: enviar a Terapias Individual
      Logger.log('Enviando a Terapias Individual: ' + nombreCompleto);
      enviarATerapias(nombreCompleto, creemosId, genero, edad, malestar, terapeutaNombre, sheetOrigen, fila);
    } else if (confirmacion === 'No vino') {
      // NO VINO: Sistema de 5 llamadas antes de enviar a Personas no asistidas
      Logger.log('Procesando "No vino" - Sistema de 5 llamadas');
      procesarNoVinoConLlamadas(nombreCompleto, creemosId, genero, edad, malestar, terapeutaNombre, telefono, sheetOrigen, fila);
    }
  } catch (error) {
    Logger.log('❌ ERROR en procesarConfirmacionAsistencia: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
  } finally {
    // SIEMPRE liberar el lock al terminar
    cache.remove(lockKey);
    Logger.log('✅ Lock liberado para confirmación en fila ' + fila);
  }
}

/**
 * Procesa el caso de "No vino" con sistema de 5 llamadas
 * Si no vino y es la 5ª llamada → envía a Personas no asistidas con todas las notas
 * Si no es la 5ª llamada → incrementa contador y mantiene en Lista de Espera
 */
function procesarNoVinoConLlamadas(nombre, creemosId, genero, edad, malestar, terapeuta, telefono, sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Obtener número de llamadas actual (columna P = 16)
    const llamadasActuales = sheetOrigen.getRange(fila, 16).getValue() || 0;
    const nuevasLlamadas = Number(llamadasActuales) + 1;

    Logger.log('Llamadas actuales: ' + llamadasActuales + ', nuevas llamadas: ' + nuevasLlamadas);

    // Solicitar nota de esta llamada
    const respuesta = ui.prompt(
      '📞 Llamada ' + nuevasLlamadas + ' de 5',
      'Ingrese una nota sobre esta llamada:\n\n' +
      '(Por ejemplo: "No contestó", "Canceló cita", "Número equivocado", etc.)',
      ui.ButtonSet.OK_CANCEL
    );

    if (respuesta.getSelectedButton() !== ui.Button.OK) {
      // Si cancela, limpiar la selección de "No vino" y no hacer nada
      sheetOrigen.getRange(fila, 15).clearContent();
      ss.toast('❌ Registro de llamada cancelado', 'Cancelado', 3);
      return;
    }

    const notaLlamada = respuesta.getResponseText().trim();
    if (!notaLlamada) {
      sheetOrigen.getRange(fila, 15).clearContent();
      ss.toast('⚠️ Debe ingresar una nota para registrar la llamada', 'Nota requerida', 3);
      return;
    }

    // Obtener notas anteriores (columna Q = 17, oculta)
    const notasAnteriores = sheetOrigen.getRange(fila, 17).getValue() || '';
    const todasLasNotas = notasAnteriores
      ? notasAnteriores + '\n' + 'Llamada ' + nuevasLlamadas + ': ' + notaLlamada
      : 'Llamada ' + nuevasLlamadas + ': ' + notaLlamada;

    // Actualizar contador de llamadas (columna P = 16)
    sheetOrigen.getRange(fila, 16).setValue(nuevasLlamadas);

    // Guardar todas las notas en columna Q = 17 (oculta)
    sheetOrigen.getRange(fila, 17).setValue(todasLasNotas);

    if (nuevasLlamadas >= 5) {
      // QUINTA LLAMADA: Enviar a Personas no asistidas con todas las notas
      Logger.log('5ª llamada alcanzada - Enviando a Personas no asistidas: ' + creemosId);
      enviarAPersonasNoAsistidasConNotas(creemosId, genero, edad, malestar, terapeuta, telefono, todasLasNotas, sheetOrigen, fila);
    } else {
      // AÚN NO ES LA 5ª LLAMADA: Mantener en Hoja de interés
      Logger.log('Llamada ' + nuevasLlamadas + ' registrada - Manteniendo en Hoja de interés');

      // Limpiar la selección de "No vino" para permitir nueva verificación
      sheetOrigen.getRange(fila, 15).clearContent();

      // Marcar fila en amarillo (pendiente de seguimiento)
      sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#fff3cd');

      ss.toast(
        '📞 Llamada ' + nuevasLlamadas + ' de 5 registrada\n\n' +
        '👤 ' + nombre + '\n' +
        '📝 Nota: ' + notaLlamada + '\n\n' +
        'Quedó en Hoja de interés.\n' +
        'Asignar nuevamente cuando conteste.',
        'Llamada Registrada',
        8
      );
    }

  } catch (error) {
    Logger.log('❌ ERROR en procesarNoVinoConLlamadas: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

/**
 * Envía a Personas no asistidas incluyendo todas las notas de las 5 llamadas
 */
function enviarAPersonasNoAsistidasConNotas(creemosId, genero, edad, malestar, terapeuta, telefono, notas, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const noAsistidas = ss.getSheetByName('Personas no asistidas');

    // Validar que la hoja existe
    if (!noAsistidas) {
      Logger.log('❌ ERROR: Hoja "Personas no asistidas" no existe');
      ss.toast('❌ Error: La hoja "Personas no asistidas" no existe', 'Error', 5);
      return;
    }

    Logger.log('Enviando a Personas no asistidas con notas de 5 llamadas...');

    // Verificar duplicados en Personas no asistidas (por Creamos ID)
    const datosNoAsistidas = noAsistidas.getDataRange().getValues();
    for (let i = 1; i < datosNoAsistidas.length; i++) {
      if (datosNoAsistidas[i][1] && datosNoAsistidas[i][1].toString().trim() === creemosId.toString().trim()) {
        Logger.log('⚠️ Duplicado detectado en Personas no asistidas: ' + creemosId);
        sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#f8d7da');
        ss.toast('✅ ID ' + creemosId + ' ya está en Personas no asistidas.', 'Ya Registrado', 4);
        return;
      }
    }

    // Agregar a Personas no asistidas con las notas (8 columnas sin nombre)
    const nuevaFila = noAsistidas.getLastRow() + 1;

    const registro = [
      new Date(),
      creemosId || '',
      genero || '',
      edad || '',
      malestar || '',
      terapeuta,
      telefono || '',
      notas  // Columna H: Notas de las 5 llamadas
    ];

    noAsistidas.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
    Logger.log('✅ Agregado a Personas no asistidas en fila: ' + nuevaFila);

    // Marcar fila en rojo en Hoja de interés (5 llamadas completadas - No vino)
    sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#f8d7da');
    Logger.log('✅ Fila ' + fila + ' marcada en rojo en Hoja de interés (5 llamadas - No vino)');

    SpreadsheetApp.flush();
    ss.toast(
      '🔴 5 LLAMADAS COMPLETADAS\n\n' +
      '🆔 ' + creemosId + '\n' +
      '→ Enviado a Personas no asistidas\n\n' +
      '📝 Con notas de todas las llamadas',
      'No Asistió - 5 Llamadas',
      8
    );
    Logger.log('✅ Proceso de 5 llamadas completado');
  } catch (error) {
    Logger.log('❌ ERROR en enviarAPersonasNoAsistidasConNotas: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function enviarATerapias(nombre, creemosId, genero, edad, malestar, terapeuta, sheetOrigen, fila) {
  // LockService: evita condición de carrera cuando el trigger dispara doble
  const lock = LockService.getDocumentLock();
  try {
    lock.waitLock(8000); // espera hasta 8 segundos
  } catch (e) {
    Logger.log('⚠️ No se pudo obtener lock: ' + e.message);
    SpreadsheetApp.getActiveSpreadsheet().toast('⚠️ Sistema ocupado, intenta de nuevo', 'Espera', 3);
    return;
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const terapias = ss.getSheetByName('Terapias Individual');

    // Validar que la hoja existe
    if (!terapias) {
      Logger.log('❌ ERROR: Hoja "Terapias Individual" no existe');
      ss.toast('❌ Error: Falta hoja Terapias Individual', 'Error', 5);
      return;
    }

    Logger.log('Iniciando envío a Terapias Individual...');

    // Verificar duplicados ACTIVOS en Terapias (solo filas con estado "En proceso")
    // Nota: retirxs y procesos culminados permanecen en Terapias con otro color,
    // por eso se filtra por estado para no bloquear nuevas asignaciones.
    const datosTerapias = terapias.getDataRange().getValues();
    for (let i = 1; i < datosTerapias.length; i++) {
      const nombreTerapia = datosTerapias[i][3];  // Columna D: Participante
      const estadoTerapia = datosTerapias[i][8];  // Columna I: Estado
      if (nombreTerapia && nombreTerapia.toString().trim() === nombre &&
          estadoTerapia && estadoTerapia.toString().trim() === 'En proceso') {
        Logger.log('Duplicado activo encontrado en Terapias Individual: ' + nombre);
        // No borrar — la fila se conserva en Lista de Espera con color verde
        sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#d4edda');
        ss.toast('✅ ' + nombre + ' ya está en Terapias Individual (En proceso).', 'Ya en Terapias', 4);
        return;
      }
    }

    // Crear registro en Terapias
    const nuevaFilaTerapias = terapias.getLastRow() + 1;
    const fechaIngreso = new Date();

    // Segunda verificación justo antes de escribir (datos frescos, con lock activo)
    const datosFrescos = terapias.getDataRange().getValues();
    for (let i = 1; i < datosFrescos.length; i++) {
      if (datosFrescos[i][3] && datosFrescos[i][3].toString().trim() === nombre &&
          datosFrescos[i][8] && datosFrescos[i][8].toString().trim() === 'En proceso') {
        Logger.log('⚠️ Duplicado detectado en verificación final (race condition evitada): ' + nombre);
        sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#d4edda');
        ss.toast('✅ ' + nombre + ' ya está en Terapias Individual (duplicado prevenido).', 'Ya en Terapias', 4);
        return;
      }
    }

    const registroTerapias = [
      fechaIngreso,       // A: Fecha de Ingreso (automática)
      terapeuta,          // B: Terapeuta
      creemosId || '',    // C: Creamos ID
      nombre,             // D: Participante
      malestar || '',     // E: Malestar Inicial
      genero || '',       // F: Género
      edad || '',         // G: Edad
      0,                  // H: No. Sesión
      'En proceso',       // I: Estado
      '',                 // J: Motivo Finalización
      0,                  // K: Sesiones Mes Anterior
      0,                  // L: Inasistencias
      0                   // M: Asistencias
    ];
    terapias.getRange(nuevaFilaTerapias, 1, 1, 13).setValues([registroTerapias]);
    Logger.log('✅ Agregado a Terapias en fila: ' + nuevaFilaTerapias);

    // Marcar fila en verde en Hoja de interés (procesada — Vino)
    sheetOrigen.getRange(fila, 1, 1, 15).setBackground('#d4edda');
    Logger.log('✅ Fila ' + fila + ' marcada en verde en Hoja de interés (Vino - procesada)');

    SpreadsheetApp.flush();
    ss.toast('✅ ' + nombre + '\n→ Terapias Individual con ' + terapeuta + '\n\n🟢 Fila verde en Hoja de interés', 'Asignado', 5);
    Logger.log('✅ Proceso completado exitosamente');
  } catch (error) {
    Logger.log('❌ ERROR en enviarATerapias: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  } finally {
    lock.releaseLock();
  }
}

function enviarAPersonasNoAsistidas(creemosId, genero, edad, malestar, terapeuta, telefono, sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const noAsistidas = ss.getSheetByName('Personas no asistidas');

    Logger.log('Iniciando envío a Personas no asistidas...');

    // Verificar duplicados en Personas no asistidas (por Creamos ID)
    const datosNoAsistidas = noAsistidas.getDataRange().getValues();
    for (let i = 1; i < datosNoAsistidas.length; i++) {
      if (datosNoAsistidas[i][1] && datosNoAsistidas[i][1].toString().trim() === creemosId.toString().trim()) { // Columna B (índice 1): Creamos ID
        Logger.log('⚠️ Duplicado detectado en Personas no asistidas: ' + creemosId);
        // No borrar — marcar rojo en Hoja de interés
        sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#f8d7da');
        ss.toast('✅ ID ' + creemosId + ' ya está en Personas no asistidas.', 'Ya Registrado', 4);
        return;
      }
    }

    // Usar getLastRow() + 1 para agregar al final
    const nuevaFila = noAsistidas.getLastRow() + 1;

    const registro = [
      new Date(),
      creemosId || '',
      genero || '',
      edad || '',
      malestar || '',
      terapeuta,
      telefono || '',
      ''  // Columna H: Notas de llamadas (vacío si no hay sistema de 5 llamadas)
    ];

    noAsistidas.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
    Logger.log('✅ Agregado a Personas no asistidas en fila: ' + nuevaFila);

    // Marcar fila en rojo en Hoja de interés (procesada — No vino)
    sheetOrigen.getRange(fila, 1, 1, 17).setBackground('#f8d7da');
    Logger.log('✅ Fila ' + fila + ' marcada en rojo en Hoja de interés (No vino - procesada)');

    SpreadsheetApp.flush();
    ss.toast('⚠️ ID ' + creemosId + '\n→ Personas no asistidas (NO VINO)\n\n🔴 Fila roja en Hoja de interés', 'No Asistió', 5);
    Logger.log('✅ Proceso de no asistencia completado');
  } catch (error) {
    Logger.log('❌ ERROR en enviarAPersonasNoAsistidas: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('❌ Error: ' + error.message, 'Error', 5);
  }
}

function asignarATerapias(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  // Obtener datos: C (Nombre), D (Creamos ID), E (Género), F (Edad), G (Malestar)
  const datos = sheetOrigen.getRange(fila, 3, 1, 5).getValues()[0] || ['', '', '', '', ''];
  const nombre = datos[0];       // C: Nombre Completo
  const creemosId = datos[1];    // D: Creamos ID
  const genero = datos[2];       // E: Género
  const edad = datos[3] || '';   // F: Edad
  const malestar = datos[4] || ''; // G: Malestar Principal

  if (!nombre || nombre.toString().trim() === '') {
    ss.toast('⚠️ Debe ingresar un nombre primero', 'Error', 2);
    return;
  }

  const nombreLimpio = nombre.toString().trim();

  // Verificar duplicados en Terapias (Participante ahora en columna D, índice 3)
  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][3] && datosTerapias[i][3].toString().trim() === nombreLimpio) { // Columna D (índice 3): Participante
      sheetOrigen.getRange(fila, 1, 1, 7).setBackground('#fff3cd');
      ss.toast(nombreLimpio + ' ya está en Terapias Individual', 'Ya Asignado', 2);
      return;
    }
  }

  // Crear registro en Terapias
  // Buscar la primera fila vacía (columna D debe estar vacía - Participante)
  let nuevaFila = 2; // Empezar después del header
  const maxFilas = 200;

  for (let i = 2; i <= maxFilas; i++) {
    const participanteExistente = terapias.getRange(i, 4).getValue(); // Columna D: Participante
    if (!participanteExistente || participanteExistente.toString().trim() === '') {
      nuevaFila = i;
      break;
    }
  }

  const registro = [
    new Date(),         // A: Fecha de Ingreso (automática - fecha actual)
    terapeuta,          // B: Terapeuta
    creemosId || '',    // C: Creamos ID
    nombreLimpio,       // D: Participante
    malestar || '',     // E: Malestar Inicial
    genero || '',       // F: Género
    edad || '',         // G: Edad
    0,                  // H: No. Sesión
    'En proceso',       // I: Estado
    '',                 // J: Motivo Finalización
    0,                  // K: Sesiones Mes Anterior
    0,                  // L: Inasistencias
    0                   // M: Asistencias
  ];

  terapias.getRange(nuevaFila, 1, 1, 13).setValues([registro]);

  // Marcar como procesado
  sheetOrigen.getRange(fila, 1, 1, 7).setBackground('#d4edda');

  SpreadsheetApp.flush(); // Forzar actualización
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta + '\nCaso creado en Terapias Individual', 'Asignado', 3);
}

/**
 * Registra la asistencia a una sesión de terapia
 * Pregunta si el participante vino o no vino a la sesión
 * Si vino: mantiene el nuevo número de sesión
 * Si no vino: revierte el número de sesión al anterior e incrementa inasistencias
 */
function registrarAsistenciaSesion(sheet, fila, numSesion, valorAnterior) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // PROTECCIÓN ADICIONAL: Verificar si ya se está procesando esta fila con este número de sesión
  const cache = CacheService.getDocumentCache();
  const lockKey = 'procesando_sesion_' + sheet.getName() + '_' + fila + '_' + numSesion;

  if (cache.get(lockKey)) {
    Logger.log('⚠️ Ya se está procesando asistencia para esta fila, ignorando duplicado');
    return;
  }

  // Marcar como en proceso por 8 segundos (solo previene doble disparo, no bloquea ediciones futuras)
  cache.put(lockKey, 'true', 8);

  // Obtener datos del participante
  const participante = sheet.getRange(fila, 4).getValue(); // Columna D: Participante
  const terapeuta = sheet.getRange(fila, 2).getValue();    // Columna B: Terapeuta

  if (!participante || participante.toString().trim() === '') {
    Logger.log('⚠️ No hay participante en esta fila, ignorando');
    cache.remove(lockKey); // Liberar el lock
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

  try {
    if (respuesta === ui.Button.YES) {
      // Vino a la sesión - mantener el nuevo número de sesión e incrementar asistencias
      Logger.log('✅ Participante asistió a la sesión ' + numSesion);
      Logger.log('✅ Número de sesión se mantiene en: ' + numSesion);

      // Incrementar contador de asistencias (Columna M: Asistencias)
      const asistenciasActuales = sheet.getRange(fila, 13).getValue() || 0;
      const nuevasAsistencias = parseInt(asistenciasActuales) + 1;
      sheet.getRange(fila, 13).setValue(nuevasAsistencias);

      Logger.log('📊 Asistencias actualizadas: ' + asistenciasActuales + ' → ' + nuevasAsistencias);

      ss.toast('✅ Asistencia registrada\n\n' + nombre + ' asistio a la sesion ' + numSesion + '\nTotal asistencias: ' + nuevasAsistencias, 'Vino', 3);

    } else if (respuesta === ui.Button.NO) {
      // No vino - REVERTIR número de sesión al anterior e incrementar inasistencias
      Logger.log('⚠️ Participante NO asistió a la sesión');

      // Revertir el número de sesión al valor anterior
      const sesionAnterior = valorAnterior || (parseInt(numSesion) - 1);
      sheet.getRange(fila, 8).setValue(sesionAnterior); // Columna H: No. Sesión
      Logger.log('📊 Número de sesión revertido: ' + numSesion + ' → ' + sesionAnterior);

      // Incrementar contador de inasistencias
      const inasistenciasActuales = sheet.getRange(fila, 12).getValue() || 0; // Columna L: Inasistencias
      const nuevasInasistencias = parseInt(inasistenciasActuales) + 1;
      sheet.getRange(fila, 12).setValue(nuevasInasistencias); // Columna L

      Logger.log('📊 Inasistencias actualizadas: ' + inasistenciasActuales + ' → ' + nuevasInasistencias);

      ss.toast(
        'INASISTENCIA REGISTRADA\n\n' +
        nombre + ' NO asistio\n\n' +
        'Numero de sesion revertido: ' + numSesion + ' → ' + sesionAnterior + '\n' +
        'Total inasistencias: ' + nuevasInasistencias,
        'No vino',
        5
      );
    } else {
      // Usuario canceló - revertir el cambio
      Logger.log('⚠️ Usuario canceló el registro de asistencia');
      const sesionAnterior = valorAnterior || (parseInt(numSesion) - 1);
      sheet.getRange(fila, 8).setValue(sesionAnterior); // Revertir cambio - Columna H: No. Sesión
      Logger.log('📊 Número de sesión revertido por cancelación: ' + numSesion + ' → ' + sesionAnterior);
    }
  } finally {
    // SIEMPRE liberar el lock al terminar
    cache.remove(lockKey);
    Logger.log('✅ Lock liberado para fila ' + fila);
  }
}

/**
 * Muestra un diálogo para seleccionar motivo de retiro usando ui.prompt
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
    'Motivo de Retiro',
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
 * Procesa la finalización de terapia (Proceso culminado o retirxs)
 */
function procesarFinalizacionTerapia(sheetOrigen, fila, tipoFinal) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // PROTECCIÓN ADICIONAL: Verificar si ya se está procesando esta fila
  const cache = CacheService.getDocumentCache();
  const lockKey = 'procesando_finalizacion_' + sheetOrigen.getName() + '_' + fila;

  if (cache.get(lockKey)) {
    Logger.log('⚠️ Ya se está procesando finalización para esta fila, ignorando duplicado');
    return;
  }

  // Marcar como en proceso por 30 segundos (puede tardar más por los diálogos)
  cache.put(lockKey, 'true', 30);

  try {
    const datos = sheetOrigen.getRange(fila, 1, 1, 13).getValues()[0] || new Array(13).fill('');
  const fechaIngreso = datos[0];    // A: Fecha de Ingreso
  const terapeuta = datos[1];       // B: Terapeuta
  const creemosId = datos[2];       // C: Creamos ID
  const participante = datos[3];    // D: Participante
  const malestar = datos[4];        // E: Malestar Inicial
  const genero = datos[5];          // F: Género
  const edad = datos[6];            // G: Edad
  const numSesion = datos[7];       // H: No. Sesión
  const inasistencias = datos[11] || 0; // L: Inasistencias

  if (!participante || participante.toString().trim() === '') {
    ss.toast('⚠️ Error: No hay participante en esta fila', 'Error', 3);
    return;
  }

  const nombre = participante.toString().trim();

  let motivo = '';

  // Solo para RETIRADX pedir motivo con diálogo
  if (tipoFinal === 'retirxs') {
    try {
      Logger.log('📋 Solicitando motivo de retiro para: ' + nombre);
      motivo = mostrarDialogoMotivoDesercion(nombre, terapeuta, numSesion);
      Logger.log('✅ Motivo recibido: ' + motivo);

      if (!motivo || motivo === '') {
        // Usuario canceló o no seleccionó nada
        Logger.log('⚠️ Usuario canceló o no seleccionó motivo');
        sheetOrigen.getRange(fila, 9).setValue('En proceso'); // Columna I: Estado
        ss.toast('❌ Retiro cancelada\n\nNo se seleccionó motivo', 'Cancelado', 3);
        return;
      }
    } catch (error) {
      // Error al mostrar diálogo - probablemente el trigger no está instalado
      Logger.log('❌ Error mostrando diálogo: ' + error.message);
      Logger.log('   Stack: ' + error.stack);
      sheetOrigen.getRange(fila, 9).setValue('En proceso'); // Columna I: Estado

      ss.toast(
        '⚠️ ERROR: No se puede mostrar el diálogo\n\n' +
        'Para que funcione el diálogo de retirxs, debe:\n' +
        '1. Ir al menú: 🏥 Apoyo Emocional\n' +
        '2. Hacer clic en: ✏️ Instalar Trigger onEdit\n' +
        '3. Autorizar los permisos\n\n' +
        'Después de instalar el trigger, vuelva a seleccionar "retirxs".\n\n' +
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

  Logger.log('💾 Guardando motivo en columna J: ' + tipoFinal + ': ' + motivo);
  // Guardar motivo en columna J
  sheetOrigen.getRange(fila, 10).setValue(tipoFinal + ': ' + motivo);

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
    ok = copiarACulminados(terapeuta, creemosId, numSesion, motivo);
  } else if (tipoFinal === 'retirxs') {
    Logger.log('📂 Copiando a Retiradx...');
    Logger.log('   Creamos ID: ' + creemosId);
    Logger.log('   Terapeuta: ' + terapeuta);
    Logger.log('   Motivo: ' + motivo);
    ok = copiarADeserciones(terapeuta, creemosId, numSesion, motivo);
  }

  if (ok) {
    Logger.log('✅ Copia exitosa');

    if (tipoFinal === 'retirxs') {
      // Para retirxs: marcar en rojo, mostrar mensaje. NO se elimina la fila.
      sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#f8d7da');
      SpreadsheetApp.flush(); // Forzar actualización visual

      ss.toast(
        '✅ DESERCIÓN REGISTRADA\n\n' +
        'Participante: ' + nombre + '\n' +
        'Motivo: ' + motivo + '\n' +
        'Sesiones: ' + numSesion + '\n\n' +
        'Copiado a hoja Retiradx\n' +
        'El registro permanece en Terapias Individual (marcado en rojo)',
        'Retiro Registrada',
        6
      );

      Logger.log('✅ Retiro procesada. Fila conservada en Terapias con color rojo.');

    } else if (tipoFinal === 'Proceso culminado') {
      // Para procesos culminados: marcar en verde. NO se elimina la fila.
      sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');
      SpreadsheetApp.flush(); // Forzar actualización visual

      ss.toast(
        '✅ PROCESO CULMINADO\n\n' +
        'Participante: ' + nombre + '\n' +
        'Sesiones: ' + numSesion + '\n\n' +
        'Copiado a Procesos Culminados\n' +
        'El registro permanece en Terapias Individual (marcado en verde)',
        'Proceso Completado',
        6
      );

      Logger.log('✅ Proceso culminado. Fila conservada en Terapias con color verde.');
    }
  } else {
    Logger.log('❌ Error al copiar a la hoja');
    ss.toast('❌ Error al copiar a la hoja de ' + tipoFinal, 'Error', 5);
  }

  } catch (error) {
    Logger.log('❌ ERROR en procesarFinalizacionTerapia: ' + error.toString());
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
  } finally {
    // SIEMPRE liberar el lock al terminar
    cache.remove(lockKey);
    Logger.log('✅ Lock liberado para fila ' + fila);
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
    Logger.log('🔍 Intentando enviar email a ' + terapeuta);

    const emailTerapeuta = obtenerEmailTerapeuta(terapeuta);
    Logger.log('   Email obtenido: ' + (emailTerapeuta || 'NO CONFIGURADO'));

    if (!emailTerapeuta || emailTerapeuta === '') {
      Logger.log('⚠️ No hay email configurado para ' + terapeuta);
      Logger.log('⚠️ RETORNANDO FALSE - NO SE ENVIARÁ EMAIL');
      return false; // No mostrar toast aquí - se maneja en asignarTerapeuta
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
      '• Si VINO → Terapias Individual (trabajo activo)\n' +
      '• Si NO VINO → Personas no asistidas (sin registro)\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Sistema de Apoyo Emocional\n' +
      'Notificación automática';

    Logger.log('📧 Enviando email a: ' + emailTerapeuta);
    Logger.log('   Asunto: ' + asunto);

    MailApp.sendEmail(emailTerapeuta, asunto, cuerpo);

    Logger.log('✅ Email enviado exitosamente a ' + terapeuta + ' (' + emailTerapeuta + ')');
    return true;

  } catch (error) {
    Logger.log('❌ ERROR ENVIANDO EMAIL: ' + error.message);
    Logger.log('   Stack: ' + error.stack);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ ERROR ENVIANDO EMAIL\n\n' +
      'Error: ' + error.message + '\n\n' +
      'Revisa que tienes permisos para enviar emails.',
      'Error de Email',
      10
    );
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
 * Prueba el envío de emails a los terapeutas
 * Verifica cuáles tienen email configurado y permite enviar emails de prueba
 */
function probarEmailsTerapeutas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();

  ss.toast('🔍 Verificando configuración de emails...', 'Diagnóstico', 2);

  const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
  let resumen = '📋 ESTADO DE EMAILS DE TERAPEUTAS\n\n';
  let configurados = 0;
  let noConfigurados = 0;

  const emailsConfigurados = {};

  terapeutas.forEach(terapeuta => {
    const email = props.getProperty('EMAIL_' + terapeuta.toUpperCase());
    if (email && email !== '') {
      resumen += '✅ ' + terapeuta + ': ' + email + '\n';
      emailsConfigurados[terapeuta] = email;
      configurados++;
    } else {
      resumen += '❌ ' + terapeuta + ': NO CONFIGURADO\n';
      noConfigurados++;
    }
  });

  resumen += '\n━━━━━━━━━━━━━━━━━━━━\n';
  resumen += 'Total configurados: ' + configurados + '/4\n';
  resumen += 'Sin configurar: ' + noConfigurados + '/4\n\n';

  if (noConfigurados > 0) {
    resumen += '⚠️ IMPORTANTE:\n';
    resumen += 'Para que los emails se envíen,\n';
    resumen += 'debes configurar los emails primero:\n\n';
    resumen += 'Menú → 🔧 Configuración\n';
    resumen += '→ 👥 Configurar Emails Terapeutas\n\n';
  }

  if (configurados === 0) {
    ui.alert(
      '❌ No Hay Emails Configurados',
      resumen,
      ui.ButtonSet.OK
    );
    return;
  }

  resumen += '¿Deseas enviar un email de PRUEBA\n';
  resumen += 'a los terapeutas configurados?';

  const confirmacion = ui.alert(
    '🔍 Diagnóstico de Emails',
    resumen,
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    return;
  }

  // Enviar emails de prueba
  ss.toast('📧 Enviando emails de prueba...', 'Enviando', 3);

  let exitos = 0;
  let errores = 0;
  let resultados = '\n📊 RESULTADOS:\n\n';

  for (const [terapeuta, email] of Object.entries(emailsConfigurados)) {
    try {
      const asunto = '✅ Prueba - Asignación de Caso';
      const cuerpo =
        'Hola ' + terapeuta + ',\n\n' +
        '✅ ESTE ES UN EMAIL DE PRUEBA ✅\n\n' +
        'Si recibes este email, significa que el sistema\n' +
        'está funcionando correctamente.\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        'Cuando se te asigne un caso real, recibirás\n' +
        'un email similar con la información del paciente\n' +
        'y las instrucciones para confirmar asistencia.\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        '📧 Tu email: ' + email + '\n' +
        '📅 Fecha de prueba: ' + new Date().toLocaleString() + '\n' +
        '📊 Google Sheet: ' + ss.getName() + '\n\n' +
        '✅ El sistema está listo para enviarte notificaciones.\n\n' +
        '---\n' +
        'Sistema de Apoyo Emocional\n' +
        'Notificación Automática';

      Logger.log('📧 Enviando email de prueba a ' + terapeuta + ' (' + email + ')');
      MailApp.sendEmail(email, asunto, cuerpo);

      resultados += '✅ ' + terapeuta + ': EMAIL ENVIADO\n';
      exitos++;
      Logger.log('✅ Email enviado exitosamente a ' + terapeuta);

    } catch (error) {
      resultados += '❌ ' + terapeuta + ': ERROR\n';
      resultados += '   → ' + error.message + '\n';
      errores++;
      Logger.log('❌ Error enviando email a ' + terapeuta + ': ' + error.message);
    }
  }

  resultados += '\n━━━━━━━━━━━━━━━━━━━━\n';
  resultados += 'Enviados: ' + exitos + '\n';
  resultados += 'Errores: ' + errores + '\n\n';

  if (exitos > 0) {
    resultados += '✅ Los terapeutas con email configurado\n';
    resultados += 'deben recibir el email de prueba.\n\n';
    resultados += 'Revisa tu bandeja de entrada o spam.\n\n';
  }

  if (errores > 0) {
    resultados += '❌ Hubo errores al enviar algunos emails.\n';
    resultados += 'Revisa los permisos en Apps Script:\n';
    resultados += 'Extensiones → Apps Script → Permisos\n\n';
  }

  ui.alert(
    '📧 Prueba de Emails Completada',
    resultados,
    ui.ButtonSet.OK
  );

  ss.toast(
    '✅ Prueba completada\n\n' +
    'Enviados: ' + exitos + '\n' +
    'Errores: ' + errores,
    'Finalizado',
    5
  );
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

function copiarACulminados(terapeuta, creemosId, sesiones, motivo) {
  // LOCK para prevenir inserciones concurrentes
  const lock = LockService.getDocumentLock();
  try {
    // Esperar hasta 10 segundos para obtener el lock
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Procesos Culminados');

    // VERIFICAR SI YA EXISTE para evitar duplicados
    const datos = sheet.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      const idExistente = datos[i][1]; // Columna B: Creamos ID
      if (idExistente && idExistente.toString().trim() === creemosId.toString().trim()) {
        Logger.log('⚠️ Participante ya existe en Procesos Culminados: ' + creemosId);
        ss.toast(
          '⚠️ DUPLICADO DETECTADO\n\n' +
          'ID ' + creemosId + ' ya está en Procesos Culminados.\n\n' +
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
      const idExistente = sheet.getRange(i, 2).getValue(); // Columna B: Creamos ID
      if (!idExistente || idExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

    const datosNuevos = [new Date(), creemosId || '', terapeuta, parseInt(sesiones) || 1, motivo];

    sheet.getRange(nuevaFila, 1, 1, 5).setValues([datosNuevos]);
    Logger.log('✅ Agregado a Procesos Culminados: ' + creemosId + ' en fila ' + nuevaFila);
    return true;
  } catch (error) {
    Logger.log('❌ Error culminados: ' + error.message);
    return false;
  } finally {
    // SIEMPRE liberar el lock
    lock.releaseLock();
  }
}

function copiarADeserciones(terapeuta, creemosId, sesiones, motivo) {
  // LOCK para prevenir inserciones concurrentes
  const lock = LockService.getDocumentLock();
  try {
    // Esperar hasta 10 segundos para obtener el lock
    lock.waitLock(10000);

    Logger.log('🔍 copiarADeserciones - Inicio');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Retiradx');

    if (!sheet) {
      Logger.log('❌ Hoja "Retiradx" no encontrada');
      ss.toast('❌ Error: Hoja "Retiradx" no existe', 'Error', 5);
      return false;
    }

    Logger.log('✅ Hoja Retiradx encontrada');

    // VERIFICAR SI YA EXISTE para evitar duplicados
    const datos = sheet.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      const idExistente = datos[i][1]; // Columna B: Creamos ID
      if (idExistente && idExistente.toString().trim() === creemosId.toString().trim()) {
        Logger.log('⚠️ Participante ya existe en Retiradx: ' + creemosId);
        ss.toast(
          '⚠️ DUPLICADO DETECTADO\n\n' +
          'ID ' + creemosId + ' ya está en Retiradx.\n\n' +
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
      const idExistente = sheet.getRange(i, 2).getValue(); // Columna B: Creamos ID
      if (!idExistente || idExistente.toString().trim() === '') {
        nuevaFila = i;
        break;
      }
    }

    Logger.log('📍 Nueva fila para retiro: ' + nuevaFila);

    const datosNuevos = [new Date(), creemosId || '', terapeuta, parseInt(sesiones) || 1, motivo];

    Logger.log('📝 Datos a guardar:');
    Logger.log('   Fecha: ' + new Date());
    Logger.log('   Creamos ID: ' + (creemosId || ''));
    Logger.log('   Terapeuta: ' + terapeuta);
    Logger.log('   Sesiones: ' + (parseInt(sesiones) || 1));
    Logger.log('   Motivo: ' + motivo);

    sheet.getRange(nuevaFila, 1, 1, 5).setValues([datosNuevos]);
    Logger.log('✅ Datos guardados en fila ' + nuevaFila + ' de hoja Retiradx');

    return true;
  } catch (error) {
    Logger.log('❌ Error en copiarADeserciones: ' + error.message);
    Logger.log('   Stack: ' + error.stack);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.toast('❌ Error al copiar a Retiradx: ' + error.message, 'Error', 5);
    return false;
  } finally {
    // SIEMPRE liberar el lock
    lock.releaseLock();
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

    // Detectar si el layout activo es el nuevo dashboard o el antiguo
    const a4val = (reporte.getRange('A4').getValue() || '').toString();
    const esNuevoDashboard = a4val.includes('RESUMEN GENERAL');

    if (esNuevoDashboard) {
      // Nuevo dashboard: verificar si fue corrompido por actualizarFormulasReporte()
      // Síntoma: B11 es un número (debería ser "Casos Activos") o
      //          la celda de Bienestar en fila 20 usa COUNTA en vez de COUNTIFS
      const b11val = reporte.getRange(11, 2).getValue();
      const fC20   = reporte.getRange(20, 3).getFormula();
      const dashboardCorrompido = (typeof b11val === 'number') ||
        (fC20 && fC20.toUpperCase().includes('COUNTA'));
      if (dashboardCorrompido) {
        Logger.log('🔧 actualizarReportes: dashboard corrompido — reconstruyendo...');
        _construirReporteDashboard_();
      }
    } else {
      // Layout antiguo: auto-reparar fórmulas si están desactualizadas
      const fB11 = reporte.getRange('B11').getFormula();
      const fB5  = reporte.getRange('B5').getFormula();
      const fB38 = reporte.getRange('B38').getFormula();
      const fD24 = reporte.getRange('D24').getFormula();
      const fC17 = reporte.getRange('C17').getFormula();
      const necesitaReparacion = !fB5 || !fB5.startsWith('=') ||
                                 (fB11 && !fB11.includes('Lista de Espera\'!I')) ||
                                 !reporte.getRange('A37').getValue() ||
                                 (fB38 && fB38.includes('!B:B')) ||
                                 (fD24 && fD24.includes('AVERAGE')) ||
                                 (fC17 && fC17.includes('"En proceso"'));
      if (necesitaReparacion) {
        Logger.log('🔧 actualizarReportes: reparando fórmulas desactualizadas...');
        actualizarFormulasReporte();
      }
    }

    // Actualizar sello de tiempo
    reporte.getRange('B2').setFormula('=TEXT(NOW(),"DD/MM/YYYY HH:MM")');

    // Forzar recalculo
    SpreadsheetApp.flush();

    try {
      ss.toast('✅ Reporte actualizado — ' + new Date().toLocaleTimeString(), 'Reporte', 3);
    } catch (e) { /* sin UI en trigger automático */ }

    Logger.log('📊 Reportes actualizados: ' + new Date());
    return true;
  } catch (error) {
    Logger.log('❌ Error actualizando reportes: ' + error.message);
    try {
      SpreadsheetApp.getActiveSpreadsheet().toast('Error al actualizar reportes: ' + error.message, 'Error', 3);
    } catch (e) { /* ignorar */ }
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

    // Crear nuevo trigger que se ejecute cada 10 minutos
    ScriptApp.newTrigger('actualizarReportes')
      .timeBased()
      .everyMinutes(10)
      .create();

    SpreadsheetApp.getActiveSpreadsheet().toast(
      '✅ Trigger instalado correctamente\n\nLos reportes se actualizarán automáticamente cada 10 minutos',
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
    // Comparar con el último día real del mes de mañana
    const ultimoDiaDelMes = new Date(manana.getFullYear(), manana.getMonth() + 1, 0);
    if (manana.getDate() === ultimoDiaDelMes.getDate()) {
      // Mañana es el último día del mes: hoy es el penúltimo, enviar recordatorio
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
      '- Seleccione "Proceso culminado" en Estado de Terapias Individual\n' +
      '- Seleccione "retirxs" en Estado de Terapias Individual',
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

/**
 * Limpia todas las hojas de trabajo para empezar un nuevo mes limpio.
 * Se llama después de guardar el reporte en el historial.
 */
/**
 * Rediseña la hoja Reporte estilo dashboard con tarjetas de colores grandes.
 * Inspirado en el diseño del sistema de Inclusión Laboral.
 * Usa 6 columnas (A-F) con tarjetas visuales y secciones claras.
 */
function actualizarDisenoReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const confirmar = ui.alert(
    '🎨 Rediseñar Reporte',
    '¿Deseas rediseñar la hoja Reporte con el nuevo formato dashboard?\n\n' +
    'Esto reemplazará todo el contenido actual de la hoja Reporte.',
    ui.ButtonSet.YES_NO
  );
  if (confirmar !== ui.Button.YES) return;

  _construirReporteDashboard_();
}

function _construirReporteDashboard_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('🎨 Construyendo dashboard...', 'Diseño', -1);

  let reporte = ss.getSheetByName('Reporte');
  if (!reporte) {
    reporte = ss.insertSheet('Reporte');
  }

  reporte.clearContents();
  reporte.clearFormats();

  // Asegurar que hay suficientes columnas y filas
  if (reporte.getMaxColumns() < 6) reporte.insertColumns(reporte.getMaxColumns() + 1, 6 - reporte.getMaxColumns());
  if (reporte.getMaxRows() < 35) reporte.insertRows(reporte.getMaxRows() + 1, 35 - reporte.getMaxRows());

  // Ancho de columnas (6 columnas)
  reporte.setColumnWidth(1, 160);
  reporte.setColumnWidth(2, 140);
  reporte.setColumnWidth(3, 140);
  reporte.setColumnWidth(4, 140);
  reporte.setColumnWidth(5, 140);
  reporte.setColumnWidth(6, 140);

  // ═══════════════════════════════════════════════════
  // FILA 1: HEADER PRINCIPAL
  // ═══════════════════════════════════════════════════
  reporte.getRange('A1:F1').merge()
    .setValue('🏥  REPORTE — APOYO EMOCIONAL')
    .setBackground('#1a237e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(16)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(1, 50);

  // FILA 2: Fecha
  reporte.getRange('A2:C2').merge()
    .setFormula('="Última actualización:  "&TEXT(NOW(),"DD/MM/YYYY HH:MM")')
    .setHorizontalAlignment('center').setFontSize(10);
  reporte.getRange('D2:F2').merge()
    .setFormula('="Mes actual:  "&TEXT(TODAY(),"MMMM YYYY")')
    .setHorizontalAlignment('center').setFontSize(10).setFontWeight('bold');
  reporte.getRange('A2:F2').setBackground('#eceff1');

  // FILA 3: espacio
  reporte.setRowHeight(3, 10);

  // ═══════════════════════════════════════════════════
  // FILA 4: RESUMEN GENERAL
  // ═══════════════════════════════════════════════════
  reporte.getRange('A4:F4').merge()
    .setValue('📊  RESUMEN GENERAL')
    .setBackground('#37474f').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(12)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(4, 32);

  // FILA 5-6: TARJETAS SUPERIORES (3 tarjetas)
  // Tarjeta 1: Nuevos Ingresos (verde)
  reporte.getRange('A5:B5').merge().setValue('🏥 Nuevos Ingresos')
    .setBackground('#4caf50').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('A6:B6').merge()
    .setFormula('=IFERROR(COUNTA(\'Terapias Individual\'!D:D)-1,0)')
    .setBackground('#4caf50').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  // Tarjeta 2: Casos Activos (azul)
  reporte.getRange('C5:D5').merge().setValue('👥 Casos Activos')
    .setBackground('#1565c0').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('C6:D6').merge()
    .setFormula('=IFERROR(COUNTIF(\'Terapias Individual\'!I:I,"En proceso"),0)')
    .setBackground('#1565c0').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  // Tarjeta 3: Total Sesiones del Año (teal)
  reporte.getRange('E5:F5').merge().setValue('📅 Total Sesiones del Año')
    .setBackground('#00897b').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('E6:F6').merge()
    .setFormula('=IFERROR(SUM(\'Terapias Individual\'!K:K)+SUM(\'Terapias Individual\'!M:M),0)')
    .setBackground('#00897b').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  reporte.setRowHeight(5, 30);
  reporte.setRowHeight(6, 50);

  // FILA 7-8: TARJETAS INFERIORES (3 tarjetas)
  // Tarjeta 4: Culminados (verde oscuro)
  reporte.getRange('A7:B7').merge().setValue('✅ Culminados')
    .setBackground('#2e7d32').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('A8:B8').merge()
    .setFormula('=IFERROR(COUNTA(\'Procesos Culminados\'!A:A)-1,0)')
    .setBackground('#2e7d32').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  // Tarjeta 5: Retiradx (naranja)
  reporte.getRange('C7:D7').merge().setValue('⚠️ Retiradx')
    .setBackground('#ef6c00').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('C8:D8').merge()
    .setFormula('=IFERROR(COUNTA(Retiradx!A:A)-1,0)')
    .setBackground('#ef6c00').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  // Tarjeta 6: Total Inasistencias del Año (rojo)
  reporte.getRange('E7:F7').merge().setValue('❌ Total Inasistencias del Año')
    .setBackground('#c62828').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.getRange('E8:F8').merge()
    .setFormula('=IFERROR(SUM(\'Terapias Individual\'!N:N)+SUM(\'Terapias Individual\'!L:L),0)')
    .setBackground('#c62828').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(28)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  reporte.setRowHeight(7, 30);
  reporte.setRowHeight(8, 50);

  // FILA 9: espacio
  reporte.setRowHeight(9, 10);

  // ═══════════════════════════════════════════════════
  // FILA 10: CASOS POR TERAPEUTA
  // ═══════════════════════════════════════════════════
  reporte.getRange('A10:F10').merge()
    .setValue('👥  CASOS ACTIVOS POR TERAPEUTA')
    .setBackground('#37474f').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(12)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(10, 32);

  // FILA 11: Headers de tabla
  const headersTerapeutas = ['Terapeuta', 'Casos Activos', 'Sesiones Año', 'Inasistencias Año', '', ''];
  const coloresTH = ['#455a64', '#1565c0', '#00897b', '#c62828', '#455a64', '#455a64'];
  headersTerapeutas.forEach((h, i) => {
    if (h) {
      reporte.getRange(11, i + 1)
        .setValue(h)
        .setBackground(coloresTH[i]).setFontColor('#ffffff')
        .setFontWeight('bold').setFontSize(10)
        .setHorizontalAlignment('center');
    }
  });
  reporte.setRowHeight(11, 28);

  // FILA 12-15: Datos por terapeuta (sesiones e inasistencias = todo el año)
  const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
  terapeutas.forEach((t, idx) => {
    const row = 12 + idx;
    reporte.getRange(row, 1).setValue(t).setFontWeight('bold');
    reporte.getRange(row, 2).setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"' + t + '",\'Terapias Individual\'!I:I,"En proceso"),0)');
    reporte.getRange(row, 3).setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"' + t + '",\'Terapias Individual\'!K:K)+SUMIF(\'Terapias Individual\'!B:B,"' + t + '",\'Terapias Individual\'!M:M),0)');
    reporte.getRange(row, 4).setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"' + t + '",\'Terapias Individual\'!N:N)+SUMIF(\'Terapias Individual\'!B:B,"' + t + '",\'Terapias Individual\'!L:L),0)');
    reporte.getRange(row, 1, 1, 4)
      .setHorizontalAlignment('center')
      .setBackground(idx % 2 === 0 ? '#ffffff' : '#f5f5f5');
    reporte.setRowHeight(row, 26);
  });

  // FILA 16: Totales
  reporte.getRange(16, 1).setValue('TOTAL').setFontWeight('bold');
  reporte.getRange(16, 2).setFormula('=SUM(B12:B15)').setFontWeight('bold');
  reporte.getRange(16, 3).setFormula('=SUM(C12:C15)').setFontWeight('bold');
  reporte.getRange(16, 4).setFormula('=SUM(D12:D15)').setFontWeight('bold');
  reporte.getRange(16, 1, 1, 4).setBackground('#cfd8dc').setHorizontalAlignment('center');

  // FILA 17: espacio
  reporte.setRowHeight(17, 10);

  // ═══════════════════════════════════════════════════
  // FILA 18: ACTIVIDAD DEL MES
  // ═══════════════════════════════════════════════════
  reporte.getRange('A18:F18').merge()
    .setValue('📋  ACTIVIDAD DEL MES ACTUAL')
    .setBackground('#37474f').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(12)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(18, 32);

  // FILA 19: Headers
  const headersActividad = ['No Asistidas', 'Derivaciones', 'Bienestar', 'Intervención', 'Hoja Interés', 'Referencias'];
  const coloresActividad = ['#e65100', '#1565c0', '#7b1fa2', '#00695c', '#2e7d32', '#4527a0'];
  headersActividad.forEach((h, i) => {
    reporte.getRange(19, i + 1)
      .setValue(h)
      .setBackground(coloresActividad[i]).setFontColor('#ffffff')
      .setFontWeight('bold').setFontSize(10)
      .setHorizontalAlignment('center');
  });
  reporte.setRowHeight(19, 28);

  // FILA 20: Valores
  reporte.getRange(20, 1).setFormula('=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 2).setFormula('=IFERROR(COUNTIFS(\'Derivaciones Institucionales\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Derivaciones Institucionales\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 3).setFormula('=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 4).setFormula('=IFERROR(COUNTIFS(\'Intervención de casos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Intervención de casos\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 5).setFormula('=IFERROR(COUNTIFS(\'Hoja de interés\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Hoja de interés\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 6).setFormula('=IFERROR(COUNTIFS(\'Referencias de programas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Referencias de programas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(20, 1, 1, 6)
    .setFontWeight('bold').setFontSize(18)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(20, 40);

  // FILA 21: espacio
  reporte.setRowHeight(21, 10);

  // ═══════════════════════════════════════════════════
  // FILA 22: RESUMEN EJECUTIVO
  // ═══════════════════════════════════════════════════
  reporte.getRange('A22:F22').merge()
    .setValue('📝  RESUMEN EJECUTIVO')
    .setBackground('#37474f').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(12)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(22, 32);

  // Resumen en 2 columnas
  reporte.getRange(23, 1).setValue('Total Procesados:').setFontWeight('bold');
  reporte.getRange(23, 2).setFormula('=IFERROR(A8+C8+COUNTIFS(\'Intervención de casos\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Intervención de casos\'!A:A,"<="&EOMONTH(TODAY(),0)),0)').setFontWeight('bold').setFontSize(12);
  reporte.getRange(23, 4).setValue('Alertas Suicidio:').setFontWeight('bold');
  reporte.getRange(23, 5).setFormula('=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0),\'C_03_Formulario de Bienestar (2026)\'!B:B,"Sí")+COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0),\'C_03_Formulario de Bienestar (2026)\'!B:B,"Si"),0)').setFontWeight('bold').setFontSize(12);

  reporte.getRange(24, 1).setValue('Personas no Asistidas (Mes):').setFontWeight('bold');
  reporte.getRange(24, 2).setFormula('=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(24, 4).setValue('Nuevos Ingresos (Mes):').setFontWeight('bold');
  reporte.getRange(24, 5).setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Terapias Individual\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

  reporte.getRange(25, 1).setValue('Culminados (Mes):').setFontWeight('bold');
  reporte.getRange(25, 2).setFormula('=IFERROR(COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
  reporte.getRange(25, 4).setValue('Retiradx (Mes):').setFontWeight('bold');
  reporte.getRange(25, 5).setFormula('=IFERROR(COUNTIFS(Retiradx!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Retiradx!A:A,"<="&EOMONTH(TODAY(),0)),0)');

  // FILA 26: espacio
  reporte.setRowHeight(26, 8);

  // FILA 27: Footer
  reporte.getRange('A27:F27').merge()
    .setValue('Generado automáticamente — Sistema Apoyo Emocional')
    .setFontColor('#999999').setFontSize(9).setFontStyle('italic')
    .setHorizontalAlignment('center');

  // FILA 28: espacio
  reporte.setRowHeight(28, 10);

  // ═══════════════════════════════════════════════════
  // FILA 29+: TRAZABILIDAD DE MÉTRICAS
  // ═══════════════════════════════════════════════════
  reporte.getRange('A29:F29').merge()
    .setValue('🔍 TRAZABILIDAD DE MÉTRICAS (ORIGEN DE DATOS)')
    .setBackground('#eceff1').setFontWeight('bold').setFontSize(10);
  reporte.setRowHeight(29, 25);

  const traza = [
    ['Métrica', 'Valor actual', 'Hoja origen', 'Regla de cálculo', '', ''],
    ['Nuevos Ingresos', '=A6', 'Terapias Individual', 'Conteo de participantes (columna D)', '', ''],
    ['Casos Activos', '=C6', 'Terapias Individual', 'Estado = "En proceso"', '', ''],
    ['Sesiones del Mes', '=E6', 'Terapias Individual', 'Suma columna M (Asistencias)', '', ''],
    ['Culminados', '=A8', 'Procesos Culminados', 'Conteo de registros', '', ''],
    ['Retiradx', '=C8', 'Retiradx', 'Conteo de registros', '', ''],
    ['Inasistencias', '=E8', 'Terapias Individual', 'Suma columna L (Inasistencias)', '', ''],
  ];
  reporte.getRange(30, 1, traza.length, 6).setValues(traza);
  reporte.getRange(30, 1, 1, 6).setFontWeight('bold').setBackground('#eceff1');

  // ═══════════════════════════════════════════════════
  // FILA 37+: CAPTACIÓN (pipeline de ingreso)
  // ═══════════════════════════════════════════════════
  reporte.getRange('A37:F37').merge()
    .setValue('📥  CAPTACIÓN — PIPELINE DE INGRESO')
    .setBackground('#1565c0').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(12)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  reporte.setRowHeight(37, 32);

  // Headers captación
  reporte.getRange(38, 1).setValue('Fuente').setFontWeight('bold').setBackground('#455a64').setFontColor('#ffffff').setHorizontalAlignment('center');
  reporte.getRange(38, 2).setValue('Total histórico').setFontWeight('bold').setBackground('#455a64').setFontColor('#ffffff').setHorizontalAlignment('center');
  reporte.getRange(38, 3).setValue('Este mes').setFontWeight('bold').setBackground('#455a64').setFontColor('#ffffff').setHorizontalAlignment('center');
  reporte.getRange(38, 4, 1, 3).setBackground('#455a64');
  reporte.setRowHeight(38, 28);

  const captacion = [
    ['Hoja de interés (Terapia Individual)', '\'Hoja de interés\'!C:C', '\'Hoja de interés\'!A:A'],
    ['Referencias de programas recibidas',   '\'Referencias de programas\'!A:A', '\'Referencias de programas\'!A:A'],
    ['Derivaciones institucionales recibidas','\'Derivaciones Institucionales\'!A:A', '\'Derivaciones Institucionales\'!A:A'],
    ['Nuevos ingresos a Terapia Individual', '\'Terapias Individual\'!A:A', '\'Terapias Individual\'!A:A']
  ];
  const MES = '">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1)';
  const FIN = '"<="&EOMONTH(TODAY(),0)';

  captacion.forEach(([label, colTotal, colMes], idx) => {
    const row = 39 + idx;
    const bg = idx % 2 === 0 ? '#ffffff' : '#f5f5f5';
    reporte.getRange(row, 1).setValue(label).setBackground(bg).setFontSize(10).setVerticalAlignment('middle');
    reporte.getRange(row, 2).setFormula('=IFERROR(COUNTA(' + colTotal + ')-1,0)').setBackground(bg).setHorizontalAlignment('center');
    reporte.getRange(row, 3).setFormula('=IFERROR(COUNTIFS(' + colMes + ',' + MES + ',' + colMes + ',' + FIN + '),0)').setBackground(bg).setHorizontalAlignment('center');
    reporte.getRange(row, 4, 1, 3).setBackground(bg);
    reporte.setRowHeight(row, 26);
  });

  // Bordes
  reporte.getRange(38, 1, 5, 3).setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);

  // ═══════════════════════════════════════════════════
  // Bordes suaves en tablas
  // ═══════════════════════════════════════════════════
  reporte.getRange(11, 1, 6, 4).setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);
  reporte.getRange(19, 1, 2, 6).setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);

  // Congelar header
  reporte.setFrozenRows(2);

  ss.toast('✅ Dashboard creado correctamente', 'Reporte Rediseñado', 4);
  Logger.log('✅ Reporte rediseñado estilo dashboard');
}

/**
 * FUNCIÓN SEGURA: Reinicializa validaciones, formatos y desplegables
 * SIN ELIMINAR NINGÚN DATO.
 * Útil cuando hay problemas con desplegables mal ubicados o validaciones corrompidas.
 */
function reinicializarValidacionesSinDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    '✅ Reinicializar Validaciones (sin eliminar datos)',
    '¿Deseas reinicializar TODOS los desplegables y validaciones?\n\n' +
    '✓ Los datos se MANTIENEN intactos\n' +
    '✓ Los desplegables volverán a su lugar correcto\n' +
    '✓ Los formatos se restaurarán\n\n' +
    'Esto es SEGURO y puede ayudar si hay problemas con desplegables.',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    ss.toast('❌ Reinicialización cancelada', 'Cancelado', 2);
    return;
  }

  try {
    ss.toast('✅ Reinicializando validaciones y formatos...', 'Reinicializando', -1);

    // 1. Reconfigurar TODAS las validaciones (sin eliminar datos)
    configurarValidaciones();
    Logger.log('✅ Validaciones reconfigured');

    // 2. Reconfigurar formatos
    configurarFormatos();
    Logger.log('✅ Formatos reconfigurados');

    // 3. Recalcular reportes
    actualizarReportes();
    Logger.log('✅ Reportes recalculados');

    ss.toast(
      '✅ REINICIALIZACIÓN COMPLETA\n\n' +
      '✓ Todos los desplegables en lugar correcto\n' +
      '✓ Validaciones restauradas\n' +
      '✓ Formatos aplicados\n' +
      '✓ TODOS TUS DATOS SE MANTIENEN\n\n' +
      'El sistema está listo para usar.',
      'Reinicialización Exitosa',
      5
    );

    Logger.log('✅ Reinicialización segura completada');

  } catch (error) {
    ss.toast('❌ Error: ' + error.message, 'Error', 5);
    Logger.log('❌ Error en reinicialización: ' + error.message);
  }
}

function limpiarDatosParaNuevoMes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('🧹 Limpiando datos para nuevo mes...', 'Limpieza', -1);

    // TODAS las hojas de trabajo que deben limpiarse (mantener headers, eliminar datos)
    const hojasALimpiar = [
      'Terapias Individual',
      'Personas no asistidas',
      'Derivaciones Institucionales',
      'Procesos Culminados',
      'Retiradx',
      'Intervención de casos',
      'Hoja de interés',
      'Referencias de programas',
      'C_03_Formulario de Bienestar (2026)'
    ];

    let totalLimpiadas = 0;
    hojasALimpiar.forEach(nombreHoja => {
      const hoja = ss.getSheetByName(nombreHoja);
      if (hoja && hoja.getLastRow() > 1) {
        const filasAEliminar = hoja.getLastRow() - 1;
        if (filasAEliminar > 0) {
          hoja.deleteRows(2, filasAEliminar);
          totalLimpiadas++;
          Logger.log('✅ Limpiada: ' + nombreHoja + ' (' + filasAEliminar + ' filas eliminadas)');
        }
      }
    });

    SpreadsheetApp.flush();

    ss.toast(
      '✅ LIMPIEZA COMPLETADA\n\n' +
      totalLimpiadas + ' hojas limpiadas.\n' +
      'El Reporte ahora muestra ceros.\n' +
      'Listo para registrar el nuevo mes.',
      'Limpieza Lista',
      5
    );

    Logger.log('✅ Limpieza para nuevo mes completada: ' + totalLimpiadas + ' hojas');
    return true;

  } catch (error) {
    Logger.log('❌ Error limpiando datos: ' + error.toString());
    ss.toast('❌ Error: ' + error.toString(), 'Error', 5);
    return false;
  }
}

/**
 * Calcula todas las métricas del reporte directamente desde las hojas fuente.
 * No depende de la posición de celdas en la hoja Reporte.
 * Devuelve un array de 41 elementos compatible con HEADERS_REPORTE_AUTO.
 */
function _calcularDatosMesActual_(ss, mesLabel) {
  function contarHoja(nombre, colFecha) {
    const h = ss.getSheetByName(nombre);
    if (!h || h.getLastRow() < 2) return { total: 0, mes: 0 };
    const total = h.getLastRow() - 1;
    const hoy = new Date();
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const fechas = h.getRange(2, colFecha, total, 1).getValues();
    let mes = 0;
    fechas.forEach(f => {
      if (f[0] instanceof Date && f[0] >= primerDia && f[0] <= ultimoDia) mes++;
    });
    return { total: total, mes: mes };
  }

  // Terapias Individual
  const terapias = ss.getSheetByName('Terapias Individual');
  let nuevosIngresosTotal = 0, nuevosIngresosMes = 0;
  let activosGerber = 0, activosMelissa = 0, activosDiana = 0, activosKarina = 0;
  let sesionesGerber = 0, sesionesMelissa = 0, sesionesDiana = 0, sesionesKarina = 0;
  let inasistenciasGerber = 0, inasistenciasMelissa = 0, inasistenciasDiana = 0, inasistenciasKarina = 0;
  let totalActivos = 0;

  const hoy = new Date();
  const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

  if (terapias && terapias.getLastRow() > 1) {
    const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();
    datos.forEach(fila => {
      const fechaIngreso = fila[0];
      const terapeuta = fila[1] ? fila[1].toString().trim() : '';
      const participante = fila[3];
      const estado = fila[8] ? fila[8].toString().trim() : '';
      const inasistencias = fila[11] || 0;
      const asistencias = fila[12] || 0;

      if (participante && participante.toString().trim() !== '') {
        nuevosIngresosTotal++;
        if (fechaIngreso instanceof Date && fechaIngreso >= primerDia && fechaIngreso <= ultimoDia) {
          nuevosIngresosMes++;
        }
        if (terapeuta === 'Gerber') { sesionesGerber += asistencias; inasistenciasGerber += inasistencias; }
        else if (terapeuta === 'Melissa') { sesionesMelissa += asistencias; inasistenciasMelissa += inasistencias; }
        else if (terapeuta === 'Diana') { sesionesDiana += asistencias; inasistenciasDiana += inasistencias; }
        else if (terapeuta === 'Karina') { sesionesKarina += asistencias; inasistenciasKarina += inasistencias; }
      }
      if (estado === 'En proceso') {
        totalActivos++;
        if (terapeuta === 'Gerber') activosGerber++;
        else if (terapeuta === 'Melissa') activosMelissa++;
        else if (terapeuta === 'Diana') activosDiana++;
        else if (terapeuta === 'Karina') activosKarina++;
      }
    });
  }

  const noAsistidas = contarHoja('Personas no asistidas', 1);
  const derivaciones = contarHoja('Derivaciones Institucionales', 1);

  const hojaBienestar = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
  let formulariosTotal = 0, alertasSuicidio = 0;
  if (hojaBienestar && hojaBienestar.getLastRow() > 1) {
    formulariosTotal = hojaBienestar.getLastRow() - 1;
    const colB = hojaBienestar.getRange(2, 2, formulariosTotal, 1).getValues();
    colB.forEach(f => {
      const val = f[0] ? f[0].toString().trim().toLowerCase() : '';
      if (val === 'si' || val === 'sí') alertasSuicidio++;
    });
  }

  const culminados = contarHoja('Procesos Culminados', 1);
  let culminados12 = 0;
  const hojaCulminados = ss.getSheetByName('Procesos Culminados');
  if (hojaCulminados && hojaCulminados.getLastRow() > 1) {
    const sesCol = hojaCulminados.getRange(2, 5, hojaCulminados.getLastRow() - 1, 1).getValues();
    sesCol.forEach(f => { if (f[0] >= 12) culminados12++; });
  }

  const retiradx = contarHoja('Retiradx', 1);
  const tasaRetiro = (culminados.total + retiradx.total) > 0
    ? (Math.round(retiradx.total / (culminados.total + retiradx.total) * 1000) / 10) + '%'
    : '0%';

  const hojaIntervencion = ss.getSheetByName('Intervención de casos');
  const casosIntervencion = hojaIntervencion ? Math.max(0, hojaIntervencion.getLastRow() - 1) : 0;

  const totalSesiones = sesionesGerber + sesionesMelissa + sesionesDiana + sesionesKarina;
  const totalInasistencias = inasistenciasGerber + inasistenciasMelissa + inasistenciasDiana + inasistenciasKarina;
  const totalProcesados = culminados.total + retiradx.total + casosIntervencion;
  const tasaExito = totalProcesados > 0 ? (Math.round(culminados.total / totalProcesados * 1000) / 10) + '%' : '0%';

  const interes = contarHoja('Hoja de interés', 1);
  const referencias = contarHoja('Referencias de programas', 1);
  const derivInstRecib = contarHoja('Derivaciones Institucionales', 1);

  return [
    mesLabel,
    nuevosIngresosTotal, nuevosIngresosMes,
    noAsistidas.total, noAsistidas.mes,
    derivaciones.total, derivaciones.mes,
    formulariosTotal, alertasSuicidio,
    activosGerber, sesionesGerber, inasistenciasGerber,
    activosMelissa, sesionesMelissa, inasistenciasMelissa,
    activosDiana, sesionesDiana, inasistenciasDiana,
    activosKarina, sesionesKarina, inasistenciasKarina,
    totalActivos, totalSesiones, totalInasistencias,
    culminados.total, culminados.mes, culminados12,
    retiradx.total, retiradx.mes, tasaRetiro,
    casosIntervencion,
    totalProcesados, tasaExito, totalActivos,
    interes.total, interes.mes,
    referencias.total, referencias.mes,
    derivInstRecib.total, derivInstRecib.mes,
    new Date()
  ];
}

function guardarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();
    const mensuales = ss.getSheetByName('Reportes Mensuales');

    if (!mensuales) {
      ss.toast('No se encontró "Reportes Mensuales"', 'Error', 3);
      return;
    }

    const mesActual = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');

    // Confirmar
    const confirmar = ui.alert(
      '💾 Guardar Reporte Mensual',
      '¿Guardar el reporte de ' + mesActual + '?\n\n' +
      'Esto va a:\n' +
      '1. Calcular todos los datos del mes\n' +
      '2. Guardar en "Reportes Mensuales"\n' +
      '3. Preguntar si quieres limpiar para el nuevo mes',
      ui.ButtonSet.YES_NO
    );
    if (confirmar !== ui.Button.YES) return;

    ss.toast('📊 Calculando datos de ' + mesActual + '...', 'Procesando', -1);

    // Calcular datos directamente de las hojas fuente
    const datos = _calcularDatosMesActual_(ss, mesActual);

    const nuevaFila = mensuales.getLastRow() + 1;
    mensuales.getRange(nuevaFila, 1, 1, datos.length).setValues([datos]);

    ss.toast('✅ Reporte de ' + mesActual + ' guardado en fila ' + nuevaFila, 'Guardado', 5);

    // Preguntar si desea limpiar datos para el nuevo mes
    const limpiar = ui.alert(
      '🧹 Limpiar Datos para Nuevo Mes',
      '¿Deseas limpiar TODOS los datos para empezar el nuevo mes desde cero?\n\n' +
      'Esto eliminará registros de:\n' +
      '• Terapias Individual\n' +
      '• Personas no asistidas\n' +
      '• Derivaciones institucionales\n' +
      '• Procesos culminados y Retiradx\n' +
      '• Hoja de interés y Referencias\n' +
      '• Formularios de Bienestar\n\n' +
      'Los datos ya están guardados en "Reportes Mensuales".\n\n' +
      '✅ SÍ = Limpiar todo y empezar desde cero\n' +
      '❌ NO = Mantener datos',
      ui.ButtonSet.YES_NO
    );

    if (limpiar === ui.Button.YES) {
      limpiarDatosParaNuevoMes();
      ui.alert(
        '✅ Reporte Guardado y Datos Limpiados',
        'RESUMEN:\n\n' +
        '• Reporte de ' + mesActual + ' guardado en historial\n' +
        '• Todas las hojas de trabajo limpiadas\n' +
        '• El Reporte ahora muestra todo en cero\n\n' +
        'Listo para registrar datos del nuevo mes.',
        ui.ButtonSet.OK
      );
    }

  } catch (error) {
    Logger.log('Error guardando reporte: ' + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Error: ' + error.toString(),
      'Error',
      5
    );
  }
}

/**
 * Guardar reporte de un mes específico (para cuando se genera después del cierre del mes)
 * Permite generar el reporte de marzo aunque ya estemos en abril
 * Calcula los datos directamente de las hojas fuente usando rangos de fecha del mes seleccionado
 */
function guardarReporteMesEspecifico() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const respuesta = ui.prompt(
      'Reporte de Mes Especifico',
      'Ingrese el mes y ano del reporte (formato: MM/YYYY)\n\n' +
      'Ejemplo: 03/2026 para marzo 2026\n\n' +
      'NOTA: Use esto cuando necesite generar el reporte de un mes\n' +
      'despues de que ese mes ya termino.',
      ui.ButtonSet.OK_CANCEL
    );

    if (respuesta.getSelectedButton() !== ui.Button.OK) return;

    const texto = respuesta.getResponseText().trim();
    const partes = texto.split('/');
    if (partes.length !== 2 || isNaN(partes[0]) || isNaN(partes[1])) {
      ui.alert('Formato invalido. Use MM/YYYY (ejemplo: 03/2026)');
      return;
    }

    const mes = parseInt(partes[0]);
    const anio = parseInt(partes[1]);

    if (mes < 1 || mes > 12 || anio < 2020 || anio > 2030) {
      ui.alert('Mes o ano fuera de rango valido.');
      return;
    }

    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);

    const nombreMes = Utilities.formatDate(primerDia, Session.getScriptTimeZone(), 'MMMM yyyy');

    const mensuales = ss.getSheetByName('Reportes Mensuales');
    if (!mensuales) {
      ui.alert('No se encontro la hoja "Reportes Mensuales"');
      return;
    }

    const datosExistentes = mensuales.getDataRange().getValues();
    for (let i = 1; i < datosExistentes.length; i++) {
      if (datosExistentes[i][0] && datosExistentes[i][0].toString().toLowerCase() === nombreMes.toLowerCase()) {
        const sobreescribir = ui.alert(
          'Ya existe reporte',
          'Ya existe un reporte para "' + nombreMes + '".\nDesea sobreescribirlo?',
          ui.ButtonSet.YES_NO
        );
        if (sobreescribir !== ui.Button.YES) return;
        mensuales.deleteRow(i + 1);
        break;
      }
    }

    const confirmar = ui.alert(
      'Confirmar Reporte',
      'Generar reporte para: ' + nombreMes + '?\n\n' +
      'Esto va a:\n' +
      '1. Calcular los datos de ' + nombreMes + ' directamente de las hojas\n' +
      '2. Guardar el reporte en "Reportes Mensuales"\n' +
      '3. Actualizar "Sesiones Mes Anterior" para empezar el nuevo mes\n\n' +
      'IMPORTANTE: Asegurese de haber terminado de registrar\n' +
      'TODOS los pacientes y sesiones de ' + nombreMes + ' antes de continuar.',
      ui.ButtonSet.YES_NO
    );

    if (confirmar !== ui.Button.YES) return;

    ss.toast('Calculando reporte de ' + nombreMes + '...', 'Procesando', 10);

    function contarEnRango(hoja, colFecha, pDia, uDia) {
      if (!hoja || hoja.getLastRow() < 2) return { total: 0, mes: 0 };
      const fechas = hoja.getRange(2, colFecha, hoja.getLastRow() - 1, 1).getValues();
      let total = hoja.getLastRow() - 1;
      let enMes = 0;
      for (let i = 0; i < fechas.length; i++) {
        const fecha = fechas[i][0];
        if (fecha instanceof Date && fecha >= pDia && fecha <= uDia) {
          enMes++;
        }
      }
      return { total: total, mes: enMes };
    }

    // 1. NUEVOS INGRESOS
    const terapias = ss.getSheetByName('Terapias Individual');
    let nuevosIngresosTotal = 0;
    let nuevosIngresosMes = 0;
    let activosGerber = 0, activosMelissa = 0, activosDiana = 0, activosKarina = 0;
    let sesionesGerber = 0, sesionesMelissa = 0, sesionesDiana = 0, sesionesKarina = 0;
    let inasistenciasGerber = 0, inasistenciasMelissa = 0, inasistenciasDiana = 0, inasistenciasKarina = 0;
    let totalActivos = 0;

    if (terapias && terapias.getLastRow() > 1) {
      const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();
      datos.forEach(fila => {
        const fechaIngreso = fila[0];
        const terapeuta = fila[1] ? fila[1].toString().trim() : '';
        const participante = fila[3];
        const estado = fila[8] ? fila[8].toString().trim() : '';
        const inasistencias = fila[11] || 0;
        const asistencias = fila[12] || 0;

        if (participante && participante.toString().trim() !== '') {
          nuevosIngresosTotal++;
          if (fechaIngreso instanceof Date && fechaIngreso >= primerDia && fechaIngreso <= ultimoDia) {
            nuevosIngresosMes++;
          }

          // Sesiones e inasistencias se cuentan para TODOS los casos con terapeuta,
          // sin importar estado — así los retiros del mes no restan sesiones ya realizadas.
          if (terapeuta === 'Gerber') { sesionesGerber += asistencias; inasistenciasGerber += inasistencias; }
          else if (terapeuta === 'Melissa') { sesionesMelissa += asistencias; inasistenciasMelissa += inasistencias; }
          else if (terapeuta === 'Diana') { sesionesDiana += asistencias; inasistenciasDiana += inasistencias; }
          else if (terapeuta === 'Karina') { sesionesKarina += asistencias; inasistenciasKarina += inasistencias; }
        }

        // Activos: solo se cuenta si sigue "En proceso" al momento del cierre
        if (estado === 'En proceso') {
          totalActivos++;
          if (terapeuta === 'Gerber') activosGerber++;
          else if (terapeuta === 'Melissa') activosMelissa++;
          else if (terapeuta === 'Diana') activosDiana++;
          else if (terapeuta === 'Karina') activosKarina++;
        }
      });
    }

    // 2. PERSONAS NO ASISTIDAS
    const hojaNoAsistidas = ss.getSheetByName('Personas no asistidas');
    const noAsistidas = contarEnRango(hojaNoAsistidas, 1, primerDia, ultimoDia);

    // 3. DERIVACIONES INSTITUCIONALES
    const hojaDerivaciones = ss.getSheetByName('Derivaciones Institucionales');
    const derivaciones = contarEnRango(hojaDerivaciones, 1, primerDia, ultimoDia);

    // 4. FORMULARIO DE BIENESTAR
    const hojaBienestar = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    let formulariosTotal = 0;
    let alertasSuicidio = 0;
    if (hojaBienestar && hojaBienestar.getLastRow() > 1) {
      formulariosTotal = hojaBienestar.getLastRow() - 1;
      const colB = hojaBienestar.getRange(2, 2, hojaBienestar.getLastRow() - 1, 1).getValues();
      colB.forEach(f => {
        const val = f[0] ? f[0].toString().trim().toLowerCase() : '';
        if (val === 'si' || val === 'sí') alertasSuicidio++;
      });
    }

    // 5. PROCESOS CULMINADOS
    const hojaCulminados = ss.getSheetByName('Procesos Culminados');
    const culminados = contarEnRango(hojaCulminados, 1, primerDia, ultimoDia);
    let culminados12 = 0;
    if (hojaCulminados && hojaCulminados.getLastRow() > 1) {
      const sesCol = hojaCulminados.getRange(2, 5, hojaCulminados.getLastRow() - 1, 1).getValues();
      sesCol.forEach(f => { if (f[0] >= 12) culminados12++; });
    }

    // 6. RETIRADX
    const hojaRetiradx = ss.getSheetByName('Retiradx');
    const retiradx = contarEnRango(hojaRetiradx, 1, primerDia, ultimoDia);
    const tasaRetiro = (culminados.total + retiradx.total) > 0
      ? (Math.round(retiradx.total / (culminados.total + retiradx.total) * 1000) / 10) + '%'
      : '0%';

    // 7. INTERVENCION DE CASOS
    const hojaIntervencion = ss.getSheetByName('Intervención de casos');
    const casosIntervencion = hojaIntervencion ? Math.max(0, hojaIntervencion.getLastRow() - 1) : 0;

    // 8. RESUMEN
    const totalSesiones = sesionesGerber + sesionesMelissa + sesionesDiana + sesionesKarina;
    const totalInasistencias = inasistenciasGerber + inasistenciasMelissa + inasistenciasDiana + inasistenciasKarina;
    const totalProcesados = culminados.total + retiradx.total + casosIntervencion;
    const tasaExito = totalProcesados > 0 ? (Math.round(culminados.total / totalProcesados * 1000) / 10) + '%' : '0%';

    // 9. CAPTACION
    const hojaInteres = ss.getSheetByName('Hoja de interés');
    const interes = contarEnRango(hojaInteres, 1, primerDia, ultimoDia);
    const hojaReferencias = ss.getSheetByName('Referencias de programas');
    const referencias = contarEnRango(hojaReferencias, 1, primerDia, ultimoDia);
    const hojaDerivInst = ss.getSheetByName('Derivaciones Institucionales');
    const derivInstRecib = contarEnRango(hojaDerivInst, 1, primerDia, ultimoDia);

    // Guardar en Reportes Mensuales (41 columnas)
    const nuevaFila = mensuales.getLastRow() + 1;
    const datosReporte = [
      nombreMes,
      nuevosIngresosTotal, nuevosIngresosMes,
      noAsistidas.total, noAsistidas.mes,
      derivaciones.total, derivaciones.mes,
      formulariosTotal, alertasSuicidio,
      activosGerber, sesionesGerber, inasistenciasGerber,
      activosMelissa, sesionesMelissa, inasistenciasMelissa,
      activosDiana, sesionesDiana, inasistenciasDiana,
      activosKarina, sesionesKarina, inasistenciasKarina,
      totalActivos, totalSesiones, totalInasistencias,
      culminados.total, culminados.mes, culminados12,
      retiradx.total, retiradx.mes, tasaRetiro,
      casosIntervencion,
      totalProcesados, tasaExito, totalActivos,
      interes.total, interes.mes,
      referencias.total, referencias.mes,
      derivInstRecib.total, derivInstRecib.mes,
      new Date()
    ];

    mensuales.getRange(nuevaFila, 1, 1, datosReporte.length).setValues([datosReporte]);

    actualizarSesionesMesAnterior();

    ui.alert(
      'Reporte Guardado: ' + nombreMes,
      'RESUMEN DEL REPORTE:\n\n' +
      'Nuevos ingresos: ' + nuevosIngresosMes + ' (total: ' + nuevosIngresosTotal + ')\n' +
      'Culminados este mes: ' + culminados.mes + ' (total: ' + culminados.total + ')\n' +
      'Retiradx este mes: ' + retiradx.mes + ' (total: ' + retiradx.total + ')\n' +
      'Casos en intervencion: ' + casosIntervencion + '\n' +
      'Total activos: ' + totalActivos + '\n\n' +
      'Sesiones por terapeuta (asistencias reales):\n' +
      '   Gerber: ' + sesionesGerber + ' ses. / ' + activosGerber + ' activos\n' +
      '   Melissa: ' + sesionesMelissa + ' ses. / ' + activosMelissa + ' activos\n' +
      '   Diana: ' + sesionesDiana + ' ses. / ' + activosDiana + ' activos\n' +
      '   Karina: ' + sesionesKarina + ' ses. / ' + activosKarina + ' activos\n\n' +
      'Asistencias e inasistencias reseteadas a 0.\n' +
      'Guardado en fila: ' + nuevaFila,
      ui.ButtonSet.OK
    );

    ss.toast('Reporte de ' + nombreMes + ' guardado correctamente', 'Completado', 5);

  } catch (error) {
    Logger.log('Error guardando reporte especifico: ' + error.toString());
    ui.alert('Error: ' + error.toString());
  }
}

/**
 * Actualización automática diaria (trigger 8:00 AM).
 *
 * Siempre escribe en "Reporte Mensual Automatizado" (hoja en vivo, fila 2)
 * con los datos del MES ACTUAL según las fórmulas del Reporte.
 *
 * Período de gracia días 1-3:
 *   - Envía email de aviso al director/a para que verifiquen y cierren
 *     el mes anterior antes de que se congele.
 *   - NO toca "Reportes Mensuales"; el cierre es siempre manual.
 */
function autoActualizarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporte = ss.getSheetByName('Reporte');
    if (!reporte) return;

    const hoy = new Date();
    const dia = hoy.getDate();
    const mesActualLabel = Utilities.formatDate(
      new Date(hoy.getFullYear(), hoy.getMonth(), 1),
      Session.getScriptTimeZone(), 'MMMM yyyy'
    );

    // ── 1. Leer datos del Reporte actual ──
    const fila = _leerDatosReporte_(reporte, mesActualLabel);

    // ── 2. Actualizar hoja en vivo ──
    let liveSheet = ss.getSheetByName('Reporte Mensual Automatizado');
    if (!liveSheet) liveSheet = crearHojaReporteMensualAutomatizado();
    if (liveSheet) {
      if (liveSheet.getLastRow() < 2) {
        liveSheet.appendRow(fila);
      } else {
        liveSheet.getRange(2, 1, 1, fila.length).setValues([fila]);
      }
      Logger.log('Reporte en vivo actualizado: ' + mesActualLabel);
    }

    // ── 3. Período de gracia: email de aviso ──
    if (dia >= 1 && dia <= 3) {
      const mesAnteriorLabel = Utilities.formatDate(
        new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1),
        Session.getScriptTimeZone(), 'MMMM yyyy'
      );
      const diasRestantes = 4 - dia; // días antes de que se cierre la gracia
      _enviarEmailGraciaMensual_(mesAnteriorLabel, diasRestantes);
    }

  } catch (e) {
    Logger.log('Error en autoActualizarReporteMensual: ' + e.message);
  }
}

function instalarTriggerAutoReporteMensual() {
  // Eliminar triggers anteriores del mismo handler para no duplicar
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'autoActualizarReporteMensual') {
      ScriptApp.deleteTrigger(t);
    }
  });
  // Trigger diario a las 8:00 AM
  ScriptApp.newTrigger('autoActualizarReporteMensual')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();
  SpreadsheetApp.getActiveSpreadsheet().toast(
    '✅ Auto-guardado mensual activado.\n' +
    'Se actualizará cada día a las 8:00 AM.\n' +
    'Días 1-3 del mes: gracia para cerrar el mes anterior.',
    'Auto-Reporte Mensual', 5
  );
}

function desactivarAutoReporteMensual() {
  let borrados = 0;
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'autoActualizarReporteMensual') {
      ScriptApp.deleteTrigger(t);
      borrados++;
    }
  });
  SpreadsheetApp.getActiveSpreadsheet().toast(
    borrados > 0
      ? '🛑 Auto-guardado mensual desactivado.'
      : '⚠️ No había trigger activo de auto-guardado.',
    'Auto-Reporte', 4
  );
}

// =====================================================================
// REPORTE MENSUAL AUTOMATIZADO — hoja en vivo + historial manual
// =====================================================================

const HEADERS_REPORTE_AUTO = [
  'Mes',
  'Nuevos Ingresos (Total)', 'Nuevos Ingresos (Mes)',
  'No Asistidas (Total)', 'No Asistidas (Mes)',
  'Derivaciones (Total)', 'Derivaciones (Mes)',
  'Formularios Total', 'Alertas Suicidio',
  'Activos Gerber', 'Sesiones Gerber', 'Inasistencias Gerber',
  'Activos Melissa', 'Sesiones Melissa', 'Inasistencias Melissa',
  'Activos Diana', 'Sesiones Diana', 'Inasistencias Diana',
  'Activos Karina', 'Sesiones Karina', 'Inasistencias Karina',
  'Total Activos', 'Total Sesiones', 'Total Inasistencias',
  'Culminados (Total)', 'Culminados (Mes)', '% Culminación',
  'Retiradx (Total)', 'Retiradx (Mes)', '% Retiro',
  'Casos Intervención', 'Total Procesados', '% Éxito', 'Activos Acumulados',
  'Hoja Interés (Total)', 'Hoja Interés (Mes)',
  'Referencias (Total)', 'Referencias (Mes)',
  'Deriv. Inst. (Total)', 'Deriv. Inst. (Mes)',
  'Última Actualización'
];

/** Lee las 41 celdas del Reporte y devuelve la fila lista para escribir. */
function _leerDatosReporte_(reporte, mesLabel) {
  const ss = reporte.getParent();
  return _calcularDatosMesActual_(ss, mesLabel);
}

/**
 * Crea (o recrea) la hoja "Reporte Mensual Automatizado".
 * Row 1: encabezados en negrita con fondo azul oscuro.
 * Row 2: datos del mes actual — se sobreescribe diariamente.
 * Devuelve la hoja.
 */
function crearHojaReporteMensualAutomatizado() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const NOMBRE = 'Reporte Mensual Automatizado';

  // Si ya existe, solo nos aseguramos de que tenga los headers correctos
  let sheet = ss.getSheetByName(NOMBRE);
  if (!sheet) {
    sheet = ss.insertSheet(NOMBRE);
  }

  // Encabezados
  const ncols = HEADERS_REPORTE_AUTO.length;
  sheet.clearContents();
  sheet.clearFormats();

  const headerRange = sheet.getRange(1, 1, 1, ncols);
  headerRange.setValues([HEADERS_REPORTE_AUTO]);
  headerRange.setFontWeight('bold')
    .setBackground('#1a237e')
    .setFontColor('#ffffff')
    .setWrap(true);

  // Etiqueta EN VIVO en A1 con estilo llamativo
  sheet.getRange('A1').setValue('📊 Mes (EN VIVO)');

  // Ancho de columnas
  sheet.setColumnWidth(1, 160);
  for (let c = 2; c <= ncols; c++) sheet.setColumnWidth(c, 120);
  sheet.setFrozenRows(1);

  // Rellenar fila 2 con datos actuales si hay hoja Reporte
  const reporte = ss.getSheetByName('Reporte');
  if (reporte) {
    const hoy = new Date();
    const mesLabel = Utilities.formatDate(
      new Date(hoy.getFullYear(), hoy.getMonth(), 1),
      Session.getScriptTimeZone(), 'MMMM yyyy'
    );
    const fila = _leerDatosReporte_(reporte, mesLabel);
    sheet.getRange(2, 1, 1, fila.length).setValues([fila]);
    sheet.getRange(2, 1, 1, ncols).setBackground('#e8eaf6');
  }

  // Banda de identificación visual en la hoja
  sheet.getRange(1, 1, 1, 1)
    .setNote('Esta hoja se actualiza automáticamente cada día a las 8:00 AM.\n' +
             'Para congelar el mes en el historial usa: Menú → Pasar Reporte al Historial.');

  ss.toast('Hoja "' + NOMBRE + '" lista.', 'Reporte Automatizado', 4);
  return sheet;
}

/**
 * Envía un email HTML al director/a durante los días de gracia (1-3 del mes).
 * Avisa que el mes anterior está pendiente de revisión y cierre manual.
 */
function _enviarEmailGraciaMensual_(mesAnteriorLabel, diasRestantes) {
  try {
    const emailDir = PropertiesService.getDocumentProperties().getProperty('EMAIL_DIRECTOR')
      || PropertiesService.getScriptProperties().getProperty('EMAIL_DIRECTORA');
    if (!emailDir) {
      Logger.log('Email de gracia: no hay dirección configurada (EMAIL_DIRECTOR / EMAIL_DIRECTORA).');
      return;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const url = ss.getUrl();
    const diasTexto = diasRestantes === 1 ? '1 día' : diasRestantes + ' días';
    const fechaCierre = Utilities.formatDate(
      new Date(new Date().getFullYear(), new Date().getMonth(), 4),
      Session.getScriptTimeZone(), 'dd/MM/yyyy'
    );

    const asunto = '⏰ [Apoyo Emocional] Cierre de ' + mesAnteriorLabel
      + ' — quedan ' + diasTexto;

    const cuerpo = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
  .header { background: #1a237e; color: #fff; padding: 20px 30px; }
  .header h1 { margin: 0; font-size: 20px; }
  .header p  { margin: 4px 0 0; font-size: 13px; opacity: .85; }
  .content   { padding: 24px 30px; }
  .alert-box { background: #fff3e0; border-left: 5px solid #ff6d00;
               padding: 14px 18px; border-radius: 4px; margin-bottom: 20px; }
  .alert-box strong { color: #e65100; font-size: 16px; }
  .checklist { background: #f5f5f5; border-radius: 6px; padding: 16px 20px; margin-bottom: 20px; }
  .checklist h3 { margin: 0 0 10px; color: #1a237e; font-size: 15px; }
  .checklist li { margin: 6px 0; font-size: 14px; }
  .btn { display: inline-block; background: #1a237e; color: #fff !important;
         padding: 12px 28px; border-radius: 6px; text-decoration: none;
         font-weight: bold; font-size: 15px; margin: 10px 0; }
  .footer { background: #f5f5f5; padding: 14px 30px; font-size: 12px; color: #777; }
</style>
</head>
<body>
<div class="header">
  <h1>📊 Sistema de Apoyo Emocional</h1>
  <p>Notificación automática — Cierre mensual</p>
</div>
<div class="content">

  <div class="alert-box">
    <strong>⏰ Quedan ${diasTexto} para cerrar el mes de ${mesAnteriorLabel}</strong><br>
    El <strong>${fechaCierre}</strong> el sistema pasará automáticamente al nuevo mes.
    Después de esa fecha el mes anterior ya no se podrá editar en el reporte vivo.
  </div>

  <p>Antes de que se cierre el período de gracia, por favor verifica que los siguientes
  datos del mes de <strong>${mesAnteriorLabel}</strong> estén completos en el sistema:</p>

  <div class="checklist">
    <h3>✅ Lista de verificación — ${mesAnteriorLabel}</h3>
    <ul>
      <li>Todos los ingresos nuevos del mes registrados en <em>Hoja de interés</em></li>
      <li>Asistencias e inasistencias de cada terapeuta actualizadas</li>
      <li>Procesos culminados y retiradx del mes registrados</li>
      <li>Casos en intervención al día</li>
      <li>Derivaciones institucionales recibidas importadas desde KoboToolbox</li>
      <li>Referencias de programas actualizadas</li>
      <li>Alertas de bienestar y formularios verificados</li>
    </ul>
  </div>

  <p>Una vez hayas verificado que todo está completo, congela el mes presionando el botón
  <strong>"Pasar Reporte al Historial"</strong> en el menú del sistema:</p>

  <a href="${url}" class="btn">📂 Abrir Sistema → Pasar al Historial</a>

  <p style="margin-top:20px; color:#555; font-size:13px;">
    Si los datos ya están completos y el mes fue cerrado, puedes ignorar este mensaje.<br>
    El reporte mensual automatizado se actualiza cada día a las 8:00 AM.
  </p>

</div>
<div class="footer">
  Mensaje generado automáticamente por el Sistema de Apoyo Emocional.<br>
  No respondas a este correo.
</div>
</body>
</html>`;

    GmailApp.sendEmail(emailDir, asunto, '', { htmlBody: cuerpo });
    Logger.log('Email de gracia enviado a ' + emailDir + ' para ' + mesAnteriorLabel);

  } catch (e) {
    Logger.log('Error enviando email de gracia: ' + e.message);
  }
}

/**
 * Copia la fila actual de "Reporte Mensual Automatizado" al historial
 * "Reportes Mensuales". Hace upsert: actualiza si el mes ya existe,
 * agrega al final si no existe. Pide confirmación al usuario.
 */
function pasarReporteAlHistorial() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { ui = null; }

  try {
    const liveSheet = ss.getSheetByName('Reporte Mensual Automatizado');
    const mensuales = ss.getSheetByName('Reportes Mensuales');

    if (!liveSheet || liveSheet.getLastRow() < 2) {
      if (ui) ui.alert('⚠️ No hay datos en "Reporte Mensual Automatizado".\n' +
        'Activa el auto-guardado mensual primero.');
      return;
    }
    if (!mensuales) {
      if (ui) ui.alert('⚠️ No se encontró la hoja "Reportes Mensuales".');
      return;
    }

    const filaViva = liveSheet.getRange(2, 1, 1, HEADERS_REPORTE_AUTO.length).getValues()[0] || [];
    const mesLabel = filaViva[0] ? String(filaViva[0]) : '';
    if (!mesLabel) {
      if (ui) ui.alert('⚠️ La fila en vivo no tiene mes asignado. Actualiza primero.');
      return;
    }

    // Confirmar con usuario
    if (ui) {
      const resp = ui.alert(
        '🗂️ Pasar al Historial',
        '¿Deseas guardar el reporte de "' + mesLabel + '" en Reportes Mensuales?\n\n' +
        'Si ya existe una fila para ese mes, será reemplazada.\n' +
        'Esta acción es manual — las sesiones NO se resetean.',
        ui.ButtonSet.YES_NO
      );
      if (resp !== ui.Button.YES) return;
    }

    // Upsert en Reportes Mensuales
    const datos = mensuales.getDataRange().getValues();
    let filaExistente = -1;
    for (let i = 1; i < datos.length; i++) {
      if (String(datos[i][0]).toLowerCase() === mesLabel.toLowerCase()) {
        filaExistente = i + 1;
        break;
      }
    }

    if (filaExistente > 0) {
      mensuales.getRange(filaExistente, 1, 1, filaViva.length).setValues([filaViva]);
      Logger.log('Historial: fila actualizada para ' + mesLabel + ' (fila ' + filaExistente + ')');
    } else {
      mensuales.appendRow(filaViva);
      Logger.log('Historial: fila nueva para ' + mesLabel);
    }

    if (ui) ui.alert('✅ Reporte de "' + mesLabel + '" guardado en el historial correctamente.');
    ss.toast('Historial actualizado: ' + mesLabel, 'Reporte Mensual', 5);

  } catch (e) {
    Logger.log('Error en pasarReporteAlHistorial: ' + e.message);
    if (ui) ui.alert('❌ Error: ' + e.message);
  }
}

/**
 * Actualiza "Sesiones Mes Anterior" para empezar el conteo del nuevo mes
 * 1. Copia No. Sesión (H) → Sesiones Mes Anterior (K)
 * 2. Resetea Asistencias (M) a 0 para el nuevo mes
 * 3. Resetea Inasistencias (L) a 0 para el nuevo mes
 */
function actualizarSesionesMesAnterior() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const terapias = ss.getSheetByName('Terapias Individual');
    if (terapias && terapias.getLastRow() > 1) {
      const ultimaFila = terapias.getLastRow();

      // Asegurar que existe el header de columna N (Inasistencias Mes Anterior)
      const headerN = terapias.getRange(1, 14).getValue();
      if (!headerN || headerN.toString().trim() === '') {
        terapias.getRange(1, 14).setValue('Inasistencias Mes Anterior');
        terapias.getRange(1, 14)
          .setBackground('#2e7d32').setFontColor('white')
          .setFontWeight('bold').setHorizontalAlignment('center');
        terapias.setColumnWidth(14, 120);
      }

      for (let fila = 2; fila <= ultimaFila; fila++) {
        const participante = terapias.getRange(fila, 4).getValue(); // Columna D: Participante
        const numSesion    = terapias.getRange(fila, 8).getValue(); // Columna H: No. Sesión
        const inasistencias = terapias.getRange(fila, 12).getValue(); // Columna L: Inasistencias

        // Solo actualizar si hay un participante (fila tiene datos)
        if (participante && participante.toString().trim() !== '') {
          // Copiar H → K (Sesiones Mes Anterior)
          terapias.getRange(fila, 11).setValue(numSesion || 0);      // Columna K: Sesiones Mes Anterior
          // Copiar L → N (Inasistencias Mes Anterior) — SUMAR al acumulado existente
          const prevN = terapias.getRange(fila, 14).getValue() || 0;
          terapias.getRange(fila, 14).setValue(prevN + (inasistencias || 0)); // Columna N: acumula inasistencias

          // Resetear contadores mensuales a 0 para empezar el nuevo mes
          terapias.getRange(fila, 12).setValue(0); // Columna L: Inasistencias → 0
          terapias.getRange(fila, 13).setValue(0); // Columna M: Asistencias → 0
        }
      }

      Logger.log('✅ Terapias Individual: H→K copiado, L→N acumulado, L y M reseteados a 0');
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
// FUNCIONES DE REPARACIÓN
// =====================================================================

/**
 * Reparación completa del sistema: nombres de hojas, validaciones,
 * fórmulas del reporte. Consolida las 3 reparaciones individuales.
 */
function reparacionCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  try {
    ss.toast('🔧 Ejecutando reparación completa...', 'Reparación', 3);

    // 1. Reparar nombres de hojas
    try {
      repararNombresHojas();
      Logger.log('✅ Paso 1/3: Nombres de hojas reparados');
    } catch (e) { Logger.log('⚠️ Paso 1/3 (nombres): ' + e.message); }

    // 2. Reparar validaciones (limpia y reconfigura)
    repararValidaciones();
    Logger.log('✅ Paso 2/3: Validaciones reparadas');

    // 3. Actualizar fórmulas del reporte
    try {
      actualizarFormulasReporte();
      Logger.log('✅ Paso 3/3: Fórmulas actualizadas');
    } catch (e) { Logger.log('⚠️ Paso 3/3 (fórmulas): ' + e.message); }

    try {
      SpreadsheetApp.getUi().alert(
        '✅ Reparación Completa',
        'Se ejecutaron las siguientes reparaciones:\n\n' +
        '1. Nombres de hojas corregidos\n' +
        '2. Validaciones limpiadas y reconfiguradas\n' +
        '3. Fórmulas del reporte actualizadas\n\n' +
        'Revisa que todo funcione correctamente.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    } catch (e) {
      ss.toast('✅ Reparación completa finalizada', 'Listo', 5);
    }
  } catch (e) {
    Logger.log('Error en reparacionCompleta: ' + e.message);
    try { SpreadsheetApp.getUi().alert('❌ Error: ' + e.message); } catch (e2) {}
  }
}

function repararValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    ss.toast('🔧 Reparando sistema...', 'Reparación', 2);

    // 1. Limpiar TODAS las validaciones de datos de todas las hojas
    const hojas = ['Hoja de interés', 'Terapias Individual',
                   'Procesos Culminados', 'Retiradx', 'Intervención de casos',
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
    '3. Si Vino + tiene terapeuta → Terapias Individual\n' +
    '4. Si No vino → Personas no asistidas\n\n' +
    'Use el menú "Limpiar Todos los Datos" cuando termine.',
    'Datos de Prueba',
    -1
  );
}

function limpiarTodosLosDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // PASO 1: Preguntar si desea hacer copia de respaldo
  const respaldoPrompt = ui.alert(
    '💾 COPIA DE RESPALDO',
    '¿Desea crear una copia de respaldo del archivo antes de limpiar?\n\n' +
    'Se recomienda crear una copia de seguridad para proteger sus datos.\n\n' +
    '✅ SI = Crear copia y continuar con limpieza\n' +
    '❌ NO = Continuar sin crear copia\n' +
    '🚫 CANCELAR = Cancelar limpieza',
    ui.ButtonSet.YES_NO_CANCEL
  );

  if (respaldoPrompt === ui.Button.CANCEL) {
    ss.toast('❌ Limpieza cancelada', 'Cancelado', 2);
    return;
  }

  // Si el usuario quiere hacer respaldo, crear copia
  if (respaldoPrompt === ui.Button.YES) {
    try {
      ss.toast('📋 Creando copia de respaldo...', 'Copiando', 3);

      const nombreActual = ss.getName();
      const fechaHora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HHmm');
      const nombreRespaldo = nombreActual + ' - RESPALDO ' + fechaHora;

      const archivoOriginal = DriveApp.getFileById(ss.getId());
      const copiaNueva = archivoOriginal.makeCopy(nombreRespaldo);

      ss.toast(
        '✅ COPIA CREADA\n\n' +
        'Nombre: ' + nombreRespaldo + '\n\n' +
        'La copia está en la misma carpeta que el archivo original.',
        'Respaldo Completo',
        5
      );

      Logger.log('✅ Copia de respaldo creada: ' + nombreRespaldo + ' (ID: ' + copiaNueva.getId() + ')');
    } catch (error) {
      Logger.log('❌ Error creando copia de respaldo: ' + error.toString());
      ss.toast(
        '❌ ERROR al crear copia de respaldo:\n\n' + error.message + '\n\n' +
        '¿Desea continuar con la limpieza de todos modos?\n\n' +
        'Presione ESC para cancelar.',
        'Error',
        10
      );

      const continuarSinRespaldo = ui.alert(
        '⚠️ ¿Continuar sin respaldo?',
        'No se pudo crear la copia de respaldo.\n\n¿Desea continuar con la limpieza de todos modos?',
        ui.ButtonSet.YES_NO
      );

      if (continuarSinRespaldo !== ui.Button.YES) {
        ss.toast('❌ Limpieza cancelada', 'Cancelado', 2);
        return;
      }
    }
  }

  // PASO 2: Confirmar limpieza de datos
  const respuesta = ui.alert(
    '⚠️ CONFIRMAR LIMPIEZA',
    '¿Está SEGURO de eliminar TODOS los datos?\n\n' +
    'Esta acción NO se puede deshacer.\n\n' +
    'Se limpiarán todas las hojas:\n' +
    '- Lista de Espera\n' +
    '- Terapias Individual\n' +
    '- Procesos Culminados\n' +
    '- Retiradx\n' +
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
    // Limpiar Lista de Espera (desde fila 2) - ahora incluye columnas O y P
    const espera = ss.getSheetByName('Lista de Espera');
    if (espera.getLastRow() > 1) {
      espera.getRange(2, 1, espera.getLastRow() - 1, 16).clearContent();
      espera.getRange(2, 1, espera.getLastRow() - 1, 16).setBackground(null);
      // Restaurar fórmulas
      for (let i = 2; i <= 100; i++) {
        espera.getRange('A' + i).setFormula('=IF(C' + i + '<>"",TODAY(),"")');
        espera.getRange('B' + i).setFormula('=IF(C' + i + '<>"",ROW()-1,"")');
      }
    }

    // Limpiar Terapias (desde fila 2)
    const terapias = ss.getSheetByName('Terapias Individual');
    if (terapias.getLastRow() > 1) {
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).clearContent();
      terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).setBackground(null);
    }

    // Limpiar Procesos Culminados (desde fila 2)
    const culminados = ss.getSheetByName('Procesos Culminados');
    if (culminados.getLastRow() > 1) {
      culminados.getRange(2, 1, culminados.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Retiradx (desde fila 2)
    const retirxs = ss.getSheetByName('Retiradx');
    if (retirxs.getLastRow() > 1) {
      retirxs.getRange(2, 1, retirxs.getLastRow() - 1, 6).clearContent();
    }

    // Limpiar Intervención de Casos (desde fila 2) - columnas A-I (9 columnas)
    const gestion = ss.getSheetByName('Intervención de casos');
    if (gestion && gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 9).clearContent();
    }

    // Limpiar Personas no asistidas (desde fila 2) - ahora incluye columna I (Notas)
    const noAsistidas = ss.getSheetByName('Personas no asistidas');
    if (noAsistidas.getLastRow() > 1) {
      noAsistidas.getRange(2, 1, noAsistidas.getLastRow() - 1, 9).clearContent();
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
 * OBSOLETO: Esta función de migración ya no es compatible con la estructura actual
 * La estructura actual incluye columnas Fecha de Ingreso y Edad
 * Si necesita recrear la hoja, use la función crearHojas() desde el menú
 */
function repararTerapias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  ui.alert(
    '⚠️ FUNCIÓN OBSOLETA',
    'Esta función de reparación ya NO es compatible con la estructura actual.\n\n' +
    'La hoja de Terapias Individual ahora incluye:\n' +
    '• A: Fecha de Ingreso (automática)\n' +
    '• B: Terapeuta\n' +
    '• C: Creamos ID\n' +
    '• D: Participante\n' +
    '• E: Malestar Inicial\n' +
    '• F: Género\n' +
    '• G: Edad\n' +
    '• H: No. Sesión\n' +
    '• I: Estado\n' +
    '• J: Motivo Finalización\n' +
    '• K: Sesiones Mes Anterior\n' +
    '• L: Inasistencias\n' +
    '• M: Asistencias\n\n' +
    'Si necesita recrear la hoja desde cero, use:\n' +
    '🏥 Apoyo Emocional → ⚙️ Crear/Reparar Hojas',
    ui.ButtonSet.OK
  );

  return;

  try {
    ss.toast('Reparando hoja de Terapias Individual...', 'Reparando', 3);

    const terapias = ss.getSheetByName('Terapias Individual');
    if (!terapias) {
      ui.alert('❌ Error', 'No se encontró la hoja "Terapias Individual"', ui.ButtonSet.OK);
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

    // Género (D)
    const generoRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
      .setAllowInvalid(false)
      .build();
    terapias.getRange('D2:D200').setDataValidation(generoRule);

    // No. Sesión (E)
    const sesiones = [];
    for (let i = 0; i <= 20; i++) {
      sesiones.push(i.toString());
    }
    const sesionRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(sesiones)
      .setAllowInvalid(false)
      .build();
    terapias.getRange('E2:E200').setDataValidation(sesionRule);

    // Estado (F)
    const estadoRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['En proceso', 'Proceso culminado', 'retirxs'])
      .setAllowInvalid(false)
      .build();
    terapias.getRange('F2:F200').setDataValidation(estadoRule);

    Logger.log('✅ Validaciones aplicadas');

    // 6. Inicializar columnas numéricas
    for (let i = 2; i <= 200; i++) {
      const participante = terapias.getRange(i, 2).getValue();
      if (participante && participante.toString().trim() !== '') {
        if (!terapias.getRange(i, 8).getValue()) {
          terapias.getRange(i, 8).setValue(0);
        }
        if (!terapias.getRange(i, 9).getValue()) {
          terapias.getRange(i, 9).setValue(0);
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
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * @deprecated No usar - hoja Lista de Espera eliminada
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
      ss.toast('No se encontro la hoja Reporte', 'Error', 3);
      return;
    }

    // Fila 5: Nuevos Ingresos a Terapia Individual
    reporte.getRange('A5').setValue('Nuevos ingresos a Terapia Individual');
    reporte.getRange('B5').setFormula('=IFERROR(COUNTA(\'Terapias Individual\'!A:A)-1,0)');
    reporte.getRange('C5').setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Terapias Individual\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 8: Personas no asistidas
    reporte.getRange('B8').setFormula('=IFERROR(COUNTA(\'Personas no asistidas\'!B:B)-1,0)');
    reporte.getRange('C8').setFormula('=IFERROR(COUNTIFS(\'Personas no asistidas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Personas no asistidas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 11: Derivaciones institucionales
    reporte.getRange('B11').setFormula('=IFERROR(COUNTA(\'Derivaciones Institucionales\'!A:A)-1,0)');
    reporte.getRange('C11').setFormula('=IFERROR(COUNTIFS(\'Derivaciones Institucionales\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Derivaciones Institucionales\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 14: Formulario de Bienestar (con filtro de fecha — tiene datos históricos de KoboToolbox)
    reporte.getRange('B14').setFormula('=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
    reporte.getRange('C14').setFormula('=IFERROR(COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0),\'C_03_Formulario de Bienestar (2026)\'!B:B,"Sí")+COUNTIFS(\'C_03_Formulario de Bienestar (2026)\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'C_03_Formulario de Bienestar (2026)\'!A:A,"<="&EOMONTH(TODAY(),0),\'C_03_Formulario de Bienestar (2026)\'!B:B,"Si"),0)');

    // Filas 17-20: Casos activos por terapeuta (columna B: casos activos)
    reporte.getRange('B17').setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Gerber",\'Terapias Individual\'!I:I,"En proceso"),0)');
    reporte.getRange('B18').setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Melissa",\'Terapias Individual\'!I:I,"En proceso"),0)');
    reporte.getRange('B19').setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Diana",\'Terapias Individual\'!I:I,"En proceso"),0)');
    reporte.getRange('B20').setFormula('=IFERROR(COUNTIFS(\'Terapias Individual\'!B:B,"Karina",\'Terapias Individual\'!I:I,"En proceso"),0)');

    // Filas 17-20: Sesiones mes (columna C) = Suma de Asistencias (columna M)
    // NOTA: Se cuentan TODAS las filas con terapeuta asignado, no solo "En proceso",
    // para que los retiros y culminados del mes no resten sesiones ya realizadas.
    reporte.getRange('C17').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Gerber",\'Terapias Individual\'!M:M),0)');
    reporte.getRange('C18').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Melissa",\'Terapias Individual\'!M:M),0)');
    reporte.getRange('C19').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Diana",\'Terapias Individual\'!M:M),0)');
    reporte.getRange('C20').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Karina",\'Terapias Individual\'!M:M),0)');

    // Filas 17-20: Inasistencias (columna D) = Suma de Inasistencias (columna L)
    reporte.getRange('D17').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Gerber",\'Terapias Individual\'!L:L),0)');
    reporte.getRange('D18').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Melissa",\'Terapias Individual\'!L:L),0)');
    reporte.getRange('D19').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Diana",\'Terapias Individual\'!L:L),0)');
    reporte.getRange('D20').setFormula('=IFERROR(SUMIF(\'Terapias Individual\'!B:B,"Karina",\'Terapias Individual\'!L:L),0)');

    // Fila 21: TOTAL casos activos, sesiones e inasistencias
    reporte.getRange('B21').setFormula('=IFERROR(SUM(B17:B20),0)');
    reporte.getRange('C21').setFormula('=IFERROR(SUM(C17:C20),0)');
    reporte.getRange('D21').setFormula('=IFERROR(SUM(D17:D20),0)');

    // Fila 23: header
    reporte.getRange('E23').setValue('Culminados 12+ ses.');

    // Fila 24: Procesos Culminados
    reporte.getRange('A24').setValue('Procesos Culminados');
    reporte.getRange('B24').setFormula('=IFERROR(COUNTA(\'Procesos Culminados\'!A:A)-1,0)');
    reporte.getRange('C24').setFormula('=IFERROR(COUNTIFS(\'Procesos Culminados\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Procesos Culminados\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');
    reporte.getRange('E24').setFormula('=IFERROR(COUNTIF(\'Procesos Culminados\'!E2:E500,">=12"),0)');

    // Fila 27: Retiradx
    reporte.getRange('B27').setFormula('=IFERROR(COUNTA(Retiradx!A:A)-1,0)');
    reporte.getRange('C27').setFormula('=IFERROR(COUNTIFS(Retiradx!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Retiradx!A:A,"<="&EOMONTH(TODAY(),0)),0)');
    reporte.getRange('E27').setValue('');

    // Fila 30: Intervencion de casos
    reporte.getRange('B30').setFormula('=IFERROR(COUNTA(\'Intervención de casos\'!A:A)-1,0)');

    // Fila 33: Total casos procesados
    reporte.getRange('B33').setFormula('=IFERROR(B24+B27+B30,0)');

    // Fila 34: Tasa de exito - eliminada
    reporte.getRange('A34').setValue('');
    reporte.getRange('B34').setValue('');

    // Fila 35: Casos activos totales
    reporte.getRange('B35').setFormula('=IFERROR(B21,0)');

    // SECCION CAPTACION
    reporte.getRange('A36:E36').setValues([['', '', '', '', '']]);
    reporte.getRange('A37:E37').setValues([['CAPTACION', 'Total', 'Este mes', '', '']]);
    reporte.getRange('A37:E37')
      .setBackground('#1565c0').setFontColor('white').setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle').setFontSize(11);
    reporte.setRowHeight(37, 35);
    reporte.getRange('A38').setValue('Hoja de interes (Terapia Individual)');
    reporte.getRange('A39').setValue('Referencias de programas recibidas');
    reporte.getRange('A40').setValue('Derivaciones institucionales recibidas');
    [38, 39, 40].forEach((row, idx) => {
      reporte.getRange('A' + row + ':E' + row)
        .setBackground(idx % 2 === 0 ? '#ffffff' : '#f5f5f5')
        .setFontSize(10).setVerticalAlignment('middle');
      reporte.setRowHeight(row, 28);
    });

    // Fila 38: Hoja de interes
    reporte.getRange('B38').setFormula('=IFERROR(COUNTA(\'Hoja de interés\'!C:C)-1,0)');
    reporte.getRange('C38').setFormula('=IFERROR(COUNTIFS(\'Hoja de interés\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Hoja de interés\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 39: Referencias
    reporte.getRange('B39').setFormula('=IFERROR(COUNTA(\'Referencias de programas\'!A:A)-1,0)');
    reporte.getRange('C39').setFormula('=IFERROR(COUNTIFS(\'Referencias de programas\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Referencias de programas\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    // Fila 40: Derivaciones Institucionales
    reporte.getRange('B40').setFormula('=IFERROR(COUNTA(\'Derivaciones Institucionales\'!A:A)-1,0)');
    reporte.getRange('C40').setFormula('=IFERROR(COUNTIFS(\'Derivaciones Institucionales\'!A:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),\'Derivaciones Institucionales\'!A:A,"<="&EOMONTH(TODAY(),0)),0)');

    ss.toast(
      'FORMULAS ACTUALIZADAS\n\n' +
      'Todas las formulas del reporte han sido actualizadas:\n' +
      'Sesiones mes = SOLO Asistencias reales (columna M)\n' +
      'Inasistencias = Contador de inasistencias (columna L)\n' +
      'Culminados 12+ ses. = Numero de personas con 12+ sesiones\n' +
      'Proteccion IFERROR y filtros correctos\n\n' +
      'El reporte ahora muestra solo numeros exactos, sin porcentajes.',
      'Reporte Actualizado',
      6
    );

    Logger.log('Formulas del reporte actualizadas correctamente');

  } catch (error) {
    ss.toast('Error: ' + error.message, 'Error', 5);
    Logger.log('Error actualizando formulas del reporte: ' + error.message);
  }
}

/**
 * Diagnóstico del reporte - Muestra qué hay en Terapias y por qué no funciona
 */
function diagnosticarReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    const reporte = ss.getSheetByName('Reporte');
    if (!reporte) {
      ui.alert('❌ No existe la hoja "Reporte". Usa Instalación → Instalar Sistema para crearla.', '', ui.ButtonSet.OK);
      return;
    }

    // Todas las hojas que el reporte referencia + celda donde aparece su dato
    const checks = [
      { nombre: 'Personas no asistidas',             col: 'B', celda: 'B8',  desc: 'No asistidas' },
      { nombre: 'Derivaciones Institucionales',      col: 'E', celda: 'B11', desc: 'Derivaciones' },
      { nombre: 'C_03_Formulario de Bienestar (2026)', col: 'A', celda: 'B14', desc: 'Bienestar' },
      { nombre: 'Terapias Individual',                          col: 'A', celda: 'B21', desc: 'Terapias total' },
      { nombre: 'Procesos Culminados',               col: 'A', celda: 'B24', desc: 'Culminados' },
      { nombre: 'Retiradx',                       col: 'A', celda: 'B27', desc: 'Retiradx' },
      { nombre: 'Intervención de casos',             col: 'A', celda: 'B30', desc: 'Intervención' },
      { nombre: 'Hoja de interés',             col: 'B', celda: 'B38', desc: 'Interés (captación)' },
      { nombre: 'Referencias de programas',                       col: 'D', celda: 'B39', desc: 'Referencias (captación)' }
    ];

    let info = '🔍 DIAGNÓSTICO COMPLETO DEL REPORTE\n';
    info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    let hayProblemas = false;

    checks.forEach(c => {
      const hoja = ss.getSheetByName(c.nombre);
      const existe = !!hoja;
      const filas = existe ? Math.max(0, hoja.getLastRow() - 1) : 0;
      const valorCelda = existe ? reporte.getRange(c.celda).getValue() : '—';
      const formulaCelda = reporte.getRange(c.celda).getFormula();
      const tieneFormula = formulaCelda && formulaCelda.startsWith('=');

      let estado;
      if (!existe) {
        estado = '❌ Hoja NO existe';
        hayProblemas = true;
      } else if (!tieneFormula) {
        estado = '⚠️ Celda sin fórmula (valor fijo: ' + valorCelda + ')';
        hayProblemas = true;
      } else if (filas === 0) {
        estado = '✅ Hoja existe — SIN datos todavía';
      } else {
        estado = '✅ ' + filas + ' registros → muestra: ' + valorCelda;
      }

      info += '• ' + c.desc + ' [' + c.celda + ']\n  ' + estado + '\n';
    });

    // Verificar también fórmula B11 (la que se había corregido)
    const fB11 = reporte.getRange('B11').getFormula();
    if (fB11 && fB11.includes('Lista de Espera')) {
      info += '\n⚠️ FÓRMULA DESACTUALIZADA: B11 apunta a "Lista de Espera" — necesita corrección.\n';
      hayProblemas = true;
    }

    if (hayProblemas) {
      info += '\n🔧 ACCIÓN RECOMENDADA:\n';
      info += 'Menú → Mantenimiento → "Actualizar Fórmulas Reporte"\n';
      info += 'Esto repara todas las fórmulas en un solo paso.';
    } else {
      info += '\n✅ Todas las fórmulas están correctas.\n';
      info += 'Si sigues viendo ceros, significa que las hojas están vacías\n';
      info += '(aún no se han ingresado datos en esas secciones).';
    }

    ui.alert('Diagnóstico del Reporte', info, ui.ButtonSet.OK);
    Logger.log('Diagnóstico reporte:\n' + info);

  } catch (error) {
    ui.alert('❌ Error', error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error en diagnosticarReporte: ' + error.message);
  }
}

/**
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * @deprecated No usar - hoja Lista de Espera eliminada
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
 * Importa datos automáticamente SILENCIOSAMENTE (sin mensajes)
 * Para el trigger automático - solo alerta cuando hay protocolo de suicidio
 */
function importarDatosAutomaticoSilencioso() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // SIN TOASTS - Ejecución silenciosa
  Logger.log('🔄 Importación silenciosa iniciada: ' + new Date().toLocaleString());

  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';

    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    if (response.getResponseCode() !== 200) {
      Logger.log('❌ Error HTTP: ' + response.getResponseCode());
      return;
    }

    const csvData = response.getContentText();
    if (!csvData || csvData.trim().length === 0) {
      Logger.log('⚠️ CSV vacío');
      return;
    }

    // Parsear CSV
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
      Logger.log('ℹ️ Sin datos nuevos');
      return;
    }

    // Obtener/crear hoja
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      sheet = ss.insertSheet('C_03_Formulario de Bienestar (2026)');
    }

    const headersCSV = filas[0];
    const colCreamosID = headersCSV.findIndex(h => h && (h.toString() === 'Creamos ID' || h.toString().toLowerCase().includes('creamos')));
    const colProtocoloSuicidio = headersCSV.findIndex(h => h && h.toString().toLowerCase().includes('activar_protocolo_suicidio'));
    const colApoyo = headersCSV.findIndex(h => h && h.toString().toLowerCase().includes('apoyo emocional'));

    if (colCreamosID < 0 || colProtocoloSuicidio < 0 || colApoyo < 0) {
      Logger.log('❌ Columnas no encontradas');
      return;
    }

    // Crear headers si es nueva
    const ultimaFila = sheet.getLastRow();
    const esHojaNueva = ultimaFila === 0;

    if (esHojaNueva) {
      const encabezadosCortos = ['Creamos ID', 'activar_protocolo_suicidio', '¿Te gustaría que nuestro equipo de Apoyo Emocional se pusiera en contacto contigo para informarte sobre sus servicios?', 'Nota', 'Hoja de Interés'];
      sheet.getRange(1, 1, 1, 5).setValues([encabezadosCortos])
        .setBackground('#d9534f').setFontColor('white').setFontWeight('bold')
        .setHorizontalAlignment('center').setWrap(true);
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(2, 200);
      sheet.setColumnWidth(3, 300);
      sheet.setColumnWidth(4, 250);
      sheet.setColumnWidth(5, 180);
      sheet.setFrozenRows(1);
      const validacionEnvio = SpreadsheetApp.newDataValidation().requireValueInList(['Sí', 'No'], true).setAllowInvalid(false).build();
      sheet.getRange('E2:E1000').setDataValidation(validacionEnvio);
    }

    let filasNuevas = 0;
    let alertasDetectadas = 0;
    let enviadasAListaEspera = 0;
    const datosActuales = sheet.getDataRange().getValues();

    // Procesar filas SIN logging extensivo
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
      filasNuevas++;

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
            alertasDetectadas++;
            Logger.log('🆘 ALERTA ENVIADA: ' + creamosID);

            // MOSTRAR ALERTA GRANDE SOLO CUANDO HAY PROTOCOLO
            ss.toast(
              '🆘 ¡ALERTA DE PROTOCOLO DE SUICIDIO!\n\n' +
              'Creamos ID: ' + creamosID + '\n\n' +
              'Se ha enviado correo URGENTE a los terapeutas.',
              '🆘 ALERTA CRÍTICA',
              15
            );
          } catch (error) {
            Logger.log('❌ Error enviando alerta: ' + error.message);
          }
        }
      }

      // DESHABILITADO: Envío automático a Lista de Espera
      // El usuario NO quiere envío automático - SOLO MANUAL
      /*
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
      */
    }

    // Logging final (solo en log, no en pantalla)
    Logger.log('✅ Importación silenciosa completada');
    Logger.log('   Nuevos: ' + filasNuevas + ' | Alertas: ' + alertasDetectadas + ' | Lista Espera: ' + enviadasAListaEspera);

  } catch (error) {
    Logger.log('❌ Error en importación silenciosa: ' + error.message);
  }
}

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

      // DESHABILITADO: Envío automático a Lista de Espera
      // El usuario NO quiere envío automático - SOLO MANUAL
      /*
      const quiereApoyo = apoyoEmocional ? apoyoEmocional.toString().toLowerCase().trim() : '';
      Logger.log('🔍 Apoyo Emocional: "' + apoyoEmocional + '" (normalizado: "' + quiereApoyo + '")');

      if (quiereApoyo === 'sí' || quiereApoyo === 'si' || quiereApoyo === 'yes') {
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        Logger.log('📤 ENVIANDO AUTOMÁTICAMENTE A LISTA DE ESPERA');
        Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        try {
          // Obtener headers de la hoja de Bienestar (no del CSV)
          const headersBienestar = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] || [];
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
      */
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
 * Instala un trigger para importar automáticamente cada 1 minuto SILENCIOSAMENTE
 */
function instalarImportacionAutomatica() {
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    'Activar Importación Automática SILENCIOSA',
    '🔇 IMPORTACIÓN SILENCIOSA CADA 1 MINUTO\n\n' +
    'El sistema:\n' +
    '• Verifica nuevos formularios cada minuto\n' +
    '• NO muestra mensajes molestos\n' +
    '• SOLO alerta cuando detecta protocolo de suicidio\n' +
    '• Funciona en segundo plano sin interrumpir\n\n' +
    '⚠️ IMPORTANTE:\n' +
    '1 minuto es el MÍNIMO que permite Google\n' +
    '(No es posible menos tiempo por limitación técnica)\n\n' +
    '💡 Si necesitas verificar más rápido, usa:\n' +
    '🆘 VERIFICAR ALERTAS AHORA (manual)\n\n' +
    '¿Activar importación automática?',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  try {
    // Eliminar triggers existentes
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      const func = trigger.getHandlerFunction();
      if (func === 'importarDatosAutomatico' || func === 'importarDatosAutomaticoSilencioso') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Crear nuevo trigger SILENCIOSO cada 1 minuto
    ScriptApp.newTrigger('importarDatosAutomaticoSilencioso')
      .timeBased()
      .everyMinutes(1)
      .create();

    ui.alert(
      '✅ Importación Automática SILENCIOSA Activada',
      '🔇 IMPORTACIÓN SILENCIOSA CADA 1 MINUTO\n\n' +
      'El sistema ahora:\n' +
      '• Verifica formularios cada minuto\n' +
      '• Trabaja en segundo plano\n' +
      '• NO muestra mensajes al importar\n' +
      '• SOLO alerta cuando detecta protocolo de suicidio 🆘\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '💡 IMPORTANTE:\n' +
      'No verás mensajes molestos cada minuto.\n' +
      'Solo verás una alerta GRANDE cuando se\n' +
      'active el protocolo de suicidio.\n\n' +
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

      // DESHABILITADO: Envío automático a Lista de Espera
      // El usuario NO quiere envío automático - SOLO MANUAL
      /*
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
      */
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
 * Diagnóstico COMPLETO de todo el sistema de importación
 */
function diagnosticoCompletoSistema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  let reporte = '🩺 DIAGNÓSTICO COMPLETO DEL SISTEMA\n\n';

  try {
    // 1. VERIFICAR HOJA
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    reporte += '1️⃣ VERIFICACIÓN DE HOJA\n';
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    const nombreHoja = 'C_03_Formulario de Bienestar (2026)';
    const sheet = ss.getSheetByName(nombreHoja);

    if (!sheet) {
      reporte += '❌ La hoja NO EXISTE\n\n';
      reporte += 'Nombre esperado: ' + nombreHoja + '\n\n';
      reporte += 'SOLUCIÓN: Ejecuta primero una importación manual:\n';
      reporte += '🏥 Bienestar → ⚡ Importar Datos Ahora\n';
      ui.alert('❌ Hoja No Encontrada', reporte, ui.ButtonSet.OK);
      return;
    }

    reporte += '✅ Hoja encontrada: "' + nombreHoja + '"\n';
    const ultimaFila = sheet.getLastRow();
    const ultimaColumna = sheet.getLastColumn();
    reporte += '   Última fila: ' + ultimaFila + '\n';
    reporte += '   Última columna: ' + ultimaColumna + '\n';

    if (ultimaFila === 0) {
      reporte += '   ⚠️ Hoja VACÍA (ni siquiera tiene headers)\n\n';
    } else if (ultimaFila === 1) {
      reporte += '   ⚠️ Solo tiene headers, NO hay datos\n\n';
    } else {
      reporte += '   ✅ Tiene ' + (ultimaFila - 1) + ' registro(s) de datos\n\n';
    }

    // 2. VERIFICAR TRIGGERS
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    reporte += '2️⃣ VERIFICACIÓN DE TRIGGERS\n';
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    const triggers = ScriptApp.getProjectTriggers();
    let triggerImportacionEncontrado = false;

    if (triggers.length === 0) {
      reporte += '❌ NO HAY TRIGGERS INSTALADOS\n\n';
      reporte += '⚠️ ESTE ES EL PROBLEMA\n\n';
      reporte += 'Sin trigger, la importación automática NO FUNCIONA.\n';
      reporte += 'Solo funciona cuando haces click manual.\n\n';
      reporte += 'SOLUCIÓN:\n';
      reporte += '🏥 Bienestar → ⏰ Activar Importación Rápida\n\n';
    } else {
      reporte += 'Total de triggers: ' + triggers.length + '\n\n';

      for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];
        const funcion = trigger.getHandlerFunction();

        if (funcion === 'importarDatosAutomaticoSilencioso' || funcion === 'importarDatosAutomatico') {
          triggerImportacionEncontrado = true;
          reporte += '✅ Trigger de importación ENCONTRADO\n';
          reporte += '   Función: ' + funcion + '\n';

          if (funcion === 'importarDatosAutomaticoSilencioso') {
            reporte += '   ✅ Versión: SILENCIOSA (correcta)\n\n';
          } else {
            reporte += '   ⚠️ Versión: ANTIGUA (con mensajes)\n';
            reporte += '   Recomendación: Reinstalar\n\n';
          }
        }
      }

      if (!triggerImportacionEncontrado) {
        reporte += '❌ NO hay trigger de importación\n\n';
        reporte += '⚠️ ESTE ES EL PROBLEMA\n\n';
        reporte += 'Hay otros triggers, pero NO el de importación.\n\n';
        reporte += 'SOLUCIÓN:\n';
        reporte += '🏥 Bienestar → ⏰ Activar Importación Rápida\n\n';
      }
    }

    // 3. VERIFICAR CSV
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    reporte += '3️⃣ VERIFICACIÓN DE CSV\n';
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';

    try {
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        followRedirects: true
      });

      const codigo = response.getResponseCode();
      reporte += 'Código HTTP: ' + codigo;

      if (codigo === 200) {
        reporte += ' ✅ OK\n\n';

        const csvData = response.getContentText();
        const lineas = csvData.split('\n');
        reporte += 'Líneas en CSV: ' + lineas.length + '\n';

        if (lineas.length <= 1) {
          reporte += '⚠️ CSV solo tiene headers o está vacío\n\n';
        } else {
          reporte += '✅ CSV tiene ' + (lineas.length - 1) + ' registros\n\n';
        }
      } else {
        reporte += ' ❌ ERROR\n\n';
        reporte += '⚠️ EL CSV NO ES ACCESIBLE\n\n';
        reporte += 'SOLUCIÓN:\n';
        reporte += '1. Ve a KoboToolbox\n';
        reporte += '2. Abre tu formulario\n';
        reporte += '3. Settings → Sharing\n';
        reporte += '4. Activa "Share data publicly"\n\n';
      }
    } catch (error) {
      reporte += '❌ Error al descargar CSV\n';
      reporte += 'Error: ' + error.message + '\n\n';
    }

    // 4. RESUMEN Y DIAGNÓSTICO
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    reporte += '📊 RESUMEN Y DIAGNÓSTICO\n';
    reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    if (!triggerImportacionEncontrado) {
      reporte += '🔴 PROBLEMA PRINCIPAL IDENTIFICADO:\n';
      reporte += 'NO HAY TRIGGER DE IMPORTACIÓN INSTALADO\n\n';
      reporte += 'Por eso:\n';
      reporte += '✅ Importación MANUAL funciona\n';
      reporte += '❌ Importación AUTOMÁTICA NO funciona\n\n';
      reporte += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      reporte += '🛠️ SOLUCIÓN:\n';
      reporte += '1. Ve al menú: 🏥 Bienestar\n';
      reporte += '2. Click en: ⏰ Activar Importación Rápida\n';
      reporte += '3. Confirma con "Sí"\n';
      reporte += '4. Espera 1-2 minutos\n';
      reporte += '5. Llena un formulario de prueba\n';
      reporte += '6. Verifica que llegue automáticamente\n';
    } else {
      reporte += '✅ TRIGGER INSTALADO CORRECTAMENTE\n\n';
      reporte += 'Si los datos NO llegan automáticamente:\n\n';
      reporte += 'Posibles causas:\n';
      reporte += '1. El formulario en KoboToolbox no tiene\n';
      reporte += '   respuestas nuevas\n';
      reporte += '2. Todos los registros ya existen en la hoja\n';
      reporte += '   (el sistema evita duplicados)\n';
      reporte += '3. El trigger se ejecuta pero falla\n\n';
      reporte += 'SOLUCIÓN:\n';
      reporte += '1. Llena un formulario NUEVO en KoboToolbox\n';
      reporte += '2. Espera 2 minutos\n';
      reporte += '3. Revisa el LOG:\n';
      reporte += '   Apps Script → Ver → Registros\n';
      reporte += '4. Busca líneas con:\n';
      reporte += '   "🔄 Importación silenciosa iniciada"\n';
    }

    ui.alert('🩺 Diagnóstico Completo', reporte, ui.ButtonSet.OK);
    Logger.log('\n' + reporte);

  } catch (error) {
    reporte += '\n❌ ERROR EN DIAGNÓSTICO:\n';
    reporte += error.message + '\n\n';
    reporte += error.toString();
    ui.alert('❌ Error', reporte, ui.ButtonSet.OK);
    Logger.log(reporte);
  }
}

/**
 * Muestra todos los triggers activos del proyecto
 */
function verTriggersActivos() {
  const ui = SpreadsheetApp.getUi();

  try {
    const triggers = ScriptApp.getProjectTriggers();

    let mensaje = '⏰ TRIGGERS ACTIVOS\n\n';

    if (triggers.length === 0) {
      mensaje += '❌ NO HAY TRIGGERS INSTALADOS\n\n';
      mensaje += 'Esto explica por qué no llegan datos automáticamente.\n\n';
      mensaje += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      mensaje += 'SOLUCIÓN:\n';
      mensaje += '🏥 Bienestar → ⏰ Activar Importación Rápida\n\n';
      mensaje += 'Esto instalará un trigger que importará\n';
      mensaje += 'datos CADA 1 MINUTO automáticamente.';

      ui.alert('❌ Sin Triggers Activos', mensaje, ui.ButtonSet.OK);
      return;
    }

    mensaje += 'Total de triggers: ' + triggers.length + '\n\n';
    mensaje += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    let triggerBienestarEncontrado = false;

    for (let i = 0; i < triggers.length; i++) {
      const trigger = triggers[i];
      const funcion = trigger.getHandlerFunction();
      const tipo = trigger.getEventType();

      mensaje += 'TRIGGER #' + (i + 1) + ':\n';
      mensaje += '  Función: ' + funcion + '\n';
      mensaje += '  Tipo: ' + tipo + '\n';

      if (tipo === ScriptApp.EventType.CLOCK) {
        mensaje += '  ⏰ Trigger de tiempo\n';

        if (funcion === 'importarDatosAutomaticoSilencioso') {
          mensaje += '  ✅ IMPORTACIÓN SILENCIOSA ACTIVA\n';
          triggerBienestarEncontrado = true;
        } else if (funcion === 'importarDatosAutomatico') {
          mensaje += '  ⚠️ Importación antigua (con mensajes)\n';
          mensaje += '  Recomendación: Reinstalar para versión silenciosa\n';
          triggerBienestarEncontrado = true;
        }
      } else if (tipo === ScriptApp.EventType.ON_EDIT) {
        mensaje += '  ✏️ Trigger de edición\n';
      } else if (tipo === ScriptApp.EventType.ON_OPEN) {
        mensaje += '  📂 Trigger de apertura\n';
      }

      mensaje += '\n';
    }

    mensaje += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    if (triggerBienestarEncontrado) {
      mensaje += '✅ TRIGGER DE IMPORTACIÓN: ACTIVO\n\n';
      mensaje += 'El sistema está configurado correctamente.\n';
      mensaje += 'Los datos deberían llegar automáticamente\n';
      mensaje += 'cada 1 minuto.\n\n';
      mensaje += '💡 Si no llegan datos:\n';
      mensaje += '1. Verifica que hayas llenado el formulario\n';
      mensaje += '2. Usa 🆘 VERIFICAR ALERTAS AHORA\n';
      mensaje += '3. Revisa el LOG (Ver → Registros)';
    } else {
      mensaje += '❌ TRIGGER DE IMPORTACIÓN: NO ENCONTRADO\n\n';
      mensaje += 'No hay trigger instalado para importar datos\n';
      mensaje += 'de KoboToolbox automáticamente.\n\n';
      mensaje += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      mensaje += 'SOLUCIÓN:\n';
      mensaje += '🏥 Bienestar → ⏰ Activar Importación Rápida\n\n';
      mensaje += 'Esto instalará el trigger necesario.';
    }

    ui.alert('⏰ Triggers del Proyecto', mensaje, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('❌ Error', 'Error al obtener triggers:\n\n' + error.message, ui.ButtonSet.OK);
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

    // Buscar datos importantes del registro
    let creamosID = '';
    let nombre = '';
    let telefono = '';
    let emailParticipante = '';

    for (let i = 0; i < headers.length; i++) {
      const campo = headers[i].toString().toLowerCase();
      const valor = registro[i] || '';

      if (campo.includes('creamos') && campo.includes('id')) {
        creamosID = valor;
      } else if (campo.includes('nombre') && !campo.includes('apellido')) {
        nombre = valor;
      } else if (campo.includes('telefono') || campo.includes('phone')) {
        telefono = valor;
      } else if (campo.includes('email') || campo.includes('correo')) {
        emailParticipante = valor;
      }
    }

    const fechaHora = new Date().toLocaleString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Construir HTML profesional y urgente
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 20px auto; background-color: white; }
    .header { background-color: #d32f2f; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
    .header p { margin: 10px 0 0 0; font-size: 16px; }
    .alert-icon { font-size: 48px; margin-bottom: 10px; }
    .content { padding: 30px 20px; }
    .info-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
    .info-box h3 { margin: 0 0 10px 0; color: #856404; font-size: 16px; }
    .data-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .data-table td { padding: 10px; border-bottom: 1px solid #e0e0e0; }
    .data-table td:first-child { font-weight: bold; color: #666; width: 40%; }
    .action-box { background-color: #ffebee; border: 2px solid #d32f2f; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .action-box h3 { margin: 0 0 15px 0; color: #c62828; font-size: 18px; }
    .action-box ol { margin: 10px 0; padding-left: 20px; }
    .action-box li { margin: 8px 0; color: #c62828; font-weight: 500; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { display: inline-block; background-color: #d32f2f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
    .timestamp { background-color: #e3f2fd; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="alert-icon">🆘</div>
      <h1>ALERTA URGENTE</h1>
      <p>PROTOCOLO DE SUICIDIO ACTIVADO</p>
    </div>

    <div class="content">
      <div class="timestamp">
        <strong>⏰ Fecha y Hora:</strong> ${fechaHora}
      </div>

      <div class="info-box">
        <h3>⚠️ ATENCIÓN INMEDIATA REQUERIDA</h3>
        <p>Se ha activado el protocolo de suicidio en el Formulario de Bienestar. Este caso requiere intervención inmediata del equipo de terapeutas.</p>
      </div>

      <h3 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">📋 INFORMACIÓN DEL PARTICIPANTE</h3>

      <table class="data-table">
        ${creamosID ? `<tr><td>🆔 Creamos ID</td><td><strong>${creamosID}</strong></td></tr>` : ''}
        ${nombre ? `<tr><td>👤 Nombre</td><td><strong>${nombre}</strong></td></tr>` : ''}
        ${telefono ? `<tr><td>📞 Teléfono</td><td><strong>${telefono}</strong></td></tr>` : ''}
        ${emailParticipante ? `<tr><td>📧 Email</td><td><strong>${emailParticipante}</strong></td></tr>` : ''}
        <tr><td>🆘 Protocolo Suicidio</td><td><strong style="color: #d32f2f;">SÍ - ACTIVADO</strong></td></tr>
      </table>

      <div class="action-box">
        <h3>⚠️ PROTOCOLO DE ACCIÓN INMEDIATA</h3>
        <ol>
          <li>Contactar al participante INMEDIATAMENTE</li>
          <li>Evaluar el nivel de riesgo actual</li>
          <li>Activar protocolo de intervención en crisis</li>
          <li>Documentar todas las acciones tomadas en el sistema</li>
          <li>Notificar al coordinador del caso</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${ss.getUrl()}" class="button">📊 ABRIR GOOGLE SHEET</a>
      </div>

      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #666;">📄 Datos Completos del Formulario:</h4>
        <table class="data-table" style="font-size: 12px;">
          ${headers.map((h, i) => {
            const valor = registro[i] || '(vacío)';
            return `<tr><td>${h}</td><td>${valor}</td></tr>`;
          }).join('')}
        </table>
      </div>
    </div>

    <div class="footer">
      <p><strong>Sistema de Apoyo Emocional</strong></p>
      <p>Este es un correo automático generado por el sistema.</p>
      <p>📊 ${ss.getName()}</p>
      ${esPrueba ? '<p style="color: #ff9800; font-weight: bold;">🧪 MODO DE PRUEBA - Este correo es solo para pruebas</p>' : ''}
    </div>
  </div>
</body>
</html>
`;

    // Texto plano como fallback
    let textoPlano =
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '🆘 ALERTA URGENTE - PROTOCOLO DE SUICIDIO\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '⏰ Fecha/Hora: ' + fechaHora + '\n\n' +
      '📋 INFORMACIÓN DEL PARTICIPANTE\n\n' +
      (creamosID ? '🆔 Creamos ID: ' + creamosID + '\n' : '') +
      (nombre ? '👤 Nombre: ' + nombre + '\n' : '') +
      (telefono ? '📞 Teléfono: ' + telefono + '\n' : '') +
      (emailParticipante ? '📧 Email: ' + emailParticipante + '\n' : '') +
      '🆘 Protocolo Suicidio: SÍ - ACTIVADO\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '⚠️ PROTOCOLO DE ACCIÓN INMEDIATA\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '1. Contactar al participante INMEDIATAMENTE\n' +
      '2. Evaluar el nivel de riesgo actual\n' +
      '3. Activar protocolo de intervención en crisis\n' +
      '4. Documentar todas las acciones tomadas\n' +
      '5. Notificar al coordinador del caso\n\n' +
      '📊 ABRIR GOOGLE SHEET:\n' +
      ss.getUrl() + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      'Sistema de Apoyo Emocional\n' +
      (esPrueba ? '🧪 MODO DE PRUEBA\n' : '') +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

    const asunto = '🆘 ALERTA URGENTE - Protocolo de Suicidio Activado' + (creamosID ? ' - ' + creamosID : '');

    // Enviar emails con HTML
    emailsTerapeutas.forEach(email => {
      MailApp.sendEmail({
        to: email,
        subject: asunto,
        body: textoPlano,
        htmlBody: htmlBody
      });
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
 * Renombra las hojas que tienen nombres antiguos al nuevo nombre correcto.
 * Seguro de ejecutar varias veces (idempotente).
 * Retorna un array con los cambios realizados.
 */
function repararNombresHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const renombres = [
    { viejo: 'Formulario de Interés', nuevo: 'Hoja de interés' },
    { viejo: 'Formulario de Interes', nuevo: 'Hoja de interés' },
    { viejo: 'Referencias',           nuevo: 'Referencias de programas' },
    { viejo: 'Terapias',              nuevo: 'Terapias Individual' },
    { viejo: 'Deserciones',           nuevo: 'Retiradx' }
  ];

  const cambios = [];
  renombres.forEach(r => {
    const hoja = ss.getSheetByName(r.viejo);
    if (hoja) {
      // Solo renombrar si el nuevo nombre NO existe ya
      if (!ss.getSheetByName(r.nuevo)) {
        hoja.setName(r.nuevo);
        cambios.push('✅ "' + r.viejo + '" → "' + r.nuevo + '"');
        Logger.log('✅ Hoja renombrada: "' + r.viejo + '" → "' + r.nuevo + '"');
      } else {
        cambios.push('⚠️ "' + r.nuevo + '" ya existe — "' + r.viejo + '" no se tocó');
        Logger.log('⚠️ Ambas hojas existen: "' + r.viejo + '" y "' + r.nuevo + '"');
      }
    }
  });

  return cambios;
}

/**
 * Ejecuta repararNombresHojas() y muestra resultado al usuario.
 * También actualiza las fórmulas del reporte después de renombrar.
 */
function repararNombresHojasConAviso() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const cambios = repararNombresHojas();

  // Reparar fórmulas del reporte después de renombrar
  try { actualizarFormulasReporte(); } catch(e) { Logger.log('⚠️ ' + e.message); }

  if (cambios.length === 0) {
    ui.alert('✅ Nombres de hojas', 'Todas las hojas ya tienen los nombres correctos.\nNo se realizaron cambios.', ui.ButtonSet.OK);
  } else {
    ui.alert('✅ Hojas renombradas', cambios.join('\n') + '\n\nLas fórmulas del reporte también fueron actualizadas.', ui.ButtonSet.OK);
  }
}

/**
 * INSTALACIÓN COMPLETA DEL SISTEMA
 * Ejecuta todos los pasos necesarios de una sola vez:
 * hojas, validaciones, triggers, fórmulas, reportes y Bienestar.
 */
function instalacionCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.alert(
    '🔴 INSTALACIÓN COMPLETA',
    'Esta opción instala y configura TODO el sistema de una sola vez:\n\n' +
    '1️⃣ Crear / verificar todas las hojas\n' +
    '2️⃣ Configurar todos los desplegables (dropdowns)\n' +
    '3️⃣ Recrear el Reporte con fórmulas correctas\n' +
    '4️⃣ Reinstalar trigger onEdit (asignación + asistencia)\n' +
    '5️⃣ Reinstalar trigger de tiempo (reportes cada hora)\n' +
    '6️⃣ Crear hoja de Bienestar si no existe\n' +
    '7️⃣ Crear hojas Hoja de interés, Referencias, Derivaciones e Intervención de casos\n' +
    '8️⃣ Activar auto-actualización de captación (cada hora)\n' +
    '9️⃣ Actualizar todos los reportes\n\n' +
    '⚠️ No borra datos existentes.\n\n' +
    '¿Continuar con la instalación completa?',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) return;

  // PASO: Preguntar si desea hacer copia de respaldo
  const respaldoPrompt = ui.alert(
    '💾 COPIA DE RESPALDO',
    '¿Desea crear una copia de respaldo del archivo antes de continuar?\n\n' +
    'Se recomienda crear una copia de seguridad para proteger sus datos.\n\n' +
    '✅ SI = Crear copia y continuar con instalación\n' +
    '❌ NO = Continuar sin crear copia\n' +
    '🚫 CANCELAR = Cancelar instalación',
    ui.ButtonSet.YES_NO_CANCEL
  );

  if (respaldoPrompt === ui.Button.CANCEL) {
    ss.toast('❌ Instalación cancelada', 'Cancelado', 2);
    return;
  }

  // Si el usuario quiere hacer respaldo, crear copia
  if (respaldoPrompt === ui.Button.YES) {
    try {
      ss.toast('📋 Creando copia de respaldo...', 'Copiando', 3);

      const nombreActual = ss.getName();
      const fechaHora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HHmm');
      const nombreRespaldo = nombreActual + ' - RESPALDO ' + fechaHora;

      const archivoOriginal = DriveApp.getFileById(ss.getId());
      const copiaNueva = archivoOriginal.makeCopy(nombreRespaldo);

      ss.toast(
        '✅ COPIA CREADA\n\n' +
        'Nombre: ' + nombreRespaldo + '\n\n' +
        'La copia está en la misma carpeta que el archivo original.',
        'Respaldo Completo',
        5
      );

      Logger.log('✅ Copia de respaldo creada: ' + nombreRespaldo + ' (ID: ' + copiaNueva.getId() + ')');
    } catch (error) {
      Logger.log('❌ Error creando copia de respaldo: ' + error.toString());
      const continuar = ui.alert(
        '❌ Error al crear copia',
        'No se pudo crear la copia de respaldo:\n\n' + error.message + '\n\n' +
        '¿Desea continuar con la instalación de todos modos?',
        ui.ButtonSet.YES_NO
      );
      if (continuar !== ui.Button.YES) {
        ss.toast('❌ Instalación cancelada', 'Cancelado', 2);
        return;
      }
    }
  }

  const pasos = [];

  try {
    // PASO 0: Renombrar hojas antiguas al nuevo nombre
    ss.toast('0️⃣ Verificando nombres de hojas...', 'Instalación Completa', -1);
    try {
      const cambiosNombres = repararNombresHojas();
      if (cambiosNombres.length > 0) {
        pasos.push('✅ Hojas renombradas: ' + cambiosNombres.join(', '));
      } else {
        pasos.push('✅ Nombres de hojas correctos (sin cambios)');
      }
    } catch (e) {
      pasos.push('⚠️ Renombrar hojas: ' + e.message);
    }

    // PASO 1: Crear / verificar hojas
    ss.toast('1️⃣ Creando hojas...', 'Instalación Completa', -1);
    try {
      crearHojas();
      pasos.push('✅ Hojas creadas / verificadas');
    } catch (e) {
      pasos.push('⚠️ Hojas: ' + e.message);
    }

    // PASO 2: Configurar validaciones (dropdowns)
    ss.toast('2️⃣ Configurando desplegables...', 'Instalación Completa', -1);
    try {
      const hojas = ['Lista de Espera', 'Terapias Individual',
                     'Procesos Culminados', 'Retiradx',
                     'Intervención de casos', 'Personas no asistidas'];
      hojas.forEach(h => {
        const s = ss.getSheetByName(h);
        if (s) s.getRange('A1:Z1000').clearDataValidations();
      });
      configurarValidaciones();
      pasos.push('✅ Desplegables configurados');
    } catch (e) {
      pasos.push('⚠️ Validaciones: ' + e.message);
    }

    // PASO 3: Recrear Reporte con fórmulas correctas
    ss.toast('3️⃣ Actualizando Reporte...', 'Instalación Completa', -1);
    try {
      const reporteViejo = ss.getSheetByName('Reporte');
      if (reporteViejo) ss.deleteSheet(reporteViejo);
      crearReporte();
      pasos.push('✅ Reporte recreado con fórmulas correctas');
    } catch (e) {
      pasos.push('⚠️ Reporte: ' + e.message);
    }

    // PASO 4: Reinstalar trigger onEdit
    ss.toast('4️⃣ Instalando trigger onEdit...', 'Instalación Completa', -1);
    try {
      ScriptApp.getProjectTriggers().forEach(t => {
        if (t.getHandlerFunction() === 'alEditar') ScriptApp.deleteTrigger(t);
      });
      ScriptApp.newTrigger('alEditar').forSpreadsheet(ss).onEdit().create();
      pasos.push('✅ Trigger onEdit instalado (asignación + asistencia)');
    } catch (e) {
      pasos.push('⚠️ Trigger onEdit: ' + e.message);
    }

    // PASO 5: Reinstalar trigger de tiempo
    ss.toast('5️⃣ Instalando trigger de tiempo...', 'Instalación Completa', -1);
    try {
      ScriptApp.getProjectTriggers().forEach(t => {
        if (t.getHandlerFunction() === 'actualizarReportes') ScriptApp.deleteTrigger(t);
      });
      ScriptApp.newTrigger('actualizarReportes').timeBased().everyMinutes(10).create();
      pasos.push('✅ Trigger de tiempo instalado (reportes cada 10 min)');
    } catch (e) {
      pasos.push('⚠️ Trigger de tiempo: ' + e.message);
    }

    // PASO 6: Crear hoja Bienestar si no existe
    ss.toast('6️⃣ Verificando hoja Bienestar...', 'Instalación Completa', -1);
    try {
      if (!ss.getSheetByName('C_03_Formulario de Bienestar (2026)')) {
        crearFormularioBienestar();
        pasos.push('✅ Hoja Bienestar creada');
      } else {
        pasos.push('✅ Hoja Bienestar ya existe');
      }
    } catch (e) {
      pasos.push('⚠️ Bienestar: ' + e.message);
    }

    // PASO 7: Crear hojas de captación (Interés, Referencias, Derivaciones)
    ss.toast('7️⃣ Creando hojas de captación...', 'Instalación Completa', -1);
    try {
      if (!ss.getSheetByName('Hoja de interés')) {
        crearHojaFormularioInteres();
        pasos.push('✅ Hoja Hoja de interés creada');
      } else {
        pasos.push('✅ Hoja Hoja de interés ya existe');
      }
    } catch (e) {
      pasos.push('⚠️ Hoja de interés: ' + e.message);
    }
    try {
      if (!ss.getSheetByName('Referencias de programas')) {
        crearHojaReferencias();
        pasos.push('✅ Hoja Referencias creada');
      } else {
        pasos.push('✅ Hoja Referencias ya existe');
      }
    } catch (e) {
      pasos.push('⚠️ Referencias: ' + e.message);
    }
    try {
      if (!ss.getSheetByName('Derivaciones Institucionales')) {
        crearHojaDerivacionesInstitucionales();
        pasos.push('✅ Hoja Derivaciones Institucionales creada');
      } else {
        pasos.push('✅ Hoja Derivaciones Institucionales ya existe');
      }
    } catch (e) {
      pasos.push('⚠️ Derivaciones Institucionales: ' + e.message);
    }
    // Importar datos iniciales de Intervención de casos
    try {
      importarIntervencionesCasos();
      pasos.push('✅ Intervención de casos importada');
    } catch (e) {
      pasos.push('⚠️ Intervención de casos: ' + e.message);
    }

    // PASO 8: Instalar trigger auto-actualización captación (cada 10 min)
    ss.toast('8️⃣ Instalando auto-actualización de captación...', 'Instalación Completa', -1);
    try {
      ScriptApp.getProjectTriggers().forEach(t => {
        if (t.getHandlerFunction() === 'importarHojasCaptacionSilencioso') ScriptApp.deleteTrigger(t);
      });
      ScriptApp.newTrigger('importarHojasCaptacionSilencioso').timeBased().everyMinutes(10).create();
      pasos.push('✅ Auto-actualización captación activada (cada 10 min)');
    } catch (e) {
      pasos.push('⚠️ Trigger captación: ' + e.message);
    }

    // PASO 9: Actualizar reportes
    ss.toast('9️⃣ Actualizando reportes...', 'Instalación Completa', -1);
    try {
      actualizarReportes();
      pasos.push('✅ Reportes actualizados');
    } catch (e) {
      pasos.push('⚠️ Reportes: ' + e.message);
    }

    // Ocultar hoja maestra al finalizar instalación
    try { _ocultarHojaMaestra(); } catch(e) {}

    ss.toast('', '', 1);

    ui.alert(
      '🎉 INSTALACIÓN COMPLETA EXITOSA',
      'Todos los pasos completados:\n\n' +
      pasos.join('\n') + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '📋 PRÓXIMOS PASOS:\n' +
      '1. Usa 🔄 ACTUALIZAR TODO para importar datos diariamente.\n' +
      '2. Configurar emails: Menú → ⚙️ Avanzado → 📧 Configurar Emails Terapeutas\n' +
      '3. Probar flujo: Asignar terapeuta en Lista de Espera → confirmar "Vino"',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Instalación completa exitosa: ' + pasos.join(' | '));

  } catch (error) {
    ss.toast('', '', 1);
    ui.alert('❌ Error en instalación', error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error en instalacionCompleta: ' + error.message);
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

    // 2. Crear hoja Hoja de interés si no existe
    if (!ss.getSheetByName('Hoja de interés')) {
      crearHojaFormularioInteres();
      ss.toast('✅ Hoja Hoja de interés creada', 'Instalando', 2);
      Utilities.sleep(1000);
    }

    // 3. Crear hoja Referencias si no existe
    if (!ss.getSheetByName('Referencias de programas')) {
      crearHojaReferencias();
      ss.toast('✅ Hoja Referencias creada', 'Instalando', 2);
      Utilities.sleep(1000);
    }

    // 4. Crear hoja Derivaciones Institucionales si no existe
    if (!ss.getSheetByName('Derivaciones Institucionales')) {
      crearHojaDerivacionesInstitucionales();
      ss.toast('✅ Hoja Derivaciones Institucionales creada', 'Instalando', 2);
      Utilities.sleep(1000);
    }

    // 5. Reparar validaciones
    ss.toast('Reparando validaciones...', 'Instalando', 2);
    configurarValidaciones();
    Utilities.sleep(1000);

    // 6. Reparar fórmulas
    ss.toast('Reparando fórmulas...', 'Instalando', 2);
    repararFormulasListaEspera();
    Utilities.sleep(1000);

    // 7. Actualizar reportes
    ss.toast('Actualizando reportes...', 'Instalando', 2);
    actualizarReportes();
    Utilities.sleep(1000);

    ui.alert(
      '✅ Actualizaciones Instaladas',
      'El sistema se ha actualizado correctamente.\n\n' +
      'Nuevas funciones disponibles:\n' +
      '• Formulario de Bienestar (2026)\n' +
      '• Derivaciones y Referencias\n' +
      '• Hoja de interés (terapia individual)\n' +
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


// =====================================================================
// UTILIDADES COMPARTIDAS (Hoja de interés, Referencias,
//                          Derivaciones Institucionales)
// =====================================================================

/**
 * Parsea un CSV y devuelve un array de arrays.
 * Detecta automáticamente el delimitador (; o ,).
 * @param {string} csvData - Texto CSV crudo
 * @returns {Array[]} filas parseadas (primera fila = headers)
 */
function _parsearCSV(csvData) {
  const primeraLinea = csvData.split('\n')[0] || '';
  const delimitador  = (primeraLinea.match(/;/g) || []).length >
                       (primeraLinea.match(/,/g) || []).length ? ';' : ',';
  const filas = [];
  csvData.split('\n').forEach(linea => {
    linea = linea.trim();
    if (!linea) return;
    const cols = linea.split(delimitador).map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.join('').trim()) filas.push(cols);
  });
  return filas;
}

/**
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * @deprecated No usar - hoja Lista de Espera eliminada
 */
function _agregarAListaEspera(sheetOrigen, filaOrigen, numColsOrigen, campos) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const espera = ss.getSheetByName('Lista de Espera');
  if (!espera) {
    ss.toast('❌ No se encontró la hoja Lista de Espera', 'Error', 3);
    Logger.log('❌ Lista de Espera no existe');
    return false;
  }

  const nombre    = (campos.nombre    || '').toString().trim();
  const creamosID = (campos.creamosID || '').toString().trim().toUpperCase();

  if (!nombre && !creamosID) {
    ss.toast('⚠️ Falta Nombre Completo o Creamos ID', 'Error', 3);
    return false;
  }

  // Verificar duplicados (por Creamos ID si existe; por Nombre si no)
  const datosEspera = espera.getDataRange().getValues();
  for (let i = 1; i < datosEspera.length; i++) {
    const idExist  = (datosEspera[i][3] || '').toString().trim();
    const nomExist = (datosEspera[i][2] || '').toString().trim().toLowerCase();
    if (creamosID && idExist && idExist === creamosID) {
      ss.toast('⚠️ Ya existe en Lista de Espera: ' + (nombre || creamosID), 'Duplicado', 3);
      Logger.log('⚠️ Duplicado por Creamos ID: ' + creamosID);
      return false;
    }
    if (!creamosID && nombre && nomExist && nomExist === nombre.toLowerCase()) {
      ss.toast('⚠️ Ya existe en Lista de Espera: ' + nombre, 'Duplicado', 3);
      Logger.log('⚠️ Duplicado por Nombre: ' + nombre);
      return false;
    }
  }

  // Insertar en Lista de Espera
  const nuevaFila = [
    '',                                              // A: Fecha (fórmula automática)
    '',                                              // B: No.  (fórmula automática)
    nombre || creamosID,                             // C: Nombre Completo
    creamosID,                                       // D: Creamos ID
    (campos.genero   || '').toString().trim(),       // E: Género
    (campos.edad     || '').toString().trim(),       // F: Edad
    (campos.malestar || '').toString().trim(),       // G: Malestar Principal
    (campos.telefono || '').toString().trim(),       // H: Teléfono
    (campos.derivacion   || '').toString().trim(),   // I: Derivación o Referencia
    (campos.quienDeriva  || '').toString().trim(),   // J: Nombre de quien deriva
    (campos.programa     || '').toString().trim(),   // K: Programa / Organización
    (campos.servicio     || '').toString().trim(),   // L: Servicio que solicita
    '',                                              // M: Terapeuta Asignado
    'Pendiente',                                     // N: Asistió a Cita
    0,                                               // O: Número de llamadas realizadas
    ''                                               // P: _notas_llamadas (oculto)
  ];

  // Buscar la primera fila vacía real (sin contenido en columnas importantes)
  // Revisamos solo hasta 100 filas después de la última con datos para no buscar muy lejos
  const ultimaFilaConDatos = espera.getLastRow();
  const limiteInferior = Math.min(ultimaFilaConDatos + 100, 1000);

  const valoresRango = espera.getRange(2, 1, limiteInferior - 1, 16).getValues();
  let dest = -1;

  for (let i = 0; i < valoresRango.length; i++) {
    // Una fila está vacía si las columnas C (Nombre), D (Creamos ID) y G (Malestar) están vacías
    const nombre = (valoresRango[i][2] || '').toString().trim();     // Columna C
    const creamosId = (valoresRango[i][3] || '').toString().trim();  // Columna D
    const malestar = (valoresRango[i][6] || '').toString().trim();   // Columna G

    if (!nombre && !creamosId && !malestar) {
      dest = i + 2; // 0-based → fila real (header en fila 1, datos desde fila 2)
      break;
    }
  }

  // Si no encontramos espacio, agregar después de la última fila con datos
  if (dest === -1) dest = ultimaFilaConDatos + 1;

  espera.getRange(dest, 1, 1, 16).setValues([nuevaFila]);
  espera.getRange(dest, 1, 1, 16)
    .setBackground('#e8f5e9').setFontColor('black').setHorizontalAlignment('left');

  // Marcar fila de origen en verde (registro queda, no se borra)
  sheetOrigen.getRange(filaOrigen, 1, 1, numColsOrigen).setBackground('#d4edda');

  const etiqueta = nombre || creamosID;
  Logger.log('✅ Enviado a Lista de Espera: ' + etiqueta);
  ss.toast('✅ Enviado a Lista de Espera: ' + etiqueta, 'Éxito', 3);
  return true;
}

/**
 * Devuelve el índice (0-based) de la primera columna cuyo encabezado
 * contenga alguno de los fragmentos indicados, ignorando mayúsculas/acentos.
 * @param {string[]} headers
 * @param {string[]} fragmentos
 * @returns {number} índice o -1
 */
function _buscarCol(headers, fragmentos) {
  const norm = s => (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return headers.findIndex(h => {
    const hn = norm(h);
    return fragmentos.some(f => hn.includes(norm(f)));
  });
}

/**
 * Igual que _buscarCol pero busca coincidencia EXACTA (sin incluir substrings).
 * Útil para evitar que "_submission_time" coincida con "fecha" genérico.
 * @param {string[]} headers
 * @param {string[]} terminos
 * @returns {number} índice o -1
 */
function _buscarColExacta(headers, terminos) {
  const norm = s => (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  return headers.findIndex(h => terminos.some(t => norm(h) === norm(t)));
}

/**
 * Devuelve TODOS los índices de columnas cuyo encabezado contenga alguno de los fragmentos.
 * Útil cuando KoboToolbox exporta múltiples columnas con el mismo nombre (ej: en diferentes secciones).
 * @param {string[]} headers
 * @param {string[]} fragmentos
 * @returns {number[]} array de índices
 */
function _buscarTodasCols(headers, fragmentos) {
  const norm = s => (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const indices = [];
  headers.forEach((h, idx) => {
    const hn = norm(h);
    if (fragmentos.some(f => hn.includes(norm(f)))) {
      indices.push(idx);
    }
  });
  return indices;
}

/**
 * Normaliza el valor de género a los valores canónicos del sistema.
 * KoboToolbox puede devolver "Mujer / Femenino", "Hombre / Masculino", etc.
 */
function _normalizarGenero(valor) {
  if (!valor) return '';
  const v = (valor || '').toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (v.includes('trans hombre') || v.includes('trans_hombre')) return 'Trans hombre';
  if (v.includes('no binario') || v.includes('no_binario'))     return 'No binario';
  if (v.includes('mujer') || v.includes('femenino'))            return 'Mujer';
  if (v.includes('hombre') || v.includes('masculino'))          return 'Hombre';
  if (v.includes('otro'))                                        return 'Otro';
  return valor.toString().trim();
}

/**
 * Convierte una fecha de nacimiento a edad en años (número entero).
 * Si el valor ya es un número, lo devuelve tal cual.
 * Si el valor es una fecha (en formato ISO, Excel serial, o Date), calcula la edad.
 * @param {string|number|Date} valor - Fecha de nacimiento o edad
 * @return {number|string} Edad en años como número entero, o cadena vacía si no se puede calcular
 */
function _calcularEdadDesdeNacimiento(valor) {
  if (!valor) return '';

  const str = (valor || '').toString().trim();
  if (!str) return '';

  // Si ya es un número entero (edad directa), devolverlo
  if (/^\d+$/.test(str)) {
    const edad = parseInt(str, 10);
    if (edad > 0 && edad < 120) return edad;
  }

  // Intentar parsear como fecha
  let fechaNacimiento;

  // Formato ISO: YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    fechaNacimiento = new Date(str);
  }
  // Número de serie de Excel (días desde 1900-01-01)
  else if (/^\d+(\.\d+)?$/.test(str)) {
    const serialNumber = parseFloat(str);
    // Excel serial date: días desde 1900-01-01 (con bug de año bisiesto 1900)
    if (serialNumber > 1000 && serialNumber < 100000) {
      const excelEpoch = new Date(1899, 11, 30); // 30 dic 1899
      fechaNacimiento = new Date(excelEpoch.getTime() + serialNumber * 86400000);
    }
  }
  // Si el valor ya es un objeto Date
  else if (valor instanceof Date) {
    fechaNacimiento = valor;
  }

  // Calcular edad
  if (fechaNacimiento && !isNaN(fechaNacimiento.getTime())) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaActual = hoy.getDate();
    const diaNacimiento = fechaNacimiento.getDate();

    // Ajustar si aún no ha cumplido años este año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }

    // Validar que la edad sea razonable
    if (edad >= 0 && edad < 120) {
      return edad;
    }
  }

  // Si no se pudo convertir, devolver el valor original
  return str;
}


// =====================================================================
// HOJA: FORMULARIO DE INTERÉS  (Múltiples Programas)
// URL Histórico 2024-2026: https://kf.kobotoolbox.org/api/v2/assets/akz5K2bGfvvisQaE7VaHev/
//      export-settings/esvntaAqU9GDq9aAkoKjPpY/data.csv
// URL Formulario Activo 2026: https://kf.kobotoolbox.org/api/v2/assets/auvEELWQEgiwF54W4pGpV5/
//      export-settings/esd2gxqN87HPuQDypxFqUNi/data.csv
//
// Estructura simplificada de la hoja (13 columnas):
//   A: Fecha | B: Creamos ID | C: Ya Participante | D: Nombre(s) | E: Apellido(s)
//   F: Género | G: Edad | H: Teléfono | I: Zona | J: Otra Zona
//   K: Programas Interés (consolidados) | L: _uuid (oculto, deduplicación) | M: Enviar a Lista de Espera
//
// El formulario histórico y el 2026 se consolidan en la misma estructura básica.
// Los programas seleccionados se listan en la columna K separados por comas.
// =====================================================================

// Variables movidas al inicio del archivo

/**
 * Crea la hoja "Hoja de interés" con estructura simplificada (13 columnas).
 * Incluye todas las columnas básicas del formulario 2026 + compatibilidad con histórico.
 */
function crearHojaFormularioInteres() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName('Hoja de interés')) {
    Logger.log('⚠️ Hoja Hoja de interés ya existe');
    return ss.getSheetByName('Hoja de interés');
  }

  const sheet = ss.insertSheet('Hoja de interés');
  const headers = [
    // Columnas básicas (A-L) + 5 nuevas (M-Q)
    'Fecha', 'Creamos ID', 'Ya Participante', 'Nombre(s)', 'Apellido(s)',
    'Género', 'Edad', 'Teléfono', 'Zona', 'Otra Zona',
    'Programas Interés', '_uuid',
    'Malestar Inicial', 'Terapeuta Asignado', 'Asistió a Cita', 'Número de llamadas realizadas', '_notas_llamadas'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#1565c0').setFontColor('white')
    .setFontWeight('bold').setHorizontalAlignment('center').setWrap(true);

  // Anchos de columna optimizados
  const anchos = [
    110, 100, 80, 120, 120,  // A-E: Fecha, Creamos ID, Ya Participante, Nombre, Apellido
    80, 50, 110, 100, 100,  // F-J: Género, Edad, Tel, Zona, Otra Zona
    250,  // K: Programas Interés
    0,  // L: _uuid (oculto)
    200,  // M: Malestar Inicial
    150, 120, 150,  // N-P: Terapeuta Asignado, Asistió a Cita, Llamadas
    0  // Q: _notas_llamadas (oculto)
  ];
  anchos.forEach((w, i) => {
    if (w > 0) sheet.setColumnWidth(i + 1, w);
  });

  sheet.setFrozenRows(1);

  // Ocultar columna _uuid (L, columna 12)
  sheet.hideColumns(12);

  // Ocultar columna _notas_llamadas (Q, columna 17)
  try {
    sheet.hideColumns(17);
  } catch(e) {
    Logger.log('⚠️ No se pudo ocultar columna Q: ' + e.message);
  }

  // Dropdown "Malestar Inicial" (columna M = 13)
  sheet.getRange('M2:M1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList([
        'Duelo',
        'Sintomatología depresiva',
        'Sintomatología de ansiedad',
        'Dinámica familiar disfuncional',
        'Sintomatología o Trastorno de Personalidad',
        'Requerimiento legal',
        'Violencia de género',
        'Separación de pareja',
        'Dificultad en las relaciones interpersonales',
        'Estrés',
        'Consumo problemático de sustancias',
        'Intento o ideación suicida',
        'Sintomatología de TEA o TEPT',
        'Problemas de la conducta alimentaria',
        'Dificultad en la gestión emocional',
        'Violencia intrafamiliar',
        'Conducta adictiva'
      ], true).setAllowInvalid(true).build()
  );

  // Dropdown "Terapeuta Asignado" (columna N = 14)
  sheet.getRange('N2:N1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'], true).setAllowInvalid(false).build()
  );

  // Dropdown "Asistió a Cita" (columna O = 15)
  sheet.getRange('O2:O1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['Vino', 'No vino', 'Pendiente'], true).setAllowInvalid(false).build()
  );

  // Dropdown de Género en columna F (permite valores importados no normalizados)
  sheet.getRange('F2:F1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'], true)
      .setAllowInvalid(true).build()
  );

  Logger.log('✅ Hoja Hoja de interés creada (17 columnas - con Malestar, Terapeuta, Asistió, Llamadas y notas ocultas)');
  return sheet;
}

/**
 * Extrae filas del formulario HISTÓRICO (columnas básicas).
 * Filtra solo "Terapia Individual".
 * Devuelve array de filas: [fecha, creamosID, '', nombres, apellidos, genero, '', '', zona, '', 'Terapia Individual', uuid, '']
 * (13 columnas - estructura simplificada)
 */
function _extraerFilasInteresHistorico(csvTexto, fuente, uuidsSet, creamosSet, nombresSet) {
  if (!nombresSet) nombresSet = new Set();
  const resultado = { filas: [], omitidos: 0 };

  const filas = _parsearCSV(csvTexto);
  if (filas.length <= 1) {
    Logger.log('ℹ️ ' + fuente + ': CSV sin filas de datos');
    return resultado;
  }

  const hCSV = filas[0];
  Logger.log('📋 ' + fuente + ' - ' + (filas.length - 1) + ' filas, ' + hCSV.length + ' columnas');

  // Mapeo de columnas básicas del histórico
  const iFecha     = _buscarCol(hCSV, ['_submission_time', 'start']);
  const iCreamosID = _buscarCol(hCSV, ['creamos id', 'creamos_id']);
  const iNombres   = _buscarCol(hCSV, ['inicio/nombre', 'nombre(s)', 'nombres']);
  const iApellidos = _buscarCol(hCSV, ['inicio/apellido', 'apellido(s)', 'apellidos']);
  const iGenero    = _buscarCol(hCSV, ['inicio/género', 'inicio/genero', 'género', 'genero', 'sexo']);
  const iEdad      = _buscarCol(hCSV, [
    'inicio/edad',
    'edad',
    'inicio/¿cuántos años tienes',
    '¿cuántos años tienes',
    'cuantos años tienes',
    'años',
    'anos',
    'age',
    'inicio/fecha de nacimiento',
    'fecha de nacimiento',
    'fecha_nacimiento',
    'nacimiento',
    'birth',
    'date of birth',
    'dob',
    'tu edad',
    'su edad',
    'edad actual'
  ]);
  const iTelefono  = _buscarCol(hCSV, ['inicio/número de teléfono', 'inicio/numero de telefono', 'teléfono', 'telefono', 'número de teléfono', 'numero de telefono', 'tel', 'phone']);
  const iZona      = _buscarCol(hCSV, ['inicio/zona', 'zona']);
  const iUUID      = _buscarCol(hCSV, ['_uuid', 'uuid']);

  // Buscar TODOS los servicios/programas (checkboxes histórico)
  const iTerapiaInd = _buscarCol(hCSV, [
    '/terapia individual',
    'terapia_individual',
    'servicios/terapia',
    'interesa(n)?/terapia individual'
  ]);
  const iRelajArte  = _buscarCol(hCSV, [
    'relajarte',
    'relaj arte',
    'grupos terapeuticos',
    'servicios/relajarte',
    'servicios te interesan/relajarte'
  ]);
  const iTerapiaOcup = _buscarCol(hCSV, [
    'terapia ocupacional',
    'terapia_ocupacional',
    'servicios/terapia ocupacional',
    'servicios te interesan/terapia ocupacional'
  ]);
  const iEscuelaPadres = _buscarCol(hCSV, [
    'escuela para madres',
    'escuela para padres',
    'escuela madres/padres',
    'servicios/escuela',
    'servicios te interesan/escuela'
  ]);
  const iAutopercepcion = _buscarCol(hCSV, [
    'autopercepción',
    'autopercepcion',
    'grupo de autopercepción',
    'servicios/autopercepción',
    'servicios te interesan/autopercepción'
  ]);
  const iGestionCasos = _buscarCol(hCSV, [
    'gestión de casos',
    'gestion de casos',
    'gestion_casos',
    'servicios/gestión',
    'servicios te interesan/gestión'
  ]);
  const iApoyoEmocional = _buscarCol(hCSV, [
    'grupo de apoyo emocional',
    'apoyo emocional',
    'apoyo_emocional',
    'servicios/apoyo emocional',
    'servicios te interesan/apoyo emocional'
  ]);

  // NUEVO: Columna consolidada (histórico 2025) que contiene TODOS los servicios como texto
  const iServiciosConsolidados = _buscarCol(hCSV, [
    'apoyo emocional / ¿qué servicio(s)/grupo(s)',
    '¿qué servicio(s)/grupo(s) de apoyo emocional te interesa(n)?',
    'apoyo emocional/¿qué servicio'
  ]);

  Logger.log('📍 ' + fuente + ' (Histórico): Total columnas CSV: ' + hCSV.length);

  // Log de columnas básicas detectadas
  Logger.log('📍 Columnas básicas detectadas:');
  Logger.log('   - Fecha: ' + (iFecha >= 0 ? '"' + hCSV[iFecha] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Creamos ID: ' + (iCreamosID >= 0 ? '"' + hCSV[iCreamosID] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Nombres: ' + (iNombres >= 0 ? '"' + hCSV[iNombres] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Apellidos: ' + (iApellidos >= 0 ? '"' + hCSV[iApellidos] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Género: ' + (iGenero >= 0 ? '"' + hCSV[iGenero] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Edad: ' + (iEdad >= 0 ? '"' + hCSV[iEdad] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Teléfono: ' + (iTelefono >= 0 ? '"' + hCSV[iTelefono] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - Zona: ' + (iZona >= 0 ? '"' + hCSV[iZona] + '"' : '❌ NO ENCONTRADA'));
  Logger.log('   - UUID: ' + (iUUID >= 0 ? '"' + hCSV[iUUID] + '"' : '❌ NO ENCONTRADA'));

  Logger.log('📍 Servicios detectados:');
  Logger.log('   - Terapia Individual: ' + (iTerapiaInd >= 0 ? hCSV[iTerapiaInd] : '❌ NO ENCONTRADA'));
  Logger.log('   - RelajArte: ' + (iRelajArte >= 0 ? hCSV[iRelajArte] : '❌ NO ENCONTRADA'));
  Logger.log('   - Terapia Ocupacional: ' + (iTerapiaOcup >= 0 ? hCSV[iTerapiaOcup] : '❌ NO ENCONTRADA'));
  Logger.log('   - Escuela Padres: ' + (iEscuelaPadres >= 0 ? hCSV[iEscuelaPadres] : '❌ NO ENCONTRADA'));
  Logger.log('   - Autopercepción: ' + (iAutopercepcion >= 0 ? hCSV[iAutopercepcion] : '❌ NO ENCONTRADA'));
  Logger.log('   - Gestión Casos: ' + (iGestionCasos >= 0 ? hCSV[iGestionCasos] : '❌ NO ENCONTRADA'));
  Logger.log('   - Apoyo Emocional: ' + (iApoyoEmocional >= 0 ? hCSV[iApoyoEmocional] : '❌ NO ENCONTRADA'));

  // Si no se encontró Edad, mostrar columnas que podrían ser edad
  if (iEdad < 0) {
    Logger.log('⚠️ COLUMNA EDAD NO ENCONTRADA. Columnas disponibles que podrían contener edad:');
    hCSV.forEach((col, idx) => {
      const colLower = col.toLowerCase();
      if (colLower.includes('edad') || colLower.includes('año') || colLower.includes('nacimiento') ||
          colLower.includes('age') || colLower.includes('birth') || colLower.includes('fecha') ||
          colLower.includes('cumple')) {
        Logger.log('   [' + idx + '] "' + col + '"');
      }
    });
    Logger.log('💡 Sugerencia: Revisa los nombres exactos de las columnas y actualiza la búsqueda en la función _extraerFilasInteresHistorico');
  }

  // Si no se encontraron servicios, mostrar columnas relevantes
  if (iTerapiaInd < 0 && iApoyoEmocional < 0) {
    Logger.log('⚠️ NO SE ENCONTRARON COLUMNAS DE SERVICIOS. Columnas disponibles:');
    hCSV.forEach((col, idx) => {
      const colLower = col.toLowerCase();
      if (colLower.includes('servicio') || colLower.includes('terapia') || colLower.includes('apoyo')) {
        Logger.log('   [' + idx + '] ' + col);
      }
    });
  }

  for (let i = 1; i < filas.length; i++) {
    const f = filas[i];

    // Consolidar todos los servicios seleccionados
    const serviciosSeleccionados = [];
    const _checkServicio = (idx, nombre) => {
      if (idx >= 0 && f[idx]) {
        const v = (f[idx] || '').toString().trim().toLowerCase();
        if (v === '1' || v === 'true' || v === 'yes' || v.includes(nombre.toLowerCase())) {
          serviciosSeleccionados.push(nombre);
          return true;
        }
      }
      return false;
    };

    // Verificar Terapia Individual de dos formas:
    // 1. Columnas individuales (formularios nuevos con checkboxes separados)
    let tieneTerapiaInd = _checkServicio(iTerapiaInd, 'Terapia Individual');

    // 2. Columna consolidada (histórico 2025 con texto que contiene todos los servicios)
    if (!tieneTerapiaInd && iServiciosConsolidados >= 0) {
      const serviciosTexto = (f[iServiciosConsolidados] || '').toString().toLowerCase();
      tieneTerapiaInd = serviciosTexto.includes('terapia individual');
      if (tieneTerapiaInd) {
        serviciosSeleccionados.push('Terapia Individual');
      }
    }

    _checkServicio(iRelajArte, 'Grupos Terapeuticos: RelajArte');
    _checkServicio(iTerapiaOcup, 'Grupos Psicoeducativos: Terapia Ocupacional');
    _checkServicio(iEscuelaPadres, 'Grupos Psicoeducativos: Escuela para Madres/Padres');
    _checkServicio(iAutopercepcion, 'Grupo de Autopercepción');
    _checkServicio(iGestionCasos, 'Gestión de Casos');
    const tieneApoyoEmocional = _checkServicio(iApoyoEmocional, 'Grupo de apoyo emocional');

    // Filtrar: SOLO personas con "Terapia Individual" específicamente
    // NO importar otros servicios (RelajArte, Escuela para Madres, etc.)
    if (!tieneTerapiaInd) {
      resultado.omitidos++;
      continue;
    }

    const uuid      = iUUID >= 0      ? (f[iUUID]      || '').trim() : '';
    const creamosID = iCreamosID >= 0 ? (f[iCreamosID] || '').toString().trim().toUpperCase() : '';
    const nombres   = iNombres >= 0   ? (f[iNombres]   || '').trim() : '';
    const apellidos = iApellidos >= 0 ? (f[iApellidos] || '').trim() : '';
    const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ').trim();

    // Deduplicar
    if (uuid && uuidsSet.has(uuid)) continue;
    if (creamosID && creamosSet.has(creamosID)) continue;
    if (nombreCompleto && nombresSet.has(nombreCompleto.toLowerCase())) continue;

    const fechaRaw = iFecha >= 0 ? (f[iFecha] || '').trim() : '';
    const fecha    = fechaRaw ? new Date(fechaRaw) : new Date();
    const genero   = iGenero >= 0 ? _normalizarGenero(f[iGenero]) : '';
    const edad     = iEdad >= 0 ? _calcularEdadDesdeNacimiento(f[iEdad]) : '';
    const telefono = iTelefono >= 0 ? (f[iTelefono] || '').trim() : '';
    const zona     = iZona >= 0   ? (f[iZona] || '').trim() : '';

    // Consolidar servicios en una cadena
    const programas = serviciosSeleccionados.join(', ') || 'Apoyo Emocional';

    // Log detallado para la primera fila procesada
    if (i === 1) {
      Logger.log('📋 Ejemplo de registro histórico (fila 1):');
      Logger.log('   - Valores de servicios en CSV:');
      Logger.log('     TerapiaInd[' + iTerapiaInd + '] = ' + (iTerapiaInd >= 0 ? f[iTerapiaInd] : 'N/A'));
      Logger.log('     ApoyoEmocional[' + iApoyoEmocional + '] = ' + (iApoyoEmocional >= 0 ? f[iApoyoEmocional] : 'N/A'));
      Logger.log('   - Servicios seleccionados: ' + JSON.stringify(serviciosSeleccionados));
      Logger.log('   - Programas consolidados: "' + programas + '"');
    }

    // Crear fila con 17 columnas (12 básicas + 5 nuevas: Malestar, Terapeuta, Asistió, Llamadas, Notas)
    resultado.filas.push([
      fecha, creamosID, '', nombres, apellidos, genero, edad, telefono, zona, '', programas,
      uuid,             // L: _uuid
      '', '', '', '', ''  // M-Q: Malestar, Terapeuta Asignado, Asistió a Cita, Llamadas, Notas (vacíos)
    ]);

    // Actualizar sets
    if (uuid) uuidsSet.add(uuid);
    if (creamosID) creamosSet.add(creamosID);
    if (nombreCompleto) nombresSet.add(nombreCompleto.toLowerCase());
  }

  return resultado;
}

/**
 * Extrae filas del formulario 2026 (13 columnas - estructura simplificada).
 * Solo incluye columnas básicas y consolida programas en una columna.
 * Devuelve array de filas con estructura simplificada.
 */
function _extraerFilasInteres2026(csvTexto, fuente, uuidsSet, creamosSet, nombresSet) {
  if (!nombresSet) nombresSet = new Set();
  const resultado = { filas: [], omitidos: 0 };

  const filas = _parsearCSV(csvTexto);
  if (filas.length <= 1) {
    Logger.log('ℹ️ ' + fuente + ': CSV sin filas de datos');
    return resultado;
  }

  const hCSV = filas[0];
  Logger.log('📋 ' + fuente + ' (2026) - ' + (filas.length - 1) + ' filas, ' + hCSV.length + ' columnas CSV');
  Logger.log('📋 Encabezados CSV ' + fuente + ': ' + JSON.stringify(hCSV));

  // --- Mapeo completo de columnas ---
  const iFecha          = _buscarCol(hCSV, ['_submission_time', 'start']);
  const iCreamosID      = _buscarCol(hCSV, ['creamos id', 'creamos_id', 'inicio/creamos id']);
  const iYaParticipante = _buscarCol(hCSV, ['¿eres ya participante', 'ya participante', 'inicio/¿eres']);
  const iNombres        = _buscarCol(hCSV, ['inicio/nombre', 'nombre(s)', 'nombres']);
  const iApellidos      = _buscarCol(hCSV, ['inicio/apellido', 'apellido(s)', 'apellidos']);
  const iGenero         = _buscarCol(hCSV, ['inicio/género', 'inicio/genero', 'género', 'genero']);
  const iAutodesc       = _buscarCol(hCSV, ['autodescribes', 'inicio/¿cómo te autodescribes']);
  const iEdad           = _buscarCol(hCSV, ['inicio/edad', 'edad', 'inicio/¿cuántos años tienes', '¿cuántos años tienes', 'años', 'age']);
  const iTelefono       = _buscarCol(hCSV, ['inicio/número de teléfono', 'inicio/numero de telefono', 'teléfono', 'telefono', 'número de teléfono', 'numero de telefono', 'tel', 'phone']);
  const iZona           = _buscarCol(hCSV, ['inicio/zona', 'zona']);
  const iOtraZona       = _buscarCol(hCSV, ['inicio/otra zona', 'otra zona']);
  const iNivelEstudios  = _buscarCol(hCSV, ['nivel de estudios', 'inicio/¿cuál es tu último nivel']);
  // Programas de interés (checkboxes) - consolidar en una columna
  // Buscar con múltiples variantes de nombres
  const iProg_IL  = _buscarCol(hCSV, [
    'programas te interesan/inclusión laboral',
    'programas te interesan/inclusion laboral',
    'interesan/inclusión laboral',
    'interesan/inclusion laboral',
    'inclusion laboral',
    'inclusión laboral'
  ]);
  const iProg_Edu = _buscarCol(hCSV, [
    'programas te interesan/educación',
    'programas te interesan/educacion',
    'interesan/educación',
    'interesan/educacion',
    'educación',
    'educacion'
  ]);
  const iProg_AE  = _buscarCol(hCSV, [
    'programas te interesan/apoyo emocional',
    'interesan/apoyo emocional',
    'apoyo emocional'
  ]);
  const iProg_ME  = _buscarCol(hCSV, [
    'programas te interesan/mi eelo',
    'programas te interesan/mi-eelo',
    'interesan/mi eelo',
    'interesan/mi-eelo',
    'mi eelo',
    'mi-eelo'
  ]);

  // COLUMNA CORRECTA: "¿Deseas inscribirte en el programa de Apoyo Emocional?"
  const iDeseaInscribirseAE = _buscarCol(hCSV, [
    'apoyo emocional/¿deseas inscribirte',
    'deseas inscribirte en el programa de apoyo emocional',
    '¿deseas inscribirte en el programa de apoyo emocional?',
    'apoyo emocional/deseas inscribirte'
  ]);

  // Terapia Individual - sub-programa de Apoyo Emocional
  const iTerapiaIndividual = _buscarCol(hCSV, [
    '/terapia individual',
    'terapia_individual',
    'apoyo emocional/terapia',
    'interesa(n)?/terapia individual'
  ]);

  const iUUID = _buscarCol(hCSV, ['_uuid', 'uuid']);

  // Log detallado de columnas encontradas
  Logger.log('📍 ' + fuente + ' (2026): Total columnas CSV: ' + hCSV.length);
  Logger.log('📍 Columnas de Programas detectadas:');
  Logger.log('   - Inclusión Laboral: ' + (iProg_IL >= 0 ? hCSV[iProg_IL] : '❌ NO ENCONTRADA'));
  Logger.log('   - Educación: ' + (iProg_Edu >= 0 ? hCSV[iProg_Edu] : '❌ NO ENCONTRADA'));
  Logger.log('   - Apoyo Emocional: ' + (iProg_AE >= 0 ? hCSV[iProg_AE] : '❌ NO ENCONTRADA'));
  Logger.log('   - Terapia Individual: ' + (iTerapiaIndividual >= 0 ? hCSV[iTerapiaIndividual] : '❌ NO ENCONTRADA'));
  Logger.log('   - Mi-eelo: ' + (iProg_ME >= 0 ? hCSV[iProg_ME] : '❌ NO ENCONTRADA'));

  // Si ninguna columna fue encontrada, mostrar todas las columnas disponibles
  if (iProg_IL < 0 && iProg_Edu < 0 && iProg_AE < 0 && iProg_ME < 0) {
    Logger.log('⚠️ NO SE ENCONTRARON COLUMNAS DE PROGRAMAS. Columnas disponibles:');
    hCSV.forEach((col, idx) => {
      if (col.toLowerCase().includes('program') || col.toLowerCase().includes('interes')) {
        Logger.log('   [' + idx + '] ' + col);
      }
    });
  }

  for (let i = 1; i < filas.length; i++) {
    const f = filas[i];

    // Filtrar: SOLO personas con "Terapia Individual" específicamente (columna 34)
    // Verificar directamente la columna de Terapia Individual
    if (iTerapiaIndividual >= 0) {
      const valorTerapia = (f[iTerapiaIndividual] || '').toString().trim();
      const tieneTerapiaIndividual = valorTerapia === '1' || valorTerapia.toLowerCase() === 'true' ||
                                     valorTerapia.toLowerCase() === 'yes' || valorTerapia.toLowerCase().includes('terapia');
      if (!tieneTerapiaIndividual) {
        resultado.omitidos++;
        continue;
      }
    } else {
      // Si no existe la columna de Terapia Individual, omitir
      resultado.omitidos++;
      continue;
    }

    const uuid      = iUUID >= 0      ? (f[iUUID]      || '').trim() : '';
    const creamosID = iCreamosID >= 0 ? (f[iCreamosID] || '').toString().trim().toUpperCase() : '';
    const nombres   = iNombres >= 0   ? (f[iNombres]   || '').trim() : '';
    const apellidos = iApellidos >= 0 ? (f[iApellidos] || '').trim() : '';
    const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ').trim();

    // Deduplicar
    if (uuid && uuidsSet.has(uuid)) continue;
    if (creamosID && creamosSet.has(creamosID)) continue;
    if (nombreCompleto && nombresSet.has(nombreCompleto.toLowerCase())) continue;

    // Extraer valores
    const fechaRaw = iFecha >= 0 ? (f[iFecha] || '').trim() : '';
    const fecha    = fechaRaw ? new Date(fechaRaw) : new Date();

    const yaParticipante = iYaParticipante >= 0 ? (f[iYaParticipante] || '').trim() : '';
    const genero         = iGenero >= 0 ? _normalizarGenero(f[iGenero]) : '';
    const autodesc       = iAutodesc >= 0   ? (f[iAutodesc]   || '').trim() : '';
    const edad           = iEdad >= 0       ? _calcularEdadDesdeNacimiento(f[iEdad]) : '';
    const telefono       = iTelefono >= 0   ? (f[iTelefono]   || '').trim() : '';
    const zona           = iZona >= 0       ? (f[iZona]       || '').trim() : '';
    const otraZona       = iOtraZona >= 0   ? (f[iOtraZona]   || '').trim() : '';
    const nivelEstudios  = iNivelEstudios >= 0 ? (f[iNivelEstudios] || '').trim() : '';

    // Consolidar programas seleccionados (checkboxes) en una sola columna
    const programasSeleccionados = [];
    if (iProg_IL >= 0 && f[iProg_IL]) programasSeleccionados.push('Inclusión Laboral');
    if (iProg_Edu >= 0 && f[iProg_Edu]) programasSeleccionados.push('Educación');
    if (iProg_AE >= 0 && f[iProg_AE]) programasSeleccionados.push('Apoyo Emocional');
    if (iProg_ME >= 0 && f[iProg_ME]) programasSeleccionados.push('mi-eelo');
    const programas = programasSeleccionados.join(', ') || '';

    // Log detallado para la primera fila procesada
    if (i === 1) {
      Logger.log('📋 Ejemplo de registro (fila 1):');
      Logger.log('   - Valores de programas en CSV:');
      Logger.log('     IL[' + iProg_IL + '] = ' + (iProg_IL >= 0 ? f[iProg_IL] : 'N/A'));
      Logger.log('     Edu[' + iProg_Edu + '] = ' + (iProg_Edu >= 0 ? f[iProg_Edu] : 'N/A'));
      Logger.log('     AE[' + iProg_AE + '] = ' + (iProg_AE >= 0 ? f[iProg_AE] : 'N/A'));
      Logger.log('     ME[' + iProg_ME + '] = ' + (iProg_ME >= 0 ? f[iProg_ME] : 'N/A'));
      Logger.log('   - Programas consolidados: "' + programas + '"');
    }

    // Crear fila con 17 columnas (12 básicas + 5 nuevas: Malestar, Terapeuta, Asistió, Llamadas, Notas)
    resultado.filas.push([
      fecha, creamosID, yaParticipante, nombres, apellidos,          // A-E
      genero, edad, telefono, zona, otraZona,                        // F-J
      programas,                                                     // K
      uuid,                                                          // L: _uuid
      '', '', '', '', ''                                             // M-Q: Malestar, Terapeuta Asignado, Asistió a Cita, Llamadas, Notas (vacíos)
    ]);

    // Actualizar sets
    if (uuid) uuidsSet.add(uuid);
    if (creamosID) creamosSet.add(creamosID);
    if (nombreCompleto) nombresSet.add(nombreCompleto.toLowerCase());
  }

  return resultado;
}

/**
 * Importa desde KoboToolbox los registros con interés en programas.
 * Consulta DOS fuentes:
 *   1. URL_FORMULARIO_INTERES_HIST — histórico 2024-2026 (estructura simple)
 *   2. URL_FORMULARIO_INTERES_2026 — formulario activo 2026 (estructura completa)
 * Solo agrega filas nuevas (dedup por _uuid + Creamos ID compartido entre ambas fuentes).
 * Escribe en lote para mayor rendimiento.
 */
function importarFormularioInteres() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('📥 Importando Hoja de interés (2 fuentes)...', 'Importando', 10);

  try {
    let sheet = ss.getSheetByName('Hoja de interés');
    if (!sheet) sheet = crearHojaFormularioInteres();

    // Construir sets de dedup con datos ya existentes en la hoja
    // Col B (índice 1) = Creamos ID | Col L (índice 11) = _uuid | Col D+E (índice 3+4) = Nombres+Apellidos
    const existentes = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 16).getValues()
      : [];
    const uuidsSet   = new Set(existentes.map(r => (r[11] || '').toString().trim()).filter(Boolean)); // col L = _uuid
    const creamosSet = new Set(existentes.map(r => (r[1]  || '').toString().trim()).filter(Boolean)); // col B = Creamos ID
    // Construir nombre completo de cols D+E (Nombre + Apellido)
    const nombresSet = new Set(
      existentes.map(r => {
        const nom = (r[3] || '').toString().trim();
        const ape = (r[4] || '').toString().trim();
        return [nom, ape].filter(Boolean).join(' ').trim().toLowerCase();
      }).filter(Boolean)
    );

    const todasFilasNuevas = [];
    let totalOmitidos = 0;
    const urls = [
      { url: URL_FORMULARIO_INTERES_HIST, nombre: 'Histórico 2024-2026', extractor: _extraerFilasInteresHistorico },
      { url: URL_FORMULARIO_INTERES_2026, nombre: 'Formulario 2026', extractor: _extraerFilasInteres2026 }
    ];

    for (const fuente of urls) {
      if (!fuente.url) {
        Logger.log('⏭️ ' + fuente.nombre + ': URL vacía — se omite');
        continue;
      }
      ss.toast('📥 Descargando ' + fuente.nombre + '...', 'Importando', 8);
      try {
        const resp = UrlFetchApp.fetch(fuente.url, { muteHttpExceptions: true, followRedirects: true });
        if (resp.getResponseCode() !== 200) {
          Logger.log('⚠️ HTTP ' + resp.getResponseCode() + ' en ' + fuente.nombre);
          continue;
        }
        const csvTexto = resp.getContentText();
        if (!csvTexto || csvTexto.trim().length === 0) {
          Logger.log('⚠️ CSV vacío: ' + fuente.nombre);
          continue;
        }
        // Usar el extractor apropiado para cada fuente
        const r = fuente.extractor(csvTexto, fuente.nombre, uuidsSet, creamosSet, nombresSet);
        todasFilasNuevas.push(...r.filas);
        totalOmitidos += r.omitidos;
        Logger.log('✅ ' + fuente.nombre + ': ' + r.filas.length + ' nuevos, ' + r.omitidos + ' omitidos');
      } catch (eFuente) {
        Logger.log('❌ Error en fuente ' + fuente.nombre + ': ' + eFuente.message);
      }
    }

    // Escribir en lote (estructura con 17 columnas: 12 básicas + 5 nuevas)
    if (todasFilasNuevas.length > 0) {
      const dest = sheet.getLastRow() + 1;
      sheet.getRange(dest, 1, todasFilasNuevas.length, 17).setValues(todasFilasNuevas);
    }

    const msg = todasFilasNuevas.length > 0
      ? '✅ ' + todasFilasNuevas.length + ' registros nuevos importados'
      : 'ℹ️ Sin registros nuevos' + (totalOmitidos > 0 ? ' (' + totalOmitidos + ' omitidos)' : '');
    Logger.log('📊 Total Hoja de interés: ' + todasFilasNuevas.length + ' nuevos, ' + totalOmitidos + ' omitidos');
    ss.toast(msg, todasFilasNuevas.length > 0 ? 'Importación Completa' : 'Importación', 5);

  } catch (e) {
    Logger.log('❌ Error en importarFormularioInteres: ' + e.message + '\n' + e.stack);
    ss.toast('❌ Error: ' + e.message, 'Error', 5);
  }
}

/**
 * Importa SOLO los datos históricos 2024-2026 (una sola vez).
 * Esta función solo importa desde URL_FORMULARIO_INTERES_HIST.
 * NO importa desde el formulario activo 2026.
 * Útil para importación inicial de datos históricos.
 */
function importarFormularioInteresHistorico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Confirmar con el usuario
  const respuesta = ui.alert(
    '📥 Importar Históricos 2024-2026',
    '¿Deseas importar los datos históricos (2024-2026)?\n\n' +
    '⚠️ Esta función solo debe ejecutarse UNA VEZ para importar datos antiguos.\n' +
    'No es necesario volver a ejecutarla después.',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    ss.toast('❌ Importación cancelada', 'Cancelado', 3);
    return;
  }

  ss.toast('📥 Importando Históricos 2024-2026...', 'Importando', 10);

  try {
    let sheet = ss.getSheetByName('Hoja de interés');
    if (!sheet) sheet = crearHojaFormularioInteres();

    // Construir sets de dedup con datos ya existentes en la hoja
    const existentes = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 13).getValues()
      : [];
    const uuidsSet   = new Set(existentes.map(r => (r[11] || '').toString().trim()).filter(Boolean));
    const creamosSet = new Set(existentes.map(r => (r[1]  || '').toString().trim()).filter(Boolean));
    const nombresSet = new Set(
      existentes.map(r => {
        const nom = (r[3] || '').toString().trim();
        const ape = (r[4] || '').toString().trim();
        return [nom, ape].filter(Boolean).join(' ').trim().toLowerCase();
      }).filter(Boolean)
    );

    const todasFilasNuevas = [];
    let totalOmitidos = 0;

    // SOLO importar históricos
    const fuente = {
      url: URL_FORMULARIO_INTERES_HIST,
      nombre: 'Histórico 2024-2026',
      extractor: _extraerFilasInteresHistorico
    };

    if (!fuente.url) {
      ui.alert('❌ Error', 'URL histórica no configurada. Verifica URL_FORMULARIO_INTERES_HIST', ui.ButtonSet.OK);
      return;
    }

    ss.toast('📥 Descargando ' + fuente.nombre + '...', 'Importando', 8);

    try {
      const resp = UrlFetchApp.fetch(fuente.url, { muteHttpExceptions: true, followRedirects: true });
      if (resp.getResponseCode() !== 200) {
        ui.alert('❌ Error HTTP', 'HTTP ' + resp.getResponseCode() + ' - No se pudo descargar los históricos', ui.ButtonSet.OK);
        return;
      }

      const csvTexto = resp.getContentText();
      if (!csvTexto || csvTexto.trim().length === 0) {
        ui.alert('❌ Error', 'CSV vacío o sin datos', ui.ButtonSet.OK);
        return;
      }

      // Extraer filas usando el extractor histórico
      const r = fuente.extractor(csvTexto, fuente.nombre, uuidsSet, creamosSet, nombresSet);
      todasFilasNuevas.push(...r.filas);
      totalOmitidos = r.omitidos;
      Logger.log('✅ ' + fuente.nombre + ': ' + r.filas.length + ' nuevos, ' + r.omitidos + ' omitidos');

    } catch (eFuente) {
      Logger.log('❌ Error: ' + eFuente.message);
      ui.alert('❌ Error', 'Error al descargar históricos:\n' + eFuente.message, ui.ButtonSet.OK);
      return;
    }

    // Escribir en lote
    if (todasFilasNuevas.length > 0) {
      const dest = sheet.getLastRow() + 1;
      sheet.getRange(dest, 1, todasFilasNuevas.length, 13).setValues(todasFilasNuevas);
    }

    const msg = todasFilasNuevas.length > 0
      ? '✅ ' + todasFilasNuevas.length + ' registros históricos importados'
      : 'ℹ️ Sin registros nuevos' + (totalOmitidos > 0 ? ' (' + totalOmitidos + ' omitidos - no tienen Terapia Individual)' : '');

    Logger.log('📊 Históricos importados: ' + todasFilasNuevas.length + ' nuevos, ' + totalOmitidos + ' omitidos');
    ui.alert('✅ Importación Completa', msg, ui.ButtonSet.OK);

  } catch (e) {
    Logger.log('❌ Error en importarFormularioInteresHistorico: ' + e.message + '\n' + e.stack);
    ui.alert('❌ Error', 'Error al importar históricos:\n' + e.message, ui.ButtonSet.OK);
  }
}

/**
 * Diagnóstico del CSV de Hoja de interés — revisa ambas fuentes.
 * Muestra columnas detectadas, cuántos registros pasarían el filtro y estado HTTP.
 */
function diagnosticarFormularioInteres() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  ss.toast('🔍 Revisando ambas fuentes...', 'Diagnóstico', 6);

  const fuentes = [
    { url: URL_FORMULARIO_INTERES_HIST, nombre: 'Histórico 2024-2026' },
    { url: URL_FORMULARIO_INTERES_2026, nombre: 'Formulario 2026' }
  ];

  let info = '🔍 DIAGNÓSTICO — Hoja de interés (2 fuentes)\n';
  info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  try {
    fuentes.forEach(fuente => {
      info += '📂 ' + fuente.nombre + '\n';
      try {
        const resp = UrlFetchApp.fetch(fuente.url, { muteHttpExceptions: true, followRedirects: true });
        if (resp.getResponseCode() !== 200) {
          info += '  ❌ HTTP ' + resp.getResponseCode() + ' — URL caducada o incorrecta\n\n';
          return;
        }
        const csvTexto = resp.getContentText();
        if (!csvTexto || csvTexto.trim().length === 0) {
          info += '  ❌ CSV vacío\n\n';
          return;
        }
        const filas = _parsearCSV(csvTexto);
        info += '  Respuestas totales: ' + (filas.length - 1) + '\n';

        if (filas.length <= 1) { info += '  (sin datos)\n\n'; return; }

        const hCSV = filas[0];
        const iCreamosID  = _buscarCol(hCSV, ['creamos id', 'creamos_id', 'creamos']);
        const iNombres    = _buscarCol(hCSV, ['inicio/nombre', 'nombre(s)', 'nombres']);
        const iEdad       = _buscarCol(hCSV, [
          'inicio/edad', 'edad', 'inicio/¿cuántos años tienes', '¿cuántos años tienes', 'cuantos años tienes',
          'años', 'anos', 'age', 'inicio/fecha de nacimiento', 'fecha de nacimiento', 'fecha_nacimiento',
          'nacimiento', 'birth', 'date of birth', 'dob', 'tu edad', 'su edad', 'edad actual'
        ]);
        const iTelefono   = _buscarCol(hCSV, ['inicio/número de teléfono', 'inicio/numero de telefono', 'teléfono', 'telefono', 'número de teléfono', 'numero de telefono', 'tel', 'phone']);
        const iTerapiaInd = _buscarCol(hCSV, ['/terapia individual', 'terapia_individual', 'interesa(n)?/terapia']);
        const iUUID       = _buscarCol(hCSV, ['_uuid', 'uuid']);

        info += '  Creamos ID:       ' + (iCreamosID  >= 0 ? '"' + hCSV[iCreamosID]  + '"' : '❌ no encontrada') + '\n';
        info += '  Nombre:           ' + (iNombres    >= 0 ? '"' + hCSV[iNombres]    + '"' : '❌ no encontrada') + '\n';
        info += '  Edad:             ' + (iEdad       >= 0 ? '"' + hCSV[iEdad]       + '"' : '❌ NO ENCONTRADA') + '\n';
        info += '  Teléfono:         ' + (iTelefono   >= 0 ? '"' + hCSV[iTelefono]   + '"' : '❌ NO ENCONTRADA') + '\n';
        info += '  Terapia Indiv.:   ' + (iTerapiaInd >= 0 ? '"' + hCSV[iTerapiaInd] + '"' : '⚠️ col no encontrada → importa todos') + '\n';
        info += '  _uuid:            ' + (iUUID       >= 0 ? '"' + hCSV[iUUID]       + '"' : '⚠️ no encontrado') + '\n';

        // Si la edad no se encontró, mostrar las primeras 20 columnas para ayudar a identificar el problema
        if (iEdad < 0) {
          info += '\n  ⚠️ COLUMNAS DISPONIBLES (primeras 20):\n';
          for (let i = 0; i < Math.min(hCSV.length, 20); i++) {
            info += '     [' + i + '] "' + hCSV[i] + '"\n';
          }
          info += '  💡 Revisa qué columna contiene la edad y actualiza la búsqueda\n';
        }

        let conTerapia = 0; let sinTerapia = 0;
        filas.slice(1).forEach(f => {
          if (iTerapiaInd < 0) { conTerapia++; return; }
          const v = (f[iTerapiaInd] || '').toString().trim().toLowerCase();
          const sel = v === '1' || v === 'true' || v === 'yes' || v.includes('terapia');
          if (sel) conTerapia++; else sinTerapia++;
        });
        info += '  → Importarían: ' + conTerapia + '  |  Omitidos (sin Terapia Ind.): ' + sinTerapia + '\n';
        info += '\n';
      } catch (eFuente) {
        info += '  ❌ Error: ' + eFuente.message + '\n\n';
      }
    });

    ui.alert('🔍 Diagnóstico Hoja de interés', info, ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('❌ Error', 'Error al diagnosticar:\n' + e.message, ui.ButtonSet.OK);
    Logger.log('❌ Error diagnóstico Interés: ' + e.message);
  }
}

/**
 * Muestra TODAS las columnas del CSV de Hoja de interés (formulario 2026)
 * para identificar los nombres exactos de las columnas.
 */
function mostrarColumnasCSVInteres() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    ss.toast('📥 Descargando CSV...', 'Diagnóstico', 5);

    const resp = UrlFetchApp.fetch(URL_FORMULARIO_INTERES_2026, { muteHttpExceptions: true, followRedirects: true });

    if (resp.getResponseCode() !== 200) {
      ui.alert('❌ Error', 'HTTP ' + resp.getResponseCode() + ' - URL inválida o caducada', ui.ButtonSet.OK);
      return;
    }

    const csvTexto = resp.getContentText();
    const filas = _parsearCSV(csvTexto);

    if (filas.length === 0) {
      ui.alert('❌ Error', 'CSV vacío o sin encabezados', ui.ButtonSet.OK);
      return;
    }

    const headers = filas[0];

    let info = '📋 COLUMNAS DEL CSV (Formulario 2026)\n';
    info += 'Total de columnas: ' + headers.length + '\n';
    info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    // Mostrar todas las columnas con índice
    headers.forEach((col, idx) => {
      info += '[' + idx + '] ' + col + '\n';
    });

    info += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    info += 'Columnas que contienen "program" o "interes":\n\n';

    headers.forEach((col, idx) => {
      const colLower = col.toLowerCase();
      if (colLower.includes('program') || colLower.includes('interes')) {
        info += '[' + idx + '] ' + col + '\n';
      }
    });

    Logger.log(info);
    ui.alert('📋 Columnas CSV', info, ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('❌ Error', 'Error: ' + e.message, ui.ButtonSet.OK);
    Logger.log('❌ Error: ' + e.message);
  }
}

/**
 * Muestra TODAS las columnas del CSV Histórico (2024-2026)
 * para identificar los nombres exactos de las columnas.
 */
function mostrarColumnasCSVHistorico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    ss.toast('📥 Descargando CSV Histórico...', 'Diagnóstico', 5);

    const resp = UrlFetchApp.fetch(URL_FORMULARIO_INTERES_HIST, { muteHttpExceptions: true, followRedirects: true });

    if (resp.getResponseCode() !== 200) {
      ui.alert('❌ Error', 'HTTP ' + resp.getResponseCode() + ' - URL inválida o caducada', ui.ButtonSet.OK);
      return;
    }

    const csvTexto = resp.getContentText();
    const filas = _parsearCSV(csvTexto);

    if (filas.length === 0) {
      ui.alert('❌ Error', 'CSV vacío o sin encabezados', ui.ButtonSet.OK);
      return;
    }

    const headers = filas[0];

    let info = '📋 COLUMNAS DEL CSV HISTÓRICO (2024-2026)\n';
    info += 'Total de columnas: ' + headers.length + '\n';
    info += 'Total de registros: ' + (filas.length - 1) + '\n';
    info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    // Mostrar todas las columnas con índice
    headers.forEach((col, idx) => {
      info += '[' + idx + '] ' + col + '\n';
    });

    info += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    info += 'Columnas que contienen "edad", "año" o "nacimiento":\n\n';

    let edadCols = [];
    headers.forEach((col, idx) => {
      const colLower = col.toLowerCase();
      if (colLower.includes('edad') || colLower.includes('año') || colLower.includes('nacimiento') ||
          colLower.includes('age') || colLower.includes('birth')) {
        edadCols.push('[' + idx + '] ' + col);
      }
    });

    if (edadCols.length > 0) {
      info += edadCols.join('\n') + '\n';
    } else {
      info += '❌ No se encontraron columnas relacionadas con edad\n';
    }

    info += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    info += '💡 Usa esta información para actualizar la búsqueda de edad\n';
    info += 'en la función _extraerFilasInteresHistorico\n';

    Logger.log(info);
    ui.alert('📋 Columnas CSV Histórico', info, ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('❌ Error', 'Error: ' + e.message, ui.ButtonSet.OK);
    Logger.log('❌ Error: ' + e.message);
  }
}

/**
 * Muestra valores REALES de la columna Terapia Individual en el CSV
 * para diagnosticar por qué solo 3 registros se importan.
 */
function mostrarValoresTerapiaIndividual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    ss.toast('📥 Descargando CSV...', 'Diagnóstico', 5);

    const resp = UrlFetchApp.fetch(URL_FORMULARIO_INTERES_2026, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    if (resp.getResponseCode() !== 200) {
      ui.alert('❌ Error', 'HTTP ' + resp.getResponseCode(), ui.ButtonSet.OK);
      return;
    }

    const filas = _parsearCSV(resp.getContentText());
    if (filas.length <= 1) {
      ui.alert('ℹ️ Sin datos', 'El CSV está vacío', ui.ButtonSet.OK);
      return;
    }

    const hCSV = filas[0];
    // Buscar AMBAS columnas
    const iApoyoEmocional = _buscarCol(hCSV, [
      'programas te interesan/apoyo emocional',
      'interesan/apoyo emocional',
      'apoyo emocional'
    ]);

    const iTerapiaInd = _buscarCol(hCSV, [
      '/terapia individual',
      'terapia_individual',
      'interesa(n)?/terapia'
    ]);

    let info = '🔍 VALORES REALES - Apoyo Emocional\n';
    info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    info += 'Total registros: ' + (filas.length - 1) + '\n\n';

    // Mostrar columna de Apoyo Emocional GENERAL (la que importa)
    if (iApoyoEmocional >= 0) {
      info += '✅ COLUMNA PRINCIPAL (la que se usa para filtrar):\n';
      info += '"' + hCSV[iApoyoEmocional] + '"\n';
      info += '📍 Posición: columna ' + iApoyoEmocional + '\n\n';
      info += 'Valores únicos:\n';
      info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

      const valoresAE = {};
      for (let i = 1; i < filas.length; i++) {
        const valor = (filas[i][iApoyoEmocional] || '').toString().trim();
        const key = valor || '(vacío)';
        valoresAE[key] = (valoresAE[key] || 0) + 1;
      }

      Object.entries(valoresAE)
        .sort((a, b) => b[1] - a[1])
        .forEach(([valor, count]) => {
          const marca = (valor === '1' || valor.toLowerCase() === 'true') ? '✅' : '❌';
          info += marca + ' "' + valor + '" → ' + count + ' registros\n';
        });

      info += '\n';
    } else {
      info += '❌ Columna "Apoyo Emocional" NO encontrada\n\n';
    }

    // Mostrar columna de Terapia Individual (sub-opción)
    if (iTerapiaInd >= 0) {
      info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      info += 'ℹ️ SUB-OPCIÓN (solo informativa):\n';
      info += '"' + hCSV[iTerapiaInd] + '"\n';
      info += '📍 Posición: columna ' + iTerapiaInd + '\n\n';
      info += 'Valores únicos:\n';
      info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

      const valoresTI = {};
      for (let i = 1; i < filas.length; i++) {
        const valor = (filas[i][iTerapiaInd] || '').toString().trim();
        const key = valor || '(vacío)';
        valoresTI[key] = (valoresTI[key] || 0) + 1;
      }

      Object.entries(valoresTI)
        .sort((a, b) => b[1] - a[1])
        .forEach(([valor, count]) => {
          info += '  "' + valor + '" → ' + count + ' registros\n';
        });
    }

    info += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    info += 'Leyenda:\n✅ = Se importaría (tiene "1" en Apoyo Emocional)\n❌ = Se omitiría';

    ui.alert('🔍 Valores Reales', info, ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('❌ Error', 'Error: ' + e.message, ui.ButtonSet.OK);
    Logger.log('❌ Error mostrarValoresTerapiaIndividual: ' + e.message);
  }
}

/**
 * Diagnóstico rápido de importaciones de Referencias y Derivaciones.
 * Verifica las URLs, columnas detectadas y cantidad de registros nuevos que se importarían.
 */
function diagnosticarReferenciasYDerivaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  let info = '🔍 DIAGNÓSTICO — Referencias y Derivaciones\n';
  info += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  const fuentes = [
    { url: URL_REFERENCIAS,  nombre: 'Referencias de programas',     hoja: 'Referencias de programas',    colKey: 8 },
    { url: URL_DERIVACIONES, nombre: 'Derivaciones Institucionales',  hoja: 'Derivaciones Institucionales', colKey: 10 }
  ];

  fuentes.forEach(fuente => {
    info += '📂 ' + fuente.nombre + '\n';
    try {
      const resp = UrlFetchApp.fetch(fuente.url, { muteHttpExceptions: true, followRedirects: true });
      const code = resp.getResponseCode();
      if (code !== 200) {
        info += '  ❌ HTTP ' + code + ' — URL inaccesible\n\n';
        return;
      }
      const csvTexto = resp.getContentText();
      if (!csvTexto || csvTexto.trim().length === 0) {
        info += '  ❌ Respuesta vacía\n\n';
        return;
      }
      const filas = _parsearCSV(csvTexto);
      info += '  ✅ HTTP 200 — ' + (filas.length - 1) + ' registros en KoboToolbox\n';
      if (filas.length <= 1) { info += '  (sin datos)\n\n'; return; }

      const hCSV = filas[0];
      const iUUID    = _buscarCol(hCSV, ['_uuid', 'uuid']);
      const iNombre  = _buscarCol(hCSV, ['nombre completo', 'nombre_completo', 'nombre']);
      const iServicio= _buscarCol(hCSV, ['servicio al que deriva', 'servicio_al_que_deriva', 'servicio']);
      info += '  Nombre:   ' + (iNombre >= 0   ? '"' + hCSV[iNombre]  + '"' : '❌ no encontrada') + '\n';
      info += '  Servicio: ' + (iServicio >= 0 ? '"' + hCSV[iServicio] + '"' : '⚠️ no encontrada') + '\n';
      info += '  _uuid:    ' + (iUUID >= 0     ? '"' + hCSV[iUUID]    + '"' : '⚠️ no encontrado') + '\n';

      const sheetExist = ss.getSheetByName(fuente.hoja);
      const existingUUIDs = sheetExist && sheetExist.getLastRow() > 1
        ? new Set(sheetExist.getRange(2, fuente.colKey + 1, sheetExist.getLastRow() - 1, 1)
            .getValues().flat().map(v => (v||'').toString().trim()).filter(Boolean))
        : new Set();
      info += '  Hoja local: ' +
              (sheetExist ? (sheetExist.getLastRow() - 1) + ' filas ya importadas' : '❌ no existe') + '\n';

      let nuevos = 0, omitidosFiltro = 0;
      filas.slice(1).forEach(f => {
        const uuid = iUUID >= 0 ? (f[iUUID] || '').trim() : '';
        if (uuid && existingUUIDs.has(uuid)) return;
        if (fuente.nombre === 'Referencias de programas' && iServicio >= 0) {
          const s = (f[iServicio] || '').toString().toLowerCase();
          if (!s.includes('terapia_individual') && !s.includes('terapia individual') && !s.includes('terapia')) {
            omitidosFiltro++;
            return;
          }
        }
        nuevos++;
      });
      info += '  → Nuevos a importar: ' + nuevos;
      if (omitidosFiltro > 0) info += '  |  Sin Terapia Individual: ' + omitidosFiltro;
      info += '\n\n';

    } catch (e) {
      info += '  ❌ Error: ' + e.message + '\n\n';
    }
  });

  // Estado en Lista de Espera
  const listaEspera = ss.getSheetByName('Lista de Espera');
  if (listaEspera && listaEspera.getLastRow() > 1) {
    const tipos = listaEspera.getRange(2, 9, listaEspera.getLastRow() - 1, 1).getValues().flat();
    const contRefs   = tipos.filter(v => v === 'Referencia de Programa').length;
    const contDerivs = tipos.filter(v => v === 'Derivación Institucional').length;
    info += '📋 Lista de Espera col I (Derivación o Referencia):\n';
    info += '  Referencias de Programa:       ' + contRefs + '\n';
    info += '  Derivaciones Institucionales:  ' + contDerivs + '\n';
  }

  ui.alert('🔍 Diagnóstico Referencias y Derivaciones', info, ui.ButtonSet.OK);
}

/**
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * Ahora se asigna terapeuta directamente en "Hoja de interés".
 * @deprecated Use asignarTerapeuta() en su lugar
 */
function enviarInteresAListaEspera(sheet, fila) {
  Logger.log('🔄 enviarInteresAListaEspera — fila ' + fila);
  const datos = sheet.getRange(fila, 1, 1, COL_ENVIAR_INTERES - 1).getValues()[0] || new Array(COL_ENVIAR_INTERES - 1).fill('');
  // [0]=Fecha [1]=CreamosID [2]=YaParticipante [3]=Nombre(s) [4]=Apellido(s)
  // [5]=Género [6]=Edad [7]=Teléfono [8]=Zona [9]=OtraZona
  // [10]=ProgramasInterés [11]=_uuid ...

  const nombres    = (datos[3] || '').toString().trim();
  const apellidos  = (datos[4] || '').toString().trim();
  const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ').trim();

  return _agregarAListaEspera(sheet, fila, COL_ENVIAR_INTERES, {
    nombre:      nombreCompleto,
    creamosID:   datos[1],
    genero:      datos[5],
    edad:        datos[6],
    malestar:    'Interesado en programas de Creamos',
    telefono:    datos[7],
    derivacion:  'Hoja de interés',
    quienDeriva: '',
    programa:    '',
    servicio:    datos[10] || 'Sin especificar'  // Programas Interés
  });
}


// =====================================================================
// HOJA: REFERENCIAS  (Referencias de Programas)
// URL: https://kf.kobotoolbox.org/api/v2/assets/an6ckBVY2QRQPhTdKiEfcF/
//      export-settings/esr6NXWYUDifrWNeZVUVgoC/data.csv
//
// Estructura fija de la hoja (10 columnas):
//   A: Fecha | B: Programa que refiere | C: Persona que refiere
//   D: Nombre Completo | E: Teléfono | F: Dirección
//   G: Servicio | H: Motivo de referencia | I: _uuid | J: Enviar a Lista de Espera
//
// Solo se envían a Lista de Espera: Nombre, Teléfono, Motivo, Servicio,
//   Programa (quién refiere / organización).
// =====================================================================

var URL_REFERENCIAS = 'https://kf.kobotoolbox.org/api/v2/assets/afuD8C8AzoLfd4o5ksTWUw/export-settings/es52swrnjWcz8NnhY5Wyng3/data.csv';

// Variable COL_INTERES_REFERENCIAS movida al inicio del archivo

/**
 * Crea la hoja "Referencias de programas" con estructura fija.
 */
function crearHojaReferencias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName('Referencias de programas')) {
    Logger.log('⚠️ Hoja Referencias ya existe');
    return ss.getSheetByName('Referencias de programas');
  }

  const sheet = ss.insertSheet('Referencias de programas');
  const headers = [
    'Fecha', 'Programa que refiere', 'Persona que refiere',
    'Nombre Completo', 'Teléfono', 'Dirección',
    'Servicio', 'Motivo de referencia', '_uuid', 'Hoja de Interés'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#00695c').setFontColor('white')
    .setFontWeight('bold').setHorizontalAlignment('center').setWrap(true);

  [110, 200, 200, 200, 130, 200, 200, 250, 0, 140].forEach((w, i) => {
    if (w === 0) { sheet.hideColumns(i + 1); } // ocultar _uuid
    else sheet.setColumnWidth(i + 1, w);
  });
  sheet.setFrozenRows(1);

  // Validación para columna "Hoja de Interés" (columna J/10)
  sheet.getRange('J2:J1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['No', 'Sí'], true).setAllowInvalid(false).build()
  );

  Logger.log('✅ Hoja Referencias creada');
  return sheet;
}

/**
 * Importa desde KoboToolbox las referencias de programas.
 * Dedup por _uuid. Preserva todos los registros existentes.
 */
function importarReferencias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('📥 Importando Referencias...', 'Importando', 8);

  try {
    const resp = UrlFetchApp.fetch(URL_REFERENCIAS, {
      muteHttpExceptions: true, followRedirects: true
    });
    if (resp.getResponseCode() !== 200) {
      ss.toast('❌ Error HTTP ' + resp.getResponseCode(), 'Error', 5);
      return;
    }
    const filas = _parsearCSV(resp.getContentText());
    if (filas.length <= 1) { ss.toast('ℹ️ Sin datos', 'Info', 3); return; }

    let sheet = ss.getSheetByName('Referencias de programas');
    if (!sheet) sheet = crearHojaReferencias();

    const hCSV = filas[0];

    // Log de diagnóstico: mostrar todos los encabezados del CSV
    Logger.log('📋 Encabezados CSV Referencias: ' + JSON.stringify(hCSV));

    // Para la fecha: buscar primero _submission_time (fecha real de envío del formulario)
    // Si no existe, buscar 'fecha de referencia'. Evitar 'fecha' genérico que puede ser fecha de nacimiento.
    let iFecha = _buscarColExacta(hCSV, ['_submission_time', 'submissiontime', 'submission_time']);
    if (iFecha < 0) iFecha = _buscarCol(hCSV, ['fecha de referencia', 'fecha_de_referencia', 'date of reference']);
    const iPrograma = _buscarCol(hCSV, [
      '1. información del programa (origen) / programa que refiere',
      'información del programa (origen) / programa que refiere',
      'información del programa / programa que refiere',
      'programa que refiere',
      'programa_que_refiere',
      'programa refiere',
      'programa'
    ]);
    const iPersona  = _buscarCol(hCSV, [
      '1. información del programa (origen) / persona que refiere',
      'información del programa (origen) / persona que refiere',
      'información del programa / persona que refiere',
      'nombre del responsable',
      'persona que refiere',
      'persona_que_refiere',
      'persona refiere',
      'responsable',
      'persona'
    ]);
    const iNombre   = _buscarCol(hCSV, [
      '2. información del referido (participante) / nombre completo',
      '2. información del referido (participante) / nombre preferido',
      'información del referido (participante) / nombre completo',
      'información del referido (participante) / nombre preferido',
      'información del referido / nombre completo',
      'información del referido / nombre preferido',
      'nombre completo (según dpi)',
      'nombre completo (segun dpi)',
      'nombre completo según dpi',
      'nombre completo segun dpi',
      'nombre preferido',
      'nombre completo',
      'nombre_completo',
      'nombre_preferido'
    ]);
    const iTelefono = _buscarCol(hCSV, ['2. información del referido (participante) / teléfono', 'teléfono', 'telefono', 'tel']);
    const iDireccion= _buscarCol(hCSV, ['2. información del referido (participante) / zona / colonia', '2. información del referido (participante) / especifique zona o colonia', 'dirección', 'direccion', 'zona']);
    const iTipoApoyo= _buscarCol(hCSV, ['detalles apoyo emocional / tipo de apoyo solicitado', 'tipo de apoyo solicitado', 'servicio al que deriva', 'servicio_al_que_deriva', 'servicio']);
    const iMotivo   = _buscarCol(hCSV, ['detalles apoyo emocional / breve motivo de la referencia', 'motivo']);
    const iUUID     = _buscarCol(hCSV, ['_uuid', 'uuid']);

    Logger.log('📍 Referencias: iFecha=' + iFecha + ' (' + (iFecha >= 0 ? hCSV[iFecha] : 'NO ENCONTRADO - usará fecha hoy') + ') iPrograma=' + iPrograma + ' iPersona=' + iPersona + ' iTipoApoyo=' + iTipoApoyo + ' iNombre=' + iNombre + ' iUUID=' + iUUID);

    // IDs ya importados (col I = _uuid, índice 8)
    const existentes = sheet.getLastRow() > 1
      ? sheet.getRange(2, 9, sheet.getLastRow() - 1, 1).getValues().flat()
      : [];
    const uuidsSet = new Set(existentes.map(v => (v || '').toString().trim()).filter(Boolean));

    const filasNuevas = [];
    let omitidos = 0;
    for (let i = 1; i < filas.length; i++) {
      const f = filas[i];

      // Filtrar: solo "Terapia individual"
      if (iTipoApoyo >= 0) {
        const s = (f[iTipoApoyo] || '').toString().toLowerCase().trim();
        // Solo aceptar exactamente "Terapia individual", no grupos ni otros
        if (s !== 'terapia individual' && s !== 'terapia_individual') {
          omitidos++;
          continue;
        }
      }

      const uuid = iUUID >= 0 ? (f[iUUID] || '').trim() : '';
      if (uuid && uuidsSet.has(uuid)) continue;

      // Obtener fecha: usar _submission_time o fecha de referencia del CSV
      // Si no hay ninguna, usar la fecha de hoy como fallback
      let fechaFila = new Date();
      if (iFecha >= 0 && f[iFecha]) {
        const parsed = new Date(f[iFecha]);
        fechaFila = isNaN(parsed.getTime()) ? new Date() : parsed;
      }

      filasNuevas.push([
        fechaFila,                                     // A: Fecha (envío del formulario)
        iPrograma >= 0  ? f[iPrograma]  : '',          // B: Programa
        iPersona >= 0   ? f[iPersona]   : '',          // C: Persona
        iNombre >= 0    ? f[iNombre]    : '',          // D: Nombre Completo
        iTelefono >= 0  ? f[iTelefono]  : '',          // E: Teléfono
        iDireccion >= 0 ? f[iDireccion] : '',          // F: Dirección
        'Terapia Individual',                          // G: Servicio (siempre Terapia Individual por filtro)
        iMotivo >= 0    ? f[iMotivo]    : '',          // H: Motivo
        uuid,                                           // I: _uuid
        'No'                                            // J: Hoja de Interés (valor por defecto)
      ]);
      if (uuid) uuidsSet.add(uuid);
    }

    if (filasNuevas.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, filasNuevas.length, 10).setValues(filasNuevas);
    }

    const msg = filasNuevas.length > 0
      ? '✅ ' + filasNuevas.length + ' referencias importadas'
      : 'ℹ️ Sin registros nuevos' + (omitidos > 0 ? ' (' + omitidos + ' no son Terapia Individual)' : '');
    ss.toast(msg, filasNuevas.length > 0 ? 'Importación Completa' : 'Importación', 4);
    Logger.log('📊 Referencias: ' + filasNuevas.length + ' nuevas, ' + omitidos + ' omitidas (otro servicio)');

  } catch (e) {
    Logger.log('❌ Error en importarReferencias: ' + e.message);
    ss.toast('❌ Error: ' + e.message, 'Error', 5);
  }
}

/**
 * [DESHABILITADA] Envía un registro de Referencias a Lista de Espera.
 * Columna "Enviar a Lista de Espera" removida según solicitud del usuario.
 */
// function enviarReferenciaAListaEspera(sheet, fila) {
//   Logger.log('🔄 enviarReferenciaAListaEspera — fila ' + fila);
//   const datos = sheet.getRange(fila, 1, 1, COL_ENVIAR_REFERENCIAS - 1).getValues()[0];
//   // [0]=Fecha [1]=Programa [2]=Persona [3]=Nombre [4]=Tel [5]=Dir [6]=Servicio [7]=Motivo [8]=UUID
//   return _agregarAListaEspera(sheet, fila, COL_ENVIAR_REFERENCIAS, {
//     nombre:      datos[3],    // D: Nombre Completo
//     creamosID:   '',          // no disponible en este formulario
//     genero:      '',
//     edad:        '',
//     malestar:    datos[7],    // H: Motivo de referencia
//     telefono:    datos[4],    // E: Teléfono
//     derivacion:  'Referencia de Programa',
//     quienDeriva: datos[2],    // C: Persona que refiere
//     programa:    datos[1],    // B: Programa que refiere
//     servicio:    datos[6]     // G: Servicio
//   });
// }


// =====================================================================
// HOJA: DERIVACIONES INSTITUCIONALES
// URL: https://kf.kobotoolbox.org/api/v2/assets/aPAe8WZjdW8Pp3bxLVkPtc/
//      export-settings/esxMhVxGG8yjgoaFV9FxKjA/data.csv
//
// Estructura fija de la hoja (12 columnas):
//   A: Fecha | B: Nombre de quien deriva | C: Tel. quien deriva
//   D: Nombre de organización | E: Nombre Completo | F: Edad
//   G: Teléfono | H: Dirección | I: Motivo de derivación
//   J: Servicio al que deriva | K: _uuid | L: Enviar a Lista de Espera
//
// Solo se envían a Lista de Espera: Nombre, Edad, Teléfono, Motivo, Servicio,
//   Organización (quien deriva).
// =====================================================================

var URL_DERIVACIONES = 'https://kf.kobotoolbox.org/api/v2/assets/aPAe8WZjdW8Pp3bxLVkPtc/export-settings/esxMhVxGG8yjgoaFV9FxKjA/data.csv';

// Variable COL_INTERES_DERIVACIONES movida al inicio del archivo

/**
 * Crea la hoja "Derivaciones Institucionales" con estructura fija.
 */
function crearHojaDerivacionesInstitucionales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName('Derivaciones Institucionales')) {
    Logger.log('⚠️ Hoja Derivaciones Institucionales ya existe');
    return ss.getSheetByName('Derivaciones Institucionales');
  }

  const sheet = ss.insertSheet('Derivaciones Institucionales');
  const headers = [
    'Fecha', 'Nombre de quien deriva', 'Tel. quien deriva',
    'Organización', 'Nombre Completo', 'Edad',
    'Teléfono', 'Dirección', 'Motivo de derivación',
    'Servicio al que deriva', '_uuid', 'Hoja de Interés'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#4a148c').setFontColor('white')
    .setFontWeight('bold').setHorizontalAlignment('center').setWrap(true);

  [110, 200, 130, 200, 200, 60, 130, 180, 250, 200, 0, 140].forEach((w, i) => {
    if (w === 0) { sheet.hideColumns(i + 1); }
    else sheet.setColumnWidth(i + 1, w);
  });
  sheet.setFrozenRows(1);

  // Validación para columna "Hoja de Interés" (columna L/12)
  sheet.getRange('L2:L1000').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['No', 'Sí'], true).setAllowInvalid(false).build()
  );

  Logger.log('✅ Hoja Derivaciones Institucionales creada');
  return sheet;
}

/**
 * Importa desde KoboToolbox las derivaciones institucionales.
 * Dedup por _uuid. Preserva todos los registros existentes.
 */
function importarDerivacionesInstitucionales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('📥 Importando Derivaciones Institucionales...', 'Importando', 8);

  try {
    const resp = UrlFetchApp.fetch(URL_DERIVACIONES, {
      muteHttpExceptions: true, followRedirects: true
    });
    if (resp.getResponseCode() !== 200) {
      ss.toast('❌ Error HTTP ' + resp.getResponseCode(), 'Error', 5);
      return;
    }
    const filas = _parsearCSV(resp.getContentText());
    if (filas.length <= 1) { ss.toast('ℹ️ Sin datos', 'Info', 3); return; }

    let sheet = ss.getSheetByName('Derivaciones Institucionales');
    if (!sheet) sheet = crearHojaDerivacionesInstitucionales();

    const hCSV = filas[0];
    const iFecha    = _buscarCol(hCSV, ['fecha', 'date', '_submission']);
    const iNomDeriva= _buscarCol(hCSV, ['nombre de quien deriva', 'nombre_de_quien_deriva', 'quien deriva']);
    const iTelDeriva= _buscarCol(hCSV, ['teléfono', 'telefono']);            // primer tel = quien deriva
    const iOrg      = _buscarCol(hCSV, ['nombre de organización', 'nombre_de_organizacion', 'organización', 'organizacion']);
    const iNombre   = _buscarCol(hCSV, ['nombre completo', 'nombre_completo']);
    const iEdad     = _buscarCol(hCSV, ['edad']);
    // Segundo teléfono (del participante) — diferente al de quien deriva
    const iTelParticipante = (() => {
      const normH = s => (s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      let encontrado = 0;
      for (let j = 0; j < hCSV.length; j++) {
        if (normH(hCSV[j]).includes('telefono') || normH(hCSV[j]).includes('teléfono')) {
          encontrado++;
          if (encontrado === 2) return j;  // segundo ocurrencia = participante
        }
      }
      return -1;
    })();
    const iDireccion= _buscarCol(hCSV, ['dirección', 'direccion']);
    const iMotivo   = _buscarCol(hCSV, ['motivo de derivación', 'motivo_de_derivacion', 'motivo']);
    const iServicio = _buscarCol(hCSV, ['servicio al que deriva', 'servicio_al_que_deriva', 'servicio']);
    const iUUID     = _buscarCol(hCSV, ['_uuid', 'uuid']);

    // IDs ya importados (col K = _uuid, índice 10)
    const existentes = sheet.getLastRow() > 1
      ? sheet.getRange(2, 11, sheet.getLastRow() - 1, 1).getValues().flat()
      : [];
    const uuidsSet = new Set(existentes.map(v => (v || '').toString().trim()).filter(Boolean));

    const filasNuevas = [];
    for (let i = 1; i < filas.length; i++) {
      const f = filas[i];
      const uuid = iUUID >= 0 ? (f[iUUID] || '').trim() : '';
      if (uuid && uuidsSet.has(uuid)) continue;

      // Solo importar derivaciones a "Terapia individual"
      const servicioVal = iServicio >= 0 ? (f[iServicio] || '').toString().toLowerCase().trim() : '';
      if (iServicio >= 0 && !servicioVal.includes('terapia individual')) continue;

      const fechaRaw = iFecha >= 0 ? (f[iFecha] || '').trim() : '';
      filasNuevas.push([
        fechaRaw ? new Date(fechaRaw) : new Date(), // A: Fecha
        iNomDeriva >= 0     ? f[iNomDeriva]         : '', // B: Nombre quien deriva
        iTelDeriva >= 0     ? f[iTelDeriva]         : '', // C: Tel. quien deriva
        iOrg >= 0           ? f[iOrg]               : '', // D: Organización
        iNombre >= 0        ? f[iNombre]             : '', // E: Nombre Completo
        iEdad >= 0          ? f[iEdad]               : '', // F: Edad
        iTelParticipante >= 0 ? f[iTelParticipante] : '', // G: Teléfono (participante)
        iDireccion >= 0     ? f[iDireccion]         : '', // H: Dirección
        iMotivo >= 0        ? f[iMotivo]             : '', // I: Motivo
        iServicio >= 0      ? f[iServicio]           : '', // J: Servicio
        uuid,                                               // K: _uuid
        'No'                                                // L: Hoja de Interés (valor por defecto)
      ]);
      if (uuid) uuidsSet.add(uuid);
    }

    if (filasNuevas.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, filasNuevas.length, 12).setValues(filasNuevas);
    }

    const msg = filasNuevas.length > 0
      ? '✅ ' + filasNuevas.length + ' derivaciones importadas'
      : 'ℹ️ Sin registros nuevos';
    ss.toast(msg, filasNuevas.length > 0 ? 'Importación Completa' : 'Importación', 4);
    Logger.log(msg);

  } catch (e) {
    Logger.log('❌ Error en importarDerivacionesInstitucionales: ' + e.message);
    ss.toast('❌ Error: ' + e.message, 'Error', 5);
  }
}

/**
 * [DESHABILITADA] Envía un registro de Derivaciones Institucionales a Lista de Espera.
 * Columna "Enviar a Lista de Espera" removida según solicitud del usuario.
 * Ahora la columna L es "Hoja de Interés" con formato de colores automático.
 */
// function enviarDerivacionInstitucionalAListaEspera(sheet, fila) {
//   Logger.log('🔄 enviarDerivacionInstitucionalAListaEspera — fila ' + fila);
//   const datos = sheet.getRange(fila, 1, 1, COL_INTERES_DERIVACIONES - 1).getValues()[0];
//   // [0]=Fecha [1]=NomDeriva [2]=TelDeriva [3]=Org [4]=Nombre [5]=Edad
//   // [6]=Tel [7]=Dir [8]=Motivo [9]=Servicio [10]=UUID
//   return _agregarAListaEspera(sheet, fila, COL_INTERES_DERIVACIONES, {
//     nombre:      datos[4],    // E: Nombre Completo
//     creamosID:   '',          // no disponible
//     genero:      '',
//     edad:        datos[5],    // F: Edad
//     malestar:    datos[8],    // I: Motivo de derivación
//     telefono:    datos[6],    // G: Teléfono del participante
//     derivacion:  'Derivación Institucional',
//     quienDeriva: datos[1],    // B: Nombre de quien deriva
//     programa:    datos[3],    // D: Nombre de organización
//     servicio:    datos[9]     // J: Servicio al que deriva
//   });
// }

/**
 * [DESHABILITADA] Envía un registro de Intervención de casos a Lista de Espera.
 * Columna "Enviar a Lista de Espera" removida según solicitud del usuario.
 * Columnas de Intervención de casos:
 *   A: Fecha | B: Participante | C: Terapeuta | D: Creamos ID
 *   E: Tipo  | F: Motivo       | G: _uuid (oculto) | H: Hoja de Interés
 */
/**
 * [DESHABILITADA] Envía un registro de Intervención de Casos a Lista de Espera.
 * Columna "Enviar a Lista de Espera" removida según solicitud del usuario.
 */
// function enviarIntervencionCasosAListaEspera(sheet, fila) {
//   Logger.log('🔄 enviarIntervencionCasosAListaEspera — fila ' + fila);
//   const datos = sheet.getRange(fila, 1, 1, 7).getValues()[0];
//   // [0]=Fecha [1]=Participante [2]=Terapeuta [3]=CreamosID [4]=Tipo [5]=Motivo [6]=UUID
//
//   return _agregarAListaEspera(sheet, fila, 8, {
//     nombre:      datos[1],    // B: Participante
//     creamosID:   datos[3],    // D: Creamos ID
//     genero:      '',          // no disponible
//     edad:        '',          // no disponible
//     malestar:    datos[5],    // F: Motivo (se usa como Malestar Principal)
//     telefono:    '',          // no disponible
//     derivacion:  'Intervención de Caso (' + (datos[4] || '') + ')',  // E: Tipo
//     quienDeriva: datos[2] || '',  // C: Terapeuta que hizo la intervención
//     programa:    'Intervención de casos',
//     servicio:    'Apoyo Emocional'
//   });
// }


// =====================================================================
// REIMPORTAR INTERVENCIÓN DE CASOS (limpia y reimporta)
// =====================================================================

/**
 * Limpia la hoja "Intervención de casos" y reimporta desde KoboToolbox.
 * Solo afecta esa hoja, no toca ninguna otra.
 */
function reimportarIntervencionCasos() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const confirmar = ui.alert(
    '📋 Reimportar Intervención de Casos',
    '¿Desea limpiar y reimportar los datos de Intervención de Casos desde KoboToolbox?\n\n' +
    'Esto va a:\n' +
    '1. Borrar los datos actuales de la hoja (filas 2 en adelante)\n' +
    '2. Reimportar todo desde KoboToolbox con las columnas de Motivo unificadas\n\n' +
    '⚠️ Los campos que hayan llenado manualmente (como Terapeuta y Hoja de Interés)\n' +
    'se van a perder. Tendrán que volver a llenarlos.\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmar !== ui.Button.YES) return;

  try {
    let sheet = ss.getSheetByName('Intervención de casos');

    // Borrar hoja completa y recrearla con la estructura correcta
    if (sheet) {
      ss.deleteSheet(sheet);
      Logger.log('✅ Hoja Intervención de casos eliminada para recrear');
    }

    crearGestionCasos();
    Logger.log('✅ Hoja Intervención de casos recreada con nueva estructura');

    ss.toast('📥 Reimportando Intervención de casos...', 'Procesando', 10);
    importarIntervencionesCasos();

    // Reaplicar validaciones
    sheet = ss.getSheetByName('Intervención de casos');
    if (sheet) {
      const tipoRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Paps', 'Crisis suicida', 'Derivación institucional', 'Otras organizaciones de la red'])
        .setAllowInvalid(true).build();
      sheet.getRange('E2:E200').setDataValidation(tipoRule);

      const interesRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Sí', 'No']).setAllowInvalid(false).build();
      sheet.getRange('I2:I200').setDataValidation(interesRule);
    }

    ss.toast('✅ Intervención de casos reimportada correctamente', 'Completado', 5);
  } catch (error) {
    Logger.log('❌ Error reimportando: ' + error.toString());
    ui.alert('❌ Error: ' + error.toString());
  }
}

/**
 * Limpia y reimporta solo "Hoja de interés" desde KoboToolbox.
 */
function reimportarHojaInteres() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const confirmar = ui.alert(
    '📄 Reimportar Hoja de Interés',
    '¿Limpiar y reimportar Hoja de Interés desde KoboToolbox?\n\n' +
    '⚠️ Los campos manuales (Terapeuta Asignado, Asistió a Cita, etc.) se perderán.',
    ui.ButtonSet.YES_NO
  );
  if (confirmar !== ui.Button.YES) return;

  try {
    const sheet = ss.getSheetByName('Hoja de interés');
    if (sheet && sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
      sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearFormat();
    }
    ss.toast('📥 Reimportando Hoja de interés...', 'Procesando', 10);
    importarFormularioInteres();
    ss.toast('✅ Hoja de interés reimportada', 'Completado', 5);
  } catch (error) {
    ui.alert('❌ Error: ' + error.toString());
  }
}

/**
 * Limpia y reimporta solo "Referencias de programas" desde KoboToolbox.
 */
function reimportarReferencias() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const confirmar = ui.alert(
    '🔗 Reimportar Referencias de Programas',
    '¿Limpiar y reimportar Referencias de Programas desde KoboToolbox?\n\n' +
    '⚠️ El campo "Hoja de Interés" (columna J) se reseteará a "No".',
    ui.ButtonSet.YES_NO
  );
  if (confirmar !== ui.Button.YES) return;

  try {
    const sheet = ss.getSheetByName('Referencias de programas');
    if (sheet && sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
      sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearFormat();
    }
    ss.toast('📥 Reimportando Referencias...', 'Procesando', 10);
    importarReferencias();
    ss.toast('✅ Referencias reimportadas', 'Completado', 5);
  } catch (error) {
    ui.alert('❌ Error: ' + error.toString());
  }
}

/**
 * Limpia y reimporta solo "Derivaciones Institucionales" desde KoboToolbox.
 */
function reimportarDerivaciones() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const confirmar = ui.alert(
    '🏛️ Reimportar Derivaciones Institucionales',
    '¿Limpiar y reimportar Derivaciones Institucionales desde KoboToolbox?\n\n' +
    'Solo se importarán derivaciones a "Terapia individual".\n' +
    'Escuela para padres y otros servicios serán excluidos.\n\n' +
    '⚠️ El campo "Hoja de Interés" se reseteará a "No".',
    ui.ButtonSet.YES_NO
  );
  if (confirmar !== ui.Button.YES) return;

  try {
    const sheet = ss.getSheetByName('Derivaciones Institucionales');
    if (sheet && sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
      sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearFormat();
    }
    ss.toast('📥 Reimportando Derivaciones...', 'Procesando', 10);
    importarDerivacionesInstitucionales();
    ss.toast('✅ Derivaciones reimportadas', 'Completado', 5);
  } catch (error) {
    ui.alert('❌ Error: ' + error.toString());
  }
}

// =====================================================================
// HOJA: INTERVENCIÓN DE CASOS  (KoboToolbox)
// URL: https://kf.kobotoolbox.org/api/v2/assets/avnPVj8iEwvfwUkySWcMAJ/
//      export-settings/esiNV5nenKxfDh9wNmZD6kC/data.csv
//
// Columnas usadas de la hoja "Intervención de casos":
//   A: Fecha | B: Participante | C: Terapeuta (manual) | D: Creamos ID
//   E: Tipo  | F: Motivo       | G: _uuid (oculto, dedup) | H: Hoja de Interés
// =====================================================================

var URL_INTERVENCION_CASOS = 'https://kf.kobotoolbox.org/api/v2/assets/avnPVj8iEwvfwUkySWcMAJ/export-settings/esiNV5nenKxfDh9wNmZD6kC/data.csv';

// Variable COL_INTERES_INTERVENCION movida al inicio del archivo

/**
 * Importa desde KoboToolbox los registros de intervención de casos.
 * Dedup por _uuid — no elimina ni sobreescribe registros existentes.
 * La columna C (Terapeuta) se deja en blanco para que el usuario la llene.
 */
function importarIntervencionesCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('📥 Importando Intervención de casos...', 'Importando', 8);

  try {
    const resp = UrlFetchApp.fetch(URL_INTERVENCION_CASOS, {
      muteHttpExceptions: true, followRedirects: true
    });
    if (resp.getResponseCode() !== 200) {
      Logger.log('❌ IntervenciónCasos HTTP ' + resp.getResponseCode());
      ss.toast('❌ Error HTTP ' + resp.getResponseCode() + ' al importar Intervención de casos', 'Error', 5);
      return;
    }

    const filas = _parsearCSV(resp.getContentText());
    if (filas.length <= 1) {
      ss.toast('ℹ️ Sin datos en Intervención de casos', 'Info', 3);
      return;
    }

    // Obtener o crear la hoja
    let sheet = ss.getSheetByName('Intervención de casos');
    if (!sheet) {
      crearGestionCasos();
      sheet = ss.getSheetByName('Intervención de casos');
    }

    // Asegurar que la columna H existe como _uuid (oculta) para el dedup
    const headerH = sheet.getRange(1, 8).getValue();
    if (!headerH || headerH.toString().trim() === '') {
      sheet.getRange(1, 8).setValue('_uuid');
      try { sheet.hideColumns(8); } catch(e) {}
    }

    // Mapear columnas del CSV
    const hCSV = filas[0];
    // Buscar fecha de envío del formulario, no una "fecha" genérica que puede ser fecha de nacimiento
    let iFecha = _buscarColExacta(hCSV, ['_submission_time', 'submissiontime', 'submission_time']);
    if (iFecha < 0) iFecha = _buscarCol(hCSV, ['fecha de intervencion', 'fecha intervencion', 'fecha_de_intervencion']);
    const iNombres   = _buscarCol(hCSV, ['nombre (s)', 'nombre(s)', 'nombres']);
    const iApellidos = _buscarCol(hCSV, ['apellido (s)', 'apellido(s)', 'apellidos']);
    const iCreamosID = _buscarCol(hCSV, ['creamos id', 'creamos_id']);
    const iTipo      = _buscarCol(hCSV, ['tipo intervencion de caso', 'tipo_intervencion', 'tipo']);
    const iNota      = _buscarCol(hCSV, ['nota intervencion de caso', 'nota_intervencion', 'nota intervencion', 'nota']);
    // El CSV de KoboToolbox tiene 4 columnas "Motivo_intervenci_n_de_caso_001..004"
    const indicesMotivo = _buscarTodasCols(hCSV, ['motivo intervencion de caso', 'motivo_intervencion', 'motivo_intervenci']);
    const iMotivo    = indicesMotivo.length > 0 ? indicesMotivo[0] : _buscarCol(hCSV, ['motivo']);
    const iUUID      = _buscarCol(hCSV, ['_uuid', 'uuid']);

    Logger.log('📍 IntervenciónCasos: iFecha=' + iFecha + ' iNombres=' + iNombres +
               ' iCreamosID=' + iCreamosID + ' iTipo=' + iTipo + ' iNota=' + iNota +
               ' iMotivo=' + JSON.stringify(indicesMotivo) + ' (' + indicesMotivo.length + ' columnas motivo)' +
               ' iUUID=' + iUUID);

    // UUIDs ya importados (col H = 8, _uuid)
    const lastRow = sheet.getLastRow();
    const existentes = lastRow > 1
      ? sheet.getRange(2, 8, lastRow - 1, 1).getValues().flat()
      : [];
    const uuidsSet = new Set(existentes.map(v => (v || '').toString().trim()).filter(Boolean));

    // Tipos válidos para Intervención de casos (excluir Inclusión laboral, Referencia programas, etc.)
    const tiposValidos = ['paps', 'crisis suicida', 'derivacion institucional', 'derivación institucional',
                          'otras organizaciones de la red'];

    // Nombres de programa que NO son motivos reales de intervención
    const programasExcluir = ['inclucion_laboral', 'inclusion_laboral', 'inclusión laboral', 'inclusion laboral',
                              'educacion', 'educación'];

    const filasNuevas = [];
    let omitidosTipo = 0;
    for (let i = 1; i < filas.length; i++) {
      const f = filas[i];

      // Filtrar por tipo: solo tipos relevantes para intervención de casos
      if (iTipo >= 0) {
        const tipoRaw = (f[iTipo] || '').toString().toLowerCase().trim();
        if (tipoRaw && !tiposValidos.some(tv => tipoRaw.includes(tv))) {
          omitidosTipo++;
          continue;
        }
      }

      // Filtrar: excluir registros donde algún motivo sea un nombre de programa
      let esPrograma = false;
      if (indicesMotivo.length > 0) {
        for (let idx = 0; idx < indicesMotivo.length; idx++) {
          const motivoVal = (f[indicesMotivo[idx]] || '').toString().toLowerCase().trim();
          if (motivoVal && programasExcluir.some(p => motivoVal.includes(p))) {
            esPrograma = true;
            break;
          }
        }
      }
      if (esPrograma) {
        omitidosTipo++;
        continue;
      }

      const uuid = iUUID >= 0 ? (f[iUUID] || '').trim() : '';
      if (uuid && uuidsSet.has(uuid)) continue;

      const nombres   = iNombres   >= 0 ? (f[iNombres]   || '').trim() : '';
      const apellidos = iApellidos >= 0 ? (f[iApellidos] || '').trim() : '';
      const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ');

      const fechaRaw = iFecha >= 0 ? (f[iFecha] || '').trim() : '';
      const fecha    = fechaRaw ? new Date(fechaRaw) : new Date();

      // Combinar las múltiples columnas "Motivo intervención de caso"
      let motivoCombinado = '';
      if (indicesMotivo.length > 0) {
        motivoCombinado = indicesMotivo
          .map(idx => (f[idx] || '').trim())
          .filter(Boolean)
          .join(' | ');
      } else if (iMotivo >= 0) {
        motivoCombinado = (f[iMotivo] || '').trim();
      }

      // Combinar múltiples columnas de Nota si existen
      const indicesNota = _buscarTodasCols(hCSV, ['nota intervencion de caso', 'nota_intervencion', 'nota_intervenci']);
      let notaCombinada = '';
      if (indicesNota.length > 0) {
        notaCombinada = indicesNota
          .map(idx => (f[idx] || '').trim())
          .filter(Boolean)
          .join(' | ');
      } else if (iNota >= 0) {
        notaCombinada = (f[iNota] || '').trim();
      }

      filasNuevas.push([
        fecha,                                                        // A: Fecha
        nombreCompleto,                                               // B: Participante
        '',                                                           // C: Terapeuta (manual)
        iCreamosID >= 0 ? (f[iCreamosID] || '').trim() : '',         // D: Creamos ID
        iTipo      >= 0 ? (f[iTipo]      || '').trim() : '',         // E: Tipo
        notaCombinada,                                                // F: Nota
        motivoCombinado,                                              // G: Motivo
        uuid,                                                         // H: _uuid (oculto)
        'No'                                                          // I: Hoja de Interés
      ]);
      if (uuid) uuidsSet.add(uuid);
    }

    if (omitidosTipo > 0) {
      Logger.log('📊 IntervenciónCasos: ' + omitidosTipo + ' registros omitidos por tipo no relevante (ej: Inclusión laboral)');
    }

    if (filasNuevas.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, filasNuevas.length, 9).setValues(filasNuevas);
    }

    const msg = filasNuevas.length > 0
      ? '✅ ' + filasNuevas.length + ' intervenciones importadas'
      : 'ℹ️ Intervención de casos: sin registros nuevos';
    ss.toast(msg, filasNuevas.length > 0 ? 'Importación Completa' : 'Importación', 4);
    Logger.log('📊 IntervenciónCasos: ' + filasNuevas.length + ' nuevas');

  } catch (e) {
    Logger.log('❌ Error en importarIntervencionesCasos: ' + e.message);
    ss.toast('❌ Error importando intervenciones: ' + e.message, 'Error', 5);
  }
}

// =====================================================================
// AUTO-ACTUALIZACIÓN DE LAS 3 HOJAS DE CAPTACIÓN
// Se ejecuta periódicamente (trigger de tiempo) para importar
// registros nuevos desde KoboToolbox sin intervención manual.
// =====================================================================

/**
 * Importa silenciosamente las 3 hojas de captación.
 * Se ejecuta desde el trigger de tiempo; no muestra diálogos.
 */
function importarHojasCaptacionSilencioso() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('🔄 Auto-importación hojas captación: ' + new Date().toLocaleString());
  try {
    ss.toast('📥 Importando Hoja de interés...', 'Captación', 10);
    importarFormularioInteres();
  } catch(e) { Logger.log('⚠️ Interés: ' + e.message); }
  try {
    ss.toast('📥 Importando Referencias de programas...', 'Captación', 10);
    importarReferencias();
  } catch(e) { Logger.log('⚠️ Referencias: ' + e.message); }
  try {
    ss.toast('📥 Importando Derivaciones Institucionales...', 'Captación', 10);
    importarDerivacionesInstitucionales();
  } catch(e) { Logger.log('⚠️ Derivaciones: ' + e.message); }
  try {
    ss.toast('📥 Importando Intervención de casos...', 'Captación', 10);
    importarIntervencionesCasos();
  } catch(e) { Logger.log('⚠️ IntervenciónCasos: ' + e.message); }
  ss.toast('✅ Importación completa', 'Captación', 5);
  Logger.log('✅ Auto-importación hojas captación completada');
}

/**
 * Instala un trigger de tiempo que actualiza las 3 hojas de captación
 * cada hora. Se puede llamar manualmente desde el menú.
 */
function instalarAutoImportCaptacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Eliminar trigger anterior si existe
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'importarHojasCaptacionSilencioso') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('importarHojasCaptacionSilencioso')
    .timeBased().everyMinutes(10).create();

  ss.toast('⏰ Auto-actualización activada (cada 10 min)', 'Captación', 4);
  Logger.log('✅ Trigger importarHojasCaptacionSilencioso instalado (cada 10 min)');

  ui.alert(
    '✅ Auto-actualización activada',
    'Las hojas de captación se actualizarán automáticamente cada 10 minutos:\n\n' +
    '• 💡 Hoja de interés\n' +
    '• 🔗 Referencias\n' +
    '• 🏛️ Derivaciones Institucionales\n' +
    '• 📋 Intervención de casos\n\n' +
    'Puedes también usar "⚡ Importar Datos Ahora" en cualquier momento.',
    ui.ButtonSet.OK
  );
}

/**
 * Desactiva el trigger de auto-actualización de hojas de captación.
 */
function desactivarAutoImportCaptacion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let eliminados = 0;
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'importarHojasCaptacionSilencioso') {
      ScriptApp.deleteTrigger(t);
      eliminados++;
    }
  });
  const msg = eliminados > 0 ? '✅ Auto-actualización desactivada' : 'ℹ️ No había trigger activo';
  ss.toast(msg, 'Captación', 3);
  Logger.log(msg);
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
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * Todas las llamadas a esta función están comentadas.
 * @deprecated No usar - hoja Lista de Espera eliminada
 */
function enviarBienestarAListaEspera(sheetOrigen, fila) {
  Logger.log('🔄 enviarBienestarAListaEspera iniciado para fila ' + fila);

  // Obtener los headers de la hoja
  const headers = sheetOrigen.getRange(1, 1, 1, sheetOrigen.getLastColumn()).getValues()[0] || [];

  // Llamar a la versión flexible con todos los parámetros
  return enviarBienestarAListaEsperaFlexible(sheetOrigen, fila, headers);
}

/**
 * [OBSOLETA] Esta función ya no se usa.
 * La hoja "Lista de Espera" fue eliminada.
 * Todas las llamadas a esta función están comentadas.
 * @deprecated No usar - hoja Lista de Espera eliminada
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
    const datos = sheetOrigen.getRange(fila, 1, 1, numColumnas).getValues()[0] || new Array(numColumnas).fill('');

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
      'Pendiente', // N: Asistió
      0, // O: Número de llamadas realizadas
      '' // P: _notas_llamadas (oculto)
    ];

    // Insertar
    espera.getRange(primeraFilaVacia, 1, 1, 16).setValues([nuevaFila]);

    // Formatear
    espera.getRange(primeraFilaVacia, 1, 1, 16)
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

  let diagnostico = '🔍 DIAGNÓSTICO COMPLETO DE IMPORTACIÓN\n\n';

  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/esreCzkfVcEd4Bw87so7ZwY/data.csv';

    diagnostico += '1️⃣ URL del CSV:\n';
    diagnostico += url + '\n\n';

    // Intentar descargar
    diagnostico += '2️⃣ Descargando CSV de KoboToolbox...\n';
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    const codigo = response.getResponseCode();
    diagnostico += '   Código HTTP: ' + codigo;

    if (codigo === 200) {
      diagnostico += ' ✅ OK\n\n';
    } else {
      diagnostico += ' ❌ ERROR\n\n';
      diagnostico += '❌ NO SE PUDO DESCARGAR EL CSV\n\n';
      diagnostico += 'Posibles causas:\n';
      diagnostico += '• El CSV no es público en KoboToolbox\n';
      diagnostico += '• La URL cambió o expiró\n';
      diagnostico += '• Necesita autenticación\n\n';
      diagnostico += 'SOLUCIÓN:\n';
      diagnostico += '1. Ve a KoboToolbox\n';
      diagnostico += '2. Abre tu formulario de Bienestar\n';
      diagnostico += '3. Data → Downloads → CSV\n';
      diagnostico += '4. Copia el enlace público\n';
      diagnostico += '5. Reemplaza la URL en el código\n';

      ui.alert('❌ Error al Descargar CSV', diagnostico, ui.ButtonSet.OK);
      Logger.log(diagnostico);
      return;
    }

    // Ver contenido
    const csvData = response.getContentText();
    diagnostico += '3️⃣ CSV descargado exitosamente\n';
    diagnostico += '   Tamaño: ' + csvData.length + ' caracteres\n\n';

    if (!csvData || csvData.trim().length === 0) {
      diagnostico += '❌ ERROR: El CSV está completamente vacío\n\n';
      diagnostico += 'Esto significa que no hay datos en KoboToolbox.\n';
      diagnostico += 'Asegúrate de haber llenado el formulario primero.';
      ui.alert('❌ CSV Vacío', diagnostico, ui.ButtonSet.OK);
      Logger.log(diagnostico);
      return;
    }

    // Detectar delimitador
    diagnostico += '4️⃣ Detectando delimitador...\n';
    const primeraLinea = csvData.split('\n')[0] || '';
    const numComas = (primeraLinea.match(/,/g) || []).length;
    const numPuntosComa = (primeraLinea.match(/;/g) || []).length;
    const delimitador = numPuntosComa > numComas ? ';' : ',';

    diagnostico += '   Comas (,): ' + numComas + '\n';
    diagnostico += '   Puntos y coma (;): ' + numPuntosComa + '\n';
    diagnostico += '   Delimitador detectado: "' + delimitador + '" ✅\n\n';

    // Parsear con el delimitador correcto
    diagnostico += '5️⃣ Parseando CSV...\n';
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

    diagnostico += '   Líneas totales en CSV: ' + lineas.length + '\n';
    diagnostico += '   Filas válidas parseadas: ' + filas.length + ' ✅\n\n';

    if (filas.length === 0) {
      diagnostico += '❌ ERROR: No se pudo parsear ninguna fila\n\n';
      diagnostico += 'Primera línea del CSV:\n';
      diagnostico += lineas[0].substring(0, 200) + '...\n';
      ui.alert('❌ Error de Parseo', diagnostico, ui.ButtonSet.OK);
      Logger.log(diagnostico);
      return;
    }

    // Mostrar encabezados
    diagnostico += '6️⃣ ENCABEZADOS ENCONTRADOS:\n';
    const headers = filas[0];
    diagnostico += '   Total de columnas: ' + headers.length + '\n\n';

    for (let i = 0; i < headers.length; i++) {
      diagnostico += '   [' + i + '] "' + headers[i] + '"\n';
    }
    diagnostico += '\n';

    // Buscar columnas necesarias
    diagnostico += '7️⃣ Buscando columnas necesarias...\n';
    const colCreamosID = headers.findIndex(h => h && (h.toString() === 'Creamos ID' || h.toString().toLowerCase().includes('creamos')));
    const colProtocoloSuicidio = headers.findIndex(h => h && h.toString().toLowerCase().includes('activar_protocolo_suicidio'));
    const colApoyo = headers.findIndex(h => h && h.toString().toLowerCase().includes('apoyo emocional'));

    diagnostico += '   Creamos ID: ';
    if (colCreamosID >= 0) {
      diagnostico += '✅ Encontrada en columna [' + colCreamosID + '] "' + headers[colCreamosID] + '"\n';
    } else {
      diagnostico += '❌ NO ENCONTRADA\n';
    }

    diagnostico += '   activar_protocolo_suicidio: ';
    if (colProtocoloSuicidio >= 0) {
      diagnostico += '✅ Encontrada en columna [' + colProtocoloSuicidio + '] "' + headers[colProtocoloSuicidio] + '"\n';
    } else {
      diagnostico += '❌ NO ENCONTRADA\n';
    }

    diagnostico += '   Apoyo Emocional: ';
    if (colApoyo >= 0) {
      diagnostico += '✅ Encontrada en columna [' + colApoyo + '] "' + headers[colApoyo] + '"\n';
    } else {
      diagnostico += '❌ NO ENCONTRADA\n';
    }
    diagnostico += '\n';

    // Mostrar datos
    if (filas.length > 1) {
      diagnostico += '8️⃣ DATOS DISPONIBLES:\n';
      diagnostico += '   Total de registros (sin contar headers): ' + (filas.length - 1) + '\n\n';

      diagnostico += '   Primera fila de datos:\n';
      const primeraFila = filas[1];

      if (colCreamosID >= 0) {
        diagnostico += '   • Creamos ID: "' + (primeraFila[colCreamosID] || '(vacío)') + '"\n';
      }
      if (colProtocoloSuicidio >= 0) {
        diagnostico += '   • Protocolo Suicidio: "' + (primeraFila[colProtocoloSuicidio] || '(vacío)') + '"\n';
      }
      if (colApoyo >= 0) {
        diagnostico += '   • Apoyo Emocional: "' + (primeraFila[colApoyo] || '(vacío)') + '"\n';
      }

      diagnostico += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

      if (colCreamosID >= 0 && colProtocoloSuicidio >= 0 && colApoyo >= 0) {
        diagnostico += '✅ TODO ESTÁ CORRECTO\n\n';
        diagnostico += 'El CSV se puede descargar, parsear y\n';
        diagnostico += 'tiene todas las columnas necesarias.\n\n';
        diagnostico += 'Si la importación no funciona, revisa:\n';
        diagnostico += '• Que el trigger esté activado\n';
        diagnostico += '• Los logs en Ver → Registros\n';
      } else {
        diagnostico += '❌ FALTAN COLUMNAS NECESARIAS\n\n';
        diagnostico += 'Verifica que el formulario en KoboToolbox\n';
        diagnostico += 'tenga estos campos exactos:\n';
        diagnostico += '• Creamos ID\n';
        diagnostico += '• activar_protocolo_suicidio\n';
        diagnostico += '• ¿Te gustaría que nuestro equipo de Apoyo Emocional...?\n';
      }
    } else {
      diagnostico += '8️⃣ DATOS: ❌ Solo hay encabezados\n\n';
      diagnostico += 'El CSV no tiene datos, solo tiene la fila\n';
      diagnostico += 'de encabezados.\n\n';
      diagnostico += 'Esto significa que el formulario en KoboToolbox\n';
      diagnostico += 'no tiene ninguna respuesta todavía.\n\n';
      diagnostico += 'SOLUCIÓN:\n';
      diagnostico += '1. Llena el formulario de Bienestar en KoboToolbox\n';
      diagnostico += '2. Espera 1-2 minutos\n';
      diagnostico += '3. Vuelve a intentar importar\n';
    }

  } catch (error) {
    diagnostico += '\n❌ ERROR INESPERADO:\n';
    diagnostico += error.message + '\n\n';
    diagnostico += 'Error completo:\n' + error.toString();
    Logger.log('Stack trace: ' + error.stack);
  }

  ui.alert('🔍 Diagnóstico de Importación', diagnostico, ui.ButtonSet.OK);
  Logger.log('\n' + diagnostico);
}

/**
 * 🧹 FUNCIÓN DE LIMPIEZA Y REPARACIÓN AUTOMÁTICA
 * Corrige problemas comunes en las hojas del sistema
 */
function limpiarYRepararHojas() {
  const ui = SpreadsheetApp.getUi();

  // Confirmar que el usuario quiere hacer esto
  const confirmacion = ui.alert(
    '🧹 LIMPIAR Y REPARAR HOJAS',
    '⚠️ ADVERTENCIA: Esta función va a:\n\n' +
    '1. Limpiar valores iniciales incorrectos en "Terapias Individual"\n' +
    '2. Recrear la estructura correcta de las hojas\n\n' +
    '❗ IMPORTANTE: Los datos válidos se mantendrán.\n\n' +
    '¿Deseas continuar?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    ui.alert('❌ Cancelado', 'No se realizaron cambios.', ui.ButtonSet.OK);
    return;
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let mensajeResultado = '✅ LIMPIEZA COMPLETADA\n\n';

    // ===== PASO 1: Limpiar "Terapias Individual" =====
    ss.toast('Limpiando Terapias Individual...', 'Paso 1/1', 5);

    const terapias = ss.getSheetByName('Terapias Individual');
    if (terapias) {
      const ultimaFila = terapias.getLastRow();
      let filasConDatos = 0;
      let filasLimpiadas = 0;

      // Recorrer todas las filas (desde la 2 en adelante)
      // Terapias Individual: A=Fecha Ingreso, B=Terapeuta, C=Creamos ID, D=Participante, E=Malestar,
      //           F=Género, G=Edad, H=No.Sesión, I=Estado, J=Motivo, K=Sesiones Mes Anterior, L=Inasistencias, M=Asistencias
      for (let fila = 2; fila <= ultimaFila; fila++) {
        const participante = terapias.getRange(fila, 4).getValue(); // Columna D: Participante

        // Si NO tiene participante, es una fila vacía que debe limpiarse
        if (!participante || participante.toString().trim() === '') {
          // Limpiar columnas K (Sesiones Mes Anterior) y L (Inasistencias)
          terapias.getRange(fila, 11).clearContent(); // Columna K: Sesiones Mes Anterior
          terapias.getRange(fila, 12).clearContent(); // Columna L: Inasistencias
          filasLimpiadas++;
        } else {
          filasConDatos++;
        }
      }

      mensajeResultado += '✅ Terapias Individual: ' + filasLimpiadas + ' filas limpiadas\n';
      mensajeResultado += '   (' + filasConDatos + ' casos activos mantenidos)\n';
      Logger.log('✅ Terapias limpiado: ' + filasLimpiadas + ' filas, ' + filasConDatos + ' casos activos');
    } else {
      mensajeResultado += '⚠️ Terapias Individual: No existe\n';
    }

    // ===== FINALIZACIÓN =====
    SpreadsheetApp.flush();

    mensajeResultado += '\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '📋 SIGUIENTE PASO:\n' +
      'Verifica que todo esté correcto:\n\n' +
      '1. Terapias Individual debe tener 9 columnas (A-I)\n' +
      '2. No debe haber valores iniciales en filas vacías\n\n' +
      '¡El sistema está listo para usar!';

    ui.alert('✅ Limpieza Completada', mensajeResultado, ui.ButtonSet.OK);
    Logger.log('✅ LIMPIEZA COMPLETADA');

  } catch (error) {
    ui.alert(
      '❌ Error',
      'Error durante la limpieza:\n\n' + error.message + '\n\n' +
      'Por favor revisa los logs para más detalles.',
      ui.ButtonSet.OK
    );
    Logger.log('❌ Error en limpiarYRepararHojas: ' + error.message);
    Logger.log('Stack: ' + error.stack);
  }
}

/**
 * Migra datos históricos de una hoja antigua al nuevo "Hoja de interés".
 * Útil para traer registros previos a 2020 o de cualquier hoja con formato distinto.
 * Pregunta al usuario el nombre exacto de la hoja origen.
 */
function migrarDatosAntiguosInteres() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Pedir nombre de la hoja origen
  const resp = ui.prompt(
    '📦 Migrar Datos Históricos de Interés',
    'Escribe el nombre exacto de la hoja que contiene los datos históricos.\n\n' +
    'Ejemplo: "Formulario Interés 2019"  o  "Datos Antiguos"',
    ui.ButtonSet.OK_CANCEL
  );
  if (resp.getSelectedButton() !== ui.Button.OK) return;

  const nombreHoja = resp.getResponseText().trim();
  if (!nombreHoja) {
    ui.alert('⚠️ No ingresaste ningún nombre de hoja.');
    return;
  }

  const origen = ss.getSheetByName(nombreHoja);
  if (!origen) {
    ui.alert('❌ No se encontró ninguna hoja llamada:\n"' + nombreHoja + '"\n\nVerifica el nombre exacto (mayúsculas y espacios importan).');
    return;
  }

  // Obtener o crear hoja destino
  let destino = ss.getSheetByName('Hoja de interés');
  if (!destino) destino = crearHojaFormularioInteres();

  const datosOrigen = origen.getDataRange().getValues();
  if (datosOrigen.length <= 1) {
    ui.alert('⚠️ La hoja "' + nombreHoja + '" está vacía o solo tiene encabezados.');
    return;
  }

  const headersOrigen = datosOrigen[0];

  // Mapeo flexible de columnas usando búsqueda con fragmentos normalizados
  const iCreamosID = _buscarCol(headersOrigen, ['creamos']);
  const iNombres   = _buscarCol(headersOrigen, ['nombre']);
  const iApellidos = _buscarCol(headersOrigen, ['apellido']);
  const iGenero    = _buscarCol(headersOrigen, ['genero', 'género', 'sexo']);
  const iZona      = _buscarCol(headersOrigen, ['zona']);
  const iServicio  = _buscarCol(headersOrigen, ['servicio', 'grupo', 'interesa', 'inscribir']);
  const iFecha     = _buscarCol(headersOrigen, ['fecha']);

  Logger.log('📋 Migración desde "' + nombreHoja + '": iCreamosID=' + iCreamosID +
             ' iNombres=' + iNombres + ' iApellidos=' + iApellidos +
             ' iFecha=' + iFecha + ' iServicio=' + iServicio);

  if (iNombres < 0 && iCreamosID < 0) {
    ui.alert('❌ No se encontró columna de Nombre ni de Creamos ID en "' + nombreHoja + '".\n\n' +
             'Columnas detectadas:\n' + headersOrigen.join(', '));
    return;
  }

  // Construir conjuntos de deduplicación con datos ya existentes en el destino (estructura 13 cols)
  const existentes = destino.getLastRow() > 1
    ? destino.getRange(2, 1, destino.getLastRow() - 1, 13).getValues()
    : [];
  const creamosSet = new Set(existentes.map(r => (r[1] || '').toString().trim()).filter(Boolean)); // col B
  // Nombre completo: cols D (nombres) + E (apellidos)
  const nombresSet  = new Set(
    existentes.map(r => {
      const nom = (r[3] || '').toString().trim();
      const ape = (r[4] || '').toString().trim();
      return [nom, ape].filter(Boolean).join(' ').trim().toLowerCase();
    }).filter(Boolean)
  );

  const nuevosDatos = [];
  let omitidos = 0;

  for (let i = 1; i < datosOrigen.length; i++) {
    const f = datosOrigen[i];

    const creamosID      = iCreamosID >= 0 ? (f[iCreamosID] || '').toString().trim() : '';
    const nombres        = iNombres >= 0   ? (f[iNombres]   || '').toString().trim() : '';
    const apellidos      = iApellidos >= 0 ? (f[iApellidos] || '').toString().trim() : '';
    const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ').trim();

    // Saltar filas vacías
    if (!nombreCompleto && !creamosID) { omitidos++; continue; }

    // Deduplicar por Creamos ID o Nombre Completo
    if (creamosID && creamosSet.has(creamosID)) { omitidos++; continue; }
    if (nombreCompleto && nombresSet.has(nombreCompleto.toLowerCase())) { omitidos++; continue; }

    const fechaOrigen = iFecha >= 0 && f[iFecha] ? f[iFecha] : new Date();
    const genero      = iGenero >= 0   ? (f[iGenero]   || '').toString().trim() : '';
    const zona        = iZona >= 0     ? (f[iZona]     || '').toString().trim() : '';
    const servicio    = iServicio >= 0 ? (f[iServicio] || '').toString().trim() : 'Terapia Individual';

    // Crear fila con 13 columnas (estructura simplificada)
    nuevosDatos.push([
      fechaOrigen,   // A: Fecha
      creamosID,     // B: Creamos ID
      '',            // C: Ya Participante (vacío para datos históricos)
      nombres,       // D: Nombre(s)
      apellidos,     // E: Apellido(s)
      genero,        // F: Género
      '', '', zona, '',  // G-J: Edad, Tel, Zona, OtraZona (vacíos)
      servicio || 'Terapia Individual',  // K: Programas Interés
      '',            // L: _uuid (vacío para históricos)
      ''             // M: Enviar (usuario selecciona)
    ]);

    // Agregar a sets para no duplicar entre sí los nuevos registros
    if (creamosID) creamosSet.add(creamosID);
    if (nombreCompleto) nombresSet.add(nombreCompleto.toLowerCase());
  }

  if (nuevosDatos.length === 0) {
    ui.alert('ℹ️ No hay registros nuevos para migrar.\n\n' +
             '• Duplicados / filas vacías omitidas: ' + omitidos + '\n\n' +
             'Todos los registros de "' + nombreHoja + '" ya existen en Hoja de interés.');
    return;
  }

  // Escribir en la hoja destino a partir de la primera fila vacía (13 columnas)
  const primeraVacia = destino.getLastRow() + 1;
  destino.getRange(primeraVacia, 1, nuevosDatos.length, 13).setValues(nuevosDatos);

  // Marcar filas migradas con fondo naranja claro para identificarlas
  destino.getRange(primeraVacia, 1, nuevosDatos.length, 13).setBackground('#fff3e0');

  Logger.log('✅ Migración completada: ' + nuevosDatos.length + ' registros de "' + nombreHoja + '"');

  ui.alert(
    '✅ Migración completada',
    '• Registros migrados: ' + nuevosDatos.length + '\n' +
    '• Duplicados / vacíos omitidos: ' + omitidos + '\n\n' +
    'Los registros migrados aparecen en color naranja claro en\n' +
    '"Hoja de interés". Puedes usar la columna O (Enviar)\n' +
    'para enviar cada uno a Lista de Espera.',
    ui.ButtonSet.OK
  );
}

// =====================================================================
// AUTO-RELLENAR DATOS FALTANTES DESDE HOJA MAESTRA
// =====================================================================

/**
 * Usa "Copy of CREAMOS ID nuevo" como tabla de lookup para completar
 * datos faltantes (Nombre, Edad) en todas las hojas del sistema.
 *
 * Columnas esperadas en la hoja maestra (detectadas por encabezado):
 *   Nombre completo | Creamos ID | Año que entró Creamos | Age | Numero de DPI
 *
 * Hojas objetivo y sus columnas:
 *   Lista de Espera     → CreamosID=D(4), Nombre=C(3), Edad=F(6)
 *   Terapias Individual → CreamosID=C(3), Nombre=B(2)
 *   Retiradx            → CreamosID=D(4), Nombre=B(2)
 *   Hoja de interés     → CreamosID=B(2), Nombre(s)=D(4), Edad=H(8)
 */
function rellenarDatosFaltantes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const NOMBRE_LOOKUP = 'Copy of CREAMOS ID nuevo';

  const lookup = ss.getSheetByName(NOMBRE_LOOKUP);
  if (!lookup) {
    Logger.log('⚠️ rellenarDatosFaltantes: hoja "' + NOMBRE_LOOKUP + '" no encontrada, se omite');
    return;
  }

  // --- Leer hoja maestra ---
  const lastRowL = lookup.getLastRow();
  if (lastRowL < 2) {
    Logger.log('ℹ️ rellenarDatosFaltantes: hoja maestra vacía');
    return;
  }

  const datosLookup = lookup.getRange(1, 1, lastRowL, lookup.getLastColumn()).getValues();
  const headersL = datosLookup[0].map(h => h.toString().toLowerCase().trim());

  // Detectar columnas en la hoja maestra
  const iLNombre  = headersL.findIndex(h => h.includes('nombre'));
  const iLCreamos = headersL.findIndex(h => h.includes('creamos id') || h === 'creamos_id' || (h.includes('creamos') && !h.includes('entraste') && !h.includes('ya parti')));
  const iLEdad    = headersL.findIndex(h => h === 'age' || h.includes('edad') || h.includes('age '));
  const iLAnio    = headersL.findIndex(h => h.includes('año') || h.includes('ano') || h.includes('year'));

  Logger.log('🔍 Hoja maestra: iNombre=' + iLNombre + ' iCreamos=' + iLCreamos +
             ' iEdad=' + iLEdad + ' iAnio=' + iLAnio);

  if (iLCreamos < 0) {
    Logger.log('⚠️ rellenarDatosFaltantes: columna "Creamos ID" no encontrada en hoja maestra');
    return;
  }

  // Construir mapa: CreamosID (normalizado) → datos
  const mapaLookup = {};
  for (let i = 1; i < datosLookup.length; i++) {
    const fila = datosLookup[i];
    const cid  = (fila[iLCreamos] || '').toString().trim();
    if (!cid) continue;
    const cidNorm = cid.toLowerCase();
    mapaLookup[cidNorm] = {
      nombre : iLNombre >= 0  ? (fila[iLNombre]  || '').toString().trim() : '',
      edad   : iLEdad   >= 0  ? (fila[iLEdad]    || '').toString().trim() : '',
      anio   : iLAnio   >= 0  ? (fila[iLAnio]    || '').toString().trim() : ''
    };
  }

  const nMaestra = Object.keys(mapaLookup).length;
  Logger.log('📋 Mapa lookup: ' + nMaestra + ' registros con Creamos ID');
  if (nMaestra === 0) return;

  let totalRellenos = 0;

  // --- Definición de hojas objetivo ---
  // { nombre, colCreamosID (1-based), colNombre (1-based), colEdad (1-based, 0=no aplica) }
  // NOTA: En "Hoja de interés" (nueva estructura): B=CreamosID, D=Nombre(s), H=Edad
  const objetivos = [
    { nombre: 'Lista de Espera',     colCreamosID: 4, colNombre: 3, colEdad: 6  },
    { nombre: 'Terapias Individual', colCreamosID: 3, colNombre: 2, colEdad: 0  },
    { nombre: 'Retiradx',            colCreamosID: 4, colNombre: 2, colEdad: 0  },
    { nombre: 'Hoja de interés',     colCreamosID: 2, colNombre: 4, colEdad: 8  }  // Actualizado para nueva estructura
  ];

  objetivos.forEach(function(obj) {
    const hoja = ss.getSheetByName(obj.nombre);
    if (!hoja) return;

    const lastRow = hoja.getLastRow();
    if (lastRow < 2) return;

    // Leer columnas necesarias en una sola operación
    // Necesitamos: CreamosID, Nombre, [Edad]
    const maxCol = Math.max(obj.colCreamosID, obj.colNombre, obj.colEdad || 0);
    const datos  = hoja.getRange(2, 1, lastRow - 1, maxCol).getValues();

    let rellenos = 0;
    datos.forEach(function(fila, idx) {
      const cid = (fila[obj.colCreamosID - 1] || '').toString().trim();
      if (!cid) return;

      const entrada = mapaLookup[cid.toLowerCase()];
      if (!entrada) return;

      const filaNum = idx + 2; // fila real en la hoja (1-based, con encabezado en fila 1)

      // Rellenar Nombre si está vacío
      const nombreActual = (fila[obj.colNombre - 1] || '').toString().trim();
      if (!nombreActual && entrada.nombre) {
        hoja.getRange(filaNum, obj.colNombre).setValue(entrada.nombre);
        rellenos++;
      }

      // Rellenar Edad si aplica y está vacía
      if (obj.colEdad > 0 && entrada.edad) {
        const edadActual = (fila[obj.colEdad - 1] || '').toString().trim();
        if (!edadActual) {
          hoja.getRange(filaNum, obj.colEdad).setValue(entrada.edad);
          rellenos++;
        }
      }
    });

    if (rellenos > 0) {
      Logger.log('✅ ' + obj.nombre + ': ' + rellenos + ' campo(s) rellenado(s)');
    } else {
      Logger.log('ℹ️ ' + obj.nombre + ': sin campos faltantes que rellenar');
    }
    totalRellenos += rellenos;
  });

  Logger.log('🎉 rellenarDatosFaltantes completado: ' + totalRellenos + ' campo(s) en total');

  // Volver a ocultar la hoja maestra por si el usuario la abrió accidentalmente
  try { _ocultarHojaMaestra(); } catch(e) {}
}


// ═══════════════════════════════════════════════════════════════════════
// FUNCIONES DE VALIDACIÓN, ANÁLISIS Y UTILIDADES
// ═══════════════════════════════════════════════════════════════════════

function _contarCasosActivos(terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 2, terapias.getLastRow() - 1, 8).getValues();
  let contador = 0;

  datos.forEach(function(fila) {
    const terapeutaFila = fila[0]; // Columna B
    const estado = fila[7]; // Columna I

    if (terapeutaFila === terapeuta && estado === 'En proceso') {
      contador++;
    }
  });

  return contador;
}

function _contarCulminados(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const culminados = ss.getSheetByName('Procesos Culminados');

  if (!culminados || culminados.getLastRow() < 2) return 0;

  const datos = culminados.getRange(2, 1, culminados.getLastRow() - 1, 1).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(function(fila) {
    const fecha = fila[0];
    if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
      contador++;
    }
  });

  return contador;
}

function _contarNuevosIngresos(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 9).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(function(fila) {
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

function _contarRetirados(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const retiradx = ss.getSheetByName('Retiradx');

  if (!retiradx || retiradx.getLastRow() < 2) return 0;

  const datos = retiradx.getRange(2, 1, retiradx.getLastRow() - 1, 1).getValues();
  let contador = 0;

  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  datos.forEach(function(fila) {
    const fecha = fila[0];
    if (fecha instanceof Date && fecha >= primerDia && fecha <= ultimoDia) {
      contador++;
    }
  });

  return contador;
}

function _contarSesionesMes(terapeuta, mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias || terapias.getLastRow() < 2) return 0;

  const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();
  let contador = 0;

  datos.forEach(function(fila) {
    const terapeutaFila = fila[1]; // Columna B
    const estado = fila[8]; // Columna I
    const asistencias = fila[12] || 0; // Columna M

    if (terapeutaFila === terapeuta && estado === 'En proceso') {
      contador += Number(asistencias);
    }
  });

  return contador;
}

function _generarReporteDetalladoMes(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!terapias) {
    ss.toast('❌ No se encontró la hoja "Terapias Individual"', 'Error', 3);
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
    datos.forEach(function(fila, idx) {
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
      nuevosIngresos.forEach(function(caso) {
        resultado += '   • Fila ' + caso.fila + ': ' + caso.fecha + ' - ' + caso.participante + ' (' + caso.terapeuta + ')\n';
      });
      resultado += '\n   TOTAL: ' + nuevosIngresos.length + ' nuevos ingresos\n\n';
    }

    // Sesiones por terapeuta
    resultado += '2️⃣ SESIONES DEL MES POR TERAPEUTA\n';
    resultado += '─────────────────────────────────\n';

    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    let totalSesiones = 0;

    terapeutas.forEach(function(terapeuta) {
      let sesiones = 0;
      let casosActivos = [];

      datos.forEach(function(fila, idx) {
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

      resultado += '\n   ' + terapeuta + ': ' + sesiones + ' sesiones\n';
      if (casosActivos.length > 0) {
        casosActivos.forEach(function(caso) {
          resultado += '      • Fila ' + caso.fila + ': ' + caso.participante + ' (' + caso.asistencias + ' asistencias)\n';
        });
      }

      totalSesiones += sesiones;
    });

    resultado += '\n   TOTAL: ' + totalSesiones + ' sesiones en el mes\n\n';
  }

  // Culminados y Retirados
  resultado += '3️⃣ PROCESOS FINALIZADOS\n';
  resultado += '─────────────────────────────────\n';

  const culminados = _contarCulminados(mes, anio);
  const retirados = _contarRetirados(mes, anio);

  resultado += '   • Procesos Culminados: ' + culminados + '\n';
  resultado += '   • Retirados/Deserciones: ' + retirados + '\n';
  resultado += '   • Total Finalizados: ' + (culminados + retirados) + '\n\n';

  // Mostrar en hoja
  _mostrarResultadoEnHoja(resultado, 'Reporte Detallado ' + nombreMes);

  ss.toast('✅ Reporte detallado generado. Revisa la nueva hoja.', 'Reporte', 5);
}

function _mostrarResultadoEnHoja(texto, nombreHoja) {
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
  const datos = lineas.map(function(linea) { return [linea]; });

  hoja.getRange(1, 1, datos.length, 1).setValues(datos);

  // Formato
  hoja.setColumnWidth(1, 800);
  hoja.getRange('A:A').setFontFamily('Courier New').setFontSize(10);

  // Activar hoja
  ss.setActiveSheet(hoja);
}

function _validarMesConHistorico(mes, anio) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mensuales = ss.getSheetByName('Reportes Mensuales');

  if (!mensuales) {
    ss.toast('❌ No se encontró la hoja "Reportes Mensuales"', 'Error', 3);
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
    resultado += '   Menú → 🏥 Apoyo Emocional → 💾 Guardar Reporte Mensual\n';
  } else {
    const fila = datos[filaEncontrada];

    resultado += '✅ MES ENCONTRADO EN REPORTES MENSUALES (fila ' + (filaEncontrada + 1) + ')\n\n';

    // Comparar con datos reales
    const nuevosIngresosHistorico = fila[2]; // Columna C
    const nuevosIngresosReal = _contarNuevosIngresos(mes, anio);

    resultado += 'COMPARACIÓN CON DATOS REALES:\n';
    resultado += '─────────────────────────────────\n';
    resultado += 'Nuevos Ingresos (Mes):\n';
    resultado += '   • Histórico: ' + nuevosIngresosHistorico + '\n';
    resultado += '   • Real: ' + nuevosIngresosReal + '\n';
    resultado += '   • Coincide: ' + (nuevosIngresosHistorico === nuevosIngresosReal ? '✅' : '❌') + '\n\n';

    if (nuevosIngresosHistorico !== nuevosIngresosReal) {
      resultado += '⚠️ DISCREPANCIA DETECTADA\n\n';
      resultado += 'Posibles causas:\n';
      resultado += '   1. Se agregaron/eliminaron casos después de guardar el reporte\n';
      resultado += '   2. Las fechas de ingreso fueron modificadas\n';
      resultado += '   3. El reporte se guardó antes de completar todo el mes\n\n';
    }
  }

  _mostrarResultadoEnHoja(resultado, 'Validación ' + nombreMes);
  ss.toast('✅ Validación completada', 'Validación', 3);
}

function analizarReporteActual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const reporte = ss.getSheetByName('Reporte');
    if (!reporte) {
      ss.toast('❌ No se encontró la hoja "Reporte"', 'Error', 3);
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
    const nuevosIngresosReporte = reporte.getRange('C5').getValue() || 0;
    const nuevosIngresosReal = _contarNuevosIngresos(mesActual, anioActual);
    resultado += '   • Según Reporte: ' + nuevosIngresosReporte + '\n';
    resultado += '   • Conteo Real: ' + nuevosIngresosReal + '\n';
    resultado += '   • Coincide: ' + (nuevosIngresosReporte === nuevosIngresosReal ? '✅ SÍ' : '❌ NO') + '\n\n';

    // 2. SESIONES POR TERAPEUTA
    resultado += '2️⃣ SESIONES DEL MES POR TERAPEUTA\n';
    resultado += '─────────────────────────────────\n';
    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    const filas = [17, 18, 19, 20];

    let totalSesionesReporte = 0;
    let totalSesionesReal = 0;

    terapeutas.forEach(function(terapeuta, idx) {
      const sesionesReporte = reporte.getRange('C' + filas[idx]).getValue() || 0;
      const sesionesReal = _contarSesionesMes(terapeuta, mesActual, anioActual);
      totalSesionesReporte += sesionesReporte;
      totalSesionesReal += sesionesReal;

      resultado += '   ' + terapeuta + ':\n';
      resultado += '      • Según Reporte: ' + sesionesReporte + ' sesiones\n';
      resultado += '      • Conteo Real (Asistencias): ' + sesionesReal + ' sesiones\n';
      resultado += '      • Coincide: ' + (sesionesReporte === sesionesReal ? '✅' : '❌') + '\n';
    });

    resultado += '\n   TOTAL:\n';
    resultado += '      • Según Reporte: ' + totalSesionesReporte + ' sesiones\n';
    resultado += '      • Conteo Real: ' + totalSesionesReal + ' sesiones\n';
    resultado += '      • Coincide: ' + (totalSesionesReporte === totalSesionesReal ? '✅ SÍ' : '❌ NO') + '\n\n';

    // 3. CASOS ACTIVOS
    resultado += '3️⃣ CASOS ACTIVOS\n';
    resultado += '─────────────────────────────────\n';
    terapeutas.forEach(function(terapeuta, idx) {
      const activosReporte = reporte.getRange('B' + filas[idx]).getValue() || 0;
      const activosReal = _contarCasosActivos(terapeuta);

      resultado += '   ' + terapeuta + ': ' + activosReporte + ' (Reporte) vs ' + activosReal + ' (Real) ' + (activosReporte === activosReal ? '✅' : '❌') + '\n';
    });

    // 4. PROCESOS CULMINADOS
    resultado += '\n4️⃣ PROCESOS CULMINADOS (Este mes)\n';
    resultado += '─────────────────────────────────\n';
    const culminadosReporte = reporte.getRange('C24').getValue() || 0;
    const culminadosReal = _contarCulminados(mesActual, anioActual);
    resultado += '   • Según Reporte: ' + culminadosReporte + '\n';
    resultado += '   • Conteo Real: ' + culminadosReal + '\n';
    resultado += '   • Coincide: ' + (culminadosReporte === culminadosReal ? '✅ SÍ' : '❌ NO') + '\n\n';

    // 5. RETIRADOS/DESERCIONES
    resultado += '5️⃣ RETIRADOS/DESERCIONES (Este mes)\n';
    resultado += '─────────────────────────────────\n';
    const retiradosReporte = reporte.getRange('C27').getValue() || 0;
    const retiradosReal = _contarRetirados(mesActual, anioActual);
    resultado += '   • Según Reporte: ' + retiradosReporte + '\n';
    resultado += '   • Conteo Real: ' + retiradosReal + '\n';
    resultado += '   • Coincide: ' + (retiradosReporte === retiradosReal ? '✅ SÍ' : '❌ NO') + '\n\n';

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
      discrepancias.forEach(function(d) { resultado += '   • ' + d + '\n'; });
      resultado += '\n🔧 POSIBLES CAUSAS:\n';
      resultado += '   1. Las fórmulas del reporte no están actualizadas\n';
      resultado += '   2. Los datos fueron modificados manualmente\n';
      resultado += '   3. Hay filas vacías o con formato incorrecto\n';
      resultado += '   4. Las fechas no están en formato correcto\n';
      resultado += '\n💡 SOLUCIÓN:\n';
      resultado += '   Usa el menú "Avanzado" → "🔧 Reparar Fórmulas Reporte"\n';
    }

    // Mostrar resultado
    _mostrarResultadoEnHoja(resultado, 'Análisis Reporte ' + nombreMes);

    ss.toast('✅ Análisis completado. Revisa la hoja "Análisis Reporte"', 'Análisis', 5);

  } catch (error) {
    ss.toast('❌ Error: ' + error.toString(), 'Error', 5);
    Logger.log('❌ Error en análisis: ' + error.toString());
  }
}

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

  _generarReporteDetalladoMes(mes, anio);
}

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
    // 5. CASOS ACTIVOS, SESIONES E INASISTENCIAS POR TERAPEUTA
    // ═══════════════════════════════════════════════════════════
    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    const datosTerapeutas = {};

    terapeutas.forEach(terapeuta => {
      datosTerapeutas[terapeuta] = {
        activos: 0,
        sesiones: 0,
        inasistencias: 0
      };
    });

    if (terapias && terapias.getLastRow() > 1) {
      const datos = terapias.getRange(2, 1, terapias.getLastRow() - 1, 13).getValues();

      datos.forEach(fila => {
        const terapeuta = fila[1]; // Columna B
        const participante = fila[3]; // Columna D
        const numSesion = fila[7] || 0; // Columna H: No. Sesión
        const estado = fila[8]; // Columna I: Estado
        const inasistencias = fila[11] || 0; // Columna L: Inasistencias

        if (participante && participante.toString().trim() !== '' && estado === 'En proceso') {
          if (terapeutas.includes(terapeuta)) {
            datosTerapeutas[terapeuta].activos++;
            datosTerapeutas[terapeuta].sesiones += Number(numSesion);
            datosTerapeutas[terapeuta].inasistencias += Number(inasistencias);
          }
        }
      });
    }

    const totalActivos = Object.values(datosTerapeutas).reduce((sum, t) => sum + t.activos, 0);
    const totalSesiones = Object.values(datosTerapeutas).reduce((sum, t) => sum + t.sesiones, 0);
    const totalInasistencias = Object.values(datosTerapeutas).reduce((sum, t) => sum + t.inasistencias, 0);

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
      // CASOS ACTIVOS POR TERAPEUTA (con inasistencias)
      datosTerapeutas['Gerber'].activos, datosTerapeutas['Gerber'].sesiones, datosTerapeutas['Gerber'].inasistencias,
      datosTerapeutas['Melissa'].activos, datosTerapeutas['Melissa'].sesiones, datosTerapeutas['Melissa'].inasistencias,
      datosTerapeutas['Diana'].activos, datosTerapeutas['Diana'].sesiones, datosTerapeutas['Diana'].inasistencias,
      datosTerapeutas['Karina'].activos, datosTerapeutas['Karina'].sesiones, datosTerapeutas['Karina'].inasistencias,
      totalActivos, totalSesiones, totalInasistencias,
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
      '   • Gerber: ' + datosTerapeutas['Gerber'].activos + ' casos, ' + datosTerapeutas['Gerber'].sesiones + ' sesiones, ' + datosTerapeutas['Gerber'].inasistencias + ' inasistencias\n' +
      '   • Melissa: ' + datosTerapeutas['Melissa'].activos + ' casos, ' + datosTerapeutas['Melissa'].sesiones + ' sesiones, ' + datosTerapeutas['Melissa'].inasistencias + ' inasistencias\n' +
      '   • Diana: ' + datosTerapeutas['Diana'].activos + ' casos, ' + datosTerapeutas['Diana'].sesiones + ' sesiones, ' + datosTerapeutas['Diana'].inasistencias + ' inasistencias\n' +
      '   • Karina: ' + datosTerapeutas['Karina'].activos + ' casos, ' + datosTerapeutas['Karina'].sesiones + ' sesiones, ' + datosTerapeutas['Karina'].inasistencias + ' inasistencias\n' +
      '   • TOTAL: ' + totalActivos + ' casos, ' + totalSesiones + ' sesiones, ' + totalInasistencias + ' inasistencias\n\n' +
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
      '• Total Sesiones: ' + totalSesiones + '\n' +
      '• Total Inasistencias: ' + totalInasistencias + '\n\n' +
      'Ve a "Reportes Mensuales" para ver todos los detalles.'
    );

    ss.toast('✅ Reporte de marzo 2026 generado exitosamente', 'Completado', 5);

  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    ui.alert('❌ Error', 'Error generando reporte: ' + error.toString(), ui.ButtonSet.OK);
  }
}

function limpiarAsistenciasEInasistencias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Confirmar con el usuario
    const respuesta = ui.alert(
      '⚠️ Limpiar Asistencias e Inasistencias',
      '¿Estás seguro de que quieres resetear a 0 las columnas de Asistencias (M) e Inasistencias (L) en Terapias Individual?\n\n' +
      'Esta acción es necesaria después de guardar el reporte mensual para empezar el nuevo mes limpio.\n\n' +
      '⚠️ Esta acción NO se puede deshacer.',
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ss.toast('❌ Operación cancelada', 'Limpieza', 3);
      return;
    }

    ss.toast('🔄 Limpiando asistencias e inasistencias...', 'Limpieza', 2);

    const terapias = ss.getSheetByName('Terapias Individual');
    if (!terapias) {
      throw new Error('No se encontró la hoja "Terapias Individual"');
    }

    const ultimaFila = terapias.getLastRow();
    if (ultimaFila < 2) {
      ss.toast('⚠️ No hay datos para limpiar', 'Limpieza', 3);
      return;
    }

    let contador = 0;

    // Asegurar que existe el header de columna N (Inasistencias Mes Anterior)
    const headerN = terapias.getRange(1, 14).getValue();
    if (!headerN || headerN.toString().trim() === '') {
      terapias.getRange(1, 14).setValue('Inasistencias Mes Anterior');
      terapias.getRange(1, 14)
        .setBackground('#2e7d32').setFontColor('white')
        .setFontWeight('bold').setHorizontalAlignment('center');
      terapias.setColumnWidth(14, 120);
    }

    // Recorrer cada fila: archivar L→N y resetear L y M a 0
    for (let fila = 2; fila <= ultimaFila; fila++) {
      const participante  = terapias.getRange(fila, 4).getValue();  // D: Participante
      const inasistencias = terapias.getRange(fila, 12).getValue(); // L: Inasistencias

      if (participante && participante.toString().trim() !== '') {
        // Acumular inasistencias del mes en columna N antes de resetear
        const prevN = terapias.getRange(fila, 14).getValue() || 0;
        terapias.getRange(fila, 14).setValue(prevN + (inasistencias || 0)); // N: acumulado
        // Resetear mes actual
        terapias.getRange(fila, 12).setValue(0); // L: Inasistencias → 0
        terapias.getRange(fila, 13).setValue(0); // M: Asistencias → 0
        contador++;
      }
    }

    // Actualizar reportes
    actualizarReportes();

    ss.toast(
      '✅ LIMPIEZA COMPLETA\n\n' +
      '✓ ' + contador + ' participantes limpiados\n' +
      '✓ Inasistencias archivadas en columna N\n' +
      '✓ Asistencias (M) reseteadas a 0\n' +
      '✓ Inasistencias (L) reseteadas a 0\n' +
      '✓ Reportes actualizados',
      'Limpieza',
      5
    );

    Logger.log('✅ Limpieza completa: ' + contador + ' participantes');

  } catch (error) {
    Logger.log('❌ Error en limpieza: ' + error.toString());
    ss.toast('❌ Error: ' + error.toString(), 'Error', 5);
    throw error;
  }
}

function recrearReporte() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Confirmar con el usuario
    const respuesta = ui.alert(
      '🔄 Recrear Hoja Reporte',
      '¿Deseas recrear la hoja "Reporte" con la nueva columna de Inasistencias?\n\n' +
      'Esto:\n' +
      '✅ Eliminará la hoja "Reporte" actual\n' +
      '✅ Creará una nueva con 5 columnas\n' +
      '✅ Incluirá la columna "Inasistencias"\n' +
      '✅ Actualizará todas las fórmulas\n\n' +
      'Las demás hojas NO se tocarán.',
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ui.alert('❌ Cancelado', 'No se realizaron cambios.', ui.ButtonSet.OK);
      return;
    }

    // Eliminar hoja Reporte si existe
    const reporteViejo = ss.getSheetByName('Reporte');
    if (reporteViejo) {
      ss.deleteSheet(reporteViejo);
      Logger.log('🗑️ Hoja Reporte antigua eliminada');
    }

    // Crear nueva hoja Reporte
    ss.toast('Creando nueva hoja Reporte...', 'Paso 1/2', 3);
    crearReporte();
    Logger.log('✅ Hoja Reporte recreada con 5 columnas');

    // Actualizar fórmulas
    ss.toast('Actualizando fórmulas...', 'Paso 2/2', 3);
    Utilities.sleep(1000);
    actualizarFormulasReporte();
    Logger.log('✅ Fórmulas actualizadas');

    // Actualizar reportes
    actualizarReportes();

    ui.alert(
      '✅ REPORTE RECREADO EXITOSAMENTE',
      'La hoja "Reporte" ahora tiene:\n\n' +
      '✅ 5 columnas (A, B, C, D, E)\n' +
      '✅ Columna D: Inasistencias\n' +
      '✅ Todas las fórmulas actualizadas\n' +
      '✅ Datos recalculados\n\n' +
      'Ve a la hoja "Reporte" para verificar.',
      ui.ButtonSet.OK
    );

    Logger.log('🎉 Proceso completado exitosamente');

  } catch (error) {
    ui.alert('❌ ERROR', 'Error: ' + error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error recreando reporte: ' + error.message);
  }
}

function resetearSesionesMesAnterior() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    // Confirmar con el usuario
    const respuesta = ui.alert(
      '🔄 Resetear Sesiones Mes Anterior',
      '¿Deseas resetear la columna "Sesiones Mes Anterior" a 0?\n\n' +
      'Esto:\n' +
      '✅ Pondrá todos los valores de "Sesiones Mes Anterior" en 0\n' +
      '✅ Te permitirá empezar el conteo de nuevo\n' +
      '✅ NO afectará las columnas de Asistencias e Inasistencias\n\n' +
      '¿Continuar?',
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ui.alert('❌ Cancelado', 'No se realizaron cambios.', ui.ButtonSet.OK);
      return;
    }

    // Obtener la hoja Terapias Individual
    const terapias = ss.getSheetByName('Terapias Individual');
    if (!terapias) {
      ui.alert('❌ Error', 'No se encontró la hoja "Terapias Individual"', ui.ButtonSet.OK);
      return;
    }

    const ultimaFila = terapias.getLastRow();
    if (ultimaFila <= 1) {
      ui.alert('⚠️ Sin datos', 'No hay registros para actualizar.', ui.ButtonSet.OK);
      return;
    }

    ss.toast('Reseteando Sesiones Mes Anterior...', '⏳ Procesando', -1);

    let registrosActualizados = 0;

    // Recorrer todas las filas desde la 2 en adelante
    for (let fila = 2; fila <= ultimaFila; fila++) {
      const participante = terapias.getRange(fila, 4).getValue(); // Columna D: Participante

      // Solo actualizar si hay un participante (fila con datos)
      if (participante && participante.toString().trim() !== '') {
        // Resetear la columna K (Sesiones Mes Anterior) a 0
        terapias.getRange(fila, 11).setValue(0);
        registrosActualizados++;
      }
    }

    ss.toast(
      `✅ Se resetearon ${registrosActualizados} registros exitosamente`,
      'Completado',
      5
    );

    ui.alert(
      '✅ Reseteo Completado',
      `Se actualizaron ${registrosActualizados} registros.\n\n` +
      'La columna "Sesiones Mes Anterior" ahora tiene valor 0 en todos los registros.\n\n' +
      'Ahora puedes empezar el conteo de nuevo basado en las asistencias reales.',
      ui.ButtonSet.OK
    );

    Logger.log(`✅ Sesiones Mes Anterior reseteadas: ${registrosActualizados} registros`);

  } catch (error) {
    Logger.log('❌ Error al resetear Sesiones Mes Anterior: ' + error.toString());
    ui.alert(
      '❌ Error',
      'Ocurrió un error al resetear las sesiones:\n\n' + error.toString(),
      ui.ButtonSet.OK
    );
  }
}

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

  _validarMesConHistorico(mes, anio);
}

/**
 * Diagnóstico completo de la hoja Reporte: verifica formulas, datos y propone soluciones
 */
function diagnosticoCompleto() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const reporte = ss.getSheetByName('Reporte');
  const terapias = ss.getSheetByName('Terapias Individual');

  if (!reporte || !terapias) {
    ui.alert('❌ Error: No se encontraron las hojas Reporte o Terapias Individual');
    return;
  }

  let diagnostico = '📊 DIAGNÓSTICO COMPLETO DEL REPORTE\n';
  diagnostico += '═════════════════════════════════════════════════\n\n';

  // 1. Verificar fórmulas críticas
  diagnostico += '1️⃣ ESTADO DE FORMULAS CRÍTICAS\n';
  diagnostico += '─────────────────────────────────\n';

  const formulasAChecar = {
    'C17 (Sesiones Gerber)': reporte.getRange('C17').getFormula(),
    'C18 (Sesiones Melissa)': reporte.getRange('C18').getFormula(),
    'C19 (Sesiones Diana)': reporte.getRange('C19').getFormula(),
    'C20 (Sesiones Karina)': reporte.getRange('C20').getFormula(),
    'B17 (Activos Gerber)': reporte.getRange('B17').getFormula(),
  };

  let formulasOK = true;
  for (let celda in formulasAChecar) {
    const formula = formulasAChecar[celda];
    const tieneError = formula.includes('"En proceso"') && formula.includes('M2:M500');
    if (tieneError) {
      diagnostico += '❌ ' + celda + ' aún tiene filtro "En proceso" INCORRECTO\n';
      formulasOK = false;
    } else if (!formula.includes('SUMPRODUCT') && !formula.includes('COUNTIF')) {
      diagnostico += '⚠️  ' + celda + ' - Fórmula inusual\n';
    } else {
      diagnostico += '✅ ' + celda + ' - Correcta\n';
    }
  }

  diagnostico += '\n';

  // 2. Verificar datos en Terapias Individual
  diagnostico += '2️⃣ DATOS EN TERAPIAS INDIVIDUAL\n';
  diagnostico += '─────────────────────────────────\n';

  if (terapias.getLastRow() < 2) {
    diagnostico += '⚠️  No hay datos en Terapias Individual\n\n';
  } else {
    const datosRange = terapias.getRange(2, 1, Math.min(terapias.getLastRow() - 1, 10), 13).getValues();
    diagnostico += '   Total de filas: ' + (terapias.getLastRow() - 1) + '\n';
    diagnostico += '   Últimas 10 filas:\n';
    datosRange.forEach((fila, idx) => {
      const participante = fila[3] || 'SIN NOMBRE';
      const terapeuta = fila[1] || 'SIN TERAPEUTA';
      const estado = fila[8] || 'SIN ESTADO';
      const asistencias = fila[12] || 0;
      diagnostico += `      Fila ${idx + 2}: ${participante} | ${terapeuta} | ${estado} | Asistencias: ${asistencias}\n`;
    });
  }

  diagnostico += '\n';

  // 3. Verificar valores en Reporte
  diagnostico += '3️⃣ VALORES ACTUALES EN REPORTE (Mes actual)\n';
  diagnostico += '─────────────────────────────────\n';

  const valoresReporte = {
    'Nuevos Ingresos (Total)': reporte.getRange('B5').getValue(),
    'Nuevos Ingresos (Mes)': reporte.getRange('C5').getValue(),
    'Activos Gerber': reporte.getRange('B17').getValue(),
    'Sesiones Gerber': reporte.getRange('C17').getValue(),
    'Sesiones Melissa': reporte.getRange('C18').getValue(),
    'Sesiones Diana': reporte.getRange('C19').getValue(),
    'Sesiones Karina': reporte.getRange('C20').getValue(),
    'Total Activos': reporte.getRange('B21').getValue(),
    'Total Sesiones': reporte.getRange('C21').getValue(),
  };

  for (let metrica in valoresReporte) {
    diagnostico += '   • ' + metrica + ': ' + valoresReporte[metrica] + '\n';
  }

  diagnostico += '\n';

  // 4. Recomendaciones
  diagnostico += '4️⃣ RECOMENDACIONES\n';
  diagnostico += '─────────────────────────────────\n';

  if (!formulasOK) {
    diagnostico += '🔧 EJECUTAR: Menú → Mantenimiento → Reparación Completa\n';
    diagnostico += '   Esto corregirá las fórmulas desactualizadas\n\n';
  } else {
    diagnostico += '✅ Las fórmulas están correctas\n';
  }

  diagnostico += '\n5️⃣ EXPLICACIÓN: Cómo funciona el Reporte\n';
  diagnostico += '─────────────────────────────────\n';
  diagnostico += '• La hoja "Reporte" tiene FÓRMULAS que se actualizan cada segundo\n';
  diagnostico += '• Toma datos de "Terapias Individual" (columnas L, M) y otras hojas\n';
  diagnostico += '• Cuando guardas un reporte mensual:\n';
  diagnostico += '  1. Los datos se guardan en "Reportes Mensuales" (historial)\n';
  diagnostico += '  2. Luego se resetan L, M en "Terapias Individual" a 0\n';
  diagnostico += '  3. El Reporte automáticamente muestra 0 para el nuevo mes\n';
  diagnostico += '• NO necesitas hacer nada más - es automático\n';

  Logger.log(diagnostico);
  ui.alert(diagnostico);
}


