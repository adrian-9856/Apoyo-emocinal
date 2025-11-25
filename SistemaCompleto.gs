/**
 * =====================================================================
 * SISTEMA DE APOYO EMOCIONAL - CÓDIGO COMPLETO QUE FUNCIONA
 * =====================================================================
 *
 * INSTALACIÓN:
 * 1. Copiar TODO este archivo
 * 2. Apps Script → Pegar
 * 3. Cambiar email línea 641
 * 4. Guardar (Ctrl+S)
 * 5. Ejecutar: instalarSistema
 * 6. Apps Script → Activadores → + Agregar activador
 *    - Función: alEditar
 *    - Tipo de evento: Al editar
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
    .addToUi();
}

// =====================================================================
// INSTALACIÓN COMPLETA
// =====================================================================

function instalarSistema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // 1. Crear hojas
    ss.toast('Creando hojas...', 'Instalando', 3);
    crearHojas();

    // 2. Configurar validaciones
    ss.toast('Configurando validaciones...', 'Instalando', 3);
    configurarValidaciones();

    // 3. Configurar formatos
    ss.toast('Aplicando formatos...', 'Instalando', 3);
    configurarFormatos();

    // 4. Crear datos ejemplo
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

  // Verificar hojas
  const hojasRequeridas = ['Lista de Espera', 'Nuevos Ingresos', 'Terapias',
                           'Procesos Culminados', 'Deserciones', 'Gestión de Casos', 'Reporte'];
  let hojasOk = 0;
  hojasRequeridas.forEach(nombre => {
    if (ss.getSheetByName(nombre)) {
      hojasOk++;
    }
  });
  mensaje += '✅ Hojas: ' + hojasOk + '/7\n';

  // Verificar trigger
  let triggerOk = false;
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'alEditar') {
      triggerOk = true;
    }
  });
  mensaje += (triggerOk ? '✅' : '❌') + ' Trigger: ' + (triggerOk ? 'Configurado' : 'FALTA CONFIGURAR') + '\n\n';

  if (!triggerOk) {
    mensaje += 'DEBES CREAR EL TRIGGER:\n' +
               'Apps Script → Activadores → + Agregar\n' +
               'Función: alEditar\n' +
               'Tipo: Al editar';
  } else {
    mensaje += '🎉 TODO LISTO PARA USAR';
  }

  ss.toast(mensaje, 'Verificación', -1);
}

// =====================================================================
// CREAR HOJAS
// =====================================================================

function crearHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar hojas existentes excepto la primera
  const hojas = ss.getSheets();
  for (let i = hojas.length - 1; i > 0; i--) {
    ss.deleteSheet(hojas[i]);
  }

  // Renombrar primera hoja
  hojas[0].setName('Nuevos Ingresos');

  // Crear todas las hojas
  crearListaEspera();
  crearNuevosIngresos();
  crearTerapias();
  crearProcesosCulminados();
  crearDeserciones();
  crearGestionCasos();
  crearReporte();
}

function crearListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Lista de Espera', 0);

  // Headers
  const headers = [
    'Fecha Solicitud', 'No.', 'Nombre Completo', 'Creemos ID', 'Género',
    'Rango Edad', 'Malestar Principal', 'Derivado Por', 'Contacto Emergencia',
    'Teléfono', 'Observaciones', 'Acción'
  ];

  sheet.getRange(1, 1, 1, 12).setValues([headers])
    .setBackground('#e91e63')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Fórmulas
  sheet.getRange('A2').setFormula('=IF(C2<>"",HOY(),"")');
  sheet.getRange('B2').setFormula('=IF(C2<>"",FILA()-1,"")');
  sheet.getRange('A2:B2').copyTo(sheet.getRange('A3:B100'), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Anchos
  [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 100].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Proteger fórmulas
  sheet.getRange('A2:A100').protect().setWarningOnly(true);
  sheet.getRange('B2:B100').protect().setWarningOnly(true);
}

function crearNuevosIngresos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Nuevos Ingresos');
  sheet.clear();

  // Headers
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

  // Fórmulas
  sheet.getRange('A2').setFormula('=IF(C2<>"",HOY(),"")');
  sheet.getRange('B2').setFormula('=IF(C2<>"",FILA()-1,"")');
  sheet.getRange('A2:B2').copyTo(sheet.getRange('A3:B100'), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Anchos
  [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
}

function crearTerapias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Terapias');

  // Headers
  const headers = [
    'Terapeuta', 'Participante', 'Creemos ID', 'Género',
    'Tipo Terapia', 'No. Sesión', 'Estado', 'Motivo Finalización'
  ];

  sheet.getRange(1, 1, 1, 8).setValues([headers])
    .setBackground('#2e7d32')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Anchos
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
    ['📊 REPORTE AUTOMÁTICO'],
    ['Última actualización:', '=AHORA()'],
    [''],
    ['👥 NUEVOS INGRESOS'],
    ['Total ingresos', "=CONTARA('Nuevos Ingresos'!C:C)-1"],
    ['Pendientes asignar', "=CONTAR.SI.CONJUNTO('Nuevos Ingresos'!K:K,\"\";'Nuevos Ingresos'!C:C,\"<>\")"],
    [''],
    ['👩‍⚕️ CASOS ACTIVOS'],
    ['Gerber', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Gerber";Terapias!G:G,"En proceso")'],
    ['Melissa', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Melissa";Terapias!G:G,"En proceso")'],
    ['Diana', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Diana";Terapias!G:G,"En proceso")'],
    ['Karina', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Karina";Terapias!G:G,"En proceso")'],
    ['Total activos', '=B9+B10+B11+B12'],
    [''],
    ['🎉 CULMINADOS'],
    ['Total', "=CONTARA('Procesos Culminados'!A:A)-1"],
    [''],
    ['⚠️ DESERCIONES'],
    ['Total', '=CONTARA(Deserciones!A:A)-1'],
    [''],
    ['📋 GESTIÓN'],
    ['Total', "=CONTARA('Gestión de Casos'!A:A)-1"]
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);
  sheet.getRange('A1:B1')
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(14);

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
}

// =====================================================================
// CONFIGURAR VALIDACIONES (DESPLEGABLES)
// =====================================================================

function configurarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');
  const terapias = ss.getSheetByName('Terapias');
  const espera = ss.getSheetByName('Lista de Espera');

  // GÉNERO en Nuevos Ingresos
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('E2:E200').setDataValidation(generoRule);

  // TIPO ATENCIÓN en Nuevos Ingresos
  const tipoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Individual', 'Grupal', 'Familiar', 'Pareja'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('H2:H200').setDataValidation(tipoRule);

  // TERAPEUTA en Nuevos Ingresos
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('K2:K200').setDataValidation(terapeutaRule);

  // NO. SESIÓN en Terapias (1-20)
  const sesiones = [];
  for (let i = 1; i <= 20; i++) {
    sesiones.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesiones)
    .setAllowInvalid(false)
    .build();
  terapias.getRange('F2:F200').setDataValidation(sesionRule);

  // ESTADO en Terapias
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['En proceso', 'Finalizado'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('G2:G200').setDataValidation(estadoRule);

  // ACCIÓN en Lista de Espera
  const accionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Enviar'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('L2:L200').setDataValidation(accionRule);
}

// =====================================================================
// CONFIGURAR FORMATOS
// =====================================================================

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

// =====================================================================
// CREAR DATOS DE EJEMPLO
// =====================================================================

function crearEjemplos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');

  const ejemplos = [
    ['María González', 'MG001', 'Mujer', '26 a 30', 'Ansiedad', 'Individual', 'Centro Salud', 'Juan Pérez - 12345678'],
    ['Carlos López', 'CL002', 'Hombre', '31 a 40', 'Depresión', 'Individual', 'Derivación', 'Ana López - 87654321']
  ];

  nuevos.getRange(2, 3, ejemplos.length, 8).setValues(ejemplos);
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

  // ===== AUTOMATIZACIÓN 1: Lista de Espera → Nuevos Ingresos =====
  if (hoja === 'Lista de Espera' && columna === 12 && val === 'Enviar') {
    enviarANuevosIngresos(sheet, fila);
  }

  // ===== AUTOMATIZACIÓN 2: Nuevos Ingresos → Terapias =====
  if (hoja === 'Nuevos Ingresos' && columna === 11) {
    if (['Gerber', 'Melissa', 'Diana', 'Karina'].indexOf(val) !== -1) {
      asignarATerapias(sheet, fila, val);
    }
  }

  // ===== AUTOMATIZACIÓN 3: Terapias → Finalización =====
  if (hoja === 'Terapias' && columna === 7 && val === 'Finalizado') {
    finalizarTerapia(sheet, fila);
  }
}

// =====================================================================
// AUTOMATIZACIÓN 1: Lista de Espera → Nuevos Ingresos
// =====================================================================

function enviarANuevosIngresos(sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName('Nuevos Ingresos');

  // Obtener datos (columnas C-J de Lista Espera)
  const datos = sheetOrigen.getRange(fila, 3, 1, 8).getValues()[0];
  const nombre = datos[0]; // C
  const creemosId = datos[1]; // D
  const genero = datos[2]; // E
  const rangoEdad = datos[3]; // F
  const malestar = datos[4]; // G
  const derivadoPor = datos[5]; // H
  const contacto = datos[6]; // I

  if (!nombre || nombre.toString().trim() === '') return;

  const nombreLimpio = nombre.toString().trim();

  // Verificar si ya existe
  const datosNuevos = nuevos.getDataRange().getValues();
  for (let i = 1; i < datosNuevos.length; i++) {
    if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#d4edda');
      ss.toast(nombreLimpio + ' ya existe en Nuevos Ingresos', 'Ya Registrado', 2);
      return;
    }
  }

  // Insertar en Nuevos Ingresos
  const nuevaFila = nuevos.getLastRow() + 1;
  nuevos.getRange(nuevaFila, 3).setValue(nombreLimpio);
  nuevos.getRange(nuevaFila, 4).setValue(creemosId || '');
  nuevos.getRange(nuevaFila, 5).setValue(genero || '');
  nuevos.getRange(nuevaFila, 6).setValue(rangoEdad || '');
  nuevos.getRange(nuevaFila, 7).setValue(malestar || '');
  nuevos.getRange(nuevaFila, 8).setValue('Individual');
  nuevos.getRange(nuevaFila, 9).setValue(derivadoPor || '');
  nuevos.getRange(nuevaFila, 10).setValue(contacto || '');

  sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#d4edda');
  ss.toast('✅ ' + nombreLimpio + '\nMovido a Nuevos Ingresos', 'Enviado', 3);
}

// =====================================================================
// AUTOMATIZACIÓN 2: Nuevos Ingresos → Terapias
// =====================================================================

function asignarATerapias(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias');

  // Obtener datos de Nuevos Ingresos
  const datos = sheetOrigen.getRange(fila, 3, 1, 9).getValues()[0];
  const nombre = datos[0]; // C
  const creemosId = datos[1]; // D
  const genero = datos[2]; // E
  const tipoAtencion = datos[5]; // H

  if (!nombre || nombre.toString().trim() === '') return;

  const nombreLimpio = nombre.toString().trim();

  // Verificar si ya está en Terapias
  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][1] && datosTerapias[i][1].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');
      ss.toast(nombreLimpio + ' ya está en Terapias', 'Ya Asignado', 2);
      return;
    }
  }

  // Crear registro en Terapias (8 columnas)
  const nuevaFila = terapias.getLastRow() + 1;
  const registro = [
    terapeuta,                       // A - Terapeuta
    nombreLimpio,                    // B - Participante
    creemosId || '',                 // C - Creemos ID
    genero || '',                    // D - Género
    tipoAtencion || 'Individual',    // E - Tipo Terapia
    '1',                             // F - No. Sesión
    'En proceso',                    // G - Estado
    ''                               // H - Motivo
  ];

  terapias.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
  sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta, 'Asignado a Terapias', 3);
}

// =====================================================================
// AUTOMATIZACIÓN 3: Terapias → Finalización
// =====================================================================

function finalizarTerapia(sheetOrigen, fila) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Obtener datos (8 columnas)
  const datos = sheetOrigen.getRange(fila, 1, 1, 8).getValues()[0];
  const terapeuta = datos[0]; // A
  const participante = datos[1]; // B
  const creemosId = datos[2]; // C
  const genero = datos[3]; // D
  const tipoTerapia = datos[4]; // E
  const numSesion = datos[5]; // F

  if (!participante || participante.toString().trim() === '') return;

  const nombre = participante.toString().trim();

  // Preguntar tipo de finalización
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

  // Preguntar motivo
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

  // Actualizar motivo en columna H
  sheetOrigen.getRange(fila, 8).setValue(motivo);

  // Enviar email
  enviarEmailFinalizacion(nombre, terapeuta, tipo, motivo, numSesion);

  // Copiar a hoja correspondiente
  let ok = false;
  if (tipo === 'Proceso culminado') {
    ok = copiarACulminados(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipo === 'Deserción') {
    ok = copiarADeserciones(nombre, terapeuta, creemosId, numSesion, motivo);
  } else if (tipo === 'Gestión de casos') {
    ok = copiarAGestion(nombre, terapeuta, creemosId, tipoTerapia, motivo);
  }

  if (ok) {
    // Colorear según tipo
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
// FUNCIONES DE SOPORTE
// =====================================================================

function enviarEmailFinalizacion(participante, terapeuta, tipo, motivo, sesiones) {
  try {
    // ⚠️ CAMBIAR ESTE EMAIL POR EL EMAIL REAL DEL DIRECTOR
    const emailDirector = 'director@apoyoemocional.org';

    const asunto = 'Finalización: ' + participante;
    const cuerpo =
      'CASO FINALIZADO\n\n' +
      'Participante: ' + participante + '\n' +
      'Terapeuta: ' + terapeuta + '\n' +
      'Tipo: ' + tipo + '\n' +
      'Sesiones: ' + sesiones + '\n\n' +
      'Motivo:\n' + motivo + '\n\n' +
      'Fecha: ' + new Date().toLocaleDateString();

    MailApp.sendEmail(emailDirector, asunto, cuerpo);
    return true;
  } catch (error) {
    Logger.log('Error email: ' + error.message);
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
