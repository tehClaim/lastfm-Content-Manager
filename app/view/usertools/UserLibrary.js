Ext.define('LfmTool.view.usertools.UserLibrary', {
    extend: 'Ext.panel.Panel',
    xtype: 'user-library',
    controller: 'user-library',
    viewModel:{
        type: 'content-panel'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires: [
        'LfmTool.view.usertools.UserLibraryViewController',
        'LfmTool.view.usertools.ContentPanelViewModel'
    ],
    initComponent: function(){
        var grid = {
            xtype: 'grid',
            reference: 'artistsGrid',
            itemId: 'artistsGrid',
            selModel: 'rowmodel',
            flex: 1,
            columns:[{
                text: 'Artist name',
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Play count',
                dataIndex: 'playcount'
            }],
            scrollable: true,
            bind:{
                store: '{library}'
            }
        };

        this.items = [grid,{
            xtype: 'form',
            reference: 'userLibraryForm',
            width: 250,
            layout:{
                type: 'vbox',
                //align: 'stretch',
                padding: 10
            },
            items:[{
                xtype: 'checkbox',
                itemId: 'myLibrary',
                reference: 'myLibrary',
                fieldLabel: 'My library',
                labelWidth: 70,
                value: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Username',
                reference: 'username',
                itemId: 'username',
                maxLength: 15,
                disabled: true,
                allowBlank: false,
                labelWidth: 70,
                width: '100%'
            },{
                xtype: 'button',
                text: 'Search',
                handler: 'onSearch',
                width: '100%'
            },{
                xtype: 'fieldset',
                title: 'Period',
                width: '100%',
                items:[{
                    xtype: 'radiogroup',
                    columns: 1,
                    reference: 'period',
                    items: [
                        {boxLabel: 'Overall', name: 'period',  inputValue: 1, checked: true},
                        {boxLabel: 'Last 7 days', name: 'period',  inputValue: 2}
                    ]
                }]
            }]
        }];

        this.callParent();
    },

    disableUsername: function(value){
        var field = this.down('#username');
        if(value) field.disable();
        else field.enable();
    }
});