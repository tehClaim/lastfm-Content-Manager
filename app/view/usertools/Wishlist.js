Ext.define('LfmTool.view.usertools.Wishlist', {
    extend: 'Ext.panel.Panel',
    xtype: 'wishlist',
    controller: 'wishlist',
    layout: {
        type: 'fit'
    },
    requires: [
        'LfmTool.view.usertools.WishlistViewController'
    ],
    initComponent: function(){
        var grid = {
            xtype: 'grid',
            reference: 'wishlistGrid',
            //selModel: 'rowmodel',
            flex: 1,
            columns:[{
                text: 'Photo',
                renderer: function(value){
                    return '<img src="' + value + '" />';
                },
                dataIndex: 'imageSmall',
                sortable: false
            },{
                text: 'Artist name',
                dataIndex: 'name',
                flex: 1
            },{
                text: 'Tag',
                width: 200,
                dataIndex: 'tag0'
            },/*{
                text: 'Playcount',
                dataIndex: 'playcount'
            },*/{
                text: 'Added',
                width: 100,
                xtype: 'datecolumn',
                format: "Y-m-d",
                dataIndex: 'added'
            }],
            scrollable: true,
            store: 'usertools.Wishlist',
            tbar:[{
                xtype: 'button',
                text: 'Remove from wishlist',
                glyph: 'xf00d@FontAwesome',
                handler: 'onRemoveFromWishlist'
            }]
        };

        this.items = [grid];


        this.callParent();
    }
});