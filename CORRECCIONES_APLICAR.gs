/**
 * =====================================================================
 * SISTEMA DE APOYO EMOCIONAL - ÁREA SOCIOEDUCATIVA Y ESCUELA PARA PADRES
 * =====================================================================
 */

// =====================================================================
// CONFIGURACIÓN GLOBAL
// =====================================================================

const CONFIG_AE = {
  // URLs de KoboToolbox (2025 Histórico y 2026 Actual)
  KOBO_URL_2025: 'https://kf.kobotoolbox.org/api/v2/assets/akz5K2bGfvvisQaE7VaHev/export-settings/esvntaAqU9GDq9aAkoKjPpY/data.csv',
  KOBO_URL_2026: 'https://kf.kobotoolbox.org/api/v2/assets/auvEELWQEgiwF54W4pGpV5/export-settings/esd2gxqN87HPuQDypxFqUNi/data.csv', 
  
  KOBO_URL: 'https://kf.kobotoolbox.org/api/v2/assets/afuD8C8AzoLfd4o5ksTWUw/export-settings/es52swrnjWcz8NnhY5Wyng3/data.csv',
  KOBO_URL_INSTITUCIONAL: 'https://kf.kobotoolbox.org/api/v2/assets/aPAe8WZjdW8Pp3bxLVkPtc/export-settings/esxMhVxGG8yjgoaFV9FxKjA/data.csv',

  // Diseño Estético Moderno (Premium)
  COLORES: {
    PRIMARIO: '#312E81',     // Indigo 900 (Fondo Header)
    SECUNDARIO: '#059669',   // Emerald 600 (Éxito)
    ACCENTO: '#991B1B',      // Red 800 (Alerta)
    FONDO_SOFT: '#F3F4F6',   // Gray 100
    TEXTO_HEADER: '#FFFFFF', // Blanco
    INDI_TEXT: '#1E1B4B'     // Indigo Text
  },

  // Zonas
  ZONAS: [
    'Zona 1', 'Zona 2', 'Zona 3', 'Zona 4', 'Zona 5', 'Zona 6', 'Zona 7', 'Zona 8', 'Zona 9', 'Zona 10',
    'Zona 11', 'Zona 12', 'Zona 13', 'Zona 14', 'Zona 15', 'Zona 16', 'Zona 17', 'Zona 18', 'Zona 19', 'Zona 21',
    'Zona 24', 'Zona 25', 'Mixco', 'Villa Nueva', 'San Miguel Petapa', 'Villa Canales', 'Santa Catarina Pinula', 'San José Pinula', 'Otro'
  ],

  GENEROS: ['Femenino', 'Masculino', 'Otro']
};

/**
 * Puente de seguridad para mostrar alertas solo si hay interfaz de usuario.
 * Evita errores en ejecuciones automáticas (Triggers).
 */
function alertSafeAE(titulo, mensaje) {
  try {
    const ui = SpreadsheetApp.getUi();
    if (ui) ui.alert(titulo, mensaje, ui.ButtonSet.OK);
  } catch (e) {
    Logger.log('Alert bloqueada (Ejecución en segundo plano): ' + titulo + ' - ' + mensaje);
  }
}

/**
 * Puente de seguridad para mostrar toasts solo si hay interfaz de usuario.
 */
function toastSafeAE(mensaje, titulo, segundos) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) ss.toast(mensaje, titulo || 'Sistema', segundos || 5);
  } catch (e) {
    Logger.log('Toast bloqueado: ' + mensaje);
  }
}

// =====================================================================
// MENÚ PRINCIPAL
// =====================================================================

function onOpen() {
  let ui;
  try {
    ui = SpreadsheetApp.getUi();
  } catch (e) {
    Logger.log('No hay interfaz disponible: ' + e.message);
    return;
  }
  if (!ui) return;
  ui.createMenu('💜 Apoyo Emocional')
    .addItem('🚀 Instalar Sistema', 'instalarSistemaAE')
    .addSeparator()
    .addSubMenu(ui.createMenu('👥 Gestión de Grupos')
      .addItem('🆕 Crear Nuevo Grupo', 'crearNuevoGrupoAE')
      .addItem('📊 Ver Resumen de Grupos', 'verResumenGruposAE')
      .addItem('� Registrar Nota Masiva (Sesión)', 'mostrarDialogoNotaMasivaAE')
      .addItem('�🔒 Cerrar/Finalizar Grupo', 'mostrarDialogoCerrarGrupoAE')
      .addItem('🗑️ Eliminar Grupo/Cohorte', 'mostrarDialogoEliminarGrupoAE'))
    .addSubMenu(ui.createMenu('📥 Importación Kobo')
      .addItem('🔄 Sincronizar Referencias (B2)', 'ejecutarImportacionAutomaticaAE')
      .addItem('🔄 Sincronizar Derivaciones Institucionales (B5)', 'sincronizarHojaInstitucionalAE')
      .addItem('🔄 Sincronizar Hoja de Interés (B4)', 'sincronizarHojaInteresAE')
      .addItem('📜 Importar Históricos 2025 (B3)', 'importarHistorico25AE')
      .addSeparator()
      .addItem('🧹 Limpiar Duplicados (Todas las Hojas)', 'eliminarDuplicadosManualAE')
      .addItem('🚀 Rescatar Datos Mal Ubicados', 'rescatarDatosInteresAE')
      .addItem('⚡ Sincronizar TODO', 'importarTodoAE')
      .addItem('⚙️ Configurar URL Kobo', 'configurarKoboURLAE')
      .addSeparator()
      .addItem('⏱️ Configurar Auto-Actualización (1 min)', 'gestionarActivadoresAEToggle'))
    .addSubMenu(ui.createMenu('🛠️ Herramientas')
      .addItem('🔍 Buscar ID (Fantasma)', 'buscarIDFantasmaAE')
      .addItem('🪄 Auto-completar Datos', 'autoCompletarDatosAE')
      .addItem('📈 Actualizar Reportes', 'actualizarReportesAE')
      .addItem('🛠️ Reparar Resumen de Grupos', 'repararResumenGruposAE')
      .addItem('🩺 Probar Conexión Kobo (DEBUG)', 'diagnosticoKoboAE')
      .addItem('🧹 Limpiar Memoria Técnica', 'limpiarPropiedadesSistemaAE'))
    .addToUi();
}

// =====================================================================
// INSTALACIÓN DEL SISTEMA
// =====================================================================

function instalarSistemaAE() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const resCopia = ui.alert('💾 Copia de Seguridad', '¿Deseas guardar una COPIA DE RESPALDO de todo este archivo en tu Google Drive antes de limpiarlo?', ui.ButtonSet.YES_NO);
  if (resCopia == ui.Button.YES) {
    const copy = ss.copy(ss.getName() + ' - Backup ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'));
    toastSafeAE('Copia guardada en tu Drive.', 'Backup');
  }

  const res = ui.alert('🚀 Reinicio TOTAL del Sistema', 'Esta acción ELIMINARÁ ABSOLUTAMENTE TODAS LAS HOJAS (incluyendo ocultas) y recreará el sistema desde cero. ¿Deseas continuar?', ui.ButtonSet.YES_NO);
  if (res != ui.Button.YES) return;

  try {
    toastSafeAE('🧹 Iniciando limpieza radical...', 'Instalación');

    // 1. Asegurar una hoja temporal "maestra" para el proceso
    let temp = ss.getSheetByName('TEMPORAL_LIMPIEZA');
    if (!temp) temp = ss.insertSheet('TEMPORAL_LIMPIEZA');
    
    // 2. Eliminar TODAS las hojas existentes sin excepción (menos la temporal)
    ss.getSheets().forEach(sheet => {
      const name = sheet.getName();
      if (name !== 'TEMPORAL_LIMPIEZA') {
        try {
          sheet.showSheet(); 
          ss.deleteSheet(sheet);
        } catch (e) {
          Logger.log('No se pudo borrar: ' + name);
        }
      }
    });

    // 3. Re-inicializar estructura base
    crearHojasBaseAE(); 
    inicializarHojaConfiguracionAE();
    SpreadsheetApp.flush(); // Asegurar que Google Sheets registre las nuevas hojas
    
    // 4. Configurar Validaciones y Formatos
    configurarValidacionesAE();
    aplicarFormatosAE();
    
    // 5. Reporte final
    actualizarReportesAE();
    
    // Borrar la hoja temporal
    try { ss.deleteSheet(temp); } catch(e) {}
    
    alertSafeAE('✨ Instalación Exitosa', 'El sistema se ha purificado y reiniciado por completo.\n\nPor favor, configura tus enlaces en la hoja "⚙️ CONFIGURACIÓN" e importa los datos nuevamente.');
  } catch (e) {
    Logger.log('Error en Instalación: ' + e.stack);
    alertSafeAE('❌ Error Crítico', 'Hubo un problema al reiniciar. Detalle: ' + e.message);
  }
}

function crearHojasBaseAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const prepararHoja = (nombre) => {
    let hoja = ss.getSheetByName(nombre);
    if (!hoja) hoja = ss.insertSheet(nombre);
    return hoja;
  };

  const aplicarEstiloHeader = (range, color) => {
    range.setBackground(color || CONFIG_AE.COLORES.PRIMARIO)
         .setFontColor('white')
         .setFontWeight('bold')
         .setHorizontalAlignment('center')
         .setVerticalAlignment('middle');
  };

  // 1. Referencias y Hoja de Interés (Diferenciadas)
  const headersInteres = ['Fecha Import', 'Creamos ID', 'Nombre Completo', 'Género', 'Edad', 'Teléfono', 'DPI', 'Zona', 'Servicios de Interés', 'Notas Originales', 'Acción'];
  const notasInteres = {
    'Fecha Import': '🗓️ Fecha en que se sincronizaron los datos desde KoboToolbox.',
    'Creamos ID': '🔑 ID único del participante. Si no existe, se usa una firma por nombre y teléfono.',
    'Nombre Completo': '👤 Nombres y apellidos completos extraídos del formulario.',
    'Género': '⚧️ Género o pronombres seleccionados.',
    'Edad': '🎂 Edad en número entero. Calculada automáticamente.',
    'Teléfono': '📞 Número de teléfono de contacto (solo dígitos).',
    'DPI': '🪪 Identificación (DPI).',
    'Zona': '📍 Ubicación, zona o colonia.',
    'Servicios de Interés': '📋 Qué grupos de apoyo específico solicitó esta persona.',
    'Notas Originales': '📝 Observaciones extra del formulario.',
    'Acción': '⚡ Seleccione un grupo de esta lista para enviar a la persona automáticamente.'
  };

  ['Referencias a grupos', 'Hoja de Interés', 'Derivaciones_Institucionales'].forEach(nombre => {
    let hoja = prepararHoja(nombre);
    
    // Headers específicos
    let localHeaders = [...headersInteres];
    if (nombre === 'Referencias a grupos' || nombre === 'Derivaciones_Institucionales') {
      localHeaders[localHeaders.length - 1] = 'Hoja de Interés'; 
    }
    
    // Si es Institucional, agregamos la columna de Origen
    if (nombre === 'Derivaciones_Institucionales') {
      localHeaders.splice(1, 0, 'Organización / Quien Deriva');
    }

    hoja.getRange(1, 1, 1, localHeaders.length).setValues([localHeaders]);
    aplicarEstiloHeader(hoja.getRange(1, 1, 1, localHeaders.length));
    
    // AGREGAR TOOLTIPS (NOTITAS)
    localHeaders.forEach((h, i) => {
      if (notasInteres[h]) hoja.getRange(1, i + 1).setNote(notasInteres[h]);
    });
    
    hoja.setFrozenRows(1);
    const mColsHeader = localHeaders.length;
    if (mColsHeader > 0) {
      hoja.getRange(1, 1, 1, mColsHeader).setBackground('#3F51B5').setFontColor('white');
    }
  });

  // 2. Resumen de Grupos
  let hojaResumen = prepararHoja('Resumen de Grupos');
  const headersResumen = ['Nombre del Grupo', 'Tipo', 'Responsable', 'Sesiones', 'Inscritos', '% Asistencia', 'Estado', 'Fecha Creación', 'Cupo Máximo'];
  hojaResumen.getRange(1, 1, 1, headersResumen.length).setValues([headersResumen]);
  aplicarEstiloHeader(hojaResumen.getRange(1, 1, 1, headersResumen.length), '#1e1b4b'); // Dark Indigo
  
  hojaResumen.setColumnWidth(1, 300);
  hojaResumen.setColumnWidth(2, 200);
  hojaResumen.setColumnWidth(9, 120); // Ancho para cupo
  hojaResumen.setFrozenRows(1);

  // 3. Graduadx
  let hojaGraduadas = prepararHoja('Graduadx');
  const headersGraduadas = ['Fecha Graduación', 'Creamos ID', 'Nombre Completo', 'Grupo', 'Responsable', '% Asistencia', 'Notas'];
  hojaGraduadas.getRange(1, 1, 1, headersGraduadas.length).setValues([headersGraduadas]);
  aplicarEstiloHeader(hojaGraduadas.getRange(1, 1, 1, headersGraduadas.length), '#1b5e20');

  // 4. Retiradx
  let hojaRetiradx = prepararHoja('Retiradx');
  const headersRetiradx = ['Fecha Retiro', 'Creamos ID', 'Nombre Completo', 'Teléfono', 'Grupo de Origen', '% Asistencia', 'Motivo Retiradx'];
  hojaRetiradx.getRange(1, 1, 1, headersRetiradx.length).setValues([headersRetiradx]);
  aplicarEstiloHeader(hojaRetiradx.getRange(1, 1, 1, headersRetiradx.length), '#b71c1c');
}

function configurarValidacionesAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
    const sheetRetiradx = ss.getSheetByName('Retiradx');
    if (sheetRetiradx) {
      const motivos = ['N/A', 'No interesado/a', 'No contesta', 'Horario no conviene', 'Ya participa', 'Otro'];
      const validation = SpreadsheetApp.newDataValidation().requireValueInList(motivos).build();
      const maxR = sheetRetiradx.getMaxRows();
      if (maxR > 1) {
        sheetRetiradx.getRange(2, 7, maxR - 1, 1).setDataValidation(validation);
      }
    }

  const excludeVal = ['Referencias a grupos', 'Hoja de Interés', 'Resumen de Grupos', 'Retiradx', 'Graduadx', 'Reporte General', 'Copy of CREAMOS ID nuevo', 'Derivaciones_Institucionales', '⚙️ CONFIGURACIÓN', 'LOG_KOBO', 'TEMPORAL_LIMPIEZA'];
  const gruposDisponibles = ss.getSheets()
    .map(s => s.getName())
    .filter(name => !excludeVal.includes(name) && !name.includes('TEMPORAL'));

  if (gruposDisponibles.length > 0) {
    const validationAction = SpreadsheetApp.newDataValidation().requireValueInList(gruposDisponibles).build();

    const sheetInteres = ss.getSheetByName('Hoja de Interés');
    if (sheetInteres && sheetInteres.getLastRow() > 1) {
      const numRowsVal = sheetInteres.getLastRow() - 1;
      sheetInteres.getRange(2, 11, numRowsVal, 1).setDataValidation(validationAction);
    }

    // Derivaciones_Institucionales también debe permitir enviar a grupos (col 12)
    const sheetInst = ss.getSheetByName('Derivaciones_Institucionales');
    if (sheetInst && sheetInst.getLastRow() > 1) {
      const numRowsInst = sheetInst.getLastRow() - 1;
      sheetInst.getRange(2, 12, numRowsInst, 1).setDataValidation(validationAction);
    }
  }

    const valSiNo = SpreadsheetApp.newDataValidation().requireValueInList(['Si', 'No']).build();

    // Solo Referencias a grupos mantiene la validación Si/No en col 11
    const sheetRef = ss.getSheetByName('Referencias a grupos');
    if (sheetRef && sheetRef.getLastRow() > 1) {
      const numRowsVal = sheetRef.getLastRow() - 1;
      const rangeVal = sheetRef.getRange(2, 11, numRowsVal, 1);
      rangeVal.setDataValidation(valSiNo);

      const ruleSi = SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Si')
        .setBackground('#D1FAE5')
        .setFontColor('#065F46')
        .setRanges([rangeVal])
        .build();
      const ruleNo = SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('No')
        .setBackground('#FFE4E6')
        .setFontColor('#991B1B')
        .setRanges([rangeVal])
        .build();

      sheetRef.setConditionalFormatRules([ruleSi, ruleNo]);
    }
}

function verificarInstalacionAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const check = ss.getSheetByName('Referencias a grupos') && ss.getSheetByName('Hoja de Interés');
  if (!check) {
    const ui = SpreadsheetApp.getUi();
    const res = ui.alert('⚠️ Sistema Incompleto', 'Faltan hojas base. ¿Desea ejecutar la instalación?', ui.ButtonSet.YES_NO);
    if (res == ui.Button.YES) instalarSistemaAE();
  } else {
    toastSafeAE('✅ El sistema parece estar correctamente instalado.', 'Verificación');
  }
}

function diagnosticoSistemaAE() {
  verificarInstalacionAE();
}

// =====================================================================
// IMPORTACIÓN DESDE KOBO (UTF-8 CORREGIDO)
// =====================================================================

