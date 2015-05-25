Ext.define('LfmTool.view.usertools.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search',

    onSearch: function(){
        var searchGrid = this.lookupReference('searchGrid'),
            searchForm = this.lookupReference('searchForm'),
            value = this.lookupReference('searchField').getValue();
        if(searchForm.isValid()) {
            searchGrid.getStore().load({
                params: {
                    searchValue: value
                },
                callback: function(records, operation, success){
                    if(!success) LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                }
            });
        } else{
            LfmTool.Utilities.popup.msg('Error!', 'Validation failed!');
        }
    },

    init: function(){
        this.control({
            '#searchField':{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER){
                        this.onSearch();
                    }
                }
            },

            'grid':{
                select: function(row, model){
                    console.log(model);
                }
            }
        })
    }


});