/**
 * =====================================================================
 * CORRECCIONES PARA EL SISTEMA DE APOYO EMOCIONAL
 * =====================================================================
 *
 * INSTRUCCIONES:
 * 1. Busca las funciones que se mencionan abajo en tu código actual
 * 2. Reemplaza cada función COMPLETA por la versión corregida aquí
 * 3. NO elimines nada más, solo reemplaza estas funciones específicas
 *
 * =====================================================================
 */

// =====================================================================
// CORRECCIÓN #1: Función crearNuevoGrupoAE()
// =====================================================================
/**
 * PROBLEMA CORREGIDO:
 * - Los checkboxes se ponían en TODAS las columnas (incluidas las de Evolución)
 * - Ahora solo se ponen en las columnas de ASISTENCIA (columnas impares)
 *
 * BUSCA EN TU CÓDIGO la función "crearNuevoGrupoAE" y reemplázala COMPLETA por esta:
 */
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

  const sheet = ss.insertSheet(grupoNombre);
  const numRows = sheet.getMaxRows() - 1;
  const headers = ['Año', 'Creamos ID', 'Nombre Completo', 'Teléfono', '% Asistencia'];
  const colSesionesOffset = headers.length; // Columna 5

  for (let s = 1; s <= numSesiones; s++) {
    let fechaSesion = new Date(fechaInicio);
    fechaSesion.setDate(fechaInicio.getDate() + (s - 1) * 7);
    let labelFecha = Utilities.formatDate(fechaSesion, Session.getScriptTimeZone(), 'dd/MM');
    headers.push('S' + s + ' (' + labelFecha + ')');
    headers.push('Evolución S' + s);
  }
  headers.push('Etapa');

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#1E1B4B').setFontColor('white').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');

  if (numRows > 0) {
    sheet.getRange(2, 1, numRows, 1).setValue(2026);
  }

  // ======================================================================
  // 🔧 CORRECCIÓN PRINCIPAL: Checkboxes SOLO en columnas de ASISTENCIA
  // ======================================================================
  if (numSesiones > 0 && numRows > 0) {
    let rules = sheet.getConditionalFormatRules();

    for (let s = 0; s < numSesiones; s++) {
      // Calcular columna de asistencia (son las columnas IMPARES después de la 5)
      // S1 = columna 6, S2 = columna 8, S3 = columna 10, etc.
      const colAsistencia = colSesionesOffset + 1 + (s * 2); // 6, 8, 10, 12...
      const colEvolucion = colAsistencia + 1;                 // 7, 9, 11, 13...

      // ✅ SOLO aplicar checkboxes a la columna de ASISTENCIA
      const rangeAsistencia = sheet.getRange(2, colAsistencia, numRows, 1);
      rangeAsistencia.insertCheckboxes()
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle');

      // ✅ Formato condicional para asistencias marcadas (verde)
      const ruleTrue = SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=" + encodeColNameAE(colAsistencia) + "2=TRUE")
        .setBackground('#D1FAE5') // Emerald 100
        .setFontColor('#065F46')   // Emerald 800
        .setRanges([rangeAsistencia])
        .build();

      rules.push(ruleTrue);

      // ✅ Ajustar anchos de columnas
      sheet.setColumnWidth(colAsistencia, 50);  // Checkbox angosto
      sheet.setColumnWidth(colEvolucion, 200);   // Evolución más ancha
    }

    sheet.setConditionalFormatRules(rules);

    // ✅ Fórmula de % de asistencia (columna E)
    for (let r = 2; r <= numRows + 1; r++) {
       let checkCols = [];
       for (let s = 0; s < numSesiones; s++) {
         const colAsis = colSesionesOffset + 1 + (s * 2);
         checkCols.push(encodeColNameAE(colAsis) + r);
       }
       const formula = '=IF(C' + r + '<>"", (COUNTIF({' + checkCols.join(';') + '}, TRUE)/' + numSesiones + '), "")';
       sheet.getRange(r, 5).setFormula(formula).setNumberFormat('0%')
         .setHorizontalAlignment('center').setFontWeight('bold');
    }
  }

  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(4);

  // Validación para columna "Etapa" (Retirar Participante)
  const colEtapa = headers.length;
  const validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Retirar Participante'])
    .build();
  if (numRows > 0 && colEtapa > 0) {
    sheet.getRange(2, colEtapa, numRows, 1).setDataValidation(validation);
  }

  // Registrar en Resumen de Grupos
  const hojaResumen = ss.getSheetByName('Resumen de Grupos');
  if (hojaResumen) {
    const headersRes = ['Nombre del Grupo', 'Tipo', 'Responsable', 'Sesiones', 'Inscritos', '% Asistencia', 'Estado', 'Fecha Creación', 'Cupo Máximo'];
    hojaResumen.getRange(1, 1, 1, headersRes.length).setValues([headersRes])
      .setBackground('#1e1b4b').setFontColor('white').setFontWeight('bold');
    hojaResumen.appendRow([
      grupoNombre + ' (' + nombreModalidad + ')',
      nombreTipo,
      responsable,
      numSesiones,
      '=COUNTIFS(\'' + grupoNombre + '\'!C:C, "<>", \'' + grupoNombre + '\'!C:C, "<>Nombre Completo")',
      '=IFERROR(AVERAGE(\'' + grupoNombre + '\'!E2:E' + (numRows + 1) + '), 0)',
      'Activo',
      new Date(),
      cupoMax
    ]);
    hojaResumen.getRange(hojaResumen.getLastRow(), 6).setNumberFormat('0%');
  }

  configurarValidacionesAE();
  aplicarFormatosAE();
  actualizarReportesAE();

  alertSafeAE('🎉 ¡Éxito!', 'El grupo "' + grupoNombre + '" ha sido creado correctamente.');
}