function importarDesdeKoboAE(url, targetSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nombreHoja = targetSheetName || 'Referencias a grupos';
  const sheet = ss.getSheetByName(nombreHoja);
  if (!sheet) { toastSafeAE('❌ Hoja "' + nombreHoja + '" no encontrada.', 'Error'); return; }

  try {
    const configSheet = ss.getSheetByName('⚙️ CONFIGURACIÓN');
    let koboUrl = url;

    // Obtener la URL asegurada de la hoja de Configuración o Globales
    if (!koboUrl && configSheet) {
      const dataConfig = configSheet.getDataRange().getValues();
      if (nombreHoja === 'Hoja de Interés') {
        koboUrl = (dataConfig[3][1] || '').toString().trim(); // Celda B4 (Interés 2026)
        if (!koboUrl) koboUrl = CONFIG_AE.KOBO_URL_2026;
      } else {
        koboUrl = (dataConfig[1][1] || '').toString().trim(); // Celda B2 (Referencias)
        if (!koboUrl) koboUrl = CONFIG_AE.KOBO_URL;
      }
    }
    
    if (!koboUrl) koboUrl = CONFIG_AE.KOBO_URL;
    koboUrl = koboUrl.trim();

    toastSafeAE('⏳ Sincronizando ' + nombreHoja + '...', 'Kobo');
    const response = UrlFetchApp.fetch(koboUrl, { muteHttpExceptions: true });
    const code = response.getResponseCode();
    
    if (code !== 200) {
      Logger.log('Error Kobo (' + nombreHoja + '): Código ' + code + ' URL: ' + koboUrl);
      toastSafeAE('❌ Error ' + code + ' al conectar. Revisa la URL en Configuración.', 'Error');
      return;
    }

    let content = response.getContentText("UTF-8");
    if (content.charCodeAt(0) === 0xFEFF) content = content.substring(1);

    const firstLine = content.split('\n')[0];
    const sep = firstLine.includes(';') ? ';' : ',';
    
    const csvData = parsearCSVManualAE(content, sep);
    if (csvData.length <= 1) {
      toastSafeAE('⚠️ El archivo de Kobo está vacío.', 'Kobo');
      return;
    }

    const headers = csvData[0];
    const dataRows = csvData.slice(1);
    
    const normalize = (t) => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const getI = (patterns) => headers.findIndex(h => patterns.some(p => normalize(h).includes(normalize(p))));

    const cleanValue = (val) => String(val || '').replace(/^(No\s+|Si\s+|^\d+\s+\|?\s*)+/gi, '').trim();
    const cleanGeneric = (v) => String(v || '').replace(/^(Si|No)\s*[:/-]?\s*/gi, '').trim();
    const extractGroupName = (text) => {
      if (!text) return '';
      let part = text.includes('/') ? text.split('/').pop() : text;
      return part.replace(/^[01]\s*\|?\s*/, '').trim();
    };

    const map = {
      id: getI(['ID', 'Creamos ID']),
      nombre: getI(['Nombre Completo (según DPI)', 'Nombre completo', 'Nombre del responsable', 'Nombres y Apellidos', 'Nombre', 'Inicio / Nombre']),
      apellidos: getI(['Inicio / Apellido', 'Apellido']),
      nombrePreferido: getI(['Nombre Preferido', 'Preferido']),
      genero: getI(['Género', 'genero', 'sexo', 'autodescribes', 'Inicio / Género']),
      edad: getI(['Edad:', 'edad', 'Fecha de nacimiento', 'nacimiento', 'Edad', 'años', 'Inicio / Edad']),
      tel: getI(['Teléfono', 'Número de Teléfono', 'celular', 'contacto', 'Datos del derivado / Teléfono']),
      dpi: getI(['dpi / cui', 'cui', 'número de dpi', 'documento p']),
      zona: getI(['Zona / Colonia', 'Especifique zona o colonia', 'Zona', 'Colonia', 'Ubicación', 'Inicio / Zona', 'Datos del derivado / Dirección']),
      interes: getI(['Tipo de apoyo solicitado', '¿A qué programa se refiere?', 'servicio', 'programas te interesan', 'Programa', 'apoyo', 'interesa', 'Datos del derivado / Servicio al que deriva']),
      notas: getI(['Breve motivo de la referencia', 'Motivo', 'Notas', 'Comentarios', 'observaciones', 'Datos del derivado / Motivo de derivación']),
      fecha_envio: getI(['_submission_time', 'start', 'end', 'fecha', 'timestamp']),
      organizacion: getI(['Nombre de organización', 'Nombre de quien deriva', 'Datos de la Organización'])
    };

    if (map.nombre === -1) map.nombre = getI(['Participante', 'Datos del derivado / Nombre completo']);
    if (map.edad === -1) map.edad = getI(['Datos del derivado / Edad']);

    const keywordsGrupos = ['grupo', 'padres', 'madres', 'psicoeducativ', 'autoayuda', 'relajarte', 'autopercepc', 'ocupacional'];
    const keywordsNegativas = ['terapia individual', 'psicoterapia individual'];

    // --- SISTEMA ANTI-DUPLICADOS ---
    let firmasExistentes = [];
    if (sheet.getLastRow() > 1) {
      const fullData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
      firmasExistentes = fullData.map(r => {
        const id = String(r[1] || '').trim().toUpperCase();
        const nom = String(r[2] || '').trim().toUpperCase();
        const tel = String(r[5] || '').trim().replace(/\D/g, '');
        return id ? 'ID:' + id : 'SIG:' + nom + '|' + tel;
      });
    }

    let nuevos = 0;

    dataRows.forEach(row => {
      const creamosID = map.id !== -1 ? String(row[row.length > map.id ? map.id : 0]).trim().toUpperCase() : '';
      
      let nombreTmp = '';
      if (map.nombre !== -1) {
        nombreTmp = cleanValue(row[map.nombre]);
        if (map.apellidos !== -1) nombreTmp += ' ' + cleanValue(row[map.apellidos]);
      }
      
      const telTmp = map.tel !== -1 ? String(row[map.tel] || '').replace(/\D/g, '') : '';
      const firmaEntrante = creamosID ? 'ID:' + creamosID : 'SIG:' + nombreTmp.toUpperCase().trim() + '|' + telTmp;

      // REGLA: Si ya existe, saltar
      if (firmasExistentes.includes(firmaEntrante)) return;
      if (!nombreTmp && !telTmp) return;

      const serviciosVal = String(map.interes !== -1 ? row[map.interes] : '');
      const notasVal = String(map.notas !== -1 ? row[map.notas] : '');
      
      // Combinar texto de servicios, notas y cualquier otro campo que contenga las palabras
      let contextoValores = [serviciosVal, notasVal];
      
      headers.forEach((h, i) => {
        const val = String(row[i] || '').toLowerCase().trim();
        const headerLower = String(h).toLowerCase();
        
        // Si el valor es afirmativo, se agrega el nombre de la columna al contexto
        if (val === 'ok' || val === '1' || val === 'si' || val === 'true') {
          contextoValores.push(headerLower);
        }
        
        // Pero TAMBIÉN, si el valor *contiene* las selecciones directamente (ej. "Apoyo Emocional")
        if (val.length > 2) {
          contextoValores.push(val); 
        }
      });
      
      const contextoTotal = contextoValores.join(' ');
      
      // Determinar si estrictamente pide un grupo
      const exigeGrupo = keywordsGrupos.some(k => contextoTotal.includes(k) || serviciosVal.toLowerCase().includes(k));
      const esTerapiaIndividual = keywordsNegativas.some(k => contextoTotal.includes(k));

      // LÓGICA DE FILTRADO (ESTRICTAMENTE SOLO GRUPOS)
      // Bloquea tajantamente si alguien pide Terapia Individual y NUNCA mencionó explícitamente un grupo
      if (!exigeGrupo || (esTerapiaIndividual && !exigeGrupo)) return;

      let nombreFinal = nombreTmp || 'SIN NOMBRE';
      if (nombreFinal === 'SIN NOMBRE' || nombreFinal === '' && map.nombrePreferido !== -1 && row[map.nombrePreferido]) {
        nombreFinal = cleanValue(row[map.nombrePreferido]);
      }

      let generoFinal = map.genero !== -1 ? String(row[map.genero]) : '';
      if (generoFinal.includes('/')) generoFinal = generoFinal.split('/')[0].trim();

      // Cálculo de EDAD exacta y en número entero
      let edadFinal = cleanGeneric(map.edad !== -1 ? row[map.edad] : '');
      if (edadFinal) {
        // ¿Es formato de fecha o tiene guiones/slashes?
        if (edadFinal.includes('-') || edadFinal.includes('/')) {
          let fechaNac = new Date(edadFinal);
          if (!isNaN(fechaNac.getTime())) {
            let diff_ms = Date.now() - fechaNac.getTime();
            let age_dt = new Date(diff_ms); 
            edadFinal = Math.abs(age_dt.getUTCFullYear() - 1970);
          }
        } 
        // Convertirlo a puro número entero
        if (typeof edadFinal === 'string') {
           edadFinal = parseInt(edadFinal.replace(/\D/g, ''));
           if (isNaN(edadFinal)) edadFinal = '';
        }
      }

      // EXTRAER FECHA REAL DE ENVÍO DE KOBO
      let fechaEnvioReal = new Date();
      if (map.fecha_envio !== -1 && row[map.fecha_envio]) {
        let fTmp = new Date(row[map.fecha_envio]);
        if (!isNaN(fTmp.getTime())) fechaEnvioReal = fTmp;
      }

      // ESTRUCTURACIÓN PERFECTA DE SERVICIOS (A COPIA EXACTA DE LOS EJEMPLOS)
      let serviciosExactos = [];
      if (contextoTotal.includes('ocupacional')) serviciosExactos.push('Apoyo Emocional, Grupos Psicoeducativos: Terapia Ocupacional');
      if (contextoTotal.includes('autopercepc') || contextoTotal.includes('auto percep')) serviciosExactos.push('Apoyo Emocional, Grupo de Autopercepción');
      if (contextoTotal.includes('relajarte') || contextoTotal.includes('relaj') || contextoTotal.includes('arte')) serviciosExactos.push('Apoyo Emocional, Grupos Terapeuticos: RelajArte');
      
      if (contextoTotal.includes('escuela para madres') || contextoTotal.includes('madres')) serviciosExactos.push('Apoyo Emocional, Grupos: Escuela para madres');
      if (contextoTotal.includes('escuela para padres') || (contextoTotal.includes('padres') && !contextoTotal.includes('madres'))) serviciosExactos.push('Apoyo Emocional, Grupos: Escuela para padres');
      if (contextoTotal.includes('otros grupos')) serviciosExactos.push('Apoyo Emocional, Otros grupos');

      if (contextoTotal.includes('grupo de apoyo emocional') || (contextoTotal.includes('apoyo emocional') && serviciosExactos.length === 0)) serviciosExactos.push('Apoyo Emocional, Grupo de apoyo emocional');
      
      let serviciosFinal = '';
      if (serviciosExactos.length > 0) {
        serviciosFinal = serviciosExactos.join(' | ');
      } else {
        // Formato genérico de respaldo
        serviciosFinal = 'Apoyo Emocional, Grupos (' + extractGroupName(serviciosVal) + ')';
      }
      
      const newRow = [
        fechaEnvioReal, 
        creamosID,
        nombreFinal,
        generoFinal,
        edadFinal, 
        map.tel !== -1 ? row[map.tel] : '',
        map.dpi !== -1 ? row[map.dpi] : '',
        cleanGeneric(map.zona !== -1 ? row[map.zona] : ''),
        serviciosFinal,
        map.notas !== -1 ? row[map.notas] : '',
        ''
      ];

      // Si es la hoja Institucional, insertar la columna de Organización en la posición 2
      if (nombreHoja === 'Derivaciones_Institucionales') {
        const orgVal = map.organizacion !== -1 ? row[map.organizacion] : 'S/D';
        newRow.splice(1, 0, orgVal);
      }

      sheet.appendRow(newRow);
      nuevos++;
    });

    configurarValidacionesAE();
    toastSafeAE('✅ ' + nuevos + ' registros añadidos a ' + nombreHoja + '.', 'Éxito');
  } catch (e) {
    Logger.log('Error en Importación (' + nombreHoja + '): ' + e.message);
  }
}

