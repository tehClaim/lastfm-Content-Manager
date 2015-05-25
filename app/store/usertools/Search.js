Ext.define('LfmTool.store.usertools.Search', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Artist'
    ],
    model: 'LfmTool.model.usertools.Artist',
    proxy: {
        type: 'ajax',
        url: 'php/getSearchResult.php',
        reader: {
            type: 'json'
        }
    }
});