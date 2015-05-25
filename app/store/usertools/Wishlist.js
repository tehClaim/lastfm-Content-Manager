Ext.define('LfmTool.store.usertools.Wishlist', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Wishlist'
    ],
    model: 'LfmTool.model.usertools.Wishlist',
    proxy: {
        type: 'rest',
        url: 'php/syncWishlist.php'
    }
});