// =====================================================================
// GESTIÓN DE GRUPOS
// =====================================================================

/**
 * Busca el siguiente número correlativo para un nombre de grupo.
 * Ej: "Escuela de Padres" -> devuelve "Escuela de Padres 2" si ya existe la 1.
 */
function getSiguienteCorrelativoAE(nombreBase) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  let max = 0;
  
  // Limpiar el nombre base de (2026) etc para la búsqueda
  const baseLimpia = nombreBase.replace(/\s*\(\d{4}\)/g, '').trim();
  const regex = new RegExp("^" + baseLimpia.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\s*(\\d+)?", "i");
  
  sheets.forEach(s => {
    const name = s.getName();
    const match = name.match(regex);
    if (match) {
      const num = match[1] ? parseInt(match[1]) : 1;
      if (num > max) max = num;
    }
  });
  
  return (max + 1);
}

function crearNuevoGrupoAE() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const resNombre = ui.prompt('🆕 Nuevo Grupo', 'Ingrese el nombre del grupo (ej: Escuela de Padres):', ui.ButtonSet.OK_CANCEL);
  if (resNombre.getSelectedButton() != ui.Button.OK) return;
  const grupoBase = resNombre.getResponseText().trim();
  
  // Nombramiento Automático - Buscar último número para ese grupo base
  const correlativo = getSiguienteCorrelativoAE(grupoBase);
  const grupoNombre = grupoBase + " " + correlativo + " (2026)";
  
  if (ss.getSheetByName(grupoNombre)) {
    alertSafeAE('❌ Error', 'Ya existe un grupo llamado: ' + grupoNombre);
    return;
  }
  
  const resTipo = ui.prompt('📂 Tipo de Grupo', '1: Grupo Psicoeducativo\n2: Grupo Psicoterapéutico', ui.ButtonSet.OK_CANCEL);
  const seleccionTipo = resTipo.getResponseText();
  const nombreTipo = (seleccionTipo === '2') ? 'Grupo Psicoterapéutico' : 'Grupo Psicoeducativo';

  const resMod = ui.prompt('🔄 Modalidad', '1: Abierto\n2: Cerrado\n3: Semi-cerrado', ui.ButtonSet.OK_CANCEL);
  let nombreModalidad = 'Cerrado';
  if (resMod.getResponseText() === '1') { nombreModalidad = 'Abierto'; }
  else if (resMod.getResponseText() === '3') { nombreModalidad = 'Semi-cerrado'; }

  const resS = ui.prompt('📅 Sesiones', '¿Cuántas sesiones tendrá?', ui.ButtonSet.OK_CANCEL);
  const numSesiones = parseInt(resS.getResponseText()) || 8;

  const resCupo = ui.prompt('👥 Cupo Máximo', '¿Cuál es el cupo máximo de participantes?', ui.ButtonSet.OK_CANCEL);
  const cupoMax = parseInt(resCupo.getResponseText()) || 25;

  const resD = ui.prompt('📆 Días/Horario', 'Ej: Lunes y Miércoles 14:00:', ui.ButtonSet.OK_CANCEL);
  const diasEnv = resD.getResponseText();

  const resR = ui.prompt('👤 Responsable', 'Nombre del encargado:', ui.ButtonSet.OK_CANCEL);
  if (resR.getSelectedButton() != ui.Button.OK) return;
  const responsable = resR.getResponseText();

  const resFecha = ui.prompt('📅 Fecha de Inicio', 'Ingrese la fecha de la Primera Sesión (DD/MM/YYYY):', ui.ButtonSet.OK_CANCEL);
  if (resFecha.getSelectedButton() != ui.Button.OK) return;
  const fechaStr = resFecha.getResponseText().trim();

  const partes = fechaStr.split('/');
  let fechaInicio = new Date();
  if (partes.length === 3) {
    fechaInicio = new Date(partes[2], partes[1] - 1, partes[0]);
  }

  // ===== NUEVA FUNCIONALIDAD: Manejo de Asuetos/Feriados =====
  const resAsuetos = ui.alert('🏖️ Asuetos/Feriados',
    '¿Hay asuetos o días feriados donde NO se realizarán sesiones?\n\n' +
    'Esto permite saltar esas fechas y no crear columnas innecesarias.',
    ui.ButtonSet.YES_NO);

  let fechasAsuetos = [];
  if (resAsuetos == ui.Button.YES) {
    const resListaAsuetos = ui.prompt('📅 Fechas de Asuetos',
      'Ingrese las fechas de asuetos separadas por comas (DD/MM/YYYY):\n\n' +
      'Ejemplo: 01/05/2026, 15/09/2026, 25/12/2026',
      ui.ButtonSet.OK_CANCEL);

    if (resListaAsuetos.getSelectedButton() == ui.Button.OK) {
      const listaStr = resListaAsuetos.getResponseText().trim();
      if (listaStr) {
        const fechasStr = listaStr.split(',');
        fechasStr.forEach(f => {
          const fTrim = f.trim();
          const pAsueto = fTrim.split('/');
          if (pAsueto.length === 3) {
            const fechaAsueto = new Date(pAsueto[2], pAsueto[1] - 1, pAsueto[0]);
            fechasAsuetos.push(fechaAsueto.getTime()); // Guardar como timestamp para comparación
          }
        });
      }
    }
  }

  const sheet = ss.insertSheet(grupoNombre);
  const numRows = sheet.getMaxRows() - 1;
  const headers = ['Año', 'Creamos ID', 'Nombre Completo', 'Teléfono', '% Asistencia'];
  const colSesionesOffset = headers.length; // Columna 5

  // ===== GENERACIÓN INTELIGENTE DE SESIONES (Saltando Asuetos) =====
  let fechaActual = new Date(fechaInicio);
  for (let s = 1; s <= numSesiones; s++) {
    // Si no es la primera sesión, avanzar 7 días
    if (s > 1) {
      fechaActual.setDate(fechaActual.getDate() + 7);

      // Saltar asuetos: si la fecha cae en asueto, seguir sumando 7 días
      let intentos = 0;
      while (fechasAsuetos.includes(fechaActual.getTime()) && intentos < 52) {
        fechaActual.setDate(fechaActual.getDate() + 7);
        intentos++;
      }
    }

    let labelFecha = Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), 'dd/MM');
    headers.push('S' + s + ' (' + labelFecha + ')');
    headers.push('Evolución S' + s);
  }
  headers.push('Etapa');
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#1E1B4B').setFontColor('white').setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
  
  if (numRows > 0) {
    sheet.getRange(2, 1, numRows, 1).setValue(2026); 
  }
  
  if (numSesiones > 0) {
    let rules = sheet.getConditionalFormatRules();
    
    for (let s = 0; s < numSesiones; s++) {
      const colAsis = colSesionesOffset + 1 + (s * 2);
      const sessionRange = sheet.getRange(2, colAsis, numRows, 1);
      
      sessionRange.insertCheckboxes()
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle');
        
      const ruleTrue = SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=" + encodeColNameAE(colAsis) + "2=TRUE")
        .setBackground('#D1FAE5') // Emerald 100
        .setFontColor('#065F46') // Emerald 800
        .setRanges([sessionRange])
        .build();
      
      rules.push(ruleTrue);
      
      sheet.setColumnWidth(colAsis, 50); 
      sheet.setColumnWidth(colAsis + 1, 150); 
    }
    sheet.setConditionalFormatRules(rules);

    for (let r = 2; r <= numRows + 1; r++) {
       let checkCols = [];
       for (let s = 0; s < numSesiones; s++) {
         checkCols.push(encodeColNameAE(colSesionesOffset + 1 + (s * 2)) + r);
       }
       // Mejorada: Solo cuenta sesiones REALIZADAS (TRUE o FALSE), ignora vacías (no realizadas)
       const formula = '=IF(C' + r + '<>"", IFERROR(COUNTIF({' + checkCols.join(';') + '}, TRUE)/(COUNTIF({' + checkCols.join(';') + '}, TRUE)+COUNTIF({' + checkCols.join(';') + '}, FALSE)), ""), "")';
       sheet.getRange(r, 5).setFormula(formula).setNumberFormat('0%')
         .setHorizontalAlignment('center').setFontWeight('bold');
    }
  }
  
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(4); 

  const colEtapa = headers.length;
  const validation = SpreadsheetApp.newDataValidation().requireValueInList(['Retirar Participante']).build();
  if (numRows > 0 && colEtapa > 0) {
    sheet.getRange(2, colEtapa, numRows, 1).setDataValidation(validation);
  }

  const hojaResumen = ss.getSheetByName('Resumen de Grupos');
  if (hojaResumen) {
    // Asegurar que existan todos los encabezados
    const headersRes = ['Nombre del Grupo', 'Tipo', 'Responsable', 'Sesiones', 'Inscritos', '% Asistencia', 'Estado', 'Fecha Creación', 'Cupo Máximo'];
    hojaResumen.getRange(1, 1, 1, headersRes.length).setValues([headersRes])
      .setBackground('#1e1b4b').setFontColor('white').setFontWeight('bold');

    hojaResumen.appendRow([
      grupoNombre + ' (' + nombreModalidad + ')',  nombreTipo,  responsable,  numSesiones, 
      '=COUNTIFS(\'' + grupoNombre + '\'!C:C, "<>", \'' + grupoNombre + '\'!C:C, "<>Nombre Completo")',
      '=IFERROR(AVERAGE(\'' + grupoNombre + '\'!E2:E' + (numRows + 1) + '), 0)',
      'Activo', new Date(), cupoMax
    ]);
    
    // Aplicar formato de porcentaje a la columna F
    hojaResumen.getRange(hojaResumen.getLastRow(), 6).setNumberFormat('0%');
  }
  
  configurarValidacionesAE();
  aplicarFormatosAE(); 
  actualizarReportesAE(); 
  alertSafeAE('🎉 ¡Éxito!', 'El grupo "' + grupoNombre + '" ha sido creado.');
}

function verResumenGruposAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Resumen de Grupos');
  if (sheet) sheet.activate();
}

/**
 * Corrige encabezados faltantes y aplica formato de porcentaje 
 * a la columna F en la hoja "Resumen de Grupos".
 */
function repararResumenGruposAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Resumen de Grupos');
  if (!sheet) {
    alertSafeAE('⚠️ Error', 'No se encontró la hoja "Resumen de Grupos".');
    return;
  }

  // 1. Forzar encabezados correctos
  const headersRes = ['Nombre del Grupo', 'Tipo', 'Responsable', 'Sesiones', 'Inscritos', '% Asistencia', 'Estado', 'Fecha Creación', 'Cupo Máximo'];
  sheet.getRange(1, 1, 1, headersRes.length).setValues([headersRes])
    .setBackground('#1e1b4b').setFontColor('white').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  // 2. Aplicar formato de % a toda la columna F (Asistencia)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 6, lastRow - 1, 1).setNumberFormat('0%');
    // También ajustamos anchos
    sheet.setColumnWidth(1, 400); // Nombre
    sheet.setColumnWidth(2, 200); // Tipo
    sheet.setColumnWidth(3, 150); // Responsable
    sheet.setColumnWidth(6, 120); // % Asistencia
    sheet.setColumnWidth(8, 180); // Fecha
    sheet.setColumnWidth(9, 120); // Cupo
  }
  
  toastSafeAE('✅ Resumen de Grupos reparado con éxito.');
}

function mostrarDialogoCerrarGrupoAE() {
  const ui = SpreadsheetApp.getUi();
  const prompt = ui.prompt('🔒 Cerrar Grupo', 'Ingrese el nombre EXACTO del grupo a finalizar:', ui.ButtonSet.OK_CANCEL);
  if (prompt.getSelectedButton() == ui.Button.OK) cerrarGrupoAE(prompt.getResponseText().trim());
}

function cerrarGrupoAE(nombreGrupo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(nombreGrupo);
  if (!sheet) return;
  
  const ui = SpreadsheetApp.getUi();
  const confirm = ui.alert('⚠️ Cerrar Grupo', '¿Seguro que desea cerrar "' + nombreGrupo + '"?', ui.ButtonSet.YES_NO);
  if (confirm != ui.Button.YES) return;

  const sheetResumen = ss.getSheetByName('Resumen de Grupos');
  const sheetGraduadas = ss.getSheetByName('Graduadx');
  const data = sheet.getDataRange().getValues();
  const graduadas = [];
  const fechaHoy = new Date();
  
  let responsable = 'S/D';
  if (sheetResumen) {
    const resumenData = sheetResumen.getDataRange().getValues();
    for (let i = 1; i < resumenData.length; i++) {
      if (resumenData[i][0] && resumenData[i][0].includes(nombreGrupo)) {
        responsable = resumenData[i][2];
        sheetResumen.getRange(i + 1, 7).setValue('Finalizado'); // Columna Estado
        break;
      }
    }
  }

  const headers = data[0];
  const colID = headers.indexOf('Creamos ID');
  const colNombre = headers.indexOf('Nombre Completo');
  let colAsis = headers.indexOf('% Asistencia');
  if (colAsis === -1) colAsis = headers.indexOf('% Asis'); // Compatibilidad con versiones anteriores

  for (let i = 1; i < data.length; i++) {
    const nombre = data[i][colNombre];
    if (nombre && nombre !== "" && nombre !== "Nombre Completo") {
      graduadas.push([
        fechaHoy, colID !== -1 ? data[i][colID] : 'S/I', nombre, 
        nombreGrupo, responsable, colAsis !== -1 ? data[i][colAsis] : 'N/A', 'Graduación automática al cerrar cohorte'
      ]);
    }
  }

  if (graduadas.length > 0 && sheetGraduadas) {
    sheetGraduadas.getRange(sheetGraduadas.getLastRow() + 1, 1, graduadas.length, graduadas[0].length).setValues(graduadas);
  }

  sheet.hideSheet();
  alertSafeAE('✅ Cohorte Finalizada', 'Se registraron todas las graduaciones y la hoja se ha ocultado para preservar el historial.');
}

/**
 * Muestra un diálogo para eliminar un grupo/cohorte completamente
 */
function mostrarDialogoEliminarGrupoAE() {
  const ui = SpreadsheetApp.getUi();
  const prompt = ui.prompt('🗑️ Eliminar Grupo/Cohorte', 'Ingrese el nombre EXACTO del grupo a eliminar:\n\n⚠️ ADVERTENCIA: Esta acción es PERMANENTE y eliminará todos los datos del grupo.', ui.ButtonSet.OK_CANCEL);
  if (prompt.getSelectedButton() == ui.Button.OK) {
    eliminarGrupoCohorteAE(prompt.getResponseText().trim());
  }
}

/**
 * Elimina un grupo/cohorte completo del sistema
 * - Elimina la hoja del grupo
 * - Elimina la entrada en "Resumen de Grupos"
 * - Confirma con el usuario antes de proceder
 */
function eliminarGrupoCohorteAE(nombreGrupo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(nombreGrupo);

  if (!sheet) {
    alertSafeAE('❌ Error', 'No se encontró el grupo "' + nombreGrupo + '".\n\nVerifique que el nombre esté escrito EXACTAMENTE como aparece en la pestaña.');
    return;
  }

  const ui = SpreadsheetApp.getUi();

  // Doble confirmación para evitar eliminaciones accidentales
  const confirm1 = ui.alert(
    '⚠️ ADVERTENCIA - Eliminar Grupo',
    '¿Está COMPLETAMENTE SEGURO de eliminar "' + nombreGrupo + '"?\n\n' +
    '❌ Esta acción NO se puede deshacer\n' +
    '❌ Se perderán TODOS los datos del grupo\n' +
    '❌ No habrá forma de recuperar la información\n\n' +
    '💡 Alternativa: Use "Cerrar/Finalizar Grupo" para archivar sin eliminar.',
    ui.ButtonSet.YES_NO
  );

  if (confirm1 != ui.Button.YES) {
    toastSafeAE('❌ Operación cancelada');
    return;
  }

  // Segunda confirmación
  const confirm2 = ui.alert(
    '🚨 ÚLTIMA CONFIRMACIÓN',
    'Escriba "ELIMINAR" en el siguiente cuadro para confirmar la eliminación de "' + nombreGrupo + '"',
    ui.ButtonSet.OK_CANCEL
  );

  if (confirm2 != ui.Button.OK) {
    toastSafeAE('❌ Operación cancelada');
    return;
  }

  const confirmText = ui.prompt('✍️ Confirmar Eliminación', 'Escriba exactamente: ELIMINAR', ui.ButtonSet.OK_CANCEL);

  if (confirmText.getSelectedButton() != ui.Button.OK || confirmText.getResponseText().trim().toUpperCase() !== 'ELIMINAR') {
    alertSafeAE('❌ Cancelado', 'La palabra de confirmación no coincide. Operación cancelada por seguridad.');
    return;
  }

  // Proceder con la eliminación
  try {
    // 1. Eliminar entrada en Resumen de Grupos
    const sheetResumen = ss.getSheetByName('Resumen de Grupos');
    if (sheetResumen) {
      const resumenData = sheetResumen.getDataRange().getValues();
      for (let i = resumenData.length - 1; i >= 1; i--) {
        if (resumenData[i][0] && resumenData[i][0].includes(nombreGrupo)) {
          sheetResumen.deleteRow(i + 1);
          break;
        }
      }
    }

    // 2. Eliminar la hoja del grupo
    ss.deleteSheet(sheet);

    alertSafeAE('✅ Grupo Eliminado', 'El grupo "' + nombreGrupo + '" ha sido eliminado permanentemente del sistema.');

  } catch (error) {
    alertSafeAE('❌ Error al Eliminar', 'Ocurrió un error al eliminar el grupo:\n\n' + error.message);
  }
}

// =====================================================================
// HERRAMIENTAS Y AUTOMATIZACIÓN
// =====================================================================

function onEdit(e) {
  if (!e) return;
  const range = e.range;
  const sheet = range.getSheet();
  const value = e.value;
  const col = range.getColumn();
  const row = range.getRow();

  if (value === 'Retirar Participante' && row > 1) {
    moverARetiradx(sheet, row);
  }

  // Ahora Acción está en la columna 11 (K) en Hoja de Interés
  if (col === 11 && value && row > 1 && sheet.getName() === 'Hoja de Interés' && value !== 'Si' && value !== 'No') {
    enviarAHojaGrupoAE(sheet, row, value);
  }

  // En Derivaciones_Institucionales la columna de acción es la 12 (L) por la columna extra "Organización"
  if (col === 12 && value && row > 1 && sheet.getName() === 'Derivaciones_Institucionales' && value !== 'Si' && value !== 'No') {
    enviarAHojaGrupoAE(sheet, row, value);
  }

  // ✅ CORRECCIÓN: Ya NO se llama automáticamente a gestionarAsistenciaYEvolucionAE
  // Esto permite que:
  // 1. Los checkboxes funcionen normalmente sin preguntas
  // 2. Puedas escribir evoluciones directamente en las celdas
  // 3. Usar la función masiva desde el menú cuando lo necesites

  /* CÓDIGO ANTERIOR COMENTADO - Ya no se ejecuta automáticamente
  if (sheet.getName().includes('(2026)') && col >= 6 && (col % 2 === 0)) {
    gestionarAsistenciaYEvolucionAE(e);
  }
  */
}

