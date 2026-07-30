import type { LangProps } from './index.js';

const gl_ES: LangProps = {
	common: {
		noData: 'Ningún dato',
		done: 'Hecho'
	},
	actionSheet: {
		cancelText: 'Cancelar'
	},
	bottomSheet: {
		title: 'Título'
	},
	dialog: {
		title: 'Aviso',
		content: 'Contenido',
		primaryText: 'Confirmar',
		secondaryText: 'Cancelar'
	},
	input: {
		pleaseInput: 'Por favor introduzca',
		pleaseSelect: 'Por favor seleccione'
	},
	modal: {
		title: 'Título',
		content: 'Contenido',
		btnText: 'De acuerdo'
	},
	navBar: {
		title: 'Título'
	},
	pagination: {
		defaultOnlyOnePage: 'Solo hay una página'
	},
	picker: {
		defaultTitle: 'Elixir',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'De acuerdo'
	},
	asyncPicker: {
		defaultTitle: 'Seleccionar',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'De acuerdo',
		defaultNext: 'Próximo',
		defaultPrev: 'Anterior',
		defaultSelected: 'Seleccionados'
	},
	rate: {
		error1: '¡La valoración no puede ser mayor que el resumen!',
		error2: '¡La valoración debe ser completada al menos una vez!',
		error3: 'La valoración está rota, ¡así que la lechuza está durmiendo!',
		error4: '¡La valoración debe ser un número impar para hacerla genial!',
		error5: '¡La altura o ancho de la valoración es demasiado pequeña en un teléfono!'
	},
	timePicker: {
		defaultTitle: 'Elixir',
		defaultCancel: 'Cancelar',
		defaultConfirm: 'De acuerdo',
		defaultYear: 'Año',
		defaultMonth: 'Mes',
		defaultDay: 'Día',
		defaultHour: 'Hora',
		defaultMinute: 'Minuto',
		defaultSecond: 'Segundo'
	},
	calendar: {
		weekTextList: ['Dom', 'Lun', 'Mar', 'Mér', 'Xov', 'Ven', 'Sáb'],
		weekSundayStartTextList: ['Dom', 'Lun', 'Mar', 'Mér', 'Xob', 'Ven', 'Sáb'],
		monthTextList: ['Xan', 'Feb', 'Maz', 'Abr', 'Mai', 'Xun', 'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
		confirmText: 'De acuerdo',
		selectedText: 'Seleccionados',
		dayText: 'Día',
		beforeText: 'Antes',
		afterText: 'Despois',
		currentWeekText: 'Semana actual',
		currentMonthText: 'Este mes',
		currentQuarterText: 'Este cuarto'
	},
	form: {
		submit: 'Enviar'
	},
	fullKeyboard: {
		space: 'Espazo'
	},
	list: {
		editText: 'Editar',
		doneText: 'Hecho',
		selectAllText: 'Seleccionar todo'
	},
	signature: {
		clearText: 'Limpar',
		confirmText: 'De acuerdo'
	},
	imagePreview: {
		loadFailedText: 'Erro ao cargar'
	},
	imageList: {
		uploadFailedText: 'Erro ao subir',
		pendingText: 'Pendente'
	}
};

export default gl_ES;
