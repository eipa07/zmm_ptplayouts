sap.ui.define([
    "cuprum/zmm_ptplayouts/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "cuprum/zmm_ptplayouts/model/formatter",
],

    /**
      * 
      * @param {typeof cuprum.zmm_ptplayouts.controller.BaseController} BaseController 
      * @param {typeof sap.ui.model.Filter} Filter 
      * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
      * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
      * @param {typeof sap.ui.export.Spreadsheet} Spreadsheet 
      * @param {typeof sap.m.MessageBox} MessageBox
      * @param {typeof sap.ui.core.Fragment} Fragment
      * @param {sap.m.MessageToast} MessageToast 
      */

    function (BaseController, Filter, FilterOperator, JSONModel, Spreadsheet, MessageBox, Fragment, MessageToast, formatter) {
        "use strict";

        formatter: formatter;

        const c_virtual = "VIRTUAL";
        const c_mp = "MP";
        const c_pt = "PT";

        var _layout = 'VIRTUAL';

        return BaseController.extend("cuprum.zmm_ptplayouts.controller.Main", {
            onInit: function () {
                this.loadRequestModel();



            },

            loadRequestModel() {
                let _requestModel = this.getRequestModel();

                this.getView().setModel(_requestModel, "requestModel");

                var _mpLayoutModel = new sap.ui.model.json.JSONModel();
                var _ptLayoutModel = new sap.ui.model.json.JSONModel();
                var _virtualLayoutModel = new sap.ui.model.json.JSONModel();
                //var _materialesModel = new sap.ui.model.json.JSONModel();
                var _facturasModel = new sap.ui.model.json.JSONModel();

                var _facturasModel_local = new sap.ui.model.json.JSONModel();

                _mpLayoutModel.setData(this.get_MP_layout());
                _ptLayoutModel.setData(this.get_PT_layout());
                _virtualLayoutModel.setData(this.get_VE_layout());
                // _facturasModel.loadData("model/Facturas.json", false);
                //_facturasModel_local.loadData("model/vbeln.json", false);

                this.getView().setModel(_mpLayoutModel, "mpColumsModel");
                this.getView().setModel(_ptLayoutModel, "ptColumnsModel");
                this.getView().setModel(_virtualLayoutModel, "veColumnsModel");
                //this.getView().setModel("materialesModel");
                this.getView().setModel(_facturasModel, "facturasModel");
                this.getView().setModel(_facturasModel_local, "facturasModel_local");
            },


            /* onVHParnrRequest: function (oEvent) {
                let sInputValue_Parnr = oEvent.getSource().getValue();
                this._parnrInputId = oEvent.getSource().getId();
                if (!this._oVHParnrDialog) {
                    this._oVHParnrDialog = sap.ui.xmlfragment(
                        "cuprum.zmm_ptplayouts.view.fragments.ParnrSelectionDialog",
                        this
                    );
                    this.getView().addDependent(this._oVHParnrDialog);
                }

                // Implement filter functionality
                this._oVHParnrDialog.getBinding("items").filter([new Filter(
                    "Parnr", FilterOperator.Contains, sInputValue_Parnr
                )]);

                this._oVHParnrDialog.open(sInputValue_Parnr);
            },

            onVHSearchParnr: function (oEvent) {
                let sValue = oEvent.getParameter("value");

                let _parnr = new Filter(
                    "Parnr", FilterOperator.Contains, sValue
                );
                let _parnrName = new Filter(
                    "ParnrDescription", FilterOperator.Contains, sValue
                );

                var _filters = new Filter({
                    filters: [_parnr, _parnrName], and: false
                });
                oEvent.getSource().getBinding("items").filter([_filters]);


            },

            onVHCloseParnr: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var _parnr = this.getView().byId(this._parnrInputId);
                    _parnr.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            }, */

            onVHLifnrRequest: function (oEvent) {
                const oTipoBusqueda = "Proveedor";

                this._loadRemoteOdataServices(_layout, oTipoBusqueda);



                console.log("onVH_proveedor_request");
                if (!this._oVH_material_Dialog) {
                    this._oVH_material_Dialog = Fragment.load({
                        name: "cuprum.zmm_ptplayouts.view.fragments.ProveedorSelectionDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        // ✅ Aquí usamos Fragment.byId para obtener controles internos
                        Fragment.byId("ProveedorFragment", "input_sociedad")?.attachSuggestionItemSelected(this.onSociedadSelected, this);


                        return oDialog;
                    }.bind(this));
                }

                this._oVH_material_Dialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onVHSearchLifnr: function (oEvent) {
                let sValue = oEvent.getParameter("value");

                let _lifnr = new Filter(
                    "Lifnr", FilterOperator.Contains, sValue
                );
                let _lifnrName = new Filter(
                    "LifnrName", FilterOperator.Contains, sValue
                );

                var _filters = new Filter({
                    filters: [_lifnr, _lifnrName], and: false
                });
                oEvent.getSource().getBinding("items").filter([_filters]);
            },

            onVHCloseLifnr: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var _lifnr = this.getView().byId(this._lifnrInputId);
                    _lifnr.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },

            onVHBukrs_EV_Request: function (oEvent) {
                let sInputValue_Bukrs_EV = oEvent.getSource().getValue();
                this._bukrs_EV_InputId = oEvent.getSource().getId();
                if (!this._oVHBukrs_EV_Dialog) {
                    this._oVHBukrs_EV_Dialog = sap.ui.xmlfragment(
                        "cuprum.zmm_ptplayouts.view.fragments.Bukrs_EV_SelectionDialog",
                        this
                    );
                    this.getView().addDependent(this._oVHBukrs_EV_Dialog);
                }

                // Implement filter functionality
                this._oVHBukrs_EV_Dialog.getBinding("items").filter([new Filter(
                    "bukrs", FilterOperator.Contains, sInputValue_Bukrs_EV
                )]);

                this._oVHBukrs_EV_Dialog.open(sInputValue_Bukrs_EV);
            },

            onVHSearchBukrs_EV: function (oEvent) {
                let sValue = oEvent.getParameter("value");

                let _parnr = new Filter(
                    "bukrs", FilterOperator.Contains, sValue
                );
                let _parnrName = new Filter(
                    "butxt", FilterOperator.Contains, sValue
                );

                var _filters = new Filter({
                    filters: [_parnr, _parnrName], and: false
                });
                oEvent.getSource().getBinding("items").filter([_filters]);


            },

            onVHCloseBukrs_EV: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var _bukrs_ev = this.getView().byId(this._bukrs_EV_InputId);
                    _bukrs_ev.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },



            onVHBukrs_MP_Request: function (oEvent) {
                let sInputValue_Bukrs_MP = oEvent.getSource().getValue();
                this._bukrs_MP_InputId = oEvent.getSource().getId();
                if (!this._oVHBukrs_MP_Dialog) {
                    this._oVHBukrs_MP_Dialog = sap.ui.xmlfragment(
                        "cuprum.zmm_ptplayouts.view.fragments.Bukrs_MP_SelectionDialog",
                        this
                    );
                    this.getView().addDependent(this._oVHBukrs_MP_Dialog);
                }

                // Implement filter functionality
                this._oVHBukrs_MP_Dialog.getBinding("items").filter([new Filter(
                    "bukrs", FilterOperator.Contains, sInputValue_Bukrs_MP
                )]);

                this._oVHBukrs_MP_Dialog.open(sInputValue_Bukrs_MP);
            },

            onVHSearchBukrs_MP: function (oEvent) {
                let sValue = oEvent.getParameter("value");

                let _parnr = new Filter(
                    "bukrs", FilterOperator.Contains, sValue
                );
                let _parnrName = new Filter(
                    "butxt", FilterOperator.Contains, sValue
                );

                var _filters = new Filter({
                    filters: [_parnr, _parnrName], and: false
                });
                oEvent.getSource().getBinding("items").filter([_filters]);


            },

            onVHCloseBukrs_MP: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var _bukrs_mp = this.getView().byId(this._bukrs_MP_InputId);
                    _bukrs_mp.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },



            onVHBukrs_PT_Request: function (oEvent) {
                let sInputValue_Bukrs_PT = oEvent.getSource().getValue();
                this._bukrs_PT_InputId = oEvent.getSource().getId();
                if (!this._oVHBukrs_PT_Dialog) {
                    this._oVHBukrs_PT_Dialog = sap.ui.xmlfragment(
                        "cuprum.zmm_ptplayouts.view.fragments.Bukrs_PT_SelectionDialog",
                        this
                    );
                    this.getView().addDependent(this._oVHBukrs_PT_Dialog);
                }

                // Implement filter functionality
                this._oVHBukrs_PT_Dialog.getBinding("items").filter([new Filter(
                    "bukrs", FilterOperator.Contains, sInputValue_Bukrs_PT
                )]);

                this._oVHBukrs_PT_Dialog.open(sInputValue_Bukrs_PT);
            },

            onVHSearchBukrs_PT: function (oEvent) {
                let sValue = oEvent.getParameter("value");

                let _parnr = new Filter(
                    "bukrs", FilterOperator.Contains, sValue
                );
                let _parnrName = new Filter(
                    "butxt", FilterOperator.Contains, sValue
                );

                var _filters = new Filter({
                    filters: [_parnr, _parnrName], and: false
                });
                oEvent.getSource().getBinding("items").filter([_filters]);


            },

            onVHCloseBukrs_PT: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var _bukrs_pt = this.getView().byId(this._bukrs_PT_InputId);
                    _bukrs_pt.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },






            _selectLayout: function (oEvent) {
                _layout = oEvent.getSource().getSelectedKey();
                let _requestModel = this.getView().getModel("requestModel");
                console.log(_layout, _requestModel.getData());

                /** Borrar datos de filtros de búsqueda de las tablas */
                this.clearSearchItems(_layout);

                console.log(true);
                if (_layout === "VIRTUAL") {
                    _requestModel.setProperty("/Global/tableEV", true);
                    _requestModel.setProperty("/Global/tablePT", false);
                    _requestModel.setProperty("/Global/tableMP", false);

                    // Show valid Value Help
                    _requestModel.setProperty("/Virtual/showOC", true);
                    _requestModel.setProperty("/Virtual/showFacturas", true);
                    _requestModel.setProperty("/Global/showMaterial", true);
                    _requestModel.setProperty("/Virtual/showSociedad", true);
                    _requestModel.setProperty("/MP/sowProveedor", false);
                    _requestModel.setProperty("/Virtual/showCliente", true);
                    _requestModel.setProperty("/MP/showNumParte", false);

                    this._loadRemoteOdataServices(c_virtual);

                } else if (_layout === "MP") {

                    this._loadRemoteOdataServices(c_mp);
                    // Selected Table
                    _requestModel.setProperty("/Global/tableMP", true);
                    _requestModel.setProperty("/Global/tablePT", false);
                    _requestModel.setProperty("/Global/tableEV", false);


                    // Show valid Value Help
                    _requestModel.setProperty("/MP/sowProveedor", true);
                    _requestModel.setProperty("/MP/showNumParte", true);
                    _requestModel.setProperty("/Virtual/showFacturas", false);
                    _requestModel.setProperty("/Global/showMaterial", false);
                    _requestModel.setProperty("/Virtual/showCliente", false);
                    _requestModel.setProperty("/Virtual/showSociedad", true);
                    _requestModel.setProperty("/Virtual/showOC", false);


                    // Borrar modelos EV
                    this.destroyModel("materialModel_ev");



                } else if (_layout === "PT") {

                    this._loadRemoteOdataServices(c_pt);

                    _requestModel.setProperty("/Global/tablePT", true);
                    _requestModel.setProperty("/Global/tableMP", false);
                    _requestModel.setProperty("/Global/tableEV", false);

                    // Show valid Value Help
                    _requestModel.setProperty("/Global/showMaterial", true);
                    _requestModel.setProperty("/Virtual/showSociedad", true);
                    _requestModel.setProperty("/MP/sowProveedor", false);
                    _requestModel.setProperty("/Virtual/showFacturas", false);
                    _requestModel.setProperty("/Virtual/showCliente", false);
                    _requestModel.setProperty("/MP/showNumParte", false);
                    _requestModel.setProperty("/Virtual/showOC", false);


                }
            },

            clearSearchItems(_layout) {
                let _requestModel = this.getView().getModel("requestModel");

                if (_layout === c_virtual) {
                    _requestModel.setProperty("/MP/proveedor", "");
                    _requestModel.setProperty("/MP/numParte", "");
                    _requestModel.setProperty("/Global/sociedad_inicio", "");
                    _requestModel.setProperty("/Global/sociedad_fin", "");
                    _requestModel.setProperty("/Global/material_inicio", "");
                    _requestModel.setProperty("/Global/material_fin", "");
                } else if (_layout === c_mp) {
                    _requestModel.setProperty("/Virtual/factura_inicio", "");
                    _requestModel.setProperty("/Virtual/factura_fin", "");
                    _requestModel.setProperty("/Virtual/oc_inicio", "");
                    _requestModel.setProperty("/Virtual/oc_fin", "");
                    _requestModel.setProperty("/Virtual/cliente", "");
                    _requestModel.setProperty("/Global/material_inicio", "");
                    _requestModel.setProperty("/Global/material_fin", "");
                    _requestModel.setProperty("/Global/sociedad_inicio", "");
                    _requestModel.setProperty("/Global/sociedad_fin", "");
                } else if (_layout === c_pt) {
                    _requestModel.setProperty("/Virtual/factura_inicio", "");
                    _requestModel.setProperty("/Virtual/factura_fin", "");
                    _requestModel.setProperty("/Virtual/oc_inicio", "");
                    _requestModel.setProperty("/Virtual/oc_fin", "");
                    _requestModel.setProperty("/Virtual/cliente", "");
                    _requestModel.setProperty("/Global/material_inicio", "");
                    _requestModel.setProperty("/Global/material_fin", "");
                    _requestModel.setProperty("/Global/sociedad_inicio", "");
                    _requestModel.setProperty("/Global/sociedad_fin", "");
                    _requestModel.setProperty("/MP/proveedor", "");
                    _requestModel.setProperty("/MP/numParte", "");

                }


            },

            matnrSelectionFinish: function (oEvent) {

                let _requestModel = this.getView().getModel("requestModel");

                _requestModel.setProperty("/matnr", "");
                var selectedItems = oEvent.getParameter("selectedItems");
                let _matnrSelection = new Array();


                for (var i = 0; i < selectedItems.length; i++) {
                    let _selection = {
                        "Matnr": selectedItems[i].getKey(),
                        "Text": selectedItems[i].getText()
                    }
                    _matnrSelection.push(_selection);

                }
                _requestModel.setProperty("/matnr", _matnrSelection);
                console.log("fin matnr", _requestModel.getProperty("/matnr"));
            },

            /* invoicesSelectionFinish: function (oEvent) {
    
                this.getView().getModel("requestModel").setProperty("/invoices", "");
                var selectedItems = oEvent.getParameter("selectedItems");
                let _invoiceSelection = new Array();
    
    
                for (var i = 0; i < selectedItems.length; i++) {
                    let _selection = {
                        "invoice": selectedItems[i].getKey(),
                        "invoiceName": selectedItems[i].getText()
                    }
                    _invoiceSelection.push(_selection);
    
                }
                this.getView().getModel("requestModel").setProperty("/invoices", _invoiceSelection);
                console.log("fin matnr", this.getView().getModel("requestModel").getProperty("/invoices"));
            }, */

            exportExcel: function (_layoutId) {

                let _validation_flag = this.validations();
                let _selectedLayout;
                let _requestModel = this.getView().getModel("requestModel");

                if (_validation_flag) {
                    var _filename;
                    //if (!this._oTable) {
                    let _oTable = this.byId(_layoutId);
                    //}

                    if (_requestModel.getProperty("/Global/tableEV")) {
                        _filename = "Layout Expo Virtuales.xlsx";
                        _selectedLayout = c_virtual;
                    } else if (_requestModel.getProperty("/Global/tableMP")) {
                        _filename = "Layout MP.xlsx";
                        _selectedLayout = c_mp;
                    } if (_requestModel.getProperty("/Global/tablePT")) {
                        _filename = "Layout PT.xlsx";
                        _selectedLayout = c_pt;
                    }

                    //let oTable = _oTable;
                    let oRowBinding = _oTable.getBinding("rows");
                    let aCols = this.getColums(_selectedLayout);
                    let oSettings = {
                        workbook: {
                            columns: aCols,
                            hierarchyLevel: "Level"
                        },
                        dataSource: oRowBinding,
                        fileName: _filename,
                        worker: false // We need to disable worker because we are using a MockServer as OData Service
                    };

                    let oSheet = new Spreadsheet(oSettings);
                    oSheet.build().finally(function () {
                        oSheet.destroy();
                    });
                }




            },


            getLayout: async function (_layout, _oModelLayout) {

                this.getView().setBusy(true);
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
                async function loadData(sUrl, aFilters, bFirstCall = false, iTop = 5000) {
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
                        const oData = await loadData(sUrl, aFilters, bFirstCall, iTotal);
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
                } finally{
                    this.getView().setBusy(false);
                }
            },


            onSearchButton: function () {

                let _validation_flag = this.validations();
                var _oModelLayout;
                var oBundle = this.get_Resource_Bundle();
                var _message = oBundle.getText("file");
                let _requestModel = this.getView().getModel("requestModel");

                this.clearTable();
                //console.log("file: " + _message);
                debugger;

                if (_validation_flag) {
                    if (_requestModel.getProperty("/Global/tableEV")) {
                        // set Model features
                        _oModelLayout = this.getView().getModel("EV_LayoutService");
                        if (this.getView().getModel("mpLayoutModel")) {
                            this.getView().getModel("mpLayoutModel").setData();
                        }
                        if (this.getView().getModel("ptLayoutModel")) {
                            this.getView().getModel("ptLayoutModel").setData();
                        }

                        this.getLayout(c_virtual, _oModelLayout);

                    } else if (_requestModel.getProperty("/Global/tableMP")) {
                        // set Model features
                        _oModelLayout = this.getView().getModel("MP_LayoutService");

                        if (this.getView().getModel("evLayoutModel")) {
                            this.getView().getModel("evLayoutModel").setData();
                        }
                        if (this.getView().getModel("ptLayoutModel")) {
                            this.getView().getModel("ptLayoutModel").setData();
                        }
                        this.getLayout(c_mp, _oModelLayout);

                    } if (_requestModel.getProperty("/Global/tablePT")) {
                        // set Model features
                        _oModelLayout = this.getView().getModel("PT_LayoutService");
                        if (this.getView().getModel("evLayoutModel")) {
                            this.getView().getModel("evLayoutModel").setData();
                        }
                        if (this.getView().getModel("mpLayoutModel")) {
                            this.getView().getModel("mpLayoutModel").setData();
                        }
                        this.getLayout(c_pt, _oModelLayout);
                    }
                }




            },


            validations: function () {

                var _date = this.getView().byId("MainView_DateRangeSelection").getValue();
                var _return = true;
                // Obtener el ResourceBundle
                var oBundle = this.get_Resource_Bundle();
                // Obtener el mensaje de error
                var _errorFecha = oBundle.getText("errorFecha");



                if (!_date) {
                    _return = false;
                    MessageBox.error(_errorFecha, {
                        title: "Error",
                        contentWidth: "30%",
                        dependentOn: this.getView()
                    });
                }

                return _return;
            },


            onDateChange: function (oEvent) {

                var sFrom = oEvent.getParameter("from"),
                    sTo = oEvent.getParameter("to"),
                    bValid = oEvent.getParameter("valid"),
                    oEventSource = oEvent.getSource();

                if (oEvent.getParameter("valid")) {
                    this.getView().getModel("requestModel").setProperty("/Global/dateFrom", sFrom);
                    this.getView().getModel("requestModel").setProperty("/Global/dateTo", sTo);
                } else {
                    MessageBox.error("Elegir rango de fecha valido", {
                        title: "Error",
                        contentWidth: "30%",
                        dependentOn: this.getView()
                    });
                }

            },


            /**
             * Call oData Services for PT and Virtual Layouts
             * c_mp => MP
             * c_pt => PT
             * Carga de entidades para filtros
             */
            _loadRemoteOdataServices: async function (_layout, tipoBusqueda = '') {

                debugger;

                async function getCount(sUrlCount, oModel, _layout) {
                    return new Promise((resolve, reject) => {
                        oModel.read(sUrlCount, {
                            success: function (_count, response) {
                                console.log("Response de count ", response);
                                const iTotal = parseInt(_count);
                                resolve(iTotal);
                            },
                            error: reject
                        });
                    });
                }

                // 2. Cargar datos usando una URL específica (puede ser la original o la que devuelve __next)
                async function loadData(sUrl, bFirstCall = false, iTop = 5000, oModel) {
                    return new Promise((resolve, reject) => {
                        const oReadConfig = {
                            success: resolve,
                            error: reject
                        };

                        // Solo usar filtros y $top en la primera llamada
                        if (bFirstCall) {
                            oReadConfig.urlParameters = {
                                "$top": iTop
                            };
                        }

                        oModel.read(sUrl, oReadConfig);
                    });
                }

                //this.getLayout(_layout);
                let aResults = [];
                var _that = this;
                //var _Virtual_ModelService = this.getView().getModel("Virtual_LayoutModel");


                if (_layout === c_virtual) {
                    try {
                        if (!this.getView().getModel("materialModel_ev")) {
                            debugger;
                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_PARNR/';
                            let oEV_Model = this.getView().getModel("EV_LayoutService");

                            let sUrlCount = oEntity + "$count?";

                            // 3. Obtener total de registros
                            let oCount = await getCount(sUrlCount, oEV_Model, _layout);
                            console.log("Contador de material EV : " + oCount);
                            let that = this;





                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oEV_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "materialModel_ev");
                                _that.getView().setModel(_oModel, "materialModel");
                                console.log("materialModel_ev", that.getView().getModel("materialModel_ev").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {

                            let oSociedadModel_mp = that.getView().getModel("materialModel_ev").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "materialModel");

                        }

                        if (!this.getView().getModel("sociedadModel_ev")) {

                            aResults = [];
                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_BUKRS/';
                            let oEV_Model = this.getView().getModel("EV_LayoutService");

                            let sUrlCount = oEntity + "$count?";

                            let oCount = await getCount(sUrlCount, oEV_Model, _layout);

                            let that = this;


                            // 3. Obtener total de registros


                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oEV_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "sociedadModel_ev");
                                _that.getView().setModel(_oModel, "sociedadModel");
                                console.log("sociedadModel_ev", that.getView().getModel("sociedadModel_ev").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {

                            let oSociedadModel_mp = that.getView().getModel("sociedadModel_ev").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "sociedadModel");

                        }





                    } catch (error) {
                        //console.log("Error Contador de material EV : ", error);
                    }









                } else if (_layout === c_mp) {
                    /** MP Layout */

                    /*  var _MP_ModelService = this.getView().getModel("MP_LayoutService");
                     let oCont = this.getCount(_layout, oModel, entity);
 
                     if (!this.getView().getModel("numParte_MP_Model")) {
                         _MP_ModelService.read("/ZZ1_CDS_SEARCH_HELP_PARNR/?", {
                             success: function (oData, Result) {
 
                                 if (oData.results.length >= 1) {
                                     console.log(oData);
                                     let _oModel = new JSONModel();
                                     _oModel.setData(oData.results);
                                     _that.getView().setModel(_oModel, "numParte_MP_Model");
                                 } else {
                                     MessageBox.warning("No se encontraron resultados");
                                 }
 
 
                             }, error: function (oError) {
                                 console.log(oError);
                             }
                         });
                     } */



                    /*  if (!this.getView().getModel("lifnr_MP_Model")) {
                         _MP_ModelService.read("/ZZ1_CDS_SEARCH_HELP_LIFNR/?", {
                             success: function (oData, Result) {
 
                                 console.log(oData);
                                 let _oModel = new JSONModel();
                                 _oModel.setData(oData.results);
                                 _that.getView().setModel(_oModel, "lifnr_MP_Model"); // Proveedor MP
 
                             }, error: function (oError) {
                                 console.log(oError);
                             }
                         });
                     } */

                    try {
                        if (!this.getView().getModel("proveedorlModel_mp")) {


                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_LIFNR/';
                            let oMP_Model = this.getView().getModel("PT_LayoutService");
                            let sUrlCount = oEntity + "$count?";

                            // 3. Obtener total de registros
                            let oCount = await getCount(sUrlCount, oMP_Model, _layout);


                            let that = this;
                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oMP_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "proveedorlModel_mp");
                                _that.getView().setModel(_oModel, "proveedorlModel");
                                console.log("proveedorlModel_mp", that.getView().getModel("proveedorlModel_mp").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {

                            let oSociedadModel_mp = that.getView().getModel("proveedorlModel_mp").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "proveedorlModel");

                        }

                        if (!this.getView().getModel("sociedadModel_mp")) {

                            aResults = [];
                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_BUKRS/';
                            let oEV_Model = this.getView().getModel("MP_LayoutService");
                            let sUrlCount = oEntity + "$count?";

                            // 3. Obtener total de registros
                            let oCount = await getCount(sUrlCount, oEV_Model, _layout);
                            let that = this;
                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oEV_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "sociedadModel_mp");
                                _that.getView().setModel(_oModel, "sociedadModel");
                                console.log("sociedadModel_mp", that.getView().getModel("sociedadModel_mp").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {
                            let oSociedadModel_mp = that.getView().getModel("sociedadModel_mp").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "sociedadModel");
                        }





                    } catch (error) {
                        //console.log("Error Contador de material EV : ", error);
                    }








                    /* if (!this.getView().getModel("bukrs_MP_Model")) {
                        _MP_ModelService.read("/ZZ1_CDS_SEARCH_HELP_BUKRS/?", {
                            success: function (oData, Result) {

                                console.log(oData);
                                let _oModel = new JSONModel();
                                _oModel.setData(oData.results);
                                _that.getView().setModel(_oModel, "bukrs_MP_Model");

                            }, error: function (oError) {
                                console.log(oError);
                            }
                        });
                    } */








                } else if (_layout === c_pt) {


                    /* var _PT_ModelService = this.getView().getModel("PT_LayoutService");

                    if (!this.getView().getModel("bukrs_PT_Model")) {
                        _PT_ModelService.read("/ZZ1_CDS_SEARCH_HELP_BUKRS/?", {
                            success: function (oData, Result) {

                                console.log(oData);
                                let _oModel = new JSONModel();
                                _oModel.setData(oData.results);
                                _that.getView().setModel(_oModel, "bukrs_PT_Model");

                            }, error: function (oError) {
                                console.log(oError);
                            }
                        });
                    }

                    
 */

                    try {
                        if (!this.getView().getModel("materialModel_pt")) {
                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_PARNR/';
                            let oEV_Model = this.getView().getModel("EV_LayoutService");

                            let sUrlCount = oEntity + "$count?";

                            // 3. Obtener total de registros
                            let oCount = await getCount(sUrlCount, oEV_Model, _layout);
                            console.log("Contador de material EV : " + oCount);
                            let that = this;





                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oEV_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "materialModel_pt");
                                _that.getView().setModel(_oModel, "materialModel");
                                console.log("materialModel_pt", that.getView().getModel("materialModel_pt").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {

                            let oSociedadModel_mp = that.getView().getModel("materialModel_pt").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "materialModel");

                        }

                        if (!this.getView().getModel("sociedadModel_pt")) {

                            aResults = [];
                            let oEntity = '/ZZ1_CDS_SEARCH_HELP_BUKRS/';
                            let oEV_Model = this.getView().getModel("PT_LayoutService");

                            let sUrlCount = oEntity + "$count?";

                            let oCount = await getCount(sUrlCount, oEV_Model, _layout);

                            let that = this;


                            // 3. Obtener total de registros


                            let hasMore = true;
                            let bFirstCall = true;
                            let sUrl = oEntity;

                            // 4. Loop de paginación
                            while (hasMore) {
                                let oData = await loadData(sUrl, bFirstCall, oCount, oEV_Model);
                                bFirstCall = false;

                                aResults = aResults.concat(oData.results || []);

                                if (oData.__next) {
                                    console.log("Next URL:", oData.__next);

                                    // Asegura que la URL sea relativa y correcta
                                    let sNextQuery = oData.__next.split("/Set?")[1];
                                    let sBaseUrl = oEntity + "?" + sNextQuery;
                                    sUrl = sBaseUrl;
                                } else {
                                    hasMore = false;
                                }
                            }

                            // 5. Mostrar resultados si hay
                            let oModel = new sap.ui.model.json.JSONModel();
                            oModel.setData(aResults);



                            if (aResults.length > 0) {

                                let _oModel = new JSONModel();
                                _oModel.setData(aResults);
                                _that.getView().setModel(_oModel, "sociedadModel_pt");
                                _that.getView().setModel(_oModel, "sociedadModel");
                                console.log("sociedadModel_ev", that.getView().getModel("sociedadModel_pt").getData());

                            } else {
                                MessageBox.warning(_msgSinResultados);
                            }

                        } else {

                            let oSociedadModel_mp = that.getView().getModel("sociedadModel_pt").getData();
                            let _oModel = new JSONModel();
                            _oModel.setData(oSociedadModel_mp);
                            _that.getView().setModel(_oModel, "sociedadModel");

                        }
                    } catch (error) {
                        //console.log("Error Contador de material EV : ", error);
                    }
                }

            },



            clearTable: function (_tableID) {

                if (this.getView().getModel("requestModel").getProperty("/Global/tableEV")) {

                    if (this.getView().getModel("evLayoutModel")) {
                        this.getView().getModel("evLayoutModel").setData();
                    }

                } else if (this.getView().getModel("requestModel").getProperty("/Global/tableMP")) {
                    if (this.getView().getModel("mpLayoutModel")) {
                        this.getView().getModel("mpLayoutModel").setData();
                    }

                } if (this.getView().getModel("requestModel").getProperty("/Global/tablePT")) {

                    if (this.getView().getModel("ptLayoutModel")) {
                        this.getView().getModel("ptLayoutModel").setData();
                    }


                }

            },

            poSelectionFinish: function (oEvent) {

                var selectedItems = oEvent.getParameter("selectedItems");
                var _items = [];

                if (selectedItems.length > 0) {
                    selectedItems.forEach((element) =>
                        _items.push({
                            "ebeln": element.getProperty("key")
                        })
                    );
                }

                this.getView().getModel("requestModel").setProperty("/po", []);
                this.getView().getModel("requestModel").setProperty("/po", _items);

            },

            materialSelectionFinish: function (oEvent) {

                var selectedItems = oEvent.getParameter("selectedItems");
                var _items = [];

                if (selectedItems.length > 0) {
                    selectedItems.forEach((element) =>
                        _items.push({
                            "Parnr": element.getProperty("key")
                        })
                    );
                }

                this.getView().getModel("requestModel").setProperty("/material", []);
                this.getView().getModel("requestModel").setProperty("/material", _items);

            },

            bukrsSelectionFinish: function (oEvent) {

                var selectedItems = oEvent.getParameter("selectedItems");
                var _items = [];

                if (selectedItems.length > 0) {
                    selectedItems.forEach((element) =>
                        _items.push({
                            "bukrs": element.getProperty("key")
                        })
                    );
                }

                this.getView().getModel("requestModel").setProperty("/Global/bukrs", []);
                this.getView().getModel("requestModel").setProperty("/Global/bukrs", _items);

            },

            clearAllFilters: function (_tableID) {
                const oTable = this.byId(_tableID);
                const aColumns = oTable.getColumns();
                for (let i = 0; i < aColumns.length; i++) {
                    oTable.filter(aColumns[i], null);
                }
            },


            onVH_vbeln_request(oEvent) {
                console.log("onVH_vbeln_request");
                if (!this._oVH_factura_Dialog) {
                    this._oVH_factura_Dialog = Fragment.load({
                        name: "cuprum.zmm_ptplayouts.view.fragments.FacturaSelectionDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }

                this._oVH_factura_Dialog.then(function (oDialog) {
                    oDialog.open();
                });

            },

            onClose_VH_vbeln() {

                var that = this;

                this._oVH_factura_Dialog.then(function (oDialog) {
                    that.getView().getModel("requestModel").setProperty("/Virtual/factura_inicio", "");
                    that.getView().getModel("requestModel").setProperty("/Virtual/factura_fin", "");
                    oDialog.close();
                });
            },

            includeInvoices() {
                var that = this;
                var oBundle = this.get_Resource_Bundle();
                var _message = oBundle.getText("rangoFacturasIncluido");
                this._oVH_factura_Dialog.then(function (oDialog) {
                    MessageToast.show(_message);
                    oDialog.close();
                });
            },

            onClose_VH_ebeln() {

                var that = this;

                this._oVH_ebeln_Dialog.then(function (oDialog) {
                    that.getView().getModel("requestModel").setProperty("/Virtual/oc_inicio", "");
                    that.getView().getModel("requestModel").setProperty("/Virtual/oc_fin", "");
                    oDialog.close();
                });
            },

            includeEbeln() {
                var that = this;
                var oBundle = this.get_Resource_Bundle();
                var _message = oBundle.getText("rangoOCIncluido");
                this._oVH_ebeln_Dialog.then(function (oDialog) {
                    MessageToast.show(_message);
                    oDialog.close();
                });
            },

            onVH_ebeln_request(oEvent) {
                console.log("onVH_ebeln_request");
                if (!this._oVH_ebeln_Dialog) {
                    this._oVH_ebeln_Dialog = Fragment.load({
                        name: "cuprum.zmm_ptplayouts.view.fragments.OC_SelectionDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }

                this._oVH_ebeln_Dialog.then(function (oDialog) {
                    oDialog.open();
                });

            },

            onVH_material_request(oEvent) {

                const oTipoBusqueda = "Material";

                this._loadRemoteOdataServices(_layout, oTipoBusqueda);



                console.log("onVH_material_request");
                if (!this._oVH_material_Dialog) {
                    this._oVH_material_Dialog = Fragment.load({
                        name: "cuprum.zmm_ptplayouts.view.fragments.MaterialSelectionDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        // ✅ Aquí usamos Fragment.byId para obtener controles internos
                        Fragment.byId("MaterialFragment", "material_inicio")?.attachSuggestionItemSelected(this.onMaterialSelected, this);
                        Fragment.byId("MaterialFragment", "material_fin")?.attachSuggestionItemSelected(this.onMaterialSelected, this);

                        return oDialog;
                    }.bind(this));
                }

                this._oVH_material_Dialog.then(function (oDialog) {
                    oDialog.open();
                });

            },

            onClose_VH_Material() {
                var that = this;
                this._oVH_material_Dialog.then(function (oDialog) {
                    that.getView().getModel("requestModel").setProperty("/Global/material_inicio", "");
                    that.getView().getModel("requestModel").setProperty("/Global/material_fin", "");
                    oDialog.close();
                });
            },

            includeMaterial() {
                var oBundle = this.get_Resource_Bundle();
                var _message = oBundle.getText("rangoMaterialIncluido");
                this._oVH_material_Dialog.then(function (oDialog) {
                    MessageToast.show(_message);
                    oDialog.close();
                });
            },

            onVH_Sociedad_request(oEvent) {

                this._loadRemoteOdataServices(_layout);
                console.log("onVH_material_request");
                if (!this._oVH_sociedad_Dialog) {
                    this._oVH_sociedad_Dialog = Fragment.load({
                        name: "cuprum.zmm_ptplayouts.view.fragments.SociedadSelectionDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }
                this._oVH_sociedad_Dialog.then(function (oDialog) {
                    oDialog.open();
                });

            },

            onClose_VH_Sociedad() {
                var that = this;
                this._oVH_sociedad_Dialog.then(function (oDialog) {
                    that.getView().getModel("requestModel").setProperty("/Global/sociedad_inicio", "");
                    that.getView().getModel("requestModel").setProperty("/Global/sociedad_fin", "");
                    oDialog.close();
                });
            },

            includeSociedad() {
                var oBundle = this.get_Resource_Bundle();
                var _message = oBundle.getText("rangoSociedadIncluido");
                this._oVH_sociedad_Dialog.then(function (oDialog) {
                    MessageToast.show(_message);
                    oDialog.close();
                });
            },

            onSuggestMaterial: function (oEvent) {
                const sTerm = oEvent.getParameter("suggestValue").toLowerCase();
                const oInput = oEvent.getSource();
                const oBinding = oInput.getBinding("suggestionItems");

                if (oBinding) {
                    const oFilter = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("Parnr", sap.ui.model.FilterOperator.Contains, sTerm),
                            new sap.ui.model.Filter("ParnrDescription", sap.ui.model.FilterOperator.Contains, sTerm)
                        ],
                        and: false // <- Muy importante: hace un OR entre filtros
                    });

                    oBinding.filter([oFilter]);
                }
            },

            onSuggestSociedad: function (oEvent) {
                const sTerm = oEvent.getParameter("suggestValue").toLowerCase();
                const oInput = oEvent.getSource();
                const oBinding = oInput.getBinding("suggestionItems");

                if (oBinding) {
                    const oFilter = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("bukrs", sap.ui.model.FilterOperator.Contains, sTerm),
                            new sap.ui.model.Filter("butxt", sap.ui.model.FilterOperator.Contains, sTerm)
                        ],
                        and: false // <- Muy importante: hace un OR entre filtros
                    });

                    oBinding.filter([oFilter]);
                }
            },

            onSuggestProveedor: function (oEvent) {
                const sTerm = oEvent.getParameter("suggestValue").toLowerCase();
                const oInput = oEvent.getSource();
                const oBinding = oInput.getBinding("suggestionItems");

                if (oBinding) {
                    const oFilter = new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.Contains, sTerm),
                            new sap.ui.model.Filter("LifnrName", sap.ui.model.FilterOperator.Contains, sTerm)
                        ],
                        and: false // <- Muy importante: hace un OR entre filtros
                    });

                    oBinding.filter([oFilter]);
                }
            },


            onMaterialSelected: function (oEvent) {
                const oSelectedItem = oEvent.getParameter("selectedItem");
                const oInput = oEvent.getSource();

                if (oSelectedItem && oInput) {
                    const sValue = oSelectedItem.getAdditionalText(); // Parnr

                    // Obtener el path del modelo donde está bindeado el Input
                    const sPath = oInput.getBinding("value")?.getPath();

                    if (sPath) {
                        this.getView().getModel("requestModel").setProperty(sPath, sValue);
                    }

                    // Visualmente también lo puedes actualizar por si no refresca
                    oInput.setValue(sValue);
                }
            },

            onSociedadSelected: function (oEvent) {
                const oSelectedItem = oEvent.getParameter("selectedItem");
                const oInput = oEvent.getSource();

                if (oSelectedItem && oInput) {
                    const sValue = oSelectedItem.getAdditionalText(); // Parnr

                    // Obtener el path del modelo donde está bindeado el Input
                    const sPath = oInput.getBinding("value")?.getPath();

                    if (sPath) {
                        this.getView().getModel("requestModel").setProperty(sPath, sValue);
                    }

                    // Visualmente también lo puedes actualizar por si no refresca
                    oInput.setValue(sValue);
                }
            }













        });




    });