/**
 * Maneja el clic en un checkbox de asistencia y pregunta si se desea registrar evolución.
 */
function gestionarAsistenciaYEvolucionAE(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const ui = SpreadsheetApp.getUi();
  const col = range.getColumn();
  const row = range.getRow();

  // 1. Obtener el nuevo valor del checkbox
  const isChecked = range.getValue();

  // CASO A: SE MARCA ASISTENCIA (FALSE -> TRUE)
  if (isChecked === true) {
    const promptNota = ui.prompt('✍️ Registro de Evolución', 
      'Escribe la nota o evolución de la sesión:', 
      ui.ButtonSet.OK_CANCEL);
    
    if (promptNota.getSelectedButton() !== ui.Button.OK) return;
    const nota = promptNota.getResponseText().trim();
    
    if (!nota) {
      toastSafeAE('⚠️ No se ingresó texto, operación cancelada.');
      return;
    }

    const resTipo = ui.alert('👥 ¿A quién aplicar esta nota?', 
      'Selecciona el alcance del guardado:\n\n' +
      '✅ [SÍ] = MODO MASIVO (A todos los asistentes marcados)\n' +
      '❌ [NO] = MODO INDIVIDUAL (Solo a esta fila)', 
      ui.ButtonSet.YES_NO);

    try {
      if (resTipo === ui.Button.NO) {
        sheet.getRange(row, col + 1).setValue(nota);
        toastSafeAE('✅ Nota individual guardada.');
      } else {
        const lastRow = sheet.getLastRow();
        if (lastRow < 2) return;
        const rangeCheckboxes = sheet.getRange(2, col, lastRow - 1, 1);
        const rangeEvoluciones = sheet.getRange(2, col + 1, lastRow - 1, 1);
        const checkValues = rangeCheckboxes.getValues();
        const currentEvolutions = rangeEvoluciones.getValues();
        const nuevasEvoluciones = currentEvolutions.map((rowArr, index) => {
          const val = checkValues[index][0];
          const isParticipantChecked = (val === true || String(val).toUpperCase() === 'TRUE');
          return isParticipantChecked ? [nota] : [rowArr[0]];
        });
        rangeEvoluciones.setValues(nuevasEvoluciones);
        toastSafeAE('🚀 Evolución masiva aplicada.');
      }
    } catch (err) { toastSafeAE('❌ Error al guardar.'); }
  } 
  
  // CASO B: SE DESMARCA (TRUE -> FALSE) - Registro de Inasistencia
  else if (isChecked === false) {
    const resInasistencia = ui.alert('🚫 Seguimiento de Inasistencia', 
      'Has desmarcado la asistencia. ¿Deseas registrar un motivo de INASISTENCIA o nota de seguimiento?', 
      ui.ButtonSet.YES_NO);
    
    if (resInasistencia === ui.Button.YES) {
      const promptMotivo = ui.prompt('✍️ Motivo de Inasistencia', 'Escribe el motivo o seguimiento:', ui.ButtonSet.OK_CANCEL);
      if (promptMotivo.getSelectedButton() === ui.Button.OK) {
        const motivo = promptMotivo.getResponseText().trim();
        if (motivo) {
          sheet.getRange(row, col + 1).setValue('🔴 INASISTENCIA: ' + motivo);
          toastSafeAE('✅ Nota de inasistencia guardada.');
        }
      }
    }
  }

  SpreadsheetApp.flush(); 
}

/**
 * Función desde el menú para registrar una nota masiva 
 * después de haber marcado todos los checkboxes sin interrupciones.
 */
function mostrarDialogoNotaMasivaAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  
  // 1. Verificar si es una hoja de grupo
  if (!sheet.getName().includes('(2026)')) {
    alertSafeAE('⚠️ Acción no permitida', 'Esta función solo es para hojas de grupos (cohortes 2026).');
    return;
  }

  // 2. Identificar sesiones disponibles
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const sesiones = headers.filter(h => h.startsWith('S') && h.includes('('));
  
  if (sesiones.length === 0) {
    alertSafeAE('❌ Error', 'No se encontraron columnas de sesión en esta hoja.');
    return;
  }

  // 3. Preguntar qué sesión
  const msgSesiones = sesiones.map((s, i) => (i + 1) + ': ' + s).join('\n');
  const resSesion = ui.prompt('🔢 Selecciona la Sesión', 
    'Escribe el NÚMERO de la sesión a la que deseas poner nota:\n\n' + msgSesiones, 
    ui.ButtonSet.OK_CANCEL);
  
  if (resSesion.getSelectedButton() !== ui.Button.OK) return;
  const numS = parseInt(resSesion.getResponseText());
  if (isNaN(numS) || numS < 1 || numS > sesiones.length) {
    alertSafeAE('⚠️ Error', 'Número de sesión inválido.');
    return;
  }

  const labelSesion = sesiones[numS - 1];
  const colAsis = headers.indexOf(labelSesion) + 1;

  // 4. Pedir la Nota
  const promptNota = ui.prompt('✍️ Nota Masiva para ' + labelSesion, 
    'Ingresa la evolución que se aplicará a TODOS los marcados en esta sesión:', 
    ui.ButtonSet.OK_CANCEL);
  
  if (promptNota.getSelectedButton() !== ui.Button.OK) return;
  const nota = promptNota.getResponseText().trim();
  if (!nota) return;

  // 5. Aplicar
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const rangeCheckboxes = sheet.getRange(2, colAsis, lastRow - 1, 1);
    const rangeEvoluciones = sheet.getRange(2, colAsis + 1, lastRow - 1, 1);
    
    const checkValues = rangeCheckboxes.getValues();
    const currentEvolutions = rangeEvoluciones.getValues();

    const nuevasEvoluciones = currentEvolutions.map((rowArr, index) => {
      const val = checkValues[index][0];
      const isChecked = (val === true || String(val).toUpperCase() === 'TRUE');
      return isChecked ? [nota] : [rowArr[0]];
    });

    rangeEvoluciones.setValues(nuevasEvoluciones);
    SpreadsheetApp.flush();
    
    // Preguntar si también desea poner nota a las INASISTENCIAS
    const resInas = ui.alert('🚫 ¿Registrar Inasistencias?', 
      '¿Deseas registrar un motivo para los contactos que NO asistieron a esta sesión?', 
      ui.ButtonSet.YES_NO);
      
    if (resInas === ui.Button.YES) {
      const promptMotivo = ui.prompt('✍️ Motivo de Inasistencia (Masivo)', 
        'Ingresa el motivo para los NO asistentes:', ui.ButtonSet.OK_CANCEL);
      if (promptMotivo.getSelectedButton() === ui.Button.OK) {
        const motivo = promptMotivo.getResponseText().trim();
        if (motivo) {
          const nuevasInas = currentEvolutions.map((rowArr, index) => {
            const val = checkValues[index][0];
            const isChecked = (val === true || String(val).toUpperCase() === 'TRUE');
            return !isChecked ? ['🔴 INASISTENCIA: ' + motivo] : [rowArr[0]];
          });
          rangeEvoluciones.setValues(nuevasInas);
          SpreadsheetApp.flush();
        }
      }
    }
    
    alertSafeAE('✅ Éxito', 'Gestión de sesión completada en ' + labelSesion);
  } catch (e) {
    alertSafeAE('❌ Error', 'No se pudo aplicar la nota: ' + e.message);
  }
}

