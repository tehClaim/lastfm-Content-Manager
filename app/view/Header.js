Ext.define('LfmTool.view.Header', {
    extend: 'Ext.Container',
    xtype: 'app-header',
    id: 'app-header',
    viewModel:{
        type: 'header'
    },
    requires:[
        'LfmTool.view.HeaderViewModel'
    ],
    title: 'last.fm Content Manager',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {
        document.title = this.title;

        this.items = [{
            xtype: 'component',
            cls: 'lastfm-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            width: 400
        },{
            xtype: 'tbfill'
        },{
            xtype: 'button',
            glyph: 'xf007@FontAwesome',
            itemId: 'loggedUser',
            bind:{
                text: '{userName}'
            },
            menu:[{
                text: 'temporary disabled',
                disabled: true
            }],
            margin: '0 15 0 0'
        }];

        this.callParent();
    }
});
