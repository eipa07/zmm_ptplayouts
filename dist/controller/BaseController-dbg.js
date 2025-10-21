sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator"
],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller - Clase base del controlador de SAPUI5
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel - Modelo de datos basado en JSON
     * @param {typeof sap.ui.model.Filter} Filter - Filtro para búsquedas y binding de listas/tablas
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator - Operadores para los filtros (EQ, BT, Contains, etc.)
     * @param {typeof sap.m.MessageBox} MessageBox - Cuadro de diálogo para mostrar mensajes de confirmación, error o advertencia
     * @param {typeof sap.ui.core.Fragment} Fragment - Utilidad para cargar fragmentos XML
     * @param {typeof sap.m.MessageToast} MessageToast - Mensajes temporales estilo notificación inferior (tipo “toast”)
     * @param {sap.ui.core.BusyIndicator} BusyIndicator 
     */


    function (Controller, JSONModel, Filter, FilterOperator, MessageBox, Fragment, MessageToast, BusyIndicator) {
        "use strict";

        const c_virtual = "VIRTUAL";
        const c_mp = "MP";
        const c_pt = "PT";

        return Controller.extend("cuprum.zmm_ptplayouts.BaseController", {

            get_VE_layout: function () {
                return [
                    { "label": "Factura", "property": "Vbeln", "width": 10, "type": "String" },
                    { "label": "Fecha", "property": "Fecha", "width": 10, "type": "String" },
                    { "label": "Orden Compra", "property": "Ebeln", "width": 10, "type": "String" },
                    { "label": "Cliente", "property": "Kunnr", "width": 10, "type": "String" },
                    { "label": "Cuprum", "property": "Parnr", "width": 10, "type": "String" },
                    { "label": "Figura", "property": "description_parnr", "width": 10, "type": "String" },
                    { "label": "Fracción Arancelaria", "property": "ccngn", "width": 10, "type": "String" },
                    //{ "label": "Fracción Arancelaria NICO", "property": "xxxxxxxx", "width": 10, "type": "String" },
                    { "label": "Descripción", "property": "description_parnr", "width": 10, "type": "String" },
                    { "label": "Descripcion Pedimento", "property": "description_ped", "width": 10, "type": "String" },
                    { "label": "Piezas", "property": "fkimg", "width": 10, "type": "String" },
                    { "label": "Kilos", "property": "brgew", "width": 10, "type": "String" },
                    { "label": "Libras", "property": "menge", "width": 10, "type": "String" },
                    { "label": "Metros", "property": "laeng", "width": 10, "type": "String" },
                    { "label": "Pies", "property": "menge_ft", "width": 10, "type": "String" },
                    { "label": "UM", "property": "vrkme", "width": 10, "type": "String" },
                    { "label": "Unitario USD", "property": "wavwr", "width": 10, "type": "String" },
                    { "label": "Total USD", "property": "netwr", "width": 10, "type": "String" }
                ];
            },

            get_MP_layout: function () {
                return [
                    { "label": "No. PARTE", "property": "Parnr", "width": 10, "type": "String" },
                    { "label": "DESCRIPCION", "property": "description", "width": 10, "type": "String" },
                    { "label": "FRACCION ARANCELARIA", "property": "ccngn", "width": 10, "type": "String" },
                    { "label": "FA DESPERDICIO", "property": "fa_desper", "width": 10, "type": "String" },
                    { "label": "UM COMERCIAL", "property": "lmein", "width": 10, "type": "String" },
                    { "label": "UM TARIFA", "property": "um_tarifa", "width": 10, "type": "String" },
                    { "label": "TIPO MP", "property": "tipo_mp", "width": 10, "type": "String" },
                    { "label": "CATEGORIA IMMEX", "property": "category_immex", "width": 10, "type": "String" },
                    { "label": "PAIS ORIGEN", "property": "country", "width": 10, "type": "String" },
                    { "label": "COSTO UNITARIO", "property": "netpr", "width": 10, "type": "Number" },
                    { "label": "PESO EN KGS", "property": "menge", "width": 10, "type": "Number", "unit": "kg" },
                    { "label": "REFERENCIA", "property": "reference", "width": 10, "type": "String" },
                    { "label": "OBSERVACIONES", "property": "observations", "width": 10, "type": "String" }
                ];
            },

            get_PT_layout: function () {

                return [
                    { "label": "No. PARTE", "property": "Parnr", "width": 10, "type": "String" },
                    { "label": "DESCRIPCION", "property": "Text", "width": 10, "type": "String" },
                    { "label": "DESCRIPCION EN INGLES", "property": "description_en", "width": 10, "type": "String" },
                    { "label": "CATEGORIA1", "property": "category1", "width": 10, "type": "String" },
                    { "label": "FRACCION ARANCELARIA", "property": "ccngn", "width": 10, "type": "String" },
                    { "label": "FA DESPERDICIO", "property": "fa_desper", "width": 10, "type": "String" },
                    { "label": "UM COMERCIAL", "property": "lmein", "width": 10, "type": "String" },
                    { "label": "UM TARIFA", "property": "um_tarifa", "width": 10, "type": "String" },
                    { "label": "PAIS DESTINO", "property": "country", "width": 10, "type": "String" },
                    { "label": "COSTO UNITARIO", "property": "netpr", "width": 10, "type": "String" },
                    { "label": "PESO EN KGS", "property": "menge", "width": 10, "type": "String" },
                    { "label": "REFERENCIA", "property": "reference", "width": 10, "type": "String" },
                    { "label": "OBSERVACIONES", "property": "observations", "width": 10, "type": "String" },
                    { "label": "FECHA ESTRUCTURA", "property": "fecha_es", "width": 10, "type": "String" },
                    { "label": "No. PARTE DEL COMPONENTE", "property": "comp_parnr", "width": 10, "type": "String" },
                    { "label": "UNIDAD COMPONENTE", "property": "comp_unid", "width": 10, "type": "String" },
                    { "label": "CANTIDAD INCORPORADA", "property": "incorp_cant", "width": 10, "type": "String" },
                    { "label": "CANT. MERMA", "property": "merma_Cant", "width": 10, "type": "String" },
                    { "label": "CANT. DESPERDICIO", "property": "desper_Cant", "width": 10, "type": "String" },
                    { "label": "FDESDE", "property": "fdesde", "width": 10, "type": "String" },
                    { "label": "FHASTA", "property": "f_hasta", "width": 10, "type": "String" }
                ]


            },

            get_Resource_Bundle: function () {
                return this.getView().getModel("i18n").getResourceBundle();
            },

            getRequestModel() {

                return new JSONModel({
                    Global: {
                        dateFrom: "",
                        dateTo: "",
                        sociedad_inicio: "", // bukrs
                        sociedad_fin: "",
                        showSociedad: true,
                        material_inicio: "", // Odata Service - Parnr
                        material_fin: "", // Odata Service - Parnr
                        showMaterial: true, // Material EV y PT
                        tableEV: true,
                        tablePT: false,
                        tableMP: false

                    },

                    Virtual: {
                        factura_inicio: "", // vbeln
                        factura_fin: "",    // vbeln
                        showFacturas: true,
                        oc_inicio: "", //Purchase Order - Orden de compra
                        oc_fin: "", //Purchase Order - Orden de compra
                        showOC: true,
                        cliente: "",
                        showCliente: true
                    },

                    MP: {
                        proveedor: "", // lifnr
                        sowProveedor: false,
                        numParte: "",  // ParnrDescription
                        showNumParte: false,
                    },

                    PT: {
                    },



                });

            },

            /**
             * Obtiene el total de registros desde un endpoint OData usando $count.
             * @param {sap.ui.model.odata.v2.ODataModel} oModel - Modelo OData.
             * @param {string} sUrlCount - URL completa con $count (sin el dominio).
             * @param {Array} aFilters - Filtros a aplicar.
             * @returns {Promise<number>} - Total de registros.
             */

            getCountFromOData: function (oModel, sUrl, aFilters) {
                return new Promise((resolve, reject) => {
                    oModel.read(sUrl + "/$count", {
                        filters: aFilters,
                        success: function (oData, response) {
                            //const iTotal = parseInt(response.responseText, 10);
                            const iTotal = parseInt(oResponse?.body || oResponse?.responseText || "0");

                            resolve(iTotal);
                        },
                        error: reject
                    });
                });
            },

            readODataPaginated: async function (oModel, sUrl, aFilters, iTop) {
                let aResults = [];
                let hasMore = true;

                while (hasMore) {
                    const oData = await new Promise((resolve, reject) => {
                        oModel.read(sUrl, {
                            filters: aFilters,
                            urlParameters: {
                                "$top": iTop
                            },
                            success: resolve,
                            error: reject
                        });
                    });

                    aResults = aResults.concat(oData.results || []);

                    if (oData.__next) {
                        sUrl = "/" + oData.__next.split("/").slice(-1)[0];
                    } else {
                        hasMore = false;
                    }
                }

                return aResults;
            },


            /** Llamado de catálogos para filtros de búsqueda */
            loadFilterEntities: async function (_layout, _oModelLayout) {
                const _that = this;
                const _params = this.getUrlFilters(_layout);

                let aResults = [];

                // 1. Obtener el total de registros
                async function getCount(sUrlCount, aFilters) {
                    return new Promise((resolve, reject) => {
                        _oModelLayout.read(sUrlCount, {
                            filters: aFilters,
                            success: function (_count, response) {
                                const iTotal = parseInt(_count);
                                resolve(iTotal);
                            },
                            error: reject
                        });
                    });
                }

                // 2. Cargar datos usando una URL específica (puede ser la original o la que devuelve __next)
                async function loadData(sUrl, bFirstCall = false, iTop = 5000) {
                    return new Promise((resolve, reject) => {
                        const oReadConfig = {
                            success: resolve,
                            error: reject
                        };

                        // Solo usar filtros y $top en la primera llamada
                        if (bFirstCall) {
                            oReadConfig.filters = aFilters;
                            oReadConfig.urlParameters = {
                                "$top": iTop
                            };
                        }

                        _oModelLayout.read(sUrl, oReadConfig);
                    });
                }

                try {
                    let sUrl = _params[0].url;
                    let sUrlCount = _params[0].urlCount;
                    const aFilters = _params[0].filters;

                    // 3. Obtener total de registros
                    const iTotal = await getCount(sUrlCount, aFilters);

                    let hasMore = true;
                    let bFirstCall = true;

                    // 4. Loop de paginación
                    while (hasMore) {
                        const oData = await loadData(sUrl, bFirstCall, iTotal);
                        bFirstCall = false;

                        aResults = aResults.concat(oData.results || []);

                        if (oData.__next) {
                            console.log("Next URL:", oData.__next);

                            // Asegura que la URL sea relativa y correcta
                            const sNextQuery = oData.__next.split("/Set?")[1];
                            const sBaseUrl = "/ZZ1_CDS_LAYOUT_EV(p_fecha='" + _params[0].fecha + "')/Set?" + sNextQuery;
                            sUrl = sBaseUrl;
                        } else {
                            hasMore = false;
                        }
                    }

                    // 5. Mostrar resultados si hay
                    const oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(aResults);
                    console.log(aResults);

                    var oBundle = this.get_Resource_Bundle();
                    let _msgSinResultados = oBundle.getText("sinResultados");
                    let _msgerrorCargaLayout = oBundle.getText("sinResultados");

                    if (aResults.length > 0) {
                        if (_layout === c_virtual) {
                            _that.getView().setModel(oModel, "evLayoutModel");
                        } else if (_layout === c_mp) {
                            _that.getView().setModel(oModel, "mpLayoutModel");
                        } else if (_layout === c_pt) {
                            _that.getView().setModel(oModel, "ptLayoutModel");
                        }
                    } else {
                        MessageBox.warning(_msgSinResultados);
                    }

                } catch (oError) {
                    console.log("Error al cargar el layout:", oError);
                    const oBundle = this.get_Resource_Bundle();
                    let _msgerrorCargaLayout = oBundle.getText("sinResultados");
                    MessageBox.error(_msgerrorCargaLayout);
                }
            },

            /**
                 * Building url for request
                 * Building filters for request
                 * This function returns two objects: 
                 * URL => Entity with range of date
                 * Filters => selected data to filter the content of tables
                 */

            getUrlFilters: function (_layout) {
                var _requestModel = this.getView().getModel("requestModel").getData();
                var _params = [];
                var _url, _urlCount;

                // Calculate p_fecha Param
                let _dateFrom = new Date(_requestModel.Global.dateFrom);
                let _monthFrom = parseInt(_dateFrom.getMonth()) + 1;
                _monthFrom = _monthFrom <= 9 ? "0" + _monthFrom.toString() : _monthFrom.toString();
                let _dayFrom = parseInt(_dateFrom.getDate());
                _dayFrom = _dayFrom <= 9 ? "0" + _dayFrom.toString() : _dayFrom.toString();
                let _dFrom = _dateFrom.getFullYear().toString() + _monthFrom.toString() + _dayFrom;

                let _dateTo = new Date(_requestModel.Global.dateTo);
                let _monthTo = parseInt(_dateTo.getMonth()) + 1;
                _monthTo = _monthTo <= 9 ? "0" + _monthTo.toString() : _monthTo.toString();
                let _dayTo = parseInt(_dateTo.getDate());
                _dayTo = _dayTo <= 9 ? "0" + _dayTo.toString() : _dayTo.toString();
                let _dTo = _dateTo.getFullYear().toString() + _monthTo.toString() + _dayTo;

                let _dateParam = _dFrom + "|" + _dTo;


                // Filters
                var aFilters = [];
                var _sociedad_inicio = _requestModel.Global.sociedad_inicio;
                var _sociedad_fin = _requestModel.Global.sociedad_fin;
                var _material_inicio = _requestModel.Global.material_inicio;
                var _material_fin = _requestModel.Global.material_fin;

                if (_layout === c_virtual) {
                    _url = "/ZZ1_CDS_LAYOUT_EV(p_fecha='" + _dateParam + "')/Set?";
                    _urlCount = "/ZZ1_CDS_LAYOUT_EV(p_fecha='" + _dateParam + "')/Set/$count?";
                    var _factura_inicio = _requestModel.Virtual.factura_inicio;
                    var _factura_fin = _requestModel.Virtual.factura_fin;
                    var _oc_inicio = _requestModel.Virtual.oc_inicio;
                    var _oc_fin = _requestModel.Virtual._oc_fin;
                    var _cliente = _requestModel.Virtual.cliente;



                    /** Rango de facturas */
                    if (_factura_inicio && !_factura_fin) {

                        aFilters.push(new Filter("Vbeln", FilterOperator.EQ, _factura_inicio));

                    } else if (_factura_inicio && _factura_fin) {
                        aFilters.push(new Filter("Vbeln", FilterOperator.BT, _factura_inicio, _factura_fin));
                    }

                    if (_oc_inicio && !_oc_fin) {

                        aFilters.push(new Filter("Ebeln", FilterOperator.EQ, _oc_inicio));

                    } else if (_oc_inicio && _oc_fin) {
                        aFilters.push(new Filter("Ebeln", FilterOperator.BT, _oc_inicio, _oc_fin));
                    }

                    /** Rango de Materiales */
                    if (_material_inicio && !_material_fin) {

                        aFilters.push(new Filter("Parnr", FilterOperator.EQ, _material_inicio));

                    } else if (_material_inicio && _material_fin) {
                        aFilters.push(new Filter("Parnr", FilterOperator.BT, _material_inicio, _material_fin));
                    }

                    if (_cliente) {
                        aFilters.push(new Filter("Kunnr", FilterOperator.EQ, _cliente));
                    }


                } else if (_layout === c_mp) { // Filtros MP
                    _url = "/ZZ1_CDS_LAYOUT_MP(p_fecha='" + _dateParam + "')/Set?";
                    _urlCount = "/ZZ1_CDS_LAYOUT_MP(p_fecha='" + _dateParam + "')/Set/$count?";
                    let _numParte = _requestModel.MP.numParte;
                    let _proveedor = _requestModel.MP.proveedor;


                    if (_numParte) {
                        aFilters.push(new Filter("Parnr", FilterOperator.EQ, _numParte));
                    }
                    if (_proveedor) {
                        aFilters.push(new Filter("Lifnr", FilterOperator.EQ, _proveedor));
                    }


                } else if (_layout === c_pt) { // Filtros PT
                    _url = "/ZZ1_CDS_LAYOUT_PT(p_fecha='" + _dateParam + "')/Set?";
                    _urlCount = "/ZZ1_CDS_LAYOUT_PT(p_fecha='" + _dateParam + "')/Set/$count?";

                    if (_material_inicio && !_material_fin) {

                        aFilters.push(new Filter("Parnr", FilterOperator.EQ, _material_inicio));

                    } else if (_material_inicio && _material_fin) {
                        aFilters.push(new Filter("Parnr", FilterOperator.BT, _material_inicio, _material_fin));
                    }

                }

                /** Rango de Sociedad */
                if (_sociedad_inicio && !_sociedad_fin) {

                    aFilters.push(new Filter("Bukrs", FilterOperator.EQ, _sociedad_inicio));

                } else if (_sociedad_inicio && _sociedad_fin) {
                    aFilters.push(new Filter("Bukrs", FilterOperator.BT, _sociedad_inicio, _sociedad_fin));
                }

                debugger;

                _params.push([{
                    url: _url,
                    filters: aFilters,
                    urlCount: _urlCount

                }]);

                return _params[0];


            },

            getColums: function (_layout) {

                var _cols;

                if (_layout === c_virtual) {
                    _cols = this.getView().getModel("veColumnsModel").getData();

                } else if (_layout === c_mp) {
                    _cols = this.getView().getModel("mpColumsModel").getData();

                } else if (_layout === c_pt) {
                    _cols = this.getView().getModel("ptColumnsModel").getData();
                }

                return _cols;
            },

            destroyModel: function (sModelName, oScope) {
                const oContext = oScope || this.getView();
                const oModel = oContext.getModel(sModelName);

                if (oModel) {
                    oModel.destroy();
                    oContext.setModel(null, sModelName);
                    console.log(`[BaseController] Modelo "${sModelName}" destruido.`);
                } else {
                    console.warn(`[BaseController] No se encontró el modelo "${sModelName}" para destruir.`);
                }
            },

            /**
             * Muestra el BusyIndicator global
             * @param {int} iDelay Milisegundos de retardo (default: 0 → inmediato)
             */
            showBusy: function (iDelay) {
                BusyIndicator.show(iDelay || 0);
            },

            /**
             * Oculta el BusyIndicator global
             */
            hideBusy: function () {
                BusyIndicator.hide();
            },




        });
    });