function enviarAHojaGrupoAE(sheetSrc, row, targetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetDest = ss.getSheetByName(targetName);
  if (!sheetDest) { toastSafeAE('❌ El grupo no existe.'); return; }

  // Mapeo dinámico según la hoja de origen (Institucionales tiene columna extra "Organización")
  const esInstitucional = sheetSrc.getName() === 'Derivaciones_Institucionales';
  const colAccionSrc = esInstitucional ? 12 : 11;
  const colNombreSrc = esInstitucional ? 4 : 3;
  const idxID = esInstitucional ? 2 : 1;
  const idxNombre = esInstitucional ? 3 : 2;
  const idxTel = esInstitucional ? 6 : 5;

  const ui = SpreadsheetApp.getUi();
  const confirm = ui.alert('🚀 Enviar a Grupo', '¿Deseas enviar a ' + sheetSrc.getRange(row, colNombreSrc).getValue() + ' a "' + targetName + '"?', ui.ButtonSet.YES_NO);
  if (confirm != ui.Button.YES) { sheetSrc.getRange(row, colAccionSrc).clearContent(); return; }

  const dataRow = sheetSrc.getRange(row, 1, 1, sheetSrc.getLastColumn()).getValues()[0];
  const headersDest = sheetDest.getRange(1, 1, 1, sheetDest.getLastColumn()).getValues()[0];
  
  // VERIFICACIÓN DE CUPO MÁXIMO
  const sheetResumen = ss.getSheetByName('Resumen de Grupos');
  if (sheetResumen) {
    const resData = sheetResumen.getDataRange().getValues();
    const headersRes = resData[0];
    const colGName = headersRes.indexOf('Nombre del Grupo');
    const colInscritos = headersRes.indexOf('Inscritos');
    const colCupo = headersRes.indexOf('Cupo Máximo');
    
    for (let i = 1; i < resData.length; i++) {
      if (resData[i][colGName] && resData[i][colGName].includes(targetName)) {
        const inscritos = parseInt(resData[i][colInscritos]) || 0;
        const cupo = parseInt(resData[i][colCupo]) || 999;
        
        if (inscritos >= cupo) {
          const ui = SpreadsheetApp.getUi();
          const warning = ui.alert('⚠️ ¡GRUPO LLENO!', 
            'El grupo "' + targetName + '" ya ha alcanzado su cupo máximo (' + inscritos + '/' + cupo + ').\n\n¿Deseas enviar a esta persona de todas formas?', 
            ui.ButtonSet.YES_NO);
          if (warning != ui.Button.YES) {
            sheetSrc.getRange(row, colAccionSrc).clearContent();
            return;
          }
        }
        break;
      }
    }
  }

  const colAsistencia = headersDest.indexOf('% Asistencia') + 1;
  const colEtapa = headersDest.indexOf('Etapa') + 1;
  const numSesiones = headersDest.filter(h => h.startsWith('S')).length;

  // CÁLCULO INTELIGENTE DE PRÓXIMA FILA 
  const destData = sheetDest.getRange(1, 2, sheetDest.getLastRow() || 1, 2).getValues();
  let nextRow = sheetDest.getLastRow() + 1;
  for (let r = 1; r < destData.length; r++) { 
    if (!String(destData[r][0]).trim() && !String(destData[r][1]).trim()) { 
      nextRow = r + 1;
      break;
    }
  }

  // Se envía: Año (2026), ID, Nombre, Tel (índices dependen del origen)
  sheetDest.getRange(nextRow, 1, 1, 4).setValues([[2026, dataRow[idxID], dataRow[idxNombre], dataRow[idxTel]]]);

  // ✅ CORRECCIÓN: Insertar checkboxes SOLO en columnas de ASISTENCIA (no en evolución)
  if (colAsistencia > 0 && numSesiones > 0) {
    // Insertar checkboxes solo en columnas impares (6, 8, 10, 12...) = Asistencia
    for (let s = 0; s < numSesiones; s++) {
      const colAsis = 6 + (s * 2); // Columnas 6, 8, 10, 12...
      sheetDest.getRange(nextRow, colAsis, 1, 1).insertCheckboxes()
        .setHorizontalAlignment('center').setVerticalAlignment('middle');
    }

    // Fórmula de porcentaje de asistencia (mejorada)
    // Solo cuenta sesiones REALIZADAS (TRUE o FALSE), ignora vacías (no realizadas)
    let checkCols = [];
    for (let s = 0; s < numSesiones; s++) {
      checkCols.push(encodeColNameAE(6 + (s * 2)) + nextRow);
    }
    const formula = '=IF(C' + nextRow + '<>"", IFERROR(COUNTIF({' + checkCols.join(';') + '}, TRUE)/(COUNTIF({' + checkCols.join(';') + '}, TRUE)+COUNTIF({' + checkCols.join(';') + '}, FALSE)), ""), "")';
    sheetDest.getRange(nextRow, colAsistencia).setFormula(formula).setNumberFormat('0%');
  }

  if (colEtapa > 0) {
    sheetDest.getRange(nextRow, colEtapa).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Retirar Participante']).build());
  }

  // EN LUGAR DE BORRAR, SOLO MARCÁMOS
  sheetSrc.getRange(row, colAccionSrc).clearDataValidations().setValue('✅ Enviado a: ' + targetName).setBackground('#C8E6C9');
  
  actualizarReportesAE(); 
}

function encodeColNameAE(col) {
  let name = "";
  while (col > 0) {
    let mod = (col - 1) % 26;
    name = String.fromCharCode(65 + mod) + name;
    col = Math.floor((col - mod) / 26);
  }
  return name;
}

function moverARetiradx(sheet, row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetRetiradx = ss.getSheetByName('Retiradx');
  if (!sheetRetiradx) return;

  const data = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const colID = headers.indexOf('Creamos ID');
  const colNombre = headers.indexOf('Nombre Completo');
  const colTel = headers.indexOf('Teléfono');
  const colAsis = headers.indexOf('% Asis') !== -1 ? headers.indexOf('% Asis') : headers.indexOf('% Asistencia');

  const ui = SpreadsheetApp.getUi();
  const motivo = ui.prompt('❓ Motivo', 'Ingrese el motivo del retiro:', ui.ButtonSet.OK).getResponseText();

  // Header en Retiradx: ['Fecha Retiro', 'Creamos ID', 'Nombre Completo', 'Teléfono', 'Grupo de Origen', '% Asistencia', 'Motivo Retiradx']
  sheetRetiradx.appendRow([
    new Date(), 
    colID !== -1 ? data[colID] : 'S/I', 
    colNombre !== -1 ? data[colNombre] : 'S/N',
    colTel !== -1 ? data[colTel] : 'S/T', 
    sheet.getName(),
    colAsis !== -1 ? (data[colAsis] * 100).toFixed(0) + '%' : '0%', 
    motivo
  ]);

  sheet.deleteRow(row);
}

function autoCompletarDatosAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = ss.getSheetByName('Copy of CREAMOS ID nuevo');
  if (!source) return;

  const dataSrc = source.getDataRange().getValues();
  const map = {};
  dataSrc.forEach(r => {
    const id = String(r[1]).trim();
    if (id) map[id] = { nombre: r[0], anio: r[2], edad: r[3], dpi: r[4] };
  });

  const targetSheets = ['Referencias a grupos', 'Hoja de Interés', 'Graduadx', 'Retiradx'];
  targetSheets.forEach(name => {
    const s = ss.getSheetByName(name);
    if (!s) return;
    const data = s.getDataRange().getValues();
    const headers = data[0];
    const colID = headers.indexOf('Creamos ID');
    const colNombre = headers.indexOf('Nombre Completo');
    const colEdad = headers.indexOf('Edad');
    const colDPI = headers.indexOf('DPI');
    const colAnio = headers.indexOf('Año');

    for (let i = 1; i < data.length; i++) {
      const id = String(data[i][colID]).trim();
      const info = map[id];
      if (!info) continue;

      const valNombre = String(data[i][colNombre] || '').trim().toUpperCase();
      if (colNombre !== -1 && (!data[i][colNombre] || valNombre === 'SIN NOMBRE')) s.getRange(i+1, colNombre+1).setValue(info.nombre); 
      if (colEdad !== -1 && !data[i][colEdad]) s.getRange(i+1, colEdad+1).setValue(info.edad);
      if (colDPI !== -1 && !data[i][colDPI]) s.getRange(i+1, colDPI+1).setValue(info.dpi);
      if (colAnio !== -1 && !data[i][colAnio]) s.getRange(i+1, colAnio+1).setValue(info.anio);
    }
  });
}

function actualizarReportesAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hojaReporte = ss.getSheetByName('Reporte General');
  if (!hojaReporte) hojaReporte = ss.insertSheet('Reporte General');
  
  hojaReporte.clear();
  const sheetGrad = ss.getSheetByName('Graduadx');
  const sheetRet = ss.getSheetByName('Retiradx');
  
  const totalGraduadas = (sheetGrad && sheetGrad.getLastRow() > 1) ? sheetGrad.getLastRow() - 1 : 0;
  const totalRetiradx = (sheetRet && sheetRet.getLastRow() > 1) ? sheetRet.getLastRow() - 1 : 0;
  
  const sInt = ss.getSheetByName('Hoja de Interés');
  const sRef = ss.getSheetByName('Referencias a grupos');
  const sInst = ss.getSheetByName('Derivaciones_Institucionales');
  
  const totalInteres = (sInt && sInt.getLastRow() > 1 ? sInt.getLastRow() - 1 : 0);
  const totalRefs = (sRef && sRef.getLastRow() > 1 ? sRef.getLastRow() - 1 : 0);
  const totalInst = (sInst && sInst.getLastRow() > 1 ? sInst.getLastRow() - 1 : 0);

  const data = [
    ['📊 DASHBOARD APOYO EMOCIONAL', ''],
    ['📅 Fecha:', new Date()],
    ['', ''],
    ['📈 ESTADÍSTICAS GLOBALES', 'Valor'],
    ['📋 Referencias de Programas (Total)', totalRefs],
    ['🏢 Derivaciones Institucionales (Total)', totalInst],
    ['👤 Personas en Hoja de Interés', totalInteres],
    ['🎓 Graduadx Totales', totalGraduadas],
    ['🚪 Retiros Totales', totalRetiradx],
    ['', ''],
    ['📋 GRUPOS / COHORTES ACTUALES', 'Participantes']
  ];

  const exclude = ['Referencias a grupos', 'Hoja de Interés', 'Resumen de Grupos', 'Retiradx', 'Graduadx', 'Reporte General', 'Copy of CREAMOS ID nuevo', 'TEMPORAL_LIMPIEZA', '⚙️ CONFIGURACIÓN', 'LOG_KOBO', 'Derivaciones_Institucionales'];
  ss.getSheets().forEach(s => {
    const name = s.getName();
    if (!exclude.includes(name) && !name.includes('TEMPORAL')) {
      data.push([name, '=COUNTIFS(\''+name+'\'!C:C, "<>", \''+name+'\'!C:C, "<>Nombre Completo")']);
    }
  });

  if (data.length > 0) {
    hojaReporte.getRange(1, 1, data.length, 2).setValues(data);
    hojaReporte.getRange('A1:B1').merge().setBackground('#1F1B4B').setFontColor('white').setFontWeight('bold'); // Deep Indigo
    hojaReporte.getRange('A4:B4').setBackground('#E0E7FF').setFontWeight('bold'); // Soft Indigo
    hojaReporte.getRange('A11:B11').setBackground('#E0E7FF').setFontWeight('bold'); // Soft Indigo
    hojaReporte.setColumnWidth(1, 400);
    hojaReporte.setColumnWidth(2, 150);
    
    // Bordes y fuente
    hojaReporte.getRange(1, 1, data.length, 2).setFontFamily('Google Sans');
  }
}

