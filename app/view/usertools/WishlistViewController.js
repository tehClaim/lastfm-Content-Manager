Ext.define('LfmTool.view.usertools.WishlistViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wishlist',
    onRemoveFromWishlist: function(){
        var grid = this.lookupReference('wishlistGrid'),
            wishlistVM = this.getViewModel(),
            store = wishlistVM.getStore('wishlist'),
        	selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            Ext.Msg.show({
                title:'Remove artist from wishlist',
                msg: 'Are you sure?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(rec) {
                    if (rec === "yes") {
                        store.remove(selection);
                        store.sync({
                            success: function () {
                                LfmTool.Utilities.popup.msg('Success!', selection.get('name') + ' successfully removed from wishlist!');
                                grid.doLayout();
                            },
                            failure: function () {
                                LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                            }
                        });
                    }

                }
            });
        } else{
            LfmTool.Utilities.popup.msg('Error!', 'You must select artist to remove!');
        }
    }
});