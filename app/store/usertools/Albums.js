Ext.define('LfmTool.store.usertools.Albums', {
    extend: 'Ext.data.Store',
    requires:[
        'LfmTool.model.usertools.Album'
    ],
    model: 'LfmTool.model.usertools.Album',
    proxy: {
        type: 'ajax',
        url: 'php/getAlbums.php',
        reader: {
            type: 'json'
        }
    }
});