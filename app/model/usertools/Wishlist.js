Ext.define('LfmTool.model.usertools.Wishlist',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mbid', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'imageSmall', type: 'string'},
        {name: 'tag0', type: 'string'},
        {name: 'added', type: 'date', dateFormat: 'Y-m-d' }
    ]
});