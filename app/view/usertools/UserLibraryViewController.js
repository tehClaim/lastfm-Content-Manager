Ext.define('LfmTool.view.usertools.UserLibraryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-library',
    control:{
        '#myLibrary':{
            change: function(field, newValue){
                var view = this.getView();
                view.disableUsername(newValue);
            }
        },

        '#username':{
            specialkey: function(field, e){
                if (e.getKey() == e.ENTER){
                    this.onSearch();
                }
            }
        }
    },

    onSearch: function(){
        var userName,
            userLibraryForm = this.lookupReference('userLibraryForm'),
            artistsGrid = this.lookupReference('artistsGrid'),
            myLibrary = this.lookupReference('myLibrary').getValue(),
            period = this.lookupReference('period').getValue();
        if(userLibraryForm.isValid()){
            if(myLibrary) userName = SharedData.userName;
            else userName = this.lookupReference('username').getValue();
            artistsGrid.getStore().load({
                params:{
                    userName: userName,
                    period: period
                },
                callback: function(records, operation, success){
                    if(!success) LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                }
            });
        } else{
            LfmTool.Utilities.popup.msg('Error!', 'Validation failed!');
        }
    }

});