Ext.define('LfmTool.view.Header', {
    extend: 'Ext.Container',
    xtype: 'app-header',
    id: 'app-header',
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
            //width: 100,
            //height: 40,
            //html: '<i class="fa fa-lastfm"></i>',
            //glyph: 'xf022@FontAwesome'
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
            text: 'username',
            menu:[{
                text: 'temporary disabled',
                disabled: true
            }],
            margin: '0 15 0 0'
        }];

        this.callParent();
    }
});
