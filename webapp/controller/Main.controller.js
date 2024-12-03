sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/data/DimensionDefinition",
    "sap/viz/ui5/data/MeasureDefinition",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Label"
    
], (Controller, FeedItem, DimensionDefinition, MeasureDefinition, FlattenedDataset, Column, ColumnListItem, Label) => {
    "use strict";

    return Controller.extend("student08.sap.training.diagram.controller.Main", {
        
        onInit() {
            this._createLineChart();
            this._createTable();
        },

        _createLineChart: function () {
            var oVizFrame = this.byId("inLineCharVizFrame"),
                oPopover = this.byId("idLineChartPopover");

            oVizFrame.setDataset(this._createDataSet());
            
            var oDataset = oVizFrame.getDataset()
            this._createDataSetMap()
            oDataset.addDimension(this.datasetMap.productDim)   
            oDataset.addMeasure(this.datasetMap.salesAmountMeasure)   

            this._createFeedMap();
            oVizFrame.addFeed(this.feedMap.salesAmount)
            oVizFrame.addFeed(this.feedMap.products);
            
            oVizFrame.setVizProperties({
                plotArea: {
                  dataLabel: {
                    visible: true
                  }
                },
                title: {
                  visible: false
                }
              });
              oVizFrame.setVizType('line');
              oPopover.connect(oVizFrame.getVizUid())
        },

        _createDataSet: function () { 
            var oDataset = new FlattenedDataset({ 
                data: { 
                    path: "SalesModel>/" 
                } 
            }); 
            return oDataset; 
        },

        _createDataSetMap: function () {

            this.datasetMap = {

                productDim: new DimensionDefinition({
                    name: 'Products',
                    value: '{SalesModel>PRODUCT_NAME}'
                }),

                subRegionDim: new DimensionDefinition({
                    name: 'Sub_Region_Name',
                    value: '{SalesModel>SUB_REGION_NAME}'
                }),

                salesAmountMeasure: new MeasureDefinition({
                    name: 'SalesAmount',
                    value: '{SalesModel>SALES_AMOUNT}'
                })

            }
            
        },

        _createFeedMap: function(){
            this.feedMap = {}

            this.feedMap.salesAmount = new FeedItem({
                "uid": "valueAxis",
                "type": "Measure",
                "values": ["SalesAmount"]
            })

            this.feedMap.products = new FeedItem({
                "uid": "categoryAxis",
                "type": "Dimension",
                "values": ["Products"]
            })

        },

        _createTable: function () {
            var oTable = this.getView().byId("idTable"); 
            oTable.addColumn(new Column({ 
                header: new Label( { 
                    text: "Region", 
                    textAlign: "Right" 
                }) 
            })); 
            oTable.addColumn(new Column({ 
                header: new Label( { 
                    text: "Sub Region", 
                    textAlign: "Left" 
                }) 
            })); 
            oTable.addColumn(new Column({ 
                header: new Label( { 
                    text: "Product name" 
                }) 
            })); 
            oTable.addColumn(new Column({ 
                header: new Label( { 
                    text: "Sales Amount" 
                }) 
            })); 
            var oTableTemplate = new ColumnListItem({ 
                type: sap.m.ListType.Active, 
                cells: [ 
                    new Label({text: "{SalesModel>REGION_NAME}"}), 
                    new Label({ 
                        text: "{SalesModel>SUB_REGION_NAME}", 
                        textAlign: "Left" 
                    }), 
                    new Label({ 
                        text: "{SalesModel>PRODUCT_NAME}", 
                        textAlign: "Right" 
                    }), 
                    new Label({ 
                        text: "{SalesModel>SALES_AMOUNT}", 
                        textAlign: "Center" 
                    }) 
                ] 
            }); 
            oTable.bindItems("SalesModel>/", oTableTemplate, null, null); 
        },
    });
});