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
