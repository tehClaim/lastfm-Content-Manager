Ext.define('LfmTool.view.usertools.WishlistViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wishlist',

    onRemoveFromWishlist: function(button){
        var grid = this.lookupReference('wishlistGrid'),
            store = grid.getStore(),
        	selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            Ext.Msg.show({
                title:'Remove artist from wishlist',
                msg: 'Are you sure?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(rec) {
                    if (rec === "yes") store.remove(selection);
                    store.sync({
                        success: function(){
                            LfmTool.Utilities.popup.msg('Success!',selection.get('name')+' successfully removed from wishlist!');
                        },
                        failure: function() {
                            LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                        }
                    });
                }
            });
        } else{
            LfmTool.Utilities.popup.msg('Error!', 'You must select artist to remove!');
        }
    }
});