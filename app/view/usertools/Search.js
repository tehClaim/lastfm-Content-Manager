Ext.define('LfmTool.view.usertools.Search', {
    extend: 'Ext.panel.Panel',
    xtype: 'search',
    controller: 'search',
    viewModel:{
        type: 'content-panel'
    },
    requires: [
        'LfmTool.view.usertools.SearchViewController',
        'LfmTool.view.usertools.ContentPanelViewModel'
    ],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function(){
        var grid = {
            xtype: 'grid',
            reference: 'searchGrid',
            bind:{
                store: '{search}'
            },
            columns: [{
                text      : 'Artist name',
                dataIndex : 'name',
                flex: 1
            },{
                text      : 'Listeners count',
                dataIndex : 'listeners'
            }],
            scrollable: true,
            flex: 1
        };

        this.items = [grid,{
            xtype: 'form',
            reference: 'searchForm',
            width: 250,
            layout:{
                type: 'vbox',
                padding: 10
            },
            items:[{
                xtype: 'textfield',
                fieldLabel: 'Name',
                allowBlank: false,
                width: '100%',
                labelWidth: 70,
                reference: 'searchField',
                itemId: 'searchField'
            },{
                xtype: 'button',
                text: 'Search',
                handler: 'onSearch',
                width: '100%'
            }]
        }];

        this.callParent();
    }
});