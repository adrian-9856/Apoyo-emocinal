/**
 * =====================================================================
 * SISTEMA DE APOYO EMOCIONAL - CÓDIGO COMPLETO QUE FUNCIONA
 * =====================================================================
 *
 * INSTALACIÓN:
 * 1. Copiar TODO este archivo
 * 2. Apps Script → Pegar
 * 3. Cambiar email línea 638
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
    .addSeparator()
    .addItem('📊 Actualizar Reportes', 'actualizarReportes')
    .addItem('💾 Guardar Reporte Mensual', 'guardarReporteMensual')
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
                           'Procesos Culminados', 'Deserciones', 'Gestión de Casos', 
                           'Reporte', 'Reportes Mensuales'];
  let hojasOk = 0;
  hojasRequeridas.forEach(nombre => {
    if (ss.getSheetByName(nombre)) hojasOk++;
  });
  mensaje += '✅ Hojas: ' + hojasOk + '/8\n';

  let triggerOk = false;
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'alEditar') triggerOk = true;
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
  crearReporte();
  crearReportesMensuales();
}

function crearListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet('Lista de Espera', 0);

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

  sheet.getRange('A2').setFormula('=IF(C2<>"",HOY(),"")');
  sheet.getRange('B2').setFormula('=IF(C2<>"",FILA()-1,"")');
  sheet.getRange('A2:B2').copyTo(sheet.getRange('A3:B100'), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 100].forEach((w, i) => {
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

  sheet.getRange('A2').setFormula('=IF(C2<>"",HOY(),"")');
  sheet.getRange('B2').setFormula('=IF(C2<>"",FILA()-1,"")');
  sheet.getRange('A2:B2').copyTo(sheet.getRange('A3:B100'), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150].forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });
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
    ['🔄 Última actualización:', '=AHORA()'],
    ['📅 Mes actual:', '=TEXTO(HOY(),"MMMM YYYY")'],
    ['', ''],
    ['👥 NUEVOS INGRESOS', ''],
    ['Total ingresos', '=CONTARA(\'Nuevos Ingresos\'!C:C)-1'],
    ['Ingresos este mes', '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!A:A,">="&FECHA(AÑO(HOY()),MES(HOY()),1),\'Nuevos Ingresos\'!A:A,"<="&FIN.MES(HOY(),0))'],
    ['Pendientes asignar', '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K,"",\'Nuevos Ingresos\'!C:C,"<>")'],
    ['Ya asignados', '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K,"<>",\'Nuevos Ingresos\'!C:C,"<>")'],
    ['', ''],
    ['👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA', ''],
    ['Gerber - Casos activos', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Gerber",Terapias!G:G,"En proceso")'],
    ['Melissa - Casos activos', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Melissa",Terapias!G:G,"En proceso")'],
    ['Diana - Casos activos', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Diana",Terapias!G:G,"En proceso")'],
    ['Karina - Casos activos', '=CONTAR.SI.CONJUNTO(Terapias!A:A,"Karina",Terapias!G:G,"En proceso")'],
    ['Total casos activos', '=B12+B13+B14+B15'],
    ['', ''],
    ['🎉 PROCESOS CULMINADOS', ''],
    ['Total culminados', '=CONTARA(\'Procesos Culminados\'!A:A)-1'],
    ['Culminados este mes', '=CONTAR.SI.CONJUNTO(\'Procesos Culminados\'!A:A,">="&FECHA(AÑO(HOY()),MES(HOY()),1),\'Procesos Culminados\'!A:A,"<="&FIN.MES(HOY(),0))'],
    ['Promedio sesiones', '=SI(B19>0,PROMEDIO(\'Procesos Culminados\'!E:E),0)'],
    ['', ''],
    ['⚠️ DESERCIONES', ''],
    ['Total deserciones', '=CONTARA(Deserciones!A:A)-1'],
    ['Deserciones este mes', '=CONTAR.SI.CONJUNTO(Deserciones!A:A,">="&FECHA(AÑO(HOY()),MES(HOY()),1),Deserciones!A:A,"<="&FIN.MES(HOY(),0))'],
    ['Tasa deserción', '=SI((B19+B23)>0,B23/(B19+B23)*100&"%","0%")'],
    ['', ''],
    ['📋 GESTIÓN DE CASOS', ''],
    ['Total en gestión', '=CONTARA(\'Gestión de Casos\'!A:A)-1'],
    ['', ''],
    ['📊 ESTADÍSTICAS GENERALES', ''],
    ['Total casos procesados', '=B19+B23+B27'],
    ['Tasa de éxito', '=SI(B30>0,B19/B30*100&"%","0%")'],
    ['Casos activos', '=B16']
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  sheet.getRange('A1:B1').merge()
    .setBackground('#1f4788')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(14)
    .setHorizontalAlignment('center');

  const sectionRows = [5, 11, 18, 23, 28, 31];
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

  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Hombre', 'Mujer', 'Trans hombre', 'No binario', 'Otro'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('E2:E200').setDataValidation(generoRule);

  const tipoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Individual', 'Grupal', 'Familiar', 'Pareja'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('H2:H200').setDataValidation(tipoRule);

  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Gerber', 'Melissa', 'Diana', 'Karina'])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange('K2:K200').setDataValidation(terapeutaRule);

  const sesiones = [];
  for (let i = 1; i <= 20; i++) {
    sesiones.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesiones)
    .setAllowInvalid(false)
    .build();
  terapias.getRange('F2:F200').setDataValidation(sesionRule);

  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['En proceso', 'Finalizado'])
    .setAllowInvalid(false)
    .build();
  terapias.getRange('G2:G200').setDataValidation(estadoRule);

  const accionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Enviar'])
    .setAllowInvalid(false)
    .build();
  espera.getRange('L2:L200').setDataValidation(accionRule);
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

  if (hoja === 'Lista de Espera' && columna === 12 && val === 'Enviar') {
    enviarANuevosIngresos(sheet, fila);
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

  const datos = sheetOrigen.getRange(fila, 3, 1, 8).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const rangoEdad = datos[3];
  const malestar = datos[4];
  const derivadoPor = datos[5];
  const contacto = datos[6];

  if (!nombre || nombre.toString().trim() === '') return;

  const nombreLimpio = nombre.toString().trim();

  const datosNuevos = nuevos.getDataRange().getValues();
  for (let i = 1; i < datosNuevos.length; i++) {
    if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 12).setBackground('#d4edda');
      ss.toast(nombreLimpio + ' ya existe en Nuevos Ingresos', 'Ya Registrado', 2);
      return;
    }
  }

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

function asignarATerapias(sheetOrigen, fila, terapeuta) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terapias = ss.getSheetByName('Terapias');

  const datos = sheetOrigen.getRange(fila, 3, 1, 9).getValues()[0];
  const nombre = datos[0];
  const creemosId = datos[1];
  const genero = datos[2];
  const tipoAtencion = datos[5];

  if (!nombre || nombre.toString().trim() === '') return;

  const nombreLimpio = nombre.toString().trim();

  const datosTerapias = terapias.getDataRange().getValues();
  for (let i = 1; i < datosTerapias.length; i++) {
    if (datosTerapias[i][1] && datosTerapias[i][1].toString().trim() === nombreLimpio) {
      sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');
      ss.toast(nombreLimpio + ' ya está en Terapias', 'Ya Asignado', 2);
      return;
    }
  }

  const nuevaFila = terapias.getLastRow() + 1;
  const registro = [
    terapeuta,
    nombreLimpio,
    creemosId || '',
    genero || '',
    tipoAtencion || 'Individual',
    '1',
    'En proceso',
    ''
  ];

  terapias.getRange(nuevaFila, 1, 1, 8).setValues([registro]);
  sheetOrigen.getRange(fila, 1, 1, 11).setBackground('#d4edda');
  ss.toast('✅ ' + nombreLimpio + '\n→ ' + terapeuta, 'Asignado a Terapias', 3);
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

function enviarEmailFinalizacion(participante, terapeuta, tipo, motivo, sesiones) {
  try {
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

// =====================================================================
// FUNCIONES DE REPORTES
// =====================================================================

function actualizarReportes() {
  SpreadsheetApp.flush();
  Logger.log('📊 Reportes actualizados automáticamente');
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
