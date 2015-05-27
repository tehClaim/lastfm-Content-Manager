Ext.define('LfmTool.view.usertools.WishlistViewModel',{
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.wishlist',
    requires:[
        'LfmTool.model.usertools.Wishlist',
        'Ext.data.proxy.Rest'
    ],
    stores:{
        wishlist: {
            model: 'LfmTool.model.usertools.Wishlist',
            proxy: {
                type: 'rest',
                url: 'php/syncWishlist.php'
            }
        }
    }

});