Ext.define('LfmTool.view.usertools.Wishlist', {
    extend: 'Ext.panel.Panel',
    xtype: 'wishlist',
    viewModel:{
        type: 'wishlist'
    },
    controller: 'wishlist',
    layout: {
        type: 'fit'
    },
    requires: [
        'LfmTool.view.usertools.WishlistViewController',
        'LfmTool.view.usertools.WishlistViewModel'
    ],
    initComponent: function(){
        var grid = {
            xtype: 'grid',
            reference: 'wishlistGrid',
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
            },{
                text: 'Added',
                width: 100,
                xtype: 'datecolumn',
                format: "Y-m-d",
                dataIndex: 'added'
            }],
            scrollable: true,
            bind:{
                store: '{wishlist}'
            },
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