function buscarIDFantasmaAE() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt('🔍 Buscar ID', 'Ingrese el Creamos ID o DPI a buscar en todas las hojas:', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() != ui.Button.OK) return;
  const target = res.getResponseText().trim().toUpperCase();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hallazgos = [];
  ss.getSheets().forEach(sheet => {
    const data = sheet.getDataRange().getValues();
    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < data[r].length; c++) {
        if (String(data[r][c]).toUpperCase().includes(target)) {
          hallazgos.push(`Hoja: "${sheet.getName()}" | Fila: ${r+1}`);
          break;
        }
      }
    }
  });
  alertSafeAE('🔍 Resultados', hallazgos.length > 0 ? hallazgos.join('\n') : 'No encontrado.');
}

function aplicarFormatosAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Notas para añadir tooltips explicativos sin necesidad de reinstalar
  const notasInteres = {
    'Fecha Import': '🗓️ Fecha en que se sincronizaron los datos desde KoboToolbox.',
    'Creamos ID': '🔑 ID único. Si no tiene, se evalúa por nombre+teléfono.',
    'Nombre Completo': '👤 Nombres y apellidos completos.',
    'Género': '⚧️ Género o pronombres seleccionados.',
    'Edad': '🎂 Edad en número entero. Calculada automáticamente.',
    'Teléfono': '📞 Número celular (solo dígitos).',
    'DPI': '🪪 Documento Personal de Identificación.',
    'Zona': '📍 Ubicación, zona o colonia.',
    'Servicios de Interés': '📋 Grupos de apoyo detectados para esta persona.',
    'Notas Originales': '📝 Observaciones extra del formulario.',
    'Acción': '⚡ Selecciona un grupo aquí para mover mágicamente al participante.'
  };

  ss.getSheets().forEach(s => {
    const name = s.getName();
    const excludeList = ['Reporte General', '⚙️ CONFIGURACIÓN', 'LOG_KOBO', 'TEMPORAL_LIMPIEZA'];
    if (excludeList.includes(name) || name.includes('TEMPORAL')) return;
    
    const lastRow = s.getLastRow();
    const lastCol = s.getLastColumn();
    if (lastRow < 1 || lastCol < 1) return;
    
    // Establecer la fuente profesional Google Sans
    const maxRows = Math.max(1, s.getMaxRows());
    const maxCols = Math.max(1, s.getMaxColumns());
    s.getRange(1, 1, maxRows, maxCols)
      .setBackground(null)
      .setBorder(false, false, false, false, false, false)
      .setFontFamily('Google Sans');
      
    // Encabezados con diseño moderno (Indigo 900)
    s.getRange(1, 1, 1, lastCol)
      .setBackground('#1E1B4B') 
      .setFontColor('white')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
      
    // Filas alternas
    if (lastRow > 1) {
      const numRowsApply = lastRow - 1;
      const dataRange = s.getRange(2, 1, numRowsApply, lastCol);
      try { 
        dataRange.getBandings().forEach(b => b.remove()); 
        dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY); 
      } catch(e) {}
    }
    
    // Ajustar columnas y tooltips
    if (['Referencias a grupos', 'Hoja de Interés', 'Derivaciones_Institucionales'].includes(name)) {
      const headers = s.getRange(1, 1, 1, lastCol).getValues()[0];
      headers.forEach((h, i) => {
        if (notasInteres[h]) s.getRange(1, i + 1).setNote(notasInteres[h]);
      });
      const colAccion = headers.indexOf('Hoja de Interés') + 1;
      if (colAccion > 0) s.setColumnWidth(colAccion, 180);
    }
    
    // Scroll frozen y formato de asistencia
    const hData = s.getRange(1, 1, 1, lastCol).getValues()[0];
    if (hData.includes('% Asistencia')) {
      try {
        if (s.getMaxRows() > 1) s.setFrozenRows(1);
        if (s.getMaxColumns() >= 3) s.setFrozenColumns(3); 
      } catch(e) {}
    }
  });
}

function sincronizarHojaInteresAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('⚙️ CONFIGURACIÓN');
  const url = configSheet ? configSheet.getRange('B4').getValue() : CONFIG_AE.KOBO_URL_2026;
  importarDesdeKoboAE(url, 'Hoja de Interés');
}

function importarHistorico25AE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('⚙️ CONFIGURACIÓN');
  const url = configSheet ? configSheet.getRange('B3').getValue() : CONFIG_AE.KOBO_URL_2025;
  importarDesdeKoboAE(url, 'Hoja de Interés'); // Solo se importaría de forma puntual desde el menú
}

function sincronizarHojaInstitucionalAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('⚙️ CONFIGURACIÓN');
  let url = CONFIG_AE.KOBO_URL_INSTITUCIONAL;
  if (configSheet) {
    const data = configSheet.getDataRange().getValues();
    if (data[4] && data[4][1]) url = data[4][1];
  }
  importarDesdeKoboAE(url, 'Derivaciones_Institucionales');
}

function importarTodoAE() {
  ejecutarImportacionAutomaticaAE(); // Referencias
  sincronizarHojaInteresAE();        // Interés 2026
  sincronizarHojaInstitucionalAE();  // Institucional
}

function diagnosticoKoboAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('⚙️ CONFIGURACIÓN');
  let urlRef = CONFIG_AE.KOBO_URL;
  if (configSheet) {
    const raw = configSheet.getDataRange().getValues();
    if (raw[1] && raw[1][1]) urlRef = raw[1][1];
  }
  try {
    const resp = UrlFetchApp.fetch(urlRef, { muteHttpExceptions: true });
    alertSafeAE('Conexión KOBO', 'Status HTTP: ' + resp.getResponseCode());
  } catch(e) {}
}

function inicializarHojaConfiguracionAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('⚙️ CONFIGURACIÓN') || ss.insertSheet('⚙️ CONFIGURACIÓN');
  sheet.clear();
  const rows = [
    ['⚙️ AJUSTES DE CONEXIÓN KOBO', 'VALOR (URL CSV PÚBLICA)'],
    ['🔗 URL Nuevos Referidos (Actual)', CONFIG_AE.KOBO_URL],
    ['🔗 URL Históricos 2025 (1 vez)', CONFIG_AE.KOBO_URL_2025],
    ['🔗 URL Hoja de Interés 2026', CONFIG_AE.KOBO_URL_2026],
    ['🔗 URL Derivaciones Institucionales', CONFIG_AE.KOBO_URL_INSTITUCIONAL]
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange(1, 1, 1, 2).setBackground('#4a148c').setFontColor('#ffffff').setFontWeight('bold');
  sheet.setColumnWidth(1, 400); sheet.setColumnWidth(2, 600);
}

function configurarKoboURLAE() {
  inicializarHojaConfiguracionAE();
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('⚙️ CONFIGURACIÓN').activate();
}

function gestionarActivadoresAEToggle() {
  const triggers = ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'importarTodoAE');
  if (triggers.length > 0) {
    eliminarActivadoresAE();
    alertSafeAE('📴 OFF', 'Actualización automática desactivada para las hojas principales.');
  } else {
    eliminarActivadoresAE();
    // Activa la actualización cada 1 minuto
    ScriptApp.newTrigger('importarTodoAE').timeBased().everyMinutes(1).create();
    alertSafeAE('🕒 ON', 'Actualización de Interés, Referencias e Institucionales activada (cada 1 min).');
  }
}

function ejecutarImportacionAutomaticaAE() {
  importarDesdeKoboAE(null, 'Referencias a grupos');
}

function eliminarActivadoresAE() {
  ScriptApp.getProjectTriggers().forEach(t => {
    ScriptApp.deleteTrigger(t);
  });
}

function parsearCSVManualAE(csv, sep) {
  const result = []; let row = []; let field = ''; let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]; const nextChar = csv[i + 1];
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += char; }
    } else {
      if (char === '"') { inQuotes = true; } 
      else if (char === sep) { row.push(field.trim()); field = ''; } 
      else if (char === '\n' || char === '\r') {
        row.push(field.trim());
        if (row.length > 1 || (row.length === 1 && row[0] !== '')) result.push(row);
        row = []; field = '';
        if (char === '\r' && nextChar === '\n') i++; 
      } else { field += char; }
    }
  }
  if (field || row.length > 0) { row.push(field.trim()); result.push(row); }
  return result.filter(r => r.length > 1);
}

function limpiarPropiedadesSistemaAE() {
  PropertiesService.getDocumentProperties().deleteAllProperties();
  toastSafeAE('🧹 Memoria limpia.');
}

function eliminarDuplicadosManualAE() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojas = ['Referencias a grupos', 'Hoja de Interés'];
  let totalBorrados = 0;
  hojas.forEach(nombre => {
    const sheet = ss.getSheetByName(nombre);
    if (!sheet || sheet.getLastRow() < 2) return;
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const colID = headers.indexOf('Creamos ID');
    const colNombre = headers.indexOf('Nombre Completo');
    const colTel = headers.indexOf('Teléfono');
    const firmasVistas = new Set();
    const filasABorrar = [];
    for (let i = 1; i < data.length; i++) {
      const id = String(data[i][colID] || '').trim().toUpperCase();
      const nom = String(data[i][colNombre] || '').trim().toUpperCase();
      const tel = String(data[i][colTel] || '').trim().replace(/\D/g, '');
      const firma = id ? 'ID:' + id : 'SIG:' + nom + '|' + tel;
      if (firmasVistas.has(firma) || (!nom && !tel)) filasABorrar.push(i + 1);
      else firmasVistas.add(firma);
    }
    for (let j = filasABorrar.length - 1; j >= 0; j--) {
      sheet.deleteRow(filasABorrar[j]);
      totalBorrados++;
    }
  });
  alertSafeAE('🧹 Limpieza Terminada', 'Se eliminaron ' + totalBorrados + ' registros.');
}

function rescatarDatosInteresAE() {
  toastSafeAE('Iniciando rescate de datos.');
}
