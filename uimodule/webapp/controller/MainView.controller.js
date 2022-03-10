sap.ui.define(
  ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController,
    JSONModel,
    MessageBox) {
    "use strict";

    return BaseController.extend("com.app.AppmyUI5.controller.MainView", {
      onInit: function () {
        var datos = {
          p1: "valor1",
          p2: "valor2",
          p3: 3,
          p4: 4.5,
          p5: false,
          p6: "si"
        };
        var oModel = new JSONModel(datos);
        this.getView().setModel(oModel, "modelo1");
        console.log();


        var datosTabla = [{
          f1: "p1"
        }, {
          f1: "p2",
          f2: "pf2"
        }, {
          f1: "p3"
        }];
        var oModel1 = new JSONModel(datosTabla);
        this.getView().setModel(oModel1, "Tabla");



        var url = "/Northwind/";
        var oModelu = new sap.ui.model.odata.v2.ODataModel(url);
        var that = this;
        console.log("PRE Llamada");
        this.setModel(new JSONModel([{}]), "tablaOData");

        oModelu.read("/Categories", {
          urlParameters: {},
          success: function (odata, oresponse) {
            //console.log;
          console.log("Funcion De Llamada");
          that.getModel("tablaOData").setData(odata.results);
          MessageBox.confirm(odata.results[0].Description);

          },
          error: function (error) {
            //console.log;
            MessageBox.error(error);
          },
        });
        console.log("POS Llamada");

      },

      onPress: function (oEvent) {
        var datos = this.getView().getModel("modelo1").getData();
        alert(datos.p1);
        datos.p5 = !datos.p5;
        this.getView().getModel("modelo1").setData(datos);
        var input = new sap.m.Text("", {
          text: "Ej. Input"
        })
        input.placeAt(this.getView().byId("page"))
      },
      onPress1: function (oEvent) {

        // var datos = this.getView().getModel("modelo1").getData();            
        // alert(datos.p1);
        // datos.p5 = !datos.p5;
        this.getView().getModel("modelo1").setProperty("/p1", "Valor 1 actualizado");
      },
    });
  }
);