// =====================================================================
// CORRECCIÓN #2: Función onEdit()
// =====================================================================
/**
 * PROBLEMA CORREGIDO:
 * - Se eliminó la llamada automática a gestionarAsistenciaYEvolucionAE()
 * - Ahora NO pregunta nada al hacer clic en checkboxes
 * - Puedes escribir evoluciones directamente en las celdas
 * - La función masiva sigue disponible en el menú
 *
 * BUSCA EN TU CÓDIGO la función "onEdit" y reemplázala COMPLETA por esta:
 */
function onEdit(e) {
  if (!e) return;
  const range = e.range;
  const sheet = range.getSheet();
  const value = e.value;
  const col = range.getColumn();
  const row = range.getRow();

  // ✅ Retirar participante
  if (value === 'Retirar Participante' && row > 1) {
    moverARetiradx(sheet, row);
  }

  // ✅ Enviar a grupo desde Hoja de Interés
  if (col === 11 && value && row > 1 && sheet.getName() === 'Hoja de Interés' && value !== 'Si' && value !== 'No') {
    enviarAHojaGrupoAE(sheet, row, value);
  }

  // ❌ ELIMINADO: Ya NO se llama automáticamente a gestionarAsistenciaYEvolucionAE()
  // Esto permite que:
  // 1. Los checkboxes funcionen normalmente SIN preguntas molestas
  // 2. Puedas escribir evoluciones directamente en las celdas
  // 3. Usar la función masiva desde el menú cuando lo necesites

  /* CÓDIGO ANTERIOR (COMENTADO):
  if (sheet.getName().includes('(2026)') && col >= 6 && (col % 2 === 0)) {
    gestionarAsistenciaYEvolucionAE(e);
  }
  */
}


// =====================================================================
// CORRECCIÓN #3: Función gestionarAsistenciaYEvolucionAE()
// =====================================================================
/**
 * CAMBIO:
 * - Esta función ya NO se llama automáticamente
 * - Se mantiene el código por si decides usarla manualmente en el futuro
 * - Pero está DESACTIVADA para uso automático
 *
 * PUEDES DEJAR ESTA FUNCIÓN COMO ESTÁ (no se usa automáticamente ahora)
 * o ELIMINARLA si quieres limpiar el código
 */
function gestionarAsistenciaYEvolucionAE(e) {
  // ⚠️ FUNCIÓN DESACTIVADA - Ya no se llama automáticamente desde onEdit()
  // Se mantiene por compatibilidad pero NO está en uso

  const range = e.range;
  const sheet = range.getSheet();
  const ui = SpreadsheetApp.getUi();
  const col = range.getColumn();
  const row = range.getRow();

  const isChecked = range.getValue();

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
  } else if (isChecked === false) {
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


// =====================================================================
// ✅ LA FUNCIÓN MASIVA SE MANTIENE INTACTA
// =====================================================================
/**
 * Esta función NO necesita cambios.
 * Sigue funcionando perfectamente desde el menú:
 * "💜 Apoyo Emocional" → "👥 Gestión de Grupos" → "📝 Registrar Nota Masiva (Sesión)"
 *
 * NO HAY QUE MODIFICAR NADA EN: mostrarDialogoNotaMasivaAE()
 */


// =====================================================================
// 📝 RESUMEN DE CAMBIOS
// =====================================================================
/**
 * ✅ PROBLEMA 1 RESUELTO: Checkboxes solo en columnas de Asistencia
 *    - Antes: Se ponían en TODAS las columnas (asistencia + evolución)
 *    - Ahora: Solo en columnas IMPARES (S1, S2, S3... no en Evolución)
 *
 * ✅ PROBLEMA 2 RESUELTO: Eliminada pregunta automática
 *    - Antes: Al hacer clic en checkbox preguntaba por evolución
 *    - Ahora: Checkboxes funcionan normalmente sin interrupciones
 *
 * ✅ MANTENIDO: Escritura directa en celdas de evolución
 *    - Puedes escribir directamente en las celdas de "Evolución S1", etc.
 *
 * ✅ MANTENIDO: Función masiva desde el menú
 *    - Sigue disponible en: Menú → Gestión de Grupos → Registrar Nota Masiva
 *
 *
 * 📋 INSTRUCCIONES DE APLICACIÓN:
 * ================================
 *
 * 1. Abre tu Google Apps Script actual
 * 2. Busca la función "crearNuevoGrupoAE" y reemplázala COMPLETA
 * 3. Busca la función "onEdit" y reemplázala COMPLETA
 * 4. OPCIONAL: Puedes eliminar "gestionarAsistenciaYEvolucionAE" o dejarla comentada
 * 5. Guarda el script
 * 6. Prueba creando un nuevo grupo
 *
 * ¡LISTO! 🎉
 */
