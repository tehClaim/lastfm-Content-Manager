Ext.define('LfmTool.view.usertools.Search', {
    extend: 'Ext.panel.Panel',
    xtype: 'search',
    controller: 'search',
    requires: [
        'LfmTool.view.usertools.SearchViewController'
    ],
    //store: 'usertools.Artists',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    /*items:[{
        xtype: 'grid',
        reference: 'searchGrid',
        store: 'usertools.Search',
        columns: [{
            text      : 'Artist name',
            dataIndex : 'name',
            flex: 1
        },{
            text      : 'Listeners count',
            dataIndex : 'listeners'
        }],
        flex: 1
    },{
        xtype: 'panel',
        layout:{
            type: 'vbox',
            padding: 10
        },
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Name',
            reference: 'searchField'
        },{
            xtype: 'button',
            text: 'Search',
            handler: 'onSearch',
            width: 200
        }],
        width: 500
    }],*/

    initComponent: function(){
        var grid = {
            xtype: 'grid',
            reference: 'searchGrid',
            store: 'usertools.Search',
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