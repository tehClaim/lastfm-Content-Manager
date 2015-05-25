Ext.define('LfmTool.store.usertools.Artists', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Artist'
    ],
    model: 'LfmTool.model.usertools.Artist',
    proxy: {
        type: 'ajax',
        url: 'php/getArtists.php',
        reader: {
            type: 'json'
        }
    }
});